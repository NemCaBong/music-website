import multer from "multer";
import { Router } from "express";
import * as controller from "../../controllers/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer();
const router: Router = Router();

// [GET] /admin/songs
router.get("/", controller.index);

// [GET] /admin/songs/create
router.get("/create", controller.create);

// [POST] /admin/songs/create
router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  controller.createPost
);
export const songRoutes = router;
