const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Tüm kullanıcıları listele
router.get('/', userController.getAllUsers);

// Belirli bir kullanıcıyı ID ile getir
router.get('/:id', userController.getUserById);

// Yeni bir kullanıcı oluştur
router.post('/', userController.createUser);

// Bir kullanıcıyı güncelle
router.put('/:id', userController.updateUser);

// Bir kullanıcıyı sil
router.delete('/:id', userController.deleteUser);

module.exports = router;
