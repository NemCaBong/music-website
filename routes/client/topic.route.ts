import { Request, Response, Router } from "express";
import Topic from "../../models/topic.model";
const router: Router = Router();

// [GET] /topics
router.get("/", async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });
  console.log(topics);
  // mặc định res.render đang trong view
  res.render("client/pages/topics/index");
});

export const topicRoutes = router;
