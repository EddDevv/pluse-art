export const replaceSymbolToDots = (
  login: string,
  first: number,
  last: number
) => {
  const firstLetters = login.split("").slice(0, first);
  const lastLetters = login.split("").slice(-last);
  const arr = [...firstLetters, "....", ...lastLetters];
  return arr.join("");
};
