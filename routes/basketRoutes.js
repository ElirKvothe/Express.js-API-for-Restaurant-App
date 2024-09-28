const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');

// Tüm sepetleri listele
router.get('/', basketController.getAllBaskets);

// Belirli bir sepet öğesini ID ile getir
router.get('/:id', basketController.getBasketById);

// Belirli bir kullanıcının sepetini getir
router.get('/user/:user_id', basketController.getBasketByUserId);

// Yeni sepet öğesi ekle
router.post('/', basketController.createBasketItem);

// Sepet öğesini güncelle
router.put('/:id', basketController.updateBasketItem);

// Sepet öğesini sil
router.delete('/:id', basketController.deleteBasketItem);

module.exports = router;
