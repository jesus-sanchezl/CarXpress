const getPool = require("../infraestructure/database");

const findAllBrands = async () => {
    const pool = await getPool();

    const sql = "SELECT DISTINCT brand FROM cars ORDER BY RAND()";

    const [brands] = await pool.query(sql);

    return brands;
};

module.exports = findAllBrands;
