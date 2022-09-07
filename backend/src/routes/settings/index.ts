import express, { Request, Response } from "express";
import { Op } from "sequelize";
import { body } from "express-validator";
import {  Setting} from "./../../models/setting";
import { requireAuth, validateRequest } from "../../middlewares/index";
import { BadRequestError } from "../../errors";
const router = express.Router();

router.post(
  "/api/settings",

  [
    body("url").notEmpty().withMessage("Please provider Centralised Server URI"),
    body("serial_port").notEmpty().withMessage("Please provider Serial Port"),
    body("overloaded")
      .notEmpty()
      .withMessage("Please provider the overloaded"),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    let {
      url,
      serial_port,
      overloaded,
    } = req.body;

    const settings  =  await Setting.findAll();

    if(settings.length > 0) {
      throw new BadRequestError(`Settings already exists, please update`)
    }

    const setting = await Setting.create({
     
      overloaded,
      url,
      serial_port
    });

    res.status(200).json({
      setting: setting,
    });
  }
);


router.patch(
  "/api/settings/:id",

  [
    body("url").notEmpty().withMessage("Please provider Centralised Server URI"),
    body("serial_port").notEmpty().withMessage("Please provider Serial Port"),
    body("overloaded")
      .notEmpty()
      .withMessage("Please provider the overloaded"),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    let {
      url,
      serial_port,
      overloaded,
    } = req.body;

    const setting  =  await Setting.findByPk(req.params.id);

    if(!setting) {
      throw new BadRequestError(`Settings does not exists`)
    }

    setting.overloaded =  overloaded;
    setting.serial_port =  serial_port;
    setting.url = url;
    await setting.save()

    res.status(200).json({
      setting: setting,
    });
  }
);

/**
 * GET ALL THE READINGS
 */
router.get(
  "/api/setting",
  requireAuth,
  async (req: Request, res: Response) => {
    const setting = await Setting.findAll();
    res.status(200).json({
      setting: setting.length > 0 ? setting[0] : null,
    });
  }
);

export { router as SettingRoute };
