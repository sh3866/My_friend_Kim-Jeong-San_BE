const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Account = require("./account");
const Friend = require("./friend");
const Payment = require("./payment");
const Room = require("./room");
const Receipt = require("./receipt");

const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;

//아래 추가
db.User = User;
db.Account = Account;
db.Friend = Friend;
db.Payment = Payment;
db.Room = Room;
db.Receipt = Receipt;

User.init(sequelize);
Account.init(sequelize);
Friend.init(sequelize);
Payment.init(sequelize);
Room.init(sequelize);
Receipt.init(sequelize);

User.associate(db);
Account.associate(db);
Friend.associate(db);
Room.associate(db);
Receipt.associate(db);
Payment.associate(db);

module.exports = db;
