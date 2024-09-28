const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Tüm yemekleri listele
router.get('/', foodController.getAllFoods);

// Belirli bir yemeği ID ile getir
router.get('/:id', foodController.getFoodById);

// Yeni bir yemek oluştur
router.post('/', foodController.createFood);

// Bir yemeği güncelle
router.put('/:id', foodController.updateFood);

// Bir yemeği sil
router.delete('/:id', foodController.deleteFood);

module.exports = router;
