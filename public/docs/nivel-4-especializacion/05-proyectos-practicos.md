# Leccion 5: Proyectos Practicos

## Objetivos de aprendizaje

- [ ] Crear una aplicacion Todo App con CRUD completo
- [ ] Desarrollar una aplicacion del clima con Fetch API
- [ ] Construir una interfaz de chat con eventos
- [ ] Implementar una calculadora con manejo de estado
- [ ] Aplicar estructura de proyecto completa
- [ ] Manejar errores en proyectos reales
- [ ] Aplicar mejores practicas de desarrollo

---

## 1. Todo App - Operaciones CRUD

### Ejemplo 1: Estructura del proyecto

```javascript
// Estructura de archivos
/*
todo-app/
  index.html
  css/
    styles.css
  js/
    app.js
    store.js
    components/
      todoList.js
      todoItem.js
      todoForm.js
    utils/
      storage.js
      helpers.js
*/

// store.js - Estado centralizado
class TodoStore {
    constructor() {
        this.todos = this.cargar();
        this.observers = [];
    }
    
    cargar() {
        try {
            const datos = localStorage.getItem('todos');
            return datos ? JSON.parse(datos) : [];
        } catch (error) {
            console.error('Error cargando todos:', error);
            return [];
        }
    }
    
    guardar() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error guardando todos:', error);
        }
    }
    
    agregar(todo) {
        const nuevoTodo = {
            id: Date.now(),
            texto: todo.texto,
            completado: false,
            fechaCreacion: new Date().toISOString()
        };
        
        this.todos.push(nuevoTodo);
        this.guardar();
        this.notificar();
        
        return nuevoTodo;
    }
    
    eliminar(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.guardar();
        this.notificar();
    }
    
    actualizar(id, datos) {
        const indice = this.todos.findIndex(todo => todo.id === id);
        
        if (indice !== -1) {
            this.todos[indice] = { ...this.todos[indice], ...datos };
            this.guardar();
            this.notificar();
        }
    }
    
    toggleCompletado(id) {
        const todo = this.todos.find(todo => todo.id === id);
        
        if (todo) {
            todo.completado = !todo.completado;
            this.guardar();
            this.notificar();
        }
    }
    
    obtenerTodos(filtro = 'todos') {
        switch (filtro) {
            case 'completados':
                return this.todos.filter(todo => todo.completado);
            case 'pendientes':
                return this.todos.filter(todo => !todo.completado);
            default:
                return this.todos;
        }
    }
    
    observer(callback) {
        this.observers.push(callback);
        
        return () => {
            this.observers = this.observers.filter(obs => obs !== callback);
        };
    }
    
    notificar() {
        this.observers.forEach(callback => callback(this.todos));
    }
    
    limpiarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardar();
        this.notificar();
    }
}
```

### Ejemplo 2: Componentes de la interfaz

```javascript
// components/todoForm.js
class TodoForm {
    constructor(store) {
        this.store = store;
        this.elemento = this.crear();
    }
    
    crear() {
        const form = document.createElement('form');
        form.className = 'todo-form';
        
        form.innerHTML = `
            <input 
                type="text" 
                class="todo-input" 
                placeholder="Agregar nueva tarea..."
                required
            >
            <button type="submit" class="todo-button">Agregar</button>
        `;
        
        form.addEventListener('submit', (e) => this.manejarSubmit(e));
        
        return form;
    }
    
    manejarSubmit(e) {
        e.preventDefault();
        
        const input = this.elemento.querySelector('.todo-input');
        const texto = input.value.trim();
        
        if (texto) {
            this.store.agregar({ texto });
            input.value = '';
            input.focus();
        }
    }
    
    render() {
        return this.elemento;
    }
}

// components/todoItem.js
class TodoItem {
    constructor(store, todo) {
        this.store = store;
        this.todo = todo;
        this.elemento = this.crear();
    }
    
    crear() {
        const item = document.createElement('li');
        item.className = `todo-item ${this.todo.completado ? 'completado' : ''}`;
        item.dataset.id = this.todo.id;
        
        item.innerHTML = `
            <input 
                type="checkbox" 
                class="todo-checkbox"
                ${this.todo.completado ? 'checked' : ''}
            >
            <span class="todo-texto">${this.textoSeguro(this.todo.texto)}</span>
            <div class="todo-acciones">
                <button class="btn-editar" title="Editar">Editar</button>
                <button class="btn-eliminar" title="Eliminar">Eliminar</button>
            </div>
        `;
        
        // Eventos
        item.querySelector('.todo-checkbox').addEventListener('change', () => {
            this.store.toggleCompletado(this.todo.id);
        });
        
        item.querySelector('.btn-editar').addEventListener('click', () => {
            this.editar();
        });
        
        item.querySelector('.btn-eliminar').addEventListener('click', () => {
            this.eliminar();
        });
        
        // Doble clic para editar
        item.querySelector('.todo-texto').addEventListener('dblclick', () => {
            this.editar();
        });
        
        return item;
    }
    
    textoSeguro(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
    
    editar() {
        const textoSpan = this.elemento.querySelector('.todo-texto');
        const textoActual = this.todo.texto;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todo-editar-input';
        input.value = textoActual;
        
        textoSpan.replaceWith(input);
        input.focus();
        input.select();
        
        const guardar = () => {
            const nuevoTexto = input.value.trim();
            
            if (nuevoTexto && nuevoTexto !== textoActual) {
                this.store.actualizar(this.todo.id, { texto: nuevoTexto });
            } else {
                input.replaceWith(textoSpan);
            }
        };
        
        input.addEventListener('blur', guardar);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') guardar();
            if (e.key === 'Escape') input.replaceWith(textoSpan);
        });
    }
    
    eliminar() {
        if (confirm('¿Estas seguro de eliminar esta tarea?')) {
            this.store.eliminar(this.todo.id);
        }
    }
    
    actualizar(todo) {
        this.todo = todo;
        this.elemento.className = `todo-item ${todo.completado ? 'completado' : ''}`;
        this.elemento.querySelector('.todo-checkbox').checked = todo.completado;
    }
    
    render() {
        return this.elemento;
    }
}

// components/todoList.js
class TodoList {
    constructor(store) {
        this.store = store;
        this.elemento = this.crear();
        this.items = new Map();
        
        this.store.observer(() => this.renderizar());
    }
    
    crear() {
        const lista = document.createElement('ul');
        lista.className = 'todo-list';
        
        return lista;
    }
    
    renderizar(filtro = 'todos') {
        const todos = this.store.obtenerTodos(filtro);
        
        // Limpiar lista
        this.elemento.innerHTML = '';
        this.items.clear();
        
        // Renderizar cada todo
        todos.forEach(todo => {
            const item = new TodoItem(this.store, todo);
            this.items.set(todo.id, item);
            this.elemento.appendChild(item.render());
        });
        
        // Mostrar mensaje si esta vacia
        if (todos.length === 0) {
            const vacio = document.createElement('li');
            vacio.className = 'todo-vacio';
            vacio.textContent = 'No hay tareas pendientes';
            this.elemento.appendChild(vacio);
        }
    }
    
    render() {
        return this.elemento;
    }
}
```

### Ejemplo 3: Aplicacion principal

```javascript
// app.js
class TodoApp {
    constructor() {
        this.store = new TodoStore();
        this.filtroActual = 'todos';
        
        this.inicializar();
    }
    
    inicializar() {
        // Crear estructura HTML
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="todo-app">
                <header class="todo-header">
                    <h1>Mi Lista de Tareas</h1>
                    <p class="todo-contador"></p>
                </header>
                
                <div class="todo-form-container"></div>
                
                <div class="todo-filtros">
                    <button class="filtro-btn" data-filtro="todos">Todos</button>
                    <button class="filtro-btn" data-filtro="pendientes">Pendientes</button>
                    <button class="filtro-btn" data-filtro="completados">Completados</button>
                </div>
                
                <div class="todo-list-container"></div>
                
                <footer class="todo-footer">
                    <button class="btn-limpiar">Limpiar completados</button>
                </footer>
            </div>
        `;
        
        // Inicializar componentes
        const formContainer = app.querySelector('.todo-form-container');
        const listContainer = app.querySelector('.todo-list-container');
        
        this.form = new TodoForm(this.store);
        this.lista = new TodoList(this.store);
        
        formContainer.appendChild(this.form.render());
        listContainer.appendChild(this.lista.render());
        
        // Eventos de filtros
        app.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.cambiarFiltro(e.target.dataset.filtro);
            });
        });
        
        // Evento limpiar completados
        app.querySelector('.btn-limpiar').addEventListener('click', () => {
            if (confirm('¿Eliminar todas las tareas completadas?')) {
                this.store.limpiarCompletados();
            }
        });
        
        // Observer para actualizar contador
        this.store.observer(() => this.actualizarContador());
        
        // Render inicial
        this.renderizar();
    }
    
    cambiarFiltro(filtro) {
        this.filtroActual = filtro;
        
        // Actualizar botones activos
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.toggle('activo', btn.dataset.filtro === filtro);
        });
        
        this.renderizar();
    }
    
    renderizar() {
        this.lista.renderizar(this.filtroActual);
        this.actualizarContador();
    }
    
    actualizarContador() {
        const todos = this.store.obtenerTodos();
        const pendientes = todos.filter(t => !t.completado).length;
        
        const contador = document.querySelector('.todo-contador');
        if (contador) {
            contador.textContent = `${pendientes} tarea${pendientes !== 1 ? 's' : ''} pendiente${pendientes !== 1 ? 's' : ''}`;
        }
    }
}

// Iniciar aplicacion
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
```

---

## 2. Weather App - Fetch API y DOM

### Ejemplo 4: Estructura del clima

```javascript
// weather-app.js
class WeatherApp {
    constructor() {
        this.apiKey = 'TU_API_KEY'; // Usar variable de entorno
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.unidades = 'metric';
        this.idioma = 'es';
        
        this.cache = new Map();
        this.tiempoCache = 30 * 60 * 1000; // 30 minutos
        
        this.inicializar();
    }
    
    inicializar() {
        this.crearInterfaz();
        this.cargarUbicacionGuardada();
        this.configurarEventos();
    }
    
    crearInterfaz() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="weather-app">
                <header class="weather-header">
                    <h1>Clima</h1>
                    <div class="search-container">
                        <input 
                            type="text" 
                            class="search-input" 
                            placeholder="Buscar ciudad..."
                        >
                        <button class="search-button">Buscar</button>
                        <button class="location-button">Mi ubicacion</button>
                    </div>
                </header>
                
                <main class="weather-main">
                    <div class="weather-loading" style="display: none;">
                        Cargando...
                    </div>
                    
                    <div class="weather-error" style="display: none;">
                        <p class="error-message"></p>
                    </div>
                    
                    <div class="weather-content" style="display: none;">
                        <div class="current-weather">
                            <h2 class="city-name"></h2>
                            <div class="temperature"></div>
                            <div class="description"></div>
                            <div class="weather-icon"></div>
                        </div>
                        
                        <div class="weather-details">
                            <div class="detail">
                                <span class="label">Sensacion termica:</span>
                                <span class="value feels-like"></span>
                            </div>
                            <div class="detail">
                                <span class="label">Humedad:</span>
                                <span class="value humidity"></span>
                            </div>
                            <div class="detail">
                                <span class="label">Viento:</span>
                                <span class="value wind"></span>
                            </div>
                            <div class="detail">
                                <span class="label">Presion:</span>
                                <span class="value pressure"></span>
                            </div>
                        </div>
                        
                        <div class="forecast">
                            <h3>Pronostico 5 dias</h3>
                            <div class="forecast-list"></div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
    
    configurarEventos() {
        // Buscar ciudad
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');
        
        searchButton.addEventListener('click', () => {
            const ciudad = searchInput.value.trim();
            if (ciudad) {
                this.buscarCiudad(ciudad);
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const ciudad = searchInput.value.trim();
                if (ciudad) {
                    this.buscarCiudad(ciudad);
                }
            }
        });
        
        // Ubicacion actual
        const locationButton = document.querySelector('.location-button');
        locationButton.addEventListener('click', () => {
            this.obtenerUbicacionActual();
        });
    }
    
    async buscarCiudad(ciudad) {
        this.mostrarCargando();
        
        try {
            const cacheKey = `weather_${ciudad}`;
            const cacheado = this.obtenerCache(cacheKey);
            
            let datos;
            
            if (cacheado) {
                datos = cacheado;
            } else {
                const response = await fetch(
                    `${this.baseUrl}/weather?q=${encodeURIComponent(ciudad)}&appid=${this.apiKey}&units=${this.unidades}&lang=${this.idioma}`
                );
                
                if (!response.ok) {
                    throw new Error('Ciudad no encontrada');
                }
                
                datos = await response.json();
                this.guardarCache(cacheKey, datos);
            }
            
            this.mostrarClima(datos);
            this.guardarUbicacion(ciudad);
            
            // Obtener pronostico
            await this.obtenerPronostico(datos.coord.lat, datos.coord.lon);
            
        } catch (error) {
            this.mostrarError(error.message);
        }
    }
    
    async obtenerPronostico(lat, lon) {
        try {
            const cacheKey = `forecast_${lat}_${lon}`;
            const cacheado = this.obtenerCache(cacheKey);
            
            let datos;
            
            if (cacheado) {
                datos = cacheado;
            } else {
                const response = await fetch(
                    `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.unidades}&lang=${this.idioma}`
                );
                
                if (!response.ok) {
                    throw new Error('Error obteniendo pronostico');
                }
                
                datos = await response.json();
                this.guardarCache(cacheKey, datos);
            }
            
            this.mostrarPronostico(datos);
            
        } catch (error) {
            console.error('Error en pronostico:', error);
        }
    }
    
    mostrarClima(datos) {
        document.querySelector('.weather-loading').style.display = 'none';
        document.querySelector('.weather-error').style.display = 'none';
        document.querySelector('.weather-content').style.display = 'block';
        
        document.querySelector('.city-name').textContent = 
            `${datos.name}, ${datos.sys.country}`;
        document.querySelector('.temperature').textContent = 
            `${Math.round(datos.main.temp)}°C`;
        document.querySelector('.description').textContent = 
            datos.weather[0].description;
        document.querySelector('.weather-icon').innerHTML = 
            `<img src="https://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png" alt="${datos.weather[0].description}">`;
        
        document.querySelector('.feels-like').textContent = 
            `${Math.round(datos.main.feels_like)}°C`;
        document.querySelector('.humidity').textContent = 
            `${datos.main.humidity}%`;
        document.querySelector('.wind').textContent = 
            `${Math.round(datos.wind.speed * 3.6)} km/h`;
        document.querySelector('.pressure').textContent = 
            `${datos.main.pressure} hPa`;
    }
    
    mostrarPronostico(datos) {
        const forecastList = document.querySelector('.forecast-list');
        forecastList.innerHTML = '';
        
        // Obtener un pronostico por dia (cada 8 registros = 24 horas)
        const pronosticosDiarios = datos.list.filter((_, index) => index % 8 === 0);
        
        pronosticosDiarios.forEach(dia => {
            const fecha = new Date(dia.dt * 1000);
            const diaSemana = fecha.toLocaleDateString('es', { weekday: 'short' });
            
            const div = document.createElement('div');
            div.className = 'forecast-item';
            div.innerHTML = `
                <div class="forecast-dia">${diaSemana}</div>
                <div class="forecast-icon">
                    <img src="https://openweathermap.org/img/wn/${dia.weather[0].icon}.png" alt="">
                </div>
                <div class="forecast-temp">
                    ${Math.round(dia.main.temp)}°C
                </div>
            `;
            
            forecastList.appendChild(div);
        });
    }
    
    async obtenerUbicacionActual() {
        this.mostrarCargando();
        
        try {
            const ubicacion = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve(position.coords),
                    (error) => reject(error),
                    { timeout: 10000 }
                );
            });
            
            const response = await fetch(
                `${this.baseUrl}/weather?lat=${ubicacion.latitude}&lon=${ubicacion.longitude}&appid=${this.apiKey}&units=${this.unidades}&lang=${this.idioma}`
            );
            
            if (!response.ok) {
                throw new Error('Error obteniendo clima');
            }
            
            const datos = await response.json();
            this.mostrarClima(datos);
            await this.obtenerPronostico(ubicacion.latitude, ubicacion.longitude);
            
        } catch (error) {
            this.mostrarError('No se pudo obtener la ubicacion');
        }
    }
    
    mostrarCargando() {
        document.querySelector('.weather-loading').style.display = 'block';
        document.querySelector('.weather-error').style.display = 'none';
        document.querySelector('.weather-content').style.display = 'none';
    }
    
    mostrarError(mensaje) {
        document.querySelector('.weather-loading').style.display = 'none';
        document.querySelector('.weather-error').style.display = 'block';
        document.querySelector('.weather-content').style.display = 'none';
        document.querySelector('.error-message').textContent = mensaje;
    }
    
    // Cache con expiracion
    obtenerCache(clave) {
        const datos = this.cache.get(clave);
        
        if (datos && Date.now() - datos.timestamp < this.tiempoCache) {
            return datos.valor;
        }
        
        this.cache.delete(clave);
        return null;
    }
    
    guardarCache(clave, valor) {
        this.cache.set(clave, {
            valor,
            timestamp: Date.now()
        });
    }
    
    // Guardar/cargar ubicacion
    guardarUbicacion(ciudad) {
        localStorage.setItem('ultimaUbicacion', ciudad);
    }
    
    cargarUbicacionGuardada() {
        const ciudad = localStorage.getItem('ultimaUbicacion');
        if (ciudad) {
            document.querySelector('.search-input').value = ciudad;
            this.buscarCiudad(ciudad);
        }
    }
}

// Iniciar
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
```

---

## 3. Chat Interface - Eventos y DOM

### Ejemplo 5: Estructura del chat

```javascript
// chat-app.js
class ChatApp {
    constructor() {
        this.mensajes = [];
        this.usuarioActual = {
            id: 1,
            nombre: 'Usuario',
            avatar: '👤'
        };
        
        this.usuarios = [
            { id: 1, nombre: 'Usuario', avatar: '👤', online: true },
            { id: 2, nombre: 'Maria', avatar: '👩', online: true },
            { id: 3, nombre: 'Carlos', avatar: '👨', online: false },
            { id: 4, nombre: 'Ana', avatar: '👩‍🦰', online: true }
        ];
        
        this.chatActivo = null;
        this.typingTimeout = null;
        
        this.inicializar();
    }
    
    inicializar() {
        this.crearInterfaz();
        this.configurarEventos();
        this.cargarMensajes();
        this.simularActividad();
    }
    
    crearInterfaz() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="chat-app">
                <aside class="chat-sidebar">
                    <div class="chat-header">
                        <h2>Chats</h2>
                        <div class="user-info">
                            <span class="user-avatar">${this.usuarioActual.avatar}</span>
                            <span class="user-name">${this.usuarioActual.nombre}</span>
                        </div>
                    </div>
                    
                    <div class="contacts-list">
                        ${this.usuarios.filter(u => u.id !== this.usuarioActual.id).map(usuario => `
                            <div class="contact-item" data-user-id="${usuario.id}">
                                <span class="contact-avatar">${usuario.avatar}</span>
                                <div class="contact-info">
                                    <span class="contact-name">${usuario.nombre}</span>
                                    <span class="contact-status ${usuario.online ? 'online' : 'offline'}">
                                        ${usuario.online ? 'En linea' : 'Desconectado'}
                                    </span>
                                </div>
                                <span class="contact-unread" style="display: none;">0</span>
                            </div>
                        `).join('')}
                    </div>
                </aside>
                
                <main class="chat-main">
                    <div class="chat-empty">
                        <p>Selecciona un chat para comenzar</p>
                    </div>
                    
                    <div class="chat-active" style="display: none;">
                        <div class="chat-header-active">
                            <span class="chat-avatar"></span>
                            <div class="chat-user-info">
                                <span class="chat-user-name"></span>
                                <span class="chat-user-status"></span>
                            </div>
                        </div>
                        
                        <div class="messages-container">
                            <div class="messages-list"></div>
                        </div>
                        
                        <div class="typing-indicator" style="display: none;">
                            <span class="typing-dots">
                                <span></span><span></span><span></span>
                            </span>
                            <span class="typing-text">escribiendo...</span>
                        </div>
                        
                        <div class="message-input-container">
                            <button class="btn-emoji" title="Emojis">😊</button>
                            <input 
                                type="text" 
                                class="message-input" 
                                placeholder="Escribe un mensaje..."
                            >
                            <button class="btn-send" title="Enviar">Enviar</button>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
    
    configurarEventos() {
        // Seleccionar chat
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', () => {
                const userId = parseInt(item.dataset.userId);
                this.seleccionarChat(userId);
            });
        });
        
        // Enviar mensaje
        const messageInput = document.querySelector('.message-input');
        const btnSend = document.querySelector('.btn-send');
        
        btnSend.addEventListener('click', () => this.enviarMensaje());
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.enviarMensaje();
            }
        });
        
        // Indicador de escribiendo
        messageInput.addEventListener('input', () => {
            this.mostrarEscribiendo();
        });
    }
    
    seleccionarChat(userId) {
        const usuario = this.usuarios.find(u => u.id === userId);
        
        if (!usuario) return;
        
        this.chatActivo = usuario;
        
        // Actualizar UI
        document.querySelector('.chat-empty').style.display = 'none';
        document.querySelector('.chat-active').style.display = 'flex';
        
        document.querySelector('.chat-avatar').textContent = usuario.avatar;
        document.querySelector('.chat-user-name').textContent = usuario.nombre;
        document.querySelector('.chat-user-status').textContent = 
            usuario.online ? 'En linea' : 'Desconectado';
        
        // Marcar contacto como activo
        document.querySelectorAll('.contact-item').forEach(item => {
            item.classList.toggle('activo', parseInt(item.dataset.userId) === userId);
        });
        
        // Ocultar badge de no leidos
        const badge = document.querySelector(`.contact-item[data-user-id="${userId}"] .contact-unread`);
        if (badge) badge.style.display = 'none';
        
        // Cargar mensajes
        this.cargarMensajesChat(userId);
        
        // Focus en input
        document.querySelector('.message-input').focus();
    }
    
    enviarMensaje() {
        const input = document.querySelector('.message-input');
        const texto = input.value.trim();
        
        if (!texto || !this.chatActivo) return;
        
        const mensaje = {
            id: Date.now(),
            emisor: this.usuarioActual.id,
            receptor: this.chatActivo.id,
            texto,
            timestamp: new Date(),
            leido: false
        };
        
        this.mensajes.push(mensaje);
        this.mostrarMensaje(mensaje);
        
        input.value = '';
        input.focus();
        
        // Simular respuesta despues de un tiempo
        this.simularRespuesta();
        
        // Guardar en localStorage
        this.guardarMensajes();
    }
    
    mostrarMensaje(mensaje) {
        const messagesList = document.querySelector('.messages-list');
        
        const esEnviado = mensaje.emisor === this.usuarioActual.id;
        
        const div = document.createElement('div');
        div.className = `message ${esEnviado ? 'enviado' : 'recibido'}`;
        div.dataset.messageId = mensaje.id;
        
        const hora = mensaje.timestamp.toLocaleTimeString('es', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        div.innerHTML = `
            <div class="message-content">
                <p class="message-text">${this.textoSeguro(mensaje.texto)}</p>
                <span class="message-time">${hora}</span>
            </div>
            ${esEnviado ? '<span class="message-status">✓✓</span>' : ''}
        `;
        
        messagesList.appendChild(div);
        
        // Scroll al final
        this.scrollToBottom();
    }
    
    cargarMensajesChat(userId) {
        const messagesList = document.querySelector('.messages-list');
        messagesList.innerHTML = '';
        
        const mensajesChat = this.mensajes.filter(m => 
            (m.emisor === this.usuarioActual.id && m.receptor === userId) ||
            (m.emisor === userId && m.receptor === this.usuarioActual.id)
        );
        
        mensajesChat.forEach(mensaje => this.mostrarMensaje(mensaje));
    }
    
    mostrarEscribiendo() {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        const indicator = document.querySelector('.typing-indicator');
        indicator.style.display = 'flex';
        
        this.typingTimeout = setTimeout(() => {
            indicator.style.display = 'none';
        }, 2000);
    }
    
    simularRespuesta() {
        if (!this.chatActivo) return;
        
        // Mostrar que el otro esta escribiendo
        setTimeout(() => {
            const indicator = document.querySelector('.typing-indicator');
            indicator.style.display = 'flex';
        }, 1000);
        
        // Enviar respuesta despues de un tiempo
        setTimeout(() => {
            const indicator = document.querySelector('.typing-indicator');
            indicator.style.display = 'none';
            
            const respuestas = [
                '¡Hola! ¿Como estas?',
                'Interesante, cuéntame mas',
                'Entiendo, ¿que mas?',
                '¡Genial!',
                'Ok, gracias por la info',
                '¿En serio? ¡Wow!',
                'Jaja, que bueno',
                'De acuerdo, ¿y luego?',
                '¡Perfecto!',
                'Tienes razón'
            ];
            
            const respuesta = {
                id: Date.now(),
                emisor: this.chatActivo.id,
                receptor: this.usuarioActual.id,
                texto: respuestas[Math.floor(Math.random() * respuestas.length)],
                timestamp: new Date(),
                leido: true
            };
            
            this.mensajes.push(respuesta);
            
            if (this.chatActivo && respuesta.receptor === this.chatActivo.id) {
                this.mostrarMensaje(respuesta);
            }
            
            this.guardarMensajes();
            
        }, 2000 + Math.random() * 2000);
    }
    
    simularActividad() {
        // Simular cambio de estado de usuarios
        setInterval(() => {
            const usuarioAleatorio = this.usuarios[Math.floor(Math.random() * this.usuarios.length)];
            if (usuarioAleatorio.id !== this.usuarioActual.id) {
                usuarioAleatorio.online = !usuarioAleatorio.online;
                
                const contactItem = document.querySelector(
                    `.contact-item[data-user-id="${usuarioAleatorio.id}"] .contact-status`
                );
                
                if (contactItem) {
                    contactItem.textContent = usuarioAleatorio.online ? 'En linea' : 'Desconectado';
                    contactItem.className = `contact-status ${usuarioAleatorio.online ? 'online' : 'offline'}`;
                }
            }
        }, 10000);
    }
    
    scrollToBottom() {
        const container = document.querySelector('.messages-container');
        container.scrollTop = container.scrollHeight;
    }
    
    textoSeguro(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
    
    guardarMensajes() {
        try {
            localStorage.setItem('chatMensajes', JSON.stringify(this.mensajes));
        } catch (error) {
            console.error('Error guardando mensajes:', error);
        }
    }
    
    cargarMensajes() {
        try {
            const datos = localStorage.getItem('chatMensajes');
            if (datos) {
                this.mensajes = JSON.parse(datos).map(m => ({
                    ...m,
                    timestamp: new Date(m.timestamp)
                }));
            }
        } catch (error) {
            console.error('Error cargando mensajes:', error);
        }
    }
}

// Iniciar
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});
```

---

## 4. Calculator - DOM y State Management

### Ejemplo 6: Calculadora completa

```javascript
// calculator-app.js
class Calculator {
    constructor() {
        this.estado = {
            valorActual: '0',
            valorAnterior: null,
            operador: null,
            esperandoOperandos: false,
            historial: []
        };
        
        this.inicializar();
    }
    
    inicializar() {
        this.crearInterfaz();
        this.configurarEventos();
        this.configurarTeclado();
    }
    
    crearInterfaz() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="calculator">
                <div class="calculator-display">
                    <div class="display-previous"></div>
                    <div class="display-current">0</div>
                </div>
                
                <div class="calculator-buttons">
                    <button class="btn btn-clear" data-action="clear">C</button>
                    <button class="btn btn-sign" data-action="sign">+/-</button>
                    <button class="btn btn-percent" data-action="percent">%</button>
                    <button class="btn btn-operator" data-action="operator" data-value="/">/</button>
                    
                    <button class="btn btn-number" data-action="number" data-value="7">7</button>
                    <button class="btn btn-number" data-action="number" data-value="8">8</button>
                    <button class="btn btn-number" data-action="number" data-value="9">9</button>
                    <button class="btn btn-operator" data-action="operator" data-value="*">x</button>
                    
                    <button class="btn btn-number" data-action="number" data-value="4">4</button>
                    <button class="btn btn-number" data-action="number" data-value="5">5</button>
                    <button class="btn btn-number" data-action="number" data-value="6">6</button>
                    <button class="btn btn-operator" data-action="operator" data-value="-">-</button>
                    
                    <button class="btn btn-number" data-action="number" data-value="1">1</button>
                    <button class="btn btn-number" data-action="number" data-value="2">2</button>
                    <button class="btn btn-number" data-action="number" data-value="3">3</button>
                    <button class="btn btn-operator" data-action="operator" data-value="+">+</button>
                    
                    <button class="btn btn-number btn-zero" data-action="number" data-value="0">0</button>
                    <button class="btn btn-number" data-action="decimal">.</button>
                    <button class="btn btn-equals" data-action="equals">=</button>
                </div>
                
                <div class="calculator-history">
                    <h3>Historial</h3>
                    <div class="history-list"></div>
                    <button class="btn-clear-history">Limpiar historial</button>
                </div>
            </div>
        `;
    }
    
    configurarEventos() {
        // Eventos de botones
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const value = e.target.dataset.value;
                
                this.manejarAccion(action, value);
                
                // Efecto visual
                e.target.classList.add('pressed');
                setTimeout(() => e.target.classList.remove('pressed'), 100);
            });
        });
        
        // Limpiar historial
        document.querySelector('.btn-clear-history').addEventListener('click', () => {
            this.estado.historial = [];
            this.mostrarHistorial();
        });
    }
    
    configurarTeclado() {
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                this.manejarAccion('number', e.key);
            } else if (e.key === '.') {
                this.manejarAccion('decimal');
            } else if (e.key === '+') {
                this.manejarAccion('operator', '+');
            } else if (e.key === '-') {
                this.manejarAccion('operator', '-');
            } else if (e.key === '*') {
                this.manejarAccion('operator', '*');
            } else if (e.key === '/') {
                e.preventDefault();
                this.manejarAccion('operator', '/');
            } else if (e.key === 'Enter' || e.key === '=') {
                this.manejarAccion('equals');
            } else if (e.key === 'Escape') {
                this.manejarAccion('clear');
            } else if (e.key === 'Backspace') {
                this.borrarUltimoDigito();
            }
        });
    }
    
    manejarAccion(action, value) {
        switch (action) {
            case 'number':
                this.ingresarNumero(value);
                break;
            case 'decimal':
                this.ingresarDecimal();
                break;
            case 'operator':
                this.ingresarOperador(value);
                break;
            case 'equals':
                this.calcular();
                break;
            case 'clear':
                this.limpiar();
                break;
            case 'sign':
                this.cambiarSigno();
                break;
            case 'percent':
                this.porcentaje();
                break;
        }
        
        this.actualizarDisplay();
    }
    
    ingresarNumero(numero) {
        if (this.estado.esperandoOperandos) {
            this.estado.valorActual = numero;
            this.estado.esperandoOperandos = false;
        } else {
            this.estado.valorActual = 
                this.estado.valorActual === '0' ? numero : this.estado.valorActual + numero;
        }
    }
    
    ingresarDecimal() {
        if (this.estado.esperandoOperandos) {
            this.estado.valorActual = '0.';
            this.estado.esperandoOperandos = false;
            return;
        }
        
        if (!this.estado.valorActual.includes('.')) {
            this.estado.valorActual += '.';
        }
    }
    
    ingresarOperador(operador) {
        const valorActual = parseFloat(this.estado.valorActual);
        
        if (this.estado.operador && this.estado.esperandoOperandos) {
            this.estado.operador = operador;
            return;
        }
        
        if (this.estado.valorAnterior === null) {
            this.estado.valorAnterior = valorActual;
        } else if (this.estado.operador) {
            const resultado = this.realizarOperacion(
                this.estado.valorAnterior, 
                valorActual, 
                this.estado.operador
            );
            
            this.estado.valorActual = String(resultado);
            this.estado.valorAnterior = resultado;
        }
        
        this.estado.esperandoOperandos = true;
        this.estado.operador = operador;
    }
    
    calcular() {
        if (this.estado.operador === null || this.estado.valorAnterior === null) {
            return;
        }
        
        const valorActual = parseFloat(this.estado.valorActual);
        const resultado = this.realizarOperacion(
            this.estado.valorAnterior, 
            valorActual, 
            this.estado.operador
        );
        
        // Guardar en historial
        this.estado.historial.push({
            operacion: `${this.estado.valorAnterior} ${this.obtenerSimboloOperador(this.estado.operador)} ${valorActual}`,
            resultado
        });
        
        this.estado.valorActual = String(resultado);
        this.estado.valorAnterior = null;
        this.estado.operador = null;
        this.estado.esperandoOperandos = true;
        
        this.mostrarHistorial();
    }
    
    realizarOperacion(a, b, operador) {
        switch (operador) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': 
                if (b === 0) {
                    alert('Error: Division por cero');
                    return a;
                }
                return a / b;
            default: return b;
        }
    }
    
    obtenerSimboloOperador(operador) {
        const simbolos = {
            '+': '+',
            '-': '-',
            '*': 'x',
            '/': '/'
        };
        return simbolos[operador] || operador;
    }
    
    limpiar() {
        this.estado.valorActual = '0';
        this.estado.valorAnterior = null;
        this.estado.operador = null;
        this.estado.esperandoOperandos = false;
    }
    
    cambiarSigno() {
        this.estado.valorActual = String(parseFloat(this.estado.valorActual) * -1);
    }
    
    porcentaje() {
        this.estado.valorActual = String(parseFloat(this.estado.valorActual) / 100);
    }
    
    borrarUltimoDigito() {
        if (this.estado.valorActual.length > 1) {
            this.estado.valorActual = this.estado.valorActual.slice(0, -1);
        } else {
            this.estado.valorActual = '0';
        }
        this.actualizarDisplay();
    }
    
    actualizarDisplay() {
        const displayCurrent = document.querySelector('.display-current');
        const displayPrevious = document.querySelector('.display-previous');
        
        displayCurrent.textContent = this.estado.valorActual;
        
        if (this.estado.operador && this.estado.valorAnterior !== null) {
            displayPrevious.textContent = 
                `${this.estado.valorAnterior} ${this.obtenerSimboloOperador(this.estado.operador)}`;
        } else {
            displayPrevious.textContent = '';
        }
    }
    
    mostrarHistorial() {
        const historyList = document.querySelector('.history-list');
        historyList.innerHTML = '';
        
        [...this.estado.historial].reverse().forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <span class="history-operation">${item.operacion} =</span>
                <span class="history-result">${item.resultado}</span>
            `;
            historyList.appendChild(div);
        });
    }
}

// Iniciar
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
```

---

## 5. Estructura completa de proyecto

### Ejemplo 7: Archivos esenciales

```javascript
// package.json - Configuracion del proyecto
/*
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "Proyecto de ejemplo",
  "main": "src/index.js",
  "scripts": {
    "start": "live-server src/",
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development --open",
    "lint": "eslint src/",
    "test": "jest"
  },
  "dependencies": {},
  "devDependencies": {
    "live-server": "^1.2.2",
    "eslint": "^8.0.0",
    "jest": "^29.0.0"
  }
}
*/

// .gitignore
/*
node_modules/
dist/
.env
.DS_Store
*/

// src/utils/helpers.js
export function formatoFecha(fecha) {
    return new Intl.DateTimeFormat('es', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(fecha));
}

export function formatoMoneda(cantidad, moneda = 'EUR') {
    return new Intl.NumberFormat('es', {
        style: 'currency',
        currency: moneda
    }).format(cantidad);
}

export function debounce(funcion, espera) {
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            funcion.apply(this, args);
        }, espera);
    };
}

export function throttle(funcion, limite) {
    let enEjecucion = false;
    
    return function (...args) {
        if (!enEjecucion) {
            funcion.apply(this, args);
            enEjecucion = true;
            
            setTimeout(() => {
                enEjecucion = false;
            }, limite);
        }
    };
}

// src/utils/api.js
export class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.tiempoCache = 5 * 60 * 1000; // 5 minutos
        this.cache = new Map();
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        // Verificar cache para GET requests
        if (!options.method || options.method === 'GET') {
            const cacheKey = `${url}${JSON.stringify(options)}`;
            const cacheado = this.cache.get(cacheKey);
            
            if (cacheado && Date.now() - cacheado.timestamp < this.tiempoCache) {
                return cacheado.datos;
            }
        }
        
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const datos = await response.json();
        
        // Guardar en cache
        if (!options.method || options.method === 'GET') {
            this.cache.set(`${url}${JSON.stringify(options)}`, {
                datos,
                timestamp: Date.now()
            });
        }
        
        return datos;
    }
    
    get(endpoint) {
        return this.request(endpoint);
    }
    
    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
}

// src/utils/storage.js
export class StorageManager {
    constructor(nombreApp) {
        this.nombreApp = nombreApp;
    }
    
    guardar(clave, valor) {
        try {
            localStorage.setItem(`${this.nombreApp}_${clave}`, JSON.stringify(valor));
            return true;
        } catch (error) {
            console.error('Error guardando:', error);
            return false;
        }
    }
    
    obtener(clave, valorPorDefecto = null) {
        try {
            const datos = localStorage.getItem(`${this.nombreApp}_${clave}`);
            return datos ? JSON.parse(datos) : valorPorDefecto;
        } catch (error) {
            console.error('Error obteniendo:', error);
            return valorPorDefecto;
        }
    }
    
    eliminar(clave) {
        try {
            localStorage.removeItem(`${this.nombreApp}_${clave}`);
            return true;
        } catch (error) {
            console.error('Error eliminando:', error);
            return false;
        }
    }
    
    limpiar() {
        try {
            Object.keys(localStorage)
                .filter(key => key.startsWith(`${this.nombreApp}_`))
                .forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Error limpiando:', error);
            return false;
        }
    }
}

// src/utils/validators.js
export function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function validarPassword(password) {
    const requisitos = {
        longitudMinima: password.length >= 8,
        tieneMayuscula: /[A-Z]/.test(password),
        tieneMinuscula: /[a-z]/.test(password),
        tieneNumero: /[0-9]/.test(password),
        tieneCaracterEspecial: /[!@#$%^&*]/.test(password)
    };
    
    const cumpleRequisitos = Object.values(requisitos).every(Boolean);
    
    return {
        valido: cumpleRequisitos,
        requisitos
    };
}

export function validarTelefono(telefono) {
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    return regex.test(telefono);
}
```

---

## 6. Manejo de errores en proyectos reales

### Ejemplo 8: Patron de manejo de errores

```javascript
// src/utils/errors.js
export class AppError extends Error {
    constructor(mensaje, codigo, detalles = null) {
        super(mensaje);
        this.name = 'AppError';
        this.codigo = codigo;
        this.detalles = detalles;
        this.timestamp = new Date().toISOString();
    }
    
    toJSON() {
        return {
            nombre: this.name,
            mensaje: this.message,
            codigo: this.codigo,
            detalles: this.detalles,
            timestamp: this.timestamp
        };
    }
}

export class ValidationError extends AppError {
    constructor(campo, mensaje) {
        super(`Error de validacion en ${campo}: ${mensaje}`, 'VALIDATION_ERROR');
        this.name = 'ValidationError';
        this.campo = campo;
    }
}

export class NetworkError extends AppError {
    constructor(mensaje, status) {
        super(mensaje || 'Error de red', 'NETWORK_ERROR');
        this.name = 'NetworkError';
        this.status = status;
    }
}

// src/utils/errorHandler.js
export class ErrorHandler {
    static manejar(error) {
        console.error('Error:', error);
        
        if (error instanceof ValidationError) {
            this.mostrarNotificacion(`Error de validacion: ${error.message}`, 'error');
        } else if (error instanceof NetworkError) {
            this.mostrarNotificacion('Error de conexion. Verifica tu internet.', 'error');
        } else if (error instanceof AppError) {
            this.mostrarNotificacion(error.message, 'error');
        } else {
            this.mostrarNotificacion('Ocurrio un error inesperado', 'error');
        }
        
        this.registrarError(error);
    }
    
    static mostrarNotificacion(mensaje, tipo) {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        notificacion.textContent = mensaje;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.classList.add('visible');
        }, 10);
        
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => notificacion.remove(), 300);
        }, 5000);
    }
    
    static registrarError(error) {
        // En produccion, enviar a servicio de logging
        const errores = JSON.parse(localStorage.getItem('errores') || '[]');
        
        errores.push({
            mensaje: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        });
        
        // Mantener solo los ultimos 50 errores
        if (errores.length > 50) {
            errores.shift();
        }
        
        localStorage.setItem('errores', JSON.stringify(errores));
    }
}

// src/components/ComponenteBase.js
export class ComponenteBase {
    constructor(selector) {
        this.elemento = document.querySelector(selector);
        
        if (!this.elemento) {
            throw new AppError(`Elemento no encontrado: ${selector}`, 'DOM_ERROR');
        }
    }
    
    renderizar(html) {
        this.elemento.innerHTML = html;
    }
    
    mostrarCargando() {
        this.elemento.classList.add('cargando');
    }
    
    ocultarCargando() {
        this.elemento.classList.remove('cargando');
    }
    
    mostrarError(mensaje) {
        this.renderizar(`
            <div class="error-container">
                <h3>Error</h3>
                <p>${mensaje}</p>
                <button class="btn-reintentar">Reintentar</button>
            </div>
        `);
        
        this.elemento.querySelector('.btn-reintentar')
            ?.addEventListener('click', () => this.reintentar());
    }
    
    reintentar() {
        // Implementar en subclases
    }
}
```

---

## Buenas practicas

1. Estructura el proyecto en modulos separados
2. Implementa un patron de estado centralizado
3. Maneja errores de forma consistente
4. Usa validacion de datos en todas las entradas
5. Implementa cache para peticiones de red
6. Usa lazy loading para mejorar el rendimiento
7. Escribe codigo reutilizable y modular
8. Documenta las funciones complejas
9. Implementa tests para la logica critica
10. Usa herramientas de linting y formateo

---

## Ejercicios

### Ejercicio 1 (5 puntos)
Extiende la Todo App para agregar categorias y etiquetas a las tareas.

### Ejercicio 2 (5 puntos)
Agrega graficos de temperatura a la Weather App usando Canvas o SVG.

### Ejercicio 3 (5 puntos)
Implementa mensajes con soporte para archivos adjuntos en la Chat App.

### Ejercicio 4 (5 puntos)
Agrega un historial de operaciones a la Calculator que se pueda navegar con las flechas del teclado.

### Ejercicio 5 (5 puntos)
Crea un sistema de temas (claro/oscuro) que se persista en localStorage.

### Ejercicio 6 (5 puntos)
Implementa un sistema de notificaciones en tiempo real usando WebSocket simulados.

---

## Soluciones

### Solucion Ejercicio 1

```javascript
// extensions/todo-app/categories.js
class TodoCategorias {
    constructor(store) {
        this.store = store;
        this.categorias = this.cargar();
        this.colores = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9'];
    }
    
    cargar() {
        return JSON.parse(localStorage.getItem('todoCategorias') || '[]');
    }
    
    guardar() {
        localStorage.setItem('todoCategorias', JSON.stringify(this.categorias));
    }
    
    agregar(nombre) {
        const categoria = {
            id: Date.now(),
            nombre,
            color: this.colores[this.categorias.length % this.colores.length]
        };
        
        this.categorias.push(categoria);
        this.guardar();
        return categoria;
    }
    
    eliminar(id) {
        this.categorias = this.categorias.filter(c => c.id !== id);
        this.guardar();
    }
    
    obtenerTodas() {
        return this.categorias;
    }
}

// Modificar TodoStore para incluir categorias
class TodoStoreConCategorias extends TodoStore {
    constructor() {
        super();
        this.categorias = new TodoCategorias(this);
    }
    
    agregar(todo) {
        return super.agregar({
            ...todo,
            categoriaId: todo.categoriaId || null,
            etiquetas: todo.etiquetas || []
        });
    }
}
```

### Solucion Ejercicio 2

```javascript
// extensions/weather-app/chart.js
class WeatherChart {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.datos = [];
        this.ancho = 600;
        this.alto = 200;
        
        this.canvas.width = this.ancho;
        this.canvas.height = this.alto;
    }
    
    dibujar(datos) {
        this.datos = datos;
        this.limpiar();
        this.dibujarEjes();
        this.dibujarLinea();
        this.dibujarPuntos();
    }
    
    limpiar() {
        this.ctx.clearRect(0, 0, this.ancho, this.alto);
    }
    
    dibujarEjes() {
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 1;
        
        // Eje X
        this.ctx.beginPath();
        this.ctx.moveTo(50, this.alto - 30);
        this.ctx.lineTo(this.ancho - 20, this.alto - 30);
        this.ctx.stroke();
        
        // Eje Y
        this.ctx.beginPath();
        this.ctx.moveTo(50, 10);
        this.ctx.lineTo(50, this.alto - 30);
        this.ctx.stroke();
        
        // Etiquetas
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        
        this.datos.forEach((dato, i) => {
            const x = 50 + (i * ((this.ancho - 70) / (this.datos.length - 1)));
            this.ctx.fillText(dato.dia, x, this.alto - 10);
        });
    }
    
    dibujarLinea() {
        if (this.datos.length < 2) return;
        
        this.ctx.strokeStyle = '#ff6b6b';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        const minTemp = Math.min(...this.datos.map(d => d.temp)) - 5;
        const maxTemp = Math.max(...this.datos.map(d => d.temp)) + 5;
        const rango = maxTemp - minTemp;
        
        this.datos.forEach((dato, i) => {
            const x = 50 + (i * ((this.ancho - 70) / (this.datos.length - 1)));
            const y = (this.alto - 30) - ((dato.temp - minTemp) / rango * (this.alto - 50));
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        
        this.ctx.stroke();
    }
    
    dibujarPuntos() {
        const minTemp = Math.min(...this.datos.map(d => d.temp)) - 5;
        const maxTemp = Math.max(...this.datos.map(d => d.temp)) + 5;
        const rango = maxTemp - minTemp;
        
        this.datos.forEach((dato, i) => {
            const x = 50 + (i * ((this.ancho - 70) / (this.datos.length - 1)));
            const y = (this.alto - 30) - ((dato.temp - minTemp) / rango * (this.alto - 50));
            
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.fillStyle = '#333';
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`${dato.temp}°`, x, y - 10);
        });
    }
}
```

### Solucion Ejercicio 3

```javascript
// extensions/chat-app/attachments.js
class ChatAttachments {
    constructor(chatApp) {
        this.chatApp = chatApp;
        this.tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        this.tamanoMaximo = 5 * 1024 * 1024; // 5MB
        
        this.configurarUI();
    }
    
    configurarUI() {
        const inputContainer = document.querySelector('.message-input-container');
        
        const btnAdjuntar = document.createElement('button');
        btnAdjuntar.className = 'btn-attach';
        btnAdjuntar.title = 'Adjuntar archivo';
        btnAdjuntar.textContent = '📎';
        
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.className = 'file-input';
        fileInput.style.display = 'none';
        fileInput.accept = this.tiposPermitidos.join(',');
        
        inputContainer.insertBefore(btnAdjuntar, inputContainer.firstChild);
        inputContainer.appendChild(fileInput);
        
        btnAdjuntar.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', (e) => {
            const archivo = e.target.files[0];
            if (archivo) {
                this.manejarArchivo(archivo);
            }
            fileInput.value = '';
        });
        
        // Drag and drop
        const messagesContainer = document.querySelector('.messages-container');
        
        messagesContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            messagesContainer.classList.add('drag-over');
        });
        
        messagesContainer.addEventListener('dragleave', () => {
            messagesContainer.classList.remove('drag-over');
        });
        
        messagesContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            messagesContainer.classList.remove('drag-over');
            
            const archivo = e.dataTransfer.files[0];
            if (archivo) {
                this.manejarArchivo(archivo);
            }
        });
    }
    
    manejarArchivo(archivo) {
        if (!this.tiposPermitidos.includes(archivo.type)) {
            alert('Tipo de archivo no permitido');
            return;
        }
        
        if (archivo.size > this.tamanoMaximo) {
            alert('El archivo es demasiado grande (maximo 5MB)');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const adjunto = {
                nombre: archivo.name,
                tipo: archivo.type,
                tamano: archivo.size,
                url: e.target.result
            };
            
            this.enviarConAdjunto(adjunto);
        };
        
        reader.readAsDataURL(archivo);
    }
    
    enviarConAdjunto(adjunto) {
        const mensaje = {
            id: Date.now(),
            emisor: this.chatApp.usuarioActual.id,
            receptor: this.chatApp.chatActivo.id,
            texto: '',
            adjunto,
            timestamp: new Date(),
            leido: false
        };
        
        this.chatApp.mensajes.push(mensaje);
        this.chatApp.mostrarMensajeConAdjunto(mensaje);
        this.chatApp.guardarMensajes();
    }
    
    formatearTamano(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
}

// Extension para mostrar mensajes con adjuntos
class ChatAppConAdjuntos extends ChatApp {
    constructor() {
        super();
        this.attachments = new ChatAttachments(this);
    }
    
    mostrarMensajeConAdjunto(mensaje) {
        const messagesList = document.querySelector('.messages-list');
        const esEnviado = mensaje.emisor === this.usuarioActual.id;
        
        const div = document.createElement('div');
        div.className = `message ${esEnviado ? 'enviado' : 'recibido'}`;
        
        let htmlAdjunto = '';
        
        if (mensaje.adjunto) {
            if (mensaje.adjunto.tipo.startsWith('image/')) {
                htmlAdjunto = `
                    <div class="message-attachment">
                        <img src="${mensaje.adjunto.url}" alt="${mensaje.adjunto.nombre}" class="attachment-image">
                        <span class="attachment-name">${mensaje.adjunto.nombre}</span>
                    </div>
                `;
            } else {
                htmlAdjunto = `
                    <div class="message-attachment">
                        <a href="${mensaje.adjunto.url}" target="_blank" class="attachment-file">
                            📄 ${mensaje.adjunto.nombre}
                        </a>
                    </div>
                `;
            }
        }
        
        div.innerHTML = `
            <div class="message-content">
                ${htmlAdjunto}
                ${mensaje.texto ? `<p class="message-text">${mensaje.texto}</p>` : ''}
                <span class="message-time">${mensaje.timestamp.toLocaleTimeString()}</span>
            </div>
        `;
        
        messagesList.appendChild(div);
        this.scrollToBottom();
    }
}
```

### Solucion Ejercicio 4

```javascript
// extensions/calculator/history.js
class CalculatorHistorial extends Calculator {
    constructor() {
        super();
        this.indiceHistorial = -1;
        this.configurarNavegacionHistorial();
    }
    
    configurarNavegacionHistorial() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navegarHistorial('arriba');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navegarHistorial('abajo');
            }
        });
    }
    
    navegarHistorial(direccion) {
        if (this.estado.historial.length === 0) return;
        
        if (direccion === 'arriba') {
            if (this.indiceHistorial < this.estado.historial.length - 1) {
                this.indiceHistorial++;
            }
        } else {
            if (this.indiceHistorial > -1) {
                this.indiceHistorial--;
            }
        }
        
        if (this.indiceHistorial === -1) {
            this.estado.valorActual = '0';
        } else {
            const item = this.estado.historial[this.indiceHistorial];
            this.estado.valorActual = String(item.resultado);
        }
        
        this.actualizarDisplay();
    }
    
    calcular() {
        super.calcular();
        this.indiceHistorial = -1;
    }
}
```

### Solucion Ejercicio 5

```javascript
// utils/theme-manager.js
class ThemeManager {
    constructor() {
        this.temaActual = this.cargar();
        this.observers = [];
        this.aplicar();
    }
    
    cargar() {
        return localStorage.getItem('tema') || 'claro';
    }
    
    guardar() {
        localStorage.setItem('tema', this.temaActual);
    }
    
    cambiar(tema) {
        this.temaActual = tema;
        this.guardar();
        this.aplicar();
        this.notificar();
    }
    
    alternar() {
        this.cambiar(this.temaActual === 'claro' ? 'oscuro' : 'claro');
    }
    
    aplicar() {
        document.documentElement.setAttribute('data-tema', this.temaActual);
        
        // Cambiar meta theme-color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.content = this.temaActual === 'oscuro' ? '#1a1a1a' : '#ffffff';
        }
    }
    
    observer(callback) {
        this.observers.push(callback);
        return () => {
            this.observers = this.observers.filter(obs => obs !== callback);
        };
    }
    
    notificar() {
        this.observers.forEach(callback => callback(this.temaActual));
    }
    
    obtenerContraste(color) {
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        
        const luminosidad = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        return luminosidad > 0.5 ? '#000000' : '#ffffff';
    }
}

// CSS para temas
/*
[data-tema="claro"] {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #333333;
    --text-secondary: #666666;
    --border-color: #e0e0e0;
}

[data-tema="oscuro"] {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-color: #404040;
}

body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s, color 0.3s;
}
*/

// Componente toggle
class ThemeToggle {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.crear();
        
        this.themeManager.observer(() => this.actualizar());
    }
    
    crear() {
        this.elemento = document.createElement('button');
        this.elemento.className = 'theme-toggle';
        this.actualizar();
        
        this.elemento.addEventListener('click', () => {
            this.themeManager.alternar();
        });
    }
    
    actualizar() {
        const tema = this.themeManager.temaActual;
        this.elemento.textContent = tema === 'claro' ? '🌙' : '☀️';
        this.elemento.title = `Tema actual: ${tema}`;
    }
    
    render() {
        return this.elemento;
    }
}
```

### Solucion Ejercicio 6

```javascript
// utils/websocket-simulated.js
class WebSocketSimulado {
    constructor(url) {
        this.url = url;
        this.conectado = false;
        this.listeners = {};
        this.colaMensajes = [];
        
        this.simularConexion();
    }
    
    simularConexion() {
        setTimeout(() => {
            this.conectado = true;
            this.emit('connect');
            this.procesarCola();
        }, 1000);
    }
    
    on(evento, callback) {
        if (!this.listeners[evento]) {
            this.listeners[evento] = [];
        }
        this.listeners[evento].push(callback);
        
        return () => {
            this.listeners[evento] = this.listeners[evento].filter(cb => cb !== callback);
        };
    }
    
    emit(evento, datos) {
        if (this.listeners[evento]) {
            this.listeners[evento].forEach(callback => callback(datos));
        }
    }
    
    enviar(tipo, datos) {
        if (this.conectado) {
            this.emit('message', { tipo, datos, timestamp: Date.now() });
        } else {
            this.colaMensajes.push({ tipo, datos });
        }
    }
    
    procesarCola() {
        while (this.colaMensajes.length > 0) {
            const mensaje = this.colaMensajes.shift();
            this.enviar(mensaje.tipo, mensaje.datos);
        }
    }
    
    desconectar() {
        this.conectado = false;
        this.emit('disconnect');
    }
}

// Sistema de notificaciones en tiempo real
class NotificationSystem {
    constructor() {
        this.ws = new WebSocketSimulado('wss://simulado.com');
        this.colas = new Map();
        
        this.configurarListeners();
    }
    
    configurarListeners() {
        this.ws.on('connect', () => {
            console.log('Conectado al servidor de notificaciones');
        });
        
        this.ws.on('message', (mensaje) => {
            this.procesarMensaje(mensaje);
        });
        
        this.ws.on('disconnect', () => {
            console.log('Desconectado del servidor');
        });
    }
    
    suscribirse(canal, callback) {
        if (!this.colas.has(canal)) {
            this.colas.set(canal, []);
        }
        this.colas.get(canal).push(callback);
        
        this.ws.enviar('subscribe', { canal });
        
        return () => {
            const callbacks = this.colas.get(canal);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        };
    }
    
    procesarMensaje(mensaje) {
        const { tipo, datos } = mensaje;
        
        if (tipo === 'notification') {
            const { canal } = datos;
            const callbacks = this.colas.get(canal) || [];
            
            callbacks.forEach(callback => callback(datos));
        }
    }
    
    enviarNotificacion(canal, titulo, cuerpo) {
        this.ws.enviar('notification', {
            canal,
            titulo,
            cuerpo,
            timestamp: Date.now()
        });
    }
}

// Uso
const notificaciones = new NotificationSystem();

// Suscribirse a un canal
const unsubscribe = notificaciones.suscribirse('chat', (datos) => {
    console.log('Nueva notificacion:', datos);
});

// Enviar notificacion
notificaciones.enviar('chat', 'Nuevo mensaje', 'Hola, como estas?');

// Cuando ya no se necesite
// unsubscribe();
```
