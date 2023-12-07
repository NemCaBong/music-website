import { Router } from "express";
import * as controller from "../../controllers/admin/dashboard.controller";
const router: Router = Router();

// [GET] /admin/dashboard
router.get("/", controller.index);
export const dashboardRoutes = router;
