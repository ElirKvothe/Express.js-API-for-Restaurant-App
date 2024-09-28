const pool = require('../config/db');

// Tüm kullanıcıları listeleme
exports.getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

// Belirli bir kullanıcıyı ID ile getirme
exports.getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

// Yeni kullanıcı oluşturma
exports.createUser = async (company_id, role, name, surname, username, password, balance) => {
    const result = await pool.query(
        'INSERT INTO users (company_id, role, name, surname, username, password, balance) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [company_id, role, name, surname, username, password, balance]
    );
    return result.rows[0];
};

// Kullanıcı güncelleme
exports.updateUser = async (id, company_id, role, name, surname, username, password, balance) => {
    const result = await pool.query(
        'UPDATE users SET company_id = $1, role = $2, name = $3, surname = $4, username = $5, password = $6, balance = $7 WHERE id = $8 RETURNING *',
        [company_id, role, name, surname, username, password, balance, id]
    );
    return result.rows[0];
};

// Kullanıcı silme
exports.deleteUser = async (id) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return result;
};
