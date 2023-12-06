import unidecode from "unidecode";

export const converToSlug = (text: string): string => {
  const stringUnidecode: string = unidecode(text).trim();

  // /\s+/g: regex để chọn ra tất cả các \s: khoảng trắng
  // +: nhiều khoảng trắng
  // và dùng replace để thay thế bằng "-"
  const slug: string = stringUnidecode.replace(/\s+/g, "-");

  return slug;
};
