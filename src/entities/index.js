const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const OrderEntity = require("./Order");
const ItemEntity = require("./Item");

const Order = OrderEntity(sequelize, Sequelize.DataTypes);
const Item = ItemEntity(sequelize, Sequelize.DataTypes);

Order.hasMany(Item, {
    as: "items",
    foreignKey: "orderId"
});

Item.belongsTo(Order, {
    as: "order",
    foreignKey: "orderId"
});

module.exports = { sequelize, Sequelize, Order, Item };