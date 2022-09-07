import express, { Request, Response } from "express";
import { User } from "./../../models/user";
import { requireAuth } from "../../middlewares/index";
import { ApiResponse } from "../../utils";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await User.findByPk(req.user?.id);
    let currentUser = {
      email: user?.getDataValue("email"),
      id: user?.getDataValue("id"),
      name: user?.getDataValue("name"),
      photo: user?.getDataValue("photo"),
      role: user?.getDataValue("role"),
      username: user?.getDataValue("username"),
    };

    res.status(200).json({
      status: "sucess",
      user: currentUser,
    });
  }
);

router.get("/api/users", async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.status(200).json({
    status: "success",
    users,
  });
});

export { router as currentUserRouter };
