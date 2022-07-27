module.exports = class UserDto {
    userId;
    name;
    constructor(user) {
        this.userId = user.dataValues.id;
        this.name = user.dataValues.name;
    }
};
