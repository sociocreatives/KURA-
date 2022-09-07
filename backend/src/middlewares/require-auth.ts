import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "./../errors/index";
import { Token } from "./../models/index";
import { UserPayload } from "./../types";
import appConfig from "../config/default.config";
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new NotAuthorizedError();
    }

    // const availableToken = await Token.findOne({
    //   token,
    //   is_active: true,
    // });

    // if (!availableToken) {
    //   throw new NotAuthorizedError();
    // }

    const payload = jwt.verify(token, appConfig.JWT_SECRET) as UserPayload;

    if (!payload.id || payload.id === "") {
      throw new NotAuthorizedError();
    }
    req.user = payload;
  } catch (err) {
    throw new NotAuthorizedError();
  }
  next();
};
