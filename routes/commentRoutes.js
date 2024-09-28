const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Tüm yorumları listele
router.get('/', commentController.getAllComments);

// Belirli bir yorumu ID ile getir
router.get('/:id', commentController.getCommentById);

// Belirli bir restoranın yorumlarını getir
router.get('/restaurant/:restaurant_id', commentController.getCommentsByRestaurantId);

// Yeni yorum oluştur
router.post('/', commentController.createComment);

// Yorumu güncelle
router.put('/:id', commentController.updateComment);

// Yorumu sil
router.delete('/:id', commentController.deleteComment);

module.exports = router;
