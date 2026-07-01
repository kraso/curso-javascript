# Leccion 3: Promesas

## Objetivos de aprendizaje

- [ ] Comprender el concepto de Promesa y sus estados
- [ ] Crear promesas con new Promise
- [ ] Manejar resultados con .then()
- [ ] Manejar errores con .catch()
- [ ] Limpiar recursos con .finally()
- [ ] Encadenar multiples promesas
- [ ] Manejar errores en cadenas de promesas
- [ ] Usar Promise.all(), Promise.allSettled(), Promise.race(), Promise.any()
- [ ] Aplicar patrones comunes y anti-patrones
- [ ] Resolver problemas practicos con promesas

---

## 1. Concepto de Promesa

Una Promesa es un objeto que representa el resultado eventual de una operacion asincrona. Puede estar en tres estados: pending, fulfilled o rejected.

### 1.1 Estados de una Promesa

```javascript
// Pending: estado inicial, operacion en progreso
// Fulfilled: operacion completada exitosamente
// Rejected: operacion fallo

const miPromesa = new Promise((resolve, reject) => {
  // Simular operacion asincrona
  setTimeout(() => {
    const exito = true;
    if (exito) {
      resolve("Operacion completada"); // Fulfilled
    } else {
      reject(new Error("Algo salio mal")); // Rejected
    }
  }, 1000);
});

console.log(miPromesa); // Promise { <pending>: undefined }
```

### 1.2 Crear Promesas

```javascript
function promesaBasica() {
  return new Promise((resolve, reject) => {
    resolve("Exito");
  });
}

function promesaConError() {
  return new Promise((resolve, reject) => {
    reject(new Error("Fallo intencional"));
  });
}

function promesaConRetardo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Resultado despues de 2 segundos");
    }, 2000);
  });
}

// Uso
promesaBasica().then(resultado => console.log(resultado)); // "Exito"
promesaConError().catch(error => console.error(error.message)); // "Fallo intencional"
promesaConRetardo().then(resultado => console.log(resultado)); // despues de 2s
```

---

## 2. Manejo de Promesas

### 2.1 then() para Resultados

```javascript
function obtenerUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("ID invalido"));
        return;
      }

      const usuario = {
        id,
        nombre: "Juan Perez",
        email: "juan@email.com"
      };
      resolve(usuario);
    }, 1000);
  });
}

// Uso con then
obtenerUsuario(1)
  .then(usuario => {
    console.log(`Usuario: ${usuario.nombre}`);
    return usuario.email;
  })
  .then(email => {
    console.log(`Email: ${email}`);
  });
// "Usuario: Juan Perez"
// "Email: juan@email.com"
```

### 2.2 catch() para Errores

```javascript
function dividir(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject(new Error("Division por cero"));
      return;
    }
    resolve(a / b);
  });
}

// Uso con catch
dividir(10, 2)
  .then(resultado => console.log(`Resultado: ${resultado}`)) // 5
  .catch(error => console.error(`Error: ${error.message}`));

dividir(10, 0)
  .then(resultado => console.log(`Resultado: ${resultado}`))
  .catch(error => console.error(`Error: ${error.message}`));
// "Error: Division por cero"
```

### 2.3 finally() para Limpieza

```javascript
function cargarDatos(url) {
  console.log("Iniciando carga...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ datos: "Datos cargados", url });
      } else {
        reject(new Error("URL no proporcionada"));
      }
    }, 1500);
  });
}

// Uso con finally
cargarDatos("https://api.example.com")
  .then(datos => console.log("Exito:", datos))
  .catch(error => console.error("Error:", error.message))
  .finally(() => {
    console.log("Operacion completada (exito o error)");
    // Limpiar spinner, deshabilitar botones, etc.
  });
// "Iniciando carga..."
// "Exito: { datos: 'Datos cargados', url: 'https://api.example.com' }"
// "Operacion completada (exito o error)"
```

---

## 3. Encadenamiento de Promesas

### 3.1 Encadenamiento Basico

```javascript
function paso1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Paso 1 completado");
      resolve("resultado-paso-1");
    }, 1000);
  });
}

function paso2(dato) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Paso 2 completado con: ${dato}`);
      resolve("resultado-paso-2");
    }, 1000);
  });
}

function paso3(dato) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Paso 3 completado con: ${dato}`);
      resolve("resultado-final");
    }, 1000);
  });
}

// Encadenar pasos
paso1()
  .then(paso2)
  .then(paso3)
  .then(resultadoFinal => {
    console.log(`Resultado final: ${resultadoFinal}`);
  })
  .catch(error => {
    console.error(`Error en cualquier paso: ${error.message}`);
  });

// Salida:
// "Paso 1 completado" (despues de 1s)
// "Paso 2 completado con: resultado-paso-1" (despues de 2s)
// "Paso 3 completado con: resultado-paso-2" (despues de 3s)
// "Resultado final: resultado-final"
```

### 3.2 Encadenamiento con Transformaciones

```javascript
function fetchUsuario(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, nombre: "Juan", rol: "admin" });
    }, 500);
  });
}

function fetchPermisos(usuario) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        usuario: usuario.nombre,
        permisos: ["leer", "escribir", "admin"]
      });
    }, 500);
  });
}

function validarPermisos(permisos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (permisos.permisos.includes("admin")) {
        resolve({ valido: true, permisos: permisos.permisos });
      } else {
        reject(new Error("Permisos insuficientes"));
      }
    }, 500);
  });
}

// Encadenamiento completo
fetchUsuario(1)
  .then(usuario => {
    console.log(`Usuario: ${usuario.nombre}`);
    return fetchPermisos(usuario);
  })
  .then(permisos => {
    console.log(`Permisos: ${permisos.permisos.join(", ")}`);
    return validarPermisos(permisos);
  })
  .then(validacion => {
    console.log(`Valido: ${validacion.valido}`);
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });
// "Usuario: Juan" (500ms)
// "Permisos: leer, escribir, admin" (1000ms)
// "Valido: true" (1500ms)
```

### 3.3 Manejo de Errores en Cadenas

```javascript
function operacion1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("op1-exitosa"), 500);
  });
}

function operacion2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("op2-fallo")), 500);
  });
}

function operacion3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("op3-exitosa"), 500);
  });
}

// Error capturado por el primer catch
operacion1()
  .then(resultado => {
    console.log(resultado); // "op1-exitosa"
    return operacion2();
  })
  .then(resultado => {
    // Esta linea no se ejecuta porque operacion2 fallo
    console.log(resultado);
    return operacion3();
  })
  .then(resultado => {
    console.log(resultado);
  })
  .catch(error => {
    console.error(`Error capturado: ${error.message}`); // "op2-fallo"
  })
  .finally(() => {
    console.log("Cadena completada");
  });
```

---

## 4. Metodos Estaticos de Promise

### 4.1 Promise.all()

Promise.all() resuelve cuando TODAS las promesas se resuelven. Rechaza si ALGUNA falla.

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

function tarea3() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Tarea 3"), 1500);
  });
}

// Todas las promesas en paralelo
Promise.all([tarea1(), tarea2(), tarea3()])
  .then(resultados => {
    console.log("Todas completadas:", resultados);
    // ["Tarea 1", "Tarea 2", "Tarea 3"]
  })
  .catch(error => {
    console.error("Una fallo:", error.message);
  });

// Tiempo total: ~1.5s (el mas largo)
```

### 4.2 Promise.allSettled()

Promise.allSettled() resuelve cuando TODAS las promesas terminan (exito o error).

```javascript
function operacionExitosa() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ exito: true, datos: "OK" }), 500);
  });
}

function operacionFallida() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Fallo")), 500);
  });
}

Promise.allSettled([
  operacionExitosa(),
  operacionFallida(),
  operacionExitosa()
])
  .then(resultados => {
    resultados.forEach((resultado, index) => {
      if (resultado.status === "fulfilled") {
        console.log(`Promesa ${index + 1}: Exito -`, resultado.value);
      } else {
        console.log(`Promesa ${index + 1}: Error -`, resultado.reason.message);
      }
    });
  });

// Salida:
// "Promesa 1: Exito - { exito: true, datos: 'OK' }"
// "Promesa 2: Error - Fallo"
// "Promesa 3: Exito - { exito: true, datos: 'OK' }"
```

### 4.3 Promise.race()

Promise.race() resuelve con el primer resultado (exito o error).

```javascript
function rapida() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Rapida"), 500);
  });
}

function lenta() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Lenta"), 2000);
  });
}

function errorRapido() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Error rapido")), 300);
  });
}

// Race gana la primera en completar
Promise.race([rapida(), lenta()])
  .then(resultado => {
    console.log(`Ganador: ${resultado}`); // "Ganador: Rapida"
  });

// Si hay error, lo captura
Promise.race([errorRapido(), rapida()])
  .then(resultado => {
    console.log(resultado);
  })
  .catch(error => {
    console.error(`Perdedor: ${error.message}`); // "Perdedor: Error rapido"
  });
```

### 4.4 Promise.any()

Promise.any() resuelve con el primer exito. Rechaza si TODAS fallan.

```javascript
function fuente1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Fuente 1 fallo")), 1000);
  });
}

function fuente2() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Fuente 2 exitosa"), 500);
  });
}

function fuente3() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Fuente 3 exitosa"), 1500);
  });
}

// Any resuelve con el primer exito
Promise.any([fuente1(), fuente2(), fuente3()])
  .then(resultado => {
    console.log(`Primer exito: ${resultado}`); // "Primer exito: Fuente 2 exitosa"
  })
  .catch(error => {
    // Solo llega aqui si TODAS fallan
    console.error(`Todas fallaron: ${error.message}`);
  });
```

### 4.5 Comparacion de Metodos

```javascript
const promesas = [
  new Promise(resolve => setTimeout(() => resolve(1), 1000)),
  new Promise(resolve => setTimeout(() => resolve(2), 500)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Fallo")), 800))
];

// Promise.all: Rechaza si una falla
Promise.all(promesas)
  .then(resultados => console.log("all:", resultados))
  .catch(error => console.log("all - Error:", error.message));
// all - Error: Fallo

// Promise.allSettled: Siempre resuelve
Promise.allSettled(promesas)
  .then(resultados => {
    const exitosos = resultados.filter(r => r.status === "fulfilled");
    console.log("allSettled - Exitosos:", exitosos.length); // 2
  });

// Promise.race: Primer resultado (exito o error)
Promise.race(promesas)
  .then(resultado => console.log("race:", resultado))
  .catch(error => console.log("race - Error:", error.message));

// Promise.any: Primer exito
Promise.any(promesas)
  .then(resultado => console.log("any:", resultado))
  .catch(error => console.log("any - Error:", error.message));
```

---

## 5. Patrones Comunes con Promesas

### 5.1 Promesa con Timeout

```javascript
function conTimeout(promesa, milisegundos) {
  return new Promise((resolve, reject) => {
    const temporizador = setTimeout(() => {
      reject(new Error(`Timeout despues de ${milisegundos}ms`));
    }, milisegundos);

    promesa
      .then(resultado => {
        clearTimeout(temporizador);
        resolve(resultado);
      })
      .catch(error => {
        clearTimeout(temporizador);
        reject(error);
      });
  });
}

// Uso
function tareaLenta() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Completado"), 3000);
  });
}

conTimeout(tareaLenta(), 2000)
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error.message)); // "Timeout despues de 2000ms"
```

### 5.2 Promesa con Reintentos

```javascript
function conReintentos(funcion, maxReintentos, delay = 1000) {
  return new Promise((resolve, reject) => {
    let intentos = 0;

    function intentar() {
      intentos++;

      funcion()
        .then(resolve)
        .catch(error => {
          if (intentos >= maxReintentos) {
            reject(error);
            return;
          }

          console.log(`Reintento ${intentos}/${maxReintentos}...`);
          setTimeout(intentar, delay * intentos);
        });
    }

    intentar();
  });
}

// Uso
function operacionRiesgosa() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.7) {
      resolve("Exito");
    } else {
      reject(new Error("Fallo"));
    }
  });
}

conReintentos(operacionRiesgosa, 3)
  .then(resultado => console.log(resultado))
  .catch(error => console.error("Fallo definitivo:", error.message));
```

### 5.3 Promesa con Cancelacion

```javascript
function conCancelacion(promesaFn) {
  let cancelado = false;
  let rejectFn = null;

  const promesa = new Promise((resolve, reject) => {
    rejectFn = reject;
    promesaFn(resolve, reject);
  });

  return {
    promesa: promesa.catch(error => {
      if (cancelado) {
        throw new Error("Operacion cancelada");
      }
      throw error;
    }),
    cancelar() {
      cancelado = true;
      if (rejectFn) {
        rejectFn(new Error("Operacion cancelada"));
      }
    }
  };
}

// Uso
const { promesa, cancelar } = conCancelacion((resolve) => {
  setTimeout(() => resolve("Completado"), 5000);
});

promesa
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error.message));

// Cancelar despues de 1 segundo
setTimeout(cancelar, 1000);
// "Operacion cancelada"
```

### 5.4 Promesa con Progreso

```javascript
function conProgreso(totalPasos, callbackProgreso) {
  return new Promise((resolve, reject) => {
    let pasoActual = 0;

    function siguientePaso() {
      pasoActual++;
      const progreso = (pasoActual / totalPasos) * 100;

      callbackProgreso({
        paso: pasoActual,
        total: totalPasos,
        porcentaje: progreso
      });

      if (pasoActual >= totalPasos) {
        resolve({ completado: true, pasos: totalPasos });
        return;
      }

      setTimeout(siguientePaso, 500);
    }

    siguientePaso();
  });
}

// Uso
conProgreso(5, (progreso) => {
  console.log(`Paso ${progreso.paso}/${progreso.total}: ${progreso.porcentaje}%`);
}).then(resultado => {
  console.log("Completado:", resultado);
});
// Paso 1/5: 20%
// Paso 2/5: 40%
// Paso 3/5: 60%
// Paso 4/5: 80%
// Paso 5/5: 100%
// Completado: { completado: true, pasos: 5 }
```

---

## 6. Ejemplos Practicos

### 6.1 Fetch con Promesas

```javascript
function fetchJSON(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    });
}

// Uso
fetchJSON("https://jsonplaceholder.typicode.com/posts/1")
  .then(post => {
    console.log(`Titulo: ${post.title}`);
    console.log(`Cuerpo: ${post.body}`);
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });
```

### 6.2 Carga Secuencial

```javascript
function cargarSecuencial(urls) {
  return urls.reduce((promesa, url) => {
    return promesa.then(resultados => {
      return fetchJSON(url).then(dato => {
        resultados.push(dato);
        return resultados;
      });
    });
  }, Promise.resolve([]));
}

// Uso
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3"
];

cargarSecuencial(urls)
  .then(resultados => {
    console.log(`Cargados: ${resultados.length} posts`);
    resultados.forEach((post, i) => {
      console.log(`${i + 1}. ${post.title}`);
    });
  })
  .catch(error => console.error(error.message));
```

### 6.3 Carga Paralela con Limite

```javascript
function cargarParaleloConLimite(urls, limite) {
  const resultados = new Array(urls.length);
  let indiceActual = 0;

  function cargarSiguiente() {
    if (indiceActual >= urls.length) {
      return Promise.resolve();
    }

    const indice = indiceActual++;
    const url = urls[indice];

    return fetchJSON(url)
      .then(dato => {
        resultados[indice] = dato;
        return cargarSiguiente();
      });
  }

  const tareas = [];
  for (let i = 0; i < Math.min(limite, urls.length); i++) {
    tareas.push(cargarSiguiente());
  }

  return Promise.all(tareas).then(() => resultados);
}

// Uso
const urlsLargas = Array.from({ length: 10 }, (_, i) =>
  `https://jsonplaceholder.typicode.com/posts/${i + 1}`
);

cargarParaleloConLimite(urlsLargas, 3)
  .then(resultados => {
    console.log(`Cargados: ${resultados.length} posts`);
  })
  .catch(error => console.error(error.message));
```

---

## Buenas practicas

1. **Siempre retorna en .then()** para encadenar correctamente
2. **Usa .catch() al final** de cadenas para capturar errores
3. **No mezcles** callbacks y promesas
4. **Usa Promise.all()** para operaciones paralelas
5. **Usa Promise.allSettled()** cuando no quieras que un error detenga todo
6. **Implementa timeout** para operaciones que puedan colgarse
7. **Evita crear promesas innecesarias** dentro de .then()
8. **Usa .finally()** para limpieza (cerrar conexiones, etc.)
9. **Prefiere async/await** sobre .then() para codigo mas legible
10. **No ignores errores** siempre usa .catch()

---

## Ejercicios

### Ejercicio 1: Encadenamiento de Promesas (5 puntos)

Crear una funcion `procesarDatos(datos)` que encadene 3 pasos: validar, transformar y guardar. Cada paso retorna una promesa con delay de 500ms.

### Ejercicio 2: Race Condition (5 puntos)

Crear una funcion `cargaConTimeout(urls, timeout)` que cargue multiples URLs en paralelo y rechace si alguna tarda mas que el timeout.

### Ejercicio 3: Pool de Promesas (5 puntos)

Implementar un `PoolPromesas(maxConcurrentes)` que ejecute un array de funciones asincronas con limite de concurrencia.

### Ejercicio 4: Promesa con Progreso (5 puntos)

Crear una funcion `descargar(archivos, callbackProgreso)` que simule descargar archivos y reporte progreso. Usar Promise.all para paralelismo.

### Ejercicio 5: Cache de Promesas (5 puntos)

Implementar un `CachePromesas()` con metodos `fetch(clave, promesaFn)` y `invalidar(clave)`. La cache debe durar 60 segundos.

### Ejercicio 6: Debounce con Promesas (5 puntos)

Crear una funcion `debounceAsync(funcion, delay)` que retorne una funcion que, cuando se llame multiple veces, solo ejecute la ultima despues de `delay` ms.

---

## Soluciones

### Solucion Ejercicio 1: Encadenamiento

```javascript
function validar(datos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!datos || datos.length === 0) {
        reject(new Error("Datos invalidos"));
        return;
      }
      console.log("Datos validados");
      resolve(datos);
    }, 500);
  });
}

function transformar(datos) {
  return new Promise(resolve => {
    setTimeout(() => {
      const transformados = datos.map(d => ({
        ...d,
        transformado: true,
        timestamp: Date.now()
      }));
      console.log("Datos transformados");
      resolve(transformados);
    }, 500);
  });
}

function guardar(datos) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Guardados ${datos.length} registros`);
      resolve({ exito: true, registros: datos.length });
    }, 500);
  });
}

function procesarDatos(datos) {
  return validar(datos)
    .then(validados => transformar(validados))
    .then(transformados => guardar(transformados));
}

// Uso
const datos = [
  { id: 1, nombre: "Item 1" },
  { id: 2, nombre: "Item 2" }
];

procesarDatos(datos)
  .then(resultado => console.log("Exito:", resultado))
  .catch(error => console.error("Error:", error.message));
// "Datos validados" (500ms)
// "Datos transformados" (1000ms)
// "Guardados 2 registros" (1500ms)
// "Exito: { exito: true, registros: 2 }"
```

### Solucion Ejercicio 2: Race Condition

```javascript
function fetchJSON(url) {
  return fetch(url).then(r => r.json());
}

function conTimeout(promesa, milisegundos) {
  return Promise.race([
    promesa,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Timeout ${milisegundos}ms`)), milisegundos);
    })
  ]);
}

function cargaConTimeout(urls, timeout) {
  const promesas = urls.map(url =>
    conTimeout(fetchJSON(url), timeout)
  );

  return Promise.all(promesas);
}

// Uso
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2"
];

cargaConTimeout(urls, 5000)
  .then(resultados => {
    console.log(`Cargados: ${resultados.length} posts`);
  })
  .catch(error => {
    console.error(error.message);
  });
```

### Solucion Ejercicio 3: Pool de Promesas

```javascript
class PoolPromesas {
  constructor(maxConcurrentes) {
    this.maxConcurrentes = maxConcurrentes;
    this.cola = [];
    this.ejecutando = 0;
  }

  ejecutar(funcion) {
    return new Promise((resolve, reject) => {
      this.cola.push({ funcion, resolve, reject });
      this.#procesarCola();
    });
  }

  #procesarCola() {
    while (this.ejecutando < this.maxConcurrentes && this.cola.length > 0) {
      const { funcion, resolve, reject } = this.cola.shift();
      this.ejecutando++;

      funcion()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.ejecutando--;
          this.#procesarCola();
        });
    }
  }
}

// Uso
const pool = new PoolPromesas(2);

function tarea(id, duracion) {
  return () => new Promise(resolve => {
    console.log(`Tarea ${id} iniciada`);
    setTimeout(() => {
      console.log(`Tarea ${id} completada`);
      resolve(id);
    }, duracion);
  });
}

// Ejecutar 5 tareas con maximo 2 simultaneas
const tareas = [
  pool.ejecutar(tarea(1, 1000)),
  pool.ejecutar(tarea(2, 500)),
  pool.ejecutar(tarea(3, 800)),
  pool.ejecutar(tarea(4, 600)),
  pool.ejecutar(tarea(5, 400))
];

Promise.all(tareas).then(resultados => {
  console.log("Resultados:", resultados);
});
```

### Solucion Ejercicio 4: Promesa con Progreso

```javascript
function descargar(archivos, callbackProgreso) {
  let completados = 0;
  const total = archivos.length;

  function reportarProgreso() {
    completados++;
    callbackProgreso({
      completados,
      total,
      porcentaje: (completados / total) * 100
    });
  }

  const promesas = archivos.map(archivo => {
    return new Promise(resolve => {
      const duracion = Math.random() * 2000 + 500;
      setTimeout(() => {
        reportarProgreso();
        resolve({ archivo, tamano: Math.floor(Math.random() * 1000) });
      }, duracion);
    });
  });

  return Promise.all(promesas);
}

// Uso
const archivos = ["file1.txt", "file2.txt", "file3.txt", "file4.txt", "file5.txt"];

descargar(archivos, (progreso) => {
  console.log(`Progreso: ${progreso.porcentaje.toFixed(0)}% (${progreso.completados}/${progreso.total})`);
}).then(resultados => {
  console.log("Descarga completada:", resultados);
});
// Progreso: 20% (1/5)
// Progreso: 40% (2/5)
// Progreso: 60% (3/5)
// Progreso: 80% (4/5)
// Progreso: 100% (5/5)
// Descarga completada: [...]
```

### Solucion Ejercicio 5: Cache de Promesas

```javascript
class CachePromesas {
  #cache;

  constructor() {
    this.#cache = new Map();
  }

  fetch(clave, promesaFn) {
    const entrada = this.#cache.get(clave);

    if (entrada && Date.now() - entrada.timestamp < 60000) {
      console.log(`Cache hit: ${clave}`);
      return Promise.resolve(entrada.valor);
    }

    console.log(`Cache miss: ${clave}`);
    return promesaFn().then(valor => {
      this.#cache.set(clave, {
        valor,
        timestamp: Date.now()
      });
      return valor;
    });
  }

  invalidar(clave) {
    this.#cache.delete(clave);
  }

  limpiar() {
    this.#cache.clear();
  }

  get tamano() {
    return this.#cache.size;
  }
}

// Uso
const cache = new CachePromesas();

function obtenerDatos() {
  return new Promise(resolve => {
    console.log("Obteniendo datos del servidor...");
    setTimeout(() => resolve({ datos: [1, 2, 3] }), 1000);
  });
}

// Primera llamada: cache miss
cache.fetch("datos", obtenerDatos).then(d => console.log(d));

// Segunda llamada: cache hit
setTimeout(() => {
  cache.fetch("datos", obtenerDatos).then(d => console.log(d));
}, 2000);
```

### Solucion Ejercicio 6: Debounce con Promesas

```javascript
function debounceAsync(funcion, delay) {
  let temporizador = null;
  let ultimaResolve = null;

  return function(...args) {
    return new Promise((resolve) => {
      if (temporizador) {
        clearTimeout(temporizador);
      }

      ultimaResolve = resolve;

      temporizador = setTimeout(() => {
        funcion.apply(this, args)
          .then(ultimaResolve);
      }, delay);
    });
  };
}

// Uso
function buscarEnServidor(termino) {
  return new Promise(resolve => {
    console.log(`Buscando: ${termino}`);
    setTimeout(() => resolve({ resultados: [`Resultado para ${termino}`] }), 500);
  });
}

const buscarDebounced = debounceAsync(buscarEnServidor, 300);

// Solo la ultima ejecucion se procesa
buscarDebounced("a");
buscarDebounced("ap");
buscarDebounced("apple").then(r => console.log(r));
// Despues de 300ms:
// "Buscando: apple"
// { resultados: ["Resultado para apple"] }
```
