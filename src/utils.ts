export const shuffleArray = (array: string[]): string[] =>
  [...array].sort(() => Math.random() - 0.5);
