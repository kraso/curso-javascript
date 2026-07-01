# Leccion 2: Asincronia y Callbacks

## Objetivos de aprendizaje

- [ ] Comprender la diferencia entre codigo sincrono y asincrono
- [ ] Entender el Event Loop (call stack, callback queue, microtask queue)
- [ ] Implementar temporizadores con setTimeout y setInterval
- [ ] Dominar el patron de callbacks
- [ ] Identificar y resolver el Callback Hell (Pyramid of Doom)
- [ ] Implementar error-first callbacks
- [ ] Crear funciones asincronas con callbacks
- [ ] Aplicar en practicas reales (AJAX, archivos, temporizadores)

---

## 1. Codigo Sincrono vs Asincrono

### 1.1 Codigo Sincrono

El codigo sincrono se ejecuta linea por linea, en orden. Cada instruccion espera a que la anterior termine.

```javascript
console.log("Inicio");

function tareaLarga() {
  let resultado = 0;
  for (let i = 0; i < 1000000; i++) {
    resultado += i;
  }
  return resultado;
}

const resultado = tareaLarga();
console.log(`Resultado: ${resultado}`);

console.log("Fin");

// Salida:
// "Inicio"
// "Resultado: 499999500000"
// "Fin"
// Todo se ejecuta en orden, bloqueando el hilo principal
```

### 1.2 Codigo Asincrono

El codigo asincrono permite que otras tareas se ejecuten mientras esperamos una operacion que toma tiempo.

```javascript
console.log("Inicio");

setTimeout(() => {
  console.log("Tarea asincrona completada");
}, 2000);

console.log("Fin");

// Salida:
// "Inicio"
// "Fin"
// "Tarea asincrona completada" (despues de 2 segundos)

// El codigo no se bloquea, setTimeout ejecuta su callback despues
```

### 1.3 Bloqueo del Hilo Principal

```javascript
// Ejemplo de codigo que bloquea
console.log("Inicio");

// Esto bloquea el hilo durante ~1 segundo
const inicio = Date.now();
while (Date.now() - inicio < 1000) {
  // Esperando...
}

console.log("Despues del bloqueo");

// setTimeout se ejecuta DESPUES del bloqueo, no durante
setTimeout(() => {
  console.log("Esto aparece despues del bloqueo");
}, 100);

// Salida:
// "Inicio"
// (espera 1 segundo)
// "Despues del bloqueo"
// "Esto aparece despues del bloqueo"
```

---

## 2. El Event Loop

JavaScript tiene un Event Loop que gestiona la ejecucion de codigo asincrono.

### 2.1 Call Stack (Pila de Llamadas)

El Call Stack registra que funcion se esta ejecutando actualmente.

```javascript
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

function calcular() {
  const resultado = factorial(5);
  console.log(resultado);
}

calcular();

// Call Stack durante la ejecucion:
// 1. [calcular]
// 2. [calcular, factorial(5)]
// 3. [calcular, factorial(4)]
// 4. [calcular, factorial(3)]
// 5. [calcular, factorial(2)]
// 6. [calcular, factorial(1)]
// 7. [calcular, factorial(0)]
// 8. [calcular, 120]
// 9. [console.log(120)]
// 10. []
```

### 2.2 Callback Queue (Cola de Callbacks)

Los callbacks de operaciones asincronas se colocan en la Callback Queue.

```javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");

// Salida:
// "1"
// "3"
// "2"

// Explicacion:
// 1. "1" se imprime (Call Stack)
// 2. setTimeout se registra y su callback va a la Callback Queue
// 3. "3" se imprime (Call Stack)
// 4. Call Stack vacio, Event Loop mueve callback de la Queue al Stack
// 5. "2" se imprime
```

### 2.3 Microtask Queue

Las Microtasks tienen prioridad sobre la Callback Queue.

```javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");

// Salida:
// "1"
// "4"
// "3"
// "2"

// Las Microtasks (Promise.then) se ejecutan ANTES que la Callback Queue
```

### 2.4 Orden de Ejecucion Completo

```javascript
console.log("1 - Sincrono");

setTimeout(() => {
  console.log("2 - Timeout");
}, 0);

Promise.resolve()
  .then(() => console.log("3 - Promise 1"))
  .then(() => console.log("4 - Promise 2"));

setTimeout(() => {
  console.log("5 - Timeout 2");
}, 0);

console.log("6 - Sincrono");

// Salida:
// "1 - Sincrono"
// "6 - Sincrono"
// "3 - Promise 1"
// "4 - Promise 2"
// "2 - Timeout"
// "5 - Timeout 2"

// Orden: Sincrono -> Microtasks -> Callback Queue
```

---

## 3. Temporizadores: setTimeout y setInterval

### 3.1 setTimeout

```javascript
// Sintaxis basica
console.log("Inicio");

const id = setTimeout(() => {
  console.log("Ejecutado despues de 2 segundos");
}, 2000);

console.log(`Timeout ID: ${id}`);

// Cancelar timeout
clearTimeout(id);
console.log("Timeout cancelado");
```

### 3.2 setTimeout con Parametros

```javascript
function saludar(nombre, saludo) {
  console.log(`${saludo}, ${nombre}!`);
}

// Pasar argumentos al callback
setTimeout(saludar, 1000, "Juan", "Hola");
// "Hola, Juan!" despues de 1 segundo

// Usar arrow function
setTimeout((nombre, edad) => {
  console.log(`${nombre} tiene ${edad} anos`);
}, 1500, "Maria", 25);
// "Maria tiene 25 anos" despues de 1.5 segundos
```

### 3.3 setInterval

```javascript
let contador = 0;

const intervalo = setInterval(() => {
  contador++;
  console.log(`Contador: ${contador}`);

  if (contador >= 5) {
    clearInterval(intervalo);
    console.log("Intervalo detenido");
  }
}, 1000);

// Salida cada segundo:
// "Contador: 1"
// "Contador: 2"
// "Contador: 3"
// "Contador: 4"
// "Contador: 5"
// "Intervalo detenido"
```

### 3.4 Ejemplo: Reloj Digital

```javascript
function relojDigital() {
  const ahora = new Date();
  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  const segundos = String(ahora.getSeconds()).padStart(2, "0");
  return `${horas}:${minutos}:${segundos}`;
}

console.log(relojDigital()); // "14:30:45"

// Actualizar cada segundo (en navegador)
// setInterval(() => {
//   document.getElementById("reloj").textContent = relojDigital();
// }, 1000);
```

### 3.5 setTimeout vs setInterval

```javascript
// setTimeout: ejecuta una vez despues del delay
console.log("Usando setTimeout:");
setTimeout(() => {
  console.log("Ejecutado una vez");
}, 1000);

// setInterval: ejecuta repetidamente cada intervalo
let intentos = 0;
const maxIntentos = 3;

function intentarConexion() {
  intentos++;
  console.log(`Intento ${intentos} de conexion...`);

  if (intentos < maxIntentos) {
    setTimeout(intentarConexion, 1000);
  } else {
    console.log("Conexion establecida");
  }
}

intentarConexion();
// "Intento 1 de conexion..."
// "Intento 2 de conexion..."
// "Intento 3 de conexion..."
// "Conexion establecida"
```

---

## 4. El Patron de Callbacks

### 4.1 Callback Basico

```javascript
function buscarUsuario(id, callback) {
  // Simulando una busqueda en base de datos
  setTimeout(() => {
    const usuario = {
      id,
      nombre: "Juan Perez",
      email: "juan@email.com"
    };
    callback(usuario);
  }, 1000);
}

// Uso
buscarUsuario(1, (usuario) => {
  console.log(`Usuario encontrado: ${usuario.nombre}`);
});
// "Usuario encontrado: Juan Perez" despues de 1 segundo
```

### 4.2 Callback con Multiples Resultados

```javascript
function procesarDatos(datos, onExito, onError) {
  setTimeout(() => {
    if (datos.length === 0) {
      onError(new Error("No hay datos para procesar"));
      return;
    }

    const resultado = datos.map(dato => ({
      ...dato,
      procesado: true,
      fecha: new Date()
    }));

    onExito(resultado);
  }, 500);
}

// Uso
const datos = [
  { id: 1, nombre: "Item 1" },
  { id: 2, nombre: "Item 2" }
];

procesarDatos(
  datos,
  (resultado) => {
    console.log(`Procesados: ${resultado.length} elementos`);
    resultado.forEach(r => console.log(`${r.nombre}: ${r.procesado}`));
  },
  (error) => {
    console.error(`Error: ${error.message}`);
  }
);
// "Procesados: 2 elementos"
// "Item 1: true"
// "Item 2: true"
```

### 4.3 Callback con Estado

```javascript
function conexionDB(config, callback) {
  let estado = "conectando";

  setTimeout(() => {
    if (config.url) {
      estado = "conectado";
      callback(null, {
        estado,
        url: config.url,
        timestamp: Date.now()
      });
    } else {
      estado = "error";
      callback(new Error("URL no proporcionada"));
    }
  }, 1000);

  return {
    getEstado: () => estado
  };
}

// Uso
const conexion = conexionDB(
  { url: "mongodb://localhost:27017" },
  (error, resultado) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log(`Estado: ${resultado.estado}`);
      console.log(`URL: ${resultado.url}`);
    }
  }
);

console.log(conexion.getEstado()); // "conectando"
// Despues de 1 segundo:
// "Estado: conectado"
// "URL: mongodb://localhost:27017"
```

---

## 5. Callback Hell (Pyramid of Doom)

### 5.1 Ejemplo de Callback Hell

```javascript
// Mal ejemplo: Callback Hell
function obtenerUsuario(id, callback) {
  setTimeout(() => {
    callback(null, { id, nombre: "Juan" });
  }, 1000);
}

function obtenerPerfil(usuarioId, callback) {
  setTimeout(() => {
    callback(null, { usuarioId, bio: "Desarrollador" });
  }, 1000);
}

function obtenerPosts(perfilId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, titulo: "Post 1" },
      { id: 2, titulo: "Post 2" }
    ]);
  }, 1000);
}

function obtenerComentarios(postId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, texto: "Buen post" },
      { id: 2, texto: "Gracias" }
    ]);
  }, 1000);
}

// Callback Hell
obtenerUsuario(1, (error, usuario) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(`Usuario: ${usuario.nombre}`);

  obtenerPerfil(usuario.id, (error, perfil) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`Bio: ${perfil.bio}`);

    obtenerPosts(perfil.usuarioId, (error, posts) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Posts: ${posts.length}`);

      posts.forEach(post => {
        obtenerComentarios(post.id, (error, comentarios) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log(`Post ${post.titulo}: ${comentarios.length} comentarios`);
        });
      });
    });
  });
});

// El codigo se vuelve cada vez mas anidado e ilegible
```

### 5.2 Soluciones al Callback Hell

```javascript
// Solucion 1: Nombrar funciones
function manejarError(error) {
  console.error(`Error: ${error.message}`);
}

function procesarComentarios(post) {
  obtenerComentarios(post.id, (error, comentarios) => {
    if (error) {
      manejarError(error);
      return;
    }
    console.log(`Post ${post.titulo}: ${comentarios.length} comentarios`);
  });
}

function procesarPosts(perfil) {
  obtenerPosts(perfil.usuarioId, (error, posts) => {
    if (error) {
      manejarError(error);
      return;
    }
    console.log(`Posts: ${posts.length}`);
    posts.forEach(procesarComentarios);
  });
}

function procesarPerfil(usuario) {
  obtenerPerfil(usuario.id, (error, perfil) => {
    if (error) {
      manejarError(error);
      return;
    }
    console.log(`Bio: ${perfil.bio}`);
    procesarPosts(perfil);
  });
}

// Iniciar el flujo
obtenerUsuario(1, (error, usuario) => {
  if (error) {
    manejarError(error);
    return;
  }
  console.log(`Usuario: ${usuario.nombre}`);
  procesarPerfil(usuario);
});
```

### 5.3 Patron de Modularizacion

```javascript
// Modulo: usuario-service.js
function UsuarioService() {
  function obtener(id, callback) {
    setTimeout(() => {
      callback(null, { id, nombre: "Juan", email: "juan@email.com" });
    }, 1000);
  }

  function actualizar(id, datos, callback) {
    setTimeout(() => {
      callback(null, { id, ...datos, actualizado: true });
    }, 500);
  }

  return { obtener, actualizar };
}

// Modulo: perfil-service.js
function PerfilService() {
  function obtener(usuarioId, callback) {
    setTimeout(() => {
      callback(null, { usuarioId, bio: "Dev", avatar: "avatar.jpg" });
    }, 800);
  }

  function actualizar(usuarioId, datos, callback) {
    setTimeout(() => {
      callback(null, { usuarioId, ...datos, actualizado: true });
    }, 500);
    }, 500);
  }

  return { obtener, actualizar };
}

// Uso
const usuarioService = UsuarioService();
const perfilService = PerfilService();

usuarioService.obtener(1, (error, usuario) => {
  if (error) return console.error(error);
  console.log(`Usuario: ${usuario.nombre}`);

  perfilService.obtener(usuario.id, (error, perfil) => {
    if (error) return console.error(error);
    console.log(`Bio: ${perfil.bio}`);
  });
});
```

---

## 6. Error-First Callbacks

### 6.1 Convencion de Error-First

```javascript
function leerArchivo(ruta, callback) {
  // Simulando lectura de archivo
  setTimeout(() => {
    if (!ruta) {
      callback(new Error("Ruta no proporcionada"));
      return;
    }

    if (ruta.includes("inexistente")) {
      callback(new Error("Archivo no encontrado"));
      return;
    }

    const contenido = `Contenido del archivo: ${ruta}`;
    callback(null, contenido);
  }, 500);
}

// Uso correcto
leerArchivo("mi-archivo.txt", (error, contenido) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(contenido);
});

// Error
leerArchivo(null, (error, contenido) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(contenido);
});
// "Error: Ruta no proporcionada"
```

### 6.2 Manejo de Multiples Errores

```javascript
function operacionCompleja(callback) {
  setTimeout(() => {
    const exito = Math.random() > 0.5;

    if (exito) {
      callback(null, {
        datos: [1, 2, 3],
        timestamp: Date.now()
      });
    } else {
      const errores = [
        "Timeout de conexion",
        "Error de autenticacion",
        "Servidor no disponible"
      ];
      const errorAleatorio = errores[Math.floor(Math.random() * errores.length)];
      callback(new Error(errorAleatorio));
    }
  }, 1000);
}

// Uso
operacionCompleja((error, resultado) => {
  if (error) {
    console.error(`Error en operacion: ${error.message}`);
    // Reintentar o notificar
    return;
  }
  console.log(`Exito: ${resultado.datos}`);
});
```

### 6.3 Patron de Reintento

```javascript
function conexionConReintento(url, maxReintentos, callback) {
  let intentos = 0;

  function intentar() {
    intentos++;
    console.log(`Intento ${intentos} de ${maxReintentos}...`);

    // Simular conexion
    setTimeout(() => {
      const exito = Math.random() > 0.7;

      if (exito) {
        callback(null, { url, intentos, estado: "conectado" });
      } else if (intentos < maxReintentos) {
        const delay = Math.pow(2, intentos) * 1000; // Backoff exponencial
        console.log(`Reintentando en ${delay}ms...`);
        setTimeout(intentar, delay);
      } else {
        callback(new Error(`Fallo despues de ${maxReintentos} intentos`));
      }
    }, 1000);
  }

  intentar();
}

// Uso
conexionConReintento("https://api.example.com", 3, (error, resultado) => {
  if (error) {
    console.error(error.message);
    return;
  }
  console.log(`Conexion exitosa en ${resultado.intentos} intentos`);
});
```

---

## 7. Ejemplos Practicos

### 7.1 AJAX con Callbacks

```javascript
function ajax(url, options, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(options.method || "GET", url);

  if (options.headers) {
    Object.keys(options.headers).forEach(key => {
      xhr.setRequestHeader(key, options.headers[key]);
    });
  }

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const datos = JSON.parse(xhr.responseText);
        callback(null, datos);
      } catch (e) {
        callback(new Error("Error al parsear respuesta"));
      }
    } else {
      callback(new Error(`HTTP Error: ${xhr.status}`));
    }
  };

  xhr.onerror = function() {
    callback(new Error("Error de red"));
  };

  xhr.send(options.body || null);
}

// Uso
ajax("https://jsonplaceholder.typicode.com/posts/1", {
  method: "GET",
  headers: { "Content-Type": "application/json" }
}, (error, datos) => {
  if (error) {
    console.error(error.message);
    return;
  }
  console.log(`Titulo: ${datos.title}`);
  console.log(`Cuerpo: ${datos.body}`);
});
```

### 7.2 Leer Archivo (Node.js)

```javascript
// En Node.js
const fs = require("fs");

function leerArchivoPromise(ruta) {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, "utf8", (error, contenido) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(contenido);
    });
  });
}

// Uso con callbacks
fs.readFile("mi-archivo.txt", "utf8", (error, contenido) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(contenido);
});
```

### 7.3 Temporizadores Practicos

```javascript
// Cuenta regresiva
function cuentaRegresiva(inicio, callback) {
  let contador = inicio;

  const intervalo = setInterval(() => {
    console.log(`Tiempo restante: ${contador}`);
    contador--;

    if (contador < 0) {
      clearInterval(intervalo);
      callback(null, "Tiempo completado");
    }
  }, 1000);
}

cuentaRegresiva(5, (error, mensaje) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(mensaje);
});

// Debounce
function debounce(funcion, delay) {
  let temporizador;
  return function(...args) {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => funcion.apply(this, args), delay);
  };
}

// Uso
const buscar = debounce((termino) => {
  console.log(`Buscando: ${termino}`);
}, 500);

buscar("a");
buscar("ap");
buscar("apple");
// Solo ejecuta "apple" despues de 500ms de inactividad
```

### 7.4 Throttle

```javascript
function throttle(funcion, limite) {
  let enEspera = false;
  let ultimaArgs = null;

  return function(...args) {
    if (!enEspera) {
      funcion.apply(this, args);
      enEspera = true;

      setTimeout(() => {
        enEspera = false;
        if (ultimaArgs) {
          funcion.apply(this, ultimaArgs);
          ultimaArgs = null;
        }
      }, limite);
    } else {
      ultimaArgs = args;
    }
  };
}

// Uso
const manejarScroll = throttle((posicion) => {
  console.log(`Scroll en posicion: ${posicion}`);
}, 200);

// ManejarScroll solo se ejecuta maximo cada 200ms
```

---

## Buenas practicas

1. **Siempre manejar errores** en callbacks (error-first pattern)
2. **Nombrar funciones** para evitar callback hell
3. **Usar setTimeout(fn, 0)** para defer execution
4. **Limitar setInterval** con un contador o condicion de salida
5. **No bloquear el hilo principal** con operaciones pesadas
6. **Usar Web Workers** para tareas computacionales intensivas
7. **Preferir Promises** sobre callbacks anidados
8. **Implementar timeout** en operaciones asincronas
9. **Usar debounce y throttle** para eventos de alta frecuencia
10. **Documentar que tipo de callback se espera** (error-first, success-only)

---

## Ejercicios

### Ejercicio 1: Temporizador con Callback (5 puntos)

Crear una funcion `temporizador(segundos, onTick, onComplete)` que cuente desde `segundos` hasta 0, llamando a `onTick` cada segundo y a `complete` cuando termine.

### Ejercicio 2: Simulador de Operaciones (5 puntos)

Crear una funcion `operacionSimulada(duracion, probabilidadExito, callback)` que simule una operacion asincrona. El callback debe recibir (error, resultado).

### Ejercicio 3: Cola de Tareas (5 puntos)

Implementar una `ColaTareas` con metodos `agregar(tarea, callback)` y `ejecutar()`. Las tareas deben ejecutarse en orden, una despues de otra.

### Ejercicio 4: Cache con Callbacks (5 puntos)

Crear una funcion `conCache(funcion, duracionCache)` que retorne una funcion con cache. La cache debe expirar despues de `duracionCache` milisegundos.

### Ejercicio 5: Pool de Conexiones (5 puntos)

Implementar un `PoolConexiones(maxConexiones)` con metodos `obtener(callback)` y `liberar(conexion)`. Debe encolar solicitudes si no hay conexiones disponibles.

### Ejercicio 6: Retry con Backoff (5 puntos)

Crear una funcion `retryConBackoff(funcion, maxIntentos, callback)` que reintente una funcion con backoff exponencial. Cada intento debe esperar el doble que el anterior.

---

## Soluciones

### Solucion Ejercicio 1: Temporizador

```javascript
function temporizador(segundos, onTick, onComplete) {
  let contador = segundos;

  const intervalo = setInterval(() => {
    onTick(contador);

    if (contador <= 0) {
      clearInterval(intervalo);
      onComplete(null, "Tiempo completado");
      return;
    }

    contador--;
  }, 1000);
}

// Uso
temporizador(
  5,
  (tiempo) => console.log(`Tiempo restante: ${tiempo}`),
  (error, mensaje) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(mensaje);
  }
);

// Salida:
// "Tiempo restante: 5"
// "Tiempo restante: 4"
// "Tiempo restante: 3"
// "Tiempo restante: 2"
// "Tiempo restante: 1"
// "Tiempo restante: 0"
// "Tiempo completado"
```

### Solucion Ejercicio 2: Simulador de Operaciones

```javascript
function operacionSimulada(duracion, probabilidadExito, callback) {
  const inicio = Date.now();

  setTimeout(() => {
    const exito = Math.random() < probabilidadExito;
    const duracionReal = Date.now() - inicio;

    if (exito) {
      callback(null, {
        exito: true,
        duracion: duracionReal,
        timestamp: new Date()
      });
    } else {
      const error = new Error("Operacion fallida");
      error.duracion = duracionReal;
      error.timestamp = new Date();
      callback(error);
    }
  }, duracion);
}

// Uso
operacionSimulada(1000, 0.7, (error, resultado) => {
  if (error) {
    console.error(`Error: ${error.message} (duracion: ${error.duracion}ms)`);
    return;
  }
  console.log(`Exito en ${resultado.duracion}ms`);
});
```

### Solucion Ejercicio 3: Cola de Tareas

```javascript
class ColaTareas {
  constructor() {
    this.tareas = [];
    this.ejecutando = false;
  }

  agregar(tarea, callback) {
    this.tareas.push({ tarea, callback });
    this.#ejecutarSiguiente();
  }

  #ejecutarSiguiente() {
    if (this.ejecutando || this.tareas.length === 0) {
      return;
    }

    this.ejecutando = true;
    const { tarea, callback } = this.tareas.shift();

    tarea((error, resultado) => {
      if (callback) {
        callback(error, resultado);
      }
      this.ejecutando = false;
      this.#ejecutarSiguiente();
    });
  }
}

// Uso
const cola = new ColaTareas();

function tarea1(callback) {
  console.log("Iniciando tarea 1");
  setTimeout(() => {
    console.log("Tarea 1 completada");
    callback(null, "Resultado 1");
  }, 1000);
}

function tarea2(callback) {
  console.log("Iniciando tarea 2");
  setTimeout(() => {
    console.log("Tarea 2 completada");
    callback(null, "Resultado 2");
  }, 500);
}

function tarea3(callback) {
  console.log("Iniciando tarea 3");
  setTimeout(() => {
    console.log("Tarea 3 completada");
    callback(null, "Resultado 3");
  }, 800);
}

cola.agregar(tarea1, (err, res) => console.log(res));
cola.agregar(tarea2, (err, res) => console.log(res));
cola.agregar(tarea3, (err, res) => console.log(res));

// Salida:
// "Iniciando tarea 1"
// "Tarea 1 completada"
// "Resultado 1"
// "Iniciando tarea 2"
// "Tarea 2 completada"
// "Resultado 2"
// "Iniciando tarea 3"
// "Tarea 3 completada"
// "Resultado 3"
```

### Solucion Ejercicio 4: Cache con Callbacks

```javascript
function conCache(funcion, duracionCache) {
  const cache = new Map();

  return function(...args) {
    const clave = JSON.stringify(args);
    const entrada = cache.get(clave);

    if (entrada && Date.now() - entrada.timestamp < duracionCache) {
      console.log("Usando cache");
      return entrada.valor;
    }

    console.log("Ejecutando funcion original");
    const resultado = funcion.apply(this, args);

    cache.set(clave, {
      valor: resultado,
      timestamp: Date.now()
    });

    return resultado;
  };
}

// Uso
function calcularCosto(precio, cantidad) {
  console.log("Calculando...");
  return precio * cantidad;
}

const calcularCostoConCache = conCache(calcularCosto, 5000);

console.log(calcularCostoConCache(10, 5)); // Calculando... 50
console.log(calcularCostoConCache(10, 5)); // Usando cache 50
console.log(calcularCostoConCache(20, 3)); // Calculando... 60
```

### Solucion Ejercicio 5: Pool de Conexiones

```javascript
class PoolConexiones {
  #conexiones;
  #cola;

  constructor(maxConexiones) {
    this.maxConexiones = maxConexiones;
    this.#conexiones = [];
    this.#cola = [];

    for (let i = 0; i < maxConexiones; i++) {
      this.#conexiones.push({
        id: i + 1,
        disponible: true
      });
    }
  }

  obtener(callback) {
    const conexion = this.#conexiones.find(c => c.disponible);

    if (conexion) {
      conexion.disponible = false;
      callback(null, conexion);
      return;
    }

    // No hay conexiones disponibles, encolar
    this.#cola.push(callback);
  }

  liberar(conexion) {
    conexion.disponible = true;

    if (this.#cola.length > 0) {
      const callback = this.#cola.shift();
      conexion.disponible = false;
      callback(null, conexion);
    }
  }

  get disponible() {
    return this.#conexiones.filter(c => c.disponible).length;
  }

  get ocupadas() {
    return this.#conexiones.filter(c => !c.disponible).length;
  }
}

// Uso
const pool = new PoolConexiones(2);

pool.obtener((err, conexion) => {
  console.log(`Conexion ${conexion.id} obtenida`);
  console.log(`Disponibles: ${pool.disponible}`);

  setTimeout(() => {
    pool.liberar(conexion);
    console.log(`Conexion ${conexion.id} liberada`);
    console.log(`Disponibles: ${pool.disponible}`);
  }, 2000);
});

pool.obtener((err, conexion) => {
  console.log(`Conexion ${conexion.id} obtenida`);
});

pool.obtener((err, conexion) => {
  console.log(`Conexion ${conexion.id} obtenida`);
});
```

### Solucion Ejercicio 6: Retry con Backoff

```javascript
function retryConBackoff(funcion, maxIntentos, callback) {
  let intentos = 0;

  function intentar() {
    intentos++;
    console.log(`Intento ${intentos} de ${maxIntentos}`);

    funcion((error, resultado) => {
      if (!error) {
        callback(null, { resultado, intentos });
        return;
      }

      if (intentos >= maxIntentos) {
        callback(new Error(`Fallo despues de ${maxIntentos} intentos`));
        return;
      }

      const delay = Math.pow(2, intentos) * 1000;
      console.log(`Reintentando en ${delay}ms...`);
      setTimeout(intentar, delay);
    });
  }

  intentar();
}

// Uso
function operacionRiesgosa(callback) {
  const exito = Math.random() > 0.7;
  setTimeout(() => {
    if (exito) {
      callback(null, { datos: "Exito" });
    } else {
      callback(new Error("Fallo"));
    }
  }, 500);
}

retryConBackoff(operacionRiesgosa, 5, (error, resultado) => {
  if (error) {
    console.error(error.message);
    return;
  }
  console.log(`Exito en ${resultado.intentos} intentos`);
});
```
