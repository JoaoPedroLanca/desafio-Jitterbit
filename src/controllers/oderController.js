const { sequelize, Order, Item } = require("../entities");
const mapOrderPayload = require("../utils/mapOrderPayload")

async function createOrder(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
        const mapped = mapOrderPayload(req.body);

        const existing = await Order.findByPk(mapped.orderId, { transaction: transaction });
        if (existing) {
            await transaction.rollback();
            return res.status(409).json({ message: "Pedido já existente" })
        }

        const order = await Order.create(
            {
                orderId: mapped.orderId,
                value: mapped.value,
                creationDate: mapped.creationDate
            },
            { transaction: transaction }
        );

        const itemsToCreate = mapped.items.map((it) => ({
            ...it,
            orderId: mapped.orderId,
        }));

        await Item.bulkCreate(itemsToCreate, { transaction: transaction });

        await transaction.commit();

        const orderWithItem = await Order.findByPk(order.orderId, {
            include: { model: Item, as: "items" }
        });

        return res.status(201).json(orderWithItem);
    } catch (error) {
        await transaction.rollback();
        next(error);
    }

}

async function getOrderById(req, res, next) {
    try {
        const { orderId } = req.params;

        const order = await Order.findByPk(orderId, {
            include: { model: Item, as: "items" }
        });

        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado" })
        }

        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}

async function ordersList(req, res, next) {
    try {
        const orders = await Order.findAll({
            include: { model: Item, as: "items" }
        });

        return res.status(200).json(orders)
    } catch (error) {
        next(error);
    }
}

async function updateOrder(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
        const { orderId } = req.params;

        const existing = await Order.findByPk(orderId, { transaction: transaction });
        if (!existing) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        // Usa o mesmo formato de entrada
        const mapped = mapOrderPayload(req.body);

        // Garante que o ID do path é o mesmo do body (opcional)
        if (mapped.orderId !== orderId) {
            await transaction.rollback();
            return res.status(400).json({ message: 'orderId do body difere do parâmetro' });
        }

        await Order.update(
            {
                value: mapped.value,
                creationDate: mapped.creationDate,
            },
            {
                where: { orderId },
                transaction: transaction,
            }
        );

        // Estratégia simples: apaga itens antigos e recria
        await Item.destroy({ where: { orderId }, transaction: transaction });

        const itemsToCreate = mapped.items.map((it) => ({
            ...it,
            orderId,
        }));

        await Item.bulkCreate(itemsToCreate, { transaction: transaction });

        await transaction.commit();

        const updatedOrder = await Order.findByPk(orderId, {
            include: { model: Item, as: 'items' },
        });

        return res.status(200).json(updatedOrder);
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
}

async function deleteOrder(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
        const { orderId } = req.params;

        const existing = await Order.findByPk(orderId, { transaction: transaction });

        if (!existing) {
            await transaction.rollback();
            return res.status(404).json({ message: "Pedido não encontrado" })
        }

        await Item.destroy({ where: { orderId }, transaction: transaction })
        await Order.destroy({ where: { orderId }, transaction: transaction })

        await transaction.commit();

        return res.status(204).send();
    } catch (error) {
        await transaction.rollback;
        next(error);
    }
}

module.exports = { createOrder, getOrderById, ordersList, updateOrder, deleteOrder };