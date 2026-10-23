import { cn } from "@/lib/utils";

/**
 * Mosaico mark. Nine tiles, one picture: the accent tiles are the fan, the
 * pale tiles are the stand, and the gaps are the space between rows.
 */
const CELLS: Array<{ x: number; y: number; fill: string; opacity: number }> = [
  { x: 0, y: 0, fill: "var(--color-fg)", opacity: 0.92 },
  { x: 11.5, y: 0, fill: "var(--color-fg)", opacity: 0.28 },
  { x: 23, y: 0, fill: "var(--color-fg)", opacity: 0.92 },
  { x: 0, y: 11.5, fill: "var(--color-accent)", opacity: 1 },
  { x: 11.5, y: 11.5, fill: "var(--color-fg)", opacity: 0.92 },
  { x: 23, y: 11.5, fill: "var(--color-accent)", opacity: 1 },
  { x: 0, y: 23, fill: "var(--color-fg)", opacity: 0.28 },
  { x: 11.5, y: 23, fill: "var(--color-accent)", opacity: 1 },
  { x: 23, y: 23, fill: "var(--color-fg)", opacity: 0.92 },
];

export function TileMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Mosaico"
    >
      {CELLS.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          x={cell.x}
          y={cell.y}
          width="9"
          height="9"
          rx="1.5"
          fill={cell.fill}
          opacity={cell.opacity}
        />
      ))}
    </svg>
  );
}
