const pool = require('../config/db');

// Tüm yorumları listeleme
exports.getAllComments = async () => {
    const result = await pool.query('SELECT * FROM comments');
    return result.rows;
};

// Belirli bir yorumu ID ile getirme
exports.getCommentById = async (id) => {
    const result = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);
    return result.rows[0];
};

// Belirli bir restoranın yorumlarını getirme
exports.getCommentsByRestaurantId = async (restaurant_id) => {
    const result = await pool.query('SELECT * FROM comments WHERE restaurant_id = $1', [restaurant_id]);
    return result.rows;
};

// Yeni yorum oluşturma
exports.createComment = async (user_id, restaurant_id, title, description, score) => {
    const result = await pool.query(
        'INSERT INTO comments (user_id, restaurant_id, title, description, score, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
        [user_id, restaurant_id, title, description, score]
    );
    return result.rows[0];
};

// Yorumu güncelleme
exports.updateComment = async (id, user_id, restaurant_id, title, description, score) => {
    const result = await pool.query(
        'UPDATE comments SET user_id = $1, restaurant_id = $2, title = $3, description = $4, score = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
        [user_id, restaurant_id, title, description, score, id]
    );
    return result.rows[0];
};

// Yorumu silme
exports.deleteComment = async (id) => {
    const result = await pool.query('DELETE FROM comments WHERE id = $1', [id]);
    return result;
};
