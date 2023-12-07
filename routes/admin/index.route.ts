import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/system";

const adminRoutes = (app: Express): void => {
  const adminPath: string = `/${systemConfig.prefixAdmin}`;

  app.use(`${adminPath}/dashboard`, dashboardRoutes);
};
export default adminRoutes;
