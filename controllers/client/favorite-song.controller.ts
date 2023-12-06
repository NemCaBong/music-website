import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-songs.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

export const index = async (req: Request, res: Response) => {
  const favSongs = await FavoriteSong.find({
    // userId: ""
    deleted: false,
  });

  for (const song of favSongs) {
    // thêm info bài hát
    const infoSong = await Song.findOne({
      _id: song.songId,
      deleted: false,
    });
    // thêm info Singer
    const infoSinger = await Singer.findOne({
      _id: infoSong.singerId,
      deleted: false,
    });

    song["infoSong"] = infoSong;
    song["infoSinger"] = infoSinger;
  }

  res.render("client/pages/favorite-songs/index", {
    pageTitle: "Danh sách bài hát yêu thích",
    favoriteSongs: favSongs,
  });
};
