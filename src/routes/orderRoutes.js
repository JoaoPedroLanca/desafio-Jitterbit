const express = require("express");

const {
    createOrder,
    getOrderById,
    ordersList,
    updateOrder,
    deleteOrder
} = require("../controllers/OrderController");

const router = express.Router();

router.post("/", createOrder);

router.get("/list", ordersList);

router.get("/:orderId", getOrderById);

router.put("/:orderId", updateOrder);

router.delete("/:orderId", deleteOrder);

module.exports = router;