import { Router } from "express";
import * as controller from "../../controllers/admin/song.controller";
const router: Router = Router();

// [GET] /admin/songs
router.get("/", controller.index);

// [GET] /admin/songs/create
router.get("/create", controller.create);
export const songRoutes = router;
