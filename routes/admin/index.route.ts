import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/system";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";

const adminRoutes = (app: Express): void => {
  const adminPath: string = `/${systemConfig.prefixAdmin}`;

  app.use(`${adminPath}/songs`, songRoutes);
  app.use(`${adminPath}/topics`, topicRoutes);
  app.use(`${adminPath}/dashboard`, dashboardRoutes);
};
export default adminRoutes;
