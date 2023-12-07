import { Router } from "express";
import * as controller from "../../controllers/admin/topic.controller";
const router: Router = Router();

// [GET] /admin/topics

router.get("/", controller.index);
export const topicRoutes = router;
