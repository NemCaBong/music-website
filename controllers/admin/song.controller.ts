import { Response, Request } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";

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
export const create = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({
      deleted: false,
    }).select("title");

    const singers = await Singer.find({
      deleted: false,
    }).select("fullName");

    res.render("admin/pages/songs/create", {
      pageTitle: "Thêm mới bài hát",
      topics: topics,
      singers: singers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
