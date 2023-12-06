import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { converToSlug } from "../../helpers/convertToSlug";

// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  // mảng chứa kết quả
  let result = [];

  // thực tế sau này khi đi làm
  // trong db có 1 trường là searchUnicode trong DB
  // nó giống trường slug nhưng nó k có các dấu trừ
  // vd: cat-doi-noi-sau => searchUNICODE = "cat doi noi sau"

  if (keyword) {
    const regex = new RegExp(keyword, "i");
    const unidecodeKeyword = converToSlug(keyword);
    const slugRegex = new RegExp(unidecodeKeyword, "i");

    // tìm theo giá trị unicode với title
    // tìm theo giá trị plain text với slug
    const songs = await Song.find({
      $or: [{ title: regex }, { slug: slugRegex }],
      deleted: false,
    });

    // [] thì ko đc coi là falsy
    if (songs.length > 0) {
      for (const song of songs) {
        const infoSinger = await Singer.findOne({
          _id: song.singerId,
        });
        song["infoSinger"] = infoSinger;
      }
      result = songs;
    }
  }

  res.render("client/pages/search/result", {
    pageTitle: `Kết quả: ${keyword}`,
    // để trả ra ô input
    keyword: keyword,
    songs: result,
  });
};
