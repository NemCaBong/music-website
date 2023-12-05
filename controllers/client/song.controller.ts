import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { type } from "os";

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

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  try {
    const slugSong = req.params.slugSong;

    const song = await Song.findOne({
      deleted: false,
      status: "active",
      slug: slugSong,
    });

    const singer = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    }).select("fullName");

    const topic = await Topic.findOne({
      _id: song.topicId,
      status: "active",
      deleted: false,
    }).select("title");

    res.render("client/pages/songs/detail", {
      pageTitle: song.title,
      song: song,
      singer: singer,
      topic: topic,
    });
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
};

// Đoạn này viết theo kiểu API nên sẽ trả về 1 JSON
// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  try {
    const typeLike: string = req.params.typeLike;

    const id: string = req.params.idSong;

    const song = await Song.findOne({
      _id: id,
      deleted: false,
      status: "active",
    });

    const newLike = typeLike === "like" ? song.like + 1 : song.like - 1;
    await Song.updateOne(
      {
        _id: id,
      },
      {
        like: newLike,
      }
    );

    res.json({
      code: 200,
      message: "Thành công",
      like: newLike,
    });
  } catch (error) {
    res.json({
      code: 500,
      message: "Lỗi " + error.message,
    });
  }
};
