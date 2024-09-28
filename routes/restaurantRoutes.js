const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Tüm restoranları listele
router.get('/', restaurantController.getAllRestaurants);

// Belirli bir restoranı ID ile getir
router.get('/:id', restaurantController.getRestaurantById);

// Yeni bir restoran oluştur
router.post('/', restaurantController.createRestaurant);

// Bir restoranı güncelle
router.put('/:id', restaurantController.updateRestaurant);

// Bir restoranı sil
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;
