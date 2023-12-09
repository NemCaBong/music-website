import { Response, Request } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/system";

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

// [GET] /admin/songs/create
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

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  let avatar = "";
  let audio = "";

  if (req.body.avatar) {
    avatar = req.body.avatar[0];
  }

  if (req.body.audio) {
    audio = req.body.audio[0];
  }

  try {
    const dataSong = {
      title: req.body.title,
      topicId: req.body.topicId,
      singerId: req.body.singerId,
      description: req.body.description,
      status: req.body.status,
      avatar: avatar,
      audio: audio,
      lyrics: req.body.lyrics,
    };
    // không truyền req.body luôn vào db
    const song = new Song(dataSong);
    await song.save();

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
  // trong HTML nếu muốn gửi ảnh vs các file phức tạp khác
  // qua form thì chúng ta phải thêm multipart/form-data
  // và trong nodejs khi nó đi vào router
  // trước khi chạy vào controller
  // thì chúng ta phải cho nó chạy qua multer để thư viện nó phân tích
  // rồi req.body mới chứa data được.
};

// [GET] /admin/songs/edit/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const song = await Song.findOne({
      _id: id,
      deleted: false,
    });

    const topics = await Topic.find({
      deleted: false,
    }).select("title");

    const singers = await Singer.find({
      deleted: false,
    }).select("fullName");

    res.render("admin/pages/songs/edit", {
      pageTitle: "Chỉnh sửa bài hát",
      song: song,
      topics: topics,
      singers: singers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [PATCH] /admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const dataSong: {} = {
      title: req.body.title,
      topicId: req.body.topicId,
      singerId: req.body.singerId,
      description: req.body.description,
      status: req.body.status,
      lyrics: req.body.lyrics,
    };
    if (req.body.avatar) {
      dataSong["avatar"] = req.body.avatar[0];
    }

    if (req.body.audio) {
      dataSong["audio"] = req.body.audio[0];
    }

    await Song.updateOne(
      {
        _id: id,
      },
      dataSong
    );
    res.redirect("back");
  } catch (error) {
    console.log(error);
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
  }
};
