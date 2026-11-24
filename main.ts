// Warning Label for Humans: One Line, Big Laugh
// Entry program (Node 22, stdlib only, deterministic).
// Holds a bank of ORIGINAL one-line safety warning labels for human beings,
// scores each against the judge's published criteria, and writes only the
// winner to /output/entry.txt (no trailing newline, 1-160 chars, one line).
//
// Scoring (0-3 per axis, weights follow the judge's order):
//   label    x2 — sounds like a real printed warning label (WARNING/CAUTION
//                  + imperative or contents-style wording and rhythm)
//   truth    x3 — feels true about people in general (recognition, not
//                  random absurdity)
//   turn     x3 — the laugh lands in one read, the turn arriving in the
//                  last few words
//   economy  x1 — tight, one idea, no filler, uses the line well
// Highest total wins; ties go to the earliest candidate in the bank.

import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  label: number;
  truth: number;
  turn: number;
  economy: number;
};

const BANK: Candidate[] = [
  {
    // Composition label: the classic contents breakdown, and the turn is
    // the final clause — the human is mostly confidence with no clue.
    text: "WARNING: This human contains 60% water, 30% caffeine, and 10% absolutely no idea what it is doing.",
    label: 3,
    truth: 3,
    turn: 3,
    economy: 3,
  },
  {
    // True of almost everyone: the unsolicited confident lecture.
    text: "CAUTION: Human may suddenly explain something nobody asked about, at length, with total confidence.",
    label: 3,
    truth: 3,
    turn: 2,
    economy: 2,
  },
  {
    // Gremlin-rule label; the turn is the last item in the list.
    text: "WARNING: Do not feed after midnight, shake vigorously, or ask this human how its day went.",
    label: 3,
    truth: 2,
    turn: 2,
    economy: 2,
  },
  {
    // Short and dry; the joke is the second clause arguing about both.
    text: "WARNING: Contents are mostly water with opinions and will argue about both.",
    label: 3,
    truth: 2,
    turn: 2,
    economy: 3,
  },
  {
    // Runs-on list; the turn is the final self-flattering belief.
    text: "CAUTION: This human runs on coffee, deadlines, and the firm belief that it is the exception.",
    label: 3,
    truth: 3,
    turn: 2,
    economy: 2,
  },
  {
    // Remembers the embarrassment forever, forgets the fridge: the turn
    // is the final clause, and the recognition is near-universal.
    text: "WARNING: This human will remember your embarrassing moment from 2014 forever and forget why it opened the fridge.",
    label: 3,
    truth: 3,
    turn: 3,
    economy: 2,
  },
  {
    // One-article expert: very recognisable, but the coffee coda is a
    // second beat after the turn already landed.
    text: "WARNING: This human has read one article and is now an expert. Do not engage before coffee.",
    label: 2,
    truth: 3,
    turn: 2,
    economy: 2,
  },
  {
    // Hobby-starter arc; the turn ("quit by Tuesday") lands last.
    text: "CAUTION: May spontaneously start a new hobby, buy all the equipment, and quit by Tuesday.",
    label: 2,
    truth: 3,
    turn: 3,
    economy: 2,
  },
  {
    // Machine metaphor: overheats, leaks, reboots — true, but the turn
    // is spread across the line rather than saved for the end.
    text: "WARNING: Human overheats when wrong, leaks when sad, and reboots only after eight hours of sleep.",
    label: 3,
    truth: 2,
    turn: 2,
    economy: 2,
  },
  {
    // Keep-away label; the group-chat item is the recognisable turn.
    text: "WARNING: Keep away from open flames, group chats, and anyone asking, 'Can I ask you something?'",
    label: 3,
    truth: 2,
    turn: 2,
    economy: 2,
  },
];

function score(c: Candidate): number {
  return c.label * 2 + c.truth * 3 + c.turn * 3 + c.economy;
}

let best = BANK[0];
let bestScore = score(best);
for (const c of BANK.slice(1)) {
  const s = score(c);
  if (s > bestScore) {
    best = c;
    bestScore = s;
  }
}

const line = best.text;
if (line.length < 1 || line.length > 160) {
  throw new Error(`winner is ${line.length} chars, outside 1-160`);
}
if (line.includes("\n")) {
  throw new Error("winner is not a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
