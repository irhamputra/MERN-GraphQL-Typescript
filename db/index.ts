import mongoose from "mongoose";
import { MONGODB_URI } from "../config";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"));
