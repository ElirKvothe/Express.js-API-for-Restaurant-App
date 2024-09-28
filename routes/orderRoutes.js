const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Tüm siparişleri listele
router.get('/', orderController.getAllOrders);

// Belirli bir siparişi ID ile getir
router.get('/:id', orderController.getOrderById);

// Yeni bir sipariş oluştur
router.post('/', orderController.createOrder);

// Bir siparişi güncelle
router.put('/:id', orderController.updateOrder);

// Bir siparişi sil
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
