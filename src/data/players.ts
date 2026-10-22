import type { ClubId } from "@/data/pulse-data";

export type PlayerCard = {
  name: string;
  club: ClubId;
  number: number;
  role: string;
};

/** Marks, not photographs. Real likenesses are not invented. */
export const PLAYERS: PlayerCard[] = [
  { name: "Courtois", club: "rma", number: 1, role: "Goalkeeper" },
  { name: "Carvajal", club: "rma", number: 2, role: "Full back" },
  { name: "Militão", club: "rma", number: 3, role: "Centre back" },
  { name: "Alaba", club: "rma", number: 4, role: "Centre back" },
  { name: "Bellingham", club: "rma", number: 5, role: "Midfield" },
  { name: "Camavinga", club: "rma", number: 6, role: "Midfield" },
  { name: "Vinícius", club: "rma", number: 7, role: "Forward" },
  { name: "Valverde", club: "rma", number: 8, role: "Midfield" },
  { name: "Mbappé", club: "rma", number: 9, role: "Forward" },
  { name: "Rodrygo", club: "rma", number: 11, role: "Forward" },
  { name: "Tchouaméni", club: "rma", number: 14, role: "Midfield" },
  { name: "Güler", club: "rma", number: 15, role: "Midfield" },
  { name: "Endrick", club: "rma", number: 16, role: "Forward" },
  { name: "Ter Stegen", club: "fcb", number: 1, role: "Goalkeeper" },
  { name: "Koundé", club: "fcb", number: 23, role: "Full back" },
  { name: "Araújo", club: "fcb", number: 4, role: "Centre back" },
  { name: "Cubarsí", club: "fcb", number: 2, role: "Centre back" },
  { name: "Balde", club: "fcb", number: 3, role: "Full back" },
  { name: "Pedri", club: "fcb", number: 8, role: "Midfield" },
  { name: "De Jong", club: "fcb", number: 21, role: "Midfield" },
  { name: "Gavi", club: "fcb", number: 6, role: "Midfield" },
  { name: "Olmo", club: "fcb", number: 20, role: "Midfield" },
  { name: "Lamine Yamal", club: "fcb", number: 19, role: "Forward" },
  { name: "Raphinha", club: "fcb", number: 11, role: "Forward" },
  { name: "Lewandowski", club: "fcb", number: 9, role: "Forward" },
  { name: "Fermín", club: "fcb", number: 16, role: "Midfield" },
  { name: "Oblak", club: "atm", number: 13, role: "Goalkeeper" },
  { name: "Giménez", club: "atm", number: 2, role: "Centre back" },
  { name: "Le Normand", club: "atm", number: 24, role: "Centre back" },
  { name: "Molina", club: "atm", number: 16, role: "Full back" },
  { name: "De Paul", club: "atm", number: 5, role: "Midfield" },
  { name: "Barrios", club: "atm", number: 8, role: "Midfield" },
  { name: "Koke", club: "atm", number: 6, role: "Midfield" },
  { name: "Griezmann", club: "atm", number: 7, role: "Forward" },
  { name: "Julián Alvarez", club: "atm", number: 19, role: "Forward" },
  { name: "Sorloth", club: "atm", number: 9, role: "Forward" },
  { name: "Simón", club: "ath", number: 1, role: "Goalkeeper" },
  { name: "Yuri", club: "ath", number: 17, role: "Full back" },
  { name: "Vivian", club: "ath", number: 12, role: "Centre back" },
  { name: "Nico Williams", club: "ath", number: 10, role: "Forward" },
  { name: "Iñaki Williams", club: "ath", number: 9, role: "Forward" },
  { name: "Sancet", club: "ath", number: 8, role: "Midfield" },
  { name: "Unai Gómez", club: "ath", number: 20, role: "Midfield" },
  { name: "Nyland", club: "sev", number: 13, role: "Goalkeeper" },
  { name: "Badé", club: "sev", number: 22, role: "Centre back" },
  { name: "Lukebakio", club: "sev", number: 11, role: "Forward" },
  { name: "Ocampos", club: "sev", number: 5, role: "Midfield" },
  { name: "Remiro", club: "rso", number: 1, role: "Goalkeeper" },
  { name: "Oyarzabal", club: "rso", number: 10, role: "Forward" },
  { name: "Kubo", club: "rso", number: 14, role: "Forward" },
  { name: "Brais Méndez", club: "rso", number: 8, role: "Midfield" },
  { name: "Júnior", club: "vil", number: 1, role: "Goalkeeper" },
  { name: "Baena", club: "vil", number: 16, role: "Midfield" },
  { name: "Pérez", club: "vil", number: 21, role: "Forward" },
  { name: "Gazzaniga", club: "gir", number: 13, role: "Goalkeeper" },
  { name: "Dovbyk", club: "gir", number: 9, role: "Forward" },
  { name: "Tsygankov", club: "gir", number: 8, role: "Forward" },
];

export function findPlayer(name: string) {
  const key = name.toLowerCase();
  return PLAYERS.find((p) => p.name.toLowerCase() === key) ?? null;
}

export const SCORER: Record<"home" | "away", string> = {
  home: "Mbappé",
  away: "Lamine Yamal",
};

export const GROUNDS = [
  ["Real Madrid", "Santiago Bernabéu", "Madrid"],
  ["Barcelona", "Estadi Olímpic", "Barcelona"],
  ["Atlético", "Riyadh Air Metropolitano", "Madrid"],
  ["Athletic", "San Mamés", "Bilbao"],
  ["Sevilla", "Ramón Sánchez-Pizjuán", "Sevilla"],
  ["Real Sociedad", "Reale Arena", "San Sebastián"],
  ["Villarreal", "La Cerámica", "Villarreal"],
  ["Girona", "Montilivi", "Girona"],
  ["Betis", "La Cartuja", "Sevilla"],
  ["Valencia", "Mestalla", "Valencia"],
  ["Celta", "Balaídos", "Vigo"],
  ["Osasuna", "El Sadar", "Pamplona"],
  ["Mallorca", "Son Moix", "Palma"],
  ["Getafe", "Coliseum", "Getafe"],
  ["Rayo", "Vallecas", "Madrid"],
  ["Alavés", "Mendizorrotza", "Vitoria"],
  ["Espanyol", "RCDE Stadium", "Barcelona"],
  ["Leganés", "Butarque", "Leganés"],
  ["Las Palmas", "Gran Canaria", "Las Palmas"],
  ["Valladolid", "José Zorrilla", "Valladolid"],
] as const;

export const WIRE: Array<{ minute: number; text: string }> = [
  { minute: -12, text: "Teams in the tunnel. The room is already loud." },
  { minute: 1, text: "Kick-off. High press from the first touch." },
  { minute: 8, text: "Big chance, big stop. Still 0–0." },
  { minute: 12, text: "Goal. Home side in front. The near end is up." },
  { minute: 23, text: "Penalty shout. Referee waves it away." },
  { minute: 41, text: "Away side camped in the home half." },
  { minute: 45, text: "Half-time. One goal. The card is still blank." },
  { minute: 58, text: "Red card. The shape of the night just changed." },
  { minute: 64, text: "Goal. Level. Both ends have something to defend." },
  { minute: 81, text: "Last stretch. The stand is the twelfth player." },
  { minute: 90, text: "Full-time. One each. The book is open." },
];
