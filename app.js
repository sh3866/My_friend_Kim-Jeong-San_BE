const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const roomRouter = require("./routes/roomRoute");
const paymentRouter = require("./routes/paymentRoute")

const nunjucks = require('nunjucks');
const axios = require('axios')
const qs = require('qs')
const session = require('express-session');
const bodyParser = require("body-parser");           // body값을 받아서 띄워준다

dotenv.config();
const { sequelize } = require("./models");

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

app.use("/room", roomRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// 라우팅
const home = require("./controllers/home.ctrl");

// 앱 세팅
app.set("views", "./views");
app.set("view engine", "ejs")
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경울 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", home); // use -> 미들웨어를 등록해주는 메서드

module.exports = app;

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
