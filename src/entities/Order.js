const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order",
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