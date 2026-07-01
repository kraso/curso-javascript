# Lección 4: Operadores

## Objetivos de aprendizaje

- [ ] Conocer todos los operadores aritméticos de JavaScript
- [ ] Entender la precedencia de operadores
- [ ] Dominar la concatenación de cadenas
- [ ] Usar operadores de asignación y actualización
- [ ] Comprender la conversión de tipos con operadores

---

## 1. Terminología básica

- **Operando:** Es a lo que se aplican los operadores. En `5 * 2`, los operandos son `5` y `2`.
- **Operador unario:** Tiene un solo operando. Ej: `-x` (negación)
- **Operador binario:** Tiene dos operandos. Ej: `x + y` (suma)

```javascript
// Unario
let x = 1;
x = -x;  // -1 (negación unaria)

// Binario
let y = 3;
console.log(y - x);  // 4 (resta binaria)
```

---

## 2. Operadores aritméticos

| Operador | Nombre | Ejemplo | Resultado |
|----------|--------|---------|-----------|
| `+` | Suma | `5 + 3` | `8` |
| `-` | Resta | `5 - 3` | `2` |
| `*` | Multiplicación | `5 * 3` | `15` |
| `/` | División | `6 / 3` | `2` |
| `%` | Resto (módulo) | `7 % 3` | `1` |
| `**` | Exponenciación | `2 ** 3` | `8` |

### Ejemplos

```javascript
// Suma
console.log(10 + 5);    // 15

// Resta
console.log(10 - 5);    // 5

// Multiplicación
console.log(10 * 5);    // 50

// División
console.log(10 / 5);    // 2

// Resto
console.log(10 % 3);    // 1 (10 ÷ 3 = 3, sobra 1)
console.log(8 % 4);     // 0 (división exacta)

// Exponenciación
console.log(2 ** 10);   // 1024
console.log(4 ** 0.5);  // 2 (raíz cuadrada)
console.log(8 ** (1/3)); // 2 (raíz cúbica)
```

---

## 3. Concatenación de cadenas

El operador `+` también se usa para unir cadenas de texto:

```javascript
let nombre = "Ana";
let saludo = "Hola, " + nombre;
console.log(saludo);  // "Hola, Ana"

// Concatenación con números
console.log("Edad: " + 25);  // "Edad: 25"
console.log("1" + 2);        // "12" (¡cuidado!)
console.log(1 + "2");        // "12" (¡cuidado!)
```

### ¡Cuidado con el orden!

```javascript
// Los operadores se evalúan de izquierda a derecha
console.log(2 + 2 + "1");  // "41" (2+2=4, luego 4+"1"="41")
console.log("1" + 2 + 2);  // "122" ("1"+2="12", luego "12"+2="122")
```

---

## 4. El operador unario `+`

Convierte un valor a número:

```javascript
// Sin efecto en números
let x = 1;
console.log(+x);      // 1

// Convierte cadenas a números
console.log(+"42");    // 42
console.log(+"3.14");  // 3.14
console.log(+"");      // 0
console.log(+"abc");   // NaN

// Convierte booleanos
console.log(+true);    // 1
console.log(+false);   // 0
```

### Uso práctico

```javascript
let manzanas = "5";
let naranjas = "3";

// Sin conversión (concatena como strings)
console.log(manzanas + naranjas);  // "53"

// Con conversión (suma como números)
console.log(+manzanas + +naranjas);  // 8

// Alternativa con Number()
console.log(Number(manzanas) + Number(naranjas));  // 8
```

---

## 5. Precedencia de operadores

La precedencia define el orden en que se evalúan los operadores:

| Precedencia | Operador | Descripción |
|-------------|----------|-------------|
| 16 | `()` | Agrupación |
| 15 | `**` | Exponenciación |
| 14 | `+` `-` (unarios) | Negación, suma unaria |
| 13 | `*` `/` `%` | Multiplicación, división, resto |
| 12 | `+` `-` | Suma, resta |
| 11 | `<` `>` `<=` `>=` | Comparación |
| 10 | `==` `!=` `===` `!==` | Igualdad |
| 3 | `=` `+=` `-=` etc. | Asignación |

```javascript
// Multiplicación antes que suma
console.log(2 + 3 * 4);   // 14 (no 20)

// Usar paréntesis para cambiar el orden
console.log((2 + 3) * 4); // 20

// Exponenciación antes que multiplicación
console.log(2 * 3 ** 2);  // 18 (2 * 9, no 6²)
```

---

## 6. Asignación

### Asignación simple

```javascript
let x = 10;
```

### Asignación con operación

```javascript
let n = 5;
n += 3;   // n = 8 (equivalente a n = n + 3)
n -= 2;   // n = 6
n *= 4;   // n = 24
n /= 6;   // n = 4
n %= 3;   // n = 1
n **= 2;  // n = 1
```

### Asignación encadenada

```javascript
let a, b, c;
a = b = c = 5;  // a=5, b=5, c=5
```

### `=` devuelve un valor

```javascript
let x, y;
x = (y = 10);  // x=10, y=10
```

---

## 7. Incremento y decremento

```javascript
let contador = 0;

// Incremento
contador++;        // Post-incremento: usa el valor y luego incrementa
++contador;        // Pre-incremento: incrementa y luego usa el valor
contador += 1;     // Forma alternativa

// Decremento
contador--;        // Post-decremento
--contador;        // Pre-decremento
contador -= 1;     // Forma alternativa
```

### Diferencia entre pre y post

```javascript
let a = 5;
let b = a++;  // b=5, luego a=6 (post-incremento)
console.log(a, b);  // 6, 5

let c = 5;
let d = ++c;  // c=6, luego d=6 (pre-incremento)
console.log(c, d);  // 6, 6
```

---

## 8. Operadores de comparación

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `==` | Igualdad (con conversión) | `5 == "5"` → `true` |
| `===` | Igualdad estricta (sin conversión) | `5 === "5"` → `false` |
| `!=` | Desigualdad (con conversión) | `5 != "5"` → `false` |
| `!==` | Desigualdad estricta (sin conversión) | `5 !== "5"` → `true` |
| `>` | Mayor que | `5 > 3` → `true` |
| `<` | Menor que | `5 < 3` → `false` |
| `>=` | Mayor o igual que | `5 >= 5` → `true` |
| `<=` | Menor o igual que | `5 <= 3` → `false` |

> **Recomendación:** Siempre usa `===` y `!==` para evitar errores de conversión.

```javascript
// ⚠️ Cuidado con == (convierte tipos)
console.log(0 == "");      // true
console.log(0 == false);   // true
console.log("" == false);  // true
console.log(null == undefined); // true

// ✅ Usa === para comparaciones seguras
console.log(0 === "");      // false
console.log(0 === false);   // false
console.log("" === false);  // false
console.log(null === undefined); // false
```

---

## 9. Operadores lógicos

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `&&` | AND lógico | `true && false` → `false` |
| `\|\|` | OR lógico | `true \|\| false` → `true` |
| `!` | NOT lógico | `!true` → `false` |
| `??` | Nullish coalescing | `null ?? "default"` → `"default"` |

### Tabla de verdad AND (`&&`)

| A | B | A && B |
|---|---|--------|
| true | true | true |
| true | false | false |
| false | true | false |
| false | false | false |

### Tabla de verdad OR (`||`)

| A | B | A \|\| B |
|---|---|----------|
| true | true | true |
| true | false | true |
| false | true | true |
| false | false | false |

### Ejemplos

```javascript
// AND - ambas deben ser verdaderas
console.log(true && true);    // true
console.log(true && false);   // false

// OR - al menos una debe ser verdadera
console.log(false || true);   // true
console.log(false || false);  // false

// NOT - invierte el valor
console.log(!true);           // false
console.log(!false);          // true

// Nullish coalescing (??)
let usuario = null;
let nombre = usuario ?? "Anónimo";
console.log(nombre);  // "Anónimo"

let edad = 0;
let EdadDefault = edad ?? 18;
console.log(EdadDefault);  // 0 (no usa el default porque 0 no es null/undefined)
```

---

## 10. Operador condicional (ternario)

```javascript
// condición ? valorSiVerdadero : valorSiFalso

let edad = 20;
let estado = edad >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(estado);  // "Mayor de edad"

// Equivalente con if-else
if (edad >= 18) {
    estado = "Mayor de edad";
} else {
    estado = "Menor de edad";
}
```

---

## Resumen

- Los operadores aritméticos son: `+`, `-`, `*`, `/`, `%`, `**`
- `+` también concatena cadenas — ¡cuidado con el orden!
- `+` unario convierte a número
- Siempre usa `===` y `!==` para comparaciones
- `&&` (AND), `||` (OR), `!` (NOT) son operadores lógicos
- `??` (nullish coalescing) retorna el valor derecho solo si el izquierdo es `null` o `undefined`
- El ternario `? :` es un `if-else` compacto

---

## Ejercicios

### Ejercicio 1 (Básico) — 1 punto
**Calcula el resultado**

¿Cuál es el resultado de cada expresión?
```javascript
10 + 5 * 2
(10 + 5) * 2
2 ** 3 ** 2
10 % 3
```

### Ejercicio 2 (Básico) — 2 puntos
**Concatenación**

¿Cuál es el resultado?
```javascript
"Edad: " + 25
"1" + 2 + 3
1 + 2 + "3"
true + 1
false + ""
```

### Ejercicio 3 (Intermedio) — 2 puntos
**Comparaciones**

Explica por qué cada expresión tiene ese resultado:
```javascript
0 == ""
0 === ""
null == undefined
null === undefined
"5" > "10"
```

### Ejercicio 4 (Intermedio) — 2 puntos
**Conversión implícita**

¿Cuál es el resultado? Explica la conversión que ocurre:
```javascript
"5" - 3
"5" + 3
true * 2
false + "1"
null + 1
```

### Ejercicio 5 (Avanzado) — 3 puntos
**Operador ternario anidado**

Dada una puntuación del 0 al 100, asigna una calificación:
- 90-100: "Sobresaliente"
- 80-89: "Notable"
- 70-79: "Bien"
- 60-69: "Suficiente"
- 0-59: "Insuficiente"

Escribe la expresión usando el operador ternario.

### Ejercicio 6 (Práctico) — 3 puntos
**Conversor de temperatura**

Crea una función que convierta grados Celsius a Fahrenheit usando la fórmula: `F = C × 9/5 + 32`

1. Pide la temperatura en Celsius
2. Calcula Fahrenheit
3. Muestra el resultado con un mensaje descriptivo

---

## Soluciones

### Solución Ejercicio 1
```javascript
10 + 5 * 2      // 20 (multiplicación primero)
(10 + 5) * 2    // 30 (paréntesis primero)
2 ** 3 ** 2      // 512 (2^(3^2) = 2^9 = 512)
10 % 3           // 1 (10 ÷ 3 = 3, sobra 1)
```

### Solución Ejercicio 2
```javascript
"Edad: " + 25   // "Edad: 25" (concatenación)
"1" + 2 + 3     // "123" (izquierda a derecha)
1 + 2 + "3"     // "33" (1+2=3, luego 3+"3"="33")
true + 1        // 2 (true se convierte a 1)
false + ""      // "false" (false se convierte a "false")
```

### Solución Ejercicio 3
```javascript
0 == ""         // true (ambos se convierten a 0)
0 === ""        // false (tipos diferentes)
null == undefined  // true (tratamiento especial de ==)
null === undefined // false (tipos diferentes)
"5" > "10"      // false (comparación lexicográfica: "5" > "1")
```

### Solución Ejercicio 4
```javascript
"5" - 3    // 2 (convierte "5" a número)
"5" + 3    // "53" (concatena porque el primer operando es string)
true * 2   // 2 (true se convierte a 1)
false + "1" // "false1" (false se convierte a "false")
null + 1   // 1 (null se convierte a 0)
```

### Solución Ejercicio 5
```javascript
let puntuacion = 85;
let calificacion = puntuacion >= 90 ? "Sobresaliente" :
                   puntuacion >= 80 ? "Notable" :
                   puntuacion >= 70 ? "Bien" :
                   puntuacion >= 60 ? "Suficiente" :
                   "Insuficiente";

console.log(calificacion);  // "Notable"
```

### Solución Ejercicio 6
```javascript
function convertirTemperatura(celsius) {
    let fahrenheit = celsius * 9/5 + 32;
    return `${celsius}°C equivalen a ${fahrenheit.toFixed(1)}°F`;
}

let celsius = parseFloat(prompt("Temperatura en Celsius:"));
console.log(convertirTemperatura(celsius));
alert(convertirTemperatura(celsius));
```
