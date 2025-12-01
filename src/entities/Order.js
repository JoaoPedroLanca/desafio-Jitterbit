const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Order = Sequelize.define("Order",
        {
            orderId: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            value: {
                type: DataTypes.DECIMAL(15, 2),
                allowNull: false,
            },
            creationDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: "Order",
            timestamps: false,
        }
    );

    return Order;
}