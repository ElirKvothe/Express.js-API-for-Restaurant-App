const userModel = require('../models/userModel');

// Tüm kullanıcıları listeleme
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Belirli bir kullanıcıyı ID ile getirme
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yeni kullanıcı oluşturma
exports.createUser = async (req, res) => {
    const { company_id, role, name, surname, username, password, balance } = req.body;
    try {
        const newUser = await userModel.createUser(company_id, role, name, surname, username, password, balance);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcı güncelleme
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { company_id, role, name, surname, username, password, balance } = req.body;
    try {
        const updatedUser = await userModel.updateUser(id, company_id, role, name, surname, username, password, balance);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcı silme
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userModel.deleteUser(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
