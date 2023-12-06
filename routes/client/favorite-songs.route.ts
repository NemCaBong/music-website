import { Router } from "express";
import * as controller from "../../controllers/client/favorite-song.controller";
const router: Router = Router();

// [GET] /favorite-songs
router.get("/", controller.index);

export const favoriteSongsRoutes = router;
