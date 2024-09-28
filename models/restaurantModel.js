const pool = require('../config/db');

// Tüm restoranları listeleme
exports.getAllRestaurants = async () => {
    const result = await pool.query('SELECT * FROM restaurant');
    return result.rows;
};

// Belirli bir restoranı ID ile getirme
exports.getRestaurantById = async (id) => {
    const result = await pool.query('SELECT * FROM restaurant WHERE id = $1', [id]);
    return result.rows[0];
};

// Yeni restoran oluşturma
exports.createRestaurant = async (company_id, name, description, image_path) => {
    const result = await pool.query(
        'INSERT INTO restaurant (company_id, name, description, image_path) VALUES ($1, $2, $3, $4) RETURNING *',
        [company_id, name, description, image_path]
    );
    return result.rows[0];
};

// Restoran güncelleme
exports.updateRestaurant = async (id, company_id, name, description, image_path) => {
    const result = await pool.query(
        'UPDATE restaurant SET company_id = $1, name = $2, description = $3, image_path = $4 WHERE id = $5 RETURNING *',
        [company_id, name, description, image_path, id]
    );
    return result.rows[0];
};

// Restoran silme
exports.deleteRestaurant = async (id) => {
    const result = await pool.query('DELETE FROM restaurant WHERE id = $1', [id]);
    return result;
};
