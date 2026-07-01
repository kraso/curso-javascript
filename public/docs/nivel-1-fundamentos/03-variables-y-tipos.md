# Lección 3: Variables y Tipos de Datos

## Objetivos de aprendizaje

- [ ] Declarar variables con `let`, `const` y `var`
- [ ] Entender las diferencias entre `let`, `const` y `var`
- [ ] Conocer los tipos de datos primitivos de JavaScript
- [ ] Usar el operador `typeof` para verificar tipos
- [ ] Aplicar buenas prácticas de nomenclatura

---

## 1. ¿Qué es una variable?

Una variable es un **"almacén con un nombre"** para guardar datos. Es como una caja etiquetada que contiene un valor.

```javascript
let mensaje;           // Declara una variable llamada mensaje
mensaje = "Hola";      // Asigna el valor "Hola"

let edad = 25;         // Declara y asigna en una línea
let nombre = "Ana";    // Declara una variable con texto
```

---

## 2. Declarando variables: `let`, `const`, `var`

### `let` — Declaración moderna (recomendada)

```javascript
let nombre = "Carlos";
let edad = 30;
let activo = true;

// Permite reasignación
nombre = "María";  // ✅ Válido
```

### `const` — Constante (no se puede reasignar)

```javascript
const PI = 3.14159;
const MAX_USUARIOS = 100;

// PI = 3.14;  // ❌ Error: no se puede reasignar una constante
```

### `var` — Declaración antigua (evitar usar)

```javascript
var antiguo = "No usar esto";
// var tiene un alcance de función, no de bloque
```

### Comparación

| Característica | `let` | `const` | `var` |
|----------------|-------|---------|-------|
| Reasignación | ✅ Sí | ❌ No | ✅ Sí |
| Alcance | Bloque | Bloque | Función |
| Hoisting | Temporal | Temporal | Definido |
| Uso recomendado | Variables que cambian | Constantes | Evitar |

---

## 3. Tipos de datos primitivos

JavaScript tiene **8 tipos de datos básicos**:

### 3.1 `number` — Números

```javascript
let entero = 42;
let decimal = 3.14;
let negativo = -100;
let infinito = Infinity;
let noEsNumero = NaN;  // Resultado de operación matemática inválida

console.log(1 / 0);        // Infinity
console.log("texto" / 2);  // NaN
console.log(NaN + 1);      // NaN (se propaga)
```

### 3.2 `bigint` — Números enteros grandes

```javascript
let grande = 9007199254740991n;  // Agregar 'n' al final
let grande2 = BigInt(9007199254740991);

// El tipo 'number' pierde precisión con números muy grandes
console.log(9007199254740991 + 1);  // 9007199254740992
console.log(9007199254740991 + 2);  // 9007199254740992 (¡igual!)
```

### 3.3 `string` — Cadenas de texto

```javascript
let nombre = "Ana";              // Comillas dobles
let apellido = 'García';         // Comillas simples
let saludo = `Hola, ${nombre}`;  // Backticks (plantillas literales)

// Plantillas literales permiten incrustar expresiones
let edad = 25;
let mensaje = `Tengo ${edad} años y el明年 tendré ${edad + 1}`;
console.log(mensaje);  // "Tengo 25 años y el明年 tendré 26"
```

### 3.4 `boolean` — Verdadero o falso

```javascript
let esMayor = true;
let esMenor = false;
let resultado = 5 > 3;  // true

// Útil para condiciones
if (esMayor) {
    console.log("Es mayor de edad");
}
```

### 3.5 `null` — Valor vacío o desconocido

```javascript
let usuario = null;  // El valor es "desconocido" o "vacío"

// null representa la ausencia intencional de un valor
```

### 3.6 `undefined` — Valor no asignado

```javascript
let nombre;  // Declara pero no asigna
console.log(nombre);  // undefined

// undefined es el valor por defecto de una variable sin asignar
```

### 3.7 `symbol` — Identificador único

```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2);  // false (cada Symbol es único)
```

### 3.8 `object` — Estructuras de datos complejas

```javascript
let persona = {
    nombre: "Ana",
    edad: 25,
    activo: true
};

// Los objetos se estudiarán en detalle en niveles posteriores
```

---

## 4. El operador `typeof`

`typeof` devuelve el tipo de dato de un valor:

```javascript
typeof 42          // "number"
typeof 3.14        // "number"
typeof 123n        // "bigint"
typeof "Hola"      // "string"
typeof true        // "boolean"
typeof null        // "object"  ← ¡Error conocido en el lenguaje!
typeof undefined   // "undefined"
typeof Symbol("x") // "symbol"
typeof {}          // "object"
typeof []          // "object"
typeof function(){} // "function"
```

> **Nota:** `typeof null` devuelve `"object"` por razones históricas, pero `null` no es un objeto.

---

## 5. Conversión de tipos

### Conversión explícita

```javascript
// A número
Number("123")      // 123
Number("abc")      // NaN
Number(true)       // 1
Number(false)      // 0
Number(null)       // 0
Number(undefined)  // NaN
parseInt("42px")   // 42
parseFloat("3.14") // 3.14

// A cadena de texto
String(123)        // "123"
String(true)       // "true"
String(null)       // "null"

// A booleano
Boolean(1)         // true
Boolean(0)         // false
Boolean("")        // false
Boolean("Hola")    // true
Boolean(null)      // false
Boolean(undefined) // false
```

### Conversión implícita

```javascript
// El operador + convierte a cadena si uno de los operandos es texto
console.log("5" + 3);      // "53" (concatenación)
console.log("5" - 3);      // 2 (operación matemática)
console.log("5" * 2);      // 10
console.log(true + 1);     // 2
console.log(false + "1");  // "false1"
```

---

## 6. Nomenclatura de variables

### Reglas obligatorias

```javascript
let nombre;      // ✅ Válido
let _nombre;     // ✅ Válido
let $nombre;     // ✅ Válido
let nombre1;     // ✅ Válido

// let 1nombre;  // ❌ No puede empezar con número
// let mi-nombre; // ❌ No se permiten guiones
// let let;       // ❌ Palabra reservada
```

### Convenciones (camelCase)

```javascript
let nombreUsuario = "Ana";     // ✅ camelCase (recomendado)
let NombreUsuario = "Ana";     // ✅ PascalCase (para clases)
let nombre_usuario = "Ana";    // ✅ snake_case (Python)
let NOMBRE_USUARIO = "ANA";    // ✅ SCREAMING_SNAKE (constantes)

// Evitar nombres poco descriptivos
// let x = "Ana";             // ❌ Mal
// let data = "Ana";          // ❌ Mal
let nombre = "Ana";           // ✅ Bueno
```

### Palabras reservadas (no se pueden usar como variables)

```
abstract, arguments, async, await, boolean, break, byte, case, catch, char,
class, const, continue, debugger, default, delete, do, double, else, enum,
eval, export, extends, false, final, finally, float, for, function, goto,
if, implements, import, in, instanceof, int, interface, let, long, native,
new, null, package, private, protected, public, return, short, static,
super, switch, synchronized, this, throw, throws, transient, true, try,
typeof, undefined, var, void, volatile, while, with, yield
```

---

## 7. Buenas prácticas

1. **Usa `const` por defecto** — Cambia a `let` solo si necesitas reasignar
2. **Evita `var`** — Tiene un alcance confuso
3. **Nombra descriptivamente** — `edadUsuario` en vez de `eu`
4. **Una variable por línea** — Mejora la legibilidad
5. **Usa mayúsculas** solo para constantes `SCREAMING_SNAKE`

```javascript
// ✅ Buen código
const MAX_INTENTOS = 3;
let contador = 0;
let nombreUsuario = "Ana";

// ❌ Mal código
var x = 3;
var Contador = 0;
var n = "Ana";
```

---

## Resumen

- **`let`** declara una variable que puede ser reasignada
- **`const`** declara una constante que no puede ser reasignada
- **`var`** es la forma antigua, evita usarla
- Los tipos primitivos son: `number`, `bigint`, `string`, `boolean`, `null`, `undefined`, `symbol`, `object`
- `typeof` te dice el tipo de un valor
- JavaScript es **débilmente tipado** — las variables no tienen tipo fijo

---

## Ejercicios

### Ejercicio 1 (Básico) — 1 punto
**Identifica tipos**

¿Cuál es el resultado de `typeof` para cada valor?
```javascript
typeof 42
typeof "Hola"
typeof true
typeof null
typeof undefined
typeof [1, 2, 3]
```

### Ejercicio 2 (Básico) — 2 puntos
**Declaración de variables**

Declara variables para almacenar:
- Tu nombre (string)
- Tu edad (number)
- Si eres estudiante (boolean)
- La cantidad de cursos que has tomado (number)

Usa `let` o `const` según corresponda.

### Ejercicio 3 (Intermedio) — 2 puntos
**Conversión de tipos**

¿Cuál es el resultado de cada expresión? Explica por qué:
```javascript
"10" + 5
"10" - 5
true + 1
false + ""
Number("123abc")
parseInt("42.5")
```

### Ejercicio 4 (Intermedio) — 2 puntos
**Error de JavaScript**

Explica por qué `typeof null` devuelve `"object"` y no `"null"`. Investiga la razón histórica.

### Ejercicio 5 (Avanzado) — 3 puntos
**Detectar tipo personalizado**

Crea una función `detectarTipo(valor)` que:
1. Devuelva el tipo real de cualquier valor (incluyendo arrays y funciones)
2. Para arrays, devuelva "array" en lugar de "object"
3. Para funciones, devuelva "function"

```javascript
// Pruebas esperadas:
detectarTipo(42)        // "number"
detectarTipo("Hola")    // "string"
detectarTipo([1, 2, 3]) // "array"
detectarTipo(null)      // "null"
```

### Ejercicio 6 (Práctico) — 3 puntos
**Calculadora de propinas**

Crea un script que:
1. Pida el monto de la cuenta con `prompt()`
2. Pida el porcentaje de propina (10%, 15%, 20%)
3. Calcule la propina y el total
4. Muestre los resultados con formato: "Propina: $X.XX | Total: $X.XX"

---

## Soluciones

### Solución Ejercicio 1
```javascript
typeof 42          // "number"
typeof "Hola"      // "string"
typeof true        // "boolean"
typeof null        // "object"  ← Error histórico de JavaScript
typeof undefined   // "undefined"
typeof [1, 2, 3]   // "object"
```

### Solución Ejercicio 2
```javascript
const nombre = "Tu Nombre";
const edad = 25;
let esEstudiante = true;
let cursosCompletados = 5;
```

### Solución Ejercicio 3
```javascript
"10" + 5      // "105" → Concatenación (string + number = string)
"10" - 5      // 5 → Resta (convierte "10" a número)
true + 1      // 2 → true se convierte a 1
false + ""    // "false" → Concatenación
Number("123abc") // NaN → No se puede convertir completamente
parseInt("42.5") // 42 → Trunca el decimal
```

### Solución Ejercicio 4
`typeof null` devuelve `"object"` por un error en la implementación original de JavaScript. En los primeros días del lenguaje, los valores se representaban con un prefijo de tipo de 3 bits, y `null` (representado como puntero nulo `0x00`) coincidía con el prefijo de `"object"`. Corregir esto rompería la compatibilidad con código antiguo.

### Solución Ejercicio 5
```javascript
function detectarTipo(valor) {
    if (valor === null) return "null";
    if (Array.isArray(valor)) return "array";
    return typeof valor;
}

// Pruebas
console.log(detectarTipo(42));        // "number"
console.log(detectarTipo("Hola"));    // "string"
console.log(detectarTipo([1, 2, 3])); // "array"
console.log(detectarTipo(null));      // "null"
```

### Solución Ejercicio 6
```javascript
let cuenta = parseFloat(prompt("Monto de la cuenta:"));
let porcentaje = parseInt(prompt("Porcentaje de propina (10, 15 o 20):"));

let propina = cuenta * (porcentaje / 100);
let total = cuenta + propina;

console.log(`Propina: $${propina.toFixed(2)} | Total: $${total.toFixed(2)}`);
alert(`Propina: $${propina.toFixed(2)} | Total: $${total.toFixed(2)}`);
```
