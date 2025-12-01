const express = require("express");
const autheticateToken = require("../middlewares/authMiddleware");

const {
    createOrder,
    getOrderById,
    ordersList,
    updateOrder,
    deleteOrder
} = require("../controllers/OrderController");

const router = express.Router();

// O usuário vai precisar estar autenticado para todas as outras requisições
router.use(autheticateToken);

router.post("/", createOrder);
router.get("/list", ordersList);
router.get("/:orderId", getOrderById);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

module.exports = router;