const pool = require('../config/db');

// Tüm siparişleri listeleme
exports.getAllOrders = async () => {
    const result = await pool.query('SELECT * FROM orders');
    return result.rows;
};

// Belirli bir siparişi ID ile getirme
exports.getOrderById = async (id) => {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
};

// Yeni sipariş oluşturma
exports.createOrder = async (order_status, total_price) => {
    const result = await pool.query(
        'INSERT INTO orders (order_status, total_price) VALUES ($1, $2) RETURNING *',
        [order_status, total_price]
    );
    return result.rows[0];
};

// Sipariş güncelleme
exports.updateOrder = async (id, order_status, total_price) => {
    const result = await pool.query(
        'UPDATE orders SET order_status = $1, total_price = $2 WHERE id = $3 RETURNING *',
        [order_status, total_price, id]
    );
    return result.rows[0];
};

// Sipariş silme
exports.deleteOrder = async (id) => {
    const result = await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    return result;
};
