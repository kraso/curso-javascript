# Lección 4: Closures y Alcance

## Objetivos de aprendizaje

- [ ] Comprender el alcance léxico y cómo se resuelve el alcance en JavaScript
- [ ] Entender qué son los closures y cómo funcionan internamente
- [ ] Aplicar closures para crear patrones de diseño como el Module Pattern
- [ ] Implementar funciones de fábrica y fábricas de funciones
- [ ] Usar closures para privacidad de datos y datos persistentes
- [ ] Identificar y evitar problemas comunes con closures (como el loop de var)

---

## 1. Alcance Léxico (Lexical Scope)

En JavaScript, el alcance de una variable se determina por dónde está declarada, no por dónde se ejecuta.

```javascript
// Alcance global
var globalVar = "Soy global";

function funcionExterior() {
    // Alcance de función
    var exteriorVar = "Soy de la función exterior";
    
    function funcionInterior() {
        // Alcance anidado
        var interiorVar = "Soy de la función interior";
        
        console.log(globalVar);     // Acceso al alcance global
        console.log(exteriorVar);   // Acceso al alcance exterior
        console.log(interiorVar);   // Acceso al alcance propio
    }
    
    funcionInterior();
    // console.log(interiorVar); // Error: interiorVar no está definida
}

funcionExterior();
```

### Reglas de resolución de alcance

```javascript
const x = "global";

function exterior() {
    const x = "exterior";
    
    function interior() {
        const x = "interior";
        console.log(x); // "interior" (más cercano)
    }
    
    interior();
}

exterior();

// Ejemplo con variables no declaradas
function ejemplo() {
    // console.log(noExiste); // ReferenceError
    
    // Esto crea una variable global (mala práctica)
    noExiste = "soy global implícita";
}

// Usando var vs let vs const
function compararAlcance() {
    if (true) {
        var varVariable = "var se escapa del bloque";
        let letVariable = "let se queda en el bloque";
        const constVariable = "const se queda en el bloque";
    }
    
    console.log(varVariable);    // "var se escapa del bloque"
    // console.log(letVariable);    // ReferenceError
    // console.log(constVariable);  // ReferenceError
}
```

### Cadenas de alcance

```javascript
const nivel1 = "nivel 1";

function funcion1() {
    const nivel2 = "nivel 2";
    
    function funcion2() {
        const nivel3 = "nivel 3";
        
        function funcion3() {
            const nivel4 = "nivel 4";
            
            // JavaScript busca hacia arriba en la cadena de alcance
            console.log(nivel1); // nivel 1
            console.log(nivel2); // nivel 2
            console.log(nivel3); // nivel 3
            console.log(nivel4); // nivel 4
        }
        
        funcion3();
    }
    
    funcion2();
}

funcion1();

// Shadowing (sombreado)
const variable = "global";

function ejemplo() {
    const variable = "local"; // Sombrea la variable global
    console.log(variable);    // "local"
    
    function interior() {
        console.log(variable); // "local" (hereda del padre)
    }
    
    interior();
}

ejemplo();
console.log(variable); // "global"
```

---

## 2. Closures: Definición y Cómo Funcionan

Un closure es cuando una función "recuerda" el alcance en el que fue creada, incluso después de que ese alcance haya terminado de ejecutarse.

```javascript
// Ejemplo básico de closure
function crearSaludo(saludo) {
    // 'saludo' es una variable del alcance de crearSaludo
    
    return function(nombre) {
        // Esta función cierra sobre 'saludo'
        return `${saludo}, ${nombre}!`;
    };
}

const saludarHola = crearSaludo("Hola");
const saludarAdios = crearSaludo("Adiós");

console.log(saludarHola("Ana"));    // "Hola, Ana!"
console.log(saludarAdios("Carlos")); // "Adiós, Carlos"

// La función retornada "recuerda" el valor de 'saludo'
// aunque crearSaludo ya terminó de ejecutarse
```

### Cómo funciona internamente

```javascript
function exterior(variableExterior) {
    let contador = 0;
    
    function interior() {
        contador++;
        console.log(`Contador: ${contador}, Variable: ${variableExterior}`);
    }
    
    return interior;
}

const miClosure = exterior("datos externos");

// Cuando se llama a miClosure:
// 1. JavaScript busca 'contador' en el scope local (no lo encuentra)
// 2. Busca en el scope de 'exterior' (lo encuentra)
// 3. Usa ese valor
miClosure(); // Contador: 1, Variable: datos externos
miClosure(); // Contador: 2, Variable: datos externos
miClosure(); // Contador: 3, Variable: datos externos

// El closure mantiene referencia a las variables de 'exterior'
// incluso después de que 'exterior' terminó de ejecutarse
```

### Closures con bucles (problema clásico)

```javascript
// PROBLEMA con var
function crearContadoresProblematico() {
    const contadores = [];
    
    for (var i = 0; i < 5; i++) {
        contadores.push(function() {
            console.log(i); // Todas referencian la misma 'i'
        });
    }
    
    return contadores;
}

const contadoresProblematicos = crearContadoresProblematico();
contadoresProblematicos[0](); // 5
contadoresProblematicos[1](); // 5
contadoresProblematicos[2](); // 5
// Todas imprimen 5 porque comparten la misma variable 'i'

// SOLUCIÓN 1: Usar let
function crearContadoresCorrecto() {
    const contadores = [];
    
    for (let i = 0; i < 5; i++) {
        contadores.push(function() {
            console.log(i); // Cada closure tiene su propia 'i'
        });
    }
    
    return contadores;
}

const contadoresCorrectos = crearContadoresCorrecto();
contadoresCorrectos[0](); // 0
contadoresCorrectos[1](); // 1
contadoresCorrectos[2](); // 2

// SOLUCIÓN 2: Usar IIFE
function crearContadoresIIFE() {
    const contadores = [];
    
    for (var i = 0; i < 5; i++) {
        contadores.push((function(valor) {
            return function() {
                console.log(valor); // Cada IIFE captura su propio valor
            };
        })(i));
    }
    
    return contadores;
}

const contadoresIIFE = crearContadoresIIFE();
contadoresIIFE[0](); // 0
contadoresIIFE[1](); // 1

// SOLUCIÓN 3: Usar bind
function crearContadoresBind() {
    const contadores = [];
    
    for (var i = 0; i < 5; i++) {
        contadores.push(function(valor) {
            console.log(valor);
        }.bind(null, i));
    }
    
    return contadores;
}
```

---

## 3. Patrones de Closures

### Module Pattern

El Module Pattern usa closures para crear privacidad y encapsulamiento.

```javascript
const Modulo = (function() {
    // Variables privadas
    let contador = 0;
    const datos = [];
    
    // Funciones privadas
    function validarDato(dato) {
        return dato !== null && dato !== undefined;
    }
    
    function formatearFecha(fecha) {
        return fecha.toISOString().split('T')[0];
    }
    
    // Interfaz pública
    return {
        incrementar() {
            contador++;
            return this;
        },
        
        obtenerContador() {
            return contador;
        },
        
        agregarDato(dato) {
            if (validarDato(dato)) {
                datos.push({
                    valor: dato,
                    fecha: formatearFecha(new Date())
                });
                return true;
            }
            return false;
        },
        
        obtenerDatos() {
            return [...datos]; // Copia para evitar mutación externa
        },
        
        limpiar() {
            contador = 0;
            datos.length = 0;
            return this;
        }
    };
})();

// Uso
Modulo.incrementar().incrementar();
console.log(Modulo.obtenerContador()); // 2

Modulo.agregarDato("primer dato");
console.log(Modulo.obtenerDatos());
// [{ valor: "primer dato", fecha: "2024-..." }]

// No se puede acceder directamente a las variables privadas
// console.log(contador); // ReferenceError
// console.log(datos);    // ReferenceError
```

### Module Pattern con configuración

```javascript
const ConfigManager = (function() {
    // Configuración por defecto
    const defaults = {
        apiUrl: "https://api.ejemplo.com",
        timeout: 5000,
        reintentos: 3,
        debug: false
    };
    
    // Configuración actual
    let config = { ...defaults };
    
    // Historial de cambios
    const historial = [];
    
    function registrarCambio(clave, valorAnterior, valorNuevo) {
        historial.push({
            timestamp: new Date(),
            clave,
            valorAnterior,
            valorNuevo
        });
    }
    
    function validarConfiguracion(clave, valor) {
        if (clave === "timeout" && (typeof valor !== "number" || valor < 0)) {
            throw new Error("Timeout debe ser un número positivo");
        }
        if (clave === "reintentos" && (!Number.isInteger(valor) || valor < 0)) {
            throw new Error("Reintentos debe ser un entero no negativo");
        }
        return true;
    }
    
    return {
        obtener(clave) {
            return config[clave];
        },
        
        obtenerTodas() {
            return { ...config };
        },
        
        actualizar(clave, valor) {
            if (config.hasOwnProperty(clave)) {
                validarConfiguracion(clave, valor);
                const anterior = config[clave];
                config[clave] = valor;
                registrarCambio(clave, anterior, valor);
                return true;
            }
            throw new Error(`Clave "${clave}" no existe en la configuración`);
        },
        
        restaurar() {
            const configAnterior = { ...config };
            config = { ...defaults };
            registrarCambio("restaurar", configAnterior, defaults);
            return this;
        },
        
        obtenerHistorial() {
            return [...historial];
        }
    };
})();

// Uso
ConfigManager.actualizar("timeout", 10000);
console.log(ConfigManager.obtener("timeout")); // 10000
console.log(ConfigManager.obtenerHistorial());
```

### Factory Function con Closures

```javascript
function crearContador(inicio = 0, paso = 1) {
    let valor = inicio;
    const historial = [];
    
    function registrar(accion, nuevoValor) {
        historial.push({
            accion,
            valor: nuevoValor,
            timestamp: Date.now()
        });
    }
    
    return {
        incrementar() {
            valor += paso;
            registrar("incrementar", valor);
            return valor;
        },
        
        decrementar() {
            valor -= paso;
            registrar("decrementar", valor);
            return valor;
        },
        
        obtener() {
            return valor;
        },
        
        reiniciar() {
            valor = inicio;
            registrar("reiniciar", valor);
            return valor;
        },
        
        obtenerHistorial() {
            return [...historial];
        }
    };
}

// Crear contadores independientes
const contador1 = crearContador(0, 1);
const contador2 = crearContador(100, 5);

console.log(contador1.incrementar()); // 1
console.log(contador1.incrementar()); // 2
console.log(contador2.incrementar()); // 105
console.log(contador2.incrementar()); // 110

// Cada contador mantiene su propio estado
console.log(contador1.obtener()); // 2
console.log(contador2.obtener()); // 110
```

### Function Factory

```javascript
function crearValidador(reglas) {
    return function(valor) {
        const errores = [];
        
        for (const regla of reglas) {
            const error = regla(valor);
            if (error) {
                errores.push(error);
            }
        }
        
        return {
            valido: errores.length === 0,
            errores
        };
    };
}

// Crear validadores específicos
const validarEmail = crearValidador([
    (v) => !v && "El email es requerido",
    (v) => v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && "Email inválido"
]);

const validarPassword = crearValidador([
    (v) => !v && "La contraseña es requerida",
    (v) => v && v.length < 8 && "Mínimo 8 caracteres",
    (v) => v && !/[A-Z]/.test(v) && "Debe contener al menos una mayúscula",
    (v) => v && !/[0-9]/.test(v) && "Debe contener al menos un número"
]);

console.log(validarEmail(""));
// { valido: false, errores: ["El email es requerido"] }

console.log(validarEmail("ana@ejemplo.com"));
// { valido: true, errores: [] }

console.log(validarPassword("abc"));
// { valido: false, errores: ["Mínimo 8 caracteres", ...] }

console.log(validarPassword("Abcd1234"));
// { valido: true, errores: [] }
```

---

## 4. Casos de Uso Prácticos

### Privacidad de Datos

```javascript
function crearCuenta(saldoInicial) {
    let saldo = saldoInicial;
    const movimientos = [];
    
    function registrarMovimiento(tipo, monto) {
        movimientos.push({
            tipo,
            monto,
            saldo: saldo,
            fecha: new Date()
        });
    }
    
    return {
        depositar(monto) {
            if (monto <= 0) {
                throw new Error("El monto debe ser positivo");
            }
            saldo += monto;
            registrarMovimiento("depósito", monto);
            return saldo;
        },
        
        retirar(monto) {
            if (monto <= 0) {
                throw new Error("El monto debe ser positivo");
            }
            if (monto > saldo) {
                throw new Error("Saldo insuficiente");
            }
            saldo -= monto;
            registrarMovimiento("retiro", monto);
            return saldo;
        },
        
        consultarSaldo() {
            return saldo;
        },
        
        consultarMovimientos() {
            return movimientos.map(m => ({ ...m }));
        }
    };
}

const miCuenta = crearCuenta(1000);
console.log(miCuenta.consultarSaldo()); // 1000

miCuenta.depositar(500);
console.log(miCuenta.consultarSaldo()); // 1500

miCuenta.retirar(200);
console.log(miCuenta.consultarSaldo()); // 1300

console.log(miCuenta.consultarMovimientos());
// [{ tipo: "depósito", monto: 500, saldo: 1500, fecha: ... }, ...]

// No se puede acceder directamente al saldo
// miCuenta.saldo = 999999; // No funciona porque saldo es privado
```

### Cache con Closures

```javascript
function crearCache(fn) {
    const cache = new Map();
    let llamadas = 0;
    
    function ejecutar(...args) {
        llamadas++;
        const clave = JSON.stringify(args);
        
        if (cache.has(clave)) {
            console.log(`Cache hit para: ${clave}`);
            return cache.get(clave);
        }
        
        console.log(`Calculando para: ${clave}`);
        const resultado = fn(...args);
        cache.set(clave, resultado);
        return resultado;
    }
    
    return {
        ejecutar,
        obtenerEstadisticas() {
            return {
                llamadas,
                entradasEnCache: cache.size,
                tasaCache: cache.size > 0 ? ((cache.size / llamadas) * 100).toFixed(2) + "%" : "0%"
            };
        },
        limpiarCache() {
            cache.clear();
        }
    };
}

const cacheFibonacci = crearCache(function(n) {
    if (n <= 1) return n;
    return cacheFibonacci.ejecutar(n - 1) + cacheFibonacci.ejecutar(n - 2);
});

console.log(cacheFibonacci.ejecutar(10)); // 55
console.log(cacheFibonacci.ejecutar(10)); // 55 (usa cache)
console.log(cacheFibonacci.obtenerEstadisticas());
// { llamadas: ..., entradasEnCache: ..., tasaCache: "..." }
```

### Event Handler con Estado

```javascript
function crearManejadorEventos() {
    const listeners = {};
    const estado = {
        activo: true,
        eventosProcesados: 0
    };
    
    return {
        on(evento, callback) {
            if (!listeners[evento]) {
                listeners[evento] = [];
            }
            listeners[evento].push(callback);
            
            // Retornar función para desuscribirse
            return () => {
                listeners[evento] = listeners[evento].filter(cb => cb !== callback);
            };
        },
        
        emit(evento, datos) {
            if (!estado.activo) {
                console.log("Sistema inactivo, evento ignorado");
                return;
            }
            
            estado.eventosProcesados++;
            
            if (listeners[evento]) {
                listeners[evento].forEach(callback => {
                    try {
                        callback(datos);
                    } catch (error) {
                        console.error(`Error en listener de ${evento}:`, error);
                    }
                });
            }
        },
        
        desactivar() {
            estado.activo = false;
        },
        
        activar() {
            estado.activo = true;
        },
        
        obtenerEstado() {
            return { ...estado };
        }
    };
}

const eventos = crearManejadorEventos();

// Suscribirse a eventos
const desuscribir = eventos.on("mensaje", (datos) => {
    console.log("Mensaje recibido:", datos);
});

eventos.emit("mensaje", { texto: "Hola mundo" });

// Desuscribirse
desuscribir();
eventos.emit("mensaje", { texto: "Esta vez no se muestra" });
```

---

## 5. Implicaciones de Memoria

Los closures mantienen referencia a las variables de su scope, lo que puede causar problemas de memoria si no se manejan correctamente.

```javascript
// PROBLEMA: Closure que retiene referencia innecesaria
function crearProcesoProblematico() {
    const datosGrandes = new Array(1000000).fill("datos");
    
    return function() {
        // Esta función no usa 'datosGrandes', pero el closure
        // mantiene la referencia de todas formas
        console.log("Proceso ejecutado");
    };
}

// SOLUCIÓN 1: Liberar referencia manualmente
function crearProcesoCorrecto() {
    let datosGrandes = new Array(1000000).fill("datos");
    
    const proceso = function() {
        console.log("Proceso ejecutado");
    };
    
    // Liberar la referencia cuando no sea necesaria
    datosGrandes = null;
    
    return proceso;
}

// SOLUCIÓN 2: No capturar lo que no se necesita
function crearProcesoOptimizado() {
    const datosGrandes = new Array(1000000).fill("datos");
    const resultado = procesarDatos(datosGrandes); // Procesar antes
    
    return function() {
        // Solo captura el resultado, no los datos grandes
        console.log("Resultado:", resultado);
    };
}

function procesarDatos(datos) {
    return datos.length;
}

// Ejemplo de memory leak potencial
function ejemploMemoryLeak() {
    const elementos = [];
    
    function agregarElemento() {
        const elemento = document.createElement("div");
        
        // PROBLEMA: El closure retiene el elemento del DOM
        elemento.addEventListener("click", function() {
            console.log("Click en", elemento); // Referencia al elemento
        });
        
        // Esto es correcto, el elemento se agrega al DOM
        document.body.appendChild(elemento);
        elementos.push(elemento);
    }
    
    // SOLUCIÓN: Usar WeakMap o RemoveEventListener
    function agregarElementoOptimizado() {
        const elemento = document.createElement("div");
        
        function manejadorClick() {
            console.log("Click en", elemento);
        }
        
        elemento.addEventListener("click", manejadorClick);
        document.body.appendChild(elemento);
        
        // Retornar función de limpieza
        return function limpiar() {
            elemento.removeEventListener("click", manejadorClick);
            elemento.remove();
        };
    }
    
    return { agregarElemento, agregarElementoOptimizado };
}
```

### Gestión de memoria con WeakMap

```javascript
// WeakMap permite que el garbage collector elimine las claves
const datosPrivados = new WeakMap();

function crearObjetoConPrivados() {
    const objeto = {
        nombre: "Mi Objeto",
        metodo() {
            const privados = datosPrivados.get(objeto);
            console.log(`${privados.secreto} - ${privados.contador}`);
        }
    };
    
    datosPrivados.set(objeto, {
        secreto: "dato privado",
        contador: 0
    });
    
    return objeto;
}

const miObjeto = crearObjetoConPrivados();
miObjeto.metodo(); // "dato privado - 0"

// Cuando miObjeto se elimine, WeakMap también liberará los datos
```

---

## 6. Closures en la Práctica

### Iteradores

```javascript
function crearIterador(array) {
    let indice = 0;
    
    return {
        siguiente() {
            if (indice < array.length) {
                return { valor: array[indice++], terminado: false };
            }
            return { valor: undefined, terminado: true };
        },
        
        reiniciar() {
            indice = 0;
        },
        
        saltar(n) {
            indice = Math.min(indice + n, array.length);
        }
    };
}

const iterador = crearIterador(["a", "b", "c"]);
console.log(iterador.siguiente()); // { valor: "a", terminado: false }
console.log(iterador.siguiente()); // { valor: "b", terminado: false }
iterador.saltar(1);
console.log(iterador.siguiente()); // { valor: "d", terminado: false }
iterador.reiniciar();
console.log(iterador.siguiente()); // { valor: "a", terminado: false }
```

### Generadores de ID

```javascript
function crearGeneradorId(prefijo = "id") {
    let contador = 0;
    const usados = new Set();
    
    return {
        generar() {
            let id;
            do {
                contador++;
                id = `${prefijo}-${contador}`;
            } while (usados.has(id));
            
            usados.add(id);
            return id;
        },
        
        verificar(id) {
            return usados.has(id);
        },
        
        liberar(id) {
            usados.delete(id);
        },
        
        obtenerTotal() {
            return usados.size;
        }
    };
}

const generador = crearGeneradorId("user");
const id1 = generador.generar(); // "user-1"
const id2 = generador.generar(); // "user-2"
console.log(generador.verificar(id1)); // true
generador.liberar(id1);
console.log(generador.verificar(id1)); // false
```

### Debounce y Throttle

```javascript
function crearDebounce() {
    let temporizador = null;
    
    return function(fn, delay) {
        return function(...args) {
            clearTimeout(temporizador);
            temporizador = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    };
}

function crearThrottle() {
    let ultimaEjecucion = 0;
    
    return function(fn, limite) {
        return function(...args) {
            const ahora = Date.now();
            if (ahora - ultimaEjecucion >= limite) {
                ultimaEjecucion = ahora;
                fn.apply(this, args);
            }
        };
    };
}

const debounce = crearDebounce();
const throttle = crearThrottle();

function buscar(texto) {
    console.log(`Buscando: ${texto}`);
}

const buscarDebounced = debounce(buscar, 500);
const buscarThrottled = throttle(buscar, 1000);
```

---

## Buenas prácticas

1. **Usar let en bucles for**: Evita el problema clásico de closures con var.
2. **Limitar el alcance de closures**: No captures variables innecesarias.
3. **Evitar closures en bucles intensivos**: Pueden causar memory leaks.
4. **Usar WeakMap para datos privados**: Permite garbage collection.
5. **Documentar side effects**: Los closures pueden mantener estado que no es obvio.
6. **Usar namespacing**: Evita conflicto de nombres en closures globales.
7. **Considerar el rendimiento**: Los closures tienen un costo de creación.

---

## Ejercicios

### Ejercicio 1: Closures básicos (10 puntos)
1. Crea una función `crearSumador(inicio)` que retorne una función que sume al acumulador
2. Crea una función `crearMultiplicador(factor)` que retorne una función que multiplique
3. Crea una función `crearContador(paso)` que retorne funciones para incrementar/decrementar

### Ejercicio 2: Module Pattern (15 puntos)
1. Crea un módulo `Biblioteca` con métodos para agregar, buscar y eliminar libros
2. Cada libro debe tener: id, titulo, autor, disponible
3. Incluye métodos para estadísticas (total de libros, disponibles, prestados)

### Ejercicio 3: Factory Functions (15 puntos)
1. Crea una función `crearUsuario(nombre, email)` con métodos para actualizar perfil
2. Implementa sistema de roles (admin, editor, viewer) con permisos diferentes
3. Cada usuario debe tener historial de acciones

### Ejercicio 4: Closures con iteradores (10 puntos)
1. Crea un iterador para recorrer un objeto literal
2. Implementa un generador de números de serie únicos
3. Crea un generador de contraseñas con opciones configurables

### Ejercicio 5: Closures asíncronos (15 puntos)
1. Crea un sistema de cola de tareas con prioridad
2. Implementa un rate limiter que restrinja llamadas por segundo
3. Crea un sistema de caché con expiración

### Ejercicio 6: Problema integrador (20 puntos)
Crea un sistema completo de gestión de estado usando closures:
1. Store con getState, dispatch y subscribe
2. Soporte para middleware
3. Historial de acciones con undo/redo
4. Persistencia en localStorage

---

## Soluciones

### Solución Ejercicio 1

```javascript
// 1. Sumador
function crearSumador(inicio = 0) {
    let suma = inicio;
    
    return {
        sumar(valor) {
            suma += valor;
            return suma;
        },
        obtener() {
            return suma;
        },
        reiniciar() {
            suma = inicio;
            return suma;
        }
    };
}

const sumador = crearSumador(0);
console.log(sumador.sumar(5));   // 5
console.log(sumador.sumar(3));   // 8
console.log(sumador.obtener());  // 8
sumador.reiniciar();
console.log(sumador.obtener());  // 0

// 2. Multiplicador
function crearMultiplicador(factor) {
    return function(valor) {
        return valor * factor;
    };
}

const duplicar = crearMultiplicador(2);
const triple = crearMultiplicador(3);
console.log(duplicar(5));  // 10
console.log(triple(5));    // 15

// 3. Contador con paso
function crearContador(paso = 1) {
    let valor = 0;
    
    return {
        incrementar() {
            valor += paso;
            return valor;
        },
        decrementar() {
            valor -= paso;
            return valor;
        },
        obtener() {
            return valor;
        }
    };
}

const contador = crearContador(5);
console.log(contador.incrementar()); // 5
console.log(contador.incrementar()); // 10
console.log(contador.decrementar()); // 5
```

### Solución Ejercicio 2

```javascript
const Biblioteca = (function() {
    let libros = [];
    let siguienteId = 1;
    
    function buscarPorId(id) {
        return libros.find(libro => libro.id === id);
    }
    
    function validarLibro(titulo, autor) {
        if (!titulo || typeof titulo !== "string") {
            throw new Error("Título inválido");
        }
        if (!autor || typeof autor !== "string") {
            throw new Error("Autor inválido");
        }
    }
    
    return {
        agregar(titulo, autor) {
            validarLibro(titulo, autor);
            
            const libro = {
                id: siguienteId++,
                titulo,
                autor,
                disponible: true,
                fechaIngreso: new Date()
            };
            
            libros.push(libro);
            return libro;
        },
        
        buscar(parcial) {
            return libros.filter(libro =>
                libro.titulo.toLowerCase().includes(parcial.toLowerCase()) ||
                libro.autor.toLowerCase().includes(parcial.toLowerCase())
            );
        },
        
        eliminar(id) {
            const indice = libros.findIndex(libro => libro.id === id);
            if (indice === -1) {
                throw new Error(`Libro con id ${id} no encontrado`);
            }
            return libros.splice(indice, 1)[0];
        },
        
        prestar(id) {
            const libro = buscarPorId(id);
            if (!libro) {
                throw new Error("Libro no encontrado");
            }
            if (!libro.disponible) {
                throw new Error("Libro no está disponible");
            }
            libro.disponible = false;
            return libro;
        },
        
        devolver(id) {
            const libro = buscarPorId(id);
            if (!libro) {
                throw new Error("Libro no encontrado");
            }
            libro.disponible = true;
            return libro;
        },
        
        estadisticas() {
            const total = libros.length;
            const disponibles = libros.filter(l => l.disponible).length;
            const prestados = total - disponibles;
            
            return { total, disponibles, prestados };
        },
        
        obtenerTodos() {
            return libros.map(l => ({ ...l }));
        }
    };
})();

// Uso
Biblioteca.agregar("Cien Años de Soledad", "Gabriel García Márquez");
Biblioteca.agregar("Don Quijote", "Miguel de Cervantes");
console.log(Biblioteca.estadisticas());
// { total: 2, disponibles: 2, prestados: 0 }
```

### Solución Ejercicio 3

```javascript
function crearUsuario(nombre, email, rol = "viewer") {
    let perfil = { nombre, email, rol };
    const historial = [];
    const permisos = {
        admin: ["leer", "escribir", "eliminar", "admin"],
        editor: ["leer", "escribir"],
        viewer: ["leer"]
    };
    
    function registrarAccion(accion) {
        historial.push({
            accion,
            fecha: new Date(),
            usuario: perfil.nombre
        });
    }
    
    function tienePermiso(accion) {
        return permisos[perfil.rol]?.includes(accion) || false;
    }
    
    return {
        obtenerPerfil() {
            return { ...perfil };
        },
        
        actualizarNombre(nuevoNombre) {
            if (!nuevoNombre || typeof nuevoNombre !== "string") {
                throw new Error("Nombre inválido");
            }
            const anterior = perfil.nombre;
            perfil.nombre = nuevoNombre;
            registrarAccion(`Nombre cambiado de "${anterior}" a "${nuevoNombre}"`);
            return this;
        },
        
        actualizarEmail(nuevoEmail) {
            if (!nuevoEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoEmail)) {
                throw new Error("Email inválido");
            }
            const anterior = perfil.email;
            perfil.email = nuevoEmail;
            registrarAccion(`Email cambiado de "${anterior}" a "${nuevoEmail}"`);
            return this;
        },
        
        ejecutar(accion, datos) {
            if (!tienePermiso(accion)) {
                throw new Error(`Permiso denegado: ${accion}`);
            }
            registrarAccion(`Ejecutó: ${accion}`);
            return { exitoso: true, datos };
        },
        
        obtenerHistorial() {
            return [...historial];
        },
        
        esAdmin() {
            return perfil.rol === "admin";
        }
    };
}

const admin = crearUsuario("Admin", "admin@ejemplo.com", "admin");
const viewer = crearUsuario("Viewer", "viewer@ejemplo.com", "viewer");

console.log(admin.ejecutar("eliminar", { id: 1 }));
// { exitoso: true, datos: { id: 1 } }

console.log(viewer.ejecutar("eliminar", { id: 1 }));
// Error: Permiso denegado: eliminar

console.log(admin.obtenerHistorial());
```

### Solución Ejercicio 4

```javascript
// 1. Iterador de objeto
function crearIteradorObjeto(obj) {
    const claves = Object.keys(obj);
    let indice = 0;
    
    return {
        siguiente() {
            if (indice < claves.length) {
                const clave = claves[indice];
                indice++;
                return {
                    clave,
                    valor: obj[clave],
                    terminado: false
                };
            }
            return { clave: undefined, valor: undefined, terminado: true };
        },
        
        reiniciar() {
            indice = 0;
        },
        
        saltar(n) {
            indice = Math.min(indice + n, claves.length);
        }
    };
}

const miObjeto = { a: 1, b: 2, c: 3 };
const iterador = crearIteradorObjeto(miObjeto);
console.log(iterador.siguiente()); // { clave: "a", valor: 1, terminado: false }
console.log(iterador.siguiente()); // { clave: "b", valor: 2, terminado: false }

// 2. Generador de números de serie
function crearGeneradorSeries(prefijo = "SERIE") {
    const usados = new Set();
    let contador = 0;
    
    function generarNumero() {
        contador++;
        return `${prefijo}-${String(contador).padStart(6, "0")}`;
    }
    
    return {
        generar(cantidad = 1) {
            const numeros = [];
            for (let i = 0; i < cantidad; i++) {
                let numero;
                do {
                    numero = generarNumero();
                } while (usados.has(numero));
                usados.add(numero);
                numeros.push(numero);
            }
            return cantidad === 1 ? numeros[0] : numeros;
        },
        
        verificar(numero) {
            return usados.has(numero);
        },
        
        obtenerTotal() {
            return usados.size;
        }
    };
}

const generador = crearGeneradorSeries("PROD");
console.log(generador.generar()); // "PROD-000001"
console.log(generador.generar(3)); // ["PROD-000002", "PROD-000003", "PROD-000004"]

// 3. Generador de contraseñas
function crearGeneradorContrasenas() {
    const opciones = {
        longitud: 12,
        mayusculas: true,
        minusculas: true,
        numeros: true,
        simbolos: true
    };
    
    const caracteres = {
        mayusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        minusculas: "abcdefghijklmnopqrstuvwxyz",
        numeros: "0123456789",
        simbolos: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };
    
    return {
        configurar(nuevasOpciones) {
            Object.assign(opciones, nuevasOpciones);
            return this;
        },
        
        generar(cantidad = 1) {
            let pool = "";
            if (opciones.mayusculas) pool += caracteres.mayusculas;
            if (opciones.minusculas) pool += caracteres.minusculas;
            if (opciones.numeros) pool += caracteres.numeros;
            if (opciones.simbolos) pool += caracteres.simbolos;
            
            if (!pool) {
                throw new Error("Debe seleccionar al menos un tipo de carácter");
            }
            
            const contrasenas = [];
            for (let i = 0; i < cantidad; i++) {
                let contrasena = "";
                for (let j = 0; j < opciones.longitud; j++) {
                    contrasena += pool[Math.floor(Math.random() * pool.length)];
                }
                contrasenas.push(contrasena);
            }
            
            return cantidad === 1 ? contrasenas[0] : contrasenas;
        }
    };
}

const generador = crearGeneradorContrasenas();
console.log(generador.generar());
generador.configurar({ longitud: 16, simbolos: false });
console.log(generador.generar());
```

### Solución Ejercicio 5

```javascript
// 1. Cola de tareas con prioridad
function crearColaTareas() {
    const cola = [];
    let procesando = false;
    
    function procesarSiguiente() {
        if (procesando || cola.length === 0) return;
        
        procesando = true;
        const tarea = cola.sort((a, b) => a.prioridad - b.prioridad).shift();
        
        Promise.resolve()
            .then(() => tarea.funcion())
            .then(() => {
                if (tarea.callbackExito) tarea.callbackExito();
                procesando = false;
                procesarSiguiente();
            })
            .catch(error => {
                if (tarea.callbackError) tarea.callbackError(error);
                procesando = false;
                procesarSiguiente();
            });
    }
    
    return {
        agregar(funcion, prioridad = 5, callbacks = {}) {
            const tarea = {
                funcion,
                prioridad,
                callbackExito: callbacks.exito,
                callbackError: callbacks.error,
                fechaCreacion: Date.now()
            };
            
            cola.push(tarea);
            procesarSiguiente();
            
            return {
                cancelar() {
                    const indice = cola.indexOf(tarea);
                    if (indice !== -1) {
                        cola.splice(indice, 1);
                        return true;
                    }
                    return false;
                }
            };
        },
        
        obtenerEstado() {
            return {
                pendientes: cola.length,
                procesando
            };
        }
    };
}

// 2. Rate limiter
function crearRateLimiter(maxLlamadas, ventanaMs) {
    const llamadas = [];
    
    return {
        ejecutar(fn) {
            const ahora = Date.now();
            
            // Eliminar llamadas fuera de la ventana
            while (llamadas.length > 0 && llamadas[0] < ahora - ventanaMs) {
                llamadas.shift();
            }
            
            if (llamadas.length >= maxLlamadas) {
                throw new Error("Rate limit excedido");
            }
            
            llamadas.push(ahora);
            return fn();
        },
        
        obtenerEstado() {
            const ahora = Date.now();
            const recientes = llamadas.filter(t => t > ahora - ventanaMs);
            return {
                llamadasEnVentana: recientes.length,
                maxLlamadas,
                ventanaMs
            };
        }
    };
}

const limiter = crearRateLimiter(3, 1000);
console.log(limiter.ejecutar(() => "OK")); // "OK"
console.log(limiter.ejecutar(() => "OK")); // "OK"
console.log(limiter.ejecutar(() => "OK")); // "OK"
// limiter.ejecutar(() => "OK"); // Error: Rate limit excedido

// 3. Caché con expiración
function crearCache(ttlMs = 60000) {
    const cache = new Map();
    
    return {
        set(clave, valor, ttl = ttlMs) {
            cache.set(clave, {
                valor,
                expiracion: Date.now() + ttl
            });
        },
        
        get(clave) {
            const entrada = cache.get(clave);
            if (!entrada) return undefined;
            
            if (Date.now() > entrada.expiracion) {
                cache.delete(clave);
                return undefined;
            }
            
            return entrada.valor;
        },
        
        has(clave) {
            return this.get(clave) !== undefined;
        },
        
        delete(clave) {
            return cache.delete(clave);
        },
        
        clear() {
            cache.clear();
        },
        
        size() {
            // Limpiar expirados
            for (const [clave, entrada] of cache) {
                if (Date.now() > entrada.expiracion) {
                    cache.delete(clave);
                }
            }
            return cache.size;
        }
    };
}

const cache = crearCache(5000);
cache.set("usuario", { id: 1, nombre: "Ana" });
console.log(cache.get("usuario")); // { id: 1, nombre: "Ana" }
```

### Solución Ejercicio 6

```javascript
function crearStore(reducer, estadoInicial = {}) {
    let estado = { ...estadoInicial };
    let historial = [];
    let indiceHistorial = -1;
    const listeners = [];
    const middlewares = [];
    
    function despacharAccion(accion) {
        // Ejecutar middlewares
        let accionProcesada = accion;
        for (const middleware of middlewares) {
            accionProcesada = middleware(estado, accionProcesada) || accionProcesada;
        }
        
        const estadoAnterior = estado;
        estado = reducer(estado, accionProcesada);
        
        // Guardar en historial
        historial = historial.slice(0, indiceHistorial + 1);
        historial.push({
            accion: accionProcesada,
            estadoAnterior,
            estadoNuevo: estado
        });
        indiceHistorial = historial.length - 1;
        
        // Notificar listeners
        listeners.forEach(listener => listener(estado, accionProcesada));
        
        return estado;
    }
    
    return {
        getState() {
            return { ...estado };
        },
        
        dispatch(accion) {
            return despacharAccion(accion);
        },
        
        subscribe(listener) {
            listeners.push(listener);
            
            return function unsubscribe() {
                const indice = listeners.indexOf(listener);
                if (indice !== -1) {
                    listeners.splice(indice, 1);
                }
            };
        },
        
        use(middleware) {
            middlewares.push(middleware);
            return this;
        },
        
        undo() {
            if (indiceHistorial > 0) {
                indiceHistorial--;
                estado = { ...historial[indiceHistorial].estadoAnterior };
                listeners.forEach(listener => listener(estado, { type: "UNDO" }));
                return estado;
            }
            return null;
        },
        
        redo() {
            if (indiceHistorial < historial.length - 1) {
                indiceHistorial++;
                estado = { ...historial[indiceHistorial].estadoNuevo };
                listeners.forEach(listener => listener(estado, { type: "REDO" }));
                return estado;
            }
            return null;
        },
        
        getHistorial() {
            return [...historial];
        }
    };
}

// Middleware de logging
const loggerMiddleware = (estado, accion) => {
    console.log("Acción:", accion.type, "Payload:", accion.payload);
    console.log("Estado anterior:", estado);
};

// Middleware de validación
const validacionMiddleware = (estado, accion) => {
    if (!accion.type) {
        throw new Error("Las acciones deben tener un tipo");
    }
};

// Reducer
function contadorReducer(estado, accion) {
    switch (accion.type) {
        case "INCREMENTAR":
            return { ...estado, contador: estado.contador + 1 };
        case "DECREMENTAR":
            return { ...estado, contador: estado.contador - 1 };
        case "ESTABLECER":
            return { ...estado, contador: accion.payload };
        default:
            return estado;
    }
}

// Crear store
const store = crearStore(contadorReducer, { contador: 0 })
    .use(loggerMiddleware)
    .use(validacionMiddleware);

// Suscribirse a cambios
const unsubscribe = store.subscribe((nuevoEstado) => {
    console.log("Estado actualizado:", nuevoEstado);
});

// Usar
store.dispatch({ type: "INCREMENTAR" });
store.dispatch({ type: "INCREMENTAR" });
store.dispatch({ type: "ESTABLECER", payload: 10 });

console.log(store.getState()); // { contador: 10 }

store.undo();
console.log(store.getState()); // { contador: 2 }

store.redo();
console.log(store.getState()); // { contador: 10 }

unsubscribe();
```
