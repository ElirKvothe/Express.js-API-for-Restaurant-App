const pool = require('../config/db');

// Tüm yemekleri listeleme
exports.getAllFoods = async () => {
    const result = await pool.query('SELECT * FROM food');
    return result.rows;
};

// Belirli bir yemeği ID ile getirme
exports.getFoodById = async (id) => {
    const result = await pool.query('SELECT * FROM food WHERE id = $1', [id]);
    return result.rows[0];
};

// Yeni yemek oluşturma
exports.createFood = async (restaurant_id, name, description, image_path, price, discount) => {
    const result = await pool.query(
        'INSERT INTO food (restaurant_id, name, description, image_path, price, discount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [restaurant_id, name, description, image_path, price, discount]
    );
    return result.rows[0];
};

// Yemek güncelleme
exports.updateFood = async (id, restaurant_id, name, description, image_path, price, discount) => {
    const result = await pool.query(
        'UPDATE food SET restaurant_id = $1, name = $2, description = $3, image_path = $4, price = $5, discount = $6 WHERE id = $7 RETURNING *',
        [restaurant_id, name, description, image_path, price, discount, id]
    );
    return result.rows[0];
};

// Yemek silme
exports.deleteFood = async (id) => {
    const result = await pool.query('DELETE FROM food WHERE id = $1', [id]);
    return result;
};
