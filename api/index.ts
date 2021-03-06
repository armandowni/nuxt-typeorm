import express from "express";
import { urlencoded, json } from "body-parser";
import cors from "cors";
import server from "./server";

const app = express();
app.set("trust proxy", 1);
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json({ limit: "10mb" }));

const serve = server();

app.use("/v1", (req, res) => {
  serve
    .then((s) => {
      const { apiRouter } = s.httpRoutes();

      apiRouter(req, res, () => {});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("oops... internal server error");
    });
});

export default { path: "/api", handler: app };
