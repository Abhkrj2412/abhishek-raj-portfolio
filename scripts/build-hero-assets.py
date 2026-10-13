#!/usr/bin/env python3
"""
build-hero-assets.py — turn a raw intro video into the portfolio's hero assets.

Outputs (into ./public):
  hero/hero.webm        VP9 (CRF 36) + Opus 80k   — seamless loop
  hero/hero.mp4         H.264 yuv420p (CRF 24, slow) + AAC 96k, +faststart
  hero/poster.webp      first frame of the loop (video poster / LCP image)
  portrait-bust.webp    480x600 head-to-shirt crop (sharpest frame, or --portrait)
  portrait.webp         720x900 grayscale still for the mosaic (only with --portrait)
  og.jpg                1200x630 social card

Pipeline
  1. Detect the person (darker-than-backdrop pixels, unioned over sampled
     frames) and crop a 4:5 box around them, head to toe, centred.
     Override with --crop W:H:X:Y.
  2. Whiten the backdrop with colorlevels (rimax/gimax/bimax), so the video
     multiplies cleanly into the page background. The spec default is 0.98;
     if the measured backdrop (crop border ring, 3rd percentile per channel)
     is greyer than that, the levels are lowered to match. Override: --levels.
  3. Seamless loop: take the first --seconds (default 10). The last --fade
     seconds of picture cross-fade into the first --fade seconds (ffmpeg
     xfade); the audio does the same, sample-accurately, in numpy
     (equal-power). Nothing is stretched or retimed, so lips stay in sync.

Requirements: Python 3.9+, numpy, Pillow. ffmpeg is taken from $FFMPEG,
then PATH, then the `imageio-ffmpeg` package (pip install imageio-ffmpeg).

Usage
  python scripts/build-hero-assets.py path/to/intro.mp4
  python scripts/build-hero-assets.py intro.mp4 --crop 800:1000:560:40
  python scripts/build-hero-assets.py intro.mp4 --portrait photo.jpg
"""
from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT_W = 768  # final hero width; height follows the 4:5 crop (960)
PAPER = (244, 242, 238)  # --paper #f4f2ee


# ── ffmpeg helpers ────────────────────────────────────────────────────────
def find_ffmpeg() -> str:
    exe = os.environ.get("FFMPEG") or shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg  # type: ignore

        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit("ffmpeg not found. Install it, set $FFMPEG, or `pip install imageio-ffmpeg`.")


FF = find_ffmpeg()


def run(args: list[str], **kw) -> subprocess.CompletedProcess:
    cmd = [FF, "-hide_banner", "-loglevel", "error", "-y", *args]
    print("  $ ffmpeg", " ".join(a if " " not in a else f'"{a}"' for a in args[:14]), "…" if len(args) > 14 else "")
    return subprocess.run(cmd, check=True, **kw)


def probe(src: Path) -> dict:
    """Parse `ffmpeg -i` banner (no ffprobe needed)."""
    p = subprocess.run([FF, "-hide_banner", "-i", str(src)], capture_output=True, text=True)
    txt = p.stderr
    dur = re.search(r"Duration: (\d+):(\d+):([\d.]+)", txt)
    vid = re.search(r"Video: .*?(\d{3,5})x(\d{3,5}).*?([\d.]+) fps", txt)
    aud = re.search(r"Audio: .*?(\d+) Hz", txt)
    if not (dur and vid):
        sys.exit(f"Could not probe {src}:\n{txt}")
    h, m, s = dur.groups()
    return {
        "duration": int(h) * 3600 + int(m) * 60 + float(s),
        "w": int(vid.group(1)),
        "h": int(vid.group(2)),
        "fps": float(vid.group(3)),
        "has_audio": bool(aud),
        "rate": int(aud.group(1)) if aud else 48000,
    }


def grab_gray(src: Path, t: float, w: int, h: int, scale: int = 4) -> np.ndarray:
    sw, sh = w // scale, h // scale
    p = run(
        ["-ss", f"{t:.3f}", "-i", str(src), "-frames:v", "1", "-vf", f"scale={sw}:{sh}",
         "-f", "rawvideo", "-pix_fmt", "gray", "-"],
        capture_output=True,
    )
    return np.frombuffer(p.stdout, np.uint8).reshape(sh, sw).astype(np.float32)


def grab_rgb(src: Path, t: float, w: int, h: int) -> np.ndarray:
    p = run(
        ["-ss", f"{t:.3f}", "-i", str(src), "-frames:v", "1",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        capture_output=True,
    )
    return np.frombuffer(p.stdout, np.uint8).reshape(h, w, 3)


# ── 1. person detection ───────────────────────────────────────────────────
def detect_person(src: Path, info: dict, seconds: float) -> tuple[int, int, int, int, float]:
    """Return (x0, y0, x1, y1, head_cx) in source pixels."""
    scale = 4
    times = np.linspace(0.3, max(0.4, seconds - 0.3), 10)
    union = None
    for t in times:
        g = grab_gray(src, float(t), info["w"], info["h"], scale)
        bg = np.median(g)  # backdrop dominates the frame
        mask = g < bg - 38
        union = mask if union is None else (union | mask)
    assert union is not None
    # keep only the dominant blob of columns — kills small corner watermarks
    cols = union.sum(0)
    rows = union.sum(1)
    col_on = cols > max(3, cols.max() * 0.04)
    idx = np.flatnonzero(col_on)
    # largest contiguous run of "on" columns (allow small gaps between legs/arms)
    runs, start, prev = [], idx[0], idx[0]
    for i in idx[1:]:
        if i - prev > 6:
            runs.append((start, prev))
            start = i
        prev = i
    runs.append((start, prev))
    x0, x1 = max(runs, key=lambda r: union[:, r[0]:r[1] + 1].sum())
    sub = union[:, x0:x1 + 1]
    rows = sub.sum(1)
    ridx = np.flatnonzero(rows > 1)
    y0, y1 = ridx[0], ridx[-1]
    # head centre: mean x of mask pixels in the top 12% of the figure
    head = sub[y0:y0 + max(2, int((y1 - y0) * 0.12))]
    ys, xs = np.nonzero(head)
    head_cx = (x0 + xs.mean()) * scale if xs.size else (x0 + x1) / 2 * scale
    return x0 * scale, y0 * scale, (x1 + 1) * scale, (y1 + 1) * scale, float(head_cx)


def plan_crop(info: dict, box: tuple[int, int, int, int, float]) -> tuple[int, int, int, int]:
    x0, y0, x1, y1, _ = box
    fig_h = y1 - y0
    # 4:5 box: figure + ~7% headroom + ~3% floor, never larger than the frame
    ch = min(info["h"], int(fig_h * 1.12) // 2 * 2)
    cw = int(ch * 0.8) // 2 * 2
    if cw > info["w"]:
        cw = info["w"] // 2 * 2
        ch = int(cw / 0.8) // 2 * 2
    cx = (x0 + x1) / 2
    x = int(np.clip(cx - cw / 2, 0, info["w"] - cw))
    y = int(np.clip(y0 - fig_h * 0.08, 0, info["h"] - ch))
    return cw, ch, x, y


def measure_levels(src: Path, info: dict, seconds: float, crop: tuple[int, int, int, int]) -> tuple[float, float, float]:
    """Per-channel input max that maps the backdrop (crop border ring) to pure white."""
    cw, ch, cx, cy = crop
    ring = []
    for t in (0.5, seconds / 2, seconds - 0.5):
        f = grab_rgb(src, t, info["w"], info["h"])[cy:cy + ch, cx:cx + cw].astype(np.float32)
        b = max(8, int(cw * 0.05))
        ring += [f[:b].reshape(-1, 3), f[-b:].reshape(-1, 3), f[:, :b].reshape(-1, 3), f[:, -b:].reshape(-1, 3)]
    px = np.vstack(ring)
    lv = np.percentile(px, 3, axis=0) / 255.0 - 0.01
    return tuple(float(np.clip(v, 0.5, 0.98)) for v in lv)  # type: ignore[return-value]


# ── 3. audio crossfade (numpy, sample-accurate) ───────────────────────────
def build_loop_audio(src: Path, info: dict, seconds: float, fade: float, out_wav: Path) -> None:
    rate, ch = info["rate"], 2
    p = run(
        ["-i", str(src), "-t", f"{seconds:.6f}", "-vn", "-ac", str(ch), "-ar", str(rate),
         "-f", "f32le", "-acodec", "pcm_f32le", "-"],
        capture_output=True,
    )
    x = np.frombuffer(p.stdout, np.float32).reshape(-1, ch).astype(np.float64)
    n_total = int(round(seconds * rate))
    if x.shape[0] < n_total:  # pad if the stream is a hair short
        x = np.vstack([x, np.zeros((n_total - x.shape[0], ch))])
    x = x[:n_total]
    nf = int(round(fade * rate))
    head = x[:nf]  # first `fade` s — what the loop returns to
    body = x[nf:]  # playback starts at t=fade (matches video trim)
    t = np.linspace(0.0, 1.0, nf, endpoint=False)[:, None]
    fade_out = np.cos(t * np.pi / 2)  # equal-power
    fade_in = np.sin(t * np.pi / 2)
    tail = body[-nf:] * fade_out + head * fade_in
    y = np.vstack([body[:-nf], tail])
    y = np.clip(y, -1.0, 1.0)
    pcm = (y * 32767.0).astype("<i2")
    with wave.open(str(out_wav), "wb") as w:
        w.setnchannels(ch)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(pcm.tobytes())
    print(f"  audio loop: {y.shape[0] / rate:.3f}s, crossfade {nf} samples")


# ── 5. portrait + og ──────────────────────────────────────────────────────
def sharpest_time(src: Path, info: dict, seconds: float, face: tuple[int, int, int, int]) -> float:
    fx, fy, fw, fh = face
    best, best_t = -1.0, seconds / 2
    for t in np.linspace(0.5, seconds - 0.5, 19):
        g = grab_gray(src, float(t), info["w"], info["h"], 1)
        roi = g[fy:fy + fh, fx:fx + fw]
        lap = roi[1:-1, 1:-1] * 4 - roi[:-2, 1:-1] - roi[2:, 1:-1] - roi[1:-1, :-2] - roi[1:-1, 2:]
        v = float(lap.var())
        if v > best:
            best, best_t = v, float(t)
    return best_t


LEVELS = (0.98, 0.98, 0.98)


def whiten(rgb: np.ndarray) -> np.ndarray:
    return np.clip(rgb.astype(np.float32) / np.array(LEVELS, np.float32), 0, 255).astype(np.uint8)


def build_stills(src: Path, info: dict, seconds: float, box, portrait_src: Path | None) -> None:
    from PIL import Image, ImageDraw, ImageFont

    x0, y0, x1, y1, head_cx = box
    fig_h = y1 - y0
    # head-to-shirt: top of hair (minus margin) down ~42% of the figure
    bh = int(fig_h * 0.44)
    bw = int(bh * 0.8)
    by = max(0, int(y0 - fig_h * 0.04))
    bx = int(np.clip(head_cx - bw / 2, 0, info["w"] - bw))

    if portrait_src:
        img = Image.open(portrait_src).convert("RGB")
        iw, ih = img.size
        s = max(480 / iw, 600 / ih)
        img = img.resize((round(iw * s), round(ih * s)), Image.LANCZOS)
        l, t = (img.width - 480) // 2, (img.height - 600) // 4
        bust = img.crop((l, t, l + 480, t + 600))
        # larger 4:5 grayscale still for the block-mosaic portrait (Contact)
        src_img = Image.open(portrait_src).convert("L")
        sw, sh = src_img.size
        cw = min(sw, int(sh * 0.8))
        ch = int(cw / 0.8)
        cl = (sw - cw) // 2
        src_img.crop((cl, 0, cl + cw, ch)).resize((720, 900), Image.LANCZOS).save(
            PUBLIC / "portrait.webp", "WEBP", quality=82, method=6)
        frame = None
    else:
        t = sharpest_time(src, info, seconds, (bx, by, bw, int(bh * 0.5)))
        print(f"  sharpest frame at {t:.2f}s")
        frame = whiten(grab_rgb(src, t, info["w"], info["h"]))
        bust = Image.fromarray(frame[by:by + bh, bx:bx + bw]).resize((480, 600), Image.LANCZOS)
    bust.save(PUBLIC / "portrait-bust.webp", "WEBP", quality=86, method=6)

    # og.jpg — paper card, full figure on the right, name on the left
    og = Image.new("RGB", (1200, 630), PAPER)
    if frame is not None:
        fh_px = 560
        fx0 = int(max(0, (x0 + x1) / 2 - fig_h * 0.45))
        fx1 = int(min(info["w"], (x0 + x1) / 2 + fig_h * 0.45))
        fig = Image.fromarray(frame[max(0, y0 - 20):y1 + 20, fx0:fx1])
        s = fh_px / fig.height
        fig = fig.resize((round(fig.width * s), fh_px), Image.LANCZOS)
        # multiply onto paper so white backdrop vanishes, like the site
        bg = Image.new("RGB", fig.size, PAPER)
        fig = Image.fromarray((np.asarray(fig, np.float32) * np.asarray(bg, np.float32) / 255).astype(np.uint8))
        og.paste(fig, (1200 - fig.width - 40, 630 - fh_px))
    else:
        og.paste(bust.convert("L").convert("RGB").resize((448, 560)), (1200 - 448 - 56, 70))
    d = ImageDraw.Draw(og)
    meta = json.loads((ROOT / "scripts" / "og-text.json").read_text("utf-8")) if (ROOT / "scripts" / "og-text.json").exists() else {}
    font_dir = ROOT / "scripts" / "fonts"

    def font(names: list[str], size: int):
        for n in names:
            for base in (font_dir, Path("C:/Windows/Fonts"), Path("/Library/Fonts"), Path("/usr/share/fonts/truetype/dejavu")):
                f = base / n
                if f.exists():
                    return ImageFont.truetype(str(f), size)
        return ImageFont.load_default()

    big = font(["InterTight-Bold.ttf", "arialbd.ttf", "Arial Bold.ttf", "DejaVuSans-Bold.ttf"], 78)
    small = font(["JetBrainsMono-Regular.ttf", "consola.ttf", "Menlo.ttc", "DejaVuSansMono.ttf"], 24)
    name = meta.get("name", "")
    role = meta.get("role", "")
    first, _, rest = name.partition(" ")
    d.text((72, 200), first, fill=(13, 13, 13), font=big)
    d.text((72, 290), rest, fill=(13, 13, 13), font=big)
    d.text((72, 410), role, fill=(119, 117, 111), font=small)
    d.text((72, 72), "PORTFOLIO", fill=(119, 117, 111), font=small)
    og.save(PUBLIC / "og.jpg", "JPEG", quality=86, optimize=True, progressive=True)


# ── main ──────────────────────────────────────────────────────────────────
def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("src", type=Path, help="intro video (.mp4 / .mov)")
    ap.add_argument("--seconds", type=float, default=10.0, help="length of source to use (default 10)")
    ap.add_argument("--fade", type=float, default=0.5, help="loop crossfade in seconds (default 0.5)")
    ap.add_argument("--crop", help="manual crop W:H:X:Y in source pixels (skips detection)")
    ap.add_argument("--levels", help="manual colorlevels max R:G:B (e.g. 0.98:0.98:0.98)")
    ap.add_argument("--portrait", type=Path, help="optional photo for portrait-bust.webp")
    a = ap.parse_args()

    src = a.src.resolve()
    info = probe(src)
    seconds = min(a.seconds, info["duration"])
    fade = a.fade
    print(f"source {info['w']}x{info['h']} @ {info['fps']}fps, {info['duration']:.2f}s, audio={info['has_audio']}")

    box = detect_person(src, info, seconds)
    print(f"person bbox x{box[0]}-{box[2]} y{box[1]}-{box[3]}, head cx≈{box[4]:.0f}")
    if a.crop:
        cw, ch, cx, cy = (int(v) for v in a.crop.split(":"))
    else:
        cw, ch, cx, cy = plan_crop(info, box)
    global LEVELS
    LEVELS = tuple(float(v) for v in a.levels.split(":")) if a.levels else measure_levels(src, info, seconds, (cw, ch, cx, cy))  # type: ignore[assignment]
    rl, gl, bl = LEVELS
    print(f"colorlevels rimax={rl:.3f} gimax={gl:.3f} bimax={bl:.3f}")
    out_h = round(OUT_W * ch / cw / 2) * 2
    print(f"crop={cw}:{ch}:{cx}:{cy} → {OUT_W}x{out_h}")

    (PUBLIC / "hero").mkdir(parents=True, exist_ok=True)
    vf_base = f"crop={cw}:{ch}:{cx}:{cy},scale={OUT_W}:{out_h}:flags=lanczos,colorlevels=rimax={rl:.3f}:gimax={gl:.3f}:bimax={bl:.3f},setsar=1,format=yuv420p"
    loop_len = seconds - fade
    # input0 = [fade, seconds]   (body; its tail fades out)
    # input1 = [0, fade]         (head; fades in, so the loop lands on t=fade)
    fps = info["fps"]
    fc = (
        f"[0:v]fps={fps},{vf_base},split=2[s0][s1];"
        f"[s0]trim=start={fade}:end={seconds},setpts=PTS-STARTPTS,fps={fps}[a];"
        f"[s1]trim=start=0:end={fade},setpts=PTS-STARTPTS,fps={fps}[b];"
        f"[a][b]xfade=transition=fade:duration={fade}:offset={seconds - 2 * fade}[v]"
    )

    with tempfile.TemporaryDirectory() as td:
        tdp = Path(td)
        loop_vid = tdp / "loop.mkv"
        run(["-i", str(src), "-filter_complex", fc, "-map", "[v]", "-an",
             "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-r", str(info["fps"]), str(loop_vid)])
        wav = tdp / "loop.wav"
        if info["has_audio"]:
            build_loop_audio(src, info, seconds, fade, wav)
        audio_in = ["-i", str(wav)] if info["has_audio"] else []
        amap = ["-map", "1:a"] if info["has_audio"] else []
        dur = ["-t", f"{loop_len:.6f}"]

        print("encoding hero.webm (VP9 CRF 36 + Opus 80k)…")
        run(["-i", str(loop_vid), *audio_in, "-map", "0:v", *amap, *dur,
             "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
             "-pix_fmt", "yuv420p", *(["-c:a", "libopus", "-b:a", "80k"] if amap else []),
             str(PUBLIC / "hero" / "hero.webm")])
        print("encoding hero.mp4 (H.264 CRF 24 slow + AAC 96k)…")
        run(["-i", str(loop_vid), *audio_in, "-map", "0:v", *amap, *dur,
             "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p", "-profile:v", "high",
             *(["-c:a", "aac", "-b:a", "96k"] if amap else []), "-movflags", "+faststart",
             str(PUBLIC / "hero" / "hero.mp4")])

    # poster = first frame of the loop (what the visitor sees before playback)
    run(["-i", str(PUBLIC / "hero" / "hero.mp4"), "-frames:v", "1", "-c:v", "libwebp", "-quality", "80",
         str(PUBLIC / "hero" / "poster.webp")])

    print("building portrait-bust.webp + og.jpg…")
    build_stills(src, info, seconds, box, a.portrait)
    for f in ("hero/hero.webm", "hero/hero.mp4", "hero/poster.webp", "portrait-bust.webp", "portrait.webp", "og.jpg"):
        p = PUBLIC / f
        if not p.exists():
            continue
        print(f"  {f:22s} {p.stat().st_size / 1024:8.1f} kB")
    print(f"done — loop length {loop_len:.2f}s")


if __name__ == "__main__":
    main()
