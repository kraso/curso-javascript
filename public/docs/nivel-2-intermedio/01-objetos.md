# Lección 1: Objetos

## Objetivos de aprendizaje

- [ ] Crear objetos con literales de objeto
- [ ] Acceder y modificar propiedades con notación de punto y corchetes
- [ ] Entender la diferencia entre propiedades y métodos
- [ ] Usar el operador `in` y `Object.keys()`
- [ ] Conocer la copia por referencia vs copia por valor

---

## 1. ¿Qué es un objeto?

Un objeto es una colección de **pares clave-valor**. Es como un diccionario o una caja etiquetada con múltiples compartimentos.

```javascript
// Literal de objeto
let persona = {
    nombre: "Ana",
    edad: 25,
    activo: true
};

console.log(persona.nombre);  // "Ana"
console.log(persona["edad"]); // 25
```

---

## 2. Literales de objeto

### Sintaxis básica

```javascript
let objeto = {
    clave1: valor1,
    clave2: valor2,
    clave3: valor3
};
```

### Nombres de claves

```javascript
let usuario = {
    // Clave simple
    nombre: "Carlos",

    // Clave con guiones (usar corchetes)
    "mi-clave": "valor",

    // Clave calculada (usar corchetes)
    ["campo" + "Extra"]: "algo",

    // Método (función como propiedad)
    saludar() {
        return `Hola, soy ${this.nombre}`;
    }
};

console.log(usuario.nombre);       // "Carlos"
console.log(usuario["mi-clave"]);  // "valor"
console.log(usuario.campoExtra);   // "algo"
console.log(usuario.saludar());    // "Hola, soy Carlos"
```

---

## 3. Acceder a propiedades

### Notación de punto

```javascript
let persona = { nombre: "Ana", edad: 25 };

console.log(persona.nombre);  // "Ana"
console.log(persona.edad);    // 25
```

### Notación de corchetes

```javascript
let persona = { nombre: "Ana", edad: 25 };

let clave = "nombre";
console.log(persona[clave]);  // "Ana"

// Útil para claves dinámicas
let propiedad = prompt("¿Qué propiedad quieres ver?");
console.log(persona[propiedad]);
```

### Cuándo usar cada una

```javascript
// ✅ Notación de punto - más legible
persona.nombre

// ✅ Notación de corchetes - para claves dinámicas o especiales
persona["mi-clave"]
persona[variable]
```

---

## 4. Agregar y modificar propiedades

```javascript
let coche = { marca: "Toyota", modelo: "Corolla" };

// Agregar nueva propiedad
coche.año = 2020;
coche["color"] = "rojo";

// Modificar propiedad existente
coche.modelo = "Camry";

// Eliminar propiedad
delete coche.color;

console.log(coche);
// { marca: "Toyota", modelo: "Camry", año: 2020 }
```

---

## 5. Métodos (funciones en objetos)

```javascript
let calculadora = {
    resultado: 0,

    sumar(a, b) {
        this.resultado = a + b;
        return this;
    },

    restar(a, b) {
        this.resultado = a - b;
        return this;
    },

    mostrar() {
        console.log(`Resultado: ${this.resultado}`);
        return this;
    }
};

// Uso
calculadora.sumar(5, 3).mostrar();  // "Resultado: 8"
```

---

## 6. Verificar propiedades

### Operador `in`

```javascript
let persona = { nombre: "Ana", edad: 25 };

console.log("nombre" in persona);   // true
console.log("email" in persona);    // false
console.log("toString" in persona); // true (heredado)
```

### `hasOwnProperty()`

```javascript
let persona = { nombre: "Ana", edad: 25 };

console.log(persona.hasOwnProperty("nombre"));   // true
console.log(persona.hasOwnProperty("toString")); // false
```

### Métodos estáticos de Object

```javascript
let persona = { nombre: "Ana", edad: 25 };

console.log(Object.keys(persona));    // ["nombre", "edad"]
console.log(Object.values(persona));  // ["Ana", 25]
console.log(Object.entries(persona)); // [["nombre", "Ana"], ["edad", 25]]
console.log(Object.assign({}, persona, { email: "ana@ej.com" }));
```

---

## 7. Copia de objetos

### Copia por referencia (¡cuidado!)

```javascript
let original = { nombre: "Ana" };
let copia = original;

copia.nombre = "Carlos";

console.log(original.nombre);  // "Carlos" (¡también cambió!)
```

### Copia superficial (shallow copy)

```javascript
let original = { nombre: "Ana", direccion: { ciudad: "Madrid" } };

// Con Object.assign
let copia1 = Object.assign({}, original);

// Con spread operator
let copia2 = { ...original };

copia1.nombre = "Carlos";
console.log(original.nombre);  // "Ana" ✅

// Pero los objetos anidados siguen siendo por referencia
copia1.direccion.ciudad = "Barcelona";
console.log(original.direccion.ciudad);  // "Barcelona" ❌
```

### Copia profunda (deep copy)

```javascript
let original = { nombre: "Ana", direccion: { ciudad: "Madrid" } };

// Con JSON (limitaciones: no copia funciones, undefined, etc.)
let copia = JSON.parse(JSON.stringify(original));

// Con structuredClone (modernos navegadores)
let copia2 = structuredClone(original);

copia.direccion.ciudad = "Barcelona";
console.log(original.direccion.ciudad);  // "Madrid" ✅
```

---

## 8. Desestructuración de objetos

```javascript
let persona = { nombre: "Ana", edad: 25, email: "ana@ej.com" };

// Desestructuración básica
let { nombre, edad } = persona;
console.log(nombre);  // "Ana"
console.log(edad);    // 25

// Renombrar variables
let { nombre: n, edad: e } = persona;
console.log(n);  // "Ana"
console.log(e);  // 25

// Valor por defecto
let { nombre, telefono = "No disponible" } = persona;
console.log(telefono);  // "No disponible"

// Anidados
let usuario = {
    id: 1,
    datos: {
        nombre: "Ana",
        direccion: {
            ciudad: "Madrid"
        }
    }
};

let { datos: { nombre, direccion: { ciudad } } } = usuario;
console.log(nombre);  // "Ana"
console.log(ciudad);  // "Madrid"
```

---

## 9. Iteración sobre objetos

```javascript
let persona = { nombre: "Ana", edad: 25, email: "ana@ej.com" };

// for...in
for (let clave in persona) {
    console.log(`${clave}: ${persona[clave]}`);
}

// Object.entries + for...of
for (let [clave, valor] of Object.entries(persona)) {
    console.log(`${clave}: ${valor}`);
}

// Object.keys + forEach
Object.keys(persona).forEach(clave => {
    console.log(`${clave}: ${persona[clave]}`);
});
```

---

## 10. Computed property names

```javascript
let campo = "nombre";
let valor = "Ana";

let persona = {
    [campo]: valor,
    [`get${campo.charAt(0).toUpperCase() + campo.slice(1)}`]() {
        return this[campo];
    }
};

console.log(persona.nombre);      // "Ana"
console.log(persona.getNombre()); // "Ana"
```

---

## Resumen

- Los objetos almacenan pares clave-valor
- Usa notación de punto (`obj.clave`) para claves conocidas
- Usa notación de corchetes (`obj["clave"]`) para claves dinámicas
- Los métodos son funciones que van dentro del objeto
- Usa `Object.keys()`, `Object.values()`, `Object.entries()` para iterar
- Cuidado con la copia por referencia — usa spread `...` o `structuredClone`
- La desestructuración simplifica la extracción de propiedades

---

## Ejercicios

### Ejercicio 1 (Básico) — 1 punto
**Crear un perfil**

Crea un objeto `perfil` con: nombre, edad, email, activo. Agrega un método `mostrarInfo()` que retorne un string con toda la información.

### Ejercicio 2 (Básico) — 2 puntos
**Calculadora de propiedades**

Dado un objeto con números como valores, crea una función `sumarValores(obj)` que sume todos los valores numéricos.

```javascript
let precios = { manzana: 5, plátano: 3, naranja: 4 };
sumarValores(precios);  // 12
```

### Ejercicio 3 (Intermedio) — 2 puntos
**Filtrar propiedades**

Crea una función `filtrarPorValor(obj, condicion)` que retorne un nuevo objeto solo con las propiedades que cumplan la condición.

```javascript
let edades = { Ana: 25, Carlos: 17, María: 30, Pedro: 15 };
filtrarPorValor(edades, v => v >= 18);
// { Ana: 25, María: 30 }
```

### Ejercicio 4 (Intermedio) — 2 puntos
**Merge de objetos**

Crea una función `mergeProfundo(obj1, obj2)` que fusione dos objetos, incluyendo objetos anidados.

### Ejercicio 5 (Avanzado) — 3 puntos
**Clonación de objetos**

Crea una función `clonarProfundo(obj)` que haga una copia profunda de un objeto (sin usar `structuredClone` o `JSON`). Debe manejar:
- Objetos anidados
- Arrays
- Primitivos

### Ejercicio 6 (Práctico) — 3 puntos
**Sistema de carrito de compras**

Crea un objeto `carrito` con:
- `productos`: array de objetos {nombre, precio, cantidad}
- `agregar(producto, precio, cantidad)`
- `eliminar(nombre)`
- `total()` — Retorna el costo total
- `resumen()` — Retorna un string con el detalle

---

## Soluciones

### Solución Ejercicio 1
```javascript
let perfil = {
    nombre: "Ana",
    edad: 25,
    email: "ana@ej.com",
    activo: true,

    mostrarInfo() {
        return `${this.nombre}, ${this.edad} años - ${this.email} [${this.activo ? "Activo" : "Inactivo"}]`;
    }
};

console.log(perfil.mostrarInfo());  // "Ana, 25 años - ana@ej.com [Activo]"
```

### Solución Ejercicio 2
```javascript
function sumarValores(obj) {
    return Object.values(obj).reduce((suma, valor) => suma + valor, 0);
}

let precios = { manzana: 5, plátano: 3, naranja: 4 };
console.log(sumarValores(precios));  // 12
```

### Solución Ejercicio 3
```javascript
function filtrarPorValor(obj, condicion) {
    let resultado = {};
    for (let [clave, valor] of Object.entries(obj)) {
        if (condicion(valor)) {
            resultado[clave] = valor;
        }
    }
    return resultado;
}

let edades = { Ana: 25, Carlos: 17, María: 30, Pedro: 15 };
console.log(filtrarPorValor(edades, v => v >= 18));
// { Ana: 25, María: 30 }
```

### Solución Ejercicio 4
```javascript
function mergeProfundo(obj1, obj2) {
    let resultado = { ...obj1 };

    for (let [clave, valor] of Object.entries(obj2)) {
        if (
            typeof valor === "object" &&
            valor !== null &&
            !Array.isArray(valor) &&
            typeof resultado[clave] === "object" &&
            resultado[clave] !== null
        ) {
            resultado[clave] = mergeProfundo(resultado[clave], valor);
        } else {
            resultado[clave] = valor;
        }
    }

    return resultado;
}
```

### Solución Ejercicio 5
```javascript
function clonarProfundo(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => clonarProfundo(item));
    }

    let clon = {};
    for (let [clave, valor] of Object.entries(obj)) {
        clon[clave] = clonarProfundo(valor);
    }
    return clon;
}
```

### Solución Ejercicio 6
```javascript
let carrito = {
    productos: [],

    agregar(nombre, precio, cantidad = 1) {
        let existente = this.productos.find(p => p.nombre === nombre);
        if (existente) {
            existente.cantidad += cantidad;
        } else {
            this.productos.push({ nombre, precio, cantidad });
        }
    },

    eliminar(nombre) {
        this.productos = this.productos.filter(p => p.nombre !== nombre);
    },

    total() {
        return this.productos.reduce(
            (suma, p) => suma + p.precio * p.cantidad, 0
        );
    },

    resumen() {
        if (this.productos.length === 0) return "Carrito vacío";

        let detalle = this.productos
            .map(p => `${p.nombre} x${p.cantidad}: $${p.precio * p.cantidad}`)
            .join("\n");

        return `${detalle}\n\nTotal: $${this.total()}`;
    }
};

carrito.agregar("Manzana", 5, 3);
carrito.agregar("Pan", 2, 2);
carrito.agregar("Leche", 3);
console.log(carrito.resumen());
// Manzana x3: $15
// Pan x2: $4
// Leche x1: $3
//
// Total: $22
```
