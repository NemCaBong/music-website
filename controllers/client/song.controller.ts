import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findOne({
      deleted: false,
      slug: req.params.slugTopic,
    });

    const songs = await Song.find({
      topicId: topic.id,
      status: "active",
      deleted: false,
    }).select("title avatar singerId like createdAt slug");

    console.log(songs);

    for (const song of songs) {
      const singerInfo = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
      }).select("fullName");
      song["infoSinger"] = singerInfo;
    }

    res.render("client/pages/songs/list", {
      pageTitle: "Danh sách bài hát",
      songs: songs,
    });
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
};
