import { Router } from "express";
import * as controller from "../../controllers/client/song.controller";

const router: Router = Router();
// [GET] /songs/:slugTopic
router.get("/:slugTopic", controller.list);

// [GET] /songs/detail/:slugSong
router.get("/detail/:slugSong", controller.detail);

export const songRoutes: Router = router;
