# Examen Nivel 3: Avanzado

## Instrucciones Generales

- Tiempo limite: 90 minutos
- Puntaje total: 50 puntos
- No se permite usar internet ni documentacion externa
- Puede usar cualquier editor de codigo
- Los archivos deben ser nombrados segun se indique

---

## Parte A: Teoria (20 puntos)

### Pregunta 1 (2 puntos)

**¿Cual es la diferencia entre una funcion constructora y una clase ES6 en JavaScript? Menciona al menos 3 diferencias.**

**Respuesta:**

Las diferencias principales son:

1. Las clases usan la sintaxis `class` mientras que las funciones constructoras usan `function`
2. Las clases tienen `constructor()` explicito, las funciones constructoras inicializan propiedades directamente
3. Los metodos de clase se definen dentro del bloque, los de funciones constructoras se agregan al prototype
4. Las clases no se pueden invocar sin `new`, las funciones constructoras pueden (aunque no es recomendable)
5. Las clases tienen soporte nativo para herencia con `extends` y `super`

```javascript
// Funcion constructora
function Persona(nombre) {
  this.nombre = nombre;
}
Persona.prototype.saludar = function() {
  return `Hola, soy ${this.nombre}`;
};

// Clase ES6
class PersonaClase {
  constructor(nombre) {
    this.nombre = nombre;
  }
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
}
```

### Pregunta 2 (2 puntos)

**Explica que es la cadena de prototipos en JavaScript y como se resuelven las propiedades.**

**Respuesta:**

La cadena de prototipos es un mecanismo donde cada objeto tiene un enlace a otro objeto llamado prototipo. Cuando se accede a una propiedad, JavaScript busca en el objeto actual; si no la encuentra, busca en su prototipo, y asi sucesivamente hasta `Object.prototype` y finalmente `null`.

```javascript
const animal = { hacerSonido() { return "Sonido"; } };
const perro = Object.create(animal);
perro.ladrar = function() { return "Guau"; };

// Busqueda en cadena:
// perro.ladrar -> se encuentra en perro
// perro.hacerSonido -> se busca en perro, no existe, se busca en animal, se encuentra
// perro.toString -> se busca en perro, animal, Object.prototype, se encuentra
```

### Pregunta 3 (2 puntos)

**¿Que es el Event Loop en JavaScript? Describe el rol del Call Stack, Callback Queue y Microtask Queue.**

**Respuesta:**

El Event Loop es el mecanismo que permite ejecutar codigo asincrono en un lenguaje de un solo hilo.

- **Call Stack**: Pila que registra que funcion se esta ejecutando. Es sincrono y LIFO.
- **Callback Queue**: Cola donde se colocan callbacks de operaciones asincronas (setTimeout, I/O) para ser ejecutados cuando el Call Stack este vacio.
- **Microtask Queue**: Cola de prioridad mayor que la Callback Queue. Contiene callbacks de Promesas y queueMicrotask. Se ejecuta antes que la Callback Queue.

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

// Salida: 1, 4, 3, 2
// Orden: Sincrono -> Microtasks -> Callback Queue
```

### Pregunta 4 (2 puntos)

**Explica la diferencia entre `Promise.all()`, `Promise.allSettled()`, `Promise.race()` y `Promise.any()`.**

**Respuesta:**

- **Promise.all()**: Resuelve cuando TODAS las promesas resuelven. Rechaza si ALGUNA falla.
- **Promise.allSettled()**: Resuelve cuando TODAS las promesas terminan (exito o error). Siempre resuelve.
- **Promise.race()**: Resuelve o rechaza con el primer resultado (exito o error).
- **Promise.any()**: Resuelve con el primer EXITO. Rechaza si TODAS fallan.

```javascript
// all: primera falla detiene todo
Promise.all([p1, p2, p3])

// allSettled: espera a que todas terminen
Promise.allSettled([p1, p2, p3])

// race: primer resultado (exito o error)
Promise.race([p1, p2, p3])

// any: primer exito
Promise.any([p1, p2, p3])
```

### Pregunta 5 (2 puntos)

**¿Que son los campos privados (#) en clases JavaScript? ¿Como se diferencian de las propiedades con guion bajo?**

**Respuesta:**

Los campos privados con `#` son propiedades que solo son accesibles dentro de la clase. No se pueden acceder desde fuera de la clase, ni siquiera con `objeto.#campo`.

La diferencia con guion bajo `_` es que estos son solo una convencion, no son realmente privados. Se puede acceder a ellos externamente.

```javascript
class Cuenta {
  #saldo; // Campo privado real
  _saldo2; // Solo convencion

  constructor(saldo) {
    this.#saldo = saldo;
    this._saldo2 = saldo;
  }
}

const c = new Cuenta(100);
// c.#saldo // Error de sintaxis
// c._saldo2 // 100 (accesible)
```

### Pregunta 6 (2 puntos)

**Explica como funciona `async/await` y como se relaciona con las Promesas.**

**Respuesta:**

`async/await` es azucar sintactico sobre Promesas. Una funcion `async` siempre retorna una Promesa. `await` pausa la ejecucion de la funcion hasta que la Promesa se resuelva.

```javascript
// Con Promesas
function obtenerDatos() {
  return fetch(url)
    .then(r => r.json())
    .then(datos => datos);
}

// Con async/await
async function obtenerDatos() {
  const response = await fetch(url);
  const datos = await response.json();
  return datos;
}

// Ambas retornan una Promesa
```

### Pregunta 7 (2 puntos)

**¿Que es un Mixin en JavaScript? ¿Para que sirve y como se implementa?**

**Respuesta:**

Un Mixin es un patron que permite compartir comportamiento entre clases que no comparten herencia. Se implementa como una funcion que toma una clase y retorna una nueva clase con metodos adicionales.

```javascript
const ConLog = (superclass) => class extends superclass {
  log(mensaje) {
    console.log(`[${this.constructor.name}] ${mensaje}`);
  }
};

class MiClase extends ConLog(Base) {
  // MiClase tiene el metodo log()
}
```

### Pregunta 8 (2 puntos)

**Explica la diferencia entre CommonJS y ES Modules.**

**Respuesta:**

- **CommonJS**: Sincrono, usa `require()` y `module.exports`. Disenado para Node.js. No soporta tree-shaking.
- **ES Modules**: Asincrono, usa `import` y `export`. Estandar ECMAScript. Soporta tree-shaking. Funciona en navegador y Node.js.

```javascript
// CommonJS
const modulo = require("./mi-modulo");
module.exports = { funcion };

// ES Modules
import modulo from "./mi-modulo.js";
export default funcion;
```

### Pregunta 9 (2 puntos)

**¿Que es un Grupo con Nombre en RegExp? ¿Cual es su ventaja?**

**Respuesta:**

Un grupo con nombre es un grupo de captura al que se le asigna un nombre en lugar de un numero. La ventaja es que el codigo es mas legible y mantenible.

```javascript
const fecha = "2024-01-15";
const patron = /(?<anio>\d{4})-(?<mes>\d{2})-(?<dia>\d{2})/;
const match = fecha.match(patron);

// Sin nombre: match[1], match[2], match[3]
// Con nombre: match.groups.anio, match.groups.mes, match.groups.dia
```

### Pregunta 10 (2 puntos)

**Explica la diferencia entre Lookahead y Lookbehind positivo y negativo.**

**Respuesta:**

- **Lookahead positivo `(?=...)`**: Busca lo que SIGUE sin incluirlo
- **Lookahead negativo `(?!...)`**: Busca lo que NO sigue
- **Lookbehind positivo `(?<=...)`**: Busca lo que PRECEDE sin incluirlo
- **Lookbehind negativo `(?<!...)`**: Busca lo que NO precede

```javascript
// Lookahead positivo: numeros seguidos de px
"100px 200em".match(/\d+(?=px)/); // ["100"]

// Lookahead negativo: numeros NO seguidos de px
"100px 200em".match(/\d+(?!px)/); // ["200"]

// Lookbehind positivo: numeros precedidos de $
"$100 €200".match(/(?<=\$)\d+/); // ["100"]

// Lookbehind negativo: numeros NO precedidos de $
"$100 €200".match(/(?<!\$)\d+/); // ["200"]
```

---

## Parte B: Practica (30 puntos)

### Ejercicio 1 (5 puntos)

**Crear una clase `ColaPrioridad` que implemente una cola de prioridad con los siguientes metodos:**

- `agregar(elemento, prioridad)`: Agrega un elemento con prioridad (1 = maxima)
- `siguiente()`: Retorna y elimina el elemento de mayor prioridad
- `ver()`: Retorna el elemento de mayor prioridad sin eliminarlo
- `estaVacia()`: Retorna true si esta vacia
- `tamano()`: Retorna el numero de elementos

**Incluir al menos 3 ejemplos de uso.**

```javascript
// Solucion
class ColaPrioridad {
  #elementos;

  constructor() {
    this.#elementos = [];
  }

  agregar(elemento, prioridad) {
    const nuevoElemento = { elemento, prioridad };
    let insertado = false;

    for (let i = 0; i < this.#elementos.length; i++) {
      if (prioridad < this.#elementos[i].prioridad) {
        this.#elementos.splice(i, 0, nuevoElemento);
        insertado = true;
        break;
      }
    }

    if (!insertado) {
      this.#elementos.push(nuevoElemento);
    }
  }

  siguiente() {
    if (this.estaVacia()) {
      throw new Error("Cola vacia");
    }
    return this.#elementos.shift().elemento;
  }

  ver() {
    if (this.estaVacia()) {
      throw new Error("Cola vacia");
    }
    return this.#elementos[0].elemento;
  }

  estaVacia() {
    return this.#elementos.length === 0;
  }

  tamano() {
    return this.#elementos.length;
  }
}

// Ejemplos de uso
const cola = new ColaPrioridad();
cola.agregar("Tarea normal", 3);
cola.agregar("Tarea urgente", 1);
cola.agregar("Tarea importante", 2);

console.log(cola.ver()); // "Tarea urgente"
console.log(cola.siguiente()); // "Tarea urgente"
console.log(cola.siguiente()); // "Tarea importante"
console.log(cola.estaVacia()); // false
console.log(cola.tamano()); // 1
```

### Ejercicio 2 (5 puntos)

**Crear una funcion `async` que implemente un sistema de cache con las siguientes caracteristicas:**

- `obtener(clave, funcionAsync)`: Retorna el valor cacheado o ejecuta la funcion
- `invalidar(clave)`: Elimina una entrada del cache
- `limpiar()`: Elimina todo el cache
- La cache debe expirar despues de un tiempo configurable (TTL)

```javascript
// Solucion
function crearCache(ttl = 60000) {
  const cache = new Map();

  return {
    async obtener(clave, funcionAsync) {
      const entrada = cache.get(clave);

      if (entrada && Date.now() - entrada.timestamp < ttl) {
        console.log(`Cache hit: ${clave}`);
        return entrada.valor;
      }

      console.log(`Cache miss: ${clave}`);
      const valor = await funcionAsync();
      cache.set(clave, { valor, timestamp: Date.now() });
      return valor;
    },

    invalidar(clave) {
      cache.delete(clave);
    },

    limpiar() {
      cache.clear();
    },

    tamano() {
      return cache.size;
    }
  };
}

// Ejemplos de uso
const cache = crearCache(30000);

async function obtenerUsuario(id) {
  console.log(`Obteniendo usuario ${id} del servidor...`);
  return { id, nombre: `Usuario ${id}` };
}

// Primera llamada: miss
const usuario1 = await cache.obtener("user-1", () => obtenerUsuario(1));
console.log(usuario1);

// Segunda llamada: hit
const usuario2 = await cache.obtener("user-1", () => obtenerUsuario(1));
console.log(usuario2);

cache.invalidar("user-1");
cache.limpiar();
console.log(cache.tamano()); // 0
```

### Ejercicio 3 (5 puntos)

**Crear un sistema de validacion de formularios usando clases que:**

- Permita agregar reglas de validacion por campo
- Soporte tipos: email, telefono, password, numero, texto
- Retorne un objeto con `{ valido: boolean, errores: string[] }`
- Incluya al menos 4 tipos de validacion

```javascript
// Solucion
class ValidadorFormulario {
  #reglas;

  constructor() {
    this.#reglas = new Map();
  }

  agregar(campo, tipo, opciones = {}) {
    this.#reglas.set(campo, { tipo, opciones });
    return this;
  }

  #validarCampo(campo, valor) {
    const regla = this.#reglas.get(campo);
    if (!regla) return [];

    const errores = [];
    const { tipo, opciones } = regla;

    switch (tipo) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
          errores.push(`${campo}: email invalido`);
        }
        break;

      case "telefono":
        if (!/^\d{10}$/.test(valor.replace(/[-()\s]/g, ""))) {
          errores.push(`${campo}: telefono invalido`);
        }
        break;

      case "password":
        if (valor.length < (opciones.min || 8)) {
          errores.push(`${campo}: minimo ${opciones.min || 8} caracteres`);
        }
        if (opciones.mayuscula && !/[A-Z]/.test(valor)) {
          errores.push(`${campo}: requiere mayuscula`);
        }
        if (opciones.numero && !/\d/.test(valor)) {
          errores.push(`${campo}: requiere numero`);
        }
        break;

      case "numero":
        if (isNaN(valor) || (opciones.min && valor < opciones.min) || (opciones.max && valor > opciones.max)) {
          errores.push(`${campo}: numero invalido`);
        }
        break;

      case "texto":
        if (opciones.min && valor.length < opciones.min) {
          errores.push(`${campo}: minimo ${opciones.min} caracteres`);
        }
        if (opciones.max && valor.length > opciones.max) {
          errores.push(`${campo}: maximo ${opciones.max} caracteres`);
        }
        break;
    }

    return errores;
  }

  validar(datos) {
    const errores = [];

    for (const [campo] of this.#reglas) {
      const valor = datos[campo];
      const erroresCampo = this.#validarCampo(campo, valor);
      errores.push(...erroresCampo);
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }
}

// Ejemplos de uso
const validador = new ValidadorFormulario();
validador.agregar("email", "email");
validador.agregar("telefono", "telefono");
validador.agregar("password", "password", { min: 8, mayuscula: true, numero: true });
validador.agregar("edad", "numero", { min: 18, max: 120 });

const resultado = validador.validar({
  email: "test@email.com",
  telefono: "1234567890",
  password: "Abc12345",
  edad: 25
});

console.log(resultado); // { valido: true, errores: [] }

const resultadoInvalido = validador.validar({
  email: "invalido",
  telefono: "123",
  password: "abc",
  edad: 15
});

console.log(resultadoInvalido); // { valido: false, errores: [...] }
```

### Ejercicio 4 (5 puntos)

**Crear una funcion `scraping` que tome un array de URLs y:**

- Cargue todas las URLs en paralelo con limite de concurrencia
- Maneje errores individuales sin detener todo
- Retorne un objeto con exitosos, fallidos y totales
- Incluya reintentos automaticos

```javascript
// Solucion
async function scraping(urls, opciones = {}) {
  const { maxConcurrente = 3, maxReintentos = 2, delayReintento = 1000 } = opciones;

  const resultados = new Array(urls.length).fill(null);
  let indiceActual = 0;

  async function cargarConReintentos(url, indice) {
    let ultimoError;

    for (let intento = 0; intento <= maxReintentos; intento++) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const datos = await response.json();
        resultados[indice] = { url, exito: true, datos };
        return;
      } catch (error) {
        ultimoError = error;
        if (intento < maxReintentos) {
          await new Promise(r => setTimeout(r, delayReintento * (intento + 1)));
        }
      }
    }

    resultados[indice] = { url, exito: false, error: ultimoError.message };
  }

  async function procesarCola() {
    while (indiceActual < urls.length) {
      const indice = indiceActual++;
      await cargarConReintentos(urls[indice], indice);
    }
  }

  const workers = Array(Math.min(maxConcurrente, urls.length))
    .fill(null)
    .map(() => procesarCola());

  await Promise.all(workers);

  return {
    exitosos: resultados.filter(r => r?.exito).length,
    fallidos: resultados.filter(r => r && !r.exito).length,
    total: urls.length,
    resultados
  };
}

// Ejemplos de uso
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3"
];

const resultado = await scraping(urls);
console.log(`Exitosos: ${resultado.exitosos}/${resultado.total}`);
```

### Ejercicio 5 (5 puntos)

**Crear un sistema de eventos (`EventEmitter`) que:**

- Permita suscribirse a eventos con `on(evento, callback)`
- Permita desuscribirse con `off(evento, callback)`
- Emita eventos con `emit(evento, ...args)`
- Soporte eventos una sola vez con `once(evento, callback)`
- Retorne funcion de desuscripcion en `on()`

```javascript
// Solucion
class EventEmitter {
  #suscriptores;

  constructor() {
    this.#suscriptores = new Map();
  }

  on(evento, callback) {
    if (!this.#suscriptores.has(evento)) {
      this.#suscriptores.set(evento, []);
    }
    this.#suscriptores.get(evento).push({ callback, unaVez: false });

    return () => this.off(evento, callback);
  }

  once(evento, callback) {
    if (!this.#suscriptores.has(evento)) {
      this.#suscriptores.set(evento, []);
    }
    this.#suscriptores.get(evento).push({ callback, unaVez: true });

    return () => this.off(evento, callback);
  }

  off(evento, callback) {
    const suscriptores = this.#suscriptores.get(evento);
    if (!suscriptores) return;

    const indice = suscriptores.findIndex(s => s.callback === callback);
    if (indice !== -1) {
      suscriptores.splice(indice, 1);
    }
  }

  emit(evento, ...args) {
    const suscriptores = this.#suscriptores.get(evento);
    if (!suscriptores) return;

    const aEliminar = [];

    suscriptores.forEach((suscriptor, indice) => {
      suscriptor.callback(...args);
      if (suscriptor.unaVez) {
        aEliminar.push(indice);
      }
    });

    // Eliminar suscriptores de una sola vez (en reversa)
    for (let i = aEliminar.length - 1; i >= 0; i--) {
      suscriptores.splice(aEliminar[i], 1);
    }
  }
}

// Ejemplos de uso
const emitter = new EventEmitter();

const desuscribir = emitter.on("mensaje", (texto) => {
  console.log(`Recibido: ${texto}`);
});

emitter.once("conexion", (url) => {
  console.log(`Conectado a: ${url}`);
});

emitter.emit("mensaje", "Hola Mundo"); // "Recibido: Hola Mundo"
emitter.emit("mensaje", "Adios"); // "Recibido: Adios"
emitter.emit("conexion", "https://api.ejemplo.com"); // "Conectado a: https://api.ejemplo.com"
emitter.emit("conexion", "https://otro.com"); // No se ejecuta (una sola vez)

desuscribir(); // Cancelar suscripcion
```

### Ejercicio 6 (5 puntos)

**Crear una libreria de utilidades que incluya:**

- Funcion `debounce` mejorada con manejo de errores
- Funcion `throttle` con soporte de trailing
- Funcion `memoize` con cache y TTL
- Funcion `retry` con backoff exponencial
- Cada funcion debe estar documentada con ejemplos

```javascript
// Solucion
const Utils = {
  /**
   * Debounce mejorado con manejo de errores
   * @param {Function} funcion - Funcion a ejecutar
   * @param {number} delay - Milisegundos de espera
   * @returns {Function} Funcion debounced
   */
  debounce(funcion, delay) {
    let temporizador;
    return function(...args) {
      clearTimeout(temporizador);
      temporizador = setTimeout(() => {
        try {
          funcion.apply(this, args);
        } catch (error) {
          console.error("Error en debounce:", error);
        }
      }, delay);
    };
  },

  /**
   * Throttle con soporte trailing
   * @param {Function} funcion - Funcion a ejecutar
   * @param {number} limite - Milisegundos entre ejecuciones
   * @param {boolean} trailing - Ejecutar al final (default: true)
   * @returns {Function} Funcion throttled
   */
  throttle(funcion, limite, trailing = true) {
    let enEspera = false;
    let ultimaArgs = null;

    return function(...args) {
      if (!enEspera) {
        funcion.apply(this, args);
        enEspera = true;

        setTimeout(() => {
          enEspera = false;
          if (trailing && ultimaArgs) {
            funcion.apply(this, ultimaArgs);
            ultimaArgs = null;
          }
        }, limite);
      } else if (trailing) {
        ultimaArgs = args;
      }
    };
  },

  /**
   * Memoize con cache y TTL
   * @param {Function} funcion - Funcion a memoizar
   * @param {number} ttl - Time to live en ms (default: Infinity)
   * @returns {Function} Funcion memoizada
   */
  memoize(funcion, ttl = Infinity) {
    const cache = new Map();

    return function(...args) {
      const clave = JSON.stringify(args);
      const entrada = cache.get(clave);

      if (entrada && Date.now() - entrada.timestamp < ttl) {
        return entrada.valor;
      }

      const valor = funcion.apply(this, args);
      cache.set(clave, { valor, timestamp: Date.now() });
      return valor;
    };
  },

  /**
   * Retry con backoff exponencial
   * @param {Function} funcion - Funcion a reintentar
   * @param {number} maxIntentos - Numero maximo de intentos
   * @param {number} delayBase - Delay base en ms
   * @returns {Promise} Resultado de la funcion
   */
  async retry(funcion, maxIntentos = 3, delayBase = 1000) {
    let ultimoError;

    for (let intento = 1; intento <= maxIntentos; intento++) {
      try {
        return await funcion();
      } catch (error) {
        ultimoError = error;
        if (intento < maxIntentos) {
          const delay = delayBase * Math.pow(2, intento - 1);
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }

    throw ultimoError;
  }
};

// Ejemplos de uso

// Debounce
const buscar = Utils.debounce((termino) => {
  console.log(`Buscando: ${termino}`);
}, 300);

// Throttle
let contador = 0;
const incrementar = Utils.throttle(() => {
  contador++;
  console.log(`Contador: ${contador}`);
}, 1000);

// Memoize
const calcular = Utils.memoize((n) => {
  console.log(`Calculando ${n}...`);
  return n * n;
}, 5000);

// Retry
async function operacionRiesgosa() {
  if (Math.random() > 0.7) return "Exito";
  throw new Error("Fallo");
}

const resultado = await Utils.retry(operacionRiesgosa, 3);
console.log(resultado);
```

---

## Criterios de Evaluacion

### Parte A: Teoria (20 puntos)

| Pregunta | Criterio | Puntos |
|----------|----------|--------|
| 1-10 | Respuesta correcta y completa | 2 c/u |

### Parte B: Practica (30 puntos)

| Ejercicio | Criterio | Puntos |
|-----------|----------|--------|
| 1 | Clase funcional con metodos correctos | 5 |
| 2 | Cache async con TTL funcional | 5 |
| 3 | Sistema de validacion completo | 5 |
| 4 | Scraping con concurrencia y reintentos | 5 |
| 5 | EventEmitter con todas las funcionalidades | 5 |
| 6 | Libreria de utilidades documentada | 5 |

### Puntuacion por Ejercicio

- **5 puntos**: Solucion completa y correcta
- **4 puntos**: Solucion mayormente correcta con errores menores
- **3 puntos**: Solucion parcialmente correcta
- **2 puntos**: Intento con errores significativos
- **1 punto**: Intento minimo
- **0 puntos**: Sin intento o solucion incorrecta

---

## Nota Minima para Aprobar

- **35 puntos** (70%) para aprobar
- **45 puntos** (90%) para sobresalir

---

## Material de Estudio Recomendado

- MDN Web Docs: JavaScript
- Eloquent JavaScript (libro online gratuito)
- JavaScript.info (tutorial moderno)
- Documentacion oficial de ECMAScript
