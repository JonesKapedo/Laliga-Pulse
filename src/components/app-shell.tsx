import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  Flag,
  Home,
  Radio,
  Trophy,
  Users,
} from "lucide-react";
import { CLUBS, MOMENTS } from "@/data/pulse-data";
import { usePulse, useRank } from "@/store/pulse-store";
import { Crest } from "@/components/crest";
import { Button } from "@/components/ui/button";
import { RoomStrip } from "@/components/room-strip";
import { RegisterGate } from "@/components/register-gate";
import { PassportOverlay } from "@/components/passport";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Matchday", short: "Day", es: "Jornada", icon: Home },
  { to: "/match", label: "The ninety", short: "Ninety", es: "Los 90", icon: Radio },
  { to: "/stand", label: "The stand", short: "Stand", es: "Grada", icon: Users },
  { to: "/rank", label: "Your rank", short: "Rank", es: "Rango", icon: Trophy },
  { to: "/board", label: "The book", short: "Book", es: "Libro", icon: BookOpen },
  { to: "/season", label: "Season", short: "Season", es: "Liga", icon: Flag },
];

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const phase = usePulse((s) => s.phase);
  const clubId = usePulse((s) => s.clubId);
  const momentIndex = usePulse((s) => s.momentIndex);
  const nextMoment = usePulse((s) => s.nextMoment);
  const jumpPhase = usePulse((s) => s.jumpPhase);
  const restartNight = usePulse((s) => s.restartNight);
  const rank = useRank();
  const moment = MOMENTS[momentIndex];
  const club = CLUBS[clubId];
  const lang = usePulse((s) => s.lang);
  const setLang = usePulse((s) => s.setLang);

  useEffect(() => {
    void usePulse.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-sm bg-accent font-display text-sm font-semibold tracking-wider text-accent-fg">
              LP
            </span>
            <span className="leading-none">
              <span className="block font-display text-[11px] tracking-[0.22em] text-muted uppercase">
                LALIGA
              </span>
              <span className="font-display text-lg tracking-wide">PULSE</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors duration-150",
                  path === item.to
                    ? "bg-raised text-fg"
                    : "text-muted hover:text-fg",
                )}
              >
                {lang === "es" ? item.es : item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-border bg-surface p-0.5 text-[11px] font-display tracking-wider">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "min-h-8 rounded-full px-2",
                  lang === "en" ? "bg-raised text-fg" : "text-muted",
                )}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={cn(
                  "min-h-8 rounded-full px-2",
                  lang === "es" ? "bg-raised text-fg" : "text-muted",
                )}
              >
                ES
              </button>
            </div>
            <span className="hidden items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1 sm:flex">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  phase === "live" ? "live-dot bg-accent" : "bg-muted",
                )}
              />
              <span className="font-display text-xs tracking-wider uppercase text-muted">
                {phase === "tunnel" && "Tunnel"}
                {phase === "live" && "Live"}
                {phase === "break" && "Break"}
                {phase === "whistle" && "Full-time"}
              </span>
            </span>
            <Link
              to="/rank"
              className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1"
            >
              <Crest clubId={clubId} size={26} />
              <span className="hidden text-xs sm:block">
                <span className="block font-medium leading-none">{rank.current.title}</span>
                <span className="text-muted">{club.short}</span>
              </span>
            </Link>
          </div>
        </div>
        <RoomStrip />
        <div className="border-t border-border bg-surface/80">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1.5">
            <div className="flex items-center gap-2 text-xs text-muted">
              <Activity className="size-3.5" />
              <span className="font-display tracking-wider uppercase">Demo night</span>
              <span className="hidden sm:inline">· {moment.minuteLabel}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Button size="sm" variant="subtle" onClick={() => jumpPhase("tunnel")}>
                Tunnel
              </Button>
              <Button size="sm" variant="subtle" onClick={() => jumpPhase("live")}>
                Kick-off
              </Button>
              <Button size="sm" variant="subtle" onClick={nextMoment}>
                Next moment
              </Button>
              <Button size="sm" variant="subtle" onClick={() => jumpPhase("whistle")}>
                Full-time
              </Button>
              <Button size="sm" variant="outline" onClick={restartNight}>
                Restart
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-24 md:pb-10">
        {children}
      </main>

      <nav className="fixed right-0 bottom-0 left-0 z-30 border-t border-border bg-bg/95 backdrop-blur-md md:hidden">
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
