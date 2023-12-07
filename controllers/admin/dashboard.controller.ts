import { Response, Request } from "express";

export const index = (req: Request, res: Response) => {
  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tổng quan",
  });
};
