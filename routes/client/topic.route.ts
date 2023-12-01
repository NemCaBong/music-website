import { Router } from "express";
import * as controller from "../../controllers/client/topic.controller";
const router: Router = Router();

// [GET] /topics
router.get("/", controller.index);

export const topicRoutes = router;
