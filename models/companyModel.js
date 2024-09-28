const pool = require('../config/db');

// Tüm şirketleri listeleme
exports.getAllCompanies = async () => {
    const result = await pool.query('SELECT * FROM company');
    return result.rows;
};

// Belirli bir şirketi ID ile getirme
exports.getCompanyById = async (id) => {
    const result = await pool.query('SELECT * FROM company WHERE id = $1', [id]);
    return result.rows[0];
};

// Yeni şirket oluşturma
exports.createCompany = async (name, description, logo_path) => {
    const result = await pool.query(
        'INSERT INTO company (name, description, logo_path) VALUES ($1, $2, $3) RETURNING *',
        [name, description, logo_path]
    );
    return result.rows[0];
};

// Şirket güncelleme
exports.updateCompany = async (id, name, description, logo_path) => {
    const result = await pool.query(
        'UPDATE company SET name = $1, description = $2, logo_path = $3 WHERE id = $4 RETURNING *',
        [name, description, logo_path, id]
    );
    return result.rows[0];
};

// Şirket silme
exports.deleteCompany = async (id) => {
    const result = await pool.query('DELETE FROM company WHERE id = $1', [id]);
    return result;
};
