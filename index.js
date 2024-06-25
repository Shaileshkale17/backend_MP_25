import dotenv from "dotenv";
import { ConnectDB } from "./DB/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 3001;

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connecting to ${port}`);
    });
    app.on("error", (error) => {
      console.log(`Error: ${error}`);
      throw error;
    });
  })
  .catch((error) => {
    console.log(`MONGO DB CONNECTION ERROR: ${error}`);
  });
