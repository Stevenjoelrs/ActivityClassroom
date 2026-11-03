# Fuentes

Recursos que no se vieron en aula. Verificar cada enlace antes de entregar.

| Qué usamos | Dónde se usa | Fuente |
|---|---|---|
| node:test (ejecutor de pruebas) | *.test.js | Node.js, "Test runner": https://nodejs.org/api/test.html |
| node:assert/strict | *.test.js | Node.js, "Assert": https://nodejs.org/api/assert.html |
| Object.freeze | GrupoTrabajo, EventoAcademico | MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze |
| Campos privados (#) | RegistroGrupos, CalendarioAcademico | MDN Web Docs, "Private elements": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements |
| Fechas ISO y validación | EventoAcademico | MDN Web Docs, "Date": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date |
| Mermaid | Diagramas UML en docs/tarea-*.md | Documentación de Mermaid: https://mermaid.js.org/syntax/classDiagram.html |
| Co-authored-by | Mensajes de commit | GitHub Docs, "Creating a commit with multiple authors": https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors |
| node:fs (sistema de archivos) | repositorio-archivo.js, repositorios.js, *.test.js | Node.js, "File system": https://nodejs.org/api/fs.html |
| node:path (rutas de archivos) | repositorio-archivo.js, repositorios.js, *.test.js | Node.js, "Path": https://nodejs.org/api/path.html |
| node:os (directorio temporal os.tmpdir()) | *.test.js | Node.js, "OS": https://nodejs.org/api/os.html |
| Escritura atómica (archivo temporal + renameSync) | repositorio-archivo.js | Node.js, "fs.renameSync": https://nodejs.org/api/fs.html#fsrenamesyncoldpath-newpath |
| Jest con --experimental-vm-modules (soporte ESM) | backend/package.json, suites Jest (tests/) | Jest Docs, "ECMAScript Modules": https://jestjs.io/docs/ecmascript-modules |
| Patrones entrecomillados para node --test | package.json ("test:dominio") | Node.js, "Test runner execution model and path resolution": https://nodejs.org/api/test.html |
| dotenv (^18.0.9) | backend/.env, backend/apuntes/src/config/db.js | npm, "dotenv": https://www.npmjs.com/package/dotenv |
| pg (^8.23.1) | backend/apuntes/src/config/db.js, backend/server.js | node-postgres: https://node-postgres.com/ |
| express (^5.3.0) | backend/src/app.js, backend/apuntes/src/app.js | Express: https://expressjs.com/ |
| nodemon (^3.1.14) | backend/package.json (script dev) | npm, "nodemon": https://www.npmjs.com/package/nodemon |
| Jest (^30.5.2) | backend/package.json, backend/asignacion_de_asientos/pruebas.test.js | Jest: https://jestjs.io/ |
| Aislamiento CJS ({ "type": "commonjs" }) | backend/asignacion_de_asientos/package.json, backend/apuntes/package.json | Node.js, "Package type": https://nodejs.org/api/packages.html#type |
