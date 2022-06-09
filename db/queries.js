/*=============================================
=                   MODULES                   =
=============================================*/
const { Pool } = require("pg")
const { db_config } = require("../settings")

/*=============================================
=               POOL CONNECTION               =
=============================================*/
// Constructor
const pool = new Pool(db_config)

// General connection to database function
const queryStructure = async (query, log, errMsg) => {
   // Acquire a client from the pool
   const client = await pool.connect()

   try {
      // Execute query, use log function to print adequate message
      const res = await client.query(query)
      log(res)
   } catch (err) {
      // (3) Print error message
      console.log(
         `Error ${errMsg}:\nError code: ${err.code}\nError message: ${err.message}`
      )
   } finally {
      // Release the client back to the pool
      client.release()
   }
   // Close pool at the end of app
   pool.end()
}

// (1) (2) Query configuration
const queryConf = {
   // Add config
   add: {
      query: {
         text: `INSERT INTO "Student" (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;`,
      },
      log: (res) =>
         console.log(`Estudiante ${res.rows[0].nombre} agregado con éxito`),
      errMsg: `adding student`,
   },
   // Get config
   get: {
      query: {
         rowMode: "array",
         text: `SELECT * FROM "Student";`,
      },
      log: (res) => console.log(`Registro Actual: `, res.rows),

      errMsg: `retrieving Students`,
   },
   // Get by rut config
   getByRut: {
      query: {
         text: `SELECT * FROM "Student" WHERE rut = $1;`,
      },
      log: (res) => {
         if (res.rows.length === 0) {
            console.log(`No existe un estudiante con ese rut`)
         } else {
            console.log(res.rows)
         }
      },
      errMsg: `retrieving student`,
   },
   // Edit config
   edit: {
      query: {
         text: `UPDATE "Student" SET nombre = $1, rut = $2, curso = $3, nivel = $4 WHERE rut = $2 RETURNING *;`,
      },
      log: (res) =>
         console.log(`Estudiante ${res.rows[0].nombre} editado con éxito`),
      errMsg: `editing student`,
   },
   // Delete config
   delete: {
      query: {
         text: `DELETE FROM "Student" WHERE rut = $1 RETURNING *;`,
      },
      log: (res) =>
         console.log(
            `Registro de estudiante con rut ${res.rows[0].rut} eliminado`
         ),
      errMsg: `deleting student`,
   },
}

module.exports = {
   // Add student
   addStudent: async (values) => {
      queryConf.add.query.values = values
      await queryStructure(...Object.values(queryConf.add))
   },
   // Get Students
   getStudents: async () => {
      await queryStructure(...Object.values(queryConf.get))
   },
   // Get student by rut
   getStudentByRut: async (values) => {
      queryConf.getByRut.query.values = values
      await queryStructure(...Object.values(queryConf.getByRut))
   },
   // Edit student
   editStudent: async (values) => {
      queryConf.edit.query.values = values
      await queryStructure(...Object.values(queryConf.edit))
   },
   // Delete student
   deleteStudent: async (values) => {
      queryConf.delete.query.values = values
      await queryStructure(...Object.values(queryConf.delete))
   },
}
