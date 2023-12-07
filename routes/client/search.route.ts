import { Router } from "express";
import * as controller from "../../controllers/client/search.controller";
const router: Router = Router();

// [GET] /search/:type
router.get("/:type", controller.result);
export const searchRoutes = router;
