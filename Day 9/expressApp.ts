import * as express from "express";
import * as cors from "cors";
import { addNumRouter } from "./controllers/addNum.controller";

// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Register API Endpoints of controllers here
app.get("/", (req, res) => {
  res.send("Hi");
});
app.use("/", addNumRouter);

// export our app
export default app;