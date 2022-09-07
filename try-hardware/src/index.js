var SerialPort = require("serialport");
var port = "COM4";
var message = "Portal WeighBridge";


try {

    var serialPort = SerialPort(port, {
        baudRate: 9600,
      });
      
      serialPort.on("error", function (err) {
        console.log(err);
      });
      
      serialPort.open(function (err) {
        if (err) {
          console.log("Error:!!");
        }
      
        serialPort.write(message, function (err) {
          if (err) {
            return console.log("Error on write: ", err.message);
          }
          console.log("Message sent successfully");
        });
      
        serialPort.on("open", function () {
          console.log("-- Connection opened --");
          serialPort.on("data", function (data) {
            console.log("Data received: " + data);
          });
        });
      });
          
} catch (error) {
    console.log("Error: ", error)
}