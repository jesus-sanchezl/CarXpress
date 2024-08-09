const deleteImg = require("../helpers/deleteImage");
const getPool = require("../infraestructure/database");

const addImageByIdCar = async (idCar, imageName, principal) => {
    const pool = await getPool();

    const sql = `
            INSERT INTO carImages (name, principal, idCar)
            VALUES (?, ?, ?)
      `;

    const [car] = await pool.query(sql, [imageName, principal, idCar]);

    return true;
};

const removePrincipalByCarId = async (id) => {
    const pool = await getPool();

    const sql = `
            UPDATE carImages SET principal = false
            WHERE idCar = ?
      `;

    await pool.query(sql, id);

    return true;
};


const findAllImagesByIdCar = async(idCar) => {
const pool = await getPool();
const sql = `
      SELECT * FROM carImages WHERE idCar = ?
      ORDER BY principal DESC
`
const [cars] = await pool.query(sql, idCar)

return cars
}

const findImageById = async(id) => {
      const pool = await getPool();
      const sql = `SELECT * FROM carImages WHERE id = ?`;
      const [cars] = await pool.query(sql, id);
    
      return cars[0];
}


const deleteCarImageById = async(id, pathImage) => {

      const pool = await getPool();
      const sql = 'DELETE FROM carImages WHERE id = ?';
      await pool.query(sql, id);
    

      
      await deleteImg(pathImage);
    
      return true;

}



module.exports = {
    addImageByIdCar,
    deleteCarImageById,
    findAllImagesByIdCar,
    findImageById,
    removePrincipalByCarId,
};
