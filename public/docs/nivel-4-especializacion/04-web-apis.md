# Leccion 4: Web APIs

## Objetivos de aprendizaje

- [ ] Dominar Fetch API para peticiones HTTP (GET, POST, PUT, DELETE)
- [ ] Manejar localStorage y sessionStorage
- [ ] Entender y usar Cookies
- [ ] Implementar Geolocation API
- [ ] Usar Notification API
- [ ] Aplicar Intersection Observer para lazy loading
- [ ] Usar MutationObserver para detectar cambios en el DOM
- [ ] Comprender Performance API para metricas
- [ ] Implementar patrones offline-first

---

## 1. Fetch API

### Ejemplo 1: Peticion GET basica

```javascript
// Fetch basico
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la peticion');
        }
        return response.json();
    })
    .then(datos => {
        console.log(datos);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Fetch con async/await
async function obtenerUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const usuarios = await response.json();
        console.log(usuarios);
        return usuarios;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

obtenerUsuarios();
```

### Ejemplo 2: Peticion POST

```javascript
async function crearPost(datos) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token123'
            },
            body: JSON.stringify({
                title: datos.titulo,
                body: datos.contenido,
                userId: datos.usuarioId
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const nuevoPost = await response.json();
        console.log('Post creado:', nuevoPost);
        return nuevoPost;
    } catch (error) {
        console.error('Error al crear post:', error);
        throw error;
    }
}

// Uso
crearPost({
    titulo: 'Mi titulo',
    contenido: 'Mi contenido',
    usuarioId: 1
});
```

### Ejemplo 3: Peticion PUT y DELETE

```javascript
// PUT - Actualizar recurso
async function actualizarPost(id, datos) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: datos.titulo,
                body: datos.contenido,
                userId: datos.usuarioId
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const postActualizado = await response.json();
        console.log('Post actualizado:', postActualizado);
        return postActualizado;
    } catch (error) {
        console.error('Error al actualizar post:', error);
        throw error;
    }
}

// DELETE - Eliminar recurso
async function eliminarPost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('Post eliminado correctamente');
        return true;
    } catch (error) {
        console.error('Error al eliminar post:', error);
        throw error;
    }
}

// PATCH - Actualizacion parcial
async function patchPost(id, datos) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const postActualizado = await response.json();
        console.log('Post actualizado:', postActualizado);
        return postActualizado;
    } catch (error) {
        console.error('Error al actualizar post:', error);
        throw error;
    }
}
```

### Ejemplo 4: Manejo de errores y headers

```javascript
// Clase API con manejo completo
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }
    
    setAuthToken(token) {
        this.headers['Authorization'] = `Bearer ${token}`;
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const config = {
            headers: { ...this.headers, ...options.headers },
            ...options
        };
        
        try {
            const response = await fetch(url, config);
            
            // Manejar diferentes estados HTTP
            if (response.status === 401) {
                throw new Error('No autorizado - Token invalido');
            }
            
            if (response.status === 403) {
                throw new Error('Prohibido - Sin permisos');
            }
            
            if (response.status === 404) {
                throw new Error('Recurso no encontrado');
            }
            
            if (response.status === 500) {
                throw new Error('Error interno del servidor');
            }
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            // Verificar si la respuesta tiene contenido
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Peticion cancelada');
            } else if (error.name === 'TypeError') {
                console.error('Error de red - Sin conexion');
            } else {
                console.error('Error en la peticion:', error.message);
            }
            throw error;
        }
    }
    
    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
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
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Uso
const api = new ApiClient('https://jsonplaceholder.typicode.com');
api.setAuthToken('mi-token-secreto');

async function usarApi() {
    try {
        const usuarios = await api.get('/users');
        console.log(usuarios);
        
        const nuevoPost = await api.post('/posts', {
            title: 'Nuevo post',
            body: 'Contenido',
            userId: 1
        });
        console.log(nuevoPost);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
```

### Ejemplo 5: AbortController y timeout

```javascript
// Cancelar peticion con AbortController
async function fetchConTimeout(url, tiempoLimite = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), tiempoLimite);
    
    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            console.log('Peticion cancelada por timeout');
        }
        
        throw error;
    }
}

// Uso con retry
async function fetchConRetry(url, opciones = {}, maxReintentos = 3) {
    let ultimoError;
    
    for (let intento = 1; intento <= maxReintentos; intento++) {
        try {
            const response = await fetch(url, opciones);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            ultimoError = error;
            console.log(`Intento ${intento} fallido. Reintentando...`);
            
            if (intento < maxReintentos) {
                await new Promise(resolve => setTimeout(resolve, 1000 * intento));
            }
        }
    }
    
    throw new Error(`Maximo numero de reintentos alcanzado: ${ultimoError.message}`);
}
```

---

## 2. localStorage

### Ejemplo 6: Operaciones basicas

```javascript
// Guardar datos
localStorage.setItem('nombre', 'Juan');
localStorage.setItem('edad', '25');
localStorage.setItem('activo', 'true');

// Guardar objetos (convertir a JSON)
const usuario = {
    nombre: 'Juan',
    edad: 25,
    email: 'juan@email.com',
    preferencias: {
        tema: 'oscuro',
        idioma: 'es'
    }
};

localStorage.setItem('usuario', JSON.stringify(usuario));

// Obtener datos
const nombre = localStorage.getItem('nombre'); // 'Juan'
const edad = localStorage.getItem('edad'); // '25' (string)

// Obtener y parsear objetos
const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
console.log(usuarioGuardado.preferencias.tema); // 'oscuro'

// Verificar si existe una clave
if (localStorage.getItem('nombre')) {
    console.log('El nombre esta guardado');
}

// Eliminar un item
localStorage.removeItem('edad');

// Limpiar todo
localStorage.clear();

// Obtener todas las claves
const claves = Object.keys(localStorage);
console.log(claves);

// Obtener numero de items
const numItems = localStorage.length;
console.log(numItems);
```

### Ejemplo 7: Patron de manejo de errores

```javascript
// Funciones seguras para localStorage
function guardarEnLocalStorage(clave, valor) {
    try {
        const valorSerializado = JSON.stringify(valor);
        localStorage.setItem(clave, valorSerializado);
        return true;
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        
        // Manejar error de cuota llena
        if (error.name === 'QuotaExceededError') {
            console.error('localStorage esta lleno');
            limpiarLocalStorage();
        }
        
        return false;
    }
}

function obtenerDeLocalStorage(clave, valorPorDefecto = null) {
    try {
        const valor = localStorage.getItem(clave);
        
        if (valor === null) {
            return valorPorDefecto;
        }
        
        return JSON.parse(valor);
    } catch (error) {
        console.error('Error al leer de localStorage:', error);
        return valorPorDefecto;
    }
}

function eliminarDeLocalStorage(clave) {
    try {
        localStorage.removeItem(clave);
        return true;
    } catch (error) {
        console.error('Error al eliminar de localStorage:', error);
        return false;
    }
}

function limpiarLocalStorage() {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Error al limpiar localStorage:', error);
        return false;
    }
}

// Uso
guardarEnLocalStorage('configuracion', {
    tema: 'oscuro',
    notificaciones: true,
    idioma: 'es'
});

const config = obtenerDeLocalStorage('configuracion', {});
console.log(config.tema); // 'oscuro'
```

### Ejemplo 8: localStorage con expiracion

```javascript
function guardarConExpiracion(clave, valor, minutosExpiracion) {
    const item = {
        valor: valor,
        expiracion: Date.now() + (minutosExpiracion * 60 * 1000)
    };
    
    localStorage.setItem(clave, JSON.stringify(item));
}

function obtenerConExpiracion(clave) {
    try {
        const itemString = localStorage.getItem(clave);
        
        if (!itemString) {
            return null;
        }
        
        const item = JSON.parse(itemString);
        
        if (Date.now() > item.expiracion) {
            localStorage.removeItem(clave);
            return null;
        }
        
        return item.valor;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Uso
guardarConExpiracion('token', 'abc123', 60); // Expira en 60 minutos
guardarEnLocalStorage('sesion', { usuario: 'Juan' }); // Sin expiracion

const token = obtenerConExpiracion('token'); // null si expiro
const sesion = obtenerDeLocalStorage('sesion'); // Siempre disponible
```

---

## 3. sessionStorage

### Ejemplo 9: sessionStorage

```javascript
// sessionStorage funciona igual que localStorage pero:
// - Los datos se borran al cerrar la pestana/ventana
// - No se comparte entre pestanas

sessionStorage.setItem('contadorSesion', '0');
sessionStorage.setItem('usuarioActual', JSON.stringify({ nombre: 'Juan' }));

function incrementarContador() {
    const actual = parseInt(sessionStorage.getItem('contadorSesion') || '0');
    sessionStorage.setItem('contadorSesion', (actual + 1).toString());
    return actual + 1;
}

// Ejemplo: Estado de formulario
function guardarEstadoFormulario(datos) {
    sessionStorage.setItem('formularioPendiente', JSON.stringify(datos));
}

function recuperarEstadoFormulario() {
    return obtenerDeLocalStorage('formularioPendiente', {});
}

function limpiarEstadoFormulario() {
    sessionStorage.removeItem('formularioPendiente');
}

// Uso
guardarEstadoFormulario({
    paso: 2,
    datos: { nombre: 'Juan', email: 'juan@email.com' }
});

const estado = recuperarEstadoFormulario();
console.log(estado.paso); // 2
```

---

## 4. Cookies

### Ejemplo 10: Manipulacion de cookies

```javascript
// Funciones para cookies
function establecerCookie(nombre, valor, diasExpiracion) {
    let cookieString = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}`;
    
    if (diasExpiracion) {
        const fecha = new Date();
        fecha.setTime(fecha.getTime() + (diasExpiracion * 24 * 60 * 60 * 1000));
        cookieString += `; expires=${fecha.toUTCString()}`;
    }
    
    cookieString += '; path=/';
    cookieString += '; SameSite=Lax';
    
    document.cookie = cookieString;
}

function obtenerCookie(nombre) {
    const nombreCodificado = encodeURIComponent(nombre);
    const cookies = document.cookie.split(';');
    
    for (const cookie of cookies) {
        const [nombreCookie, valor] = cookie.trim().split('=');
        
        if (decodeURIComponent(nombreCookie) === nombreCodificado) {
            return decodeURIComponent(valor);
        }
    }
    
    return null;
}

function eliminarCookie(nombre) {
    establecerCookie(nombre, '', -1);
}

// Uso
establecerCookie('preferencia', 'oscuro', 30); // Expira en 30 dias
establecerCookie('sesionId', 'abc123', 1); // Expira en 1 dia

const preferencia = obtenerCookie('preferencia');
console.log(preferencia); // 'oscuro'

eliminarCookie('preferencia');
```

### Ejemplo 11: Cookies con opciones

```javascript
function establecerCookieSegura(nombre, valor, opciones = {}) {
    let cookieString = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}`;
    
    if (opciones.diasExpiracion) {
        const fecha = new Date();
        fecha.setTime(fecha.getTime() + (opciones.diasExpiracion * 24 * 60 * 60 * 1000));
        cookieString += `; expires=${fecha.toUTCString()}`;
    }
    
    cookieString += `; path=${opciones.path || '/'}`;
    
    if (opciones.dominio) {
        cookieString += `; domain=${opciones.dominio}`;
    }
    
    if (opciones.segura) {
        cookieString += '; Secure';
    }
    
    if (opciones.httpOnly) {
        cookieString += '; HttpOnly';
    }
    
    cookieString += '; SameSite=Strict';
    
    document.cookie = cookieString;
}

// Uso con opciones
establecerCookieSegura('token', 'abc123', {
    diasExpiracion: 7,
    path: '/',
    segura: true,
    httpOnly: false // No accesible desde JavaScript si es true
});

// Parser de cookies
function parsearCookies() {
    const cookies = {};
    
    document.cookie.split(';').forEach(cookie => {
        const [nombre, valor] = cookie.trim().split('=');
        cookies[decodeURIComponent(nombre)] = decodeURIComponent(valor);
    });
    
    return cookies;
}

const todasLasCookies = parsearCookies();
console.log(todasLasCookies);
```

---

## 5. Geolocation API

### Ejemplo 12: Obtener ubicacion

```javascript
function obtenerUbicacion() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation no soportado'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitud: position.coords.latitude,
                    longitud: position.coords.longitude,
                    precision: position.coords.accuracy,
                    altitud: position.coords.altitude,
                    precisionAltitud: position.coords.altitudeAccuracy,
                    rumbo: position.coords.heading,
                    velocidad: position.coords.speed,
                    marcaTiempo: position.timestamp
                });
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error('Permiso de ubicacion denegado'));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error('Ubicacion no disponible'));
                        break;
                    case error.TIMEOUT:
                        reject(new Error('Tiempo de espera agotado'));
                        break;
                    default:
                        reject(new Error('Error desconocido'));
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    });
}

// Uso
async function mostrarUbicacion() {
    try {
        const ubicacion = await obtenerUbicacion();
        console.log(`Latitud: ${ubicacion.latitud}`);
        console.log(`Longitud: ${ubicacion.longitud}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Seguimiento de ubicacion
function iniciarSeguimiento(callback) {
    if (!navigator.geolocation) {
        console.error('Geolocation no soportado');
        return null;
    }
    
    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            callback(null, {
                latitud: position.coords.latitude,
                longitud: position.coords.longitude
            });
        },
        (error) => {
            callback(error, null);
        },
        { enableHighAccuracy: true }
    );
    
    return watchId;
}

function detenerSeguimiento(watchId) {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
    }
}
```

---

## 6. Notification API

### Ejemplo 13: Solicitar permiso y enviar notificaciones

```javascript
async function solicitarPermiso() {
    if (!('Notification' in window)) {
        console.log('Este navegador no soporta notificaciones');
        return false;
    }
    
    if (Notification.permission === 'granted') {
        return true;
    }
    
    if (Notification.permission !== 'denied') {
        const permiso = await Notification.requestPermission();
        return permiso === 'granted';
    }
    
    return false;
}

function enviarNotificacion(titulo, opciones = {}) {
    if (Notification.permission === 'granted') {
        const notificacion = new Notification(titulo, {
            body: opciones.cuerpo || '',
            icon: opciones.icono || '',
            badge: opciones.badge || '',
            tag: opciones.tag || '',
            data: opciones.datos || {},
            silent: opciones.silenciosa || false,
            requireInteraction: opciones.interaccionRequerida || false
        });
        
        notificacion.onclick = () => {
            console.log('Notificacion clickeada');
            window.focus();
            notificacion.close();
        };
        
        notificacion.onshow = () => {
            console.log('Notificacion mostrada');
        };
        
        notificacion.onerror = (error) => {
            console.error('Error en notificacion:', error);
        };
        
        return notificacion;
    }
    
    return null;
}

// Uso
async function sistemaNotificaciones() {
    const permiso = await solicitarPermiso();
    
    if (permiso) {
        enviarNotificacion('Bienvenido', {
            cuerpo: 'Las notificaciones estan activadas',
            tag: 'bienvenida'
        });
    }
}

// Notificacion programada
function notificacionProgramada(titulo, opciones, milisegundos) {
    setTimeout(() => {
        enviarNotificacion(titulo, opciones);
    }, milisegundos);
}
```

---

## 7. Intersection Observer

### Ejemplo 14: Lazy loading de imagenes

```javascript
function implementarLazyLoading() {
    const imagenes = document.querySelectorAll('img[data-src]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    imagenes.forEach(img => observer.observe(img));
}

// HTML correspondiente:
// <img data-src="imagen-grande.jpg" src="placeholder.jpg" alt="Lazy loaded">
```

### Ejemplo 15: Infinite scroll

```javascript
class InfiniteScroll {
    constructor(container, loadMore) {
        this.container = container;
        this.loadMore = loadMore;
        this.loading = false;
        this.page = 1;
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.loading) {
                    this.cargarMas();
                }
            });
        }, {
            rootMargin: '200px'
        });
        
        this.sentinel = document.createElement('div');
        this.sentinel.className = 'scroll-sentinel';
        this.container.appendChild(this.sentinel);
        
        this.observer.observe(this.sentinel);
    }
    
    async cargarMas() {
        this.loading = true;
        
        try {
            await this.loadMore(this.page);
            this.page++;
        } catch (error) {
            console.error('Error cargando mas contenido:', error);
        } finally {
            this.loading = false;
        }
    }
    
    destruir() {
        this.observer.disconnect();
        this.sentinel.remove();
    }
}

// Uso
const contenedor = document.getElementById('lista');
const infiniteScroll = new InfiniteScroll(contenedor, async (page) => {
    const response = await fetch(`/api/items?page=${page}`);
    const items = await response.json();
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item.nombre;
        contenedor.insertBefore(div, contenedor.lastChild);
    });
});
```

### Ejemplo 16: Animaciones al hacer scroll

```javascript
function animacionesScroll() {
    const elementos = document.querySelectorAll('.animar-al-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Opcional: dejar de observar despues de animar
                // observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elementos.forEach(el => observer.observe(el));
}

// CSS necesario:
// .animar-al-scroll {
//     opacity: 0;
//     transform: translateY(30px);
//     transition: opacity 0.6s ease, transform 0.6s ease;
// }
// .animar-al-scroll.visible {
//     opacity: 1;
//     transform: translateY(0);
// }
```

---

## 8. MutationObserver

### Ejemplo 17: Detectar cambios en el DOM

```javascript
function observarCambiosDOM(elemento, callback) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            callback({
                tipo: mutation.type,
                objetivo: mutation.target,
                nodosAgregados: mutation.addedNodes,
                nodosEliminados: mutation.removedNodes,
                atributoModificado: mutation.attributeName,
                anteriorValor: mutation.oldValue
            });
        });
    });
    
    observer.observe(elemento, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });
    
    return observer;
}

// Uso
const contenedor = document.getElementById('lista');

const observer = observarCambiosDOM(contenedor, (cambio) => {
    console.log('Tipo de cambio:', cambio.tipo);
    console.log('Nodos agregados:', cambio.nodosAgregados.length);
    console.log('Nodos eliminados:', cambio.nodosEliminados.length);
});

// Para detener la observacion
// observer.disconnect();
```

### Ejemplo 18: Detectar cambios en formularios

```javascript
function observarCambiosFormulario(formulario, onCambio) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && 
                mutation.attributeName === 'class') {
                const clases = mutation.target.className;
                onCambio({
                    tipo: 'clases-modificadas',
                    elemento: mutation.target,
                    nuevasClases: clases
                });
            }
        });
    });
    
    observer.observe(formulario, {
        attributes: true,
        attributeFilter: ['class', 'disabled', 'required'],
        subtree: true
    });
    
    return observer;
}

// Observar cambios en el contenido de inputs
function observarInputs(formulario, onCambio) {
    const inputs = formulario.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            onCambio({
                campo: e.target.name,
                valor: e.target.value,
                valido: e.target.validity.valid
            });
        });
    });
}
```

---

## 9. Performance API

### Ejemplo 19: Metricas de rendimiento

```javascript
function obtenerMetricasRendimiento() {
    const perfData = performance.getEntriesByType('navigation')[0];
    
    return {
        // Tiempos de carga
        tiempoNavegacion: perfData.navigationStart,
        tiempoCargaDNS: perfData.domainLookupEnd - perfData.domainLookupStart,
        tiempoConexion: perfData.connectEnd - perfData.connectStart,
        tiempoRespuesta: perfData.responseStart - perfData.requestStart,
        tiempoDescarga: perfData.responseEnd - perfData.responseStart,
        tiempoDOM: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        tiempoCargaCompleta: perfData.loadEventEnd - perfData.navigationStart,
        
        // Metricas de contenido
        tamanoDocumento: perfData.transferSize,
        tiposRecursos: performance.getEntriesByType('resource').length,
        
        // Metricas de memoria (si esta disponible)
        memoria: performance.memory ? {
            usadaJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        } : null
    };
}

// Medir tiempo de ejecucion de funciones
function medirRendimiento(nombre, funcion) {
    const inicio = performance.now();
    const resultado = funcion();
    const fin = performance.now();
    
    console.log(`${nombre}: ${(fin - inicio).toFixed(3)}ms`);
    
    return {
        resultado,
        tiempo: fin - inicio
    };
}

// Uso
const metricas = obtenerMetricasRendimiento();
console.log('Metricas:', metricas);

// Medir funcion
const resultado = medirRendimiento('Ordenamiento', () => {
    const arr = Array.from({ length: 10000 }, () => Math.random());
    return arr.sort((a, b) => a - b);
});
```

### Ejemplo 20: User Timing API

```javascript
function medirProcesoCompleto() {
    performance.mark('inicio-proceso');
    
    // Simular trabajo
    const datos = [];
    for (let i = 0; i < 1000000; i++) {
        datos.push(i * 2);
    }
    
    performance.mark('fin-trabajo');
    
    // Procesar datos
    const procesados = datos.map(x => x / 2);
    
    performance.mark('fin-procesamiento');
    
    // Medir tiempos
    performance.measure('trabajo-total', 'inicio-proceso', 'fin-procesamiento');
    performance.measure('generacion-datos', 'inicio-proceso', 'fin-trabajo');
    performance.measure('procesamiento', 'fin-trabajo', 'fin-procesamiento');
    
    // Obtener medidas
    const medidas = performance.getEntriesByType('measure');
    
    medidas.forEach(medida => {
        console.log(`${medida.name}: ${medida.duration.toFixed(3)}ms`);
    });
    
    // Limpiar marcas y medidas
    performance.clearMarks();
    performance.clearMeasures();
    
    return medidas;
}

// Uso
const tiempos = medirProcesoCompleto();
console.log('Tiempos:', tiempos);
```

---

## 10. Patrones Offline-First

### Ejemplo 21: Cache con Service Worker

```javascript
// service-worker.js
const CACHE_NAME = 'mi-app-v1';
const urlsACachear = [
    '/',
    '/styles/main.css',
    '/scripts/app.js',
    '/offline.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsACachear))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        return caches.match('/offline.html');
                    });
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});
```

### Ejemplo 22: Cola de peticiones offline

```javascript
class OfflineQueue {
    constructor() {
        this.cola = [];
        this.dbName = 'offlineQueue';
        this.abrirDB();
    }
    
    async abrirDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('peticiones')) {
                    db.createObjectStore('peticiones', { 
                        keyPath: 'id', 
                        autoIncrement: true 
                    });
                }
            };
        });
    }
    
    async agregar(peticion) {
        await this.abrirDB();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['peticiones'], 'readwrite');
            const store = transaction.objectStore('peticiones');
            
            const request = store.add({
                url: peticion.url,
                method: peticion.method,
                headers: peticion.headers,
                body: peticion.body,
                timestamp: Date.now()
            });
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async procesar() {
        if (!navigator.onLine) {
            console.log('Sin conexion, procesando mas tarde');
            return;
        }
        
        await this.abrirDB();
        
        const peticiones = await this.obtenerTodas();
        
        for (const peticion of peticiones) {
            try {
                await fetch(peticion.url, {
                    method: peticion.method,
                    headers: peticion.headers,
                    body: peticion.body
                });
                
                await this.eliminar(peticion.id);
                console.log('Peticion procesada:', peticion.url);
            } catch (error) {
                console.error('Error procesando peticion:', error);
            }
        }
    }
    
    async obtenerTodas() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['peticiones'], 'readonly');
            const store = transaction.objectStore('peticiones');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async eliminar(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['peticiones'], 'readwrite');
            const store = transaction.objectStore('peticiones');
            const request = store.delete(id);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

// Uso
const cola = new OfflineQueue();

// Cuando el usuario hace algo offline
async function guardarDato(datos) {
    if (navigator.onLine) {
        try {
            const response = await fetch('/api/datos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            return await response.json();
        } catch (error) {
            await cola.agregar({
                url: '/api/datos',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
        }
    } else {
        await cola.agregar({
            url: '/api/datos',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
    }
}

// Procesar cola cuando hay conexion
window.addEventListener('online', () => {
    cola.procesar();
});
```

---

## Buenas practicas

1. Siempre maneja errores en peticiones fetch
2. Usa AbortController para cancelar peticiones largas
3. Valida y serializa datos antes de guardar en localStorage
4. Usa try-catch para operaciones con localStorage
5. Implementa expiracion para datos temporales
6. Solicita permiso antes de enviar notificaciones
7. Usa Intersection Observer para lazy loading en vez de scroll events
8. Implementa patrones offline-first para aplicaciones moviles
9. Usa Performance API para monitorear metricas criticas
10. Limpia observers cuando ya no sean necesarios

---

## Ejercicios

### Ejercicio 1 (5 puntos)
Crea una funcion fetchWithCache que guarde las respuestas en localStorage y las reutilice si estan frescas (menos de 5 minutos).

### Ejercicio 2 (5 puntos)
Implementa un sistema de notificaciones que muestre un popup personalizado en lugar de las notificaciones nativas del navegador.

### Ejercicio 3 (5 puntos)
Crea un componente de infinite scroll que cargue datos de una API cuando el usuario llegue al final de la pagina.

### Ejercicio 4 (5 puntos)
Implementa un sistema de und/redo usando localStorage para persistir el historial de acciones.

### Ejercicio 5 (5 puntos)
Crea una funcion que detecte cuando el usuario cambia de pestana y guarde el estado actual.

### Ejercicio 6 (5 puntos)
Implementa un sistema de cache con estrategias differentes (cache-first, network-first, stale-while-revalidate).

---

## Soluciones

### Solucion Ejercicio 1

```javascript
class FetchConCache {
    constructor(tiempoCache = 300000) {
        this.tiempoCache = tiempoCache;
    }
    
    async fetch(url, opciones = {}) {
        const claveCache = `cache_${url}`;
        
        // Verificar cache
        const cacheGuardado = this.obtenerCache(claveCache);
        if (cacheGuardado) {
            console.log('Usando cache para:', url);
            return cacheGuardado.datos;
        }
        
        // Hacer peticion
        console.log('Haciendo peticion a:', url);
        const response = await fetch(url, opciones);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const datos = await response.json();
        
        // Guardar en cache
        this.guardarCache(claveCache, datos);
        
        return datos;
    }
    
    obtenerCache(clave) {
        try {
            const datos = localStorage.getItem(clave);
            if (!datos) return null;
            
            const parsed = JSON.parse(datos);
            
            if (Date.now() - parsed.timestamp > this.tiempoCache) {
                localStorage.removeItem(clave);
                return null;
            }
            
            return parsed;
        } catch {
            return null;
        }
    }
    
    guardarCache(clave, datos) {
        try {
            localStorage.setItem(clave, JSON.stringify({
                datos,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error('Error guardando cache:', error);
        }
    }
    
    limpiarCache() {
        Object.keys(localStorage)
            .filter(key => key.startsWith('cache_'))
            .forEach(key => localStorage.removeItem(key));
    }
}

// Uso
const api = new FetchConCache(300000); // 5 minutos

async function obtenerUsuarios() {
    return await api.fetch('https://jsonplaceholder.typicode.com/users');
}
```

### Solucion Ejercicio 2

```javascript
class PopupNotificaciones {
    constructor() {
        this.crearEstilos();
        this.crearContainer();
    }
    
    crearEstilos() {
        const estilos = document.createElement('style');
        estilos.textContent = `
            .popup-notificacion {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                padding: 16px 24px;
                z-index: 10000;
                transform: translateX(120%);
                transition: transform 0.3s ease;
                max-width: 350px;
            }
            .popup-notificacion.visible {
                transform: translateX(0);
            }
            .popup-notificacion.titulo {
                font-weight: bold;
                margin-bottom: 8px;
            }
            .popup-notificacion.cuerpo {
                color: #666;
                font-size: 14px;
            }
            .popup-notificacion.cerrar {
                position: absolute;
                top: 8px;
                right: 8px;
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(estilos);
    }
    
    crearContainer() {
        this.container = document.createElement('div');
        this.container.className = 'notificaciones-container';
        document.body.appendChild(this.container);
    }
    
    mostrar(titulo, cuerpo, duracion = 5000) {
        const popup = document.createElement('div');
        popup.className = 'popup-notificacion';
        popup.innerHTML = `
            <button class="cerrar">&times;</button>
            <div class="titulo">${titulo}</div>
            <div class="cuerpo">${cuerpo}</div>
        `;
        
        this.container.appendChild(popup);
        
        // Animacion de entrada
        requestAnimationFrame(() => {
            popup.classList.add('visible');
        });
        
        // Boton cerrar
        popup.querySelector('.cerrar').addEventListener('click', () => {
            this.cerrar(popup);
        });
        
        // Cierre automatico
        if (duracion > 0) {
            setTimeout(() => this.cerrar(popup), duracion);
        }
        
        return popup;
    }
    
    cerrar(popup) {
        popup.classList.remove('visible');
        setTimeout(() => popup.remove(), 300);
    }
}

// Uso
const notificaciones = new PopupNotificaciones();
notificaciones.mostrar('Exito', 'Datos guardados correctamente');
notificaciones.mostrar('Error', 'No se pudieron guardar los datos', 10000);
```

### Solucion Ejercicio 3

```javascript
class InfiniteScroll {
    constructor(container, loadMore, options = {}) {
        this.container = container;
        this.loadMore = loadMore;
        this.page = 1;
        this.loading = false;
        this.hasMore = true;
        this.threshold = options.threshold || 200;
        
        this.crearSentinel();
        this.crearObserver();
    }
    
    crearSentinel() {
        this.sentinel = document.createElement('div');
        this.sentinel.className = 'scroll-sentinel';
        this.sentinel.style.height = '1px';
        this.container.appendChild(this.sentinel);
    }
    
    crearObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.loading && this.hasMore) {
                    this.cargarMas();
                }
            });
        }, {
            rootMargin: `${this.threshold}px`
        });
        
        this.observer.observe(this.sentinel);
    }
    
    async cargarMas() {
        this.loading = true;
        this.mostrarLoader();
        
        try {
            const datos = await this.loadMore(this.page);
            
            if (datos.length === 0) {
                this.hasMore = false;
                this.mostrarFin();
            } else {
                this.page++;
            }
        } catch (error) {
            console.error('Error cargando datos:', error);
            this.mostrarError();
        } finally {
            this.loading = false;
            this.ocultarLoader();
        }
    }
    
    mostrarLoader() {
        this.sentinel.textContent = 'Cargando mas contenido...';
    }
    
    ocultarLoader() {
        if (this.hasMore) {
            this.sentinel.textContent = '';
        }
    }
    
    mostrarFin() {
        this.sentinel.textContent = 'No hay mas contenido';
    }
    
    mostrarError() {
        this.sentinel.textContent = 'Error cargando contenido. Intenta de nuevo.';
    }
    
    destruir() {
        this.observer.disconnect();
        this.sentinel.remove();
    }
}

// Uso
const contenedor = document.getElementById('lista');
const infiniteScroll = new InfiniteScroll(contenedor, async (page) => {
    const response = await fetch(`/api/items?page=${page}`);
    const items = await response.json();
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = item.nombre;
        contenedor.insertBefore(div, contenedor.lastChild);
    });
    
    return items;
});
```

### Solucion Ejercicio 4

```javascript
class UndoRedoManager {
    constructor(maxHistorial = 50) {
        this.historial = [];
        this.indiceActual = -1;
        this.maxHistorial = maxHistorial;
        this.cargarHistorial();
    }
    
    accion(accion, datos) {
        // Eliminar acciones futuras si estamos en el medio del historial
        this.historial = this.historial.slice(0, this.indiceActual + 1);
        
        // Agregar nueva accion
        this.historial.push({
            tipo: accion.tipo,
            datos,
            timestamp: Date.now()
        });
        
        // Limitar historial
        if (this.historial.length > this.maxHistorial) {
            this.historial.shift();
        }
        
        this.indiceActual = this.historial.length - 1;
        this.guardarHistorial();
    }
    
    undo() {
        if (this.indiceActual > 0) {
            this.indiceActual--;
            return this.historial[this.indiceActual];
        }
        return null;
    }
    
    redo() {
        if (this.indiceActual < this.historial.length - 1) {
            this.indiceActual++;
            return this.historial[this.indiceActual];
        }
        return null;
    }
    
    obtenerActual() {
        return this.historial[this.indiceActual] || null;
    }
    
    puedeUndo() {
        return this.indiceActual > 0;
    }
    
    puedeRedo() {
        return this.indiceActual < this.historial.length - 1;
    }
    
    guardarHistorial() {
        try {
            localStorage.setItem('undoRedoHistorial', JSON.stringify({
                historial: this.historial,
                indiceActual: this.indiceActual
            }));
        } catch (error) {
            console.error('Error guardando historial:', error);
        }
    }
    
    cargarHistorial() {
        try {
            const datos = localStorage.getItem('undoRedoHistorial');
            if (datos) {
                const parsed = JSON.parse(datos);
                this.historial = parsed.historial;
                this.indiceActual = parsed.indiceActual;
            }
        } catch (error) {
            console.error('Error cargando historial:', error);
        }
    }
    
    limpiar() {
        this.historial = [];
        this.indiceActual = -1;
        localStorage.removeItem('undoRedoHistorial');
    }
}

// Uso
const manager = new UndoRedoManager();

// Registrar acciones
manager.accion({ tipo: 'escribir' }, { texto: 'Hola' });
manager.accion({ tipo: 'escribir' }, { texto: ' Mundo' });

console.log(manager.undo()); // { tipo: 'escribir', datos: { texto: 'Hola' } }
console.log(manager.redo()); // { tipo: 'escribir', datos: { texto: ' Mundo' } }
```

### Solucion Ejercicio 5

```javascript
class DeteccionVisibilidad {
    constructor() {
        this.estado = {
            visible: document.visibilityState === 'visible',
            ultimaVisibilidad: Date.now()
        };
        
        this.observadores = [];
        
        document.addEventListener('visibilitychange', () => this.manejarCambio());
        window.addEventListener('focus', () => this.manejarFocus());
        window.addEventListener('blur', () => this.manejarBlur());
    }
    
    manejarCambio() {
        const visible = document.visibilityState === 'visible';
        const tiempoAnterior = this.estado.ultimaVisibilidad;
        
        this.estado = {
            visible,
            ultimaVisibilidad: Date.now()
        };
        
        if (!visible) {
            this.guardarEstado({
                tipo: 'visibilitychange',
                timestamp: tiempoAnterior
            });
        }
        
        this.notificarObservadores({
            tipo: 'visibility',
            visible,
            duracion: Date.now() - tiempoAnterior
        });
    }
    
    manejarFocus() {
        this.notificarObservadores({
            tipo: 'focus',
            timestamp: Date.now()
        });
    }
    
    manejarBlur() {
        this.notificarObservadores({
            tipo: 'blur',
            timestamp: Date.now()
        });
        
        this.guardarEstado({
            tipo: 'blur',
            timestamp: Date.now()
        });
    }
    
    guardarEstado(datos) {
        try {
            const estadoAnterior = localStorage.getItem('visibilidadEstado');
            const estado = estadoAnterior ? JSON.parse(estadoAnterior) : [];
            
            estado.push({
                ...datos,
                fecha: new Date().toISOString()
            });
            
            // Mantener solo los ultimos 50 registros
            if (estado.length > 50) {
                estado.shift();
            }
            
            localStorage.setItem('visibilidadEstado', JSON.stringify(estado));
        } catch (error) {
            console.error('Error guardando estado:', error);
        }
    }
    
    observar(callback) {
        this.observadores.push(callback);
        
        return () => {
            this.observadores = this.observadores.filter(obs => obs !== callback);
        };
    }
    
    notificarObservadores(datos) {
        this.observadores.forEach(callback => callback(datos));
    }
    
    obtenerHistorial() {
        try {
            return JSON.parse(localStorage.getItem('visibilidadEstado')) || [];
        } catch {
            return [];
        }
    }
}

// Uso
const visibilidad = new DeteccionVisibilidad();

const unsubscribe = visibilidad.observar((evento) => {
    console.log('Evento de visibilidad:', evento);
});

// Cuando el usuario cambie de pestana, se guardara el estado
```

### Solucion Ejercicio 6

```javascript
class CacheManager {
    constructor() {
        this.estrategias = {
            'cache-first': this.cacheFirst.bind(this),
            'network-first': this.networkFirst.bind(this),
            'stale-while-revalidate': this.staleWhileRevalidate.bind(this)
        };
    }
    
    async cacheFirst(url, options = {}) {
        const cache = await caches.open('mi-cache');
        const response = await cache.match(url);
        
        if (response) {
            return response;
        }
        
        const networkResponse = await fetch(url, options);
        
        if (networkResponse.ok) {
            await cache.put(url, networkResponse.clone());
        }
        
        return networkResponse;
    }
    
    async networkFirst(url, options = {}) {
        try {
            const networkResponse = await fetch(url, options);
            
            if (networkResponse.ok) {
                const cache = await caches.open('mi-cache');
                await cache.put(url, networkResponse.clone());
            }
            
            return networkResponse;
        } catch (error) {
            const cache = await caches.open('mi-cache');
            const response = await cache.match(url);
            
            if (response) {
                return response;
            }
            
            throw error;
        }
    }
    
    async staleWhileRevalidate(url, options = {}) {
        const cache = await caches.open('mi-cache');
        const response = await cache.match(url);
        
        const fetchPromise = fetch(url, options).then(networkResponse => {
            if (networkResponse.ok) {
                cache.put(url, networkResponse.clone());
            }
            return networkResponse;
        });
        
        return response || fetchPromise;
    }
    
    async fetch(url, estrategia = 'cache-first', options = {}) {
        if (!this.estrategias[estrategia]) {
            throw new Error(`Estrategia no soportada: ${estrategia}`);
        }
        
        return this.estrategias[estrategia](url, options);
    }
    
    async limpiarCache(tamanoMaximo = 100) {
        const cache = await caches.open('mi-cache');
        const keys = await cache.keys();
        
        if (keys.length > tamanoMaximo) {
            const keysEliminar = keys.slice(0, keys.length - tamanoMaximo);
            
            for (const key of keysEliminar) {
                await cache.delete(key);
            }
        }
    }
    
    async obtenerTamanoCache() {
        const cache = await caches.open('mi-cache');
        const keys = await cache.keys();
        return keys.length;
    }
}

// Uso
const cache = new CacheManager();

// Cache-first para assets estaticos
await cache.fetch('/styles.css', 'cache-first');

// Network-first para API calls
await cache.fetch('/api/datos', 'network-first');

// Stale-while-revalidate para contenido que puede estar desactualizado
await cache.fetch('/api/noticias', 'stale-while-revalidate');
```
