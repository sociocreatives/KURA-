import express, { Request, Response } from "express";
import { Op } from "sequelize";
import { body } from "express-validator";
import { Reading } from "./../../models/reading";
import { requireAuth, validateRequest } from "../../middlewares/index";
const router = express.Router();

router.post(
  "/api/readings",

  [
    body("transporter").notEmpty().withMessage("Please provider driver's name"),
    body("owner").notEmpty().withMessage("Please provider vehicle owner name"),
    body("source")
      .notEmpty()
      .withMessage("Please provider the vihicle coming from"),
    body("destination")
      .notEmpty()
      .withMessage("Please provider the vehicle is heading to"),
    body("destination")
      .notEmpty()
      .withMessage("Please provider the vehicle registration number"),
    body("cargo")
      .notEmpty()
      .withMessage("Please provider the cargo description of the vehicle"),
    body("weights")
      .notEmpty()
      .withMessage("Please provider the vehicle wieghts"),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    let {
      transporter,
      owner,
      source,
      destination,
      cargo,
      registration,
      weights,
      overloaded,
      serial,
    } = req.body;

    const reading = await Reading.create({
      transporter,
      owner,
      source,
      serial,
      overloaded,
      destination,
      cargo,
      registration,
      weights,
      user_id: parseInt(req.user?.id!),
    });

    res.status(200).json({
      reading: reading,
    });
  }
);

/**
 * GET ALL THE READINGS
 */
router.get(
  "/api/readings",
  requireAuth,
  async (req: Request, res: Response) => {
    const readings = await Reading.findAll({order: [['createdAt', 'DESC']]});
    res.status(200).json({
      readings: readings,
    });
  }
);

router.get(
  "/api/readings/filter",
  // requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(req.params)
    const {start_date, end_date}   =  req.query;
    const where = {
      [Op.or]: [{
          createdAt: {
              [Op.between]: [start_date, end_date]
          },
          
      }, {
        createdAt: {
          [Op.between]: [end_date, start_date]
      }
      }]
  };
    const readings = await Reading.findAll({where});
    res.status(200).json({
      readings: readings,
    });
  }
);
export { router as ReadingRoute };
