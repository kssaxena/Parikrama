import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("ERROR", err);
    });
    // i have added 0.0.0.0 in a string for connecting the backend to all devices which are connected with the same network
    app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
      console.log("Server port:" + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("mongoDB connection failed", err);
  });
