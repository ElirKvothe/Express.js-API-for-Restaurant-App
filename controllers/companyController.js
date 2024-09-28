const companyModel = require('../models/companyModel');

// Tüm şirketleri listeleme
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await companyModel.getAllCompanies();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Belirli bir şirketi ID ile getirme
exports.getCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await companyModel.getCompanyById(id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yeni şirket oluşturma
exports.createCompany = async (req, res) => {
    const { name, description, logo_path } = req.body;
    try {
        const newCompany = await companyModel.createCompany(name, description, logo_path);
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Şirket güncelleme
exports.updateCompany = async (req, res) => {
    const { id } = req.params;
    const { name, description, logo_path } = req.body;
    try {
        const updatedCompany = await companyModel.updateCompany(id, name, description, logo_path);
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(updatedCompany);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Şirket silme
exports.deleteCompany = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await companyModel.deleteCompany(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
