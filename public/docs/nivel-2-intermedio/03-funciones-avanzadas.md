# Lección 3: Funciones Avanzadas

## Objetivos de aprendizaje

- [ ] Implementar funciones recursivas para resolver problemas complejos
- [ ] Comprender y aplicar callbacks en diferentes contextos
- [ ] Crear y utilizar funciones de orden superior
- [ ] Dominar técnicas como memoization, currying y partial application
- [ ] Comprender el uso de IIFE (Immediately Invoked Function Expressions)
- [ ] Combinar múltiples técnicas para crear código modular y reutilizable

---

## 1. Recursión

La recursión es una técnica donde una función se llama a sí misma para resolver un problema dividiéndolo en subproblemas más pequeños.

### Componentes de una función recursiva

```javascript
// Toda función recursiva necesita:
// 1. Caso base: condición que detiene la recursión
// 2. Caso recursivo: la función se llama a sí misma con un argumento más simple

// Ejemplo simple: cuenta regresiva
function cuentaRegresiva(n) {
    // Caso base
    if (n <= 0) {
        console.log("¡Despegue!");
        return;
    }
    
    console.log(n);
    // Caso recursivo
    cuentaRegresiva(n - 1);
}

cuentaRegresiva(5);
// 5
// 4
// 3
// 2
// 1
// ¡Despegue!
```

### Factorial

```javascript
// Factorial de n (n!) = n * (n-1) * (n-2) * ... * 1
// 5! = 5 * 4 * 3 * 2 * 1 = 120

// Versión recursiva
function factorial(n) {
    // Caso base
    if (n <= 1) return 1;
    // Caso recursivo
    return n * factorial(n - 1);
}

console.log(factorial(0));  // 1
console.log(factorial(1));  // 1
console.log(factorial(5));  // 120
console.log(factorial(10)); // 3628800

// Versión iterativa (para comparar)
function factorialIterativo(n) {
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

console.log(factorialIterativo(5)); // 120

// Versión con validación
function factorialSeguro(n) {
    if (typeof n !== "number" || n < 0) {
        throw new Error("El argumento debe ser un número no negativo");
    }
    if (!Number.isInteger(n)) {
        throw new Error("El argumento debe ser un entero");
    }
    if (n <= 1) return 1;
    return n * factorialSeguro(n - 1);
}

console.log(factorialSeguro(5)); // 120
// factorialSeguro(-1); // Error
```

### Fibonacci

```javascript
// Secuencia de Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
// Cada número es la suma de los dos anteriores

// Versión recursiva simple (ineficiente - O(2^n))
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(0));  // 0
console.log(fibonacci(1));  // 1
console.log(fibonacci(5));  // 5
console.log(fibonacci(10)); // 55

// Versión con memoización (eficiente - O(n))
function fibonacciMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

console.log(fibonacciMemo(10));  // 55
console.log(fibonacciMemo(50));  // 12586269025

// Generar secuencia completa
function fibonacciSecuencia(n) {
    const secuencia = [];
    for (let i = 0; i < n; i++) {
        secuencia.push(fibonacci(i));
    }
    return secuencia;
}

console.log(fibonacciSecuencia(10));
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### Recursión con estructuras de datos

```javascript
// Suma de todos los elementos de un array anidado
function sumaAnidada(arr) {
    let suma = 0;
    for (const elemento of arr) {
        if (Array.isArray(elemento)) {
            suma += sumaAnidada(elemento);
        } else {
            suma += elemento;
        }
    }
    return suma;
}

console.log(sumaAnidada([1, [2, 3], [4, [5, 6]]])); // 21
console.log(sumaAnidada([[1, 2], [3, [4, [5]]]]));  // 15

// Aplanar array anidado
function aplanar(arr) {
    const resultado = [];
    for (const elemento of arr) {
        if (Array.isArray(elemento)) {
            resultado.push(...aplanar(elemento));
        } else {
            resultado.push(elemento);
        }
    }
    return resultado;
}

console.log(aplanar([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]

// Buscar en objeto anidado
function buscarPropiedad(obj, propiedad) {
    if (obj.hasOwnProperty(propiedad)) {
        return obj[propiedad];
    }
    
    for (const valor of Object.values(obj)) {
        if (typeof valor === "object" && valor !== null) {
            const resultado = buscarPropiedad(valor, propiedad);
            if (resultado !== undefined) {
                return resultado;
            }
        }
    }
    
    return undefined;
}

const empresa = {
    nombre: "TechCorp",
    departamento: {
        nombre: "Desarrollo",
        equipo: {
            nombre: "Frontend",
            miembros: ["Ana", "Carlos"]
        }
    }
};

console.log(buscarPropiedad(empresa, "miembros")); // ["Ana", "Carlos"]
```

### Recursión en árboles

```javascript
// Estructura de árbol
const arbol = {
    valor: 1,
    hijos: [
        {
            valor: 2,
            hijos: [
                { valor: 4, hijos: [] },
                { valor: 5, hijos: [] }
            ]
        },
        {
            valor: 3,
            hijos: [
                { valor: 6, hijos: [] },
                { valor: 7, hijos: [] }
            ]
        }
    ]
};

// Recorrer árbol en profundidad (DFS)
function recorrerArbol(nodo, visitar) {
    visitar(nodo.valor);
    for (const hijo of nodo.hijos) {
        recorrerArbol(hijo, visitar);
    }
}

const valores = [];
recorrerArbol(arbol, (valor) => valores.push(valor));
console.log(valores); // [1, 2, 4, 5, 3, 6, 7]

// Contar nodos
function contarNodos(nodo) {
    let count = 1;
    for (const hijo of nodo.hijos) {
        count += contarNodos(hijo);
    }
    return count;
}

console.log(contarNodos(arbol)); // 7

// Encontrar altura del árbol
function altura(nodo) {
    if (nodo.hijos.length === 0) return 0;
    let maxAltura = 0;
    for (const hijo of nodo.hijos) {
        const altHijo = altura(hijo);
        if (altHijo > maxAltura) {
            maxAltura = altHijo;
        }
    }
    return maxAltura + 1;
}

console.log(altura(arbol)); // 2
```

---

## 2. Callbacks

Un callback es una función que se pasa como argumento a otra función y se ejecuta después de que se complete una operación.

```javascript
// Ejemplo básico de callback
function saludar(nombre, callback) {
    const mensaje = `Hola, ${nombre}!`;
    callback(mensaje);
}

saludar("Ana", function(mensaje) {
    console.log(mensaje); // "Hola, Ana!"
});

// Callback asíncrono (simulado)
function cargarDatos(callback) {
    console.log("Cargando datos...");
    setTimeout(() => {
        const datos = { id: 1, nombre: "Producto" };
        callback(null, datos);
    }, 1000);
}

cargarDatos(function(error, datos) {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Datos cargados:", datos);
    }
});

// Patrón de callback con error (Node.js style)
function dividir(a, b, callback) {
    if (b === 0) {
        callback(new Error("División por cero"));
        return;
    }
    callback(null, a / b);
}

dividir(10, 2, function(error, resultado) {
    if (error) {
        console.error(error.message);
    } else {
        console.log("Resultado:", resultado); // 5
    }
});

dividir(10, 0, function(error, resultado) {
    if (error) {
        console.error(error.message); // "División por cero"
    }
});
```

### Callbacks en métodos de array

```javascript
// Los métodos de array reciben callbacks
const numeros = [1, 2, 3, 4, 5];

// forEach
numeros.forEach(function(numero) {
    console.log(numero * 2);
});

// map
const dobles = numeros.map(function(numero) {
    return numero * 2;
});
console.log(dobles); // [2, 4, 6, 8, 10]

// filter
const pares = numeros.filter(function(numero) {
    return numero % 2 === 0;
});
console.log(pares); // [2, 4]

// reduce
const suma = numeros.reduce(function(acumulador, numero) {
    return acumulador + numero;
}, 0);
console.log(suma); // 15
```

---

## 3. Funciones de Orden Superior

Una función de orden superior es una función que:
- Recibe una función como argumento, O
- Retorna una función

```javascript
// Ejemplo 1: Función que retorna una función
function crearMultiplicador(factor) {
    return function(numero) {
        return numero * factor;
    };
}

const doble = crearMultiplicador(2);
const triple = crearMultiplicador(3);

console.log(doble(5));   // 10
console.log(triple(5));  // 15

// Ejemplo 2: Función que recibe función como argumento
function ejecutarOperacion(a, b, operacion) {
    return operacion(a, b);
}

function sumar(x, y) { return x + y; }
function restar(x, y) { return x - y; }
function multiplicar(x, y) { return x * y; }

console.log(ejecutarOperacion(10, 5, sumar));       // 15
console.log(ejecutarOperacion(10, 5, restar));      // 5
console.log(ejecutarOperacion(10, 5, multiplicar)); // 50

// Ejemplo 3: Función que transforma una función
function loggear(fn) {
    return function(...args) {
        console.log(`Llamando a ${fn.name} con`, args);
        const resultado = fn(...args);
        console.log(`${fn.name} retornó`, resultado);
        return resultado;
    };
}

const sumarLoggeado = loggear(sumar);
console.log(sumarLoggeado(3, 4));
// "Llamando a sumar con [3, 4]"
// "sumar retornó 7"
// 7
```

### Crear herramientas reutilizables

```javascript
// Sistema de validación
function crearValidador(validaciones) {
    return function(valor) {
        for (const validacion of validaciones) {
            const error = validacion(valor);
            if (error) {
                return { valido: false, error };
            }
        }
        return { valido: true, error: null };
    };
}

function requerido(valor) {
    if (!valor || valor.trim() === "") {
        return "El campo es requerido";
    }
    return null;
}

function minimo(longitud) {
    return function(valor) {
        if (valor.length < longitud) {
            return `Mínimo ${longitud} caracteres`;
        }
        return null;
    };
}

function email(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)) {
        return "Email inválido";
    }
    return null;
}

const validarEmail = crearValidador([requerido, email]);
const validarPassword = crearValidador([requerido, minimo(8)]);

console.log(validarEmail("ana@ejemplo.com"));
// { valido: true, error: null }

console.log(validarEmail(""));
// { valido: false, error: "El campo es requerido" }

console.log(validarPassword("123"));
// { valido: false, error: "Mínimo 8 caracteres" }
```

---

## 4. Composición de Funciones

La composición combina múltiples funciones para crear una nueva función.

```javascript
// Composición de izquierda a derecha
function compose(...funciones) {
    return function(valor) {
        return funciones.reduceRight((resultado, fn) => fn(resultado), valor);
    };
}

// Composición de derecha a izquierda (más común)
function pipe(...funciones) {
    return function(valor) {
        return funciones.reduce((resultado, fn) => fn(resultado), valor);
    };
}

// Funciones base
function duplicar(x) { return x * 2; }
function sumarTres(x) { return x + 3; }
function elevarAlCuadrado(x) { return x * x; }

// Usando pipe (izquierda a derecha)
const transformar = pipe(duplicar, sumarTres, elevarAlCuadrado);
console.log(transformar(2)); // ((2 * 2) + 3)^2 = 49

// Usando compose (derecha a izquierda)
const transformar2 = compose(duplicar, sumarTres, elevarAlCuadrado);
console.log(transformar2(2)); // (2^2 + 3) * 2 = 14

// Ejemplo práctico: procesamiento de texto
function mayusculas(str) { return str.toUpperCase(); }
function sinEspacios(str) { return str.replace(/\s+/g, " ").trim(); }
function reemplazarEspacios(str) { return str.replace(/ /g, "-"); }
function agregarPrefijo(str) { return `usr_${str}`; }

const procesarUsuario = pipe(
    sinEspacios,
    mayusculas,
    reemplazarEspacios,
    agregarPrefijo
);

console.log(procesarUsuario("  Ana García  "));
// "usr_ANA-GARCÍA"

// Composición con objetos
function mergeObjetos(obj1, obj2) {
    return { ...obj1, ...obj2 };
}

function agregarTimestamp(obj) {
    return { ...obj, timestamp: Date.now() };
}

function agregarId(obj) {
    return { ...obj, id: Math.random().toString(36).substr(2, 9) };
}

const crearEvento = pipe(
    mergeObjetos,
    agregarTimestamp,
    agregarId
);

const evento = crearEvento(
    { tipo: "click", elemento: "boton" },
    { x: 100, y: 200 }
);
console.log(evento);
// { tipo: "click", elemento: "boton", x: 100, y: 200, timestamp: ..., id: "..." }
```

---

## 5. Memoization

La memoization es una técnica de optimización que almacena los resultados de llamadas anteriores para evitar cálculos repetidos.

```javascript
// Implementación básica de memoize
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const clave = JSON.stringify(args);
        
        if (cache.has(clave)) {
            console.log(`Usando cache para: ${clave}`);
            return cache.get(clave);
        }
        
        console.log(`Calculando para: ${clave}`);
        const resultado = fn(...args);
        cache.set(clave, resultado);
        return resultado;
    };
}

// Factorial con memoization
const factorialMemo = memoize(function(n) {
    if (n <= 1) return 1;
    return n * factorialMemo(n - 1);
});

console.log(factorialMemo(5));  // Calcula todo: 120
console.log(factorialMemo(5));  // Usa cache: 120
console.log(factorialMemo(10)); // Calcula 6-10: 3628800

// Fibonacci con memoization
const fibonacciMemo = memoize(function(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
});

console.log(fibonacciMemo(40)); // 102334155 (instantáneo)

// Memoize con límite de caché
function memoizeConLimite(fn, limite = 100) {
    const cache = new Map();
    
    return function(...args) {
        const clave = JSON.stringify(args);
        
        if (cache.has(clave)) {
            return cache.get(clave);
        }
        
        const resultado = fn(...args);
        
        if (cache.size >= limite) {
            const primeraClave = cache.keys().next().value;
            cache.delete(primeraClave);
        }
        
        cache.set(clave, resultado);
        return resultado;
    };
}
```

### Memoize personalizado con TTL

```javascript
function memoizeConTTL(fn, ttl = 60000) {
    const cache = new Map();
    
    return function(...args) {
        const clave = JSON.stringify(args);
        const ahora = Date.now();
        
        if (cache.has(clave)) {
            const entrada = cache.get(clave);
            if (ahora - entrada.timestamp < ttl) {
                return entrada.valor;
            }
            cache.delete(clave);
        }
        
        const resultado = fn(...args);
        cache.set(clave, { valor: resultado, timestamp: ahora });
        return resultado;
    };
}

// Simular petición a API
const obtenerUsuario = memoizeConTTL(function(id) {
    console.log(`Buscando usuario ${id} en la base de datos...`);
    return { id, nombre: `Usuario ${id}` };
}, 5000);

console.log(obtenerUsuario(1)); // Busca en BD
console.log(obtenerUsuario(1)); // Usa cache
console.log(obtenerUsuario(2)); // Busca en BD (diferente ID)
```

---

## 6. Currying

El currying es una técnica donde una función con múltiples argumentos se transforma en una secuencia de funciones que reciben un solo argumento.

```javascript
// Sin curry
function sumar(a, b, c) {
    return a + b + c;
}
console.log(sumar(1, 2, 3)); // 6

// Con curry manual
function sumarCurry(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}
console.log(sumarCurry(1)(2)(3)); // 6

// Utility function para curry automático
function curry(fn) {
    const arity = fn.length;
    
    return function curried(...args) {
        if (args.length >= arity) {
            return fn(...args);
        }
        
        return function(...args2) {
            return curried(...args, ...args2);
        };
    };
}

const sumarCurried = curry(sumar);
console.log(sumarCurried(1)(2)(3));     // 6
console.log(sumarCurried(1, 2)(3));     // 6
console.log(sumarCurried(1)(2, 3));     // 6
console.log(sumarCurried(1, 2, 3));     // 6

// Ejemplos prácticos
function multiplicar(a, b) {
    return a * b;
}

const multiplicarCurried = curry(multiplicar);

// Crear funciones específicas
const duplicar = multiplicarCurried(2);
const triple = multiplicarCurried(3);

console.log(duplicar(5));  // 10
console.log(triple(5));    // 15

// Usar con map
const numeros = [1, 2, 3, 4, 5];
const dobles = numeros.map(multiplicarCurried(2));
console.log(dobles); // [2, 4, 6, 8, 10]

// Función de logging curryada
function log(level, modulo, mensaje) {
    console.log(`[${level}] [${modulo}] ${mensaje}`);
}

const logCurried = curry(log);
const logError = logCurried("ERROR");
const logErrorAuth = logCurried("ERROR")("Auth");

logError("DB")("Conexión fallida");
logErrorAuth("Token inválido");
```

### Currying con objetos

```javascript
function crearMensaje(tipo, destino, contenido) {
    return {
        tipo,
        destino,
        contenido,
        timestamp: new Date()
    };
}

const crearMensajeCurry = curry(crearMensaje);

const crearEmail = crearMensajeCurry("email");
const crearEmailAdmin = crearEmail("admin@empresa.com");

const email1 = crearEmailAdmin("Bienvenido al sistema");
const email2 = crearEmailAdmin("Tu contraseña ha cambiado");

console.log(email1);
console.log(email2);

// Construcción de consultas SQL (simulado)
function consultar(tabla, donde, ordenar) {
    return `SELECT * FROM ${tabla} WHERE ${donde} ORDER BY ${ordenar}`;
}

const consultarCurry = curry(consultar);
const consultarUsuarios = consultarCurry("usuarios");
const consultarUsuariosActivos = consultarUsuarios("activo = true");

console.log(consultarUsuariosActivos("nombre ASC"));
// "SELECT * FROM usuarios WHERE activo = true ORDER BY nombre ASC"
```

---

## 7. Partial Application

La partial application es similar al currying pero aplica varios argumentos de una vez y retorna una función que recibe el resto.

```javascript
// Partial application manual
function multiplicar(a, b) {
    return a * b;
}

// Crear una función parcial aplicando el primer argumento
const doble = multiplicar.bind(null, 2);
const triple = multiplicar.bind(null, 3);

console.log(doble(5));  // 10
console.log(triple(5)); // 15

// Utility para partial application
function partial(fn, ...argsAplicados) {
    return function(...argsRestantes) {
        return fn(...argsAplicados, ...argsRestantes);
    };
}

function log(level, modulo, mensaje) {
    console.log(`[${level}] [${modulo}] ${mensaje}`);
}

const logError = partial(log, "ERROR");
const logErrorDB = partial(log, "ERROR", "Database");

logError("Auth", "Fallo de autenticación");
logErrorDB("Conexión perdida");

// Partial con placeholders
const _ = null; // Placeholder

function placeholders(fn, ...args) {
    return function(...argsRestantes) {
        let argIndex = 0;
        const argsFinales = args.map(arg => {
            if (arg === null) {
                return argsRestantes[argIndex++];
            }
            return arg;
        });
        return fn(...argsFinales, ...argsRestantes.slice(argIndex));
    };
}

function registrar(usuario, accion, detalle) {
    console.log(`${usuario}: ${accion} - ${detalle}`);
}

const registrarAccion = placeholders(registrar, _, "LOGIN");
registrarAccion("Ana", "Exitoso"); // "Ana: LOGIN - Exitoso"

const registrarDetalle = placeholders(registrar, _, _, "detallado");
registrarDetalle("Carlos", "LOGOUT"); // "Carlos: LOGOUT - detallado"
```

---

## 8. IIFE (Immediately Invoked Function Expressions)

Una IIFE es una función que se ejecuta inmediatamente después de ser definida.

```javascript
// Sintaxis básica
(function() {
    console.log("Esto se ejecuta inmediatamente");
})();

// Con parámetros
(function(nombre) {
    console.log(`Hola, ${nombre}!`);
})("Ana"); // "Hola, Ana!"

// Con arrow functions
(() => {
    console.log("Arrow IIFE");
})();

// Retornar valor
const resultado = (function() {
    const privado = 42;
    return privado;
})();
console.log(resultado); // 42

// IIFE con async/await
(async () => {
    const datos = await fetch("https://api.ejemplo.com/datos");
    const json = await datos.json();
    console.log(json);
})();
```

### Patrones de uso de IIFE

```javascript
// 1. Crear scope privado
const contador = (function() {
    let count = 0; // Variable privada
    
    return {
        incrementar() { count++; },
        decrementar() { count--; },
        obtener() { return count; }
    };
})();

contador.incrementar();
contador.incrementar();
console.log(contador.obtener()); // 2
// console.log(count); // Error: count no está definido

// 2. Inicialización segura
const app = (function() {
    // Código de inicialización
    const config = {
        apiUrl: "https://api.ejemplo.com",
        timeout: 5000
    };
    
    // Configurar event listeners, etc.
    document.addEventListener("DOMContentLoaded", () => {
        console.log("App inicializada");
    });
    
    return { config };
})();

// 3. Evitar contaminación del scope global
(function() {
    const utilidadesPrivadas = {
        validarEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        formatearFecha(fecha) {
            return fecha.toLocaleDateString("es-ES");
        }
    };
    
    // Exponer solo lo necesario
    window.utilidades = utilidadesPrivadas;
})();

console.log(utilidades.validarEmail("test@test.com")); // true

// 4. Módulo con IIFE
const Carrito = (function() {
    let items = [];
    
    function agregar(item) {
        items.push(item);
        console.log(`Agregado: ${item.nombre}`);
    }
    
    function eliminar(indice) {
        const eliminado = items.splice(indice, 1);
        console.log(`Eliminado: ${eliminado[0]?.nombre}`);
    }
    
    function obtenerTotal() {
        return items.reduce((total, item) => total + item.precio, 0);
    }
    
    function vaciar() {
        items = [];
        console.log("Carrito vaciado");
    }
    
    return { agregar, eliminar, obtenerTotal, vaciar };
})();

Carrito.agregar({ nombre: "Laptop", precio: 999 });
Carrito.agregar({ nombre: "Mouse", precio: 25 });
console.log(Carrito.obtenerTotal()); // 1024
```

### IIFE asíncrona

```javascript
// Cargar datos al inicio
const DataService = (async function() {
    try {
        const response = await fetch("https://api.ejemplo.com/config");
        const config = await response.json();
        
        return {
            getConfig: () => config,
            getEndpoint: (key) => config.endpoints[key]
        };
    } catch (error) {
        console.error("Error cargando configuración:", error);
        return {
            getConfig: () => ({}),
            getEndpoint: () => ""
        };
    }
})();

// Inicialización con IIFE
(async () => {
    const usuarios = await fetch("https://api.ejemplo.com/usuarios");
    const lista = await usuarios.json();
    
    const container = document.getElementById("usuarios");
    lista.forEach(usuario => {
        const div = document.createElement("div");
        div.textContent = usuario.nombre;
        container.appendChild(div);
    });
})();
```

---

## Buenas prácticas

1. **Evitar recursión sin caso base**: Siempre incluye un caso base para evitar stack overflow.
2. **Usar memoización para funciones puras**: Solo memoize funciones sin efectos secundarios.
3. **Currying con moderación**: Úsalo cuando sea significativamente más legible, no porque sí.
4. **IIFE para encapsulamiento**: Úsalas para crear scope privado, no como sustituto de módulos.
5. **Callbacks con patrón error-first**: En código asíncrono, sigue el patrón `(error, resultado)`.
6. **Composición sobre herencia**: Prefiere componer funciones pequeñas sobre crear jerarquías complejas.
7. **Documentar funciones de orden superior**: Son poderosas pero pueden ser difíciles de entender.

---

## Ejercicios

### Ejercicio 1: Recursión básica (10 puntos)
1. Escribe una función recursiva `potencia(base, exponente)` que calcule la potencia sin usar `**` o `Math.pow`
2. Escribe una función recursiva `reversaString(str)` que invierta un string
3. Escribe una función recursiva `contarDigitos(n)` que cuente los dígitos de un número

### Ejercicio 2: Recursión avanzada (15 puntos)
1. Implementa una función `isPalindrome(str)` que verifique si un string es palíndromo usando recursión
2. Implementa una función `colisionarArray(arr)` que aplane un array anidado de profundidad arbitraria
3. Implementa una función `deepClone(obj)` que clone profundamente un objeto usando recursión

### Ejercicio 3: Funciones de orden superior (15 puntos)
1. Crea una función `crearPipeline(...fns)` que componga funciones de izquierda a derecha
2. Crea una función `debounce(fn, delay)` que retrase la ejecución
3. Crea una función `throttle(fn, limit)` que limite la frecuencia de ejecución

### Ejercicio 4: Currying y partial application (15 puntos)
1. Convierte la función `function buscar(texto, campo, idioma) { ... }` a formato curry
2. Usa currying para crear funciones `buscarEnNombre(texto)`, `buscarEnEmail(texto)` y `buscarEnTelefono(texto)`
3. Implementa una función `partial` que acepte placeholders (usando `_`)

### Ejercicio 5: Memoization (10 puntos)
1. Implementa una función `memoize` con soporte para TTL (time-to-live)
2. Crea una versión memoizada de una función que realice una "pesada" operación de cálculo
3. Compara el rendimiento con y sin memoization

### Ejercicio 6: IIFE y composición (15 puntos)
1. Crea un módulo `ConfigManager` usando IIFE que gestione configuración de aplicación
2. Implementa un sistema de logging con niveles usando composición de funciones
3. Crea una función que combine currying, memoization y composición para procesar datos

---

## Soluciones

### Solución Ejercicio 1

```javascript
// 1. Potencia recursiva
function potencia(base, exponente) {
    if (exponente === 0) return 1;
    if (exponente < 0) return 1 / potencia(base, -exponente);
    return base * potencia(base, exponente - 1);
}

console.log(potencia(2, 3));   // 8
console.log(potencia(5, 0));   // 1
console.log(potencia(2, -2));  // 0.25

// 2. Reversa string recursiva
function reversaString(str) {
    if (str.length <= 1) return str;
    return reversaString(str.substring(1)) + str[0];
}

console.log(reversaString("hola"));    // "aloh"
console.log(reversaString("level"));   // "level"
console.log(reversaString(""));        // ""

// 3. Contar dígitos
function contarDigitos(n) {
    n = Math.abs(n);
    if (n < 10) return 1;
    return 1 + contarDigitos(Math.floor(n / 10));
}

console.log(contarDigitos(12345)); // 5
console.log(contarDigitos(0));     // 1
console.log(contarDigitos(-99));   // 2
```

### Solución Ejercicio 2

```javascript
// 1. Palíndromo recursivo
function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    function helper(s, inicio, fin) {
        if (inicio >= fin) return true;
        if (s[inicio] !== s[fin]) return false;
        return helper(s, inicio + 1, fin - 1);
    }
    
    return helper(str, 0, str.length - 1);
}

console.log(isPalindrome("Anita lava la tina")); // true
console.log(isPalindrome("Hola"));               // false
console.log(isPalindrome("A man a plan a canal Panama")); // true

// 2. Colisionar array
function colisionarArray(arr) {
    const resultado = [];
    
    function helper(elemento) {
        if (Array.isArray(elemento)) {
            elemento.forEach(helper);
        } else {
            resultado.push(elemento);
        }
    }
    
    helper(arr);
    return resultado;
}

console.log(colisionarArray([1, [2, 3], [4, [5, [6]]]]));
// [1, 2, 3, 4, 5, 6]

// 3. Deep clone recursivo
function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    const clone = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}

const original = {
    nombre: "Ana",
    direccion: { ciudad: "Madrid", cp: "28001" },
    hobbies: ["leer", "correr"]
};

const copia = deepClone(original);
copia.direccion.ciudad = "Barcelona";
console.log(original.direccion.ciudad); // "Madrid" (sin cambios)
console.log(copia.direccion.ciudad);     // "Barcelona"
```

### Solución Ejercicio 3

```javascript
// 1. Pipeline de funciones
function crearPipeline(...fns) {
    return function(valor) {
        return fns.reduce((resultado, fn) => fn(resultado), valor);
    };
}

const procesarTexto = crearPipeline(
    str => str.trim(),
    str => str.toLowerCase(),
    str => str.replace(/\s+/g, "_"),
    str => `prefix_${str}`
);

console.log(procesarTexto("  Hola Mundo  ")); // "prefix_hola_mundo"

// 2. Debounce
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

function buscar(texto) {
    console.log(`Buscando: ${texto}`);
}

const buscarDebounced = debounce(buscar, 500);
buscarDebounced("a");
buscarDebounced("an");
buscarDebounced("ana"); // Solo este se ejecuta

// 3. Throttle
function throttle(fn, limit) {
    let enEjecucion = false;
    let ultimoArgs = null;
    
    return function(...args) {
        if (!enEjecucion) {
            fn.apply(this, args);
            enEjecucion = true;
            
            setTimeout(() => {
                enEjecucion = false;
                if (ultimoArgs) {
                    fn.apply(this, ultimoArgs);
                    ultimoArgs = null;
                }
            }, limit);
        } else {
            ultimoArgs = args;
        }
    };
}

function scroll() {
    console.log("Scroll procesado");
}

const scrollThrottled = throttle(scroll, 200);
// En un evento de scroll, solo se ejecuta cada 200ms
```

### Solución Ejercicio 4

```javascript
// 1. Función curryada
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        
        return function(...args2) {
            return curried(...args, ...args2);
        };
    };
}

function buscar(texto, campo, idioma) {
    return `Buscando "${texto}" en campo "${campo}" idioma "${idioma}"`;
}

const buscarCurry = curry(buscar);

// 2. Funciones específicas
const buscarEnNombre = buscarCurry(_, "nombre", "es");
const buscarEnEmail = buscarCurry(_, "email", "es");
const buscarEnTelefono = buscarCurry(_, "telefono", "es");

console.log(buscarEnNombre("Ana"));
// Buscando "Ana" en campo "nombre" idioma "es"

console.log(buscarEnEmail("ana@"));
// Buscando "ana@" en campo "email" idioma "es"

// 3. Partial con placeholders
const _ = null;

function partial(fn, ...args) {
    return function(...argsRestantes) {
        let argIndex = 0;
        const argsFinales = args.map(arg => {
            if (arg === null) {
                return argsRestantes[argIndex++];
            }
            return arg;
        });
        return fn(...argsFinales, ...argsRestantes.slice(argIndex));
    };
}

function sumar(a, b, c) {
    return a + b + c;
}

const sumarCon10 = partial(sumar, 10, null, null);
console.log(sumarCon10(5, 3)); // 18

const sumarCon10Y20 = partial(sumar, 10, 20, null);
console.log(sumarCon10Y20(5)); // 35
```

### Solución Ejercicio 5

```javascript
// 1. Memoize con TTL
function memoizeConTTL(fn, ttl = 60000) {
    const cache = new Map();
    
    return function(...args) {
        const clave = JSON.stringify(args);
        const ahora = Date.now();
        
        if (cache.has(clave)) {
            const entrada = cache.get(clave);
            if (ahora - entrada.timestamp < ttl) {
                return entrada.valor;
            }
            cache.delete(clave);
        }
        
        const resultado = fn(...args);
        cache.set(clave, { valor: resultado, timestamp: ahora });
        return resultado;
    };
}

// 2. Función pesada
function calcularComplejo(n) {
    console.log(`Calculando para ${n}...`);
    let resultado = 0;
    for (let i = 0; i < n * 1000000; i++) {
        resultado += Math.sqrt(i);
    }
    return resultado;
}

const calcularMemoizado = memoizeConTTL(calcularComplejo, 30000);

console.time("Sin memoización");
calcularComplejo(100);
console.timeEnd("Sin memoización");

console.time("Con memoización (primera vez)");
calcularMemoizado(100);
console.timeEnd("Con memoización (primera vez)");

console.time("Con memoización (segunda vez)");
calcularMemoizado(100);
console.timeEnd("Con memoización (segunda vez)");
```

### Solución Ejercicio 6

```javascript
// 1. ConfigManager con IIFE
const ConfigManager = (function() {
    let config = {};
    let listeners = [];
    
    function cargar() {
        const defaultConfig = {
            apiUrl: "https://api.ejemplo.com",
            timeout: 5000,
            reintentos: 3
        };
        
        const configGuardada = localStorage.getItem("appConfig");
        config = configGuardada ? { ...defaultConfig, ...JSON.parse(configGuardada) } : defaultConfig;
    }
    
    function guardar() {
        localStorage.setItem("appConfig", JSON.stringify(config));
        notificar();
    }
    
    function notificar() {
        listeners.forEach(listener => listener(config));
    }
    
    cargar();
    
    return {
        obtener(clave) {
            return config[clave];
        },
        actualizar(clave, valor) {
            config[clave] = valor;
            guardar();
        },
        escuchar(callback) {
            listeners.push(callback);
            return () => {
                listeners = listeners.filter(l => l !== callback);
            };
        }
    };
})();

ConfigManager.escuchar((config) => {
    console.log("Config actualizada:", config);
});

ConfigManager.actualizar("timeout", 10000);

// 2. Sistema de logging
function crearLogger(nivelMinimo) {
    function log(nivel, mensaje) {
        const niveles = { debug: 0, info: 1, warn: 2, error: 3 };
        if (niveles[nivel] >= niveles[nivelMinimo]) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] [${nivel.toUpperCase()}] ${mensaje}`);
        }
    }
    
    return {
        debug: (msg) => log("debug", msg),
        info: (msg) => log("info", msg),
        warn: (msg) => log("warn", msg),
        error: (msg) => log("error", msg)
    };
}

const logger = crearLogger("warn");
logger.debug("Mensaje debug"); // No se muestra
logger.info("Mensaje info");   // No se muestra
logger.warn("Mensaje warn");   // Se muestra
logger.error("Mensaje error"); // Se muestra

// 3. Combinación avanzada
function compose(...fns) {
    return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

function memoize(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) cache.set(key, fn(...args));
        return cache.get(key);
    };
}

function curry(fn) {
    const arity = fn.length;
    return function curried(...args) {
        if (args.length >= arity) return fn(...args);
        return (...args2) => curried(...args, ...args2);
    };
}

const procesarDatos = compose(
    memoize,
    curry((factor, arr) => arr.map(x => x * factor))
);

const duplicar = procesarDatos(2);
console.log(duplicar([1, 2, 3])); // [2, 4, 6]
console.log(duplicar([1, 2, 3])); // [2, 4, 6] (usa cache)
```
