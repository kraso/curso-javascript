# Lección 5: Manipulación del DOM

## Objetivos de aprendizaje

- [ ] Comprender la estructura del árbol DOM y cómo JavaScript lo representa
- [ ] Seleccionar elementos del DOM usando diferentes métodos
- [ ] Crear, insertar y eliminar elementos dinámicamente
- [ ] Modificar contenido, estilos y atributos de elementos
- [ ] Traversar el DOM para navegar entre nodos
- [ ] Aplicar buenas prácticas de rendimiento al manipular el DOM

---

## 1. El Árbol DOM

El DOM (Document Object Model) es una representación en forma de árbol del documento HTML. Cada elemento HTML se convierte en un nodo en este árbol.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Página</title>
</head>
<body>
    <header>
        <h1>Título</h1>
        <nav>
            <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#acerca">Acerca</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <article>
            <h2>Artículo</h2>
            <p>Contenido del artículo</p>
        </article>
    </main>
    <footer>
        <p>Pie de página</p>
    </footer>
</body>
</html>
```

### Jerarquía de nodos

```javascript
// El documento es el nodo raíz
console.log(document); // Document

// El body es hijo directo de html
console.log(document.body); // <body>...</body>

// Jerarquía de nodos
// document
//   └── html
//       ├── head
//       │   ├── meta
//       │   └── title
//       └── body
//           ├── header
//           │   ├── h1
//           │   └── nav
//           │       └── ul
//           │           └── li (×2)
//           ├── main
//           │   └── article
//           │       ├── h2
//           │       └── p
//           └── footer
//               └── p

// Tipos de nodos
// 1. Element nodes (HTMLElement) - <div>, <p>, <span>
// 2. Text nodes (Text) - contenido de texto
// 3. Comment nodes (Comment) - <!-- comentario -->
// 4. Document node (Document) - el nodo raíz
```

---

## 2. Seleccionar Elementos

### getElementById

```javascript
// Seleccionar un elemento por su ID
const header = document.getElementById("header");
console.log(header); // <header id="header">...</header>

// El ID debe ser único en el documento
// Si hay múltiples elementos con el mismo ID, retorna el primero
```

### getElementsByClassName

```javascript
// Seleccionar todos los elementos con una clase
const items = document.getElementsByClassName("item");
console.log(items); // HTMLCollection (array-like, no es un array real)

// Iterar sobre la colección
for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
}

// Convertir a array para usar métodos de array
const itemsArray = Array.from(items);
itemsArray.forEach(item => console.log(item));

// Nota: HTMLCollection es "viva" - se actualiza automáticamente
// cuando el DOM cambia
```

### getElementsByTagName

```javascript
// Seleccionar todos los elementos de un tipo
const parrafos = document.getElementsByTagName("p");
console.log(parrafos); // HTMLCollection

// Seleccionar todos los elementos (usando "*")
const todos = document.getElementsByTagName("*");
console.log(`Total de elementos: ${todos.length}`);
```

### querySelector

```javascript
// Seleccionar el primer elemento que coincida con el selector CSS
const primerParrafo = document.querySelector("p");
console.log(primerParrafo); // Primer <p> del documento

// Con selectores más específicos
const botonActivo = document.querySelector("button.active");
const enlaceNav = document.querySelector("nav a[href='#inicio']");
const primerItem = document.querySelector("ul > li:first-child");

// Con selectores de clase
const tituloPrincipal = document.querySelector(".titulo-principal");

// Con selectores de atributo
const inputEmail = document.querySelector('input[type="email"]');

// Con selectores compuestos
const contenido = document.querySelector("main > article > p");
```

### querySelectorAll

```javascript
// Seleccionar TODOS los elementos que coincidan
const todosParrafos = document.querySelectorAll("p");
console.log(todosParrafos); // NodeList (array-like, pero NO es "viva")

// NodeList sí tiene forEach
todosParrafos.forEach(p => {
    console.log(p.textContent);
});

// Convertir a array si se necesitan otros métodos
const parrafosArray = Array.from(todosParrafos);
const parrafosFiltrados = parrafosArray.filter(p => p.classList.contains("importante"));

// Con selectores complejos
const todosBotones = document.querySelectorAll("button, input[type='submit']");
const elementosVisibles = document.querySelectorAll("[data-visible='true']");

// Combinando selectores
const formulariosEnMain = document.querySelectorAll("main form");
const inputsRequeridos = document.querySelectorAll("input[required], select[required]");
```

### Comparación de métodos

```javascript
// getElementById - más rápido, solo ID
const elemento = document.getElementById("miId");

// getElementsByClassName - retorna HTMLCollection (viva)
const elementos = document.getElementsByClassName("miClase");

// querySelector - primer elemento con selector CSS
const primero = document.querySelector(".miClase");

// querySelectorAll - todos con selector CSS, retorna NodeList (no viva)
const todos = document.querySelectorAll(".miClase");

// Recomendación: usar querySelector/querySelectorAll
// Son más flexibles y consistentes
```

---

## 3. Crear y Eliminar Elementos

### Crear elementos

```javascript
// Crear un elemento
const nuevoDiv = document.createElement("div");
console.log(nuevoDiv); // <div></div>

// Crear con contenido
const parrafo = document.createElement("p");
parrafo.textContent = "Este es un nuevo párrafo";
console.log(parrafo); // <p>Este es un nuevo párrafo</p>

// Crear elemento completo con atributos
function crearElemento(tag, atributos = {}, contenido = "") {
    const elemento = document.createElement(tag);
    
    for (const [clave, valor] of Object.entries(atributos)) {
        elemento.setAttribute(clave, valor);
    }
    
    if (contenido) {
        elemento.textContent = contenido;
    }
    
    return elemento;
}

// Uso
const boton = crearElemento("button", {
    class: "btn btn-primary",
    id: "btn-enviar",
    type: "submit"
}, "Enviar");

console.log(boton.outerHTML);
// <button class="btn btn-primary" id="btn-enviar" type="submit">Enviar</button>
```

### Insertar elementos

```javascript
const contenedor = document.getElementById("contenedor");
const referencia = document.getElementById("referencia");

// appendChild: agrega al final
const nuevoElemento = document.createElement("div");
nuevoElemento.textContent = "Nuevo elemento";
contenedor.appendChild(nuevoElemento);

// insertBefore: inserta antes de un elemento de referencia
const elementoAntes = document.createElement("div");
elementoAntes.textContent = "Antes del elemento de referencia";
contenedor.insertBefore(elementoAntes, referencia);

// prepend: agrega al inicio
const primero = document.createElement("div");
primero.textContent = "Soy el primero";
contenedor.prepend(primero);

// append: agrega múltiples elementos al final
const fragmento1 = document.createElement("div");
const fragmento2 = document.createElement("div");
contenedor.append(fragmento1, fragmento2, "Texto directo");

// insertAdjacentHTML: inserta HTML en relación a un elemento
referencia.insertAdjacentHTML("beforebegin", "<div>Antes de referencia</div>");
referencia.insertAdjacentHTML("afterbegin", "<div>Primer hijo</div>");
referencia.insertAdjacentHTML("beforeend", "<div>Último hijo</div>");
referencia.insertAdjacentHTML("afterend", "<div>Después de referencia</div>");
```

### Eliminar elementos

```javascript
// remove: elimina el elemento
const elementoAEliminar = document.getElementById("a-eliminar");
elementoAEliminar.remove();

// removeChild: elimina un hijo y retorna el elemento eliminado
const padre = document.getElementById("padre");
const hijo = document.getElementById("hijo");
const hijoEliminado = padre.removeChild(hijo);
console.log(hijoEliminado); // El elemento eliminado

// Clonar elementos
const original = document.getElementById("original");
const clon = original.cloneNode(true); // true = clon profundo
document.body.appendChild(clon);

// Reemplazar elementos
const nuevo = document.createElement("div");
nuevo.textContent = "Elemento nuevo";
const viejo = document.getElementById("viejo");
padre.replaceChild(nuevo, viejo);
```

### Document Fragment

```javascript
// DocumentFragment: contenedor temporal para múltiples operaciones DOM
// Más eficiente que insertar elementos uno por uno

function crearListaElementos(textos) {
    const fragmento = document.createDocumentFragment();
    
    textos.forEach(texto => {
        const li = document.createElement("li");
        li.textContent = texto;
        fragmento.appendChild(li);
    });
    
    // Una sola operación DOM
    return fragmento;
}

// Uso
const ul = document.getElementById("lista");
const textos = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

const fragmento = crearListaElementos(textos);
ul.appendChild(fragmento); // Una sola inserción

// Ejemplo: crear tabla dinámica
function crearTabla(datos, columnas) {
    const fragmento = document.createDocumentFragment();
    
    // Encabezado
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    columnas.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    fragmento.appendChild(thead);
    
    // Cuerpo
    const tbody = document.createElement("tbody");
    datos.forEach(fila => {
        const tr = document.createElement("tr");
        columnas.forEach(col => {
            const td = document.createElement("td");
            td.textContent = fila[col];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    fragmento.appendChild(tbody);
    
    return fragmento;
}

const usuarios = [
    { nombre: "Ana", email: "ana@ejemplo.com", edad: 25 },
    { nombre: "Carlos", email: "carlos@ejemplo.com", edad: 30 }
];

const tabla = document.createElement("table");
tabla.appendChild(crearTabla(usuarios, ["nombre", "email", "edad"]));
document.body.appendChild(tabla);
```

---

## 4. Modificar Contenido

### textContent

```javascript
const parrafo = document.querySelector("p");

// Obtener texto
console.log(parrafo.textContent); // "Texto del párrafo"

// Establecer texto (escapa HTML)
parrafo.textContent = "Nuevo texto <b>no se procesa</b>";
// El HTML se muestra como texto literal

// Vaciar el elemento
parrafo.textContent = "";

// Agregar texto al final
parrafo.textContent += " Texto adicional";
```

### innerHTML

```javascript
const contenedor = document.getElementById("contenedor");

// Obtener HTML
console.log(contenedor.innerHTML);
// "<p>Hola</p><p>Mundo</p>"

// Establecer HTML (procesa el HTML)
contenedor.innerHTML = "<h2>Título</h2><p>Contenido</p>";

// Agregar HTML al final
contenedor.innerHTML += "<div>Otro elemento</div>";

// IMPORTANTE: innerHTML puede ser inseguro
// Nunca uses innerHTML con contenido de usuario (XSS)
const usuarioInput = '<img src="x" onerror="alert(\'hacked\')">';
// contenedor.innerHTML = usuarioInput; // PELIGROSO

// Usar textContent si solo necesitas texto
contenedor.textContent = "Texto seguro";
```

### innerText

```javascript
const parrafo = document.querySelector("p");

// innerText considera el estilo CSS
// Solo retorna texto visible
console.log(parrafo.innerText);

// Diferencia con textContent:
// - textContent: retorna todo el texto, incluyendo elementos ocultos
// - innerText: solo retorna texto visible (afectado por CSS)

const div = document.createElement("div");
div.innerHTML = "Visible <span style='display:none'>oculto</span> Visible";
document.body.appendChild(div);

console.log(div.textContent); // "Visible oculto Visible"
console.log(div.innerText);   // "Visible  Visible"
```

### Modificar contenido con métodos seguros

```javascript
// Función segura para establecer texto
function setTextSeguro(elemento, texto) {
    elemento.textContent = texto;
}

// Función segura para establecer HTML limitado
function setHTMLSeguro(elemento, html) {
    // Solo permite tags seguras
    const tagsPermitidos = ["b", "i", "em", "strong", "a", "span"];
    const regex = new RegExp(`<(?!\/?(?:${tagsPermitidos.join("|")})\\s*>)[^>]+>`, "g");
    elemento.innerHTML = html.replace(regex, "");
}

// Función para crear elemento con contenido seguro
function crearContenidoSeguro(tipo, contenido) {
    const elemento = document.createElement(tipo);
    
    if (tipo === "text") {
        elemento.textContent = contenido;
    } else if (tipo === "html") {
        // Parsear y sanitizar
        const temp = document.createElement("div");
        temp.textContent = contenido;
        elemento.innerHTML = temp.innerHTML;
    }
    
    return elemento;
}
```

---

## 5. Modificar Estilos

### style property

```javascript
const elemento = document.getElementById("elemento");

// Establecer estilos inline
elemento.style.backgroundColor = "blue";
elemento.style.color = "white";
elemento.style.padding = "10px";
elemento.style.borderRadius = "5px";

// Nota: las propiedades camelCase en JavaScript
// background-color -> backgroundColor
// font-size -> fontSize
// text-align -> textAlign

// Obtener estilos computados
const estilos = window.getComputedStyle(elemento);
console.log(estilos.backgroundColor); // "rgb(0, 0, 255)"
console.log(estilos.fontSize);        // "16px"

// Modificar múltiples estilos
function setEstilos(elemento, estilos) {
    for (const [propiedad, valor] of Object.entries(estilos)) {
        elemento.style[propiedad] = valor;
    }
}

setEstilos(elemento, {
    backgroundColor: "red",
    color: "white",
    padding: "20px",
    margin: "10px",
    border: "1px solid black"
});

// Resetear estilos
elemento.style.cssText = "";
```

### Usar clases para estilos (recomendado)

```javascript
const elemento = document.getElementById("elemento");

// Agregar clase
elemento.classList.add("activo");
elemento.classList.add("destacado", "visible");

// Eliminar clase
elemento.classList.remove("activo");

// Alternar clase
elemento.classList.toggle("activo");

// Verificar si tiene una clase
if (elemento.classList.contains("activo")) {
    console.log("El elemento está activo");
}

// Reemplazar una clase
elemento.classList.replace("vieja-clase", "nueva-clase");

// Obtener todas las clases
const clases = Array.from(elemento.classList);
console.log(clases); // ["activo", "destacado", "visible"]
```

### Agregar y quitar estilos dinámicamente

```javascript
// Crear hoja de estilos dinámica
function crearEstilos(css) {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return style;
}

// Uso
const hojaEstilos = crearEstilos(`
    .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .card:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transform: translateY(-2px);
    }
    
    .card-activo {
        border-color: #007bff;
        background-color: #f8f9fa;
    }
`);

// Aplicar clases condicionalmente
function actualizarEstadoCard(card, activo) {
    if (activo) {
        card.classList.add("card-activo");
    } else {
        card.classList.remove("card-activo");
    }
}
```

---

## 6. Modificar Atributos

### Atributos básicos

```javascript
const enlace = document.querySelector("a");

// Obtener atributo
const href = enlace.getAttribute("href");
console.log(href); // "#inicio"

// Establecer atributo
enlace.setAttribute("target", "_blank");
enlace.setAttribute("rel", "noopener noreferrer");

// Verificar si tiene un atributo
if (enlace.hasAttribute("target")) {
    console.log("El enlace se abre en nueva ventana");
}

// Eliminar atributo
enlace.removeAttribute("target");

// Todas las propiedades del elemento
console.log(enlace.id);
console.log(enlace.className);
console.log(enlace.href); // Propiedad directa (diferente de getAttribute)
```

### Atributos de datos (data-*)

```javascript
const elemento = document.querySelector("[data-usuario-id]");

// Obtener atributo de datos
const usuarioId = elemento.dataset.usuarioId;
console.log(usuarioId);

// Establecer atributo de datos
elemento.dataset.usuarioId = "123";
elemento.dataset.activo = "true";

// Eliminar atributo de datos
delete elemento.dataset.activo;

// Obtener todos los atributos de datos
console.log(elemento.dataset);
// DOMStringMap { usuarioId: "123" }

// HTML con atributos de datos
// <div id="perfil" data-usuario-id="123" data-rol="admin">
// Acceso: elemento.dataset.usuarioId -> "123"
```

### Atributos dinámicos

```javascript
// Función para establecer múltiples atributos
function setAtributos(elemento, atributos) {
    for (const [clave, valor] of Object.entries(atributos)) {
        if (clave === "dataset") {
            for (const [dataClave, dataValor] of Object.entries(valor)) {
                elemento.dataset[dataClave] = dataValor;
            }
        } else if (clave === "style" && typeof valor === "object") {
            Object.assign(elemento.style, valor);
        } else if (clave === "classList") {
            if (Array.isArray(valor)) {
                elemento.classList.add(...valor);
            }
        } else if (clave === "textContent" || clave === "innerHTML") {
            elemento[clave] = valor;
        } else {
            elemento.setAttribute(clave, valor);
        }
    }
}

// Uso
const boton = document.createElement("button");
setAtributos(boton, {
    type: "button",
    class: ["btn", "btn-primary"],
    dataset: {
        usuarioId: "123",
        accion: "eliminar"
    },
    style: {
        backgroundColor: "blue",
        color: "white"
    },
    textContent: "Eliminar"
});

document.body.appendChild(boton);
// <button type="button" class="btn btn-primary" 
//         data-usuario-id="123" data-accion="eliminar"
//         style="background-color: blue; color: white;">
//     Eliminar
// </button>
```

---

## 7. Traversing el DOM

### Navegar entre nodos

```javascript
const elemento = document.getElementById("elemento");

// Padres
console.log(elemento.parentElement);     // Elemento padre (no incluye #document)
console.log(elemento.parentNode);        // Nodo padre (incluye #document)
console.log(elemento.closest("section")); // Padre más cercano que coincida

// Hijos
console.log(elemento.children);           // HTMLCollection de elementos hijos
console.log(elemento.childNodes);         // NodeList de todos los nodos hijos
console.log(elemento.firstElementChild);  // Primer elemento hijo
console.log(elemento.lastElementChild);   // Último elemento hijo

// Hermanos
console.log(elemento.nextElementSibling);     // Siguiente elemento hermano
console.log(elemento.previousElementSibling); // Elemento hermano anterior
console.log(elemento.nextSibling);            // Siguiente nodo hermano
console.log(elemento.previousSibling);        // Nodo hermano anterior
```

### Ejemplos de traversing

```javascript
// Obtener todos los elementos hermanos
function getHermanos(elemento) {
    const hermanos = [];
    let hermano = elemento.parentElement.firstElementChild;
    
    while (hermano) {
        if (hermano !== elemento) {
            hermanos.push(hermano);
        }
        hermano = hermano.nextElementSibling;
    }
    
    return hermanos;
}

// Obtener todos los ancestros
function getAncestros(elemento, selector = null) {
    const ancestros = [];
    let actual = elemento.parentElement;
    
    while (actual && actual !== document.body) {
        if (!selector || actual.matches(selector)) {
            ancestros.push(actual);
        }
        actual = actual.parentElement;
    }
    
    return ancestros;
}

// Obtener todos los descendientes
function getDescendientes(elemento, selector = null) {
    const descendientes = [];
    
    function recorrer(nodo) {
        for (const hijo of nodo.children) {
            if (!selector || hijo.matches(selector)) {
                descendientes.push(hijo);
            }
            recorrer(hijo);
        }
    }
    
    recorrer(elemento);
    return descendientes;
}

// Uso
const seccion = document.querySelector("section");
const hermanos = getHermanos(seccion);
const ancestros = getAncestros(seccion, "div");
const descendientes = getDescendientes(seccion, "p");
```

### closest

```javascript
// closest: busca el ancestro más cercano que coincida con el selector
const boton = document.querySelector("button");

// Buscar el formulario más cercano
const formulario = boton.closest("form");
console.log(formulario);

// Buscar la sección más cercana
const seccion = boton.closest("section");
console.log(seccion);

// Útil para event delegation
document.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".btn-eliminar");
    if (botonEliminar) {
        const id = botonEliminar.dataset.id;
        console.log(`Eliminar elemento ${id}`);
    }
});
```

---

## 8. Consideraciones de Rendimiento

### Patrones ineficientes

```javascript
// MAL: Múltiples reflows
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Elemento ${i}`;
    document.body.appendChild(div); // Cada append causa un reflow
}

// MEJOR: Usar DocumentFragment
const fragmento = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Elemento ${i}`;
    fragmento.appendChild(div);
}
document.body.appendChild(fragmento); // Una sola operación

// MAL: Acceder al DOM múltiples veces
const elementos = document.querySelectorAll(".item");
elementos.forEach(el => {
    el.style.color = "red";
    el.classList.add("modificado");
    el.setAttribute("data-modified", "true");
});

// MEJOR: Agrupar operaciones
function actualizarElementos(elementos, estilos, clases, atributos) {
    const fragmento = document.createDocumentFragment();
    
    elementos.forEach(el => {
        Object.assign(el.style, estilos);
        el.classList.add(...clases);
        for (const [key, value] of Object.entries(atributos)) {
            el.setAttribute(key, value);
        }
    });
}
```

### Debounce para eventos frecuentes

```javascript
// Debounce: retrasar ejecución hasta que se deje de disparar
function debounce(fn, delay) {
    let temporizador;
    return function(...args) {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Usar con eventos frecuentes
const buscarInput = document.getElementById("buscar");
const resultados = document.getElementById("resultados");

buscarInput.addEventListener("input", debounce((e) => {
    const texto = e.target.value;
    // Buscar y mostrar resultados
    resultados.textContent = `Buscando: ${texto}`;
}, 300));

// Usar con scroll
window.addEventListener("scroll", debounce(() => {
    console.log("Scroll procesado");
}, 100));
```

### RequestAnimationFrame

```javascript
// Para animaciones y actualizaciones visuales
function animarElemento(elemento, propiedad, inicio, fin, duracion) {
    const startTime = performance.now();
    
    function actualizar(currentTime) {
        const elapsed = currentTime - startTime;
        const progreso = Math.min(elapsed / duracion, 1);
        
        // Easing
        const valor = inicio + (fin - inicio) * progreso;
        elemento.style[propiedad] = `${valor}px`;
        
        if (progreso < 1) {
            requestAnimationFrame(actualizar);
        }
    }
    
    requestAnimationFrame(actualizar);
}

// Uso
const cuadro = document.getElementById("cuadro");
animarElemento(cuadro, "left", 0, 500, 1000);
```

### Intersection Observer

```javascript
// Para detectar visibilidad de elementos
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            console.log(`${entry.target.id} es visible`);
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, {
    threshold: 0.5 // 50% visible
});

// Observar elementos
document.querySelectorAll(".lazy-load").forEach(el => {
    observer.observe(el);
});

// Desuscribirse
// observer.disconnect();
```

---

## Buenas prácticas

1. **Usar querySelector/querySelectorAll**: Son más flexibles y consistentes que getElementById/getElementsByClassName.
2. **Usar DocumentFragment**: Para inserciones múltiples, es más eficiente.
3. **Evitar innerHTML con contenido de usuario**: Puede causar ataques XSS.
4. **Usar clases para estilos**: En lugar de style property directamente.
5. **Agrupar manipulaciones DOM**: Reduce reflows y repaints.
6. **Usar event delegation**: Para eventos en muchos elementos similares.
7. **Debounce eventos frecuentes**: scroll, resize, input.
8. **Usar requestAnimationFrame**: Para animaciones.

---

## Ejercicios

### Ejercicio 1: Selección de elementos (10 puntos)
Dado el siguiente HTML:
```html
<div id="app">
    <header class="header">
        <h1 class="titulo">Mi App</h1>
        <nav>
            <a href="#home" class="nav-link active">Home</a>
            <a href="#about" class="nav-link">About</a>
            <a href="#contact" class="nav-link">Contact</a>
        </nav>
    </header>
    <main>
        <section class="content">
            <article class="post" data-id="1">
                <h2 class="post-title">Primer Post</h2>
                <p class="post-text">Contenido del primer post</p>
                <div class="post-meta">
                    <span class="author">Ana</span>
                    <span class="date">2024-01-15</span>
                </div>
            </article>
        </section>
    </main>
</div>
```
1. Selecciona el título principal
2. Selecciona todos los enlaces de navegación
3. Selecciona el primer artículo
4. Selecciona el autor del primer artículo
5. Selecciona todos los elementos con clase "post"

### Ejercicio 2: Creación dinámica (15 puntos)
Crea una función que genere una tarjeta de usuario con:
- Avatar (imagen o iniciales)
- Nombre completo
- Email
- Rol (admin, editor, viewer)
- Botón de acción
- Fecha de registro

### Ejercicio 3: Modificación de contenido (15 puntos)
Crea un sistema de lista de tareas que permita:
1. Agregar nuevas tareas
2. Marcar tareas como completadas
3. Eliminar tareas
4. Filtrar por estado (todas, pendientes, completadas)
5. Contar tareas pendientes

### Ejercicio 4: Manipulación de estilos (10 puntos)
1. Crea un tema claro/oscuro que se pueda alternar
2. Implementa un sistema de colores dinámico
3. Crea animaciones simples usando classes

### Ejercicio 5: Traversing del DOM (15 puntos)
Dado un árbol DOM complejo:
1. Implementa una función que obtenga todos los ancestros de un elemento
2. Crea una función que encuentre el elemento más cercano con una clase específica
3. Implementa una función que mueva un elemento a otra posición del DOM

### Ejercicio 6: Problema integrador (20 puntos)
Crea un dashboard interactivo que incluya:
1. Panel de estadísticas con datos dinámicos
2. Gráfico simple usando divs (sin librerías)
3. Tabla de datos con ordenamiento
4. Filtros y búsqueda
5. Actualización en tiempo real (simulada)

---

## Soluciones

### Solución Ejercicio 1

```javascript
// 1. Título principal
const titulo = document.querySelector(".titulo");
console.log(titulo); // <h1 class="titulo">Mi App</h1>

// 2. Todos los enlaces de navegación
const navLinks = document.querySelectorAll("nav .nav-link");
console.log(navLinks); // NodeList con 3 enlaces

// 3. Primer artículo
const primerPost = document.querySelector("article.post");
console.log(primerPost);

// 4. Autor del primer artículo
const autor = document.querySelector("article.post .author");
console.log(autor.textContent); // "Ana"

// 5. Todos los elementos con clase "post"
const posts = document.querySelectorAll(".post");
console.log(posts); // NodeList con artículos
```

### Solución Ejercicio 2

```javascript
function crearTarjetaUsuario(usuario) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "user-card";
    
    // Avatar
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    if (usuario.avatar) {
        const img = document.createElement("img");
        img.src = usuario.avatar;
        img.alt = usuario.nombre;
        avatar.appendChild(img);
    } else {
        // Iniciales
        const iniciales = usuario.nombre
            .split(" ")
            .map(palabra => palabra[0])
            .join("")
            .toUpperCase();
        avatar.textContent = iniciales;
    }
    
    // Info
    const info = document.createElement("div");
    info.className = "user-info";
    
    const nombre = document.createElement("h3");
    nombre.className = "user-name";
    nombre.textContent = usuario.nombre;
    
    const email = document.createElement("p");
    email.className = "user-email";
    email.textContent = usuario.email;
    
    const rol = document.createElement("span");
    rol.className = `user-role role-${usuario.rol}`;
    rol.textContent = usuario.rol;
    
    const fecha = document.createElement("p");
    fecha.className = "user-date";
    fecha.textContent = `Registro: ${new Date(usuario.fechaRegistro).toLocaleDateString()}`;
    
    info.append(nombre, email, rol, fecha);
    
    // Botón
    const boton = document.createElement("button");
    boton.className = "user-action-btn";
    boton.textContent = "Ver perfil";
    boton.addEventListener("click", () => {
        console.log(`Ver perfil de ${usuario.nombre}`);
    });
    
    tarjeta.append(avatar, info, boton);
    return tarjeta;
}

// Uso
const usuario = {
    nombre: "Ana García",
    email: "ana@ejemplo.com",
    rol: "admin",
    fechaRegistro: "2024-01-15"
};

const container = document.getElementById("usuarios");
container.appendChild(crearTarjetaUsuario(usuario));
```

### Solución Ejercicio 3

```javascript
function crearListaTareas() {
    let tareas = [];
    let filtro = "todas";
    
    const container = document.createElement("div");
    container.className = "task-manager";
    
    // Formulario
    const formulario = document.createElement("form");
    formulario.className = "task-form";
    
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nueva tarea...";
    input.required = true;
    
    const botonAgregar = document.createElement("button");
    botonAgregar.type = "submit";
    botonAgregar.textContent = "Agregar";
    
    formulario.append(input, botonAgregar);
    
    // Filtros
    const filtros = document.createElement("div");
    filtros.className = "task-filters";
    
    ["todas", "pendientes", "completadas"].forEach(estado => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `filter-btn ${estado === filtro ? "active" : ""}`;
        btn.textContent = estado;
        btn.addEventListener("click", () => {
            filtro = estado;
            actualizarFiltros();
            renderizar();
        });
        filtros.appendChild(btn);
    });
    
    // Lista
    const lista = document.createElement("ul");
    lista.className = "task-list";
    
    // Contador
    const contador = document.createElement("p");
    contador.className = "task-counter";
    
    // Eventos
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        if (input.value.trim()) {
            tareas.push({
                id: Date.now(),
                texto: input.value.trim(),
                completada: false
            });
            input.value = "";
            renderizar();
        }
    });
    
    function actualizarFiltros() {
        filtros.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.toggle("active", btn.textContent === filtro);
        });
    }
    
    function renderizar() {
        lista.innerHTML = "";
        
        const tareasFiltradas = tareas.filter(tarea => {
            if (filtro === "pendientes") return !tarea.completada;
            if (filtro === "completadas") return tarea.completada;
            return true;
        });
        
        tareasFiltradas.forEach(tarea => {
            const li = document.createElement("li");
            li.className = `task-item ${tarea.completada ? "completed" : ""}`;
            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = tarea.completada;
            checkbox.addEventListener("change", () => {
                tarea.completada = checkbox.checked;
                renderizar();
            });
            
            const texto = document.createElement("span");
            texto.className = "task-text";
            texto.textContent = tarea.texto;
            
            const botonEliminar = document.createElement("button");
            botonEliminar.className = "task-delete";
            botonEliminar.textContent = "X";
            botonEliminar.addEventListener("click", () => {
                tareas = tareas.filter(t => t.id !== tarea.id);
                renderizar();
            });
            
            li.append(checkbox, texto, botonEliminar);
            lista.appendChild(li);
        });
        
        const pendientes = tareas.filter(t => !t.completada).length;
        contador.textContent = `${pendientes} tarea(s) pendiente(s)`;
    }
    
    container.append(formulario, filtros, lista, contador);
    renderizar();
    
    return container;
}

document.body.appendChild(crearListaTareas());
```

### Solución Ejercicio 4

```javascript
// 1. Tema claro/oscuro
function crearToggleTema() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let oscuro = prefersDark;
    
    const boton = document.createElement("button");
    boton.className = "theme-toggle";
    boton.textContent = oscuro ? "☀️" : "🌙";
    
    function aplicar() {
        document.body.classList.toggle("dark-theme", oscuro);
        boton.textContent = oscuro ? "☀️" : "🌙";
        localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
    }
    
    boton.addEventListener("click", () => {
        oscuro = !oscuro;
        aplicar();
    });
    
    // Cargar tema guardado
    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado) {
        oscuro = temaGuardado === "oscuro";
    }
    
    aplicar();
    return boton;
}

// 2. Sistema de colores dinámico
function crearSelectorColores() {
    const container = document.createElement("div");
    container.className = "color-selector";
    
    const colores = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#dda0dd"];
    
    colores.forEach(color => {
        const swatch = document.createElement("button");
        swatch.className = "color-swatch";
        swatch.style.backgroundColor = color;
        swatch.addEventListener("click", () => {
            document.documentElement.style.setProperty("--primary-color", color);
            container.querySelectorAll(".color-swatch").forEach(s => {
                s.classList.remove("selected");
            });
            swatch.classList.add("selected");
        });
        container.appendChild(swatch);
    });
    
    return container;
}

// 3. Animaciones simples
function animarEntrada(elemento, tipo = "fade") {
    elemento.classList.add("animacion-entrada", tipo);
    elemento.addEventListener("animationend", () => {
        elemento.classList.remove("animacion-entrada", tipo);
    }, { once: true });
}

// CSS necesario:
/*
.animacion-entrada.fade {
    animation: fadeIn 0.3s ease-out;
}
.animacion-entrada.slide {
    animation: slideIn 0.3s ease-out;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
*/
```

### Solución Ejercicio 5

```javascript
// 1. Obtener todos los ancestros
function obtenerAncestros(elemento, selector = null) {
    const ancestros = [];
    let actual = elemento.parentElement;
    
    while (actual && actual !== document) {
        if (!selector || actual.matches(selector)) {
            ancestros.push(actual);
        }
        actual = actual.parentElement;
    }
    
    return ancestros;
}

// 2. Encontrar ancestro con clase específica
function encontrarConClase(elemento, clase) {
    let actual = elemento;
    
    while (actual && actual !== document) {
        if (actual.classList.contains(clase)) {
            return actual;
        }
        actual = actual.parentElement;
    }
    
    return null;
}

// 3. Mover elemento a otra posición
function moverElemento(elemento, nuevoPadre, indice = null) {
    // Clonar para preservar eventos
    const clon = elemento.cloneNode(true);
    
    // Copiar event listeners usando eventos personalizados
    if (elemento._eventListeners) {
        clon._eventListeners = { ...elemento._eventListeners };
    }
    
    // Eliminar del padre actual
    elemento.remove();
    
    // Insertar en nuevo padre
    if (indice !== null && indice < nuevoPadre.children.length) {
        nuevoPadre.insertBefore(clon, nuevoPadre.children[indice]);
    } else {
        nuevoPadre.appendChild(clon);
    }
    
    return clon;
}

// Ejemplo de uso
const elemento = document.querySelector(".item");
const nuevoContenedor = document.querySelector(".otro-contenedor");
moverElemento(elemento, nuevoContenedor, 0);
```

### Solución Ejercicio 6

```javascript
function crearDashboard() {
    const container = document.createElement("div");
    container.className = "dashboard";
    
    // Panel de estadísticas
    const stats = document.createElement("div");
    stats.className = "stats-panel";
    
    const datosStats = [
        { label: "Usuarios", value: 1234, change: "+12%" },
        { label: "Ventas", value: 5678, change: "+8%" },
        { label: "Pedidos", value: 890, change: "-3%" },
        { label: "Ingresos", value: 45678, change: "+15%" }
    ];
    
    datosStats.forEach(dato => {
        const card = document.createElement("div");
        card.className = "stat-card";
        card.innerHTML = `
            <h3>${dato.label}</h3>
            <p class="stat-value">${dato.value.toLocaleString()}</p>
            <p class="stat-change ${dato.change.startsWith('+') ? 'positive' : 'negative'}">
                ${dato.change}
            </p>
        `;
        stats.appendChild(card);
    });
    
    // Gráfico simple con barras
    const grafico = document.createElement("div");
    grafico.className = "chart";
    
    const datosGrafico = [
        { label: "Ene", value: 65 },
        { label: "Feb", value: 85 },
        { label: "Mar", value: 45 },
        { label: "Abr", value: 95 },
        { label: "May", value: 75 }
    ];
    
    const maxValue = Math.max(...datosGrafico.map(d => d.value));
    
    datosGrafico.forEach(dato => {
        const barra = document.createElement("div");
        barra.className = "bar";
        barra.style.height = `${(dato.value / maxValue) * 100}%`;
        barra.title = `${dato.label}: ${dato.value}`;
        
        const label = document.createElement("span");
        label.className = "bar-label";
        label.textContent = dato.label;
        
        barra.appendChild(label);
        grafico.appendChild(barra);
    });
    
    // Tabla con ordenamiento
    const tablaContainer = document.createElement("div");
    tablaContainer.className = "table-container";
    
    const datosTabla = [
        { id: 1, nombre: "Ana", email: "ana@test.com", ventas: 150 },
        { id: 2, nombre: "Carlos", email: "carlos@test.com", ventas: 200 },
        { id: 3, nombre: "María", email: "maria@test.com", ventas: 120 },
        { id: 4, nombre: "Pedro", email: "pedro@test.com", ventas: 180 }
    ];
    
    let ordenActual = { campo: null, direccion: "asc" };
    
    function renderizarTabla() {
        tablaContainer.innerHTML = "";
        
        const tabla = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        
        // Encabezados
        const trHead = document.createElement("tr");
        ["nombre", "email", "ventas"].forEach(campo => {
            const th = document.createElement("th");
            th.textContent = campo.charAt(0).toUpperCase() + campo.slice(1);
            th.style.cursor = "pointer";
            th.addEventListener("click", () => {
                if (ordenActual.campo === campo) {
                    ordenActual.direccion = ordenActual.direccion === "asc" ? "desc" : "asc";
                } else {
                    ordenActual.campo = campo;
                    ordenActual.direccion = "asc";
                }
                renderizarTabla();
            });
            
            if (ordenActual.campo === campo) {
                th.textContent += ordenActual.direccion === "asc" ? " ↑" : " ↓";
            }
            
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        
        // Datos
        let datosOrdenados = [...datosTabla];
        if (ordenActual.campo) {
            datosOrdenados.sort((a, b) => {
                const valorA = a[ordenActual.campo];
                const valorB = b[ordenActual.campo];
                const comparacion = valorA > valorB ? 1 : valorA < valorB ? -1 : 0;
                return ordenActual.direccion === "asc" ? comparacion : -comparacion;
            });
        }
        
        datosOrdenados.forEach(dato => {
            const tr = document.createElement("tr");
            ["nombre", "email", "ventas"].forEach(campo => {
                const td = document.createElement("td");
                td.textContent = dato[campo];
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        
        tabla.append(thead, tbody);
        tablaContainer.appendChild(tabla);
    }
    
    renderizarTabla();
    
    // Búsqueda
    const busqueda = document.createElement("div");
    busqueda.className = "search-box";
    
    const inputBusqueda = document.createElement("input");
    inputBusqueda.type = "text";
    inputBusqueda.placeholder = "Buscar...";
    
    inputBusqueda.addEventListener("input", (e) => {
        const texto = e.target.value.toLowerCase();
        const filas = tablaContainer.querySelectorAll("tbody tr");
        
        filas.forEach(fila => {
            const contenido = fila.textContent.toLowerCase();
            fila.style.display = contenido.includes(texto) ? "" : "none";
        });
    });
    
    busqueda.appendChild(inputBusqueda);
    
    // Ensamblar
    container.append(stats, grafico, busqueda, tablaContainer);
    
    // Actualización en tiempo real (simulada)
    setInterval(() => {
        const cards = stats.querySelectorAll(".stat-value");
        cards.forEach(card => {
            const valorActual = parseInt(card.textContent.replace(/,/g, ""));
            const cambio = Math.floor(Math.random() * 10) - 5;
            card.textContent = (valorActual + cambio).toLocaleString();
        });
    }, 5000);
    
    return container;
}

document.body.appendChild(crearDashboard());
```
