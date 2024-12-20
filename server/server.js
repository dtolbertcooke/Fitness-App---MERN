import "dotenv/config";

import express from "express";
import cors from "cors";
import users from "./routes/users.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", users);

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    // start the Express server
    app.listen(process.env.PORT, () => {
      console.log("Server listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
