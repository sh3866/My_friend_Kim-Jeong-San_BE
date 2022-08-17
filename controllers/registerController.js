const { sequelize, User, Room } = require("../models/index");
const db = require("../config/db");

module.exports = {
    getAccount: function(req, res) {
        var accounts = req.body.accounts;
        var id = req.params.id;
        var sql= 'UPDATE users SET accounts=? WHERE id=?';

        db.query(sql, [accounts, id], function(err, rows, fields) {
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            console.log(id);
            res.send('계좌등록이 완료되었습니다.');
          }
        });
      },
    
}