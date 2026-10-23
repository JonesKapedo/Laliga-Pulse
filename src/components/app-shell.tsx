import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Flag, Home, Radio, Trophy, Users } from "lucide-react";
import { CLUBS, rankFromPoints } from "@/data/pulse-data";
import { usePulse } from "@/store/pulse-store";
import { useSeason } from "@/lib/use-participation";
import { Crest } from "@/components/crest";
import { RoomStrip } from "@/components/room-strip";
import { RegisterGate } from "@/components/register-gate";
import { PassportOverlay } from "@/components/passport";
import { DemoMenu } from "@/components/demo-menu";
import { TileMark } from "@/components/tile-mark";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Tonight", short: "Tonight", es: "Jornada", icon: Home },
  { to: "/match", label: "The match", short: "Match", es: "Partido", icon: Radio },
  { to: "/stand", label: "The stand", short: "Stand", es: "Grada", icon: Users },
  { to: "/season", label: "Season", short: "Season", es: "Liga", icon: Flag },
  { to: "/rank", label: "Your rank", short: "Rank", es: "Rango", icon: Trophy },
  { to: "/board", label: "The case", short: "Case", es: "El caso", icon: BookOpen },
];

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const points = usePulse((s) => s.points);
  const clubId = usePulse((s) => s.clubId);
  const lang = usePulse((s) => s.lang);
  const setLang = usePulse((s) => s.setLang);
  const season = useSeason();
  const club = CLUBS[clubId];
  const shownPoints = season?.points ?? points;
  const rank = rankFromPoints(shownPoints);

  useEffect(() => {
    void usePulse.persist.rehydrate();
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="group flex items-center gap-3">
            <span className="rounded-md transition-transform duration-200 group-hover:rotate-6">
              <TileMark size={30} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[10px] tracking-[0.26em] text-muted uppercase">
                LALIGA
              </span>
              <span className="font-display text-lg tracking-[0.08em]">MOSAICO</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const active = path === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[13px] transition-colors duration-150",
                    active ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {lang === "es" ? item.es : item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full border border-border bg-surface p-0.5 text-[10px] font-display tracking-wider sm:flex">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "min-h-8 rounded-full px-2",
                  lang === "en" ? "bg-raised text-fg" : "text-muted hover:text-fg",
                )}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={cn(
                  "min-h-8 rounded-full px-2",
                  lang === "es" ? "bg-raised text-fg" : "text-muted hover:text-fg",
                )}
              >
                ES
              </button>
            </div>
            <DemoMenu />
            <Link
              to="/rank"
              className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1 transition-colors hover:border-faint"
            >
              <Crest clubId={clubId} size={26} />
              <span className="hidden text-xs sm:block">
                <span className="block font-medium leading-none">{rank.current.title}</span>
                <span className="text-muted tabular-nums">
                  {shownPoints.toLocaleString("en-GB")} tiles · {club.short}
                </span>
              </span>
            </Link>
          </div>
        </div>
        <RoomStrip />
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-7 pb-28 lg:pb-12">
        {children}
      </main>

      <footer className="border-t border-border bg-surface/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <TileMark size={24} />
              <span className="font-display text-sm tracking-[0.16em]">MOSAICO</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted">
              Every fan is a tile. Together, the picture. A participation layer for
              LALIGA nights — built as a working prototype.
            </p>
            <p className="mt-4 text-xs text-faint">
              Built with Neon Postgres and deployed on Vercel. Independent concept for the
              LALIGA Beyond The Match challenge.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:justify-items-end">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>

      <nav className="fixed right-0 bottom-0 left-0 z-30 border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden">
        <ul className="grid grid-cols-6">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = path === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 text-[9px] tracking-wide uppercase",
                    active ? "text-fg" : "text-muted",
                  )}
                >
                  <Icon className="size-4" strokeWidth={active ? 2.2 : 1.8} />
                  {lang === "es" ? item.es : item.short}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <RegisterGate />
      <PassportOverlay />
    </div>
  );
}
