import express, {
  NextFunction,
  RequestHandler,
  Request,
  Response,
} from "express";
import http from "http";
import cors from "cors";
import io from "socket.io";
const SerialPort = require("serialport");
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/index";
import { Setting } from "./models/setting"
import "express-async-errors";

const app = express();

const server = http.createServer(app);

//MIDDLEWARES
app.use(cors());
app.set("trust proxy", 1);
app.use(
  cookieSession({
    signed: false,
    httpOnly: true,
  })
);

app.use(express.json({ limit: "3000mb" }) as RequestHandler);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
// STATIC FILES

// SOCKETS

const socket = new io.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let records: number[] = [108];


const loadSerialPort = async () => {
  const settings = await Setting.findAll();
  let port = "COM4";
  const message = "Portal WeighBridge";
  if (settings.length > 0) {
    console.log(settings[0]);
    port = settings[0].serial_port;
  }
  try {
    const serialPort = SerialPort(port, {
      baudRate: 9600,
    });

    serialPort.on("error", function (err: any) {
      console.log(err);
    });

    serialPort.open(function (err: any) {
      if (err) {
        console.log("Error:!!", err);
      }

      serialPort.write(message, function (err: any) {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
        console.log("Message sent successfully");
      });

      serialPort.on("data", function (data: any) {
        // console.log(typeof Buffer.from(data).toString());
        //data  =  GG, GJ, 0000135KG
        // console.log(data)
        // console.log(Buffer.from(data).toString().replace(/\D/g, "")); // ["GG","GJ","0000135KG"]
        let weight = Buffer.from(data).toString().replace(/\D/g, "")
        if (parseFloat(weight)) {
          console.log(`weight: ${parseFloat(weight)}`);
          records.push(parseFloat(weight));
        }
      });
    });

  } catch (error) {
    console.log("Error: ", error)
  }


}

// enable it on production
loadSerialPort();

// ADD ROUTES

import "./routes/index";

// serial port records
app.get(
  "/api/get-records",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      readings: records,
    });
  }
);
/**
 * NOT FOUND
 */
app.all("*", async () => {
  throw new NotFoundError();
});

// ERROR Handle Midldeware
app.use(errorHandler);

export { server, app };
