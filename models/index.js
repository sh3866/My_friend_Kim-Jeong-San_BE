const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Account = require("./account");
const Payment = require("./payment");
const Room = require("./room");
const Receipt = require("./receipt");
const AccountBook = require("./accountBook");
const Menu = require("./menu");
const userRoom = require("./userRoom");
const UserRoom = require("./userRoom");

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
db.Payment = Payment;
db.Room = Room;
db.Receipt = Receipt;
db.Menu = Menu;
db.AccountBook = AccountBook;
db.UserRoom = UserRoom;

User.init(sequelize);
Account.init(sequelize);
Payment.init(sequelize);
Room.init(sequelize);
Receipt.init(sequelize);
AccountBook.init(sequelize);
Menu.init(sequelize);
UserRoom.init(sequelize);

User.associate(db);
Account.associate(db);
Room.associate(db);
Receipt.associate(db);
Payment.associate(db);
Menu.associate(db);

module.exports = db;
