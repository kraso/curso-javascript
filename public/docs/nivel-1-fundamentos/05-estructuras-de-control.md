# Lección 5: Estructuras de Control

## Objetivos de aprendizaje

- [ ] Usar condicionales `if`, `else if`, `else`
- [ ] Implementar `switch` para múltiples condiciones
- [ ] Crear bucles `for`, `while`, `do...while`
- [ ] Usar `break` y `continue` para controlar el flujo
- [ ] Combinar condicionales y bucles en problemas reales

---

## 1. Condicionales

### 1.1 `if` — Ejecutar si es verdadero

```javascript
let edad = 20;

if (edad >= 18) {
    console.log("Eres mayor de edad");
}
```

### 1.2 `if...else` — Dos caminos

```javascript
let hora = 14;

if (hora < 12) {
    console.log("Buenos días");
} else {
    console.log("Buenas tardes");
}
```

### 1.3 `if...else if...else` — Múltiples condiciones

```javascript
let nota = 85;

if (nota >= 90) {
    console.log("Sobresaliente");
} else if (nota >= 80) {
    console.log("Notable");
} else if (nota >= 70) {
    console.log("Bien");
} else if (nota >= 60) {
    console.log("Suficiente");
} else {
    console.log("Insuficiente");
}
```

### 1.4 Condiciones complejas

```javascript
let edad = 25;
let tienePermiso = true;

// AND - ambas deben ser verdaderas
if (edad >= 18 && tienePermiso) {
    console.log("Puedes conducir");
}

// OR - al menos una debe ser verdadera
if (edad < 13 || edad > 65) {
    console.log("Entrada gratuita");
}

// NOT - invierte la condición
if (!tienePermiso) {
    console.log("No tienes permiso");
}
```

---

## 2. Operador ternario

```javascript
// condición ? valorSiVerdadero : valorSiFalso

let edad = 20;
let mensaje = edad >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(mensaje);  // "Mayor de edad"

// Anidado
let nota = 85;
let calificacion = nota >= 90 ? "Sobresaliente" :
                   nota >= 80 ? "Notable" :
                   nota >= 70 ? "Bien" :
                   "Suficiente o Insuficiente";
```

> **Consejo:** Usa el ternario solo para expresiones simples. Para lógica compleja, usa `if...else`.

---

## 3. `switch` — Múltiples casos

```javascript
let dia = new Date().getDay();  // 0=Domingo, 1=Lunes, ...

switch (dia) {
    case 0:
        console.log("Domingo");
        break;
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    case 3:
        console.log("Miércoles");
        break;
    case 4:
        console.log("Jueves");
        break;
    case 5:
        console.log("Viernes");
        break;
    case 6:
        console.log("Sábado");
        break;
    default:
        console.log("Día no válido");
}
```

### `switch` con múltiples valores

```javascript
let mes = new Date().getMonth() + 1;  // 1-12

switch (mes) {
    case 12: case 1: case 2:
        console.log("Invierno");
        break;
    case 3: case 4: case 5:
        console.log("Primavera");
        break;
    case 6: case 7: case 8:
        console.log("Verano");
        break;
    case 9: case 10: case 11:
        console.log("Otoño");
        break;
}
```

### `switch` con expresiones

```javascript
let edad = 25;

switch (true) {
    case edad >= 18 && edad < 30:
        console.log("Joven adulto");
        break;
    case edad >= 30 && edad < 50:
        console.log("Adulto");
        break;
    default:
        console.log("Mayor");
}
```

> **Importante:** ¡No olvides `break`! Sin él, el código "se ejecuta" (fall-through).

---

## 4. Bucles

### 4.1 `for` — Cuando conoces el número de iteraciones

```javascript
// for (inicio; condición; incremento)
for (let i = 0; i < 5; i++) {
    console.log(`Iteración ${i}`);
}
// Salida: 0, 1, 2, 3, 4
```

### 4.2 `while` — Cuando no conoces el número de iteraciones

```javascript
let contador = 0;

while (contador < 5) {
    console.log(`Contador: ${contador}`);
    contador++;
}
// Salida: 0, 1, 2, 3, 4
```

### 4.3 `do...while` — Ejecuta al menos una vez

```javascript
let input;

do {
    input = prompt("Ingresa un número mayor a 10:");
} while (parseInt(input) <= 10);

console.log("¡Correcto!");
```

### 4.4 `for...in` — Para objetos

```javascript
let persona = { nombre: "Ana", edad: 25, ciudad: "Madrid" };

for (let clave in persona) {
    console.log(`${clave}: ${persona[clave]}`);
}
// Salida: nombre: Ana, edad: 25, ciudad: Madrid
```

### 4.5 `for...of` — Para arrays y iterables

```javascript
let frutas = ["manzana", "plátano", "naranja"];

for (let fruta of frutas) {
    console.log(fruta);
}
// Salida: manzana, plátano, naranja
```

---

## 5. `break` y `continue`

### `break` — Salir del bucle

```javascript
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;  // Sale del bucle cuando i es 5
    }
    console.log(i);
}
// Salida: 0, 1, 2, 3, 4
```

### `continue` — Saltar a la siguiente iteración

```javascript
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue;  // Salta los números pares
    }
    console.log(i);
}
// Salida: 1, 3, 5, 7, 9
```

### `break` con etiquetas (bucles anidados)

```javascript
externo: for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        if (j === 3) {
            break externo;  // Sale del bucle externo
        }
        console.log(`i=${i}, j=${j}`);
    }
}
```

---

## 6. Bucles infinitos (¡con cuidado!)

```javascript
// ⚠️ Estos bucles nunca terminan
// while (true) { ... }
// for (;;) { ... }

// ✅ Siempre incluye una condición de salida
let intentos = 0;
while (intentos < 3) {
    console.log(`Intento ${intentos + 1}`);
    intentos++;
}
```

---

## 7. Ejemplos prácticos

### Tabla de multiplicar

```javascript
let numero = 7;

for (let i = 1; i <= 10; i++) {
    console.log(`${numero} x ${i} = ${numero * i}`);
}
```

### Encontrar números primos

```javascript
function esPrimo(numero) {
    if (numero < 2) return false;

    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}

// Encontrar primos del 1 al 20
for (let i = 1; i <= 20; i++) {
    if (esPrimo(i)) {
        console.log(`${i} es primo`);
    }
}
```

### Validación de contraseña

```javascript
function validarContrasena(password) {
    let tieneMayuscula = false;
    let tieneMinuscula = false;
    let tieneNumero = false;
    let tieneCaracterEspecial = false;

    for (let char of password) {
        if (char >= "A" && char <= "Z") {
            tieneMayuscula = true;
        } else if (char >= "a" && char <= "z") {
            tieneMinuscula = true;
        } else if (char >= "0" && char <= "9") {
            tieneNumero = true;
        } else {
            tieneCaracterEspecial = true;
        }
    }

    return tieneMayuscula && tieneMinuscula && tieneNumero && tieneCaracterEspecial;
}

console.log(validarContrasena("MiClave123!"));  // true
console.log(validarContrasena("clave"));         // false
```

---

## Resumen

- `if...else` ejecuta código según condiciones
- `switch` es útil para múltiples valores exactos
- `for` ejecuta un número conocido de iteraciones
- `while` ejecuta mientras la condición sea verdadera
- `do...while` ejecuta al menos una vez
- `break` sale del bucle, `continue` salta a la siguiente iteración
- `for...in` recorre objetos, `for...of` recorre arrays

---

## Ejercicios

### Ejercicio 1 (Básico) — 1 punto
**Clasificar edad**

Dada una edad, imprime:
- "Niño" si es menor de 12
- "Adolescente" si tiene 12-17 años
- "Adulto" si tiene 18-64 años
- "Mayor" si tiene 65 o más

### Ejercicio 2 (Básico) — 2 puntos
**Par o impar**

Crea un bucle que imprima los números del 1 al 20, indicando si cada uno es par o impar.

### Ejercicio 3 (Intermedio) — 2 puntos
**FizzBuzz**

Imprime los números del 1 al 100, pero:
- Si el número es divisible por 3, imprime "Fizz"
- Si es divisible por 5, imprime "Buzz"
- Si es divisible por 3 y 5, imprime "FizzBuzz"
- Si no, imprime el número

### Ejercicio 4 (Intermedio) — 2 puntos
**Encontrar el mayor**

Dado un array de números, encuentra el mayor sin usar `Math.max()`.

```javascript
let numeros = [3, 7, 2, 9, 4, 1, 8];
// Tu código aquí
```

### Ejercicio 5 (Avanzado) — 3 puntos
**Patrón de triángulo**

Imprime un triángulo de asteriscos como este (para n=5):
```
*
**
***
****
*****
```

Luego imprime el triángulo invertido.

### Ejercicio 6 (Práctico) — 3 puntos
**Juego de adivinanza**

Crea un juego donde:
1. Elige un número aleatorio del 1 al 100
2. Permita al usuario adivinar (máximo 7 intentos)
3. Después de cada intento, diga "Muy alto" o "Muy bajo"
4. Si adivina, felicítalo. Si se quedan sin intentos, revele el número

---

## Soluciones

### Solución Ejercicio 1
```javascript
let edad = 25;

if (edad < 12) {
    console.log("Niño");
} else if (edad < 18) {
    console.log("Adolescente");
} else if (edad < 65) {
    console.log("Adulto");
} else {
    console.log("Mayor");
}
```

### Solución Ejercicio 2
```javascript
for (let i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
        console.log(`${i} es par`);
    } else {
        console.log(`${i} es impar`);
    }
}
```

### Solución Ejercicio 3
```javascript
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}
```

### Solución Ejercicio 4
```javascript
let numeros = [3, 7, 2, 9, 4, 1, 8];
let mayor = numeros[0];

for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > mayor) {
        mayor = numeros[i];
    }
}

console.log("El número mayor es:", mayor);  // 9
```

### Solución Ejercicio 5
```javascript
// Triángulo normal
let n = 5;
for (let i = 1; i <= n; i++) {
    console.log("*".repeat(i));
}

console.log("---");

// Triángulo invertido
for (let i = n; i >= 1; i--) {
    console.log("*".repeat(i));
}
```

### Solución Ejercicio 6
```javascript
function juegoAdivinanza() {
    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let intentos = 0;
    let maxIntentos = 7;

    while (intentos < maxIntentos) {
        let intento = parseInt(prompt(`Intento ${intentos + 1}/${maxIntentos}. Ingresa un número:`));

        if (intento === numeroSecreto) {
            alert(`¡Correcto! El número era ${numeroSecreto}. Lo adivinaste en ${intentos + 1} intentos.`);
            return;
        }

        intentos++;

        if (intentos < maxIntentos) {
            if (intento < numeroSecreto) {
                alert("Muy bajo. Intenta de nuevo.");
            } else {
                alert("Muy alto. Intenta de nuevo.");
            }
        }
    }

    alert(`Se acabaron los intentos. El número era ${numeroSecreto}.`);
}

juegoAdivinanza();
```
