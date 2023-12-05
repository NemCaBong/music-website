import { Router } from "express";
import * as controller from "../../controllers/client/song.controller";

const router: Router = Router();
// [GET] /songs/:slugTopic
router.get("/:slugTopic", controller.list);

// [GET] /songs/detail/:slugSong
router.get("/detail/:slugSong", controller.detail);

// tạo 1 middleware để sau này khi đã có tính năng login/register rồi
// thì ko cho người dùng like nếu chưa login
// [PATCH] /songs/like/:typeLike/:idSong
router.patch("/like/:typeLike/:idSong", controller.like);

// [PATCH] /songs/favorite/:typeFavorite/:idSong
router.patch("/favorite/:typeFavorite/:idSong", controller.favorite);
export const songRoutes: Router = router;
