const deleteImg = require("../helpers/deleteImage");
const getPool = require("../infraestructure/database");

const findUserByEmail = async (email) => {
    const pool = await getPool();

    const sql = `SELECT id, name, email, password, role, verifiedAt FROM users WHERE email = ?`;

    const [user] = await pool.query(sql, [email]);

    return user[0];
};

const findUserById = async (id) => {
    const pool = await getPool();

    const sql = `SELECT id, name, email, password, image, role, verifiedAt FROM users WHERE id = ?`;

    const [user] = await pool.query(sql, id);

    return user[0];
};

const createUser = async (user) => {
    const pool = await getPool();

    const now = new Date();

    const sql = `INSERT INTO users (name, email, password, verificationCode, role, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const { name, email, password, verificationCode } = user;

    const [created] = await pool.query(sql, [
        name,
        email,
        password,
        verificationCode,
        "reader",
        now,
    ]);

    return created.insertId;
};

const findAllUsers = async () => {
    const pool = await getPool();

    const sql = `SELECT id, name, email, role, image, createdAt, updatedAt, verifiedAt FROM users`;

    const [users] = await pool.query(sql);

    return users;
};

const findUserByVerficiationCode = async (code) => {
    const pool = await getPool();

    const sql = `
            SELECT name, email, verifiedAt
            FROM users WHERE verificationCode = ?
      `;

    const [users] = await pool.query(sql, code);

    return users[0];
};

const activateUserByCode = async (code) => {
    const pool = await getPool();
    const now = new Date();

    const sql = `
            UPDATE users
            SET verifiedAt = ?
            WHERE verificationCode = ?
      `;

    const data = await pool.query(sql, [now, code]);

    return true;
};

const uploadUserImageProfile = async (id, image) => {
    const pool = await getPool();

    const sql = `
            UPDATE users SET image = ? WHERE id = ?
      `;

    await pool.query(sql, [image, id]);

    return true;
};



const updateUserById = async (data) =>{
      const { id, name, email, password } = data;
      const pool = await getPool();
      const sql = `
            UPDATE users
            SET name = ?, email = ?, password = ?
            WHERE id = ?
      `;
      await pool.query(sql, [name, email, password, id])

      return true
}

const addVerificationCode = async (id, code) =>{
      const now = new Date();
      const pool = await getPool();
      const sql = `
            UPDATE users
            SET verificationCode = ?, updatedAt = ?, verifiedAt = NULL
            WHERE id = ?
      `

      const [created] = await pool.query(sql, [code, now, id])

      return created.insertId;
}

const findReviewsByUserId = async(idUser) => {
      const pool = await getPool();
      const sql = `SELECT reviews.*, cars.brand, cars.model, cars.year
        FROM reviews
        LEFT JOIN cars ON cars.id = reviews.idCar
        WHERE idUser = ?`;
      const [reviews] = await pool.query(sql, idUser);
    
      return reviews;
}


const removeUserById = async (id, pathImage) => {
      const pool = await getPool();

      const sqlReviews = 'DELETE FROM reviews WHERE idUser = ?';
      await pool.query(sqlReviews, id);
    
      const sql = 'DELETE FROM users WHERE id = ?';
      await pool.query(sql, id);
    
      if (pathImage) {
        await deleteImg(pathImage);
      }
    
      return true;
      
}
    



module.exports = {
    activateUserByCode,
    addVerificationCode,
    createUser,
    findAllUsers,
    findReviewsByUserId,
    findUserByEmail,
    findUserById,
    findUserByVerficiationCode,
    removeUserById,
    updateUserById,
    uploadUserImageProfile,
};
