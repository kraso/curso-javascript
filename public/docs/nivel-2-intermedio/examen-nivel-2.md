# Examen Nivel 2: Intermedio

## Informacion general

- **Duracion**: 90 minutos
- **Puntaje total**: 50 puntos
- **Aprobacion**: 35 puntos (70%)
- **Tema**: Objetos, Arrays, Funciones Avanzadas, Closures, DOM, Eventos

---

## Parte A: Teoria (20 puntos)

Responde las siguientes preguntas con explicaciones breves.

### Pregunta 1 (2 puntos)
Cual es la diferencia entre `var`, `let` y `const` en cuanto a alcance y reasignacion?

### Pregunta 2 (2 puntos)
Explica que es un closure y da un ejemplo de uso practico.

### Pregunta 3 (2 puntos)
Cual es la diferencia entre `map()` y `forEach()`? Cuando usar uno u otro?

### Pregunta 4 (2 puntos)
Que es el event bubbling y como se puede detener?

### Pregunta 5 (2 puntos)
Explica que es el patron Module y que problema resuelve.

### Pregunta 6 (2 puntos)
Cual es la diferencia entre `textContent` e `innerHTML`? Cual es mas seguro?

### Pregunta 7 (2 puntos)
Que es memoization y en que casos es util?

### Pregunta 8 (2 puntos)
Explica que es event delegation y por que es preferido a agregar listeners individuales.

### Pregunta 9 (2 puntos)
Que es currying? Escribe un ejemplo de una funcion curryada.

### Pregunta 10 (2 puntos)
Cual es la diferencia entre `slice()` y `splice()`?

---

## Parte B: Practica (30 puntos)

Resuelve los siguientes ejercicios escribiendo codigo JavaScript.

### Ejercicio 1: Arrays (5 puntos)
Dado el siguiente array de objetos:

```javascript
const empleados = [
    { id: 1, nombre: "Ana Garcia", departamento: "Ventas", salario: 35000 },
    { id: 2, nombre: "Carlos Lopez", departamento: "IT", salario: 45000 },
    { id: 3, nombre: "Maria Rodriguez", departamento: "Ventas", salario: 40000 },
    { id: 4, nombre: "Pedro Martinez", departamento: "IT", salario: 50000 },
    { id: 5, nombre: "Laura Sanchez", departamento: "RRHH", salario: 38000 }
];
```

Escribe las siguientes expresiones:
1. Filtra empleados con salario mayor a 40000
2. Obtiene un array con solo los nombres
3. Calcula el salario promedio
4. Agrupa empleados por departamento
5. Encuentra al empleado con mayor salario

### Ejercicio 2: Funciones avanzadas (5 puntos)
Implementa las siguientes funciones:

1. Una funcion `factorial(n)` que calcule el factorial de forma recursiva
2. Una funcion `memoize(fn)` que implemente memoization
3. Una funcion `debounce(fn, delay)` que retrase la ejecucion
4. Una funcion `curry(fn)` que convierta una funcion a formato curry
5. Una funcion `compose(...fns)` que componga funciones de derecha a izquierda

### Ejercicio 3: Closures (5 puntos)
Crea un sistema de cuenta bancaria usando closures que permita:

1. Crear una cuenta con saldo inicial
2. Depositar dinero (validar monto positivo)
3. Retirar dinero (validar saldo suficiente)
4. Consultar saldo actual
5. Obtener historial de transacciones

### Ejercicio 4: DOM (5 puntos)
Escribe codigo para:

1. Seleccionar todos los elementos con clase `.tarjeta` y cambiar su color de fondo
2. Crear una lista desordenada a partir de un array de strings
3. Eliminar todos los hijos de un elemento padre
4. Clonar un elemento y agregarlo al final del body
5. Obtener el texto de todos los elementos `<p>` dentro de un div

### Ejercicio 5: Eventos (5 puntos)
Implementa:

1. Un sistema de validacion de formulario usando event delegation
2. Un efecto de typing (maquina de escribir) usando teclado
3. Un menu que se abra/cierre al hacer clic en un boton
4. Un contador que se reinicie despues de 5 segundos
5. Un buscador que filtre elementos en tiempo real

### Ejercicio 6: Problema integrador (5 puntos)
Crea un sistema de notas (to-do list) completo que incluya:

1. Agregar notas con titulo y contenido
2. Editar notas existentes
3. Eliminar notas
4. Marcar como importante
5. Filtrar por estado (todas, importantes, completadas)
6. Guardar en localStorage

---

## Soluciones

### Soluciones Parte A: Teoria

#### Solucion Pregunta 1
- **var**: Funcion-scoped (alcance de funcion), permite redeclaracion y reasignacion. Crea propiedades en el objeto global.
- **let**: Block-scoped (alcance de bloque), permite reasignacion pero NO redeclaracion en el mismo scope.
- **const**: Block-scoped, NO permite reasignacion ni redeclaracion. Debe inicializarse al declarar.

```javascript
// var se escapa del bloque
if (true) {
    var x = 1;
}
console.log(x); // 1

// let y const se quedan en el bloque
if (true) {
    let y = 1;
    const z = 2;
}
// console.log(y); // ReferenceError
// console.log(z); // ReferenceError
```

#### Solucion Pregunta 2
Un closure es cuando una funcion "recuerda" el alcance en el que fue creada, incluso despues de que ese alcance haya terminado de ejecutarse.

```javascript
function crearContador() {
    let count = 0; // Variable del closure
    
    return function() {
        count++;
        return count;
    };
}

const contador = crearContador();
console.log(contador()); // 1
console.log(contador()); // 2
// La funcion interna mantiene referencia a 'count'
```

Uso practico: privacidad de datos, funciones de fabrica, iteradores.

#### Solucion Pregunta 3
- **map()**: Retorna un nuevo array con los elementos transformados. Se usa cuando quieres transformar datos.
- **forEach()**: No retorna nada (undefined). Se usa para ejecutar un efecto secundario.

```javascript
const numeros = [1, 2, 3];

// map: crea nuevo array
const dobles = numeros.map(n => n * 2); // [2, 4, 6]

// forEach: ejecuta accion
numeros.forEach(n => console.log(n)); // undefined, solo imprime
```

#### Solucion Pregunta 4
El bubbling es la fase donde el evento se propaga desde el elemento objetivo hacia arriba en el DOM (hijo -> padre -> abuelo).

Se detiene con `event.stopPropagation()`:

```javascript
elemento.addEventListener("click", (e) => {
    e.stopPropagation(); // Detiene la propagacion
});
```

Tambien existe `stopImmediatePropagation()` que detiene otros listeners del mismo elemento.

#### Solucion Pregunta 5
El Module Pattern usa closures para crear encapsulamiento y privacidad en JavaScript. Resuelve el problema de no tener modulos nativos (antes de ES6).

```javascript
const MiModulo = (function() {
    let privado = 0; // Variable privada
    
    return {
        incrementar() { privado++; },
        obtener() { return privado; }
    };
})();
```

Permite crear interfaces publicas mientras se oculta la implementacion interna.

#### Solucion Pregunta 6
- **textContent**: Obtiene/establece solo texto plano. NO interpreta HTML. Es mas rapido y seguro.
- **innerHTML**: Obtiene/establece HTML. SI interpreta las etiquetas HTML. Puede ser vulnerable a XSS.

```javascript
const div = document.getElementById("mi-div");

// Seguro
div.textContent = "Hola <b>mundo</b>"; // Muestra el HTML como texto

// Peligroso con contenido de usuario
div.innerHTML = userInput; // Puede ejecutar scripts maliciosos
```

**Recomendacion**: Usar `textContent` cuando solo necesites texto.

#### Solucion Pregunta 7
La memoization es una tecnica de optimizacion que almacena los resultados de llamadas anteriores para evitar calculos repetidos.

```javascript
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const factorial = memoize((n) => n <= 1 ? 1 : n * factorial(n - 1));
```

Es util en: fibonacci, factorials, funciones puras costosas, caching de API.

#### Solucion Pregunta 8
El event delegation es un patron que pone un solo listener en el padre para manejar eventos de muchos hijos, aprovechando el bubbling.

```javascript
// En lugar de agregar listeners a cada item
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", handler); // Muchos listeners
});

// Un solo listener en el padre
document.querySelector(".lista").addEventListener("click", (e) => {
    if (e.target.closest(".item")) {
        // Manejar clic
    }
});
```

Ventajas: mejor rendimiento, funciona con elementos dinamicos, menos memoria.

#### Solucion Pregunta 9
El currying transforma una funcion con multiples argumentos en una secuencia de funciones que reciben un solo argumento.

```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...args2) => curried(...args, ...args2);
    };
}

const sumar = curry((a, b, c) => a + b + c);
console.log(sumar(1)(2)(3)); // 6
console.log(sumar(1, 2)(3)); // 6
```

#### Solucion Pregunta 10
- **slice(start, end)**: Retorna un subarray SIN modificar el original. No incluye el indice 'end'.
- **splice(start, deleteCount, ...items)**: MODIFICA el array original, eliminando/reemplazando/insertando elementos.

```javascript
const arr = [1, 2, 3, 4, 5];

// slice: no modifica
const sub = arr.slice(1, 3); // [2, 3]
console.log(arr); // [1, 2, 3, 4, 5] (sin cambios)

// splice: modifica
const eliminados = arr.splice(1, 2); // [2, 3]
console.log(arr); // [1, 4, 5] (modificado)
```

---

### Soluciones Parte B: Practica

#### Solucion Ejercicio 1: Arrays

```javascript
const empleados = [
    { id: 1, nombre: "Ana Garcia", departamento: "Ventas", salario: 35000 },
    { id: 2, nombre: "Carlos Lopez", departamento: "IT", salario: 45000 },
    { id: 3, nombre: "Maria Rodriguez", departamento: "Ventas", salario: 40000 },
    { id: 4, nombre: "Pedro Martinez", departamento: "IT", salario: 50000 },
    { id: 5, nombre: "Laura Sanchez", departamento: "RRHH", salario: 38000 }
];

// 1. Filtra empleados con salario mayor a 40000
const altosSalarios = empleados.filter(e => e.salario > 40000);
console.log(altosSalarios);

// 2. Array con solo los nombres
const nombres = empleados.map(e => e.nombre);
console.log(nombres);

// 3. Salario promedio
const promedio = empleados.reduce((acc, e) => acc + e.salario, 0) / empleados.length;
console.log(promedio); // 41600

// 4. Agrupar por departamento
const porDepto = empleados.reduce((acc, emp) => {
    const depto = emp.departamento;
    if (!acc[depto]) acc[depto] = [];
    acc[depto].push(emp);
    return acc;
}, {});
console.log(porDepto);

// 5. Empleado con mayor salario
const mayorSalario = empleados.reduce((max, emp) => 
    emp.salario > max.salario ? emp : max
);
console.log(mayorSalario); // Pedro Martinez
```

#### Solucion Ejercicio 2: Funciones avanzadas

```javascript
// 1. Factorial recursivo
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 2. Memoize
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const factorialMemo = memoize((n) => {
    if (n <= 1) return 1;
    return n * factorialMemo(n - 1);
});

// 3. Debounce
function debounce(fn, delay) {
    let timerId;
    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 4. Curry
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...args2) => curried(...args, ...args2);
    };
}

// 5. Compose
function compose(...fns) {
    return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

// Ejemplo de uso
const sumar = curry((a, b, c) => a + b + c);
console.log(sumar(1)(2)(3)); // 6

const procesar = compose(
    x => x * 2,
    x => x + 1,
    x => x * 3
);
console.log(procesar(2)); // 14 ((2*3)+1)*2
```

#### Solucion Ejercicio 3: Closures

```javascript
function crearCuenta(saldoInicial) {
    let saldo = saldoInicial;
    const historial = [];
    
    function registrarMovimiento(tipo, monto) {
        historial.push({
            tipo,
            monto,
            saldo: saldo,
            fecha: new Date().toISOString()
        });
    }
    
    return {
        depositar(monto) {
            if (monto <= 0) {
                throw new Error("El monto debe ser positivo");
            }
            saldo += monto;
            registrarMovimiento("deposito", monto);
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
        
        obtenerHistorial() {
            return [...historial];
        }
    };
}

// Uso
const cuenta = crearCuenta(1000);
cuenta.depositar(500);
cuenta.retirar(200);
console.log(cuenta.consultarSaldo()); // 1300
console.log(cuenta.obtenerHistorial());
```

#### Solucion Ejercicio 4: DOM

```javascript
// 1. Cambiar color de fondo de todas las tarjetas
const tarjetas = document.querySelectorAll(".tarjeta");
tarjetas.forEach(tarjeta => {
    tarjeta.style.backgroundColor = "#f0f0f0";
});

// 2. Crear lista desordenada desde array
function crearLista(textos) {
    const ul = document.createElement("ul");
    textos.forEach(texto => {
        const li = document.createElement("li");
        li.textContent = texto;
        ul.appendChild(li);
    });
    return ul;
}

const frutas = ["Manzana", "Platano", "Naranja"];
document.body.appendChild(crearLista(frutas));

// 3. Eliminar todos los hijos
function eliminarHijos(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

// 4. Clonar elemento
const original = document.querySelector(".mi-elemento");
const clon = original.cloneNode(true);
document.body.appendChild(clon);

// 5. Obtener texto de todos los parrafos
function obtenerTextosParrafos(contenedor) {
    const parrafos = contenedor.querySelectorAll("p");
    return Array.from(parrafos).map(p => p.textContent);
}
```

#### Solucion Ejercicio 5: Eventos

```javascript
// 1. Validacion con delegation
const formulario = document.querySelector("#mi-formulario");
formulario.addEventListener("input", (e) => {
    if (e.target.required && !e.target.value) {
        e.target.classList.add("error");
    } else {
        e.target.classList.remove("error");
    }
});

// 2. Efecto typing
function typewriter(elemento, texto, velocidad = 100) {
    let i = 0;
    elemento.textContent = "";
    
    function escribir() {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
            setTimeout(escribir, velocidad);
        }
    }
    
    escribir();
}

// 3. Menu toggle
const botonMenu = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");

botonMenu.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

// 4. Contador con reset
function crearContadorConReset(elemento, segundos) {
    let count = 0;
    let timerId;
    
    function actualizar() {
        elemento.textContent = count;
    }
    
    function iniciar() {
        count++;
        actualizar();
        
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            count = 0;
            actualizar();
        }, segundos * 1000);
    }
    
    return iniciar;
}

// 5. Buscador en tiempo real
const inputBusqueda = document.querySelector("#busqueda");
const items = document.querySelectorAll(".item");

inputBusqueda.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    items.forEach(item => {
        const visible = item.textContent.toLowerCase().includes(texto);
        item.style.display = visible ? "" : "none";
    });
});
```

#### Solucion Ejercicio 6: To-Do List

```javascript
function crearTodoApp() {
    let notas = JSON.parse(localStorage.getItem("notas")) || [];
    let filtroActual = "todas";
    
    const container = document.createElement("div");
    container.className = "todo-app";
    
    // Event bus
    const eventos = {
        listeners: {},
        on(evento, callback) {
            if (!this.listeners[evento]) this.listeners[evento] = [];
            this.listeners[evento].push(callback);
        },
        emit(evento, datos) {
            if (this.listeners[evento]) {
                this.listeners[evento].forEach(cb => cb(datos));
            }
        }
    };
    
    function guardar() {
        localStorage.setItem("notas", JSON.stringify(notas));
        eventos.emit("notas:actualizadas", notas);
    }
    
    // Formulario
    const formulario = document.createElement("form");
    formulario.innerHTML = `
        <input type="text" name="titulo" placeholder="Titulo" required>
        <textarea name="contenido" placeholder="Contenido"></textarea>
        <button type="submit">Agregar</button>
    `;
    
    const inputTitulo = formulario.querySelector('[name="titulo"]');
    const textareaContenido = formulario.querySelector('[name="contenido"]');
    
    // Filtros
    const filtros = document.createElement("div");
    filtros.innerHTML = `
        <button data-filtro="todas">Todas</button>
        <button data-filtro="importantes">Importantes</button>
        <button data-filtro="completadas">Completadas</button>
    `;
    
    // Lista
    const lista = document.createElement("div");
    lista.className = "notas-lista";
    
    // Event delegation para notas
    lista.addEventListener("click", (e) => {
        const id = parseInt(e.target.closest("[data-id]")?.dataset.id);
        if (!id) return;
        
        const nota = notas.find(n => n.id === id);
        if (!nota) return;
        
        if (e.target.closest(".btn-editar")) {
            const nuevoTitulo = prompt("Titulo:", nota.titulo);
            const nuevoContenido = prompt("Contenido:", nota.contenido);
            if (nuevoTitulo) nota.titulo = nuevoTitulo;
            if (nuevoContenido !== null) nota.contenido = nuevoContenido;
            guardar();
            renderizar();
        }
        
        if (e.target.closest(".btn-eliminar")) {
            notas = notas.filter(n => n.id !== id);
            guardar();
            renderizar();
        }
        
        if (e.target.closest(".btn-importante")) {
            nota.importante = !nota.importante;
            guardar();
            renderizar();
        }
        
        if (e.target.closest(".btn-completar")) {
            nota.completada = !nota.completada;
            guardar();
            renderizar();
        }
    });
    
    // Filtros
    filtros.addEventListener("click", (e) => {
        const filtro = e.target.dataset.filtro;
        if (filtro) {
            filtroActual = filtro;
            filtros.querySelectorAll("button").forEach(btn => {
                btn.classList.toggle("activo", btn.dataset.filtro === filtro);
            });
            renderizar();
        }
    });
    
    // Agregar nota
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        notas.push({
            id: Date.now(),
            titulo: inputTitulo.value.trim(),
            contenido: textareaContenido.value.trim(),
            importante: false,
            completada: false,
            fecha: new Date().toISOString()
        });
        
        inputTitulo.value = "";
        textareaContenido.value = "";
        guardar();
        renderizar();
    });
    
    function renderizar() {
        const notasFiltradas = notas.filter(nota => {
            if (filtroActual === "importantes") return nota.importante;
            if (filtroActual === "completadas") return nota.completada;
            return true;
        });
        
        lista.innerHTML = notasFiltradas.length === 0 
            ? "<p>No hay notas</p>"
            : notasFiltradas.map(nota => `
                <div class="nota ${nota.completada ? 'completada' : ''}" data-id="${nota.id}">
                    <h3 class="${nota.importante ? 'importante' : ''}">${nota.titulo}</h3>
                    <p>${nota.contenido}</p>
                    <small>${new Date(nota.fecha).toLocaleDateString()}</small>
                    <div class="acciones">
                        <button class="btn-completar">${nota.completada ? 'Desmarcar' : 'Completar'}</button>
                        <button class="btn-importante">${nota.importante ? 'No importante' : 'Importante'}</button>
                        <button class="btn-editar">Editar</button>
                        <button class="btn-eliminar">Eliminar</button>
                    </div>
                </div>
            `).join("");
    }
    
    container.append(formulario, filtros, lista);
    renderizar();
    
    return container;
}

document.body.appendChild(crearTodoApp());
```
