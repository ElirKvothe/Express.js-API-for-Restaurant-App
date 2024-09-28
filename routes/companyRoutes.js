const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Tüm şirketleri listele
router.get('/', companyController.getAllCompanies);

// Belirli bir şirketi ID ile getir
router.get('/:id', companyController.getCompanyById);

// Yeni bir şirket oluştur
router.post('/', companyController.createCompany);

// Bir şirketi güncelle
router.put('/:id', companyController.updateCompany);

// Bir şirketi sil
router.delete('/:id', companyController.deleteCompany);

module.exports = router;
