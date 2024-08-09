const getPool = require("../infraestructure/database");

const addReview = async (idUser, idCar, comment, rating) => {
    const pool = await getPool();
    const now = new Date();

    const sql = `
            INSERT INTO reviews (idUser, idCar, comment, rating, createdAt)
            VALUES( ?, ?, ?, ?, ?)
      `;

    const [created] = await pool.query(sql, [
        idUser,
        idCar,
        comment,
        rating,
        now,
    ]);

    return created.insertId;
};

const findReviewsByIdCar = async (idCar) => {
    const pool = await getPool();

    const sql = `
            SELECT reviews.*,users.name 
            FROM reviews 
            JOIN users ON users.id = reviews.idUser
            WHERE idCar = ?
      `;

    const [review] = await pool.query(sql, idCar);

    return review;
};

const findReviewsById = async (idReviews) => {
    const pool = await getPool();

    const sql = `
      SELECT reviews.*, users.name FROM reviews 
      JOIN users ON users.id = reviews.idUser
      WHERE reviews.id = ?
      `;

    const [reviews] = await pool.query(sql, idReviews);

    return reviews[0];
};

const removeReviewById = async (idReviews) => {
    const pool = await getPool();

    const sql = `
            DELETE FROM reviews WHERE id = ?
      `;

    await pool.query(sql, idReviews);

    return true;
};

const getRating = async(idCar) => {
      const pool = await getPool();
      const sql = `
        SELECT
        Round (AVG(rating), 0) as media,
        COUNT(rating) as numValoraciones
        FROM reviews WHERE idCar = ?`;
      const [reviews] = await pool.query(sql, idCar);
    
      return reviews[0];
}    

module.exports = {
    addReview,
    findReviewsById,
    findReviewsByIdCar,
    getRating,
    removeReviewById,
};
