declare global {
  type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  type Birthday = {
    year?: number;
    month: Month;
    day: number;
  };

  type HtmlFile = `${string}.html`;
}

export {};
