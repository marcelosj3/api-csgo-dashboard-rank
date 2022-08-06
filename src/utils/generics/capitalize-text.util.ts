export const capitalize = (text: string, title: boolean = false): string => {
  let formattedText: string = text[0].toUpperCase() + text.slice(1);

  if (title) {
    formattedText = text
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  return formattedText;
};
