const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/user");

dotenv.config();
const { sequelize } = require("./models");
const db = require("./models");

const app = express();
app.set("port", process.env.PORT || 8001);

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결됨.");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // json 파싱

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
