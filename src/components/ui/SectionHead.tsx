type Props = {
  index: string;
  label: string;
  /** heading lines; the italic serif accent word is appended to the last line */
  lines: string[];
  accent: string;
  id: string;
  className?: string;
};

/** "03 — Selected work" tag + masked, line-by-line heading ending in one Instrument Serif italic word. */
export default function SectionHead({ index, label, lines, accent, id, className = "" }: Props) {
  return (
    <header className={className}>
      <p className="tag rv">
        <b>{index}</b> — {label}
      </p>
      <h2 className="h2" id={id}>
        {lines.map((line, i) => (
          <span className="rv-mask" key={i} style={{ ["--i" as string]: i + 1 }}>
            <span>
              {line}
              {i === lines.length - 1 && (
                <>
                  {" "}
                  <span className="it">{accent}</span>
                </>
              )}
            </span>
          </span>
        ))}
      </h2>
    </header>
  );
}
