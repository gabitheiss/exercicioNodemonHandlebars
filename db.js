const Sequelize = require('sequelize');
const sequelize = new Sequelize('crud','root','root',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize:sequelize
}