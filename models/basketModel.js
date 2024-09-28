const pool = require('../config/db');

// Tüm sepetleri listeleme
exports.getAllBaskets = async () => {
    const result = await pool.query('SELECT * FROM basket');
    return result.rows;
};

// Belirli bir sepeti ID ile getirme
exports.getBasketById = async (id) => {
    const result = await pool.query('SELECT * FROM basket WHERE id = $1', [id]);
    return result.rows[0];
};

// Bir kullanıcının sepetini getirme
exports.getBasketByUserId = async (user_id) => {
    const result = await pool.query('SELECT * FROM basket WHERE user_id = $1', [user_id]);
    return result.rows;
};

// Yeni sepet öğesi ekleme
exports.createBasketItem = async (user_id, food_id, note, quantity) => {
    const result = await pool.query(
        'INSERT INTO basket (user_id, food_id, note, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, food_id, note, quantity]
    );
    return result.rows[0];
};

// Sepet öğesi güncelleme
exports.updateBasketItem = async (id, user_id, food_id, note, quantity) => {
    const result = await pool.query(
        'UPDATE basket SET user_id = $1, food_id = $2, note = $3, quantity = $4 WHERE id = $5 RETURNING *',
        [user_id, food_id, note, quantity, id]
    );
    return result.rows[0];
};

// Sepet öğesi silme
exports.deleteBasketItem = async (id) => {
    const result = await pool.query('DELETE FROM basket WHERE id = $1', [id]);
    return result;
};
