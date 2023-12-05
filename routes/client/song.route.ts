import { Router } from "express";
import * as controller from "../../controllers/client/song.controller";

const router: Router = Router();
// [GET] /songs/:slugTopic
router.get("/:slugTopic", controller.list);

// [GET] /songs/detail/:slugSong
router.get("/detail/:slugSong", controller.detail);

// [PATCH] /songs/like/:typeLike/:idSong

// tạo 1 middleware để sau này khi đã có tính năng login/register rồi
// thì ko cho người dùng like nếu chưa login
router.patch("/like/:typeLike/:idSong", controller.like);

export const songRoutes: Router = router;
