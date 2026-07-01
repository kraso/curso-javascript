# Leccion 4: Async/Await

## Objetivos de aprendizaje

- [ ] Comprender las funciones async y la palabra clave await
- [ ] Manejar errores con try/catch/finally
- [ ] Ejecutar codigo de forma secuencial y paralela
- [ ] Usar top-level await
- [ ] Implementar patrones comunes con async/await
- [ ] Convertir callbacks a promesas
- [ ] Convertir promesas a async/await
- [ ] Aplicar en ejemplos practicos

---

## 1. Funciones Async

### 1.1 Sintaxis Basica

Una funcion async siempre retorna una promesa. El valor de retorno se envuelve automaticamente en Promise.resolve().

```javascript
// Funcion normal
function normal() {
  return 42;
}

// Funcion async
async function asincrona() {
  return 42;
}

console.log(normal());      // 42
console.log(asincrona());   // Promise { 42 }

// Ambas retornan lo mismo, pero async retorna una promesa
asincrona().then(valor => console.log(valor)); // 42
```

### 1.2 Async con Promesas

```javascript
async function obtenerUsuario() {
  // El await resuelve la promesa
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const usuario = await response.json();
  return usuario;
}

// La funcion retorna una promesa
obtenerUsuario().then(usuario => {
  console.log(usuario.name);
});
```

### 1.3 Async con Arrow Functions

```javascript
const saludar = async (nombre) => {
  return `Hola, ${nombre}`;
};

const obtenerDatos = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// Uso
saludar("Juan").then(mensaje => console.log(mensaje)); // "Hola, Juan"
```

---

## 2. Await

### 2.1 Await Basico

Await pausa la ejecucion de la funcion hasta que la promesa se resuelva.

```javascript
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demostracion() {
  console.log("Inicio");
  await esperar(1000);
  console.log("Despues de 1 segundo");
  await esperar(1000);
  console.log("Despues de 2 segundos");
}

demostracion();
// "Inicio"
// (espera 1 segundo)
// "Despues de 1 segundo"
// (espera 1 segundo)
// "Despues de 2 segundos"
```

### 2.2 Await con Multiples Promesas

```javascript
function tarea1() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Tarea 1"), 1000);
  });
}

function tarea2() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Tarea 2"), 500);
  });
}

// Secuencial: tarda 1.5 segundos
async function secuencial() {
  const r1 = await tarea1();
  console.log(r1);
  const r2 = await tarea2();
  console.log(r2);
  return [r1, r2];
}

// Paralelo: tarda 1 segundo
async function paralelo() {
  const [r1, r2] = await Promise.all([tarea1(), tarea2()]);
  console.log(r1, r2);
  return [r1, r2];
}
```

### 2.3 Await con Error Handling

```javascript
function可能会Fallo() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Exito");
    } else {
      reject(new Error("Fallo"));
    }
  });
}

async function manejarError() {
  try {
    const resultado = await可能会Fallo();
    console.log(resultado);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    console.log("Operacion completada");
  }
}
```

---

## 3. Manejo de Errores con try/catch/finally

### 3.1 try/catch Basico

```javascript
async function leerArchivo(ruta) {
  try {
    // Simular lectura de archivo
    if (!ruta) {
      throw new Error("Ruta no proporcionada");
    }

    if (ruta.includes("inexistente")) {
      throw new Error("Archivo no encontrado");
    }

    const contenido = `Contenido de ${ruta}`;
    return contenido;
  } catch (error) {
    console.error(`Error leyendo archivo: ${error.message}`);
    return null;
  }
}

// Uso
const resultado = await leerArchivo("mi-archivo.txt");
console.log(resultado); // "Contenido de mi-archivo.txt"

const error = await leerArchivo(null);
console.log(error); // null
```

### 3.2 Multiples Errores

```javascript
async function procesarMultiple() {
  const errores = [];

  try {
    await operacion1();
  } catch (error) {
    errores.push({ operacion: "op1", error: error.message });
  }

  try {
    await operacion2();
  } catch (error) {
    errores.push({ operacion: "op2", error: error.message });
  }

  try {
    await operacion3();
  } catch (error) {
    errores.push({ operacion: "op3", error: error.message });
  }

  if (errores.length > 0) {
    console.error("Errores encontrados:", errores);
  }

  return { errores, total: 3 };
}
```

### 3.3 finally para Limpieza

```javascript
async function conexionConLimpieza() {
  let conexion = null;

  try {
    conexion = await obtenerConexion();
    const resultado = await conexion.query("SELECT * FROM usuarios");
    return resultado;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  } finally {
    if (conexion) {
      await conexion.cerrar();
      console.log("Conexion cerrada");
    }
  }
}
```

### 3.4 Patron de Reintentos

```javascript
async function conReintentos(funcion, maxReintentos = 3) {
  let ultimoError;

  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      const resultado = await funcion();
      return resultado;
    } catch (error) {
      ultimoError = error;
      console.log(`Intento ${intento}/${maxReintentos} fallido`);

      if (intento < maxReintentos) {
        const delay = Math.pow(2, intento) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw ultimoError;
}

// Uso
async function operacionRiesgosa() {
  if (Math.random() > 0.7) {
    return "Exito";
  }
  throw new Error("Fallo");
}

try {
  const resultado = await conReintentos(operacionRiesgosa, 3);
  console.log(resultado);
} catch (error) {
  console.error("Fallo definitivo:", error.message);
}
```

---

## 4. Ejecucion Secuencial vs Paralela

### 4.1 Ejecucion Secuencial

```javascript
function tarea(id, duracion) {
  return new Promise(resolve => {
    console.log(`Tarea ${id} iniciada`);
    setTimeout(() => {
      console.log(`Tarea ${id} completada`);
      resolve(id);
    }, duracion);
  });
}

// Secuencial: cada tarea espera a que la anterior termine
async function ejecutarSecuencial() {
  const inicio = Date.now();

  const r1 = await tarea(1, 1000);
  const r2 = await tarea(2, 500);
  const r3 = await tarea(3, 800);

  console.log(`Total: ${Date.now() - inicio}ms`);
  return [r1, r2, r3];
}

// Tardara ~2.3 segundos
ejecutarSecuencial();
```

### 4.2 Ejecucion Paralela

```javascript
// Paralelo: todas las tareas se ejecutan simultaneamente
async function ejecutarParalelo() {
  const inicio = Date.now();

  const [r1, r2, r3] = await Promise.all([
    tarea(1, 1000),
    tarea(2, 500),
    tarea(3, 800)
  ]);

  console.log(`Total: ${Date.now() - inicio}ms`);
  return [r1, r2, r3];
}

// Tardara ~1 segundo (la tarea mas larga)
ejecutarParalelo();
```

### 4.3 Mixto: Secuencial y Paralelo

```javascript
async function ejecutarMixto() {
  const inicio = Date.now();

  // Paso 1: Paralelo
  const [usuarios, productos] = await Promise.all([
    fetch("/api/usuarios").then(r => r.json()),
    fetch("/api/productos").then(r => r.json())
  ]);

  // Paso 2: Secuencial (depende del paso 1)
  const pedidos = await fetch(`/api/pedidos?usuario=${usuarios[0].id}`)
    .then(r => r.json());

  // Paso 3: Paralelo
  const [facturas, envios] = await Promise.all([
    fetch(`/api/facturas?pedido=${pedidos[0].id}`).then(r => r.json()),
    fetch(`/api/envios?pedido=${pedidos[0].id}`).then(r => r.json())
  ]);

  console.log(`Total: ${Date.now() - inicio}ms`);
  return { usuarios, productos, pedidos, facturas, envios };
}
```

### 4.4 Concurrencia Controlada

```javascript
async function concurrenciaControlada(tareas, limite = 3) {
  const resultados = [];
  const ejecutando = [];

  for (const [indice, tarea] of tareas.entries()) {
    const promesa = tarea().then(resultado => {
      resultados[indice] = resultado;
      ejecutando.splice(ejecutando.indexOf(promesa), 1);
    });

    ejecutando.push(promesa);

    if (ejecutando.length >= limite) {
      await Promise.race(ejecutando);
    }
  }

  await Promise.all(ejecutando);
  return resultados;
}

// Uso
const tareas = Array.from({ length: 10 }, (_, i) => () =>
  new Promise(resolve => {
    setTimeout(() => resolve(i), 1000);
  })
);

concurrenciaControlada(tareas, 3).then(resultados => {
  console.log(resultados); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
});
```

---

## 5. Top-Level Await

### 5.1 Uso en Modulos

```javascript
// archivo.js (con type="module" en script tag o .mjs)
const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
const post = await response.json();
console.log(post.title);

// Esto funciona en modulos ES6
```

### 5.2 Top-Level Await en Node.js

```javascript
// archivo.mjs
import { readFile } from "fs/promises";

const contenido = await readFile("mi-archivo.txt", "utf8");
console.log(contenido);

// El archivo se ejecuta de forma asincrona
```

### 5.3 Inicializacion Asincrona

```javascript
// database.mjs
import { createConnection } from "mysql2/promise";

let db;

try {
  db = await createConnection({
    host: "localhost",
    user: "root",
    database: "mi_base"
  });
  console.log("Base de datos conectada");
} catch (error) {
  console.error("Error conectando a la base de datos:", error);
}

export default db;
```

---

## 6. Async IIFE

### 6.1 Immediately Invoked Function Expression

```javascript
// Cuando necesitas async en un contexto que no es async
(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const usuarios = await response.json();
    console.log(`Usuarios cargados: ${usuarios.length}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
```

### 6.2 Async IIFE con Variables

```javascript
(async () => {
  const config = await fetch("/config.json").then(r => r.json());
  const db = await conectarDB(config.database);
  const datos = await db.query("SELECT * FROM usuarios");

  console.log(`Cargados ${datos.length} usuarios`);

  // Hacer cosas con los datos
  datos.forEach(usuario => {
    console.log(usuario.nombre);
  });
})();
```

---

## 7. Patrones Comunes

### 7.1 Patron de Envolvente de Errores

```javascript
function envolverError(funcion) {
  return async (...args) => {
    try {
      return await funcion(...args);
    } catch (error) {
      console.error(`Error en ${funcion.name}:`, error.message);
      throw error;
    }
  };
}

// Uso
async function dividir(a, b) {
  if (b === 0) throw new Error("Division por cero");
  return a / b;
}

const dividirSeguro = envolverError(dividir);

try {
  const resultado = await dividirSeguro(10, 0);
} catch (error) {
  console.log("Error manejado:", error.message);
}
// "Error en dividir: Division por cero"
// "Error manejado: Division por cero"
```

### 7.2 Patron de Serializacion

```javascript
async function serializar(...tareas) {
  const resultados = [];

  for (const tarea of tareas) {
    const resultado = await tarea();
    resultados.push(resultado);
  }

  return resultados;
}

// Uso
const tarea1 = async () => { console.log("Tarea 1"); return 1; };
const tarea2 = async () => { console.log("Tarea 2"); return 2; };
const tarea3 = async () => { console.log("Tarea 3"); return 3; };

const resultados = await serializar(tarea1, tarea2, tarea3);
console.log(resultados); // [1, 2, 3]
```

### 7.3 Patron de Cache con TTL

```javascript
function crearCache(ttl = 60000) {
  const cache = new Map();

  return async (clave, funcion) => {
    const entrada = cache.get(clave);

    if (entrada && Date.now() - entrada.timestamp < ttl) {
      console.log(`Cache hit: ${clave}`);
      return entrada.valor;
    }

    console.log(`Cache miss: ${clave}`);
    const valor = await funcion();
    cache.set(clave, { valor, timestamp: Date.now() });
    return valor;
  };
}

// Uso
const cache = crearCache(30000);

const resultado1 = await cache("datos", async () => {
  console.log("Obteniendo datos...");
  return { datos: [1, 2, 3] };
});

const resultado2 = await cache("datos", async () => {
  console.log("Esto no se imprime");
  return { datos: [1, 2, 3] };
});
// "Obteniendo datos..."
// Cache hit: datos
```

### 7.4 Patron de Pool de Concurrencia

```javascript
class PoolConcurrencia {
  #tareas;
  #limite;
  #ejecutando;

  constructor(limite = 3) {
    this.#tareas = [];
    this.#limite = limite;
    this.#ejecutando = 0;
  }

  async agregar(tarea) {
    return new Promise((resolve, reject) => {
      this.#tareas.push({ tarea, resolve, reject });
      this.#procesar();
    });
  }

  async #procesar() {
    while (this.#ejecutando < this.#limite && this.#tareas.length > 0) {
      const { tarea, resolve, reject } = this.#tareas.shift();
      this.#ejecutando++;

      try {
        const resultado = await tarea();
        resolve(resultado);
      } catch (error) {
        reject(error);
      } finally {
        this.#ejecutando--;
        this.#procesar();
      }
    }
  }
}

// Uso
const pool = new PoolConcurrencia(2);

const resultados = await Promise.all([
  pool.agregar(async () => { await esperar(1000); return 1; }),
  pool.agregar(async () => { await esperar(500); return 2; }),
  pool.agregar(async () => { await esperar(800); return 3; }),
  pool.agregar(async () => { await esperar(300); return 4; })
]);

console.log(resultados); // [1, 2, 3, 4]
```

---

## 8. Conversion de Callbacks a Promesas

### 8.1 Envolver Callback en Promesa

```javascript
// Funcion con callback
function leerArchivoCallback(ruta, callback) {
  // Simular lectura
  setTimeout(() => {
    if (ruta.includes("inexistente")) {
      callback(new Error("Archivo no encontrado"));
      return;
    }
    callback(null, `Contenido de ${ruta}`);
  }, 1000);
}

// Convertir a promesa
function leerArchivoPromesa(ruta) {
  return new Promise((resolve, reject) => {
    leerArchivoCallback(ruta, (error, contenido) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(contenido);
    });
  });
}

// Uso con async/await
async function usarArchivo() {
  try {
    const contenido = await leerArchivoPromesa("mi-archivo.txt");
    console.log(contenido);
  } catch (error) {
    console.error(error.message);
  }
}
```

### 8.2 Envolver Multiples Callbacks

```javascript
// Funcion con multiple callbacks
function geoLocalizacion(exito, error) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(exito, error);
  } else {
    error(new Error("Geolocalizacion no soportada"));
  }
}

// Convertir a promesa
function geoLocalizacionPromesa() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalizacion no soportada"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Uso con async/await
async function obtenerUbicacion() {
  try {
    const posicion = await geoLocalizacionPromesa();
    console.log(`Lat: ${posicion.coords.latitude}`);
    console.log(`Lng: ${posicion.coords.longitude}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
```

### 8.3 Patron de Utilidad Generica

```javascript
function promisify(funcion) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      funcion(...args, (error, resultado) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(resultado);
      });
    });
  };
}

// Uso
function guardarArchivo(ruta, datos, callback) {
  setTimeout(() => {
    if (!ruta) {
      callback(new Error("Ruta requerida"));
      return;
    }
    callback(null, { ruta, guardado: true });
  }, 500);
}

const guardarArchivoAsync = promisify(guardarArchivo);

async function main() {
  try {
    const resultado = await guardarArchivoAsync("/tmp/archivo.json", { clave: "valor" });
    console.log(resultado); // { ruta: '/tmp/archivo.json', guardado: true }
  } catch (error) {
    console.error(error.message);
  }
}
```

---

## 9. Ejemplos Practicos

### 9.1 API con async/await

```javascript
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async #request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
  }

  async get(endpoint) {
    return this.#request(endpoint);
  }

  async post(endpoint, data) {
    return this.#request(endpoint, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data) {
    return this.#request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.#request(endpoint, { method: "DELETE" });
  }
}

// Uso
const api = new ApiService("https://jsonplaceholder.typicode.com");

async function main() {
  try {
    const posts = await api.get("/posts");
    console.log(`Posts: ${posts.length}`);

    const nuevoPost = await api.post("/posts", {
      title: "Nuevo Post",
      body: "Contenido",
      userId: 1
    });
    console.log(`Post creado: ${nuevoPost.id}`);
  } catch (error) {
    console.error(error.message);
  }
}
```

### 9.2 Procesamiento de Datos

```javascript
async function procesarDatos(datos) {
  const resultados = [];

  for (const dato of datos) {
    try {
      const resultado = await procesarDato(dato);
      resultados.push({ exito: true, dato: resultado });
    } catch (error) {
      resultados.push({ exito: false, error: error.message });
    }
  }

  return {
    total: datos.length,
    exitosos: resultados.filter(r => r.exito).length,
    fallidos: resultados.filter(r => !r.exito).length,
    resultados
  };
}

async function main() {
  const datos = [1, 2, 3, 4, 5];
  const resultado = await procesarDatos(datos);
  console.log(`Procesados: ${resultado.exitosos}/${resultado.total}`);
}
```

### 9.3 Worker con async/await

```javascript
// En el contexto principal
class WorkerPool {
  #workers;
  #tareas;

  constructor(numWorkers) {
    this.#workers = [];
    this.#tareas = [];
  }

  async ejecutar(datos) {
    return new Promise((resolve, reject) => {
      // Simular worker
      setTimeout(() => {
        const resultado = datos.map(d => d * 2);
        resolve(resultado);
      }, 1000);
    });
  }
}

const pool = new WorkerPool(4);

async function procesarEnParalelo(arreglo) {
  const chunkSize = Math.ceil(arreglo.length / 4);
  const chunks = [];

  for (let i = 0; i < arreglo.length; i += chunkSize) {
    chunks.push(arreglo.slice(i, i + chunkSize));
  }

  const resultados = await Promise.all(
    chunks.map(chunk => pool.ejecutar(chunk))
  );

  return resultados.flat();
}

async function main() {
  const datos = Array.from({ length: 100 }, (_, i) => i + 1);
  const resultado = await procesarEnParalelo(datos);
  console.log(`Procesados: ${resultado.length} elementos`);
}
```

---

## Buenas practicas

1. **Usa async/await** sobre .then() para codigo mas legible
2. **Maneja errores** con try/catch siempre
3. **Usa finally** para limpieza de recursos
4. **Prefiere Promise.all()** para operaciones independientes
5. **No uses await** en loops innecesariamente, usa Promise.all
6. **Usa top-level await** solo en modulos ES6
7. **Envuelve IIFE async** cuando necesites async en contexto sincrono
8. **Convierte callbacks** a promesas para usar async/await
9. **Usa patrones de reintento** para operaciones fallibles
10. **Documenta** que funciones son asincronas

---

## Ejercicios

### Ejercicio 1: API con async/await (5 puntos)

Crear una clase `JsonPlaceholderApi` con metodos `getPosts()`, `getPost(id)`, `createPost(data)`, `updatePost(id, data)`, `deletePost(id)`. Usar async/await y manejar errores.

### Ejercicio 2: Pipeline de Procesamiento (5 puntos)

Crear una funcion `pipeline(...pasos)` que tome funciones asincronas y las ejecute en secuencia, pasando el resultado de una a la siguiente.

### Ejercicio 3: Cache Async (5 puntos)

Implementar un `AsyncCache` con metodo `get(clave, asyncFn)` que cachee resultados de funciones asincronas con TTL configurable.

### Ejercicio 4: Rate Limiter (5 puntos)

Crear un `RateLimiter(maxPeticiones, ventanaTiempo)` con metodo `fetch(url)` que limite peticiones y encole las que excedan el limite.

### Ejercicio 5: Web Scraper (5 puntos)

Crear una funcion `scraping(urls)` que cargue multiples URLs en paralelo, extraiga informacion y retorne resultados. Manejar errores individuales.

### Ejercicio 6: Task Queue (5 puntos)

Implementar una `TaskQueue` con metodos `add(task)`, `pause()`, `resume()`, `clear()`. Las tareas deben ejecutarse en orden con concurrencia configurable.

---

## Soluciones

### Solucion Ejercicio 1: API con async/await

```javascript
class JsonPlaceholderApi {
  constructor(baseUrl = "https://jsonplaceholder.typicode.com") {
    this.baseUrl = baseUrl;
  }

  async #request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getPosts() {
    return this.#request("/posts");
  }

  async getPost(id) {
    return this.#request(`/posts/${id}`);
  }

  async createPost(data) {
    return this.#request("/posts", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  async updatePost(id, data) {
    return this.#request(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }

  async deletePost(id) {
    return this.#request(`/posts/${id}`, { method: "DELETE" });
  }
}

// Uso
const api = new JsonPlaceholderApi();

async function main() {
  try {
    const posts = await api.getPosts();
    console.log(`Posts: ${posts.length}`);

    const post = await api.getPost(1);
    console.log(`Post: ${post.title}`);

    const nuevoPost = await api.createPost({
      title: "Nuevo Post",
      body: "Contenido del post",
      userId: 1
    });
    console.log(`Creado: ${nuevoPost.id}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
```

### Solucion Ejercicio 2: Pipeline de Procesamiento

```javascript
function pipeline(...pasos) {
  return async (datoInicial) => {
    let resultado = datoInicial;

    for (const paso of pasos) {
      resultado = await paso(resultado);
    }

    return resultado;
  };
}

// Uso
const validar = async (datos) => {
  console.log("Validando...");
  if (!Array.isArray(datos)) throw new Error("Datos no son array");
  return datos.filter(d => d !== null && d !== undefined);
};

const transformar = async (datos) => {
  console.log("Transformando...");
  return datos.map(d => ({
    valor: d,
    cuadrado: d ** 2,
    timestamp: Date.now()
  }));
};

const formatear = async (datos) => {
  console.log("Formateando...");
  return datos.map(d => `${d.valor}^2 = ${d.cuadrado}`);
};

const miPipeline = pipeline(validar, transformar, formatear);

async function main() {
  const datos = [1, 2, 3, 4, 5];
  const resultado = await miPipeline(datos);
  console.log(resultado);
  // ["1^2 = 1", "2^2 = 4", "3^2 = 9", "4^2 = 16", "5^2 = 25"]
}
```

### Solucion Ejercicio 3: Cache Async

```javascript
class AsyncCache {
  #cache;
  #ttl;

  constructor(ttl = 60000) {
    this.#cache = new Map();
    this.#ttl = ttl;
  }

  async get(clave, asyncFn) {
    const entrada = this.#cache.get(clave);

    if (entrada && Date.now() - entrada.timestamp < this.#ttl) {
      console.log(`Cache hit: ${clave}`);
      return entrada.valor;
    }

    console.log(`Cache miss: ${clave}`);
    const valor = await asyncFn();
    this.#cache.set(clave, { valor, timestamp: Date.now() });
    return valor;
  }

  invalidar(clave) {
    this.#cache.delete(clave);
  }

  limpiar() {
    this.#cache.clear();
  }
}

// Uso
const cache = new AsyncCache(30000);

async function obtenerDatos(id) {
  console.log(`Obteniendo datos del servidor para ID ${id}...`);
  await new Promise(r => setTimeout(r, 1000));
  return { id, datos: `Datos de ${id}` };
}

async function main() {
  const datos1 = await cache.get("user-1", () => obtenerDatos(1));
  console.log(datos1);

  const datos2 = await cache.get("user-1", () => obtenerDatos(1));
  console.log(datos2); // Cache hit
}
```

### Solucion Ejercicio 4: Rate Limiter

```javascript
class RateLimiter {
  #maxPeticiones;
  #ventanaTiempo;
  #peticiones;
  #cola;

  constructor(maxPeticiones, ventanaTiempo) {
    this.#maxPeticiones = maxPeticiones;
    this.#ventanaTiempo = ventanaTiempo;
    this.#peticiones = [];
    this.#cola = [];
  }

  #limpiarPeticiones() {
    const ahora = Date.now();
    this.#peticiones = this.#peticiones.filter(
      tiempo => ahora - tiempo < this.#ventanaTiempo
    );
  }

  async fetch(url) {
    this.#limpiarPeticiones();

    if (this.#peticiones.length >= this.#maxPeticiones) {
      console.log("Limite alcanzado, encolando...");
      return new Promise((resolve) => {
        this.#cola.push({ url, resolve });
      });
    }

    this.#peticiones.push(Date.now());
    return fetch(url).then(r => r.json());
  }
}

// Uso
const limiter = new RateLimiter(3, 1000);

async function main() {
  const urls = Array.from({ length: 10 }, (_, i) =>
    `https://jsonplaceholder.typicode.com/posts/${i + 1}`
  );

  const resultados = await Promise.all(
    urls.map(url => limiter.fetch(url))
  );

  console.log(`Cargados: ${resultados.length} posts`);
}
```

### Solucion Ejercicio 5: Web Scraper

```javascript
async function scraping(urls) {
  const resultados = [];
  const errores = [];

  const promesas = urls.map(async (url, indice) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const html = await response.text();
      // Simular extraccion de datos
      const datos = {
        url,
        titulo: `Contenido de ${url}`,
        longitud: html.length,
        timestamp: new Date()
      };

      resultados[indice] = { exito: true, datos };
    } catch (error) {
      errores.push({ url, error: error.message });
      resultados[indice] = { exito: false, error: error.message };
    }
  });

  await Promise.all(promesas);

  return {
    total: urls.length,
    exitosos: resultados.filter(r => r.exito).length,
    fallidos: errores.length,
    resultados,
    errores
  };
}

// Uso
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3"
];

async function main() {
  const resultado = await scraping(urls);
  console.log(`Exitosos: ${resultado.exitosos}/${resultado.total}`);
}
```

### Solucion Ejercicio 6: Task Queue

```javascript
class TaskQueue {
  #tareas;
  #ejecutando;
  #pausado;
  #concurrencia;

  constructor(concurrencia = 1) {
    this.#tareas = [];
    this.#ejecutando = 0;
    this.#pausado = false;
    this.#concurrencia = concurrencia;
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.#tareas.push({ task, resolve, reject });
      this.#procesar();
    });
  }

  pause() {
    this.#pausado = true;
  }

  resume() {
    this.#pausado = false;
    this.#procesar();
  }

  clear() {
    this.#tareas = [];
  }

  async #procesar() {
    if (this.#pausado) return;

    while (this.#ejecutando < this.#concurrencia && this.#tareas.length > 0) {
      const { task, resolve, reject } = this.#tareas.shift();
      this.#ejecutando++;

      try {
        const resultado = await task();
        resolve(resultado);
      } catch (error) {
        reject(error);
      } finally {
        this.#ejecutando--;
        this.#procesar();
      }
    }
  }

  get longitud() {
    return this.#tareas.length;
  }

  get activas() {
    return this.#ejecutando;
  }
}

// Uso
const queue = new TaskQueue(2);

function tarea(id, duracion) {
  return () => new Promise(resolve => {
    console.log(`Tarea ${id} iniciada`);
    setTimeout(() => {
      console.log(`Tarea ${id} completada`);
      resolve(id);
    }, duracion);
  });
}

async function main() {
  queue.add(tarea(1, 1000));
  queue.add(tarea(2, 500));
  queue.add(tarea(3, 800));

  console.log(`Cola: ${queue.longitud}, Activas: ${queue.activas}`);

  queue.pause();
  console.log("Cola pausada");

  queue.resume();
  console.log("Cola reanudada");
}
```
