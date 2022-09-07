import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { BadRequestError } from "../../errors/bad-request-error";
import { User } from "../../models/user";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("username").notEmpty().withMessage("Please provide user's username"),
    body("role").notEmpty().withMessage("Please provide user role"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("name").notEmpty().withMessage("Please provide user's name"),
    body("password").notEmpty().withMessage("Please provide your password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let { name, email, role, username, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new BadRequestError(
        "User with the already provided credentials exists"
      );
    }
    const user = await User.create({ username, name, password, role, email });

    const newUsers = {
      email: user.getDataValue("email"),
      username: user.getDataValue("username"),
      role: user.getDataValue("role"),
      name: user.getDataValue("name"),
    };
    res.status(201).json({
      user: {
        ...user.toJSON(),
        id: user.id,
      },
      status: "success",
      message: "Successfully create new account",
    });
  }
);

export { router as signUpRouter };
