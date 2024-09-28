const orderModel = require('../models/orderModel');

// Tüm siparişleri listeleme
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Belirli bir siparişi ID ile getirme
exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderModel.getOrderById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yeni sipariş oluşturma
exports.createOrder = async (req, res) => {
    const { order_status, total_price } = req.body;
    try {
        const newOrder = await orderModel.createOrder(order_status, total_price);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sipariş güncelleme
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { order_status, total_price } = req.body;
    try {
        const updatedOrder = await orderModel.updateOrder(id, order_status, total_price);
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sipariş silme
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await orderModel.deleteOrder(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
