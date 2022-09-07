import express from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { Request, Response } from "express";
import { User } from "./../../models";
import { validateRequest } from "./../../middlewares/validate-request";
import { BadRequestError } from "./../../errors/bad-request-error";
import { PasswordManager } from "./../../utils/password-manager";
import appConfig from "../../config/default.config";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("username").notEmpty().withMessage("Please provide your username."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Please provide your password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
      where: { username },
    });

    if (!existingUser) {
      throw new BadRequestError("Sorry. Invalid username or password");
    }
    const passwordMatch = await PasswordManager.compare(
      existingUser.getDataValue("password"),
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Sorry. Invalid username or password");
    }

    // login the user
    const token = jwt.sign(
      {
        id: existingUser.getDataValue("id"),
        email: existingUser.getDataValue("email"),
        username: existingUser.getDataValue("username"),
        photo: existingUser.getDataValue("photo"),
        name: existingUser.getDataValue("name"),
        role: existingUser.getDataValue("role"),
      },
      appConfig.JWT_SECRET
    );

    // add auth token
    req.session = {
      jwt: token,
    };

    res.status(200).json({
      status: "success",
      token,
    });
  }
);

export { router as signInRouter };
