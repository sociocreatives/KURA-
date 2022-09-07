import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "./../../middlewares/validate-request";
import { requireAuth } from "./../../middlewares/require-auth";
import { User } from "./../../models/user";
import { BadRequestError } from "../../errors";

const router = express.Router();

router.patch(
  "/api/users/update-profile",
  [
    body("name").notEmpty().withMessage("Please provide your name"),
    body("email").isEmail().withMessage("Please provide your email address"),
    body("phone").notEmpty().withMessage("Please provide your phone number"),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    const { username, email, photo, name } = req.body;
    const existingUser = await User.findByPk(req.user?.id!);
    if (!existingUser) {
      throw new BadRequestError("User with the details not found");
    }
    existingUser.email = email;
    existingUser.name = name;
    existingUser.username = username;
    existingUser.photo = photo;
    await existingUser.save();
    res.send({
      status: "success",
      message: `Successfully updated your profile`,
      user: existingUser,
    });
  }
);

export { router as updateProfile };
