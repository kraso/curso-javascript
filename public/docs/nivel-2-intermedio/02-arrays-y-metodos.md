# Lección 2: Arrays y Métodos

## Objetivos de aprendizaje

- [ ] Crear arrays de diferentes maneras y acceder a sus elementos
- [ ] Dominar los métodos de manipulación: push, pop, shift, unshift, splice, slice
- [ ] Aplicar métodos de iteración: forEach, map, filter, reduce, find, some, every
- [ ] Implementar ordenamiento y búsqueda en arrays
- [ ] Usar destructuring de arrays y el operador spread
- [ ] Combinar múltiples métodos para resolver problemas complejos

---

## 1. Creación de Arrays

Un array es una colección ordenada de elementos. En JavaScript, los arrays son objetos especiales con propiedades numéricas indexadas.

```javascript
// Forma 1: Literal de array
const numeros = [1, 2, 3, 4, 5];

// Forma 2: Constructor de Array
const frutas = new Array("manzana", "plátano", "naranja");

// Forma 3: Array vacío y llenado posterior
const vacio = [];
vacio[0] = "primer elemento";
vacio[1] = "segundo elemento";

// Forma 4: Array con valores por defecto
const matriz = new Array(3).fill(0);
// Resultado: [0, 0, 0]

// Forma 5: Array desde una cadena
const letras = Array.from("hola");
// Resultado: ["h", "o", "l", "a"]

// Forma 6: Array desde un iterable
const rango = Array.from({ length: 5 }, (_, i) => i + 1);
// Resultado: [1, 2, 3, 4, 5]
```

### Acceso a elementos

```javascript
const colores = ["rojo", "verde", "azul", "amarillo", "violeta"];

// Acceso por índice (comienza en 0)
console.log(colores[0]);      // "rojo"
console.log(colores[2]);      // "azul"
console.log(colores[colores.length - 1]); // "violeta" (último elemento)

// Propiedad length
console.log(colores.length);  // 5

// Acceso negativo (desde el final)
console.log(colores.at(-1));  // "violeta"
console.log(colores.at(-2));  // "amarillo"

// Modificación de elementos
colores[1] = "verde claro";
console.log(colores); // ["rojo", "verde claro", "azul", "amarillo", "violeta"]
```

---

## 2. Métodos de Manipulación

### push y pop

```javascript
// push: agrega elementos al final
const pila = [1, 2, 3];
pila.push(4, 5, 6);
console.log(pila); // [1, 2, 3, 4, 5, 6]
console.log(pila.length); // 6

// push retorna la nueva longitud
const nuevaLongitud = pila.push(7);
console.log(nuevaLongitud); // 7

// pop: elimina y retorna el último elemento
const ultimo = pila.pop();
console.log(ultimo); // 7
console.log(pila);   // [1, 2, 3, 4, 5, 6]

// pop en array vacío retorna undefined
const vacio = [];
console.log(vacio.pop()); // undefined
```

### shift y unshift

```javascript
// unshift: agrega elementos al inicio
const cola = [3, 4, 5];
cola.unshift(1, 2);
console.log(cola); // [1, 2, 3, 4, 5]

// shift: elimina y retorna el primer elemento
const primero = cola.shift();
console.log(primero); // 1
console.log(cola);    // [2, 3, 4, 5]

// Ejemplo práctico: cola de impresión
const colaImpresion = [];
colaImpresion.push("documento1.pdf");
colaImpresion.push("documento2.docx");
console.log(colaImpresion); // ["documento1.pdf", "documento2.docx"]

const procesando = colaImpresion.shift();
console.log(`Imprimiendo: ${procesando}`); // "Imprimiendo: documento1.pdf"
console.log(colaImpresion); // ["documento2.docx"]
```

### splice

```javascript
// splice(indice, cantidadAEliminar, ...elementosAAgregar)
const meses = ["ene", "feb", "mar", "abr", "may"];

// Eliminar elementos
const eliminados = meses.splice(1, 2);
console.log(eliminados); // ["feb", "mar"]
console.log(meses);      // ["ene", "abr", "may"]

// Insertar elementos
meses.splice(1, 0, "feb", "mar");
console.log(meses); // ["ene", "feb", "mar", "abr", "may"]

// Reemplazar elementos
meses.splice(2, 1, "MARCH");
console.log(meses); // ["ene", "feb", "MARCH", "abr", "may"]

// Eliminar desde el índice hasta el final
const numeros = [1, 2, 3, 4, 5];
numeros.splice(2);
console.log(numeros); // [1, 2]

// Usar splice comoCodeAtivo para copiar un array
const original = [1, 2, 3, 4, 5];
const copia = original.splice(0);
console.log(original); // [] (original queda vacío)
console.log(copia);    // [1, 2, 3, 4, 5]
```

### slice

```javascript
// slice(inicio, fin) - no modifica el original
const letras = ["a", "b", "c", "d", "e", "f"];

// Extraer subarray
const porcion1 = letras.slice(2, 4);
console.log(porcion1); // ["c", "d"]

// Desde un índice hasta el final
const porcion2 = letras.slice(3);
console.log(porcion2); // ["d", "e", "f"]

// Desde el inicio hasta un índice (sin incluir)
const porcion3 = letras.slice(0, 3);
console.log(porcion3); // ["a", "b", "c"]

// Copia superficial del array completo
const copia = letras.slice();
console.log(copia); // ["a", "b", "c", "d", "e", "f"]
console.log(copia === letras); // false (son diferentes arrays)

// Indices negativos
const porcion4 = letras.slice(-3);
console.log(porcion4); // ["d", "e", "f"]
```

---

## 3. Métodos de Iteración

### forEach

```javascript
const frutas = ["manzana", "plátano", "naranja", "uva"];

// Sintaxis básica
frutas.forEach(function(fruta, indice, arreglo) {
    console.log(`${indice}: ${fruta}`);
});
// 0: manzana
// 1: plátano
// 2: naranja
// 3: uva

// Con arrow function
frutas.forEach((fruta, i) => {
    console.log(`Fruta ${i + 1}: ${fruta}`);
});

// forEach no retorna nada (retorna undefined)
const resultado = frutas.forEach(fruta => fruta.toUpperCase());
console.log(resultado); // undefined

// Ejemplo práctico: crear HTML de una lista
const usuarios = ["Ana", "Carlos", "María"];
let html = "<ul>";
usuarios.forEach(usuario => {
    html += `<li>${usuario}</li>`;
});
html += "</ul>";
console.log(html);
```

### map

```javascript
const numeros = [1, 2, 3, 4, 5];

// Crear nuevo array transformando cada elemento
const dobles = numeros.map(num => num * 2);
console.log(dobles); // [2, 4, 6, 8, 10]
console.log(numeros); // [1, 2, 3, 4, 5] (original sin cambios)

// Extraer propiedades de objetos
const personas = [
    { nombre: "Ana", edad: 25 },
    { nombre: "Carlos", edad: 30 },
    { nombre: "María", edad: 28 }
];

const nombres = personas.map(p => p.nombre);
console.log(nombres); // ["Ana", "Carlos", "María"]

// Transformar estructura de datos
const precios = [100, 200, 300];
const preciosConIva = precios.map(precio => ({
    original: precio,
    conIva: precio * 1.21
}));
console.log(preciosConIva);
// [{ original: 100, conIva: 121 }, { original: 200, conIva: 242 }, ...]

// map con índice
const indices = frutas.map((fruta, i) => `${i}: ${fruta}`);
console.log(indices); // ["0: manzana", "1: plátano", ...]
```

### filter

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filtrar números pares
const pares = numeros.filter(num => num % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]

// Filtrar objetos por condición
const productos = [
    { nombre: "Laptop", precio: 999, enStock: true },
    { nombre: "Mouse", precio: 25, enStock: true },
    { nombre: "Teclado", precio: 75, enStock: false },
    { nombre: "Monitor", precio: 450, enStock: true }
];

const disponibles = productos.filter(p => p.enStock);
console.log(disponibles);
// [{ nombre: "Laptop", ... }, { nombre: "Mouse", ... }, { nombre: "Monitor", ... }]

const baratos = productos.filter(p => p.precio < 100);
console.log(baratos);
// [{ nombre: "Mouse", ... }, { nombre: "Teclado", ... }]

// Combinar condiciones
const disponiblesYBaratos = productos.filter(p => p.enStock && p.precio < 100);
console.log(disponiblesYBaratos);
// [{ nombre: "Mouse", precio: 25, enStock: true }]

// filter retorna un nuevo array (puede estar vacío)
const vacio = numeros.filter(num => num > 100);
console.log(vacio); // []
```

### reduce

```javascript
const numeros = [1, 2, 3, 4, 5];

// Suma de todos los elementos
const suma = numeros.reduce((acumulador, actual) => {
    return acumulador + actual;
}, 0);
console.log(suma); // 15

// Productoria de todos los elementos
const productoria = numeros.reduce((acc, num) => acc * num, 1);
console.log(productoria); // 120

// Encontrar el máximo
const maximo = numeros.reduce((acc, num) => {
    return num > acc ? num : acc;
}, numeros[0]);
console.log(maximo); // 5

// Contar ocurrencias
const letras = ["a", "b", "a", "c", "a", "b", "d"];
const conteo = letras.reduce((acc, letra) => {
    acc[letra] = (acc[letra] || 0) + 1;
    return acc;
}, {});
console.log(conteo); // { a: 3, b: 2, c: 1, d: 1 }

// Agrupar por propiedad
const personas = [
    { nombre: "Ana", departamento: "Ventas" },
    { nombre: "Carlos", departamento: "IT" },
    { nombre: "María", departamento: "Ventas" },
    { nombre: "Pedro", departamento: "IT" },
    { nombre: "Laura", departamento: "RRHH" }
];

const porDepto = personas.reduce((acc, persona) => {
    const depto = persona.departamento;
    if (!acc[depto]) {
        acc[depto] = [];
    }
    acc[depto].push(persona);
    return acc;
}, {});
console.log(porDepto);
// { Ventas: [{...}, {...}], IT: [{...}, {...}], RRHH: [{...}] }
```

### find y findIndex

```javascript
const usuarios = [
    { id: 1, nombre: "Ana", activo: true },
    { id: 2, nombre: "Carlos", activo: false },
    { id: 3, nombre: "María", activo: true },
    { id: 4, nombre: "Pedro", activo: true }
];

// find: retorna el primer elemento que cumple la condición
const usuarioInactivo = usuarios.find(u => !u.activo);
console.log(usuarioInactivo); // { id: 2, nombre: "Carlos", activo: false }

// findIndex: retorna el índice del primer elemento que cumple la condición
const indiceCarlos = usuarios.findIndex(u => u.nombre === "Carlos");
console.log(indiceCarlos); // 1

// find retorna undefined si no encuentra nada
const noExiste = usuarios.find(u => u.nombre === "Inexistente");
console.log(noExiste); // undefined

// findIndex retorna -1 si no encuentra nada
const indiceNoExiste = usuarios.findIndex(u => u.nombre === "Inexistente");
console.log(indiceNoExiste); // -1
```

### some y every

```javascript
const numeros = [2, 4, 6, 8, 10];
const impares = [1, 3, 5, 7, 9];
const mixto = [1, 2, 3, 4, 5];

// some: verifica si AL MENOS UNO cumple la condición
console.log(numeros.some(n => n % 2 === 0));  // true (hay pares)
console.log(impares.some(n => n % 2 === 0));   // false (no hay pares)
console.log(mixto.some(n => n > 10));          // false (ninguno mayor a 10)

// every: verifica si TODOS cumplen la condición
console.log(numeros.every(n => n % 2 === 0));  // true (todos son pares)
console.log(impares.every(n => n % 2 === 1));  // true (todos son impares)
console.log(mixto.every(n => n % 2 === 0));    // false (no todos son pares)

// Ejemplo práctico: validación de formularios
const campos = [
    { nombre: "email", valor: "ana@ejemplo.com", requerido: true },
    { nombre: "telefono", valor: "", requerido: false },
    { nombre: "nombre", valor: "Ana García", requerido: true }
];

const todosRequeridosLlenos = campos
    .filter(c => c.requerido)
    .every(c => c.valor.length > 0);
console.log(todosRequeridosLlenos); // true
```

---

## 4. Ordenamiento y Búsqueda

### sort

```javascript
// sort modifica el array original
const numeros = [40, 100, 1, 5, 25, 10];

// Ordenamiento por defecto (lexicográfico)
numeros.sort();
console.log(numeros); // [1, 10, 100, 25, 40, 5] (¡incorrecto!)

// Ordenamiento numérico ascendente
numeros.sort((a, b) => a - b);
console.log(numeros); // [1, 5, 10, 25, 40, 100]

// Ordenamiento numérico descendente
numeros.sort((a, b) => b - a);
console.log(numeros); // [100, 40, 25, 10, 5, 1]

// Ordenar objetos por propiedad
const productos = [
    { nombre: "Laptop", precio: 999 },
    { nombre: "Mouse", precio: 25 },
    { nombre: "Monitor", precio: 450 }
];

productos.sort((a, b) => a.precio - b.precio);
console.log(productos);
// [{ nombre: "Mouse", ... }, { nombre: "Monitor", ... }, { nombre: "Laptop", ... }]

// Ordenar por nombre (alfabético)
productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
console.log(productos.map(p => p.nombre));
// ["Laptop", "Monitor", "Mouse"]

// reverse: invierte el orden
const original = [1, 2, 3, 4, 5];
original.reverse();
console.log(original); // [5, 4, 3, 2, 1]
```

### indexOf y includes

```javascript
const frutas = ["manzana", "plátano", "naranja", "uva", "naranja"];

// indexOf: retorna el índice de la primera ocurrencia
console.log(frutas.indexOf("naranja")); // 2
console.log(frutas.indexOf("pera"));    // -1 (no existe)

// includes: retorna true/false
console.log(frutas.includes("uva"));    // true
console.log(frutas.includes("pera"));   // false

// indexOf con índice de inicio
console.log(frutas.indexOf("naranja", 3)); // 4 (desde el índice 3)

// includes con índice de inicio
console.log(frutas.includes("naranja", 3)); // true
```

---

## 5. Destructuring de Arrays

```javascript
// Asignación básica
const numeros = [10, 20, 30, 40, 50];
const [primero, segundo, tercero] = numeros;
console.log(primero);  // 10
console.log(segundo);  // 20
console.log(tercero);  // 30

// Saltar elementos
const [a, , c, , e] = numeros;
console.log(a, c, e); // 10, 30, 50

// Valor por defecto
const [x = 0, y = 0, z = 0] = [1, 2];
console.log(x, y, z); // 1, 2, 0

// Rest operator
const [primer, ...resto] = numeros;
console.log(primer); // 10
console.log(resto);  // [20, 30, 40, 50]

// Intercambiar variables
let varA = 1;
let varB = 2;
[varA, varB] = [varB, varA];
console.log(varA, varB); // 2, 1

// Destructuring en parámetros de funciones
function imprimirCoordenadas([x, y, z]) {
    console.log(`X: ${x}, Y: ${y}, Z: ${z}`);
}
imprimirCoordenadas([10, 20, 30]); // X: 10, Y: 20, Z: 30

// Destructuring anidado
const matriz = [[1, 2], [3, 4], [5, 6]];
const [[a1, a2], [b1, b2]] = matriz;
console.log(a1, a2, b1, b2); // 1, 2, 3, 4
```

---

## 6. Operador Spread con Arrays

```javascript
// Copiar un array
const original = [1, 2, 3];
const copia = [...original];
console.log(copia); // [1, 2, 3]
console.log(copia === original); // false

// Combinar arrays
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinado = [...array1, ...array2];
console.log(combinado); // [1, 2, 3, 4, 5, 6]

// Agregar elementos
const numeros = [3, 4, 5];
const conInicio = [1, 2, ...numeros];
console.log(conInicio); // [1, 2, 3, 4, 5]

const conFin = [...numeros, 6, 7];
console.log(conFin); // [3, 4, 5, 6, 7]

// Copiar y modificar
const original2 = [1, 2, 3, 4, 5];
const sinPrimero = [...original2];
sinPrimero.shift();
console.log(sinPrimero); // [2, 3, 4, 5]
console.log(original2);  // [1, 2, 3, 4, 5] (sin cambios)

// Spread en funciones
function sumar(...numeros) {
    return numeros.reduce((acc, num) => acc + num, 0);
}
console.log(sumar(1, 2, 3, 4, 5)); // 15

const nums = [10, 20, 30];
console.log(sumar(...nums)); // 60
```

---

## 7. Patrones Comunes

### Encadenamiento de métodos

```javascript
const ventas = [
    { producto: "Laptop", cantidad: 5, precio: 999 },
    { producto: "Mouse", cantidad: 20, precio: 25 },
    { producto: "Teclado", cantidad: 15, precio: 75 },
    { producto: "Monitor", cantidad: 3, precio: 450 },
    { producto: "Mouse", cantidad: 10, precio: 25 }
];

// Calcular ingreso total de ventas de mouse
const ingresoMouse = ventas
    .filter(v => v.producto === "Mouse")
    .reduce((acc, v) => acc + (v.cantidad * v.precio), 0);
console.log(ingresoMouse); // 750

// Obtener productos únicos con más de 10 unidades vendidas
const productosPopulares = [...new Set(
    ventas
        .filter(v => v.cantidad > 10)
        .map(v => v.producto)
)];
console.log(productosPopulares); // ["Mouse", "Teclado"]

// Resumen de ventas por producto
const resumen = ventas.reduce((acc, venta) => {
    const { producto, cantidad, precio } = venta;
    if (!acc[producto]) {
        acc[producto] = { totalUnidades: 0, totalIngresos: 0 };
    }
    acc[producto].totalUnidades += cantidad;
    acc[producto].totalIngresos += cantidad * precio;
    return acc;
}, {});
console.log(resumen);
```

### Flat y flatMap

```javascript
// flat: aplanar arrays anidados
const anidado = [1, 2, [3, 4], [5, [6, 7]]];
console.log(anidado.flat());    // [1, 2, 3, 4, 5, [6, 7]]
console.log(anidado.flat(2));   // [1, 2, 3, 4, 5, 6, 7]

// flatMap: map + flat(1)
const oraciones = ["Hola mundo", "JavaScript es genial"];
const palabras = oraciones.flatMap(oracion => oracion.split(" "));
console.log(palabras); // ["Hola", "mundo", "JavaScript", "es", "genial"]
```

### Array.from y Array.isArray

```javascript
// Array.isArray: verificar si es un array
console.log(Array.isArray([1, 2, 3]));      // true
console.log(Array.isArray("hola"));          // false
console.log(Array.isArray({ length: 3 }));   // false

// Array.from: crear array desde iterables
const conjunto = new Set([1, 2, 3, 2, 1]);
const arrayDesdeConjunto = Array.from(conjunto);
console.log(arrayDesdeConjunto); // [1, 2, 3]

// Crear array de caracteres únicos
const caracteres = Array.from("mississippi", (char, i) => ({
    char,
    indice: i
}));
console.log(caracteres);
// [{char: "m", indice: 0}, {char: "i", indice: 1}, ...]
```

---

## Buenas prácticas

1. **No mutar el array original**: Usa métodos que retornen nuevos arrays (map, filter, slice) en lugar de mutar (splice, sort, reverse).
2. **Usar arrow functions para callbacks cortos**: `arr.map(x => x * 2)` es más legible que `arr.map(function(x) { return x * 2; })`.
3. **Encadenar métodos con moderación**: Demasiadas líneas encadenadas dificultan la depuración. Divide en pasos si es necesario.
4. **Usar const para arrays**: Aunque modifiques su contenido, la referencia no cambia.
5. **Verificar con Array.isArray()**: No asumas que un valor es un array.
6. **Usar reduce con cuidado**: Es poderoso pero puede ser difícil de leer. Comenta la lógica compleja.
7. **Preferir find sobre filter cuando buscas uno solo**: find es más eficiente y semánticamente más claro.

---

## Ejercicios

### Ejercicio 1: Manipulación básica (10 puntos)
Dado el array `const nums = [10, 20, 30, 40, 50];`:
1. Agrega el número 60 al final
2. Elimina el último elemento
3. Agrega 5 al inicio
4. Elimina el primer elemento
5. Inserta 25 en la posición 2 (sin eliminar nada)

### Ejercicio 2: Transformación con map y filter (15 puntos)
Dado un array de productos:
```javascript
const productos = [
    { nombre: "Laptop", precio: 999, categoria: "electrónica" },
    { nombre: "Libro", precio: 15, categoria: "educación" },
    { nombre: "Mouse", precio: 25, categoria: "electrónica" },
    { nombre: "Cuaderno", precio: 5, categoria: "educación" },
    { nombre: "Monitor", precio: 350, categoria: "electrónica" }
];
```
1. Filtra solo productos de electrónica
2. Obtiene un array con solo los nombres
3. Calcula el precio promedio de electrónica
4. Crea un array de objetos con `{nombre, precioConIva}` (IVA 21%)

### Ejercicio 3: Reduce avanzado (15 puntos)
Dado el array de ventas:
```javascript
const ventas = [
    { vendedor: "Ana", monto: 1500 },
    { vendedor: "Carlos", monto: 2000 },
    { vendedor: "Ana", monto: 800 },
    { vendedor: "María", monto: 1200 },
    { vendedor: "Carlos", monto: 500 },
    { vendedor: "Ana", monto: 300 }
];
```
1. Calcula el total de ventas de cada vendedor
2. Encuentra al vendedor con mayor venta individual
3. Calcula el promedio de ventas por vendedor
4. Crea un ranking ordenado de mayor a menor ingreso total

### Ejercicio 4: Destructuring y spread (10 puntos)
```javascript
const datos = {
    nombre: "Empresa XYZ",
    direccion: { calle: "Principal 123", ciudad: "Madrid" },
    empleados: ["Ana", "Carlos", "María"]
};
```
1. Extrae `nombre`, `ciudad` y el primer empleado usando destructuring
2. Crea un nuevo objeto sin el array `empleados`
3. Agrega "Pedro" al array de empleados usando spread
4. Crea una copia del objeto dirección con la ciudad cambiada a "Barcelona"

### Ejercicio 5: Encadenamiento de métodos (15 puntos)
Dado un array de transacciones:
```javascript
const transacciones = [
    { id: 1, tipo: "ingreso", monto: 1000, fecha: "2024-01-15" },
    { id: 2, tipo: "egreso", monto: 500, fecha: "2024-01-20" },
    { id: 3, tipo: "ingreso", monto: 2000, fecha: "2024-02-10" },
    { id: 4, tipo: "egreso", monto: 300, fecha: "2024-02-15" },
    { id: 5, tipo: "ingreso", monto: 1500, fecha: "2024-03-01" }
];
```
1. Calcula el saldo final (ingresos - egresos)
2. Encuentra la transacción de mayor monto
3. Agrupa las transacciones por mes
4. Crea un resumen con: totalIngresos, totalEgresos, saldo, cantidadTransacciones

### Ejercicio 6: Problema integrador (20 puntos)
Crea un sistema de carrito de compras que permita:
```javascript
const carrito = [];
const productos = [
    { id: 1, nombre: "Laptop", precio: 999 },
    { id: 2, nombre: "Mouse", precio: 25 },
    { id: 3, nombre: "Teclado", precio: 75 },
    { id: 4, nombre: "Monitor", precio: 450 }
];
```
1. Función `agregarProducto(id)` que agregue al carrito
2. Función `eliminarProducto(id)` que remueva del carrito
3. Función `calcularTotal()` que sume todos los precios
4. Función `aplicarDescuento(porcentaje)` que retorne el total con descuento
5. Función `resumenCarrito()` que retorne un objeto con: cantidad, subtotal, descuento, total
6. Función `buscarProducto(nombre)` que busque en los productos disponibles

---

## Soluciones

### Solución Ejercicio 1

```javascript
const nums = [10, 20, 30, 40, 50];

// 1. Agrega el número 60 al final
nums.push(60);
console.log(nums); // [10, 20, 30, 40, 50, 60]

// 2. Elimina el último elemento
nums.pop();
console.log(nums); // [10, 20, 30, 40, 50]

// 3. Agrega 5 al inicio
nums.unshift(5);
console.log(nums); // [5, 10, 20, 30, 40, 50]

// 4. Elimina el primer elemento
nums.shift();
console.log(nums); // [10, 20, 30, 40, 50]

// 5. Inserta 25 en la posición 2
nums.splice(2, 0, 25);
console.log(nums); // [10, 20, 25, 30, 40, 50]
```

### Solución Ejercicio 2

```javascript
const productos = [
    { nombre: "Laptop", precio: 999, categoria: "electrónica" },
    { nombre: "Libro", precio: 15, categoria: "educación" },
    { nombre: "Mouse", precio: 25, categoria: "electrónica" },
    { nombre: "Cuaderno", precio: 5, categoria: "educación" },
    { nombre: "Monitor", precio: 350, categoria: "electrónica" }
];

// 1. Filtra solo productos de electrónica
const electronicos = productos.filter(p => p.categoria === "electrónica");
console.log(electronicos);

// 2. Obtiene un array con solo los nombres
const nombres = electronicos.map(p => p.nombre);
console.log(nombres); // ["Laptop", "Mouse", "Monitor"]

// 3. Calcula el precio promedio de electrónica
const promedioElectronica = electronicos
    .reduce((acc, p) => acc + p.precio, 0) / electronicos.length;
console.log(promedioElectronica); // 458

// 4. Crea array con precioConIva
const conIva = electronicos.map(p => ({
    nombre: p.nombre,
    precioConIva: p.precio * 1.21
}));
console.log(conIva);
// [{nombre: "Laptop", precioConIva: 1208.79}, ...]
```

### Solución Ejercicio 3

```javascript
const ventas = [
    { vendedor: "Ana", monto: 1500 },
    { vendedor: "Carlos", monto: 2000 },
    { vendedor: "Ana", monto: 800 },
    { vendedor: "María", monto: 1200 },
    { vendedor: "Carlos", monto: 500 },
    { vendedor: "Ana", monto: 300 }
];

// 1. Total de ventas por vendedor
const totalPorVendedor = ventas.reduce((acc, v) => {
    acc[v.vendedor] = (acc[v.vendedor] || 0) + v.monto;
    return acc;
}, {});
console.log(totalPorVendedor); // { Ana: 2600, Carlos: 2500, María: 1200 }

// 2. Vendedor con mayor venta individual
const mayorVenta = ventas.reduce((max, v) =>
    v.monto > max.monto ? v : max
);
console.log(mayorVenta); // { vendedor: "Carlos", monto: 2000 }

// 3. Promedio de ventas por vendedor
const promedios = Object.entries(totalPorVendedor).map(([vendedor, total]) => ({
    vendedor,
    promedio: total / ventas.filter(v => v.vendedor === vendedor).length
}));
console.log(promedios);

// 4. Ranking ordenado
const ranking = Object.entries(totalPorVendedor)
    .map(([vendedor, total]) => ({ vendedor, total }))
    .sort((a, b) => b.total - a.total);
console.log(ranking);
// [{vendedor: "Ana", total: 2600}, {vendedor: "Carlos", total: 2500}, ...]
```

### Solución Ejercicio 4

```javascript
const datos = {
    nombre: "Empresa XYZ",
    direccion: { calle: "Principal 123", ciudad: "Madrid" },
    empleados: ["Ana", "Carlos", "María"]
};

// 1. Destructuring
const { nombre, direccion: { ciudad }, empleados: [primerEmpleado] } = datos;
console.log(nombre);       // "Empresa XYZ"
console.log(ciudad);       // "Madrid"
console.log(primerEmpleado); // "Ana"

// 2. Nuevo objeto sin empleados
const { empleados, ...resto } = datos;
console.log(resto);
// { nombre: "Empresa XYZ", direccion: { calle: "Principal 123", ciudad: "Madrid" } }

// 3. Agregar empleado con spread
const nuevosEmpleados = [...datos.empleados, "Pedro"];
console.log(nuevosEmpleados); // ["Ana", "Carlos", "María", "Pedro"]

// 4. Copia de dirección con ciudad cambiada
const nuevaDireccion = { ...datos.direccion, ciudad: "Barcelona" };
console.log(nuevaDireccion); // { calle: "Principal 123", ciudad: "Barcelona" }
```

### Solución Ejercicio 5

```javascript
const transacciones = [
    { id: 1, tipo: "ingreso", monto: 1000, fecha: "2024-01-15" },
    { id: 2, tipo: "egreso", monto: 500, fecha: "2024-01-20" },
    { id: 3, tipo: "ingreso", monto: 2000, fecha: "2024-02-10" },
    { id: 4, tipo: "egreso", monto: 300, fecha: "2024-02-15" },
    { id: 5, tipo: "ingreso", monto: 1500, fecha: "2024-03-01" }
];

// 1. Saldo final
const saldo = transacciones.reduce((acc, t) => {
    return t.tipo === "ingreso" ? acc + t.monto : acc - t.monto;
}, 0);
console.log(saldo); // 3700

// 2. Transacción de mayor monto
const mayorTransaccion = transacciones.reduce((max, t) =>
    t.monto > max.monto ? t : max
);
console.log(mayorTransaccion);

// 3. Agrupar por mes
const porMes = transacciones.reduce((acc, t) => {
    const mes = t.fecha.substring(0, 7);
    if (!acc[mes]) acc[mes] = [];
    acc[mes].push(t);
    return acc;
}, {});
console.log(porMes);

// 4. Resumen
const resumen = transacciones.reduce((acc, t) => {
    acc.cantidadTransacciones++;
    if (t.tipo === "ingreso") {
        acc.totalIngresos += t.monto;
    } else {
        acc.totalEgresos += t.monto;
    }
    acc.saldo = acc.totalIngresos - acc.totalEgresos;
    return acc;
}, { totalIngresos: 0, totalEgresos: 0, saldo: 0, cantidadTransacciones: 0 });
console.log(resumen);
```

### Solución Ejercicio 6

```javascript
const carrito = [];
const productos = [
    { id: 1, nombre: "Laptop", precio: 999 },
    { id: 2, nombre: "Mouse", precio: 25 },
    { id: 3, nombre: "Teclado", precio: 75 },
    { id: 4, nombre: "Monitor", precio: 450 }
];

// 1. Agregar producto
function agregarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push({ ...producto, cantidad: 1 });
        console.log(`${producto.nombre} agregado al carrito`);
    } else {
        console.log("Producto no encontrado");
    }
}

// 2. Eliminar producto
function eliminarProducto(id) {
    const indice = carrito.findIndex(p => p.id === id);
    if (indice !== -1) {
        const eliminado = carrito.splice(indice, 1)[0];
        console.log(`${eliminado.nombre} eliminado del carrito`);
    } else {
        console.log("Producto no está en el carrito");
    }
}

// 3. Calcular total
function calcularTotal() {
    return carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
}

// 4. Aplicar descuento
function aplicarDescuento(porcentaje) {
    const total = calcularTotal();
    return total * (1 - porcentaje / 100);
}

// 5. Resumen del carrito
function resumenCarrito() {
    const subtotal = calcularTotal();
    const descuento = subtotal * 0.1; // 10% descuento
    return {
        cantidad: carrito.length,
        subtotal,
        descuento,
        total: subtotal - descuento
    };
}

// 6. Buscar producto
function buscarProducto(nombre) {
    return productos.filter(p =>
        p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
}

// Demostración
agregarProducto(1);
agregarProducto(2);
agregarProducto(3);
console.log("Total:", calcularTotal());
console.log("Con descuento:", aplicarDescuento(10));
console.log("Resumen:", resumenCarrito());
console.log("Buscar 'o':", buscarProducto("o"));
```
