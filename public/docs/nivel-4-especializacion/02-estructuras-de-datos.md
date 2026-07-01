# Leccion 2: Estructuras de Datos

## Objetivos de aprendizaje

- [ ] Implementar y usar Arrays correctamente
- [ ] Comprender y crear Linked Lists (singly y doubly)
- [ ] Implementar Stacks y sus aplicaciones
- [ ] Implementar Queues y Priority Queues
- [ ] Entender Hash Tables y manejo de colisiones
- [ ] Implementar Arboles Binarios y BST
- [ ] Comprender Grafos y sus recorridos (BFS, DFS)
- [ ] Elegir la estructura de datos adecuada para cada problema

---

## 1. Arrays

### Ejemplo 1: Array basico y operaciones

```javascript
// Crear arrays
const arr1 = [1, 2, 3, 4, 5];
const arr2 = new Array(5); // Array de 5 elementos vacios
const arr3 = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]

// Acceso - O(1)
console.log(arr1[0]); // 1
console.log(arr1[arr1.length - 1]); // 5

// Modificar - O(1)
arr1[0] = 10;
console.log(arr1); // [10, 2, 3, 4, 5]

// Agregar al final - O(1) amortizado
arr1.push(6);
console.log(arr1); // [10, 2, 3, 4, 5, 6]

// Eliminar del final - O(1)
arr1.pop();
console.log(arr1); // [10, 2, 3, 4, 5]

// Agregar al inicio - O(n)
arr1.unshift(0);
console.log(arr1); // [0, 10, 2, 3, 4, 5]

// Eliminar del inicio - O(n)
arr1.shift();
console.log(arr1); // [10, 2, 3, 4, 5]

// Buscar - O(n)
console.log(arr1.indexOf(3)); // 3
console.log(arr1.includes(3)); // true
console.log(arr1.find(x => x > 3)); // 4

// Insertar en posicion - O(n)
arr1.splice(2, 0, 25); // Insertar 25 en indice 2
console.log(arr1); // [10, 2, 25, 3, 4, 5]

// Eliminar en posicion - O(n)
arr1.splice(2, 1); // Eliminar 1 elemento en indice 2
console.log(arr1); // [10, 2, 3, 4, 5]
```

### Ejemplo 2: Metodos de array

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map - O(n)
const duplicados = numeros.map(n => n * 2);
console.log(duplicados); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// filter - O(n)
const pares = numeros.filter(n => n % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]

// reduce - O(n)
const suma = numeros.reduce((acum, n) => acum + n, 0);
console.log(suma); // 55

// find - O(n) peor caso
const mayorQue5 = numeros.find(n => n > 5);
console.log(mayorQue5); // 6

// some - O(n) peor caso
const tieneMayorQue5 = numeros.some(n => n > 5);
console.log(tieneMayorQue5); // true

// every - O(n) peor caso
const todosPositivos = numeros.every(n => n > 0);
console.log(todosPositivos); // true

// sort - O(n log n)
const desordenados = [3, 1, 4, 1, 5, 9, 2, 6];
desordenados.sort((a, b) => a - b);
console.log(desordenados); // [1, 1, 2, 3, 4, 5, 6, 9]

// reverse - O(n)
const reverso = [...numeros].reverse();
console.log(reverso); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// flat - O(n)
const anidado = [[1, 2], [3, 4], [5, 6]];
const plano = anidado.flat();
console.log(plano); // [1, 2, 3, 4, 5, 6]

// join - O(n)
const letras = ['a', 'b', 'c'];
console.log(letras.join('-')); // 'a-b-c'
```

---

## 2. Linked Lists

### Ejemplo 3: Singly Linked List

```javascript
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

class ListaEnlazada {
    constructor() {
        this.cabeza = null;
        this.tamano = 0;
    }
    
    // Agregar al inicio - O(1)
    agregarInicio(valor) {
        const nuevoNodo = new Nodo(valor);
        nuevoNodo.siguiente = this.cabeza;
        this.cabeza = nuevoNodo;
        this.tamano++;
    }
    
    // Agregar al final - O(n)
    agregarFinal(valor) {
        const nuevoNodo = new Nodo(valor);
        
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
        
        this.tamano++;
    }
    
    // Eliminar por valor - O(n)
    eliminar(valor) {
        if (!this.cabeza) return null;
        
        if (this.cabeza.valor === valor) {
            this.cabeza = this.cabeza.siguiente;
            this.tamano--;
            return valor;
        }
        
        let actual = this.cabeza;
        while (actual.siguiente) {
            if (actual.siguiente.valor === valor) {
                actual.siguiente = actual.siguiente.siguiente;
                this.tamano--;
                return valor;
            }
            actual = actual.siguiente;
        }
        
        return null;
    }
    
    // Buscar - O(n)
    buscar(valor) {
        let actual = this.cabeza;
        let indice = 0;
        
        while (actual) {
            if (actual.valor === valor) {
                return indice;
            }
            actual = actual.siguiente;
            indice++;
        }
        
        return -1;
    }
    
    // Convertir a array - O(n)
    aArray() {
        const resultado = [];
        let actual = this.cabeza;
        
        while (actual) {
            resultado.push(actual.valor);
            actual = actual.siguiente;
        }
        
        return resultado;
    }
    
    // Imprimir - O(n)
    imprimir() {
        let actual = this.cabeza;
        const valores = [];
        
        while (actual) {
            valores.push(actual.valor);
            actual = actual.siguiente;
        }
        
        console.log(valores.join(' -> '));
    }
}

// Ejemplo de uso
const lista = new ListaEnlazada();
lista.agregarInicio(3);
lista.agregarInicio(2);
lista.agregarInicio(1);
lista.agregarFinal(4);
lista.agregarFinal(5);

lista.imprimir(); // 1 -> 2 -> 3 -> 4 -> 5
console.log(lista.tamano); // 5
console.log(lista.buscar(3)); // 2
lista.eliminar(3);
lista.imprimir(); // 1 -> 2 -> 4 -> 5
```

### Ejemplo 4: Doubly Linked List

```javascript
class NodoDoble {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaDoblementeEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamano = 0;
    }
    
    // Agregar al inicio - O(1)
    agregarInicio(valor) {
        const nuevoNodo = new NodoDoble(valor);
        
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza.anterior = nuevoNodo;
            this.cabeza = nuevoNodo;
        }
        
        this.tamano++;
    }
    
    // Agregar al final - O(1)
    agregarFinal(valor) {
        const nuevoNodo = new NodoDoble(valor);
        
        if (!this.cola) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            nuevoNodo.anterior = this.cola;
            this.cola.siguiente = nuevoNodo;
            this.cola = nuevoNodo;
        }
        
        this.tamano++;
    }
    
    // Eliminar desde el inicio - O(1)
    eliminarInicio() {
        if (!this.cabeza) return null;
        
        const valor = this.cabeza.valor;
        
        if (this.cabeza === this.cola) {
            this.cabeza = null;
            this.cola = null;
        } else {
            this.cabeza = this.cabeza.siguiente;
            this.cabeza.anterior = null;
        }
        
        this.tamano--;
        return valor;
    }
    
    // Eliminar desde el final - O(1)
    eliminarFinal() {
        if (!this.cola) return null;
        
        const valor = this.cola.valor;
        
        if (this.cabeza === this.cola) {
            this.cabeza = null;
            this.cola = null;
        } else {
            this.cola = this.cola.anterior;
            this.cola.siguiente = null;
        }
        
        this.tamano--;
        return valor;
    }
    
    // Buscar desde el final - O(n)
    buscarDesdeAtras(valor) {
        let actual = this.cola;
        let indice = this.tamano - 1;
        
        while (actual) {
            if (actual.valor === valor) {
                return indice;
            }
            actual = actual.anterior;
            indice--;
        }
        
        return -1;
    }
    
    // Invertir la lista - O(n)
    invertir() {
        let actual = this.cabeza;
        let temp = null;
        
        while (actual) {
            temp = actual.anterior;
            actual.anterior = actual.siguiente;
            actual.siguiente = temp;
            actual = actual.anterior;
        }
        
        temp = this.cabeza;
        this.cabeza = this.cola;
        this.cola = temp;
    }
    
    // Convertir a array - O(n)
    aArray() {
        const resultado = [];
        let actual = this.cabeza;
        
        while (actual) {
            resultado.push(actual.valor);
            actual = actual.siguiente;
        }
        
        return resultado;
    }
}

// Ejemplo de uso
const listaDoble = new ListaDoblementeEnlazada();
listaDoble.agregarFinal(1);
listaDoble.agregarFinal(2);
listaDoble.agregarFinal(3);
listaDoble.agregarInicio(0);

console.log(listaDoble.aArray()); // [0, 1, 2, 3]
console.log(listaDoble.buscarDesdeAtras(2)); // 2
listaDoble.invertir();
console.log(listaDoble.aArray()); // [3, 2, 1, 0]
```

---

## 3. Stacks

### Ejemplo 5: Stack basico

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    // Agregar al tope - O(1) amortizado
    push(elemento) {
        this.items.push(elemento);
    }
    
    // Remover del tope - O(1)
    pop() {
        if (this.estaVacio()) {
            throw new Error("Stack vacio");
        }
        return this.items.pop();
    }
    
    // Ver tope sin remover - O(1)
    peek() {
        if (this.estaVacio()) {
            throw new Error("Stack vacio");
        }
        return this.items[this.items.length - 1];
    }
    
    // Verificar si esta vacio - O(1)
    estaVacio() {
        return this.items.length === 0;
    }
    
    // Tamano - O(1)
    tamano() {
        return this.items.length;
    }
    
    // Vaciar stack - O(1)
    vaciar() {
        this.items = [];
    }
    
    // Buscar elemento - O(n)
    buscar(elemento) {
        return this.items.indexOf(elemento);
    }
    
    // Imprimir - O(n)
    imprimir() {
        return this.items.join('\n');
    }
}

// Ejemplo de uso
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek()); // 30
console.log(stack.pop()); // 30
console.log(stack.tamano()); // 2
console.log(stack.estaVacio()); // false
```

### Ejemplo 6: Aplicaciones del Stack

```javascript
// 1. Verificar parentesis balanceados
function parentesisBalanceados(expresion) {
    const stack = new Stack();
    const pares = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    
    for (const char of expresion) {
        if ('([{'.includes(char)) {
            stack.push(char);
        } else if (')]}'.includes(char)) {
            if (stack.estaVacio() || stack.pop() !== pares[char]) {
                return false;
            }
        }
    }
    
    return stack.estaVacio();
}

console.log(parentesisBalanceados("({[]})")); // true
console.log(parentesisBalanceados("({[}])")); // false
console.log(parentesisBalanceados("((()))")); // true
console.log(parentesisBalanceados("(()")); // false

// 2. Invertir un string
function invertirString(str) {
    const stack = new Stack();
    
    for (const char of str) {
        stack.push(char);
    }
    
    let resultado = '';
    while (!stack.estaVacio()) {
        resultado += stack.pop();
    }
    
    return resultado;
}

console.log(invertirString("hello")); // "olleh"
console.log(invertirString("javascript")); // "tpircsavaj"

// 3. Evaluar expresion postfix
function evaluarPostfix(expresion) {
    const stack = new Stack();
    const operandos = expresion.split(' ');
    
    for (const token of operandos) {
        if ('+-*/'.includes(token)) {
            const b = stack.pop();
            const a = stack.pop();
            
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(a / b); break;
            }
        } else {
            stack.push(parseFloat(token));
        }
    }
    
    return stack.pop();
}

console.log(evaluarPostfix("3 4 + 2 *")); // 14
console.log(evaluarPostfix("5 1 2 + 4 * + 3 -")); // 14

// 4. Convertir decimal a binario
function decimalABinario(numero) {
    const stack = new Stack();
    
    while (numero > 0) {
        stack.push(numero % 2);
        numero = Math.floor(numero / 2);
    }
    
    let binario = '';
    while (!stack.estaVacio()) {
        binario += stack.pop();
    }
    
    return binario || '0';
}

console.log(decimalABinario(10)); // "1010"
console.log(decimalABinario(255)); // "11111111"
```

---

## 4. Queues

### Ejemplo 7: Queue basica

```javascript
class Queue {
    constructor() {
        this.items = [];
    }
    
    // Agregar al final - O(1) amortizado
    enqueue(elemento) {
        this.items.push(elemento);
    }
    
    // Remover del inicio - O(n)
    dequeue() {
        if (this.estaVacio()) {
            throw new Error("Queue vacia");
        }
        return this.items.shift();
    }
    
    // Ver primero sin remover - O(1)
    peek() {
        if (this.estaVacio()) {
            throw new Error("Queue vacia");
        }
        return this.items[0];
    }
    
    // Verificar si esta vacia - O(1)
    estaVacio() {
        return this.items.length === 0;
    }
    
    // Tamano - O(1)
    tamano() {
        return this.items.length;
    }
    
    // Vaciar - O(1)
    vaciar() {
        this.items = [];
    }
    
    // Imprimir - O(n)
    imprimir() {
        return this.items.join(' <- ');
    }
}

// Ejemplo de uso
const queue = new Queue();
queue.enqueue("A");
queue.enqueue("B");
queue.enqueue("C");

console.log(queue.peek()); // "A"
console.log(queue.dequeue()); // "A"
console.log(queue.imprimir()); // "B <- C"
console.log(queue.tamano()); // 2
```

### Ejemplo 8: Queue circular

```javascript
class QueueCircular {
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.items = new Array(capacidad);
        this.frente = -1;
        this.final = -1;
        this.tamanoActual = 0;
    }
    
    // Agregar al final - O(1)
    enqueue(elemento) {
        if (this.estaLleno()) {
            throw new Error("Queue llena");
        }
        
        this.final = (this.final + 1) % this.capacidad;
        this.items[this.final] = elemento;
        this.tamanoActual++;
        
        if (this.frente === -1) {
            this.frente = this.final;
        }
    }
    
    // Remover del frente - O(1)
    dequeue() {
        if (this.estaVacio()) {
            throw new Error("Queue vacia");
        }
        
        const elemento = this.items[this.frente];
        this.items[this.frente] = null;
        
        if (this.frente === this.final) {
            this.frente = -1;
            this.final = -1;
        } else {
            this.frente = (this.frente + 1) % this.capacidad;
        }
        
        this.tamanoActual--;
        return elemento;
    }
    
    // Ver frente - O(1)
    peek() {
        if (this.estaVacio()) {
            throw new Error("Queue vacia");
        }
        return this.items[this.frente];
    }
    
    estaVacio() {
        return this.tamanoActual === 0;
    }
    
    estaLleno() {
        return this.tamanoActual === this.capacidad;
    }
    
    tamano() {
        return this.tamanoActual;
    }
    
    imprimir() {
        if (this.estaVacio()) return "Queue vacia";
        
        let resultado = '';
        let i = this.frente;
        
        while (true) {
            resultado += this.items[i] + ' ';
            if (i === this.final) break;
            i = (i + 1) % this.capacidad;
        }
        
        return resultado.trim();
    }
}

// Ejemplo de uso
const queueCircular = new QueueCircular(5);
queueCircular.enqueue(1);
queueCircular.enqueue(2);
queueCircular.enqueue(3);

console.log(queueCircular.imprimir()); // "1 2 3"
console.log(queueCircular.dequeue()); // 1
console.log(queueCircular.peek()); // 2
```

### Ejemplo 9: Priority Queue

```javascript
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    // Agregar con prioridad - O(n)
    enqueue(elemento, prioridad) {
        const nuevoElemento = { elemento, prioridad };
        let agregado = false;
        
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].prioridad > prioridad) {
                this.items.splice(i, 0, nuevoElemento);
                agregado = true;
                break;
            }
        }
        
        if (!agregado) {
            this.items.push(nuevoElemento);
        }
    }
    
    // Remover el de mayor prioridad - O(1)
    dequeue() {
        if (this.estaVacio()) {
            throw new Error("Priority Queue vacia");
        }
        return this.items.shift().elemento;
    }
    
    // Ver el de mayor prioridad - O(1)
    peek() {
        if (this.estaVacio()) {
            throw new Error("Priority Queue vacia");
        }
        return this.items[0].elemento;
    }
    
    estaVacio() {
        return this.items.length === 0;
    }
    
    tamano() {
        return this.items.length;
    }
    
    imprimir() {
        return this.items.map(item => 
            `${item.elemento} (prioridad: ${item.prioridad})`
        ).join(', ');
    }
}

// Ejemplo de uso
const pq = new PriorityQueue();
pq.enqueue("Tarea baja", 3);
pq.enqueue("Tarea urgente", 1);
pq.enqueue("Tarea media", 2);
pq.enqueue("Tarea critica", 0);

console.log(pq.imprimir());
// "Tarea critica (prioridad: 0), Tarea urgente (prioridad: 1), ..."

console.log(pq.dequeue()); // "Tarea critica"
console.log(pq.dequeue()); // "Tarea urgente"
```

---

## 5. Hash Tables

### Ejemplo 10: Hash Table basica

```javascript
class HashTable {
    constructor(tamano = 53) {
        this.tabla = new Array(tamano);
        this.tamano = tamano;
    }
    
    // Funcion hash - O(k) donde k es longitud de la clave
    _hash(clave) {
        let total = 0;
        const PRIMO = 31;
        
        for (let i = 0; i < Math.min(clave.length, 100); i++) {
            const char = clave[i];
            const valor = char.charCodeAt(0) - 96;
            total = (total * PRIMO + valor) % this.tamano;
        }
        
        return total;
    }
    
    // Establecer par clave-valor - O(1) promedio
    set(clave, valor) {
        const indice = this._hash(clave);
        
        if (!this.tabla[indice]) {
            this.tabla[indice] = [];
        }
        
        // Buscar si la clave ya existe
        const parExistente = this.tabla[indice].find(p => p[0] === clave);
        
        if (parExistente) {
            parExistente[1] = valor;
        } else {
            this.tabla[indice].push([clave, valor]);
        }
    }
    
    // Obtener valor por clave - O(1) promedio
    get(clave) {
        const indice = this._hash(clave);
        const lista = this.tabla[indice];
        
        if (lista) {
            const par = lista.find(p => p[0] === clave);
            if (par) {
                return par[1];
            }
        }
        
        return undefined;
    }
    
    // Eliminar par - O(1) promedio
    delete(clave) {
        const indice = this._hash(clave);
        const lista = this.tabla[indice];
        
        if (lista) {
            const indicePar = lista.findIndex(p => p[0] === clave);
            if (indicePar !== -1) {
                lista.splice(indicePar, 1);
                return true;
            }
        }
        
        return false;
    }
    
    // Verificar si existe una clave - O(1) promedio
    has(clave) {
        return this.get(clave) !== undefined;
    }
    
    // Obtener todas las claves - O(n)
    keys() {
        const claves = [];
        
        for (const lista of this.tabla) {
            if (lista) {
                for (const [clave] of lista) {
                    claves.push(clave);
                }
            }
        }
        
        return claves;
    }
    
    // Obtener todos los valores - O(n)
    values() {
        const valores = [];
        
        for (const lista of this.tabla) {
            if (lista) {
                for (const [, valor] of lista) {
                    valores.push(valor);
                }
            }
        }
        
        return valores;
    }
}

// Ejemplo de uso
const ht = new HashTable();
ht.set("nombre", "Juan");
ht.set("edad", 25);
ht.set("ciudad", "Madrid");

console.log(ht.get("nombre")); // "Juan"
console.log(ht.get("edad")); // 25
console.log(ht.has("ciudad")); // true
console.log(ht.keys()); // ["nombre", "edad", "ciudad"]
console.log(ht.values()); // ["Juan", 25, "Madrid"]

ht.delete("edad");
console.log(ht.has("edad")); // false
```

### Ejemplo 11: Manejo de colisiones con encadenamiento

```javascript
// Ya implementado en el ejemplo anterior
// Cada indice de la tabla almacena una lista de pares [clave, valor]
// Cuando dos claves tienen el mismo hash, se agregan a la misma lista

// Ejemplo visual de colision:
// Indice 0: [[], [], []]
// Indice 1: [["nombre", "Juan"], ["edad", 25]]  <- Colision aqui
// Indice 2: [["ciudad", "Madrid"]]
// ...

// Otra tecnica: Address Opening (Linear Probing)
class HashTableOpenAddressing {
    constructor(tamano = 53) {
        this.tabla = new Array(tamano).fill(null);
        this.tamano = tamano;
        this.tamanoActual = 0;
    }
    
    _hash(clave) {
        let total = 0;
        const PRIMO = 31;
        
        for (let i = 0; i < Math.min(clave.length, 100); i++) {
            const char = clave[i];
            const valor = char.charCodeAt(0) - 96;
            total = (total * PRIMO + valor) % this.tamano;
        }
        
        return total;
    }
    
    _sondeoLineal(indice) {
        return (indice + 1) % this.tamano;
    }
    
    set(clave, valor) {
        if (this.tamanoActual >= this.tamano * 0.7) {
            this._redimensionar();
        }
        
        let indice = this._hash(clave);
        
        while (this.tabla[indice] !== null && 
               this.tabla[indice].clave !== clave) {
            indice = this._sondeoLineal(indice);
        }
        
        if (this.tabla[indice] === null) {
            this.tamanoActual++;
        }
        
        this.tabla[indice] = { clave, valor };
    }
    
    get(clave) {
        let indice = this._hash(clave);
        let intentos = 0;
        
        while (this.tabla[indice] !== null && intentos < this.tamano) {
            if (this.tabla[indice].clave === clave) {
                return this.tabla[indice].valor;
            }
            indice = this._sondeoLineal(indice);
            intentos++;
        }
        
        return undefined;
    }
    
    _redimensionar() {
        const nuevaTabla = new HashTableOpenAddressing(this.tamano * 2);
        
        for (const item of this.tabla) {
            if (item !== null) {
                nuevaTabla.set(item.clave, item.valor);
            }
        }
        
        this.tabla = nuevaTabla.tabla;
        this.tamano = nuevaTabla.tamano;
    }
}
```

---

## 6. Trees

### Ejemplo 12: Binary Tree

```javascript
class NodoArbol {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}

class ArbolBinario {
    constructor() {
        this.raiz = null;
    }
    
    // Insertar valor - O(log n) promedio
    insertar(valor) {
        const nuevoNodo = new NodoArbol(valor);
        
        if (!this.raiz) {
            this.raiz = nuevoNodo;
            return this;
        }
        
        let actual = this.raiz;
        
        while (true) {
            if (valor === actual.valor) return undefined;
            
            if (valor < actual.valor) {
                if (!actual.izquierdo) {
                    actual.izquierdo = nuevoNodo;
                    return this;
                }
                actual = actual.izquierdo;
            } else {
                if (!actual.derecho) {
                    actual.derecho = nuevoNodo;
                    return this;
                }
                actual = actual.derecho;
            }
        }
    }
    
    // Buscar valor - O(log n) promedio
    buscar(valor) {
        let actual = this.raiz;
        
        while (actual) {
            if (valor === actual.valor) return actual;
            actual = valor < actual.valor ? actual.izquierdo : actual.derecho;
        }
        
        return null;
    }
    
    // Encontrar minimo - O(log n)
    minimo(nodo = this.raiz) {
        while (nodo && nodo.izquierdo) {
            nodo = nodo.izquierdo;
        }
        return nodo;
    }
    
    // Encontrar maximo - O(log n)
    maximo(nodo = this.raiz) {
        while (nodo && nodo.derecho) {
            nodo = nodo.derecho;
        }
        return nodo;
    }
    
    // Recorrido en orden (in-order) - O(n)
    enOrden(nodo = this.raiz, resultado = []) {
        if (nodo) {
            this.enOrden(nodo.izquierdo, resultado);
            resultado.push(nodo.valor);
            this.enOrden(nodo.derecho, resultado);
        }
        return resultado;
    }
    
    // Recorrido pre-orden - O(n)
    preOrden(nodo = this.raiz, resultado = []) {
        if (nodo) {
            resultado.push(nodo.valor);
            this.preOrden(nodo.izquierdo, resultado);
            this.preOrden(nodo.derecho, resultado);
        }
        return resultado;
    }
    
    // Recorrido post-orden - O(n)
    postOrden(nodo = this.raiz, resultado = []) {
        if (nodo) {
            this.postOrden(nodo.izquierdo, resultado);
            this.postOrden(nodo.derecho, resultado);
            resultado.push(nodo.valor);
        }
        return resultado;
    }
    
    // BFS (Amplitud) - O(n)
    bfs() {
        if (!this.raiz) return [];
        
        const resultado = [];
        const cola = [this.raiz];
        
        while (cola.length > 0) {
            const nodo = cola.shift();
            resultado.push(nodo.valor);
            
            if (nodo.izquierdo) cola.push(nodo.izquierdo);
            if (nodo.derecho) cola.push(nodo.derecho);
        }
        
        return resultado;
    }
    
    // DFS (Profundidad) - O(n)
    dfs() {
        const resultado = [];
        
        function recorrer(nodo) {
            if (!nodo) return;
            resultado.push(nodo.valor);
            recorrer(nodo.izquierdo);
            recorrer(nodo.derecho);
        }
        
        recorrer(this.raiz);
        return resultado;
    }
}

// Ejemplo de uso
const arbol = new ArbolBinario();
[10, 5, 15, 3, 7, 12, 18].forEach(v => arbol.insertar(v));

//         10
//        /  \
//       5    15
//      / \   / \
//     3   7 12  18

console.log(arbol.enOrden()); // [3, 5, 7, 10, 12, 15, 18]
console.log(arbol.preOrden()); // [10, 5, 3, 7, 15, 12, 18]
console.log(arbol.postOrden()); // [3, 7, 5, 12, 18, 15, 10]
console.log(arbol.bfs()); // [10, 5, 15, 3, 7, 12, 18]
console.log(arbol.minimo()); // {valor: 3, ...}
console.log(arbol.maximo()); // {valor: 18, ...}
```

---

## 7. Graphs

### Ejemplo 13: Grafo con lista de adyacencia

```javascript
class Grafo {
    constructor() {
        this.listaAdyacencia = {};
    }
    
    // Agregar vertice - O(1)
    agregarVertice(vertice) {
        if (!this.listaAdyacencia[vertice]) {
            this.listaAdyacencia[vertice] = [];
        }
    }
    
    // Agregar arista - O(1)
    agregarArista(vertice1, vertice2, peso = 1) {
        this.agregarVertice(vertice1);
        this.agregarVertice(vertice2);
        
        this.listaAdyacencia[vertice1].push({ vertice: vertice2, peso });
        this.listaAdyacencia[vertice2].push({ vertice: vertice1, peso });
    }
    
    // Eliminar arista - O(E)
    eliminarArista(vertice1, vertice2) {
        this.listaAdyacencia[vertice1] = 
            this.listaAdyacencia[vertice1].filter(v => v.vertice !== vertice2);
        this.listaAdyacencia[vertice2] = 
            this.listaAdyacencia[vertice2].filter(v => v.vertice !== vertice1);
    }
    
    // Eliminar vertice - O(V + E)
    eliminarVertice(vertice) {
        while (this.listaAdyacencia[vertice]?.length) {
            const adyacente = this.listaAdyacencia[vertice].pop();
            this.eliminarArista(vertice, adyacente.vertice);
        }
        
        delete this.listaAdyacencia[vertice];
    }
    
    // BFS - O(V + E)
    bfs(inicio) {
        const visitados = new Set();
        const resultado = [];
        const cola = [inicio];
        
        visitados.add(inicio);
        
        while (cola.length > 0) {
            const vertice = cola.shift();
            resultado.push(vertice);
            
            for (const adyacente of this.listaAdyacencia[vertice]) {
                if (!visitados.has(adyacente.vertice)) {
                    visitados.add(adyacente.vertice);
                    cola.push(adyacente.vertice);
                }
            }
        }
        
        return resultado;
    }
    
    // DFS - O(V + E)
    dfs(inicio) {
        const visitados = new Set();
        const resultado = [];
        
        function recorrer(vertice) {
            visitados.add(vertice);
            resultado.push(vertice);
            
            for (const adyacente of this.listaAdyacencia[vertice]) {
                if (!visitados.has(adyacente.vertice)) {
                    recorrer(adyacente.vertice);
                }
            }
        }
        
        recorrer(inicio);
        return resultado;
    }
    
    // DFS iterativo - O(V + E)
    dfsIterativo(inicio) {
        const visitados = new Set();
        const resultado = [];
        const pila = [inicio];
        
        while (pila.length > 0) {
            const vertice = pila.pop();
            
            if (!visitados.has(vertice)) {
                visitados.add(vertice);
                resultado.push(vertice);
                
                for (const adyacente of this.listaAdyacencia[vertice]) {
                    pila.push(adyacente.vertice);
                }
            }
        }
        
        return resultado;
    }
    
    // Verificar si hay camino - O(V + E)
    hayCamino(inicio, fin) {
        const visitados = new Set();
        const cola = [inicio];
        
        visitados.add(inicio);
        
        while (cola.length > 0) {
            const vertice = cola.shift();
            
            if (vertice === fin) return true;
            
            for (const adyacente of this.listaAdyacencia[vertice]) {
                if (!visitados.has(adyacente.vertice)) {
                    visitados.add(adyacente.vertice);
                    cola.push(adyacente.vertice);
                }
            }
        }
        
        return false;
    }
    
    // Camino mas corto (BFS) - O(V + E)
    caminoMasCorto(inicio, fin) {
        const visitados = new Set();
        const cola = [[inicio]];
        
        visitados.add(inicio);
        
        while (cola.length > 0) {
            const camino = cola.shift();
            const vertice = camino[camino.length - 1];
            
            if (vertice === fin) return camino;
            
            for (const adyacente of this.listaAdyacencia[vertice]) {
                if (!visitados.has(adyacente.vertice)) {
                    visitados.add(adyacente.vertice);
                    cola.push([...camino, adyacente.vertice]);
                }
            }
        }
        
        return null;
    }
    
    // Dijkstra (camino mas corto con pesos) - O((V + E) log V)
    dijkstra(inicio, fin) {
        const distancias = {};
        const anteriores = {};
        const noVisitados = new Set(Object.keys(this.listaAdyacencia));
        
        for (const vertice of Object.keys(this.listaAdyacencia)) {
            distancias[vertice] = Infinity;
        }
        distancias[inicio] = 0;
        
        while (noVisitados.size > 0) {
            let verticeActual = null;
            let distanciaMinima = Infinity;
            
            for (const vertice of noVisitados) {
                if (distancias[vertice] < distanciaMinima) {
                    distanciaMinima = distancias[vertice];
                    verticeActual = vertice;
                }
            }
            
            if (verticeActual === null) break;
            
            noVisitados.delete(verticeActual);
            
            if (verticeActual === fin) {
                const camino = [];
                let actual = fin;
                
                while (actual) {
                    camino.unshift(actual);
                    actual = anteriores[actual];
                }
                
                return { camino, distancia: distancias[fin] };
            }
            
            for (const adyacente of this.listaAdyacencia[verticeActual]) {
                const distancia = distancias[verticeActual] + adyacente.peso;
                
                if (distancia < distancias[adyacente.vertice]) {
                    distancias[adyacente.vertice] = distancia;
                    anteriores[adyacente.vertice] = verticeActual;
                }
            }
        }
        
        return { camino: null, distancia: Infinity };
    }
    
    // Imprimir grafo
    imprimir() {
        for (const vertice of Object.keys(this.listaAdyacencia)) {
            const adyacentes = this.listaAdyacencia[vertice]
                .map(a => `${a.vertice}(${a.peso})`)
                .join(', ');
            console.log(`${vertice} -> ${adyacentes}`);
        }
    }
}

// Ejemplo de uso
const grafo = new Grafo();
grafo.agregarArista('A', 'B', 4);
grafo.agregarArista('A', 'C', 2);
grafo.agregarArista('B', 'D', 3);
grafo.agregarArista('C', 'D', 1);
grafo.agregarArista('C', 'E', 5);
grafo.agregarArista('D', 'E', 2);

grafo.imprimir();
// A -> B(4), C(2)
// B -> A(4), D(3)
// C -> A(2), D(1), E(5)
// D -> B(3), C(1), E(2)
// E -> C(5), D(2)

console.log(grafo.bfs('A')); // ['A', 'B', 'C', 'D', 'E']
console.log(grafo.dfs('A')); // ['A', 'B', 'D', 'C', 'E']
console.log(grafo.caminoMasCorto('A', 'E')); // ['A', 'C', 'D', 'E']
console.log(grafo.dijkstra('A', 'E')); 
// { camino: ['A', 'C', 'D', 'E'], distancia: 5 }
```

### Ejemplo 14: Grafo con matriz de adyacencia

```javascript
class GrafoMatriz {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.matriz = Array(numVertices).fill(null)
            .map(() => Array(numVertices).fill(0));
    }
    
    agregarArista(v1, v2, peso = 1) {
        this.matriz[v1][v2] = peso;
        this.matriz[v2][v1] = peso;
    }
    
    eliminarArista(v1, v2) {
        this.matriz[v1][v2] = 0;
        this.matriz[v2][v1] = 0;
    }
    
    hayArista(v1, v2) {
        return this.matriz[v1][v2] !== 0;
    }
    
    adyacentes(vertice) {
        const resultado = [];
        
        for (let i = 0; i < this.numVertices; i++) {
            if (this.matriz[vertice][i] !== 0) {
                resultado.push(i);
            }
        }
        
        return resultado;
    }
    
    imprimir() {
        for (let i = 0; i < this.numVertices; i++) {
            console.log(`${i}: ${this.matriz[i].join(', ')}`);
        }
    }
}

// Ejemplo de uso
const grafoMatriz = new GrafoMatriz(5);
grafoMatriz.agregarArista(0, 1);
grafoMatriz.agregarArista(0, 2);
grafoMatriz.agregarArista(1, 3);
grafoMatriz.agregarArista(2, 4);

grafoMatriz.imprimir();
// 0: 0, 1, 1, 0, 0
// 1: 1, 0, 0, 1, 0
// 2: 1, 0, 0, 0, 1
// 3: 0, 1, 0, 0, 0
// 4: 0, 0, 1, 0, 0

console.log(grafoMatriz.adyacentes(0)); // [1, 2]
console.log(grafoMatriz.hayArista(0, 1)); // true
console.log(grafoMatriz.hayArista(0, 3)); // false
```

---

## 8. Cuando usar cada estructura de datos

### Ejemplo 15: Guia de seleccion

```javascript
// ARRAY
// - Acceso aleatorio por indice: O(1)
// - Busqueda: O(n)
// - Insercion/Eliminacion al final: O(1) amortizado
// - Insercion/Eliminacion al inicio: O(n)
// USO: Cuando necesitas acceso rapido por indice

// LINKED LIST
// - Acceso por indice: O(n)
// - Busqueda: O(n)
// - Insercion/Eliminacion al inicio: O(1)
// USO: Cuando necesitas insercion/eliminacion frecuente al inicio

// STACK
// - Push/Pop: O(1)
// - Peek: O(1)
// USO: LIFO - Historial, undo, recursion

// QUEUE
// - Enqueue/Dequeue: O(1) amortizado
// - Peek: O(1)
// USO: FIFO - Colas de impresion, BFS, scheduling

// HASH TABLE
// - Get/Set/Delete: O(1) promedio
// USO: Busquedas rapidas, cache, conteo

// BST
// - Insercion/Busqueda/Eliminacion: O(log n) promedio
// USO: Datos ordenados, rangos, succesor/predecesor

// GRAFO
// - Varia segun representacion
// USO: Relaciones, redes, rutas

// Ejemplo practico: Encontrar duplicados
function encontrarDuplicados(arr) {
    const frecuencias = new Map(); // Hash Table
    
    for (const num of arr) {
        frecuencias.set(num, (frecuencias.get(num) || 0) + 1);
    }
    
    return [...frecuencias.entries()]
        .filter(([_, count]) => count > 1)
        .map(([num]) => num);
}

// Ejemplo practico: Historial de navegador (Stack)
class HistorialNavegador {
    constructor() {
        this.historial = [];
        this.indiceActual = -1;
    }
    
    visitar(url) {
        this.historial = this.historial.slice(0, this.indiceActual + 1);
        this.historial.push(url);
        this.indiceActual++;
    }
    
    retroceder() {
        if (this.indiceActual > 0) {
            this.indiceActual--;
            return this.historial[this.indiceActual];
        }
        return null;
    }
    
    avanzar() {
        if (this.indiceActual < this.historial.length - 1) {
            this.indiceActual++;
            return this.historial[this.indiceActual];
        }
        return null;
    }
    
    paginaActual() {
        return this.historial[this.indiceActual];
    }
}
```

---

## Buenas practicas

1. Elige la estructura segun la operacion principal que necesites
2. Los Arrays son versatiles pero lentos para insercion/eliminacion al inicio
3. Las Linked Lists son ideales para insercion/eliminacion frecuente
4. Los Stacks y Queues son fundamentales para algoritmos como BFS/DFS
5. Las Hash Tables son excelentes para busquedas O(1)
6. Los BST mantienen datos ordenados con operaciones eficientes
7. Los Grafos modelan relaciones complejas
8. Considera el costo de memoria junto con el tiempo

---

## Ejercicios

### Ejercicio 1 (5 puntos)
Implementa un Stack que pueda obtener el elemento minimo en O(1) tiempo.

### Ejercicio 2 (5 puntos)
Implementa una Queue usando dos Stacks.

### Ejercicio 3 (5 puntos)
Escribe una funcion que verifique si un arbol binario es un BST valido.

### Ejercicio 4 (5 puntos)
Implementa una Hash Table que maneje colisiones con probing cuadratico.

### Ejercicio 5 (5 puntos)
Escribe una funcion que encuentre el camino mas largo en un grafo aciclico dirigido.

### Ejercicio 6 (5 puntos)
Implementa un LFU (Least Frequently Used) Cache usando Hash Table y Linked Lists.

---

## Soluciones

### Solucion Ejercicio 1

```javascript
class StackMinimo {
    constructor() {
        this.items = [];
        this.minimos = [];
    }
    
    push(valor) {
        this.items.push(valor);
        
        if (this.minimos.length === 0 || valor <= this.minimos[this.minimos.length - 1]) {
            this.minimos.push(valor);
        }
    }
    
    pop() {
        if (this.estaVacio()) {
            throw new Error("Stack vacio");
        }
        
        const valor = this.items.pop();
        
        if (valor === this.minimos[this.minimos.length - 1]) {
            this.minimos.pop();
        }
        
        return valor;
    }
    
    minimo() {
        if (this.minimos.length === 0) {
            throw new Error("Stack vacio");
        }
        return this.minimos[this.minimos.length - 1];
    }
    
    peek() {
        return this.items[this.items.length - 1];
    }
    
    estaVacio() {
        return this.items.length === 0;
    }
    
    tamano() {
        return this.items.length;
    }
}

// Ejemplo de uso
const stackMin = new StackMinimo();
stackMin.push(5);
stackMin.push(3);
stackMin.push(7);
stackMin.push(1);

console.log(stackMin.minimo()); // 1
stackMin.pop();
console.log(stackMin.minimo()); // 3

// Complejidad:
// Push: O(1)
// Pop: O(1)
// Minimo: O(1)
// Espacio: O(n)
```

### Solucion Ejercicio 2

```javascript
class QueueConStacks {
    constructor() {
        this.stackEntrada = [];
        this.stackSalida = [];
    }
    
    enqueue(valor) {
        this.stackEntrada.push(valor);
    }
    
    dequeue() {
        if (this.estaVacio()) {
            throw new Error("Queue vacia");
        }
        
        if (this.stackSalida.length === 0) {
            while (this.stackEntrada.length > 0) {
                this.stackSalida.push(this.stackEntrada.pop());
            }
        }
        
        return this.stackSalida.pop();
    }
    
    peek() {
        if (this.estaVacio()) {
            throw new Error("Queue vacia");
        }
        
        if (this.stackSalida.length === 0) {
            while (this.stackEntrada.length > 0) {
                this.stackSalida.push(this.stackEntrada.pop());
            }
        }
        
        return this.stackSalida[this.stackSalida.length - 1];
    }
    
    estaVacio() {
        return this.stackEntrada.length === 0 && this.stackSalida.length === 0;
    }
    
    tamano() {
        return this.stackEntrada.length + this.stackSalida.length;
    }
}

// Ejemplo de uso
const queueStacks = new QueueConStacks();
queueStacks.enqueue(1);
queueStacks.enqueue(2);
queueStacks.enqueue(3);

console.log(queueStacks.dequeue()); // 1
console.log(queueStacks.peek()); // 2
console.log(queueStacks.dequeue()); // 2
console.log(queueStacks.dequeue()); // 3
console.log(queueStacks.estaVacio()); // true

// Complejidad:
// Enqueue: O(1)
// Dequeue: O(n) amortizado (cada elemento se mueve una vez)
// Peek: O(n) amortizado
// Espacio: O(n)
```

### Solucion Ejercicio 3

```javascript
function esBSTValido(raiz) {
    function validar(nodo, minimo, maximo) {
        if (!nodo) return true;
        
        if (nodo.valor <= minimo || nodo.valor >= maximo) {
            return false;
        }
        
        return validar(nodo.izquierdo, minimo, nodo.valor) &&
               validar(nodo.derecho, nodo.valor, maximo);
    }
    
    return validar(raiz, -Infinity, Infinity);
}

// Version con in-order traversal
function esBSTValidoInOrder(raiz) {
    let anterior = -Infinity;
    
    function inOrder(nodo) {
        if (!nodo) return true;
        
        if (!inOrder(nodo.izquierdo)) return false;
        
        if (nodo.valor <= anterior) return false;
        anterior = nodo.valor;
        
        return inOrder(nodo.derecho);
    }
    
    return inOrder(raiz);
}

// Ejemplo de uso
// Arbol valido:
//       10
//      /  \
//     5    15
//    / \   / \
//   2   7 12  20

const arbolValido = new ArbolBinario();
[10, 5, 15, 2, 7, 12, 20].forEach(v => arbolValido.insertar(v));
console.log(esBSTValido(arbolValido.raiz)); // true

// Arbol invalido:
//       10
//      /  \
//     5    15
//    / \   / \
//   2   12 7  20  <- 12 > 10 pero esta en subarbol izquierdo

const arbolInvalido = new ArbolBinario();
arbolInvalido.raiz = new NodoArbol(10);
arbolInvalido.raiz.izquierdo = new NodoArbol(5);
arbolInvalido.raiz.derecho = new NodoArbol(15);
arbolInvalido.raiz.izquierdo.izquierdo = new NodoArbol(2);
arbolInvalido.raiz.izquierdo.derecho = new NodoArbol(12);
arbolInvalido.raiz.derecho.izquierdo = new NodoArbol(7);
arbolInvalido.raiz.derecho.derecho = new NodoArbol(20);

console.log(esBSTValido(arbolInvalido.raiz)); // false

// Complejidad:
// Tiempo: O(n) - Visitamos cada nodo una vez
// Espacio: O(h) - h = altura del arbol (recursion)
```

### Solucion Ejercicio 4

```javascript
class HashTableProbingCuadratico {
    constructor(tamano = 53) {
        this.tabla = new Array(tamano).fill(null);
        this.tamano = tamano;
        this.tamanoActual = 0;
        this.ELIMINADO = Symbol('ELIMINADO');
    }
    
    _hash(clave) {
        let total = 0;
        const PRIMO = 31;
        
        for (let i = 0; i < Math.min(clave.length, 100); i++) {
            const char = clave[i];
            const valor = char.charCodeAt(0) - 96;
            total = (total * PRIMO + valor) % this.tamano;
        }
        
        return total;
    }
    
    set(clave, valor) {
        if (this.tamanoActual >= this.tamano * 0.7) {
            this._redimensionar();
        }
        
        let indice = this._hash(clave);
        let i = 0;
        
        while (i < this.tamano) {
            const indicePrueba = (indice + i * i) % this.tamano;
            
            if (this.tabla[indicePrueba] === null || 
                this.tabla[indicePrueba] === this.ELIMINADO) {
                this.tabla[indicePrueba] = { clave, valor };
                this.tamanoActual++;
                return;
            }
            
            if (this.tabla[indicePrueba].clave === clave) {
                this.tabla[indicePrueba].valor = valor;
                return;
            }
            
            i++;
        }
    }
    
    get(clave) {
        let indice = this._hash(clave);
        let i = 0;
        
        while (i < this.tamano) {
            const indicePrueba = (indice + i * i) % this.tamano;
            
            if (this.tabla[indicePrueba] === null) {
                return undefined;
            }
            
            if (this.tabla[indicePrueba] !== this.ELIMINADO &&
                this.tabla[indicePrueba].clave === clave) {
                return this.tabla[indicePrueba].valor;
            }
            
            i++;
        }
        
        return undefined;
    }
    
    delete(clave) {
        let indice = this._hash(clave);
        let i = 0;
        
        while (i < this.tamano) {
            const indicePrueba = (indice + i * i) % this.tamano;
            
            if (this.tabla[indicePrueba] === null) {
                return false;
            }
            
            if (this.tabla[indicePrueba] !== this.ELIMINADO &&
                this.tabla[indicePrueba].clave === clave) {
                this.tabla[indicePrueba] = this.ELIMINADO;
                this.tamanoActual--;
                return true;
            }
            
            i++;
        }
        
        return false;
    }
    
    _redimensionar() {
        const nuevaTabla = new HashTableProbingCuadratico(this.tamano * 2);
        
        for (const item of this.tabla) {
            if (item !== null && item !== this.ELIMINADO) {
                nuevaTabla.set(item.clave, item.valor);
            }
        }
        
        this.tabla = nuevaTabla.tabla;
        this.tamano = nuevaTabla.tamano;
    }
    
    keys() {
        const claves = [];
        
        for (const item of this.tabla) {
            if (item !== null && item !== this.ELIMINADO) {
                claves.push(item.clave);
            }
        }
        
        return claves;
    }
}

// Ejemplo de uso
const htCuadratico = new HashTableProbingCuadratico();
htCuadratico.set("a", 1);
htCuadratico.set("b", 2);
htCuadratico.set("c", 3);
htCuadratico.set("d", 4);

console.log(htCuadratico.get("a")); // 1
console.log(htCuadratico.get("b")); // 2

htCuadratico.delete("b");
console.log(htCuadratico.get("b")); // undefined
console.log(htCuadratico.keys()); // ["a", "c", "d"]
```

### Solucion Ejercicio 5

```javascript
function caminoMasLargo(grafo) {
    const vertices = Object.keys(grafo.listaAdyacencia);
    const distancias = {};
    const precedentes = {};
    
    // Inicializar distancias
    for (const vertice of vertices) {
        distancias[vertice] = 0;
        precedentes[vertice] = null;
    }
    
    // Encontrar vertices con indegree 0
    const indegree = {};
    for (const vertice of vertices) {
        indegree[vertice] = 0;
    }
    
    for (const vertice of vertices) {
        for (const adyacente of grafo.listaAdyacencia[vertice]) {
            indegree[adyacente.vertice]++;
        }
    }
    
    // BFS desde vertices fuente
    const cola = [];
    for (const vertice of vertices) {
        if (indegree[vertice] === 0) {
            cola.push(vertice);
        }
    }
    
    while (cola.length > 0) {
        const vertice = cola.shift();
        
        for (const adyacente of grafo.listaAdyacencia[vertice]) {
            if (distancias[adyacente.vertice] < distancias[vertice] + 1) {
                distancias[adyacente.vertice] = distancias[vertice] + 1;
                precedentes[adyacente.vertice] = vertice;
            }
            
            indegree[adyacente.vertice]--;
            if (indegree[adyacente.vertice] === 0) {
                cola.push(adyacente.vertice);
            }
        }
    }
    
    // Encontrar el vertice con mayor distancia
    let verticeLargo = vertices[0];
    for (const vertice of vertices) {
        if (distancias[vertice] > distancias[verticeLargo]) {
            verticeLargo = vertice;
        }
    }
    
    // Reconstruir camino
    const camino = [];
    let actual = verticeLargo;
    
    while (actual) {
        camino.unshift(actual);
        actual = precedentes[actual];
    }
    
    return {
        camino,
        longitud: distancias[verticeLargo]
    };
}

// Ejemplo de uso
const grafoAciclico = new Grafo();
grafoAciclico.agregarArista('A', 'B');
grafoAciclico.agregarArista('B', 'C');
grafoAciclico.agregarArista('C', 'D');
grafoAciclico.agregarArista('A', 'E');
grafoAciclico.agregarArista('E', 'F');
grafoAciclico.agregarArista('F', 'D');

console.log(caminoMasLargo(grafoAciclico));
// { camino: ['A', 'B', 'C', 'D'], longitud: 3 }

// Complejidad:
// Tiempo: O(V + E)
// Espacio: O(V)
```

### Solucion Ejercicio 6

```javascript
class LFUCache {
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.cache = new Map();
        this.frecuencias = new Map();
        this.minFrecuencia = 0;
    }
    
    get(clave) {
        if (!this.cache.has(clave)) {
            return -1;
        }
        
        const nodo = this.cache.get(clave);
        this._actualizarFrecuencia(clave);
        
        return nodo.valor;
    }
    
    put(clave, valor) {
        if (this.capacidad === 0) return;
        
        if (this.cache.has(clave)) {
            const nodo = this.cache.get(clave);
            nodo.valor = valor;
            this._actualizarFrecuencia(clave);
            return;
        }
        
        if (this.cache.size >= this.capacidad) {
            this._eliminarMenosFrecuente();
        }
        
        this.cache.set(clave, { valor, frecuencia: 1 });
        
        if (!this.frecuencias.has(1)) {
            this.frecuencias.set(1, new Set());
        }
        this.frecuencias.get(1).add(clave);
        
        this.minFrecuencia = 1;
    }
    
    _actualizarFrecuencia(clave) {
        const nodo = this.cache.get(clave);
        const freq = nodo.frecuencia;
        
        this.frecuencias.get(freq).delete(clave);
        
        if (this.frecuencias.get(freq).size === 0) {
            this.frecuencias.delete(freq);
            if (this.minFrecuencia === freq) {
                this.minFrecuencia = freq + 1;
            }
        }
        
        nodo.frecuencia = freq + 1;
        
        if (!this.frecuencias.has(freq + 1)) {
            this.frecuencias.set(freq + 1, new Set());
        }
        this.frecuencias.get(freq + 1).add(clave);
    }
    
    _eliminarMenosFrecuente() {
        const claves = this.frecuencias.get(this.minFrecuencia);
        const claveEliminar = claves.values().next().value;
        
        claves.delete(claveEliminar);
        this.cache.delete(claveEliminar);
        
        if (claves.size === 0) {
            this.frecuencias.delete(this.minFrecuencia);
        }
    }
    
    tamano() {
        return this.cache.size;
    }
}

// Ejemplo de uso
const lfu = new LFUCache(3);

lfu.put('a', 1);
lfu.put('b', 2);
lfu.put('c', 3);

console.log(lfu.get('a')); // 1
console.log(lfu.get('b')); // 2

lfu.put('d', 4); // Elimina 'c' (menos frecuente)

console.log(lfu.get('c')); // -1 (eliminado)
console.log(lfu.get('d')); // 4

// Complejidad:
// Get: O(1)
// Put: O(1)
// Espacio: O(capacidad)
```
