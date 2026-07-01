# Leccion 6: Eventos

## Objetivos de aprendizaje

- [ ] Comprender el modelo de eventos de JavaScript
- [ ] Usar addEventListener para registrar y manejar eventos
- [ ] Entender el objeto evento y sus propiedades
- [ ] Dominar la propagacion de eventos (bubbling y capturing)
- [ ] Implementar event delegation para mejorar el rendimiento
- [ ] Prevenir comportamientos por defecto y gestionar eventos personalizados

---

## 1. El Modelo de Eventos

Los eventos son acciones que ocurren en el navegador, como clics, teclas presionadas o formularios enviados.

```javascript
// Tipos de eventos comunes
// Mouse: click, dblclick, mouseenter, mouseleave, mousemove
// Keyboard: keydown, keyup, keypress
// Form: submit, input, change, focus, blur
// Window: load, resize, scroll
// Touch: touchstart, touchmove, touchend

// Ejemplo basico: evento click
const boton = document.getElementById("mi-boton");

boton.addEventListener("click", function() {
    console.log("Boton clickeado!");
});
```

---

## 2. addEventListener

```javascript
// Sintaxis
elemento.addEventListener(tipoEvento, manejador, opciones);

// Ejemplo con opciones
const boton = document.getElementById("mi-boton");

function manejarClick(evento) {
    console.log("Click en:", evento.target);
}

// Registrar evento
boton.addEventListener("click", manejarClick);

// Con opciones
boton.addEventListener("click", manejarClick, {
    once: false,    // Ejecutar solo una vez
    passive: false, // Permitir preventDefault()
    capture: false  // Fase de capturing
});

// Remover evento (debe ser la misma referencia de funcion)
boton.removeEventListener("click", manejarClick);
```

### Multiples eventos en el mismo elemento

```javascript
const boton = document.getElementById("mi-boton");

boton.addEventListener("click", () => console.log("Click"));
boton.addEventListener("mouseenter", () => console.log("Mouse entro"));
boton.addEventListener("mouseleave", () => console.log("Mouse salio"));
```

### Eventos en varios elementos

```javascript
const botones = document.querySelectorAll(".btn");

botones.forEach(boton => {
    boton.addEventListener("click", function(evento) {
        console.log(`Boton ${this.textContent} clickeado`);
    });
});
```

---

## 3. El Objeto Evento

Cuando se dispara un evento, se crea un objeto con informacion sobre el mismo.

```javascript
const boton = document.getElementById("mi-boton");

boton.addEventListener("click", function(evento) {
    console.log("Tipo:", evento.type);
    console.log("Target:", evento.target);
    console.log("CurrentTarget:", evento.currentTarget);
    console.log("ClientX:", evento.clientX);
    console.log("ClientY:", evento.clientY);
    console.log("Key:", evento.key);
    console.log("Ctrl:", evento.ctrlKey);
    console.log("Shift:", evento.shiftKey);
});
```

### target vs currentTarget

```javascript
document.querySelector("div").addEventListener("click", (e) => {
    // target: el elemento que disparo el evento (puede ser un hijo)
    // currentTarget: el elemento que tiene el listener
    console.log("Target:", e.target);
    console.log("CurrentTarget:", e.currentTarget);
});
```

---

## 4. Propagacion de Eventos

Los eventos se propagan a traves del DOM en dos fases: capturing y bubbling.

### Bubbling (burbuja)

```javascript
// Por defecto, los eventos burbujean hacia arriba
const abuelo = document.getElementById("abuelo");
const padre = document.getElementById("padre");
const hijo = document.getElementById("hijo");

abuelo.addEventListener("click", () => console.log("Abuelo"));
padre.addEventListener("click", () => console.log("Padre"));
hijo.addEventListener("click", () => console.log("Hijo"));

// Al clickear en #hijo: Hijo -> Padre -> Abuelo
```

### Capturing (captura)

```javascript
// La fase de capturing ocurre antes del bubbling
abuelo.addEventListener("click", () => console.log("Abuelo (capture)"), { capture: true });
padre.addEventListener("click", () => console.log("Padre (capture)"), { capture: true });
hijo.addEventListener("click", () => console.log("Hijo (capture)"), { capture: true });

// Al clickear en #hijo: Abuelo -> Padre -> Hijo (captura)
// Luego bubbling en orden inverso
```

### Detener la propagacion

```javascript
// stopPropagation: detiene la propagacion
padre.addEventListener("click", (e) => {
    console.log("Padre clickeado");
    e.stopPropagation(); // No llega al abuelo
});

// stopImmediatePropagation: detiene otros listeners del mismo elemento
hijo.addEventListener("click", (e) => {
    console.log("Primer listener");
    e.stopImmediatePropagation();
});

hijo.addEventListener("click", (e) => {
    console.log("Segundo listener"); // Nunca se ejecuta
});
```

---

## 5. Event Delegation

Patron que aprovecha el bubbling para manejar eventos de muchos elementos con un solo listener.

```javascript
// MAL: Agregar listener a cada item
const items = document.querySelectorAll(".item");
items.forEach(item => {
    item.addEventListener("click", function() {
        console.log(this.textContent);
    });
});

// MEJOR: Event delegation
const lista = document.querySelector(".lista");
lista.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (item) {
        console.log(item.textContent);
    }
});

// Ventajas:
// 1. Un solo listener en lugar de muchos
// 2. Funciona con elementos anadidos dinamicamente
// 3. Menos uso de memoria
// 4. Codigo mas limpio
```

### Delegation con selectores

```javascript
function delegation(parent, selector, eventType, handler) {
    parent.addEventListener(eventType, (e) => {
        const target = e.target.closest(selector);
        if (target && parent.contains(target)) {
            handler.call(target, e, target);
        }
    });
}

// Uso
const contenedor = document.getElementById("contenedor");

delegation(contenedor, ".btn", "click", (e, btn) => {
    console.log(`Boton ${btn.textContent} clickeado`);
});
```

---

## 6. Eventos Comunes

### Eventos de mouse

```javascript
const area = document.getElementById("area-mouse");

area.addEventListener("click", (e) => {
    console.log(`Click en (${e.clientX}, ${e.clientY})`);
});

area.addEventListener("dblclick", () => {
    console.log("Doble clic");
});

area.addEventListener("mousemove", (e) => {
    area.textContent = `Mouse: (${e.clientX}, ${e.clientY})`;
});

area.addEventListener("mouseenter", () => {
    area.classList.add("hover");
});

area.addEventListener("mouseleave", () => {
    area.classList.remove("hover");
});

// Botones del mouse: 0=izquierdo, 1=central, 2=derecho
area.addEventListener("mousedown", (e) => {
    console.log("Boton presionado:", e.button);
});
```

### Eventos de teclado

```javascript
document.addEventListener("keydown", (e) => {
    console.log("Tecla:", e.key);
    console.log("Codigo:", e.code);
    console.log("Ctrl:", e.ctrlKey);
    
    // Atajos de teclado
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        console.log("Guardar");
    }
    
    if (e.key === "Escape") {
        console.log("Cerrar modal");
    }
});

document.addEventListener("keyup", (e) => {
    console.log("Tecla liberada:", e.key);
});
```

### Eventos de formulario

```javascript
const formulario = document.querySelector("form");

// Submit
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(formulario);
    const datos = Object.fromEntries(formData.entries());
    console.log("Datos:", datos);
});

// Input y change
formulario.querySelectorAll("input, textarea, select").forEach(campo => {
    campo.addEventListener("input", (e) => {
        console.log(`${e.target.name}: ${e.target.value}`);
    });
    
    campo.addEventListener("change", (e) => {
        console.log(`${e.target.name} cambiado a: ${e.target.value}`);
    });
    
    campo.addEventListener("focus", (e) => {
        e.target.parentElement.classList.add("focused");
    });
    
    campo.addEventListener("blur", (e) => {
        e.target.parentElement.classList.remove("focused");
    });
});
```

### Eventos de ventana

```javascript
window.addEventListener("resize", () => {
    console.log(`Ventana: ${window.innerWidth}x${window.innerHeight}`);
});

window.addEventListener("scroll", () => {
    console.log(`Scroll: ${window.scrollY}`);
});

window.addEventListener("load", () => {
    console.log("Pagina cargada completamente");
});

window.addEventListener("beforeunload", (e) => {
    if (hayCambiosSinGuardar) {
        e.preventDefault();
        e.returnValue = "";
    }
});
```

---

## 7. Prevenir Comportamiento por Defecto

```javascript
// Enlace: prevenir navegacion
document.querySelector("a.no-navegar").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Navegacion prevenida");
});

// Formulario: prevenir envio
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
});

// Click derecho: prevenir menu contextual
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

// Drag: prevenir comportamiento por defecto
elemento.addEventListener("dragover", (e) => {
    e.preventDefault(); // Necesario para permitir drop
});
```

---

## 8. Remover Event Listeners

```javascript
// Para remover un listener, se necesita la misma funcion
function manejarClick(evento) {
    console.log("Click");
}

// Agregar
boton.addEventListener("click", manejarClick);

// Remover (debe ser la misma referencia)
boton.removeEventListener("click", manejarClick);

// NO funciona con funciones anonimas
boton.addEventListener("click", () => console.log("Click"));
// boton.removeEventListener("click", () => console.log("Click")); // No remueve
```

### Opcion once

```javascript
// once: true ejecuta el listener solo una vez
boton.addEventListener("click", (e) => {
    console.log("Este click solo se ejecuta una vez");
}, { once: true });
```

### Retornar funcion de limpieza

```javascript
function agregarEventListenerConLimpieza(elemento, evento, manejador) {
    elemento.addEventListener(evento, manejador);
    return function limpiar() {
        elemento.removeEventListener(evento, manejador);
    };
}

const limpiarClick = agregarEventListenerConLimpieza(
    boton, "click", () => console.log("Click")
);

limpiarClick(); // Remueve el listener
```

---

## 9. Eventos Pasivos (Passive)

```javascript
// passive: true indica que el listener nunca llamara a preventDefault()
// Mejora el rendimiento en eventos de scroll y touch

window.addEventListener("scroll", (e) => {
    console.log("Scroll (pasivo)");
}, { passive: true });

window.addEventListener("touchmove", (e) => {
    // Manejar movimiento tactil
}, { passive: true });
```

---

## 10. Eventos Personalizados

```javascript
// Crear evento personalizado
const eventoPersonalizado = new CustomEvent("miEvento", {
    detail: {
        mensaje: "Hola desde evento personalizado",
        datos: { id: 1, nombre: "Test" }
    },
    bubbles: true,
    cancelable: true
});

// Despachar evento
const elemento = document.getElementById("mi-elemento");
elemento.dispatchEvent(eventoPersonalizado);

// Escuchar evento personalizado
elemento.addEventListener("miEvento", (e) => {
    console.log("Evento recibido:", e.detail);
});
```

### Sistema de eventos (EventBus)

```javascript
const EventBus = {
    eventos: {},
    
    on(evento, callback) {
        if (!this.eventos[evento]) {
            this.eventos[evento] = [];
        }
        this.eventos[evento].push(callback);
    },
    
    off(evento, callback) {
        if (this.eventos[evento]) {
            this.eventos[evento] = this.eventos[evento].filter(cb => cb !== callback);
        }
    },
    
    emit(evento, datos) {
        if (this.eventos[evento]) {
            this.eventos[evento].forEach(callback => callback(datos));
        }
    }
};

// Uso
EventBus.on("usuario:logueado", (datos) => {
    console.log("Usuario logueado:", datos);
});

EventBus.emit("usuario:logueado", { id: 1, nombre: "Ana" });
```

---

## Buenas practicas

1. **Usar event delegation**: Para muchos elementos similares, delega en el padre.
2. **Siempre remover listeners**: Cuando el componente se destruya.
3. **Usar passive para scroll/touch**: Mejora el rendimiento.
4. **Prevenir comportamiento por defecto**: Cuando sea necesario.
5. **Usar once para eventos temporales**: Evita olvidar remover el listener.
6. **No abusar de stopPropagation**: Puede causar problemas con otros listeners.
7. **Usar eventos personalizados**: Para comunicacion entre componentes.
8. **Debounce eventos frecuentes**: scroll, resize, input.

---

## Ejercicios

### Ejercicio 1: Eventos basicos (10 puntos)
1. Crea un boton que cambie de color al hacer clic
2. Implementa un contador de clics que muestre el total
3. Crea un boton que se desactive despues de 3 clics

### Ejercicio 2: Eventos de teclado (15 puntos)
1. Implementa un juego simple donde se mueva un cuadro con las teclas WASD
2. Crea un atajo de teclado Ctrl+S que muestre un mensaje
3. Implementa validacion de entrada que solo permita numeros

### Ejercicio 3: Event delegation (15 puntos)
1. Crea una lista donde al clickear un item se resalte
2. Implementa una tabla donde al clickear un encabezado se ordene
3. Crea un sistema de pestanas (tabs) usando delegation

### Ejercicio 4: Formularios (15 puntos)
1. Crea un formulario de registro con validacion en tiempo real
2. Implementa un sistema de autenticacion (simulado)
3. Crea un formulario multi-paso con validacion por paso

### Ejercicio 5: Eventos personalizados (10 puntos)
1. Crea un bus de eventos simple
2. Implementa comunicacion entre dos componentes
3. Crea un sistema de notificaciones con eventos

### Ejercicio 6: Problema integrador (20 puntos)
Crea una aplicacion de tareas (To-Do App) completa que incluya:
1. Agregar, editar y eliminar tareas
2. Marcar como completada
3. Filtrar por estado
4. Persistir en localStorage
5. Usar eventos personalizados para comunicacion
6. Event delegation para manejar listas

---

## Soluciones

### Solucion Ejercicio 1

```javascript
// 1. Boton que cambia de color
const botonColor = document.getElementById("boton-color");
const colores = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"];
let indiceColor = 0;

botonColor.addEventListener("click", () => {
    indiceColor = (indiceColor + 1) % colores.length;
    botonColor.style.backgroundColor = colores[indiceColor];
});

// 2. Contador de clics
const botonContador = document.getElementById("boton-contador");
const contadorDisplay = document.getElementById("contador");
let clics = 0;

botonContador.addEventListener("click", () => {
    clics++;
    contadorDisplay.textContent = "Clics: " + clics;
});

// 3. Boton que se desactiva
const botonTemporal = document.getElementById("boton-temporal");
let clicsRestantes = 3;

botonTemporal.addEventListener("click", () => {
    clicsRestantes--;
    
    if (clicsRestantes <= 0) {
        botonTemporal.disabled = true;
        botonTemporal.textContent = "Agotado";
    } else {
        botonTemporal.textContent = "Quedan " + clicsRestantes + " clics";
    }
});
```

### Solucion Ejercicio 2

```javascript
// 1. Juego de movimiento con WASD
const cuadro = document.getElementById("cuadro-juego");
let x = 0;
let y = 0;
const paso = 10;

document.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
        case "w": y -= paso; break;
        case "a": x -= paso; break;
        case "s": y += paso; break;
        case "d": x += paso; break;
    }
    cuadro.style.transform = "translate(" + x + "px, " + y + "px)";
});

// 2. Atajo Ctrl+S
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        console.log("Guardando...");
        mostrarNotificacion("Documento guardado");
    }
});

// 3. Solo numeros
const inputNumerico = document.getElementById("input-numeros");

inputNumerico.addEventListener("keypress", (e) => {
    const charCode = e.which || e.keyCode;
    if (charCode < 48 || charCode > 57) {
        e.preventDefault();
    }
});

inputNumerico.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
});
```

### Solucion Ejercicio 3

```javascript
// 1. Lista con resaltado
const lista = document.querySelector("#lista-items");

lista.addEventListener("click", (e) => {
    const item = e.target.closest("li");
    if (item) {
        lista.querySelectorAll("li").forEach(li => {
            li.classList.remove("seleccionado");
        });
        item.classList.add("seleccionado");
    }
});

// 2. Tabla ordenable
const tabla = document.querySelector("#tabla-datos");
const encabezados = tabla.querySelectorAll("th");
let datosFila = Array.from(tabla.querySelectorAll("tbody tr"));

encabezados.forEach((th, indice) => {
    th.addEventListener("click", () => {
        const ascendente = th.dataset.orden !== "asc";
        
        datosFila.sort((a, b) => {
            const valorA = a.children[indice].textContent;
            const valorB = b.children[indice].textContent;
            
            if (!isNaN(valorA) && !isNaN(valorB)) {
                return ascendente ? valorA - valorB : valorB - valorA;
            }
            return ascendente 
                ? valorA.localeCompare(valorB)
                : valorB.localeCompare(valorA);
        });
        
        encabezados.forEach(h => h.dataset.orden = "");
        th.dataset.orden = ascendente ? "asc" : "desc";
        
        const tbody = tabla.querySelector("tbody");
        tbody.innerHTML = "";
        datosFila.forEach(fila => tbody.appendChild(fila));
    });
});

// 3. Pestanas
const contenedorTabs = document.querySelector("#tabs");

contenedorTabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    
    contenedorTabs.querySelectorAll(".tab").forEach(t => {
        t.classList.remove("activa");
    });
    tab.classList.add("activa");
    
    const contenidoId = tab.dataset.tab;
    contenedorTabs.querySelectorAll(".tab-content").forEach(contenido => {
        contenido.classList.remove("activo");
    });
    document.getElementById(contenidoId).classList.add("activo");
});
```

### Solucion Ejercicio 4

```javascript
// 1. Formulario con validacion en tiempo real
const formulario = document.querySelector("#registro-form");
const campos = formulario.querySelectorAll("input, textarea");

const reglas = {
    nombre: { requerido: true, minLength: 3, mensaje: "Minimo 3 caracteres" },
    email: { requerido: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, mensaje: "Email invalido" },
    password: { requerido: true, minLength: 8, mensaje: "Minimo 8 caracteres" }
};

function validarCampo(campo) {
    const regla = reglas[campo.name];
    if (!regla) return true;
    
    const valor = campo.value.trim();
    
    if (regla.requerido && !valor) {
        mostrarError(campo, "Este campo es requerido");
        return false;
    }
    
    if (regla.minLength && valor.length < regla.minLength) {
        mostrarError(campo, regla.mensaje);
        return false;
    }
    
    if (regla.pattern && valor && !regla.pattern.test(valor)) {
        mostrarError(campo, regla.mensaje);
        return false;
    }
    
    ocultarError(campo);
    return true;
}

function mostrarError(campo, mensaje) {
    campo.classList.add("error");
    let errorElement = campo.parentElement.querySelector(".error-message");
    
    if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.className = "error-message";
        campo.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = mensaje;
}

function ocultarError(campo) {
    campo.classList.remove("error");
    const errorElement = campo.parentElement.querySelector(".error-message");
    if (errorElement) errorElement.remove();
}

campos.forEach(campo => {
    campo.addEventListener("blur", () => validarCampo(campo));
    campo.addEventListener("input", () => {
        if (campo.classList.contains("error")) validarCampo(campo);
    });
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let valido = true;
    campos.forEach(campo => {
        if (!validarCampo(campo)) valido = false;
    });
    
    if (valido) {
        const datos = Object.fromEntries(new FormData(formulario));
        console.log("Formulario valido:", datos);
    }
});
```

### Solucion Ejercicio 5

```javascript
// 1. Bus de eventos simple
class EventBus {
    constructor() {
        this.eventos = {};
    }
    
    on(evento, callback) {
        if (!this.eventos[evento]) this.eventos[evento] = [];
        this.eventos[evento].push(callback);
    }
    
    off(evento, callback) {
        if (this.eventos[evento]) {
            this.eventos[evento] = this.eventos[evento].filter(cb => cb !== callback);
        }
    }
    
    emit(evento, datos) {
        if (this.eventos[evento]) {
            this.eventos[evento].forEach(callback => callback(datos));
        }
    }
}

const bus = new EventBus();

// 2. Comunicacion entre componentes
bus.on("usuario:seleccionado", (datos) => {
    console.log("Perfil actualizado:", datos.nombre);
    document.getElementById("perfil-nombre").textContent = datos.nombre;
});

function seleccionarUsuario(usuario) {
    bus.emit("usuario:seleccionado", usuario);
}

// 3. Sistema de notificaciones
function crearNotificador(bus) {
    const container = document.createElement("div");
    container.className = "notificaciones";
    document.body.appendChild(container);
    
    bus.on("notificacion", (datos) => {
        const notif = document.createElement("div");
        notif.className = "notificacion " + (datos.tipo || "info");
        notif.textContent = datos.mensaje;
        container.appendChild(notif);
        
        setTimeout(() => {
            notif.remove();
        }, datos.duracion || 3000);
    });
    
    return {
        info: (msg) => bus.emit("notificacion", { tipo: "info", mensaje: msg }),
        success: (msg) => bus.emit("notificacion", { tipo: "success", mensaje: msg }),
        error: (msg) => bus.emit("notificacion", { tipo: "error", mensaje: msg })
    };
}

const notificador = crearNotificador(bus);
notificador.info("Mensaje informativo");
notificador.success("Operacion exitosa");
```

### Solucion Ejercicio 6

```javascript
// Aplicacion To-Do App completa
function crearTodoApp() {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    let filtroActual = "todas";
    
    const container = document.createElement("div");
    container.className = "todo-app";
    
    // Event bus para comunicacion
    const eventos = new EventBus();
    
    // Guardar en localStorage
    function guardar() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
        eventos.emit("tareas:actualizadas", tareas);
    }
    
    // Formulario
    const formulario = document.createElement("form");
    formulario.className = "todo-form";
    
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
    filtros.className = "todo-filtros";
    
    ["todas", "pendientes", "completadas"].forEach(estado => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "filter-btn " + (estado === filtroActual ? "active" : "");
        btn.textContent = estado;
        btn.addEventListener("click", () => {
            filtroActual = estado;
            filtros.querySelectorAll(".filter-btn").forEach(b => {
                b.classList.toggle("active", b.textContent === estado);
            });
            renderizar();
        });
        filtros.appendChild(btn);
    });
    
    // Lista
    const lista = document.createElement("ul");
    lista.className = "todo-list";
    
    // Contador
    const contador = document.createElement("p");
    contador.className = "todo-counter";
    
    // Event delegation para la lista
    lista.addEventListener("click", (e) => {
        // Completar tarea
        const checkbox = e.target.closest(".todo-checkbox");
        if (checkbox) {
            const id = parseInt(checkbox.dataset.id);
            const tarea = tareas.find(t => t.id === id);
            if (tarea) {
                tarea.completada = !tarea.completada;
                guardar();
                renderizar();
            }
            return;
        }
        
        // Eliminar tarea
        const botonEliminar = e.target.closest(".todo-delete");
        if (botonEliminar) {
            const id = parseInt(botonEliminar.dataset.id);
            tareas = tareas.filter(t => t.id !== id);
            guardar();
            renderizar();
            return;
        }
        
        // Editar tarea
        const botonEditar = e.target.closest(".todo-edit");
        if (botonEditar) {
            const id = parseInt(botonEditar.dataset.id);
            const tarea = tareas.find(t => t.id === id);
            if (tarea) {
                const nuevoTexto = prompt("Editar tarea:", tarea.texto);
                if (nuevoTexto && nuevoTexto.trim()) {
                    tarea.texto = nuevoTexto.trim();
                    guardar();
                    renderizar();
                }
            }
        }
    });
    
    // Agregar tarea
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        if (input.value.trim()) {
            tareas.push({
                id: Date.now(),
                texto: input.value.trim(),
                completada: false,
                fecha: new Date().toISOString()
            });
            input.value = "";
            guardar();
            renderizar();
        }
    });
    
    function renderizar() {
        lista.innerHTML = "";
        
        const tareasFiltradas = tareas.filter(tarea => {
            if (filtroActual === "pendientes") return !tarea.completada;
            if (filtroActual === "completadas") return tarea.completada;
            return true;
        });
        
        tareasFiltradas.forEach(tarea => {
            const li = document.createElement("li");
            li.className = "todo-item " + (tarea.completada ? "completed" : "");
            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "todo-checkbox";
            checkbox.checked = tarea.completada;
            checkbox.dataset.id = tarea.id;
            
            const texto = document.createElement("span");
            texto.className = "todo-text";
            texto.textContent = tarea.texto;
            
            const botonEditar = document.createElement("button");
            botonEditar.className = "todo-edit";
            botonEditar.dataset.id = tarea.id;
            botonEditar.textContent = "Editar";
            
            const botonEliminar = document.createElement("button");
            botonEliminar.className = "todo-delete";
            botonEliminar.dataset.id = tarea.id;
            botonEliminar.textContent = "X";
            
            li.append(checkbox, texto, botonEditar, botonEliminar);
            lista.appendChild(li);
        });
        
        const pendientes = tareas.filter(t => !t.completada).length;
        const completadas = tareas.filter(t => t.completada).length;
        contador.textContent = "Pendientes: " + pendientes + " | Completadas: " + completadas;
    }
    
    container.append(formulario, filtros, lista, contador);
    renderizar();
    
    return container;
}

document.body.appendChild(crearTodoApp());
```
