import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/system";
import { topicRoutes } from "./topic.route";

const adminRoutes = (app: Express): void => {
  const adminPath: string = `/${systemConfig.prefixAdmin}`;

  app.use(`${adminPath}/dashboard`, dashboardRoutes);
  app.use(`${adminPath}/topics`, topicRoutes);
};
export default adminRoutes;
