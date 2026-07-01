# Lección 6: Funciones Básicas

## Objetivos de aprendizaje

- [ ] Declarar funciones con `function` y expresiones de función
- [ ] Entender parámetros, argumentos y valores de retorno
- [ ] Usar parámetros por defecto y argumentos variables
- [ ] Comprender el alcance (scope) de las variables
- [ ] Crear funciones flecha (arrow functions)

---

## 1. ¿Qué es una función?

Una función es un **bloque de código reutilizable** que realiza una tarea específica. Es como una "receta" que puede ejecutarse múltiples veces.

**Ventajas de las funciones:**
- **Reutilización:** Escribe una vez, usa muchas veces
- **Organización:** Divide el código en partes lógicas
- **Mantenimiento:** Cambia en un lugar, se actualiza en todas partes
- **Legibilidad:** Hace el código más fácil de entender

---

## 2. Declaración de función

```javascript
function saludar() {
    console.log("¡Hola, mundo!");
}

// Llamar (ejecutar) la función
saludar();  // "¡Hola, mundo!"
saludar();  // "¡Hola, mundo!" (se puede llamar muchas veces)
```

### Sintaxis

```javascript
function nombreFuncion(parametros) {
    // código a ejecutar
    return valorRetorno;  // opcional
}
```

---

## 3. Parámetros y argumentos

```javascript
// Parámetros: nombres en la definición
function sumar(a, b) {
    return a + b;
}

// Argumentos: valores reales al llamar
let resultado = sumar(3, 5);  // 8
```

### Múltiples parámetros

```javascript
function crearUsuario(nombre, edad, email) {
    return {
        nombre: nombre,
        edad: edad,
        email: email,
        activo: true
    };
}

let usuario = crearUsuario("Ana", 25, "ana@ejemplo.com");
console.log(usuario);
```

---

## 4. Valor de retorno

```javascript
// Con return
function sumar(a, b) {
    return a + b;
}

let resultado = sumar(3, 5);  // 8

// Sin return (retorna undefined)
function saludar() {
    console.log("Hola");
}

let valor = saludar();  // undefined
```

### Múltiples return (early return)

```javascript
function clasificarEdad(edad) {
    if (edad < 0) {
        return "Edad no válida";
    }

    if (edad < 18) {
        return "Menor de edad";
    }

    return "Mayor de edad";
}

console.log(clasificarEdad(-5));   // "Edad no válida"
console.log(clasificarEdad(15));   // "Menor de edad"
console.log(clasificarEdad(25));   // "Mayor de edad"
```

---

## 5. Parámetros por defecto

```javascript
function saludar(nombre = "Mundo") {
    console.log(`¡Hola, ${nombre}!`);
}

saludar();           // "¡Hola, Mundo!"
saludar("Ana");      // "¡Hola, Ana!"
```

### Parámetros por defecto con expresiones

```javascript
function crearUsuario(nombre, rol = "usuario", activo = true) {
    return { nombre, rol, activo };
}

console.log(crearUsuario("Ana"));
// { nombre: "Ana", rol: "usuario", activo: true }

console.log(crearUsuario("Carlos", "admin"));
// { nombre: "Carlos", rol: "admin", activo: true }
```

---

## 6. Argumentos variables (`arguments` y `...rest`)

### Objeto `arguments` (forma antigua)

```javascript
function sumar() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log(sumar(1, 2, 3));      // 6
console.log(sumar(1, 2, 3, 4));  // 10
```

### Parámetro `...rest` (forma moderna ✅)

```javascript
function sumar(...numeros) {
    return numeros.reduce((total, num) => total + num, 0);
}

console.log(sumar(1, 2, 3));      // 6
console.log(sumar(1, 2, 3, 4));  // 10
```

### `...rest` con otros parámetros

```javascript
function log(level, ...messages) {
    console.log(`[${level}]`, ...messages);
}

log("INFO", "Servidor iniciado", "Puerto 3000");
// [INFO] Servidor iniciado Puerto 3000
```

---

## 7. Expresiones de función

```javascript
// Declaración de función
function sumar(a, b) {
    return a + b;
}

// Expresión de función
const restar = function(a, b) {
    return a - b;
};

// Función anónima (se usa una vez)
setTimeout(function() {
    console.log("Después de 1 segundo");
}, 1000);
```

### Diferencia entre declaración y expresión

```javascript
// ✅ La declaración se "eleva" (hoisting) - se puede llamar antes de definirla
console.log(saludar());  // Funciona
function saludar() { return "Hola"; }

// ❌ La expresión NO se eleva - da error si se llama antes
console.log(despedir());  // Error
const despedir = function() { return "Adiós"; };
```

---

## 8. Funciones flecha (Arrow functions)

```javascript
// Sintaxis completa
const sumar = (a, b) => {
    return a + b;
};

// Sintaxis concisa (una sola expresión)
const sumar2 = (a, b) => a + b;

// Un solo parámetro (paréntesis opcional)
const duplicar = x => x * 2;

// Sin parámetros
const saludar = () => "¡Hola!";

// Retornar un objeto
const crearUsuario = (nombre, edad) => ({ nombre, edad });
```

### Comparación de sintaxis

```javascript
// Función tradicional
function sumar(a, b) {
    return a + b;
}

// Arrow function
const sumar = (a, b) => a + b;

// Función tradicional con un parámetro
function duplicar(x) {
    return x * 2;
}

// Arrow function con un parámetro
const duplicar = x => x * 2;

// Función tradicional sin parámetros
function decirHola() {
    return "¡Hola!";
}

// Arrow function sin parámetros
const decirHola = () => "¡Hola!";
```

### Arrow functions con arrays

```javascript
let numeros = [1, 2, 3, 4, 5];

// map - transforma cada elemento
let dobles = numeros.map(n => n * 2);
console.log(dobles);  // [2, 4, 6, 8, 10]

// filter - filtra elementos
let pares = numeros.filter(n => n % 2 === 0);
console.log(pares);  // [2, 4]

// reduce - acumula un valor
let suma = numeros.reduce((total, n) => total + n, 0);
console.log(suma);  // 15
```

---

## 9. Alcance de variables (Scope)

### Alcance de bloque (block scope)

```javascript
if (true) {
    let x = 10;
    var y = 20;
}

// console.log(x);  // Error: x no está definida
console.log(y);     // 20 (var ignora el bloque)
```

### Alcance de función (function scope)

```javascript
function ejemplo() {
    let local = "Soy local";
    var tambienLocal = "También soy local";
}

// console.log(local);        // Error
// console.log(tambienLocal); // Error
```

### Alcance global

```javascript
let global = "Soy global";

function miFuncion() {
    console.log(global);  // Accede al global
}

miFuncion();  // "Soy global"
```

### Closures (introducción)

```javascript
function crearContador() {
    let contador = 0;

    return function() {
        contador++;
        return contador;
    };
}

const contador = crearContador();
console.log(contador());  // 1
console.log(contador());  // 2
console.log(contador());  // 3
```

---

## 10. Buenas prácticas

1. **Nombra las funciones descriptivamente:** `calcularTotal()` en vez de `calc()`
2. **Una función, una responsabilidad:** No hagas demasiado en una función
3. **Usa parámetros por defecto** en lugar de verificar `undefined`
4. **Prefiere arrow functions** para callbacks y funciones simples
5. **Evita efectos secundarios** cuando sea posible
6. **Limita el número de parámetros** (máximo 3-4)

```javascript
// ✅ Buen código
function calcularTotal(conImpuestos = false) {
    let subtotal = items.reduce((sum, item) => sum + item.precio, 0);
    return conImpuestos ? subtotal * 1.21 : subtotal;
}

// ❌ Mal código
function calc(a, b, c, d, e, f) {
    // Demasiados parámetros, nombre poco claro
}
```

---

## Resumen

- Las funciones son bloques de código reutilizables
- Se declaran con `function` o como expresiones de función
- Las arrow functions (`=>`) son más concisas
- Los parámetros por defecto simplifican las llamadas
- `...rest` recoge argumentos variables en un array
- Las variables tienen alcance de bloque (`let`, `const`) o de función (`var`)
- Las closures permiten a las funciones "recordar" su alcance original

---

## Ejercicios

### Ejercicio 1 (Básico) — 1 punto
**Primera función**

Crea una función `saludar(nombre)` que retorne "¡Hola, [nombre]!".

### Ejercicio 2 (Básico) — 2 puntos
**Calculadora**

Crea funciones para las 4 operaciones básicas:
- `sumar(a, b)`
- `restar(a, b)`
- `multiplicar(a, b)`
- `dividir(a, b)` (manejar división por cero)

### Ejercicio 3 (Intermedio) — 2 puntos
**Parámetros por defecto**

Crea una función `crearPerfil(nombre, edad = 18, rol = "usuario")` que retorne un objeto con el perfil.

### Ejercicio 4 (Intermedio) — 2 puntos
**Arrow functions**

Convierte las siguientes funciones a arrow functions:
```javascript
function cuadrado(x) {
    return x * x;
}

function esPar(numero) {
    return numero % 2 === 0;
}

function repetir(texto, veces) {
    let resultado = "";
    for (let i = 0; i < veces; i++) {
        resultado += texto;
    }
    return resultado;
}
```

### Ejercicio 5 (Avanzado) — 3 puntos
**Closure: generador de IDs**

Crea una función `crearGeneradorID()` que retorne una función. Cada vez que se llame la función retornada, debe devolver un ID incremental (1, 2, 3, ...).

### Ejercicio 6 (Práctico) — 3 puntos
**Procesador de texto**

Crea un conjunto de funciones para procesar texto:
1. `contarPalabras(texto)` — Retorna el número de palabras
2. `contarVocales(texto)` — Retorna el número de vocales
3. `convertirAMayusculas(texto)` — Retorna el texto en mayúsculas
4. `reemplazarPalabra(texto, vieja, nueva)` — Reemplaza una palabra por otra

---

## Soluciones

### Solución Ejercicio 1
```javascript
function saludar(nombre) {
    return `¡Hola, ${nombre}!`;
}

console.log(saludar("Ana"));  // "¡Hola, Ana!"
```

### Solución Ejercicio 2
```javascript
function sumar(a, b) { return a + b; }
function restar(a, b) { return a - b; }
function multiplicar(a, b) { return a * b; }

function dividir(a, b) {
    if (b === 0) {
        return "Error: División por cero";
    }
    return a / b;
}

console.log(sumar(10, 5));       // 15
console.log(restar(10, 5));      // 5
console.log(multiplicar(10, 5)); // 50
console.log(dividir(10, 5));     // 2
console.log(dividir(10, 0));     // "Error: División por cero"
```

### Solución Ejercicio 3
```javascript
function crearPerfil(nombre, edad = 18, rol = "usuario") {
    return {
        nombre,
        edad,
        rol,
        activo: true,
        fechaCreacion: new Date().toISOString()
    };
}

console.log(crearPerfil("Ana"));
// { nombre: "Ana", edad: 18, rol: "usuario", activo: true, fechaCreacion: "..." }

console.log(crearPerfil("Carlos", 30, "admin"));
// { nombre: "Carlos", edad: 30, rol: "admin", activo: true, fechaCreacion: "..." }
```

### Solución Ejercicio 4
```javascript
const cuadrado = x => x * x;
const esPar = numero => numero % 2 === 0;
const repetir = (texto, veces) => texto.repeat(veces);

console.log(cuadrado(5));          // 25
console.log(esPar(4));             // true
console.log(repetir("Hola", 3));   // "HolaHolaHola"
```

### Solución Ejercicio 5
```javascript
function crearGeneradorID() {
    let id = 0;

    return function() {
        id++;
        return id;
    };
}

const generarID = crearGeneradorID();
console.log(generarID());  // 1
console.log(generarID());  // 2
console.log(generarID());  // 3
```

### Solución Ejercicio 6
```javascript
function contarPalabras(texto) {
    return texto.trim().split(/\s+/).length;
}

function contarVocales(texto) {
    let vocales = texto.match(/[aeiouáéíóú]/gi);
    return vocales ? vocales.length : 0;
}

function convertirAMayusculas(texto) {
    return texto.toUpperCase();
}

function reemplazarPalabra(texto, vieja, nueva) {
    return texto.replace(new RegExp(vieja, "gi"), nueva);
}

// Pruebas
let texto = "JavaScript es un lenguaje de programación increíble";
console.log(contarPalabras(texto));           // 7
console.log(contarVocales(texto));            // 14
console.log(convertirAMayusculas(texto));     // "JAVASCRIPT ES UN LENGUAJE DE PROGRAMACIÓN INCREÍBLE"
console.log(reemplazarPalabra(texto, "increíble", "fantástico"));  // "JavaScript es un lenguaje de programación fantástico"
```
