const basketModel = require('../models/basketModel');

// Tüm sepetleri listeleme
exports.getAllBaskets = async (req, res) => {
    try {
        const baskets = await basketModel.getAllBaskets();
        res.json(baskets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Belirli bir sepeti ID ile getirme
exports.getBasketById = async (req, res) => {
    const { id } = req.params;
    try {
        const basket = await basketModel.getBasketById(id);
        if (!basket) {
            return res.status(404).json({ message: 'Basket item not found' });
        }
        res.json(basket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bir kullanıcının sepetini listeleme
exports.getBasketByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const baskets = await basketModel.getBasketByUserId(user_id);
        if (baskets.length === 0) {
            return res.status(404).json({ message: 'No basket items found for this user' });
        }
        res.json(baskets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yeni sepet öğesi ekleme
exports.createBasketItem = async (req, res) => {
    const { user_id, food_id, note, quantity } = req.body;
    try {
        const newBasketItem = await basketModel.createBasketItem(user_id, food_id, note, quantity);
        res.status(201).json(newBasketItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sepet öğesi güncelleme
exports.updateBasketItem = async (req, res) => {
    const { id } = req.params;
    const { user_id, food_id, note, quantity } = req.body;
    try {
        const updatedBasketItem = await basketModel.updateBasketItem(id, user_id, food_id, note, quantity);
        if (!updatedBasketItem) {
            return res.status(404).json({ message: 'Basket item not found' });
        }
        res.json(updatedBasketItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sepet öğesi silme
exports.deleteBasketItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await basketModel.deleteBasketItem(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Basket item not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
