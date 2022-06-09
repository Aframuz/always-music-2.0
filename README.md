# Desafío - Always Music 2.0

## Capítulos

El desafío está basado en el siguiente capítulo de la lectura:

-  Consultas con texto parametrizado.
-  JSON como argumento de una consulta.
-  Capura de errores.

## Descripción

La escuela de música Always Music solicitó hacer unas pruebas con el avance del desarrollo del sistema de gestión con base de datos PostgreSQL, se dieron cuenta que no se podían hacer varias consultas de forma simultánea y que al intentar hacer una consulta errónea, no recibían ningún error, dejando la posibilidad de creer que un estudiante fue registrado y que esto no sea así.

En este desafío deberás ocupar la clase Pool definiendo sus diferentes propiedades, capturar los posibles errores en el proceso de conexión con la base de datos y realizar las siguientes consultas usando textos parametrizados.

-  Agregar un nuevo estudiante.
-  Consultar los estudiantes registrados.
-  Consultar estudiante por rut.
-  Actualiar la información de un estudiante.
-  Eliminar el registro de un estudiante.

## Requerimientos

1. Hacer todas las consultas con un JSON como argumento del método query.
2. Hacer las consultas con texto parametrizado.
3. Capturar los posibles errores en todas las consultas e imprimirlos por consola.
4. Obtener el registro de estudiantes registrados en formatos de arreglos.

## Notas

-  [x] Requerimiento 1
-  [x] Requerimiento 2
-  [x] Requerimiento 3
-  [x] Requerimiento 4

Casi lo mismo que always-music, diferencias:

-  rowMode en configuración de query (queries.js:51)

**connectionString**: postgresql://postgres:postgres@localhost:5432/AlwaysMusic
