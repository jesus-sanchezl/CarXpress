const getPool = require("../infraestructure/database");

const findAllCars = async () => {
    const pool = await getPool();

    const sql = "SELECT * FROM cars";

    const [cars] = await pool.query(sql);

    return cars;
};

const findCarById = async (id) => {
    const pool = await getPool();

    const sql = `SELECT * FROM cars WHERE id = ?`;

    const [car] = await pool.query(sql, id);

    return car[0];
};

const addCar = async (car) => {
    const pool = await getPool();

    const now = new Date();

    const sql = ` INSERT INTO cars (
            brand,
            model,
            year,
            engine,
            cv,
            createdAt
      ) VALUES( ?, ?, ?, ?, ?, ?)
      `;

    const { brand, model, year, engine, cv } = car;

    const [created] = await pool.query(sql, [
        brand,
        model,
        year,
        engine,
        cv,
        now,
    ]);

    return created.insertId;
};

const removeCarById = async (id) => {
    const pool = await getPool();

    const sql = `
            DELETE FROM cars WHERE id = ?
      `;

    await pool.query(sql, id);

    return true;
};

const updateCar = async (id, body) => {
    const pool = await getPool();
    const now = new Date();

    const sql = `
            UPDATE cars
            SET brand = ?, model = ?, year = ?, engine =?, cv = ?, updatedAt = ?
            WHERE id = ?
      `;

    const { brand, model, year, engine, cv } = body;

    const [result] = await pool.query(sql, [
        brand,
        model,
        year,
        engine,
        cv,
        now,
        id,
    ]);

    return result.affectRows === 1;
};

module.exports = {
    addCar,
    findAllCars,
    findCarById,
    removeCarById,
    updateCar,
};
