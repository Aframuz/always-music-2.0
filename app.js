/*=============================================
=                   MODULES                   =
=============================================*/
const queries = require("./db/queries")

/*=============================================
=              BEFORE USING APP               =
=============================================*/
/*=====  CREATE DATABASE AND TABLE  ======*/
// CREATE DATABASE "AlwaysMusic";
// CREATE TABLE "Student" (nombre VARCHAR(50), rut VARCHAR(12), curso VARCHAR(50), nivel VARCHAR(50));

/*=============================================
=                    INIT                     =
=============================================*/
;(async () => {
   // Get Arguments
   const predicate = process.argv[2]
   const values = process.argv.slice(3)

   // Catch number of arguments discrepancy, and print instructions
   const argNumErr = (num) => {
      // If number of arguments doesn't match, print error message and instructions, close app
      if (process.argv.slice(2).length !== num) {
         console.log(`Error: ${num} argumentos requeridos`)
         console.log(
            "Uso:\nAgregar estudiante: node app.js nuevo [nombre] [rut] [curso] [nivel]\nObtener estudiantes: node app.js consulta\nObtener estudiante por rut: node app.js rut - [rut]\nEditar estudiante: node app.js editar [rut] [nombre] [curso] [nivel]\nEliminar estudiante: node app.js eliminar [rut]\n"
         )
         process.exit(1)
      }
   }

   // Evaluate Arguments
   switch (predicate) {
      // Add student
      case "nuevo":
         argNumErr(5)
         await queries.addStudent(values)
         break
      // Get students
      case "consulta":
         argNumErr(1)
         await queries.getStudents()
         break
      // Get student by rut
      case "rut":
         argNumErr(2)
         await queries.getStudentByRut(values)
         break
      // Edit student
      case "editar":
         argNumErr(5)
         await queries.editStudent(values)
         break
      // Delete student
      case "eliminar":
         argNumErr(2)
         await queries.deleteStudent(values)
         break
      // If predicate is not valid, print instructions
      default:
         console.log("Argumento inválido")
         console.log(
            "Uso:\nAgregar estudiante: node app.js nuevo [nombre] [rut] [curso] [nivel]\nObtener estudiantes: node app.js consulta\nObtener estudiante por rut: node app.js rut - [rut]\nEditar estudiante: node app.js editar [rut] [nombre] [curso] [nivel]\nEliminar estudiante: node app.js eliminar [rut]\n"
         )
         break
   }
})()
