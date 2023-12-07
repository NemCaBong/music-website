import { Router } from "express";
import * as controller from "../../controllers/admin/song.controller";
const router: Router = Router();

// [GET] /admin/songs
router.get("/", controller.index);
export const songRoutes = router;
