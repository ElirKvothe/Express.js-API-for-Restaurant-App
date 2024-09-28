const restaurantModel = require('../models/restaurantModel');

// Tüm restoranları listeleme
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantModel.getAllRestaurants();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Belirli bir restoranı ID ile getirme
exports.getRestaurantById = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await restaurantModel.getRestaurantById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yeni restoran oluşturma
exports.createRestaurant = async (req, res) => {
    const { company_id, name, description, image_path } = req.body;
    try {
        const newRestaurant = await restaurantModel.createRestaurant(company_id, name, description, image_path);
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Restoran güncelleme
exports.updateRestaurant = async (req, res) => {
    const { id } = req.params;
    const { company_id, name, description, image_path } = req.body;
    try {
        const updatedRestaurant = await restaurantModel.updateRestaurant(id, company_id, name, description, image_path);
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Restoran silme
exports.deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await restaurantModel.deleteRestaurant(id);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
