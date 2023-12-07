import { Response, Request } from "express";
import Song from "../../models/song.model";

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find({
      deleted: false,
    });

    res.render("admin/pages/songs/index", {
      pageTitle: "Quản lý bài hát",
      songs: songs,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
