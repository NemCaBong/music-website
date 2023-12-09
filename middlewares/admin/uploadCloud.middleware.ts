import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToCloudinary";

export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await uploadToCloudinary(req["file"].buffer);
    req.body[req["file"].fieldname] = result;
  } catch (error) {
    console.log(error);
  }

  next();
};
export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req["files"]);

  for (const key in req["files"]) {
    // tạo mảng rỗng
    req.body[key] = [];

    const arr = req["files"][key];

    for (const obj of arr) {
      try {
        // up lên cloud vào push vào req.body để nhận về
        const result = await uploadToCloudinary(obj.buffer);
        req.body[key].push(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  next();
};
