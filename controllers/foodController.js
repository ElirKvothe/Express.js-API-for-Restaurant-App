const foodModel = require('../models/foodModel');

// Tüm yemekleri listeleme
exports.getAllFoods = async (req, res) => {
    try {
        const foods = await foodModel.getAllFoods();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Belirli bir yemeği ID ile getirme
exports.getFoodById = async (req, res) => {
    const { id } = req.params;
    try {
        const food = await foodModel.getFoodById(id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(food);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yeni yemek oluşturma
exports.createFood = async (req, res) => {
    const { restaurant_id, name, description, image_path, price, discount } = req.body;
    try {
        const newFood = await foodModel.createFood(restaurant_id, name, description, image_path, price, discount);
        res.status(201).json(newFood);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yemek güncelleme
exports.updateFood = async (req, res) => {
    const { id } = req.params;
    const { restaurant_id, name, description, image_path, price, discount } = req.body;
    try {
        const updatedFood = await foodModel.updateFood(id, restaurant_id, name, description, image_path, price, discount);
        if (!updatedFood) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(updatedFood);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yemek silme
exports.deleteFood = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await foodModel.deleteFood(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
