export default interface JokeInfo {
  id: number;
  setup?: string;
  punchline: string;
}

export const jokes = [
  {
    id: -1,
    punchline:
      "It's hard to explain puns to kleptomaniacs because they always take things literally",
  },
  {
    id: 0,
    setup: "I got my daughter a fridge for her birthday.",
    punchline: "I can't wait to see her face light up when she opens it.",
  },
  {
    id: 1,
    setup: "How did the hacker escape the police?",
    punchline: "He just ransomware!",
  },
  {
    id: 2,
    setup: "Why don't pirates travel on mountain roads?",
    punchline: "Scurvy.",
  },
  {
    id: 3,
    setup: "Why do bees stay in the hive in the winter?",
    punchline: "Swarm.",
  },
  {
    id: 4,
    setup: "What's the best thing about Switzerland?",
    punchline: "I don't know, but the flag is a big plus!",
  },
];
