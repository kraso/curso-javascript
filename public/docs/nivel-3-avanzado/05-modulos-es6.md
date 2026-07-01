# Leccion 5: Modulos ES6

## Objetivos de aprendizaje

- [ ] Comprender la importancia de los modulos en JavaScript
- [ ] Dominar la sintaxis de import y export
- [ ] Diferenciar entre export default y named exports
- [ ] Implementar re-exportaciones
- [ ] Usar importaciones dinamicas
- [ ] Entender modulos en el navegador con type="module"
- [ ] Comparar CommonJS vs ES Modules
- [ ] Aplicar patrones de modulos y mejores practicas

---

## 1. Por que Usar Modulos?

### 1.1 Problemas sin Modulos

```javascript
// Sin modulos: todo en un solo archivo
// Problemas:
// 1. Variables globales que colisionan
// 2. Dificultad para mantener codigo
// 3. No hay encapsulamiento
// 4. Dependencias implicitas

var contador = 0; // Global

function incrementar() {
  contador++;
}

function obtenerContador() {
  return contador;
}

// En otro archivo
var contador = 100; // Colision de nombres!
// Sobreescribe el contador anterior
```

### 1.2 Solucion con Modulos

```javascript
// contador.js
let contador = 0;

export function incrementar() {
  contador++;
}

export function obtenerContador() {
  return contador;
}

export function reiniciar() {
  contador = 0;
}

// main.js
import { incrementar, obtenerContador } from "./contador.js";

incrementar();
incrementar();
console.log(obtenerContador()); // 2

// El contador esta encapsulado, no hay colision
```

---

## 2. Sintaxis de Export

### 2.1 Named Exports

```javascript
// matematicas.js
export const PI = 3.14159;

export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}

export function multiplicar(a, b) {
  return a * b;
}

export class Calculadora {
  constructor() {
    this.resultado = 0;
  }

  sumar(a, b) {
    this.resultado = a + b;
    return this;
  }

  restar(a, b) {
    this.resultado = a - b;
    return this;
  }
}

// Tambien se pueden exportar al final
const PI_DOS = PI * 2;
export { PI_DOS };
```

### 2.2 Export Default

```javascript
// utils.js
export default function utilidadPrincipal() {
  console.log("Utilidad principal");
}

// Tambien se puede exportar como default
function helper() {
  return "soy un helper";
}

export default helper;

// Un archivo solo puede tener UN default export
```

### 2.3 Export en un Solo Lugar

```javascript
// constants.js
const MAX_USUARIOS = 100;
const MIN_PASSWORD = 8;
const TIMEOUT = 5000;

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat("es-ES").format(fecha);
}

export {
  MAX_USUARIOS,
  MIN_PASSWORD,
  TIMEOUT,
  validarEmail,
  formatearFecha
};

// Export default al final
export default class Config {
  static MAX_INTENTOS = 3;
  static TIEMPO_ESPERA = 1000;
}
```

---

## 3. Sintaxis de Import

### 3.1 Import Named

```javascript
// Forma 1: Importar especificos
import { sumar, restar } from "./matematicas.js";
console.log(sumar(2, 3)); // 5

// Forma 2: Importar con alias
import { sumar as suma, restar as resta } from "./matematicas.js";
console.log(suma(2, 3)); // 5

// Forma 3: Importar todo como objeto
import * as Matematicas from "./matematicas.js";
console.log(Matematicas.sumar(2, 3)); // 5
console.log(Matematicas.PI);           // 3.14159
```

### 3.2 Import Default

```javascript
// Import default (sin llaves)
import utilidadPrincipal from "./utils.js";
utilidadPrincipal(); // "Utilidad principal"

// Import default con alias
import miUtilidad from "./utils.js";
miUtilidad();

// Mezclar default y named
import Config, { MAX_USUARIOS, MIN_PASSWORD } from "./constants.js";
console.log(Config.MAX_INTENTOS); // 3
console.log(MAX_USUARIOS);        // 100
```

### 3.3 Import Completos

```javascript
// Importar todo (named + default)
import Config, * as Utils from "./utils.js";

// Usar default
Config.ejecutar();

// Usar named
Utils.validarEmail("test@email.com");
Utils.formatearFecha(new Date());
```

---

## 4. Re-exportaciones

### 4.1 Re-exportar Todo

```javascript
// index.js (punto de entrada)
export * from "./matematicas.js";
export * from "./utils.js";
export * from "./validaciones.js";

// Ahora se puede importar desde index.js
import { sumar, validarEmail } from "./index.js";
```

### 4.2 Re-exportar Especificos

```javascript
// index.js
export { sumar, restar } from "./matematicas.js";
export { default as Config } from "./config.js";
export { validarEmail as validar } from "./validaciones.js";
```

### 4.3 Re-exportar Default

```javascript
// index.js
export { default } from "./miModulo.js";
export { default as MiFuncion } from "./miModulo.js";
```

### 4.4 Patron de Barrel

```javascript
// src/utils/index.js (barrel file)
export { default as Logger } from "./logger.js";
export { default as Cache } from "./cache.js";
export { default as HttpClient } from "./http-client.js";

// named exports
export { formatearFecha, formatearNumero } from "./formatos.js";
export { validarEmail, validarPassword } from "./validaciones.js";

// src/main.js
import { Logger, Cache, formatearFecha } from "./utils/index.js";
```

---

## 5. Importaciones Dinamicas

### 5.1 import() Basico

```javascript
// Import estatico (se carga al inicio)
import { sumar } from "./matematicas.js";

// Import dinamico (se carga bajo demanda)
async function cargarMatematicas() {
  const matematicas = await import("./matematicas.js");
  console.log(matematicas.sumar(2, 3));
}

// Cargar condicionalmente
async function cargarModulo(condicion) {
  if (condicion) {
    const modulo = await import("./modulo-a.js");
    modulo.ejecutar();
  } else {
    const modulo = await import("./modulo-b.js");
    modulo.ejecutar();
  }
}
```

### 5.2 Import Dinamico con Eval

```javascript
// Cargar modulo basado en entrada del usuario
async function cargarModulo(nombreModulo) {
  try {
    const modulo = await import(`./modulos/${nombreModulo}.js`);
    return modulo;
  } catch (error) {
    console.error(`Error cargando modulo ${nombreModulo}:`, error);
    return null;
  }
}

// Uso
const modulo = await cargarModulo("usuarios");
if (modulo) {
  modulo.listar();
}
```

### 5.3 Import Dinamico con prefetch

```javascript
// Prefetch: cargar modulo en segundo plano
function prefetchModulo(ruta) {
  const link = document.createElement("link");
  link.rel = "modulepreload";
  link.href = ruta;
  document.head.appendChild(link);
}

// Cargar modulo rapido
prefetchModulo("./modulos/usuarios.js");
prefetchModulo("./modulos/productos.js");

// Cuando el usuario necesite el modulo, ya estara cargado
async function abrirSeccionUsuarios() {
  const { UsuariosComponent } = await import("./modulos/usuarios.js");
  new UsuariosComponent().render();
}
```

---

## 6. Modulos en el Navegador

### 6.1 Script type="module"

```html
<!DOCTYPE html>
<html>
<head>
  <title>Mi App</title>
</head>
<body>
  <div id="app"></div>

  <!-- Los modulos se cargan de forma asincrona -->
  <script type="module" src="main.js"></script>

  <!-- No se puede acceder a modulo desde script normal -->
  <script>
    // Error: modulo no accesible
    // console.log(funcionDelModulo);
  </script>
</body>
</html>
```

### 6.2 Rutas Relativas

```javascript
// main.js
import { sumar } from "./matematicas.js";
import { Logger } from "./utils/logger.js";
import Config from "../config/config.js";

// Las rutas son relativas al archivo actual
// ./ = directorio actual
// ../ = directorio padre
```

### 6.3 CORS con Modulos

```javascript
// Los modulos requieren CORS en desarrollo local
// Si abres index.html directamente (file://), los imports fallan

// Soluciones:
// 1. Usar un servidor local
// npx serve .
// npx http-server

// 2. En Node.js con type: module en package.json
// { "type": "module" }
```

---

## 7. CommonJS vs ES Modules

### 7.1 CommonJS (Node.js)

```javascript
// CommonJS: module.exports y require()
// used en Node.js

// matematicas.js
function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

module.exports = {
  sumar,
  restar
};

// main.js
const matematicas = require("./matematicas");
console.log(matematicas.sumar(2, 3));

// O desestructurando
const { sumar, restar } = require("./matematicas");
```

### 7.2 ES Modules

```javascript
// ES Modules: import y export
// Estandar moderno

// matematicas.js
export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}

// main.js
import { sumar, restar } from "./matematicas.js";
console.log(sumar(2, 3));
```

### 7.3 Diferencias Principales

```javascript
// CommonJS: Sincrono, carga modular
// ES Modules: Asincrono, carga en paralelo

// CommonJS: module.exports es un objeto
// ES Modules: export es una referencia

// CommonJS: require() es una funcion
// ES Modules: import es una declaracion

// CommonJS: No tree-shaking
// ES Modules: Soporta tree-shaking

// CommonJS: Resolucion en tiempo de ejecucion
// ES Modules: Resolucion en tiempo de parseo
```

### 7.4 Uso en Node.js

```javascript
// package.json
{
  "name": "mi-app",
  "type": "module",
  "version": "1.0.0"
}

// Ahora puedes usar import/export en Node.js
// main.mjs o main.js con type: module
import { sumar } from "./matematicas.mjs";
console.log(sumar(2, 3));
```

---

## 8. Patrones de Modulos

### 8.1 Patron Singleton

```javascript
// logger.js
class Logger {
  # instancia;

  constructor() {
    if (Logger.# instancia) {
      return Logger.# instancia;
    }
    this.logs = [];
    Logger.# instancia = this;
  }

  log(mensaje) {
    const timestamp = new Date().toISOString();
    this.logs.push({ timestamp, mensaje });
    console.log(`[${timestamp}] ${mensaje}`);
  }

  getLogs() {
    return [...this.logs];
  }
}

const logger = new Logger();
export default logger;

// main.js
import logger from "./logger.js";
logger.log("Inicio de app");
logger.log("Modulo cargado");
console.log(logger.getLogs());
```

### 8.2 Patron Factory

```javascript
// factory.js
function crearValidador(reglas) {
  return {
    validar(datos) {
      const errores = [];

      for (const [campo, regla] of Object.entries(reglas)) {
        const valor = datos[campo];

        if (regla.requerido && (!valor || valor === "")) {
          errores.push(`${campo} es requerido`);
        }

        if (regla.min && valor && valor.length < regla.min) {
          errores.push(`${campo} minimo ${regla.min} caracteres`);
        }

        if (regla.max && valor && valor.length > regla.max) {
          errores.push(`${campo} maximo ${regla.max} caracteres`);
        }
      }

      return {
        valido: errores.length === 0,
        errores
      };
    }
  };
}

export default crearValidador;

// main.js
import crearValidador from "./factory.js";

const validadorUsuario = crearValidador({
  nombre: { requerido: true, min: 3, max: 50 },
  email: { requerido: true },
  password: { requerido: true, min: 8 }
});

const resultado = validadorUsuario.validar({
  nombre: "Jo",
  email: "test@email.com",
  password: "123"
});

console.log(resultado); // { valido: false, errores: ["nombre minimo 3 caracteres", "password minimo 8 caracteres"] }
```

### 8.3 Patron Observer

```javascript
// event-bus.js
class EventBus {
  constructor() {
    this.suscriptores = {};
  }

  suscribir(evento, callback) {
    if (!this.suscriptores[evento]) {
      this.suscriptores[evento] = [];
    }
    this.suscriptores[evento].push(callback);

    // Retornar funcion para desuscribir
    return () => {
      this.suscriptores[evento] = this.suscriptores[evento].filter(
        cb => cb !== callback
      );
    };
  }

  emitir(evento, datos) {
    if (!this.suscriptores[evento]) return;
    this.suscriptores[evento].forEach(callback => callback(datos));
  }
}

const eventBus = new EventBus();
export default eventBus;

// componente-usuario.js
import eventBus from "./event-bus.js";

export function crearUsuario(usuario) {
  console.log(`Usuario creado: ${usuario.nombre}`);
  eventBus.emitir("usuario:creado", usuario);
}

// componente-notificacion.js
import eventBus from "./event-bus.js";

eventBus.suscribir("usuario:creado", (usuario) => {
  console.log(`Notificacion: Bienvenido ${usuario.nombre}`);
});
```

---

## Buenas practicas

1. **Un export default por archivo** para claridad
2. **Usar named exports** para funciones y clases
3. **Barrel files** (index.js) para agrupar exports relacionados
4. **Rutas relativas** siempre con .js extension
5. **Evitar imports circulares** - reestructurar dependencias
6. **Usar import dinamico** para modulos grandes o condicionales
7. **Prefetch** para modulos criticos
8. **Tree shaking** usando named exports
9. **Documentar** exports publicos
10. **Mantener modulos pequenos** y con responsabilidad unica

---

## Ejercicios

### Ejercicio 1: Sistema de Modulos (5 puntos)

Crear un sistema de modulos para una tienda online con: `productos.js`, `carrito.js`, `usuarios.js`, y `index.js` como punto de entrada.

### Ejercicio 2: Plugin System (5 puntos)

Crear un sistema de plugins donde cada plugin se carga dinamicamente con import(). Los plugins deben implementar una interfaz comun.

### Ejercicio 3: Barrel File (5 puntos)

Crear un barrel file para un conjunto de utilidades: `formatos.js`, `validaciones.js`, `conversores.js`. El barrel debe re-exportar todo.

### Ejercicio 4: Lazy Loading (5 puntos)

Implementar lazy loading de modulos basado en rutas. Cada modulo se carga solo cuando se necesita.

### Ejercicio 5: Modulo con Estado (5 puntos)

Crear un modulo de estado global con `estado.js` que use el patron singleton. Debe tener metodos `obtener()`, `actualizar()`, `suscribir()`.

### Ejercicio 6: Namespace (5 puntos)

Crear un patron de namespace usando modulos para evitar colisiones. Implementar namespaces para `Math`, `Utils`, `UI`.

---

## Soluciones

### Solucion Ejercicio 1: Sistema de Modulos

```javascript
// productos.js
const productos = [
  { id: 1, nombre: "Laptop", precio: 999 },
  { id: 2, nombre: "Mouse", precio: 25 },
  { id: 3, nombre: "Teclado", precio: 50 }
];

export function obtenerProductos() {
  return [...productos];
}

export function obtenerProductoPorId(id) {
  return productos.find(p => p.id === id);
}

export function agregarProducto(producto) {
  const nuevoProducto = {
    ...producto,
    id: productos.length + 1
  };
  productos.push(nuevoProducto);
  return nuevoProducto;
}

export function eliminarProducto(id) {
  const indice = productos.findIndex(p => p.id === id);
  if (indice !== -1) {
    productos.splice(indice, 1);
    return true;
  }
  return false;
}

// carrito.js
const carrito = [];

export function agregarAlCarrito(producto, cantidad = 1) {
  const itemExistente = carrito.find(item => item.producto.id === producto.id);

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({ producto, cantidad });
  }

  return carrito;
}

export function eliminarDelCarrito(productoId) {
  const indice = carrito.findIndex(item => item.producto.id === productoId);
  if (indice !== -1) {
    carrito.splice(indice, 1);
  }
  return carrito;
}

export function obtenerCarrito() {
  return [...carrito];
}

export function calcularTotal() {
  return carrito.reduce((total, item) => {
    return total + item.producto.precio * item.cantidad;
  }, 0);
}

export function vaciarCarrito() {
  carrito.length = 0;
  return carrito;
}

// usuarios.js
const usuarios = [];
let usuarioActual = null;

export function registrarUsuario(usuario) {
  const nuevoUsuario = {
    ...usuario,
    id: usuarios.length + 1
  };
  usuarios.push(nuevoUsuario);
  return nuevoUsuario;
}

export function login(email, password) {
  const usuario = usuarios.find(
    u => u.email === email && u.password === password
  );
  if (usuario) {
    usuarioActual = usuario;
    return usuario;
  }
  return null;
}

export function logout() {
  usuarioActual = null;
}

export function obtenerUsuarioActual() {
  return usuarioActual;
}

export function obtenerUsuarios() {
  return [...usuarios];
}

// index.js (punto de entrada)
export {
  obtenerProductos,
  obtenerProductoPorId,
  agregarProducto,
  eliminarProducto
} from "./productos.js";

export {
  agregarAlCarrito,
  eliminarDelCarrito,
  obtenerCarrito,
  calcularTotal,
  vaciarCarrito
} from "./carrito.js";

export {
  registrarUsuario,
  login,
  logout,
  obtenerUsuarioActual,
  obtenerUsuarios
} from "./usuarios.js";

// main.js
import {
  obtenerProductos,
  agregarAlCarrito,
  calcularTotal,
  registrarUsuario,
  login
} from "./index.js";

// Registrar usuario
registrarUsuario({ nombre: "Juan", email: "juan@email.com", password: "123" });
login("juan@email.com", "123");

// Agregar productos al carrito
const productos = obtenerProductos();
agregarAlCarrito(productos[0], 2);
agregarAlCarrito(productos[1]);

console.log(`Total: $${calcularTotal()}`); // $2023
```

### Solucion Ejercicio 2: Plugin System

```javascript
// plugin-base.js
export class PluginBase {
  nombre = "Plugin Base";
  version = "1.0.0";

  inicializar() {
    throw new Error("Metodo inicializar() no implementado");
  }

  ejecutar() {
    throw new Error("Metodo ejecutar() no implementado");
  }

  destruir() {
    console.log(`${this.nombre} destruido`);
  }
}

// plugin-manager.js
class PluginManager {
  #plugins;
  #cargados;

  constructor() {
    this.#plugins = new Map();
    this.#cargados = new Map();
  }

  async registrar(nombre, ruta) {
    this.#plugins.set(nombre, ruta);
  }

  async cargar(nombre) {
    if (this.#cargados.has(nombre)) {
      return this.#cargados.get(nombre);
    }

    const ruta = this.#plugins.get(nombre);
    if (!ruta) {
      throw new Error(`Plugin ${nombre} no registrado`);
    }

    try {
      const modulo = await import(ruta);
      const plugin = new modulo.default();
      plugin.inicializar();
      this.#cargados.set(nombre, plugin);
      console.log(`Plugin ${nombre} cargado`);
      return plugin;
    } catch (error) {
      console.error(`Error cargando plugin ${nombre}:`, error);
      throw error;
    }
  }

  async cargarTodos() {
    const nombres = Array.from(this.#plugins.keys());
    const cargas = nombres.map(nombre => this.cargar(nombre));
    return Promise.all(cargas);
  }

  obtener(nombre) {
    return this.#cargados.get(nombre);
  }

  async descargar(nombre) {
    const plugin = this.#cargados.get(nombre);
    if (plugin) {
      plugin.destruir();
      this.#cargados.delete(nombre);
    }
  }
}

const pluginManager = new PluginManager();
export default pluginManager;

// plugins/logger-plugin.js
import { PluginBase } from "../plugin-base.js";

export default class LoggerPlugin extends PluginBase {
  nombre = "Logger Plugin";

  inicializar() {
    console.log(`${this.nombre} inicializado`);
  }

  ejecutar(mensaje) {
    console.log(`[LOG]: ${mensaje}`);
  }
}

// plugins/cache-plugin.js
import { PluginBase } from "../plugin-base.js";

export default class CachePlugin extends PluginBase {
  nombre = "Cache Plugin";
  #cache;

  constructor() {
    super();
    this.#cache = new Map();
  }

  inicializar() {
    console.log(`${this.nombre} inicializado`);
  }

  ejecutar(clave, valor) {
    this.#cache.set(clave, valor);
    return valor;
  }

  obtener(clave) {
    return this.#cache.get(clave);
  }
}

// main.js
import pluginManager from "./plugin-manager.js";

async function main() {
  await pluginManager.registrar("logger", "./plugins/logger-plugin.js");
  await pluginManager.registrar("cache", "./plugins/cache-plugin.js");

  await pluginManager.cargarTodos();

  const logger = pluginManager.obtener("logger");
  logger.ejecutar("App iniciada");

  const cache = pluginManager.obtener("cache");
  cache.ejecutar("usuario", { nombre: "Juan" });
  console.log(cache.obtener("usuario"));
}
```

### Solucion Ejercicio 3: Barrel File

```javascript
// formatos.js
export function formatearMoneda(cantidad, moneda = "USD") {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: moneda
  }).format(cantidad);
}

export function formatearFecha(fecha, opciones = {}) {
  return new Intl.DateTimeFormat("es-ES", opciones).format(new Date(fecha));
}

export function formatearNumero(numero, decimales = 2) {
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales
  }).format(numero);
}

// validaciones.js
export function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validarPassword(password) {
  return {
    largo: password.length >= 8,
    mayuscula: /[A-Z]/.test(password),
    minuscula: /[a-z]/.test(password),
    numero: /[0-9]/.test(password),
    especial: /[!@#$%^&*]/.test(password)
  };
}

export function validarTelefono(telefono) {
  return /^\d{10}$/.test(telefono.replace(/[-()\s]/g, ""));
}

// conversores.js
export function hexARgb(hex) {
  const resultado = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return resultado ? {
    r: parseInt(resultado[1], 16),
    g: parseInt(resultado[2], 16),
    b: parseInt(resultado[3], 16)
  } : null;
}

export function rgbAHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

export function CelsiusAFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

export function FahrenheitACelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

// index.js (barrel file)
export * from "./formatos.js";
export * from "./validaciones.js";
export * from "./conversores.js";

// Uso
import { formatearMoneda, validarEmail, CelsiusAFahrenheit } from "./index.js";

console.log(formatearMoneda(1234.56)); // "1.234,56 €"
console.log(validarEmail("test@email.com")); // true
console.log(CelsiusAFahrenheit(100)); // 212
```

### Solucion Ejercicio 4: Lazy Loading

```javascript
// router.js
class Router {
  #rutas;
  #cargadas;

  constructor() {
    this.#rutas = new Map();
    this.#cargadas = new Map();
  }

  registrar(ruta, modulo) {
    this.#rutas.set(ruta, modulo);
  }

  async navegar(ruta) {
    if (this.#cargadas.has(ruta)) {
      return this.#cargadas.get(ruta);
    }

    const moduloRuta = this.#rutas.get(ruta);
    if (!moduloRuta) {
      throw new Error(`Ruta ${ruta} no encontrada`);
    }

    try {
      const modulo = await import(moduloRuta);
      this.#cargadas.set(ruta, modulo);
      return modulo;
    } catch (error) {
      console.error(`Error cargando ruta ${ruta}:`, error);
      throw error;
    }
  }

  limpiarCache() {
    this.#cargadas.clear();
  }
}

const router = new Router();
export default router;

// registro-rutas.js
import router from "./router.js";

router.registrar("/", "./paginas/inicio.js");
router.registrar("/usuarios", "./paginas/usuarios.js");
router.registrar("/productos", "./paginas/productos.js");
router.registrar("/about", "./paginas/about.js");

// paginas/inicio.js
export default function renderizarInicio() {
  return "<h1>Inicio</h1>";
}

// paginas/usuarios.js
export default function renderizarUsuarios() {
  return "<h1>Usuarios</h1>";
}

// main.js
import router from "./registro-rutas.js";

async function manejarRuta(ruta) {
  try {
    const modulo = await router.navegar(ruta);
    const contenido = modulo.default();
    document.getElementById("app").innerHTML = contenido;
  } catch (error) {
    document.getElementById("app").innerHTML = "<h1>404 - No encontrado</h1>";
  }
}

// Uso
manejarRuta("/");         // Carga pagina inicio
manejarRuta("/usuarios"); // Carga pagina usuarios
manejarRuta("/");         // Usa cache
```

### Solucion Ejercicio 5: Modulo con Estado

```javascript
// estado.js
class Estado {
  #estado;
  #suscriptores;
  #instancia;

  constructor() {
    if (Estado.#instancia) {
      return Estado.#instancia;
    }

    this.#estado = {};
    this.#suscriptores = new Map();
    Estado.#instancia = this;
  }

  obtener(clave) {
    if (clave) {
      return this.#estado[clave];
    }
    return { ...this.#estado };
  }

  actualizar(nuevoEstado) {
    const clavesAnteriores = { ...this.#estado };
    this.#estado = { ...this.#estado, ...nuevoEstado };

    // Notificar suscriptores
    for (const [clave, callbacks] of this.#suscriptores) {
      if (clavesAnteriores[clave] !== this.#estado[clave]) {
        callbacks.forEach(callback => {
          callback(this.#estado[clave], clavesAnteriores[clave]);
        });
      }
    }

    return this;
  }

  suscribir(clave, callback) {
    if (!this.#suscriptores.has(clave)) {
      this.#suscriptores.set(clave, []);
    }
    this.#suscriptores.get(clave).push(callback);

    // Retornar funcion para desuscribir
    return () => {
      const callbacks = this.#suscriptores.get(clave);
      const indice = callbacks.indexOf(callback);
      if (indice !== -1) {
        callbacks.splice(indice, 1);
      }
    };
  }

  resetear() {
    this.#estado = {};
    this.#suscriptores.clear();
  }
}

const estado = new Estado();
export default estado;

// main.js
import estado from "./estado.js";

// Actualizar estado
estado.actualizar({
  usuario: { nombre: "Juan", email: "juan@email.com" },
  tema: "oscuro",
  idioma: "es"
});

// Obtener estado
console.log(estado.obtener("usuario")); // { nombre: "Juan", email: "juan@email.com" }
console.log(estado.obtener()); // { usuario: {...}, tema: "oscuro", idioma: "es" }

// Suscribirse a cambios
const desuscribir = estado.suscribir("tema", (nuevo, anterior) => {
  console.log(`Tema cambiado de ${anterior} a ${nuevo}`);
});

estado.actualizar({ tema: "claro" }); // "Tema cambiado de oscuro a claro"

desuscribir(); // Cancelar suscripcion
```

### Solucion Ejercicio 6: Namespace

```javascript
// namespaces/math.js
export const PI = 3.14159;

export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}

export function multiplicar(a, b) {
  return a * b;
}

export function dividir(a, b) {
  if (b === 0) throw new Error("Division por cero");
  return a / b;
}

// namespaces/utils.js
export function formatearFecha(fecha) {
  return new Intl.DateTimeFormat("es-ES").format(new Date(fecha));
}

export function formatearNumero(numero, decimales = 2) {
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales
  }).format(numero);
}

export function generarId() {
  return Math.random().toString(36).substr(2, 9);
}

// namespaces/ui.js
export function crearBoton(texto, onClick) {
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.addEventListener("click", onClick);
  return boton;
}

export function crearInput(tipo, placeholder) {
  const input = document.createElement("input");
  input.type = tipo;
  input.placeholder = placeholder;
  return input;
}

// namespaces/index.js
import * as Math from "./math.js";
import * as Utils from "./utils.js";
import * as UI from "./ui.js";

const Namespaces = { Math, Utils, UI };
export default Namespaces;

// Uso
import Namespaces from "./namespaces/index.js";

console.log(Namespaces.Math.PI); // 3.14159
console.log(Namespaces.Math.sumar(2, 3)); // 5

console.log(Namespaces.Utils.formatearFecha(new Date()));
console.log(Namespaces.Utils.generarId());

const boton = Namespaces.UI.crearBoton("Click", () => console.log("Click!"));
document.body.appendChild(boton);
```
