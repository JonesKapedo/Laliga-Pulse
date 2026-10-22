import { CLUBS, type ClubId } from "@/data/pulse-data";
import { cn } from "@/lib/utils";

export function Crest({
  clubId,
  size = 40,
  className,
}: {
  clubId: ClubId;
  size?: number;
  className?: string;
}) {
  const club = CLUBS[clubId];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold tracking-wide",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: club.primary,
        color: club.secondary,
        fontSize: Math.max(10, size * 0.28),
        boxShadow: "inset 0 0 0 1px color-mix(in oklab, white 18%, transparent)",
      }}
      aria-label={club.name}
    >
      {club.short}
    </span>
  );
}
