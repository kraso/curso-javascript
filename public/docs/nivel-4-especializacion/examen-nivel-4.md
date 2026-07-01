# Examen Nivel 4: Especializacion

## Instrucciones Generales

- Tiempo total: 120 minutos
- Puntuacion total: 50 puntos
- No se permite usar internet ni materiales externos
- Puede usar documentacion offline del curso
- Codigo debe ser funcional y bien estructurado
- Entregar todos los archivos en la carpeta indicada

---

## PARTE A: Teoria (20 puntos)

### Pregunta 1 (2 puntos)

Explica la diferencia entre Big O, Big Omega y Big Theta. Proporciona un ejemplo de cada uno.

**Respuesta esperada:**
- Big O (O): Cota superior asintotica - peor caso
- Big Omega (Ω): Cota inferior asintotica - mejor caso
- Big Theta (Θ): Cota ajustada asintotica - caso promedio cuando todos los casos son iguales

---

### Pregunta 2 (2 puntos)

¿Cual es la complejidad temporal y espacial de Merge Sort? ¿Por que es preferido sobre Quick Sort en algunos casos?

**Respuesta esperada:**
- Merge Sort: O(n log n) tiempo, O(n) espacio
- Quick Sort: O(n log n) promedio, O(n^2) peor caso
- Merge Sort es estable y tiene garantia de O(n log n)

---

### Pregunta 3 (2 puntos)

Describe que es una Hash Table y como maneja las colisiones. Menciona al menos 2 tecnicas de resolucion de colisiones.

**Respuesta esperada:**
- Hash Table: Estructura que mapea claves a valores usando una funcion hash
- Colisiones: Cuando dos claves producen el mismo indice
- Tecnicas: Encadenamiento (chaining), Address Openning (linear/quadratic probing)

---

### Pregunta 4 (2 puntos)

¿Que es el amortized analysis? Proporciona un ejemplo de operacion con complejidad amortizada.

**Respuesta esperada:**
- Analisis que promedio el costo de operaciones a largo plazo
- Ejemplo: Array.push() en JavaScript es O(1) amortizado aunque ocasionalmente es O(n) cuando redimensiona

---

### Pregunta 5 (2 puntos)

Explica la diferencia entre BFS y DFS. ¿En que casos es mejor usar cada uno?

**Respuesta esperada:**
- BFS: Busqueda por amplitud, usa Queue, bueno para encontrar caminos mas cortos
- DFS: Busqueda por profundidad, usa Stack/Recursion, bueno para explorar todo el grafo

---

### Pregunta 6 (2 puntos)

¿Que es un Binary Search Tree (BST)? ¿Cual es su ventaja sobre un arbol binario regular?

**RespuestaBST:**
- BST: Arbol donde cada nodo tiene maximo 2 hijos, con la propiedad: izquierdo < raiz < derecho
- Ventaja: Busqueda, insercion y eliminacion en O(log n) promedio

---

### Pregunta 7 (2 puntos)

Menciona 3 diferencias entre localStorage y sessionStorage.

**Respuesta esperada:**
1. localStorage persiste, sessionStorage se borra al cerrar pestana
2. localStorage se comparte entre pestanas, sessionStorage no
3. Ambos tienen limite de ~5MB pero localStorage es mas persistente

---

### Pregunta 8 (2 puntos)

¿Que es el Lazy Loading? ¿Por que es importante para el rendimiento?

**Respuesta esperada:**
- Lazy Loading: Tecnica para cargar recursos solo cuando son necesarios
- Importancia: Reduce tiempo de carga inicial, ahorra ancho de banda, mejora UX

---

### Pregunta 9 (2 puntos)

Explica que es CORS y por que es necesario en las peticiones HTTP.

**Respuesta esperada:**
- CORS: Cross-Origin Resource Sharing, mecanismo de seguridad del navegador
- Permite controlar que dominios pueden acceder a recursos
- Necesario para evitar ataques CSRF y proteger datos

---

### Pregunta 10 (2 puntos)

¿Cual es la diferencia entre un algoritmo estable e inestable en ordenamiento? Proporciona un ejemplo de cada uno.

**Respuesta esperada:**
- Estable: Mantiene el orden relativo de elementos iguales
- Inestable: No garantiza el orden de elementos iguales
- Ejemplo estable: Merge Sort
- Ejemplo inestable: Quick Sort

---

## PARTE B: Practica (30 puntos)

### Ejercicio 1 (5 puntos)

Implementa una funcion `encontrarDuplicados(arr)` que encuentre todos los elementos duplicados en un arreglo. La funcion debe:
- Devolver un array con los duplicados
- No usar Set ni Object
- Tener complejidad O(n) tiempo y O(1) espacio adicional (modificar el arreglo in-place)

```javascript
function encontrarDuplicados(arr) {
    // Tu codigo aqui
}

// Pruebas
console.log(encontrarDuplicados([1, 2, 3, 4, 5, 3, 2])); // [2, 3]
console.log(encontrarDuplicados([1, 1, 2, 2, 3, 3])); // [1, 2, 3]
console.log(encontrarDuplicados([1, 2, 3, 4, 5])); // []
```

---

### Ejercicio 2 (5 puntos)

Implementa una clase `LRUCache` (Least Recently Used) con las siguientes operaciones:
- `get(key)`: Retorna el valor o -1 si no existe
- `put(key, value)`: Inserta o actualiza el valor
- Ambas operaciones deben ser O(1)
- Capacidad maxima definida en el constructor

```javascript
class LRUCache {
    constructor(capacidad) {
        // Tu codigo aqui
    }
    
    get(key) {
        // Tu codigo aqui
    }
    
    put(key, value) {
        // Tu codigo aqui
    }
}

// Pruebas
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3); // Elimina la clave 2
console.log(cache.get(2)); // -1
```

---

### Ejercicio 3 (5 puntos)

Implementa una funcion `mergeIntervals(intervals)` que fusione todos los intervalos superpuestos.

```javascript
function mergeIntervals(intervals) {
    // Tu codigo aqui
}

// Pruebas
console.log(mergeIntervals([[1,3],[2,6],[8,10],[15,18]])); 
// [[1,6],[8,10],[15,18]]
console.log(mergeIntervals([[1,4],[4,5]])); 
// [[1,5]]
```

---

### Ejercicio 4 (5 puntos)

Implementa una funcion `fetchConCacheYRetry(url, opciones)` que:
- Implemente cache en localStorage con expiracion de 5 minutos
- Reintente la peticion hasta 3 veces en caso de error
- Maneje errores de red y timeouts
- Devuelva una promesa con los datos o un error descriptivo

```javascript
async function fetchConCacheYRetry(url, opciones = {}) {
    // Tu codigo aqui
}

// Pruebas
// fetchConCacheYRetry('https://api.ejemplo.com/datos')
//   .then(datos => console.log(datos))
//   .catch(error => console.error(error));
```

---

### Ejercicio 5 (5 puntos)

Implementa una funcion `organizarTareas(tareas)` que ordene y filtre tareas segun multiple criterios:

```javascript
function organizarTareas(tareas, criterios) {
    // tareas: array de objetos { id, titulo, prioridad, completada, fechaCreacion }
    // criterios: { ordenarPor: 'prioridad'|'fecha', filtrarPor: 'completadas'|'pendientes'|'todas', limite: number }
    // Tu codigo aqui
}

// Pruebas
const tareas = [
    { id: 1, titulo: 'Tarea 1', prioridad: 'alta', completada: false, fechaCreacion: '2024-01-01' },
    { id: 2, titulo: 'Tarea 2', prioridad: 'baja', completada: true, fechaCreacion: '2024-01-02' },
    { id: 3, titulo: 'Tarea 3', prioridad: 'media', completada: false, fechaCreacion: '2024-01-03' },
];

console.log(organizarTareas(tareas, { ordenarPor: 'prioridad', filtrarPor: 'pendientes', limite: 2 }));
```

---

### Ejercicio 6 (5 puntos)

Implementa un `EventEmitter` con las siguientes funcionalidades:
- `on(evento, callback)`: Suscribirse a un evento
- `emit(evento, ...args)`: Emitir un evento
- `off(evento, callback)`: Desuscribirse de un evento
- `once(evento, callback)`: Escuchar solo una vez
- `listeners(evento)`: Obtener listeners de un evento
- `removeAllListeners(evento)`: Eliminar todos los listeners de un evento

```javascript
class EventEmitter {
    constructor() {
        // Tu codigo aqui
    }
    
    on(evento, callback) {
        // Tu codigo aqui
    }
    
    emit(evento, ...args) {
        // Tu codigo aqui
    }
    
    off(evento, callback) {
        // Tu codigo aqui
    }
    
    once(evento, callback) {
        // Tu codigo aqui
    }
    
    listeners(evento) {
        // Tu codigo aqui
    }
    
    removeAllListeners(evento) {
        // Tu codigo aqui
    }
}

// Pruebas
const emitter = new EventEmitter();

const saludar = (nombre) => console.log(`Hola ${nombre}`);
emitter.on('saludo', saludar);
emitter.emit('saludo', 'Juan'); // Hola Juan

const despedir = (nombre) => console.log(`Adios ${nombre}`);
emitter.once('despedida', despedir);
emitter.emit('despedida', 'Maria'); // Adios Maria
emitter.emit('despedida', 'Pedro'); // No imprime nada

console.log(emitter.listeners('saludo')); // [saludar]
emitter.off('saludo', saludar);
emitter.emit('saludo', 'Ana'); // No imprime nada
```

---

## PARTE C: Desarrollo Completo (0 puntos - Bonus)

### Proyecto Bonus: Mini Framework React

Crea un mini framework similar a React con las siguientes funcionalidades:

```javascript
// minireact.js
// Implementar las siguientes funciones:

// 1. createElement(tag, props, ...children)
function createElement(tag, props, ...children) {
    // Tu codigo aqui
}

// 2. render(element, container)
function render(element, container) {
    // Tu codigo aqui
}

// 3. useState(initialValue)
function useState(initialValue) {
    // Tu codigo aqui
}

// 4. useEffect(callback, dependencies)
function useEffect(callback, dependencies) {
    // Tu codigo aqui
}

// Ejemplo de uso (deberia funcionar despues de implementar):
/*
const App = () => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);
    
    return createElement('div', null,
        createElement('h1', null, 'Mi App'),
        createElement('p', null, `Contador: ${count}`),
        createElement('button', { onClick: () => setCount(count + 1) }, 'Incrementar')
    );
};

render(createElement(App, null), document.getElementById('root'));
*/
```

---

## Soluciones

### Solucion Ejercicio 1

```javascript
function encontrarDuplicados(arr) {
    const duplicados = [];
    
    for (let i = 0; i < arr.length; i++) {
        const indice = Math.abs(arr[i]) - 1;
        
        if (arr[indice] < 0) {
            if (!duplicados.includes(Math.abs(arr[i]))) {
                duplicados.push(Math.abs(arr[i]));
            }
        } else {
            arr[indice] = -arr[indice];
        }
    }
    
    return duplicados;
}

// Pruebas
console.log(encontrarDuplicados([1, 2, 3, 4, 5, 3, 2])); // [2, 3]
console.log(encontrarDuplicados([1, 1, 2, 2, 3, 3])); // [1, 2, 3]
console.log(encontrarDuplicados([1, 2, 3, 4, 5])); // []
```

### Solucion Ejercicio 2

```javascript
class LRUCache {
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.cache = new Map();
    }
    
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        
        const valor = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, valor);
        
        return valor;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacidad) {
            const primeraClave = this.cache.keys().next().value;
            this.cache.delete(primeraClave);
        }
        
        this.cache.set(key, value);
    }
}

// Pruebas
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3); // Elimina la clave 2
console.log(cache.get(2)); // -1
```

### Solucion Ejercicio 3

```javascript
function mergeIntervals(intervals) {
    if (intervals.length === 0) return [];
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    const resultado = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const actual = intervals[i];
        const ultimo = resultado[resultado.length - 1];
        
        if (actual[0] <= ultimo[1]) {
            ultimo[1] = Math.max(ultimo[1], actual[1]);
        } else {
            resultado.push(actual);
        }
    }
    
    return resultado;
}

// Pruebas
console.log(mergeIntervals([[1,3],[2,6],[8,10],[15,18]])); 
// [[1,6],[8,10],[15,18]]
console.log(mergeIntervals([[1,4],[4,5]])); 
// [[1,5]]
```

### Solucion Ejercicio 4

```javascript
async function fetchConCacheYRetry(url, opciones = {}) {
    const {
        maxReintentos = 3,
        tiempoEspera = 1000,
        tiempoCache = 5 * 60 * 1000,
        useCache = true
    } = opciones;
    
    const claveCache = `cache_${url}`;
    
    // Verificar cache
    if (useCache) {
        try {
            const cacheGuardado = localStorage.getItem(claveCache);
            if (cacheGuardado) {
                const { datos, timestamp } = JSON.parse(cacheGuardado);
                
                if (Date.now() - timestamp < tiempoCache) {
                    console.log('Usando cache para:', url);
                    return datos;
                }
            }
        } catch (error) {
            console.error('Error leyendo cache:', error);
        }
    }
    
    // Intentar peticion con reintentos
    let ultimoError;
    
    for (let intento = 1; intento <= maxReintentos; intento++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            const response = await fetch(url, {
                ...opciones,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const datos = await response.json();
            
            // Guardar en cache
            if (useCache) {
                try {
                    localStorage.setItem(claveCache, JSON.stringify({
                        datos,
                        timestamp: Date.now()
                    }));
                } catch (error) {
                    console.error('Error guardando cache:', error);
                }
            }
            
            return datos;
            
        } catch (error) {
            ultimoError = error;
            console.log(`Intento ${intento} fallido:`, error.message);
            
            if (intento < maxReintentos) {
                await new Promise(resolve => setTimeout(resolve, tiempoEspera * intento));
            }
        }
    }
    
    throw new Error(`Maximo numero de reintentos alcanzado: ${ultimoError.message}`);
}
```

### Solucion Ejercicio 5

```javascript
function organizarTareas(tareas, criterios) {
    const { ordenarPor = 'fecha', filtrarPor = 'todas', limite = Infinity } = criterios;
    
    let resultado = [...tareas];
    
    // Filtrar
    if (filtrarPor === 'completadas') {
        resultado = resultado.filter(t => t.completada);
    } else if (filtrarPor === 'pendientes') {
        resultado = resultado.filter(t => !t.completada);
    }
    
    // Ordenar
    const ordenPrioridad = { 'alta': 1, 'media': 2, 'baja': 3 };
    
    if (ordenarPor === 'prioridad') {
        resultado.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]);
    } else if (ordenarPor === 'fecha') {
        resultado.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));
    }
    
    // Limitar
    return resultado.slice(0, limite);
}

// Pruebas
const tareas = [
    { id: 1, titulo: 'Tarea 1', prioridad: 'alta', completada: false, fechaCreacion: '2024-01-01' },
    { id: 2, titulo: 'Tarea 2', prioridad: 'baja', completada: true, fechaCreacion: '2024-01-02' },
    { id: 3, titulo: 'Tarea 3', prioridad: 'media', completada: false, fechaCreacion: '2024-01-03' },
];

console.log(organizarTareas(tareas, { ordenarPor: 'prioridad', filtrarPor: 'pendientes', limite: 2 }));
```

### Solucion Ejercicio 6

```javascript
class EventEmitter {
    constructor() {
        this.eventos = {};
    }
    
    on(evento, callback) {
        if (!this.eventos[evento]) {
            this.eventos[evento] = [];
        }
        this.eventos[evento].push(callback);
        
        return () => this.off(evento, callback);
    }
    
    emit(evento, ...args) {
        if (!this.eventos[evento]) return false;
        
        this.eventos[evento].forEach(callback => {
            callback.apply(this, args);
        });
        
        return true;
    }
    
    off(evento, callback) {
        if (!this.eventos[evento]) return false;
        
        this.eventos[evento] = this.eventos[evento].filter(cb => cb !== callback);
        
        return true;
    }
    
    once(evento, callback) {
        const wrapper = (...args) => {
            callback.apply(this, args);
            this.off(evento, wrapper);
        };
        
        return this.on(evento, wrapper);
    }
    
    listeners(evento) {
        return this.eventos[evento] || [];
    }
    
    removeAllListeners(evento) {
        if (evento) {
            delete this.eventos[evento];
        } else {
            this.eventos = {};
        }
        
        return true;
    }
    
    eventNames() {
        return Object.keys(this.eventos);
    }
    
    listenerCount(evento) {
        return this.listeners(evento).length;
    }
}

// Pruebas
const emitter = new EventEmitter();

const saludar = (nombre) => console.log(`Hola ${nombre}`);
emitter.on('saludo', saludar);
emitter.emit('saludo', 'Juan'); // Hola Juan

const despedir = (nombre) => console.log(`Adios ${nombre}`);
emitter.once('despedida', despedir);
emitter.emit('despedida', 'Maria'); // Adios Maria
emitter.emit('despedida', 'Pedro'); // No imprime nada

console.log(emitter.listeners('saludo')); // [saludar]
emitter.off('saludo', saludar);
emitter.emit('saludo', 'Ana'); // No imprime nada

console.log(emitter.eventNames()); // ['despedida']
console.log(emitter.listenerCount('despedida')); // 1
```

---

## Criterios de Evaluacion

### Parte A: Teoria (20 puntos)
- Cada respuesta correcta: 2 puntos
- Respuestas parciales: 1 punto
- Sin respuesta: 0 puntos

### Parte B: Practica (30 puntos)
- Ejercicio 1: 5 puntos
  - Funcion correcta: 3 puntos
  - Manejo de casos edge: 1 punto
  - Complejidad correcta: 1 punto

- Ejercicio 2: 5 puntos
  - Clase correcta: 3 puntos
  - Operaciones O(1): 1 punto
  - Manejo de capacidad: 1 punto

- Ejercicio 3: 5 puntos
  - Funcion correcta: 3 puntos
  - Ordenamiento: 1 punto
  - Casos edge: 1 punto

- Ejercicio 4: 5 puntos
  - Cache funcional: 2 puntos
  - Reintentos: 2 puntos
  - Manejo de errores: 1 punto

- Ejercicio 5: 5 puntos
  - Filtrado: 2 puntos
  - Ordenamiento: 2 puntos
  - Limite: 1 punto

- Ejercicio 6: 5 puntos
  - Metodos basicos: 3 puntos
  - Once y off: 1 punto
  - listeners y removeAllListeners: 1 punto

### Parte C: Bonus (0 puntos)
- Implementacion completa: 10 puntos bonus
- Parcialmente funcional: 5 puntos bonus

---

## Nota Minima para Aprobar

- Parte A: Minimo 12 puntos (60%)
- Parte B: Minimo 18 puntos (60%)
- Total: Minimo 30 puntos (60%)

---

## Formato de Entrega

1. Crear carpeta `examen-nivel-4`
2. Archivos:
   - `examen-teoria.md` (respuestas a Parte A)
   - `ejercicio-1.js`
   - `ejercicio-2.js`
   - `ejercicio-3.js`
   - `ejercicio-4.js`
   - `ejercicio-5.js`
   - `ejercicio-6.js`
   - `bonus.js` (opcional)

3. Cada archivo debe incluir:
   - Comentarios explicativos
   - Pruebas ejecutables
   - Complejidad temporal y espacial documentada
