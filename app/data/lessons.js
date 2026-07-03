export const lecciones = [
  // ===== NIVEL 1: FUNDAMENTOS =====
  {
    id: "que-es-javascript",
    titulo: "¿Qué es JavaScript?",
    descripcion: "Introducción, motores, capacidades y entornos de ejecución.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 1,
    duracion: "15 min",
    icono: "BookOpen",
    contenido: `## Introducción

JavaScript fue creado inicialmente para **"dar vida a las páginas web"**. Los programas en este lenguaje se llaman *scripts* y se pueden escribir directamente en el HTML de una página web, ejecutándose automáticamente a medida que se carga la página.

> **Nota histórica:** JavaScript fue creado con el nombre "LiveScript", pero Java era muy popular en ese momento, y se decidió que posicionarlo como un "hermano menor" de Java ayudaría. Sin embargo, JavaScript evolucionó hasta convertirse en un lenguaje completamente independiente con su propia especificación llamada **ECMAScript**.

## ¿Qué es un motor de JavaScript?

Los motores de JavaScript son programas que ejecutan el código JavaScript:

| Motor | Navegador |
|-------|-----------|
| **V8** | Chrome, Opera, Edge |
| **SpiderMonkey** | Firefox |
| **Chakra** | Internet Explorer |
| **JavaScriptCore** | Safari |

### ¿Cómo funcionan los motores?

1. El motor **lee** (analiza) el script
2. Lo **convierte** (compila) a lenguaje de máquina
3. El código máquina se **ejecuta** rápidamente

## ¿Qué puede hacer JavaScript en el navegador?

JavaScript moderno es un lenguaje de programación **"seguro"**. En el navegador, JavaScript puede:

- **Manipular el HTML:** Agregar nuevo contenido, modificar estilos
- **Reaccionar al usuario:** Ejecutarse con clics, movimientos y pulsaciones
- **Comunicarse con el servidor:** Enviar solicitudes de red (AJAX)
- **Gestionar datos:** Obtener y configurar cookies, localStorage

## ¿Qué NO puede hacer JavaScript?

| Restricción | Motivo |
|-------------|--------|
| No puede leer/escribir archivos | Proteger el sistema |
| No puede acceder a otras pestañas | Política del mismo origen |
| No puede comunicarse con otros servidores sin permiso | Seguridad de red |

## Lenguajes que se transpilan a JavaScript

| Lenguaje | Desarrollador | Característica principal |
|----------|---------------|--------------------------|
| **TypeScript** | Microsoft | Tipado estricto |
| **CoffeeScript** | Comunidad Ruby | Sintaxis más concisa |
| **Dart** | Google | Independiente, motor propio |
| **Kotlin** | JetBrains | Moderno, seguro, conciso |

## Entornos de ejecución

- **Navegadores web** — El uso original
- **Servidores** — Con Node.js
- **Aplicaciones móviles** — Con React Native, Flutter
- **Aplicaciones de escritorio** — Con Electron
- **Dispositivos IoT** — Con plataformas como Johnny-Five`,
    ejercicio: {
      descripcion: "Crea un script que muestre '¡Hola, JavaScript!' usando console.log().",
      codigoInicial: `// Escribe tu código aquí
// Usa console.log() para mostrar un mensaje

`,
      codigoSolucion: `console.log("¡Hola, JavaScript!");`,
      tests: [
        {
          descripcion: "Se usó console.log() para mostrar un mensaje",
          codigo: `__logs.length >= 1 && __logs.some(l => l.includes("Hola"))`,
        },
        {
          descripcion: "El código contiene console.log()",
          codigo: `__sourceCode.includes("console.log")`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Primeros-pasos", puntos: 10 },
  },
  {
    id: "hola-mundo",
    titulo: "Hola Mundo — Tu primer script",
    descripcion: "Insertar JavaScript en HTML, alert, console, DOM.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 2,
    duracion: "15 min",
    icono: "Code2",
    contenido: `## La etiqueta \`<script>\`

Los programas de JavaScript se insertan en HTML usando la etiqueta \`<script>\`:

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<body>
    <p>Antes del script...</p>
    <script>
        alert("¡Hola, mundo!");
    </script>
    <p>...Después del script.</p>
</body>
</html>
\`\`\`

## Scripts externos

Si tenemos mucho código, podemos colocarlo en un archivo separado:

\`\`\`html
<script src="mi-script.js"></script>
\`\`\`

**Ventajas:** Caché del navegador, mejor organización, reutilización.

## Mostrar información al usuario

### \`alert()\` — Ventana emergente
\`\`\`javascript
alert("¡Hola, mundo!");
\`\`\`

### \`console.log()\` — Consola del navegador
\`\`\`javascript
console.log("Hola, mundo!");
console.log("Fecha:", new Date());
\`\`\`

### Modificar el DOM
\`\`\`javascript
document.getElementById("titulo").innerHTML = "Nuevo contenido";
document.body.style.backgroundColor = "#f0f0f0";
\`\`\`

### \`prompt()\` — Solicitar información
\`\`\`javascript
let nombre = prompt("¿Cuál es tu nombre?");
alert("¡Hola, " + nombre + "!");
\`\`\`

### \`confirm()\` — Confirmar una acción
\`\`\`javascript
let respuesta = confirm("¿Estás seguro?");
if (respuesta) {
    alert("Confirmado");
}
\`\`\`

## Comentarios
\`\`\`javascript
// Comentario de una sola línea
/* Comentario de múltiples líneas */
/** Comentario de documentación (JSDoc) */
\`\`\`

## Orden de ejecución

Los scripts se ejecutan **de arriba hacia abajo**. Si un script tiene un error, los posteriores no se ejecutarán.

## Buenas prácticas

1. **Coloca los scripts al final del \`<body>\`**
2. **Usa scripts externos** para código complejo
3. **Usa \`console.log()\`** en lugar de \`alert()\` para depurar
4. **Escribe comentarios** para explicar código complejo`,
    ejercicio: {
      descripcion: "Usa console.log() para mostrar tres tipos de información: un string, un número y el resultado de una operación.",
      codigoInicial: `// 1. Muestra tu nombre con console.log()
// 2. Muestra la suma de 10 + 5
// 3. Muestra tu edad y el tipo de dato con typeof

`,
      codigoSolucion: `console.log("Marcos");
console.log(10 + 5);
console.log(typeof 25);`,
      tests: [
        {
          descripcion: "Se usó console.log al menos 3 veces",
          codigo: `__logs.length >= 3`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Hola-mundo", puntos: 10 },
  },
  {
    id: "variables-y-tipos",
    titulo: "Variables y Tipos de Datos",
    descripcion: "let, const, tipos primitivos, typeof, conversión de tipos.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 3,
    duracion: "20 min",
    icono: "Variable",
    contenido: `## Declarando variables: \`let\`, \`const\`, \`var\`

### \`let\` — Declaración moderna (recomendada)
\`\`\`javascript
let nombre = "Carlos";
nombre = "María";  // ✅ Válido
\`\`\`

### \`const\` — Constante (no se puede reasignar)
\`\`\`javascript
const PI = 3.14159;
// PI = 3.14;  // ❌ Error
\`\`\`

### \`var\` — Declaración antigua (evitar)
\`\`\`javascript
var antiguo = "No usar esto";
\`\`\`

| Característica | \`let\` | \`const\` | \`var\` |
|----------------|-------|---------|-------|
| Reasignación | ✅ Sí | ❌ No | ✅ Sí |
| Alcance | Bloque | Bloque | Función |

## Tipos de datos primitivos

### \`number\` — Números
\`\`\`javascript
let entero = 42;
let decimal = 3.14;
let infinito = Infinity;
let noEsNumero = NaN;
\`\`\`

### \`bigint\` — Números enteros grandes
\`\`\`javascript
let grande = 9007199254740991n;
\`\`\`

### \`string\` — Cadenas de texto
\`\`\`javascript
let nombre = "Ana";
let saludo = \`Hola, \${nombre}\`;
\`\`\`

### \`boolean\` — Verdadero o falso
\`\`\`javascript
let esMayor = true;
let esMenor = false;
\`\`\`

### \`null\` y \`undefined\`
\`\`\`javascript
let usuario = null;       // Valor intencionalmente vacío
let nombre;               // undefined - sin valor asignado
\`\`\`

## El operador \`typeof\`
\`\`\`javascript
typeof 42          // "number"
typeof "Hola"      // "string"
typeof true        // "boolean"
typeof null        // "object" ← Error conocido
\`\`\`

## Conversión de tipos
\`\`\`javascript
Number("123")      // 123
String(123)        // "123"
Boolean(1)         // true
Boolean(0)         // false
\`\`\`

## Buenas prácticas

1. **Usa \`const\` por defecto** — Cambia a \`let\` solo si necesitas reasignar
2. **Evita \`var\`** — Tiene un alcance confuso
3. **Nombra descriptivamente** — \`edadUsuario\` en vez de \`eu\``,
    ejercicio: {
      descripcion: "Declara una variable 'nombre' con tu nombre y una variable 'edad' con tu edad usando const.",
      codigoInicial: `// Declara una variable "nombre" con tu nombre
// Declara una variable "edad" con tu edad

`,
      codigoSolucion: `const nombre = "Tu Nombre";
const edad = 25;`,
      tests: [
        {
          descripcion: "Existe una variable llamada nombre",
          codigo: `typeof nombre !== 'undefined'`,
        },
        {
          descripcion: "nombre es un string",
          codigo: `typeof nombre === 'string'`,
        },
        {
          descripcion: "nombre tiene un valor",
          codigo: `nombre.length > 0`,
        },
        {
          descripcion: "Existe una variable llamada edad",
          codigo: `typeof edad !== 'undefined'`,
        },
        {
          descripcion: "edad es un número",
          codigo: `typeof edad === 'number'`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Cientifico-de-datos", puntos: 15 },
  },
  {
    id: "operadores",
    titulo: "Operadores",
    descripcion: "Aritméticos, concatenación, comparación, lógicos, ternario.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 4,
    duracion: "20 min",
    icono: "Calculator",
    contenido: `## Operadores aritméticos

| Operador | Nombre | Ejemplo | Resultado |
|----------|--------|---------|-----------|
| \`+\` | Suma | \`5 + 3\` | \`8\` |
| \`-\` | Resta | \`5 - 3\` | \`2\` |
| \`*\` | Multiplicación | \`5 * 3\` | \`15\` |
| \`/\` | División | \`6 / 3\` | \`2\` |
| \`%\` | Resto | \`7 % 3\` | \`1\` |
| \`**\` | Exponenciación | \`2 ** 3\` | \`8\` |

## Concatenación de cadenas

\`\`\`javascript
let saludo = "Hola, " + "mundo";
console.log("Edad: " + 25);  // "Edad: 25"
console.log("1" + 2);        // "12" (¡cuidado!)
\`\`\`

## Operador unario \`+\`

Convierte un valor a número:
\`\`\`javascript
console.log(+"42");    // 42
console.log(+true);    // 1
\`\`\`

## Precedencia de operadores

\`\`\`javascript
console.log(2 + 3 * 4);   // 14 (multiplicación primero)
console.log((2 + 3) * 4); // 20 (paréntesis primero)
\`\`\`

## Asignación

\`\`\`javascript
let n = 5;
n += 3;   // n = 8
n -= 2;   // n = 6
n *= 4;   // n = 24
\`\`\`

## Incremento y decremento

\`\`\`javascript
let contador = 0;
contador++;   // 1
++contador;   // 2
\`\`\`

## Operadores de comparación

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| \`===\` | Igualdad estricta | \`5 === "5"\` → \`false\` |
| \`!==\` | Desigualdad estricta | \`5 !== "5"\` → \`true\` |
| \`>\` | Mayor que | \`5 > 3\` → \`true\` |

> **Recomendación:** Siempre usa \`===\` y \`!==\`.

## Operadores lógicos

\`\`\`javascript
console.log(true && false);   // false (AND)
console.log(true || false);   // true (OR)
console.log(!true);           // false (NOT)
\`\`\`

## Operador ternario

\`\`\`javascript
let edad = 20;
let estado = edad >= 18 ? "Mayor" : "Menor";
\`\`\``,
    ejercicio: {
      descripcion: "Crea una variable 'resultado' que sea la suma de 15 y 27, y una variable 'esMayor' que compare si 10 es mayor que 5.",
      codigoInicial: `// Crea una variable "resultado" con la suma de 15 y 27
// Crea una variable "esMayor" que sea true si 10 > 5

`,
      codigoSolucion: `const resultado = 15 + 27;
const esMayor = 10 > 5;`,
      tests: [
        {
          descripcion: "resultado es 42",
          codigo: `resultado === 42`,
        },
        {
          descripcion: "esMayor es true",
          codigo: `esMayor === true`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Maestro-matematicas", puntos: 15 },
  },
  {
    id: "estructuras-de-control",
    titulo: "Estructuras de Control",
    descripcion: "if/else, switch, bucles for, while, break/continue.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 5,
    duracion: "25 min",
    icono: "GitBranch",
    contenido: `## Condicionales

### \`if\` — Ejecutar si es verdadero
\`\`\`javascript
let edad = 20;
if (edad >= 18) {
    console.log("Eres mayor de edad");
}
\`\`\`

### \`if...else\` — Dos caminos
\`\`\`javascript
let hora = 14;
if (hora < 12) {
    console.log("Buenos días");
} else {
    console.log("Buenas tardes");
}
\`\`\`

### \`if...else if...else\` — Múltiples condiciones
\`\`\`javascript
let nota = 85;
if (nota >= 90) {
    console.log("Sobresaliente");
} else if (nota >= 80) {
    console.log("Notable");
} else {
    console.log("Mejora");
}
\`\`\`

### \`switch\` — Múltiples valores exactos
\`\`\`javascript
const dia = "lunes";
switch (dia) {
    case "lunes":
        console.log("Inicio de semana");
        break;
    case "viernes":
        console.log("¡Ya casi es fin de semana!");
        break;
    default:
        console.log("Día normal");
}
\`\`\`

## Bucles

### \`for\` — Número conocido de iteraciones
\`\`\`javascript
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}
\`\`\`

### \`while\` — Mientras la condición sea verdadera
\`\`\`javascript
let contador = 0;
while (contador < 5) {
    console.log(contador);
    contador++;
}
\`\`\`

### \`do...while\` — Ejecuta al menos una vez
\`\`\`javascript
let num = 10;
do {
    console.log(num);
    num--;
} while (num > 0);
\`\`\`

### \`for...of\` — Recorrer arrays
\`\`\`javascript
const frutas = ["manzana", "plátano", "naranja"];
for (const fruta of frutas) {
    console.log(fruta);
}
\`\`\`

## \`break\` y \`continue\`

\`\`\`javascript
// break sale del bucle
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    console.log(i);  // 0, 1, 2, 3, 4
}

// continue salta a la siguiente iteración
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) continue;
    console.log(i);  // 1, 3, 5, 7, 9
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una variable 'temperatura' con un número, y una variable 'clima' usando un condicional.",
      codigoInicial: `// Crea una variable "temperatura" con un número (ej: 25)
// Crea una variable "clima" usando un condicional:
// - "caliente" si temperatura > 30
// - "templado" si temperatura > 15
// - "frío" en caso contrario

`,
      codigoSolucion: `const temperatura = 25;
const clima = temperatura > 30 ? "caliente" : temperatura > 15 ? "templado" : "frío";`,
      tests: [
        {
          descripcion: "temperatura es un número",
          codigo: `typeof temperatura === 'number'`,
        },
        {
          descripcion: "clima es un string",
          codigo: `typeof clima === 'string'`,
        },
        {
          descripcion: "clima tiene un valor válido",
          codigo: `["caliente", "templado", "frío"].includes(clima)`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Logica-pura", puntos: 20 },
  },
  {
    id: "funciones-basicas",
    titulo: "Funciones Básicas",
    descripcion: "Declaración, parámetros, scope, arrow functions.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 6,
    duracion: "25 min",
    icono: "Function",
    contenido: `## ¿Qué es una función?

Una función es un **bloque de código reutilizable** que realiza una tarea específica.

## Declaración de función
\`\`\`javascript
function saludar() {
    console.log("¡Hola, mundo!");
}
saludar();  // "¡Hola, mundo!"
\`\`\`

## Parámetros y argumentos
\`\`\`javascript
function sumar(a, b) {
    return a + b;
}
let resultado = sumar(3, 5);  // 8
\`\`\`

## Valor de retorno
\`\`\`javascript
function esPar(numero) {
    return numero % 2 === 0;
}
\`\`\`

## Parámetros por defecto
\`\`\`javascript
function saludar(nombre = "Amigo") {
    return \`¡Hola, \${nombre}!\`;
}
\`\`\`

## Argumentos variables (\`...rest\`)
\`\`\`javascript
function sumar(...numeros) {
    return numeros.reduce((total, n) => total + n, 0);
}
sumar(1, 2, 3, 4);  // 10
\`\`\`

## Expresiones de función
\`\`\`javascript
const multiplicar = function(a, b) {
    return a * b;
};
\`\`\`

## Arrow functions
\`\`\`javascript
const cuadrado = x => x * x;
const sumar = (a, b) => a + b;
const saludar = nombre => \`¡Hola, \${nombre}!\`;
\`\`\`

## Alcance (Scope)
\`\`\`javascript
let global = "Soy global";

function ejemplo() {
    let local = "Soy local";
    console.log(global);  // ✅ Acceso a global
    console.log(local);   // ✅ Acceso a local
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una función 'esPar' que reciba un número y retorne true si es par, false si es impar.",
      codigoInicial: `// Crea una función "esPar" que reciba un número
// y retorne true si es par, false si es impar

`,
      codigoSolucion: `function esPar(numero) {
  return numero % 2 === 0;
}`,
      tests: [
        {
          descripcion: "Existe una función llamada esPar",
          codigo: `typeof esPar === 'function'`,
        },
        {
          descripcion: "esPar(4) retorna true",
          codigo: `esPar(4) === true`,
        },
        {
          descripcion: "esPar(7) retorna false",
          codigo: `esPar(7) === false`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Funciones-maestro", puntos: 20 },
  },
  // ===== NIVEL 2: INTERMEDIO =====
  {
    id: "objetos",
    titulo: "Objetos",
    descripcion: "Literales, propiedades, métodos, this, copia por referencia.",
    modulo: 2,
    moduloNombre: "Intermedio",
    orden: 7,
    duracion: "20 min",
    icono: "Braces",
    contenido: `## ¿Qué es un objeto?

Un objeto es una colección de **pares clave-valor**.

\`\`\`javascript
let persona = {
    nombre: "Ana",
    edad: 25,
    activo: true,
    saludar() {
        return \`Hola, soy \${this.nombre}\`;
    }
};
\`\`\`

## Acceder a propiedades
\`\`\`javascript
console.log(persona.nombre);     // "Ana"
console.log(persona["edad"]);    // 25
\`\`\`

## Métodos
\`\`\`javascript
let calculadora = {
    sumar(a, b) { return a + b; },
    restar(a, b) { return a - b; }
};
\`\`\`

## \`this\` en métodos
\`\`\`javascript
let auto = {
    marca: "Toyota",
    encender() {
        console.log(\`\${this.marca} encendido\`);
    }
};
\`\`\`

## \`Object.keys()\`, \`Object.values()\`, \`Object.entries()\`
\`\`\`javascript
Object.keys(persona);    // ["nombre", "edad", "activo"]
Object.values(persona);  // ["Ana", 25, true]
\`\`\``,
    ejercicio: {
      descripcion: "Crea un objeto 'persona' con nombre, edad y un método saludar().",
      codigoInicial: `// Crea un objeto "persona" con:
// - nombre: tu nombre
// - edad: tu edad
// - saludar(): retorna "Hola, soy [nombre]"

`,
      codigoSolucion: `const persona = {
  nombre: "Ana",
  edad: 25,
  saludar() {
    return "Hola, soy " + this.nombre;
  }
};`,
      tests: [
        {
          descripcion: "persona es un objeto",
          codigo: `typeof persona === 'object' && persona !== null`,
        },
        {
          descripcion: "persona tiene nombre",
          codigo: `typeof persona.nombre === 'string'`,
        },
        {
          descripcion: "persona tiene saludar()",
          codigo: `typeof persona.saludar === 'function'`,
        },
        {
          descripcion: "saludar() retorna un string",
          codigo: `typeof persona.saludar() === 'string'`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Explorador-objetos", puntos: 20 },
  },
  {
    id: "arrays-y-metodos",
    titulo: "Arrays y Métodos",
    descripcion: "push, pop, map, filter, reduce, find, sort.",
    modulo: 2,
    moduloNombre: "Intermedio",
    orden: 8,
    duracion: "25 min",
    icono: "List",
    contenido: `## Creación de Arrays
\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];
const vacio = [];
\`\`\`

## Métodos de manipulación
\`\`\`javascript
numeros.push(6);      // Agrega al final
numeros.pop();        // Elimina del final
numeros.shift();      // Elimina del inicio
numeros.unshift(0);   // Agrega al inicio
\`\`\`

## Métodos de iteración
\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];

// map - transforma cada elemento
const dobles = numeros.map(n => n * 2);  // [2, 4, 6, 8, 10]

// filter - filtra elementos
const pares = numeros.filter(n => n % 2 === 0);  // [2, 4]

// find - encuentra un elemento
const mayor = numeros.find(n => n > 3);  // 4

// reduce - reduce a un solo valor
const suma = numeros.reduce((acc, n) => acc + n, 0);  // 15

// some / every
numeros.some(n => n > 3);   // true
numeros.every(n => n > 0);  // true
\`\`\`

## Ordenamiento
\`\`\`javascript
const nums = [3, 1, 4, 1, 5, 9];
nums.sort((a, b) => a - b);  // [1, 1, 3, 4, 5, 9]
\`\`\``,
    ejercicio: {
      descripcion: "Crea un array 'numeros' del 1 al 5 y un array 'dobles' usando map.",
      codigoInicial: `// Crea un array "numeros" con los números del 1 al 5
// Crea un array "dobles" usando map para duplicar cada número

`,
      codigoSolucion: `const numeros = [1, 2, 3, 4, 5];
const dobles = numeros.map(n => n * 2);`,
      tests: [
        {
          descripcion: "numeros es un array de 5 elementos",
          codigo: `Array.isArray(numeros) && numeros.length === 5`,
        },
        {
          descripcion: "dobles tiene 5 elementos",
          codigo: `dobles.length === 5`,
        },
        {
          descripcion: "dobles contiene los valores correctos",
          codigo: `dobles[0] === 2 && dobles[1] === 4 && dobles[2] === 6 && dobles[3] === 8 && dobles[4] === 10`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Maestro-arrays", puntos: 20 },
  },
  {
    id: "funciones-avanzadas",
    titulo: "Funciones Avanzadas",
    descripcion: "Recursión, callbacks, funciones de orden superior.",
    modulo: 2,
    moduloNombre: "Intermedio",
    orden: 9,
    duracion: "20 min",
    icono: "Workflow",
    contenido: `## Funciones de orden superior

Una función de orden superior es una que **recibe funciones como argumentos** o **retorna funciones**.

\`\`\`javascript
function ejecutar(fn, a, b) {
    return fn(a, b);
}

ejecutar((a, b) => a + b, 3, 5);  // 8
\`\`\`

## Callbacks
\`\`\`javascript
function procesar(array, callback) {
    let resultado = [];
    for (let item of array) {
        resultado.push(callback(item));
    }
    return resultado;
}

procesar([1, 2, 3], x => x * 2);  // [2, 4, 6]
\`\`\`

## Recursión
\`\`\`javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
factorial(5);  // 120
\`\`\`

## closures
\`\`\`javascript
function crearContador() {
    let count = 0;
    return {
        incrementar() { count++; },
        obtener() { return count; }
    };
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una función 'factorial' que calcule el factorial de un número usando recursión.",
      codigoInicial: `// Crea una función "factorial" que calcule
// el factorial de un número usando recursión
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120

`,
      codigoSolucion: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
      tests: [
        {
          descripcion: "Existe una función llamada factorial",
          codigo: `typeof factorial === 'function'`,
        },
        {
          descripcion: "factorial(5) es 120",
          codigo: `factorial(5) === 120`,
        },
        {
          descripcion: "factorial(1) es 1",
          codigo: `factorial(1) === 1`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Recursion-experto", puntos: 20 },
  },
  {
    id: "closures-y-alcance",
    titulo: "Closures y Alcance",
    descripcion: "Closures, patrones comunes, alcance léxico.",
    modulo: 2,
    moduloNombre: "Intermedio",
    orden: 10,
    duracion: "15 min",
    icono: "Lock",
    contenido: `## ¿Qué es un closure?

Un closure es una función que **recuerda su alcance léxico** incluso después de que la función externa haya terminado de ejecutarse.

\`\`\`javascript
function crearSaludo(saludo) {
    return function(nombre) {
        return \`\${saludo}, \${nombre}!\`;
    };
}

const hola = crearSaludo("Hola");
console.log(hola("Ana"));  // "¡Hola, Ana!"
\`\`\`

## Patrones comunes de closures

### Generador de IDs
\`\`\`javascript
function crearGeneradorID() {
    let id = 0;
    return function() {
        id++;
        return id;
    };
}
\`\`\`

### Encapsulamiento
\`\`\`javascript
function crearCuenta(saldoInicial) {
    let saldo = saldoInicial;
    return {
        depositar(monto) { saldo += monto; },
        obtenerSaldo() { return saldo; }
    };
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una función 'crearContador' que retorne un objeto con incrementar() y obtener().",
      codigoInicial: `// Crea una función "crearContador" que retorne un objeto con:
// - incrementar(): aumenta el contador en 1
// - obtener(): retorna el valor actual del contador

`,
      codigoSolucion: `function crearContador() {
  let count = 0;
  return {
    incrementar() { count++; },
    obtener() { return count; }
  };
}`,
      tests: [
        {
          descripcion: "Existe crearContador",
          codigo: `typeof crearContador === 'function'`,
        },
        {
          descripcion: "retorna un objeto con incrementar y obtener",
          codigo: `(() => { const c = crearContador(); return typeof c.incrementar === 'function' && typeof c.obtener === 'function'; })()`,
        },
        {
          descripcion: "el contador funciona correctamente",
          codigo: `(() => { const c2 = crearContador(); c2.incrementar(); c2.incrementar(); return c2.obtener() === 2; })()`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Maestro-closures", puntos: 20 },
  },
  {
    id: "manipulacion-dom",
    titulo: "Manipulación DOM",
    descripcion: "Selectores, creación, modificación de elementos.",
    modulo: 2,
    moduloNombre: "Intermedio",
    orden: 11,
    duracion: "20 min",
    icono: "Layout",
    contenido: `## ¿Qué es el DOM?

El DOM (Document Object Model) es una representación del documento HTML que JavaScript puede manipular.

## Selectores
\`\`\`javascript
document.getElementById("mi-id");
document.querySelector(".mi-clase");
document.querySelectorAll("p");
\`\`\`

## Crear elementos
\`\`\`javascript
let div = document.createElement("div");
div.textContent = "Hola";
document.body.appendChild(div);
\`\`\`

## Modificar elementos
\`\`\`javascript
elemento.textContent = "Nuevo texto";
elemento.innerHTML = "<strong>HTML</strong>";
elemento.style.color = "red";
elemento.classList.add("activo");
\`\`\`

## Eliminar elementos
\`\`\`javascript
elemento.remove();
\`\`\``,
    ejercicio: {
      descripcion: "Crea un párrafo en el DOM, cambia su texto y color, y luego elimínalo.",
      codigoInicial: `// 1. Crea un elemento <p> con el texto "Hola DOM"
// 2. Agrégalo al body con document.body.appendChild()
// 3. Cambia su color a rojo con style.color
// 4. Elimina el elemento con .remove()

`,
      codigoSolucion: `const p = document.createElement("p");
p.textContent = "Hola DOM";
document.body.appendChild(p);
p.style.color = "red";
p.remove();`,
      tests: [
        {
          descripcion: "Se usó document.createElement para crear un elemento",
          codigo: `__sourceCode.includes("document.createElement")`,
        },
        {
          descripcion: "Se usó appendChild para agregar al DOM",
          codigo: `__sourceCode.includes("appendChild")`,
        },
        {
          descripcion: "Se modificó style.color del elemento",
          codigo: `__sourceCode.includes("style") && __sourceCode.includes("color")`,
        },
        {
          descripcion: "Se eliminó el elemento con .remove()",
          codigo: `__sourceCode.includes(".remove()")`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "DOM-maestro", puntos: 20 },
  },
  {
    id: "eventos",
    titulo: "Eventos",
    descripcion: "Click, teclado, formulario, delegación de eventos.",
    modulo: 2,
    moduloNombre: "Intermedio",
    orden: 12,
    duracion: "20 min",
    icono: "MousePointer",
    contenido: `## ¿Qué son los eventos?

Los eventos son acciones que ocurren en la página web: clics, pulsaciones de teclas, etc.

## addEventListener
\`\`\`javascript
let boton = document.getElementById("mi-boton");
boton.addEventListener("click", function() {
    console.log("¡Clic!");
});
\`\`\`

## Eventos comunes

| Evento | Descripción |
|--------|-------------|
| \`click\` | Clic del ratón |
| \`keydown\` | Tecla presionada |
| \`submit\` | Envío de formulario |
| \`mouseover\` | Ratón sobre elemento |
| \`input\` | Cambio en input |

## Evento con parámetros
\`\`\`javascript
function handleClick(event) {
    console.log(event.target);
}
boton.addEventListener("click", handleClick);
\`\`\`

## Delegación de eventos
\`\`\`javascript
document.querySelector("ul").addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        console.log("Clic en:", e.target.textContent);
    }
});
\`\`\``,
    ejercicio: {
      descripcion: "Crea un botón que cambie de color al hacer clic, usando addEventListener.",
      codigoInicial: `// 1. Crea un <button> con el texto "Clic aquí"
// 2. Agrégalo al body
// 3. Usa addEventListener para escuchar el evento "click"
// 4. En el handler, cambia el color del botón a "gold"

`,
      codigoSolucion: `const btn = document.createElement("button");
btn.textContent = "Clic aquí";
document.body.appendChild(btn);
btn.addEventListener("click", function() {
  btn.style.color = "gold";
});`,
      tests: [
        {
          descripcion: "Se creó un elemento con document.createElement",
          codigo: `__sourceCode.includes("document.createElement")`,
        },
        {
          descripcion: "Se usó addEventListener para escuchar eventos",
          codigo: `__sourceCode.includes("addEventListener")`,
        },
        {
          descripcion: "Se escucha el evento 'click'",
          codigo: `__sourceCode.includes("click")`,
        },
        {
          descripcion: "Se modifica el estilo del elemento",
          codigo: `__sourceCode.includes("style")`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Event-handler", puntos: 20 },
  },
  // ===== NIVEL 3: AVANZADO =====
  {
    id: "prototipos-y-clases",
    titulo: "Prototipos y Clases",
    descripcion: "Herencia, OOP, syntactic sugar.",
    modulo: 3,
    moduloNombre: "Avanzado",
    orden: 13,
    duracion: "25 min",
    icono: "Boxes",
    contenido: `## Prototipos

Todo objeto en JavaScript tiene un **prototipo** del cual hereda propiedades y métodos.

\`\`\`javascript
let animal = {
    comer() {
        return "Comiendo...";
    }
};

let perro = Object.create(animal);
console.log(perro.comer());  // "Comiendo..."
\`\`\`

## Funciones constructoras
\`\`\`javascript
function Persona(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
}
Persona.prototype.saludar = function() {
    return \`Hola, soy \${this.nombre}\`;
};
\`\`\`

## Clases (ES6)
\`\`\`javascript
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }
    hablar() {
        return \`\${this.nombre} hace un sonido\`;
    }
}

class Perro extends Animal {
    hablar() {
        return \`\${this.nombre} ladra\`;
    }
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una clase 'Rectangulo' con calcularArea() y calcularPerimetro().",
      codigoInicial: `// Crea una clase "Rectangulo" con:
// - constructor(ancho, alto)
// - calcularArea(): retorna ancho * alto
// - calcularPerimetro(): retorna 2 * (ancho + alto)

`,
      codigoSolucion: `class Rectangulo {
  constructor(ancho, alto) {
    this.ancho = ancho;
    this.alto = alto;
  }
  calcularArea() {
    return this.ancho * this.alto;
  }
  calcularPerimetro() {
    return 2 * (this.ancho + this.alto);
  }
}`,
      tests: [
        {
          descripcion: "Existe la clase Rectangulo",
          codigo: `typeof Rectangulo === 'function'`,
        },
        {
          descripcion: "calcularArea funciona",
          codigo: `new Rectangulo(5, 3).calcularArea() === 15`,
        },
        {
          descripcion: "calcularPerimetro funciona",
          codigo: `new Rectangulo(5, 3).calcularPerimetro() === 16`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "OOP-master", puntos: 25 },
  },
  {
    id: "asincronia-callbacks",
    titulo: "Asincronía: Callbacks",
    descripcion: "Event loop, callbacks, patrones asincrónicos.",
    modulo: 3,
    moduloNombre: "Avanzado",
    orden: 14,
    duracion: "20 min",
    icono: "Timer",
    contenido: `## El Event Loop

JavaScript es **single-threaded** pero puede manejar operaciones asincrónicas gracias al Event Loop.

## Callbacks

Un callback es una función que se pasa como argumento a otra función:

\`\`\`javascript
function leerArchivo(nombre, callback) {
    // Simular lectura asincrónica
    setTimeout(() => {
        callback(null, \`Contenido de \${nombre}\`);
    }, 1000);
}
\`\`\`

## El Callback Hell

Cuando hay muchos callbacks anidados, el código se vuelve difícil de leer:

\`\`\`javascript
paso1(function(resultado1) {
    paso2(resultado1, function(resultado2) {
        paso3(resultado2, function(resultado3) {
            // 😱 Callback hell
        });
    });
});
\`\`\``,
    ejercicio: {
      descripcion: "Crea una función que use setTimeout y un callback para ejecutar código después de un retraso.",
      codigoInicial: `// Crea una función "retrasar" que:
// - reciba una función callback y un tiempo en ms
// - use setTimeout para ejecutar el callback después del tiempo
// - retorne el ID del timeout

`,
      codigoSolucion: `function retrasar(callback, tiempo) {
  return setTimeout(callback, tiempo);
}`,
      tests: [
        {
          descripcion: "retrasar es una función",
          codigo: `typeof retrasar === 'function'`,
        },
        {
          descripcion: "retrasar retorna un número (timeout ID)",
          codigo: `typeof retrasar(() => {}, 10) === 'number'`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Async-pioneer", puntos: 25 },
  },
  {
    id: "promesas",
    titulo: "Promesas",
    descripcion: "Promise, then, catch, finally, Promise.all, Promise.race.",
    modulo: 3,
    moduloNombre: "Avanzado",
    orden: 15,
    duracion: "20 min",
    icono: "Sparkles",
    contenido: `## ¿Qué es una Promise?

Una Promise representa el resultado eventual de una operación asincrónica.

\`\`\`javascript
let miPromesa = new Promise((resolve, reject) => {
    let exito = true;
    if (exito) {
        resolve("¡Éxito!");
    } else {
        reject("Error");
    }
});
\`\`\`

## then, catch, finally
\`\`\`javascript
miPromesa
    .then(resultado => console.log(resultado))
    .catch(error => console.error(error))
    .finally(() => console.log("Terminado"));
\`\`\`

## Promise.all y Promise.race
\`\`\`javascript
Promise.all([promesa1, promesa2])
    .then(([r1, r2]) => console.log(r1, r2));

Promise.race([promesa1, promesa2])
    .then(primera => console.log(primera));
\`\`\``,
    ejercicio: {
      descripcion: "Crea una función 'crearPromesa' que retorne una promesa que se resuelva con un valor dado.",
      codigoInicial: `// Crea una función "crearPromesa" que:
// - reciba un valor
// - retorne una promesa que se resuelva con ese valor

`,
      codigoSolucion: `function crearPromesa(valor) {
  return new Promise(resolve => resolve(valor));
}`,
      tests: [
        {
          descripcion: "crearPromesa es una función",
          codigo: `typeof crearPromesa === 'function'`,
        },
        {
          descripcion: "retorna una promesa",
          codigo: `crearPromesa(42) instanceof Promise`,
        },
        {
          descripcion: "la promesa se resuelve con el valor correcto",
          codigo: `crearPromesa(42).then(v => v === 42)`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Promise-keeper", puntos: 25 },
  },
  {
    id: "async-await",
    titulo: "Async/Await",
    descripcion: "Azúcar sintáctico, manejo de errores con try/catch.",
    modulo: 3,
    moduloNombre: "Avanzado",
    orden: 16,
    duracion: "15 min",
    icono: "Zap",
    contenido: `## Async/Await

\`async/await\` es azúcar sintáctico sobre las promesas que hace que el código asincrónico se vea síncrono.

\`\`\`javascript
async function obtenerDatos() {
    try {
        let respuesta = await fetch("https://api.ejemplo.com/datos");
        let datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error:", error);
    }
}
\`\`\`

## Async siempre retorna una Promise
\`\`\`javascript
async function saludar() {
    return "¡Hola!";
}
// saludar() retorna una Promise
\`\`\`

## Await solo funciona dentro de async
\`\`\`javascript
async function ejemplo() {
    let resultado = await miPromesa();
    console.log(resultado);
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una función async 'esperarSegundos' que espere N segundos usando await.",
      codigoInicial: `// Crea una función async "esperarSegundos" que:
// - reciba un número de segundos
// - espere ese tiempo usando await + Promise
// - retorne "Completado"

`,
      codigoSolucion: `async function esperarSegundos(segundos) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Completado"), segundos * 1000);
  });
}`,
      tests: [
        {
          descripcion: "esperarSegundos es una función",
          codigo: `typeof esperarSegundos === 'function'`,
        },
        {
          descripcion: "retorna una promesa",
          codigo: `esperarSegundos(0.01) instanceof Promise`,
        },
        {
          descripcion: "la promesa se resuelve con 'Completado'",
          codigo: `esperarSegundos(0.01).then(v => v === "Completado")`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Async-master", puntos: 25 },
  },
  {
    id: "modulos-es6",
    titulo: "Módulos ES6",
    descripcion: "import, export, namespaces, módulos dinámicos.",
    modulo: 3,
    moduloNombre: "Avanzado",
    orden: 17,
    duracion: "15 min",
    icono: "Package",
    contenido: `## Export e Import

### Exportaciones con nombre
\`\`\`javascript
// math.js
export function sumar(a, b) { return a + b; }
export const PI = 3.14;
\`\`\`

### Exportación por defecto
\`\`\`javascript
// persona.js
export default class Persona {
    constructor(nombre) { this.nombre = nombre; }
}
\`\`\`

### Importar
\`\`\`javascript
import Persona from "./persona.js";
import { sumar, PI } from "./math.js";
\`\`\`

### Importar todo
\`\`\`javascript
import * as Math from "./math.js";
Math.sumar(1, 2);
\`\`\``,
    ejercicio: {
      descripcion: "Crea un objeto que simule un módulo con exportaciones nombradas y por defecto.",
      codigoInicial: `// Crea un objeto "mathModule" con:
// - sumar(a, b): retorna a + b
// - restar(a, b): retorna a - b
// - PI: constante con valor 3.14159
// Exporta todo como un objeto (simula export default)

`,
      codigoSolucion: `const mathModule = {
  sumar(a, b) { return a + b; },
  restar(a, b) { return a - b; },
  PI: 3.14159
};`,
      tests: [
        {
          descripcion: "mathModule es un objeto",
          codigo: `typeof mathModule === 'object' && mathModule !== null`,
        },
        {
          descripcion: "sumar funciona correctamente",
          codigo: `mathModule.sumar(2, 3) === 5`,
        },
        {
          descripcion: "restar funciona correctamente",
          codigo: `mathModule.restar(5, 2) === 3`,
        },
        {
          descripcion: "PI tiene el valor correcto",
          codigo: `mathModule.PI === 3.14159`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Modulos-pro", puntos: 25 },
  },
  {
    id: "expresiones-regulares",
    titulo: "Expresiones Regulares",
    descripcion: "Patrones, banderas, métodos de regex.",
    modulo: 3,
    moduloNombre: "Avanzado",
    orden: 18,
    duracion: "20 min",
    icono: "Regex",
    contenido: `## ¿Qué son las RegExp?

Las expresiones regulares son patrones que se usan para hacer coincidir combinaciones de caracteres.

\`\`\`javascript
let regex = /hola/i;  // i = case insensitive
regex.test("Hola Mundo");  // true
\`\`\`

## Métodos de RegExp
\`\`\`javascript
"hello".match(/ell/);  // ["ell"]
"hello".replace(/l/g, "r");  // "herro"
\`\`\`

## Patrones comunes
\`\`\`javascript
/\\d+/          // Uno o más dígitos
/\\w+/          // Uno o más caracteres de palabra
/\\s+/          // Uno o más espacios en blanco
/^ inicio/     // Inicio de cadena
/final$/       // Fin de cadena
\`\`\`

## Validación de email
\`\`\`javascript
function validarEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}
\`\`\``,
    ejercicio: {
      descripcion: "Crea una función 'validarEmail' que use una expresión regular.",
      codigoInicial: `// Crea una función "validarEmail" que:
// - reciba un email
// - retorne true si es válido, false si no
// - debe contener @ y al menos un .

`,
      codigoSolucion: `function validarEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}`,
      tests: [
        {
          descripcion: "validarEmail('test@email.com') es true",
          codigo: `validarEmail('test@email.com') === true`,
        },
        {
          descripcion: "validarEmail('invalido') es false",
          codigo: `validarEmail('invalido') === false`,
        },
        {
          descripcion: "validarEmail('usuario@dominio.co') es true",
          codigo: `validarEmail('usuario@dominio.co') === true`,
        },
        {
          descripcion: "validarEmail('sin@arroba') es false (falta punto)",
          codigo: `validarEmail('sin@arroba') === false`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Regex-ninja", puntos: 25 },
  },
  // ===== NIVEL 4: ESPECIALIZACIÓN =====
  {
    id: "algoritmos-complejidad",
    titulo: "Algoritmos y Complejidad",
    descripcion: "Big O, complejidad temporal y espacial.",
    modulo: 4,
    moduloNombre: "Especialización",
    orden: 19,
    duracion: "25 min",
    icono: "TrendingUp",
    contenido: `## ¿Qué es la complejidad algorítmica?

Mide cómo crece el tiempo de ejecución o el uso de memoria de un algoritmo a medida que crece la entrada.

## Notación Big O

| Complejidad | Nombre | Ejemplo |
|-------------|--------|---------|
| O(1) | Constante | Acceso por índice |
| O(log n) | Logarítmica | Búsqueda binaria |
| O(n) | Lineal | Recorrer un array |
| O(n²) | Cuadrática | Bubblesort |

## Ejemplos
\`\`\`javascript
// O(1) - Constante
function obtenerPrimero(array) { return array[0]; }

// O(n) - Lineal
function buscar(array, valor) {
    for (let item of array) {
        if (item === valor) return true;
    }
    return false;
}

// O(n²) - Cuadrática
function duplicar(array) {
    for (let i of array) {
        for (let j of array) {
            console.log(i, j);
        }
    }
}
\`\`\``,
    ejercicio: {
      descripcion: "Escribe dos funciones: una de complejidad O(1) y otra de complejidad O(n).",
      codigoInicial: `// 1. Crea "obtenerPrimero(array)" que retorne el primer elemento → O(1)
// 2. Crea "buscarElemento(array, valor)" que recorra el array
//    y retorne true si encuentra el valor, false si no → O(n)

`,
      codigoSolucion: `function obtenerPrimero(array) {
  return array[0];
}
function buscarElemento(array, valor) {
  for (let item of array) {
    if (item === valor) return true;
  }
  return false;
}`,
      tests: [
        {
          descripcion: "obtenerPrimero retorna el primer elemento",
          codigo: `obtenerPrimero([10, 20, 30]) === 10`,
        },
        {
          descripcion: "buscarElemento encuentra un elemento existente",
          codigo: `buscarElemento([1, 2, 3], 2) === true`,
        },
        {
          descripcion: "buscarElemento retorna false si no existe",
          codigo: `buscarElemento([1, 2, 3], 5) === false`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Big-O-experto", puntos: 30 },
  },
  {
    id: "estructuras-de-datos",
    titulo: "Estructuras de Datos",
    descripcion: "Linked List, Stack, Queue, Tree.",
    modulo: 4,
    moduloNombre: "Especialización",
    orden: 20,
    duracion: "30 min",
    icono: "Network",
    contenido: `## Stack (Pila) — LIFO
\`\`\`javascript
class Stack {
    constructor() { this.items = []; }
    push(item) { this.items.push(item); }
    pop() { return this.items.pop(); }
    peek() { return this.items[this.items.length - 1]; }
    isEmpty() { return this.items.length === 0; }
}
\`\`\`

## Queue (Cola) — FIFO
\`\`\`javascript
class Queue {
    constructor() { this.items = []; }
    enqueue(item) { this.items.push(item); }
    dequeue() { return this.items.shift(); }
    front() { return this.items[0]; }
    isEmpty() { return this.items.length === 0; }
}
\`\`\`

## Linked List
\`\`\`javascript
class Node {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}
\`\`\`

## Binary Tree
\`\`\`javascript
class TreeNode {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}
\`\`\``,
    ejercicio: {
      descripcion: "Implementa una clase Stack con push, pop y peek.",
      codigoInicial: `// Implementa una clase "Stack" con:
// - push(valor): agrega un elemento
// - pop(): elimina y retorna el último elemento
// - peek(): retorna el último elemento sin eliminarlo
// - isEmpty(): retorna true si está vacío

`,
      codigoSolucion: `class Stack {
  constructor() { this.items = []; }
  push(valor) { this.items.push(valor); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
}`,
      tests: [
        {
          descripcion: "Stack funciona correctamente",
          codigo: `(() => { const s = new Stack(); s.push(1); s.push(2); return s.peek() === 2 && s.pop() === 2 && s.isEmpty() === false; })()`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Data-structures", puntos: 30 },
  },
  {
    id: "sorting-algorithms",
    titulo: "Algoritmos de Ordenamiento",
    descripcion: "Bubble Sort, Quick Sort, Merge Sort.",
    modulo: 4,
    moduloNombre: "Especialización",
    orden: 21,
    duracion: "25 min",
    icono: "ArrowUpDown",
    contenido: `## Bubble Sort — O(n²)
\`\`\`javascript
function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}
\`\`\`

## Quick Sort — O(n log n)
\`\`\`javascript
function quickSort(array) {
    if (array.length <= 1) return array;
    let pivot = array[0];
    let izq = array.slice(1).filter(x => x <= pivot);
    let der = array.slice(1).filter(x => x > pivot);
    return [...quickSort(izq), pivot, ...quickSort(der)];
}
\`\`\`

## Merge Sort — O(n log n)
\`\`\`javascript
function mergeSort(array) {
    if (array.length <= 1) return array;
    let medio = Math.floor(array.length / 2);
    let izq = mergeSort(array.slice(0, medio));
    let der = mergeSort(array.slice(medio));
    return merge(izq, der);
}
\`\`\``,
    ejercicio: {
      descripcion: "Implementa la función bubbleSort.",
      codigoInicial: `// Implementa la función "bubbleSort" que:
// - reciba un array de números
// - retorne el array ordenado de menor a mayor

`,
      codigoSolucion: `function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}`,
      tests: [
        {
          descripcion: "bubbleSort ordena correctamente",
          codigo: `JSON.stringify(bubbleSort([3, 1, 4, 1, 5, 9])) === JSON.stringify([1, 1, 3, 4, 5, 9])`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Sort-master", puntos: 30 },
  },
  {
    id: "web-apis",
    titulo: "Web APIs",
    descripcion: "Fetch, Storage, Geolocation, Canvas.",
    modulo: 4,
    moduloNombre: "Especialización",
    orden: 22,
    duracion: "25 min",
    icono: "Globe",
    contenido: `## Fetch API
\`\`\`javascript
fetch("https://api.ejemplo.com/datos")
    .then(respuesta => respuesta.json())
    .then(datos => console.log(datos));
\`\`\`

## localStorage
\`\`\`javascript
localStorage.setItem("usuario", "Ana");
let usuario = localStorage.getItem("usuario");
localStorage.removeItem("usuario");
\`\`\`

## sessionStorage
\`\`\`javascript
sessionStorage.setItem("token", "abc123");
\`\`\`

## Geolocation
\`\`\`javascript
navigator.geolocation.getCurrentPosition(
    posicion => {
        console.log(posicion.coords.latitude);
        console.log(posicion.coords.longitude);
    }
);
\`\`\`

## Canvas
\`\`\`javascript
let canvas = document.getElementById("mi-canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "#F59E0B";
ctx.fillRect(0, 0, 150, 100);
\`\`\``,
    ejercicio: {
      descripcion: "Crea una función que maneje una API falsa con manejo de errores.",
      codigoInicial: `// Crea una función "buscarUsuario" que:
// - reciba un id
// - simule buscar en una base de datos (objeto)
// - retorne el usuario o "No encontrado"
// - use try/catch para manejar errores

`,
      codigoSolucion: `function buscarUsuario(id) {
  try {
    const usuarios = { 1: "Ana", 2: "Carlos", 3: "María" };
    if (!usuarios[id]) throw new Error("No encontrado");
    return usuarios[id];
  } catch (e) {
    return "No encontrado";
  }
}`,
      tests: [
        {
          descripcion: "buscarUsuario(1) retorna 'Ana'",
          codigo: `buscarUsuario(1) === "Ana"`,
        },
        {
          descripcion: "buscarUsuario(99) retorna 'No encontrado'",
          codigo: `buscarUsuario(99) === "No encontrado"`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Web-API-explorer", puntos: 30 },
  },
  {
    id: "proyectos-practicos",
    titulo: "Proyectos Prácticos",
    descripcion: "Todo App, Clima, CRUD — Integración completa.",
    modulo: 4,
    moduloNombre: "Especialización",
    orden: 23,
    duracion: "30 min",
    icono: "Rocket",
    contenido: `## Proyecto: Todo App

Un proyecto completo que integra varios conceptos:

\`\`\`javascript
class TodoApp {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }

    agregar(texto) {
        this.todos.push({
            id: this.nextId++,
            texto,
            completado: false
        });
    }

    completar(id) {
        let todo = this.todos.find(t => t.id === id);
        if (todo) todo.completado = true;
    }

    eliminar(id) {
        this.todos = this.todos.filter(t => t.id !== id);
    }

    listar() {
        return this.todos;
    }
}
\`\`\`

## Patrón MVC

- **Model:** Datos y lógica
- **View:** Presentación visual
- **Controller:** Conecta Model con View

## Mejores prácticas en proyectos reales

1. Separa lógica de presentación
2. Usa módulos para organizar código
3. Implementa manejo de errores robusto
4. Escribe tests para funcionalidad crítica
5. Documenta tu API pública`,
    ejercicio: {
      descripcion: "Implementa una clase TodoApp completa.",
      codigoInicial: `// Implementa la clase "TodoApp" con:
// - agregar(texto): agrega un todo
// - completar(id): marca como completado
// - eliminar(id): elimina un todo
// - listar(): retorna todos los todos
// - pendientes(): retorna solo los no completados

`,
      codigoSolucion: `class TodoApp {
  constructor() { this.todos = []; this.nextId = 1; }
  agregar(texto) { this.todos.push({ id: this.nextId++, texto, completado: false }); }
  completar(id) { const t = this.todos.find(t => t.id === id); if (t) t.completado = true; }
  eliminar(id) { this.todos = this.todos.filter(t => t.id !== id); }
  listar() { return this.todos; }
  pendientes() { return this.todos.filter(t => !t.completado); }
}`,
      tests: [
        {
          descripcion: "agregar y pendientes funcionan",
          codigo: `(() => { const app = new TodoApp(); app.agregar("Aprender JS"); app.agregar("Practicar"); app.completar(1); return app.pendientes().length === 1; })()`,
        },
        {
          descripcion: "eliminar remueve un todo",
          codigo: `(() => { const app = new TodoApp(); app.agregar("Uno"); app.agregar("Dos"); app.eliminar(1); return app.listar().length === 1 && app.listar()[0].id === 2; })()`,
        },
        {
          descripcion: "listar retorna todos los todos",
          codigo: `(() => { const app = new TodoApp(); app.agregar("A"); app.agregar("B"); app.agregar("C"); return app.listar().length === 3; })()`,
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Proyecto-completo", puntos: 30 },
  },

  // ===== EXÁMENES POR MÓDULO =====
  {
    id: "examen-modulo-1",
    titulo: "Examen — Fundamentos",
    descripcion: "Evalúa tus conocimientos de variables, tipos, operadores, control y funciones.",
    modulo: 1,
    moduloNombre: "Fundamentos",
    orden: 7,
    duracion: "20 min",
    icono: "Award",
    tipo: "examen",
    contenido: `## Examen del Módulo 1: Fundamentos

Resuelve los siguientes ejercicios para demostrar lo que has aprendido.

**Preguntas de opción múltiple:**
Selecciona la respuesta correcta en cada una.

**Ejercicios de código:**
Escribe el código que se solicita en cada caso.

> **Nota:** Necesitas al menos el 70% de respuestas correctas para aprobar.`,
    ejercicio: {
      descripcion: "Examen de Fundamentos — Opción múltiple y código",
      preguntas: [
        {
          tipo: "opcion",
          pregunta: "¿Cuál es la diferencia principal entre `let`, `const` y `var`?",
          opciones: [
            "let y const tienen alcance de bloque, var tiene alcance de función",
            "var y const son lo mismo, solo let cambia",
            "const no puede contener objetos",
            "let solo funciona en bucles",
          ],
          respuesta: 0,
        },
        {
          tipo: "opcion",
          pregunta: "¿Qué retorna `typeof null` en JavaScript?",
          opciones: [
            '"null"',
            '"object"',
            '"undefined"',
            '"boolean"',
          ],
          respuesta: 1,
        },
        {
          tipo: "codigo",
          descripcion: "Crea una función 'mayor' que reciba dos números y retorne el mayor.",
          codigoInicial: `// Función "mayor(a, b)" que retorna el mayor de los dos

`,
          codigoSolucion: `function mayor(a, b) { return a > b ? a : b; }`,
          tests: [
            { descripcion: "mayor(10, 5) retorna 10", codigo: `mayor(10, 5) === 10` },
            { descripcion: "mayor(3, 7) retorna 7", codigo: `mayor(3, 7) === 7` },
            { descripcion: "mayor(4, 4) retorna 4", codigo: `mayor(4, 4) === 4` },
          ],
        },
        {
          tipo: "codigo",
          descripcion: "Crea una función 'esPositivo' que reciba un número y retorne true si es positivo, false si es negativo o cero.",
          codigoInicial: `// Función "esPositivo(n)" que retorna true si n > 0

`,
          codigoSolucion: `function esPositivo(n) { return n > 0; }`,
          tests: [
            { descripcion: "esPositivo(5) es true", codigo: `esPositivo(5) === true` },
            { descripcion: "esPositivo(-3) es false", codigo: `esPositivo(-3) === false` },
            { descripcion: "esPositivo(0) es false", codigo: `esPositivo(0) === false` },
          ],
        },
        {
          tipo: "codigo",
          descripcion: "Crea una función 'sumatoria' que reciba un array de números y retorne la suma de todos.",
          codigoInicial: `// Función "sumatoria(arr)" que suma todos los elementos

`,
          codigoSolucion: `function sumatoria(arr) { return arr.reduce((s, n) => s + n, 0); }`,
          tests: [
            { descripcion: "sumatoria([1,2,3]) es 6", codigo: `sumatoria([1, 2, 3]) === 6` },
            { descripcion: "sumatoria([10, -5, 5]) es 10", codigo: `sumatoria([10, -5, 5]) === 10` },
            { descripcion: "sumatoria([]) es 0", codigo: `sumatoria([]) === 0` },
          ],
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Fundamentos-aprobado", puntos: 25 },
  },
  {
    id: "examen-modulo-2",
    titulo: "Examen — Intermedio",
    descripcion: "Evalúa tus conocimientos de objetos, arrays, closures, DOM y eventos.",
    modulo: 2,
    moduloNombre: "Intermedio",
    orden: 13,
    duracion: "25 min",
    icono: "Award",
    tipo: "examen",
    contenido: `## Examen del Módulo 2: Intermedio

Demuestra lo que has aprendido sobre objetos, arrays, funciones avanzadas, DOM y eventos.

> **Nota:** Necesitas al menos el 70% de respuestas correctas para aprobar.`,
    ejercicio: {
      descripcion: "Examen de Intermedio — Opción múltiple y código",
      preguntas: [
        {
          tipo: "opcion",
          pregunta: "¿Qué hace el método `Array.prototype.reduce()`?",
          opciones: [
            "Filtra elementos de un array",
            "Transforma cada elemento y retorna un nuevo array",
            "Acumula los elementos en un solo valor",
            "Invierte el orden del array",
          ],
          respuesta: 2,
        },
        {
          tipo: "opcion",
          pregunta: "¿Qué es un closure en JavaScript?",
          opciones: [
            "Una función que no retorna valores",
            "Una función que recuerda su scope léxico aunque se ejecute fuera de él",
            "Un tipo de variable global",
            "Un método para cerrar el navegador",
          ],
          respuesta: 1,
        },
        {
          tipo: "codigo",
          descripcion: "Crea un objeto 'calculadora' con métodos sumar(a,b), restar(a,b) y multiplicar(a,b).",
          codigoInicial: `// Objeto "calculadora" con 3 métodos matemáticos

`,
          codigoSolucion: `const calculadora = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b,
  multiplicar: (a, b) => a * b
};`,
          tests: [
            { descripcion: "calculadora.sumar(2,3) es 5", codigo: `calculadora.sumar(2, 3) === 5` },
            { descripcion: "calculadora.restar(10,4) es 6", codigo: `calculadora.restar(10, 4) === 6` },
            { descripcion: "calculadora.multiplicar(3,7) es 21", codigo: `calculadora.multiplicar(3, 7) === 21` },
          ],
        },
        {
          tipo: "codigo",
          descripcion: "Crea una función 'crearContador' que retorne un objeto con incrementar() y obtener(). obtener() debe retornar cuántas veces se llamó incrementar().",
          codigoInicial: `// Función "crearContador()" que retorna { incrementar(), obtener() }

`,
          codigoSolucion: `function crearContador() {
  let count = 0;
  return {
    incrementar() { count++; },
    obtener() { return count; }
  };
}`,
          tests: [
            { descripcion: "obtener() inicia en 0", codigo: `(() => { const c = crearContador(); return c.obtener() === 0; })()` },
            { descripcion: "incrementar aumenta el contador", codigo: `(() => { const c = crearContador(); c.incrementar(); c.incrementar(); return c.obtener() === 2; })()` },
            { descripcion: "contadores son independientes", codigo: `(() => { const c1 = crearContador(); const c2 = crearContador(); c1.incrementar(); return c1.obtener() === 1 && c2.obtener() === 0; })()` },
          ],
        },
        {
          tipo: "codigo",
          descripcion: "Crea una función 'filtrarPorLongitud' que reciba un array de strings y un número, y retorne solo los strings con esa longitud o mayor.",
          codigoInicial: `// "filtrarPorLongitud(strings, minLen)" retorna strings con longitud >= minLen

`,
          codigoSolucion: `function filtrarPorLongitud(strings, minLen) {
  return strings.filter(s => s.length >= minLen);
}`,
          tests: [
            { descripcion: "filtra correctamente", codigo: `JSON.stringify(filtrarPorLongitud(["hi", "hello", "hey", "hola"], 4)) === JSON.stringify(["hello", "hola"])` },
            { descripcion: "retorna vacío si ninguno cumple", codigo: `filtrarPorLongitud(["a", "bb"], 10).length === 0` },
          ],
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Intermedio-aprobado", puntos: 25 },
  },
  {
    id: "examen-modulo-3",
    titulo: "Examen — Avanzado",
    descripcion: "Evalúa tus conocimientos de clases, async/await, promesas, módulos y regex.",
    modulo: 3,
    moduloNombre: "Avanzado",
    orden: 19,
    duracion: "25 min",
    icono: "Award",
    tipo: "examen",
    contenido: `## Examen del Módulo 3: Avanzado

Demuestra lo que has aprendido sobre clases, programación asíncrona, módulos y expresiones regulares.

> **Nota:** Necesitas al menos el 70% de respuestas correctas para aprobar.`,
    ejercicio: {
      descripcion: "Examen de Avanzado — Opción múltiple y código",
      preguntas: [
        {
          tipo: "opcion",
          pregunta: "¿Cuál es la diferencia entre `Promise.all()` y `Promise.allSettled()`?",
          opciones: [
            "No hay diferencia, ambos hacen lo mismo",
            "Promise.all falla si alguna promesa falla, allSettled espera a todas",
            "Promise.allSettled es más rápido",
            "Promise.all solo acepta 2 promesas",
          ],
          respuesta: 1,
        },
        {
          tipo: "opcion",
          pregunta: "¿Qué hace la palabra clave `async` en una función?",
          opciones: [
            "Ejecuta el código en paralelo",
            "Convierte la función en un hilo separado",
            "Hace que la función retorne una Promise automáticamente",
            "Detiene la ejecución hasta que haya datos",
          ],
          respuesta: 2,
        },
        {
          tipo: "codigo",
          descripcion: "Crea una clase 'Persona' con constructor(name, age), un método saludar() que retorne 'Hola, soy {name}', y un método esMayorDeEdad() que retorne true si age >= 18.",
          codigoInicial: `// Clase "Persona" con saludar() y esMayorDeEdad()

`,
          codigoSolucion: `class Persona {
  constructor(name, age) { this.name = name; this.age = age; }
  saludar() { return "Hola, soy " + this.name; }
  esMayorDeEdad() { return this.age >= 18; }
}`,
          tests: [
            { descripcion: "saludar() retorna el nombre correcto", codigo: `new Persona("Ana", 25).saludar() === "Hola, soy Ana"` },
            { descripcion: "esMayorDeEdad() retorna true para 25", codigo: `new Persona("Ana", 25).esMayorDeEdad() === true` },
            { descripcion: "esMayorDeEdad() retorna false para 15", codigo: `new Persona("Bob", 15).esMayorDeEdad() === false` },
          ],
        },
        {
          tipo: "codigo",
          descripcion: "Crea una función 'esperarYRetornar' que espere N milisegundos y retorne un mensaje dado. Usa async/await.",
          codigoInicial: `// async function "esperarYRetornar(ms, mensaje)"
// espera ms milisegundos y retorna el mensaje

`,
          codigoSolucion: `async function esperarYRetornar(ms, mensaje) {
  await new Promise(r => setTimeout(r, ms));
  return mensaje;
}`,
          tests: [
            { descripcion: "retorna una promesa", codigo: `esperarYRetornar(10, "hola") instanceof Promise` },
            { descripcion: "resuelve con el mensaje correcto", codigo: `esperarYRetornar(10, "éxito").then(v => v === "éxito")` },
          ],
        },
        {
          tipo: "codigo",
          descripcion: "Crea una función 'extraerNumeros' que reciba un string y retorne un array con todos los números que contenga (como strings). Usa una expresión regular.",
          codigoInicial: `// "extraerNumeros('abc12def34')" retorna ["12", "34"]

`,
          codigoSolucion: `function extraerNumeros(str) {
  return str.match(/\\d+/g) || [];
}`,
          tests: [
            { descripcion: "extrae números correctamente", codigo: `JSON.stringify(extraerNumeros("abc12def34")) === JSON.stringify(["12", "34"])` },
            { descripcion: "retorna vacío si no hay números", codigo: `extraerNumeros("solo texto").length === 0` },
            { descripcion: "extrae números de diferentes tamaños", codigo: `JSON.stringify(extraerNumeros("1 dos 22 tres 333")) === JSON.stringify(["1", "22", "333"])` },
          ],
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Avanzado-aprobado", puntos: 25 },
  },
  {
    id: "examen-modulo-4",
    titulo: "Examen — Especialización",
    descripcion: "Evalúa tus conocimientos de algoritmos, estructuras de datos y proyectos prácticos.",
    modulo: 4,
    moduloNombre: "Especialización",
    orden: 24,
    duracion: "30 min",
    icono: "Award",
    tipo: "examen",
    contenido: `## Examen del Módulo 4: Especialización

Demuestra lo que has aprendido sobre algoritmos, estructuras de datos y resolución de problemas.

> **Nota:** Necesitas al menos el 70% de respuestas correctas para aprobar.`,
    ejercicio: {
      descripcion: "Examen de Especialización — Opción múltiple y código",
      preguntas: [
        {
          tipo: "opcion",
          pregunta: "¿Cuál es la complejidad temporal de acceder a un elemento por índice en un array?",
          opciones: [
            "O(n)",
            "O(log n)",
            "O(1)",
            "O(n²)",
          ],
          respuesta: 2,
        },
        {
          tipo: "opcion",
          pregunta: "¿Qué estructura de datos funciona bajo el principio LIFO (Last In, First Out)?",
          opciones: [
            "Cola (Queue)",
            "Pila (Stack)",
            "Array",
            "Objeto",
          ],
          respuesta: 1,
        },
        {
          tipo: "codigo",
          descripcion: "Implementa una función 'fibonacci(n)' que retorne el nth número de la secuencia de Fibonacci (empezando en 0). fibonacci(0)=0, fibonacci(1)=1, fibonacci(6)=8.",
          codigoInicial: `// "fibonacci(n)" retorna el nth número de Fibonacci

`,
          codigoSolucion: `function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) { [a, b] = [b, a + b]; }
  return b;
}`,
          tests: [
            { descripcion: "fibonacci(0) es 0", codigo: `fibonacci(0) === 0` },
            { descripcion: "fibonacci(1) es 1", codigo: `fibonacci(1) === 1` },
            { descripcion: "fibonacci(6) es 8", codigo: `fibonacci(6) === 8` },
            { descripcion: "fibonacci(10) es 55", codigo: `fibonacci(10) === 55` },
          ],
        },
        {
          tipo: "codigo",
          descripcion: "Implementa una función 'invertirPalabras' que reciba una frase y retorne las palabras en orden inverso. invertirPalabras('hola mundo cruel') → 'cruel mundo hola'.",
          codigoInicial: `// "invertirPalabras(frase)" retorna las palabras invertidas

`,
          codigoSolucion: `function invertirPalabras(frase) {
  return frase.split(" ").reverse().join(" ");
}`,
          tests: [
            { descripcion: "invierte 3 palabras", codigo: `invertirPalabras("hola mundo cruel") === "cruel mundo hola"` },
            { descripcion: "invierte 1 palabra", codigo: `invertirPalabras("sol") === "sol"` },
            { descripcion: "invierte 4 palabras", codigo: `invertirPalabras("uno dos tres cuatro") === "cuatro tres dos uno"` },
          ],
        },
        {
          tipo: "codigo",
          descripcion: "Implementa una función 'contarVocales' que retorne el número de vocales (a, e, i, o, u) en un string. No importa mayúsculas/minúsculas.",
          codigoInicial: `// "contarVocales(texto)" retorna el número de vocales

`,
          codigoSolucion: `function contarVocales(texto) {
  return (texto.match(/[aeiou]/gi) || []).length;
}`,
          tests: [
            { descripcion: "cuenta vocales en 'hola'", codigo: `contarVocales("hola") === 2` },
            { descripcion: "cuenta vocales en 'JavaScript'", codigo: `contarVocales("JavaScript") === 3` },
            { descripcion: "retorna 0 para string sin vocales", codigo: `contarVocales("rhythm") === 0` },
            { descripcion: "cuenta mayúsculas y minúsculas", codigo: `contarVocales("AEIOU") === 5` },
          ],
        },
      ],
    },
    completada: false,
    recompensa: { insignia: "Especializacion-aprobado", puntos: 30 },
  },
];

export const modulos = [
  { id: 1, nombre: "Fundamentos", descripcion: "Las bases de JavaScript", icono: "BookOpen" },
  { id: 2, nombre: "Intermedio", descripcion: "Objetos, arrays y funciones avanzadas", icono: "Code2" },
  { id: 3, nombre: "Avanzado", descripcion: "Clases, async, módulos y regex", icono: "Zap" },
  { id: 4, nombre: "Especialización", descripcion: "Algoritmos, estructuras y proyectos", icono: "Rocket" },
];

export function getLeccionPorId(id) {
  return lecciones.find((l) => l.id === id);
}

export function getLeccionesPorModulo(moduloId) {
  return lecciones.filter((l) => l.modulo === moduloId);
}

export function getSiguienteLeccion(leccionActual) {
  const index = lecciones.findIndex((l) => l.id === leccionActual.id);
  return lecciones[index + 1] || null;
}

export function getLeccionAnterior(leccionActual) {
  const index = lecciones.findIndex((l) => l.id === leccionActual.id);
  return lecciones[index - 1] || null;
}

export function getProgresoTotal(leccionesCompletadas) {
  return Math.round((leccionesCompletadas.length / lecciones.length) * 100);
}
