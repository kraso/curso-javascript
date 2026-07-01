# Leccion 1: Algoritmos y Complejidad

## Objetivos de aprendizaje

- [ ] Comprender que es el analisis de algoritmos
- [ ] Dominar la notacion Big O y su significado
- [ ] Analizar la complejidad temporal y espacial de algoritmos
- [ ] Distinguier entre mejor caso, peor caso y caso promedio
- [ ] Aplicar tecnicas de analisis a algoritmos comunes en JavaScript
- [ ] Entender el analisis amortizado
- [ ] Reconocer compromisos espacio-tiempo

---

## 1. Que es el Analisis de Algoritmos

El analisis de algoritmos es el proceso de determinar la cantidad de recursos (tiempo y memoria) que un algoritmo necesita para resolver un problema de tamano dado.

### Por que es importante?

- Permite comparar algoritmos de manera objetiva
- Ayuda a predecir el comportamiento con datos grandes
- Es fundamental para escribir codigo eficiente

### Ejemplo 1: Dos algoritmos que resuelven lo mismo

```javascript
// Algoritmo 1: Buscar en un arreglo desordenado
function buscarLineal(arr, objetivo) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === objetivo) {
            return i;
        }
    }
    return -1;
}

// Algoritmo 2: Buscar en un arreglo ordenado (binaria)
function buscarBinaria(arr, objetivo) {
    let izquierda = 0;
    let derecha = arr.length - 1;
    
    while (izquierda <= derecha) {
        let medio = Math.floor((izquierda + derecha) / 2);
        if (arr[medio] === objetivo) {
            return medio;
        } else if (arr[medio] < objetivo) {
            izquierda = medio + 1;
        } else {
            derecha = medio - 1;
        }
    }
    return -1;
}

// Con 1,000,000 de elementos:
// Buscar lineal: hasta 1,000,000 comparaciones
// Buscar binaria: maximo 20 comparaciones
```

### Ejemplo 2: Comparacion visual

```javascript
// Funcion que cuenta operaciones
function contarOperaciones(n) {
    let contador = 0;
    
    // O(1) - Operacion constante
    contador += 1;
    
    // O(n) - Operacion lineal
    for (let i = 0; i < n; i++) {
        contador += 1;
    }
    
    // O(n^2) - Operacion cuadratica
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            contador += 1;
        }
    }
    
    return contador;
}

// n=10: O(1)=1, O(n)=10, O(n^2)=100
// n=100: O(1)=1, O(n)=100, O(n^2)=10,000
// n=1000: O(1)=1, O(n)=1000, O(n^2)=1,000,000
```

---

## 2. Notacion Big O

Big O describe el crecimiento maximo de un algoritmo en relacion con el tamano de la entrada.

### Jerarquia comun de complejidades

```
O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(n^3) < O(2^n) < O(n!)
```

### Ejemplo 3: O(1) - Complejidad Constante

```javascript
// Acceso por indice en un arreglo
function获取PrimerElemento(arr) {
    return arr[0]; // Siempre 1 operacion
}

// Operaciones hash
function hashmapGet(hashmap, key) {
    return hashmap[key]; // O(1) en promedio
}

// Operaciones aritmeticas basicas
function sumar(a, b) {
    return a + b; // Siempre 1 operacion
}
```

### Ejemplo 4: O(log n) - Complejidad Logaritmica

```javascript
// Busqueda binaria
function busquedaBinaria(arr, objetivo) {
    let izquierda = 0;
    let derecha = arr.length - 1;
    
    while (izquierda <= derecha) {
        let medio = Math.floor((izquierda + derecha) / 2);
        
        if (arr[medio] === objetivo) {
            return medio;
        } else if (arr[medio] < objetivo) {
            izquierda = medio + 1;
        } else {
            derecha = medio - 1;
        }
    }
    
    return -1;
}

// Cada paso reduce el tamano a la mitad
// 1000 elementos -> 10 pasos maximo
// 1,000,000 elementos -> 20 pasos maximo
```

### Ejemplo 5: O(n) - Complejidad Lineal

```javascript
// Busqueda lineal
function busquedaLineal(arr, objetivo) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === objetivo) {
            return i;
        }
    }
    return -1;
}

// Encontrar el maximo
function encontrarMaximo(arr) {
    let maximo = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maximo) {
            maximo = arr[i];
        }
    }
    return maximo;
}

// Copiar un arreglo
function copiarArreglo(arr) {
    const copia = [];
    for (let i = 0; i < arr.length; i++) {
        copia.push(arr[i]);
    }
    return copia;
}
```

### Ejemplo 6: O(n log n) - Complejidad Lineal-logaritmica

```javascript
// Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const medio = Math.floor(arr.length / 2);
    const izquierda = arr.slice(0, medio);
    const derecha = arr.slice(medio);
    
    return merge(mergeSort(izquierda), mergeSort(derecha));
}

function merge(izquierda, derecha) {
    let resultado = [];
    let i = 0;
    let j = 0;
    
    while (i < izquierda.length && j < derecha.length) {
        if (izquierda[i] <= derecha[j]) {
            resultado.push(izquierda[i]);
            i++;
        } else {
            resultado.push(derecha[j]);
            j++;
        }
    }
    
    return resultado.concat(izquierda.slice(i)).concat(derecha.slice(j));
}

// Quick Sort promedio tambien es O(n log n)
```

### Ejemplo 7: O(n^2) - Complejidad Cuadratica

```javascript
// Bubble Sort
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Selection Sort
function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}

// Comparar todos los pares
function compararTodosPares(arr) {
    const pares = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            pares.push([arr[i], arr[j]]);
        }
    }
    return pares;
}
```

### Ejemplo 8: O(2^n) y O(n!)

```javascript
// Fibonacci recursivo (O(2^n))
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Subconjuntos de un conjunto (O(2^n))
function subconjuntos(arr) {
    if (arr.length === 0) return [[]];
    
    const primero = arr[0];
    const resto = arr.slice(1);
    const sinPrimero = subconjuntos(resto);
    const conPrimero = sinPrimero.map(sub => [primero, ...sub]);
    
    return [...sinPrimero, ...conPrimero];
}

// Factorial (O(n!))
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Permutaciones (O(n!))
function permutaciones(arr) {
    if (arr.length <= 1) return [arr];
    
    const resultado = [];
    for (let i = 0; i < arr.length; i++) {
        const resto = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const permutacionesResto = permutaciones(resto);
        
        for (const perm of permutacionesResto) {
            resultado.push([arr[i], ...perm]);
        }
    }
    return resultado;
}
```

---

## 3. Complejidad Temporal vs Espacial

### Ejemplo 9: Analisis temporal

```javascript
// Funcion con complejidad O(n)
function sumarElementos(arr) {
    let suma = 0; // O(1) espacio adicional
    for (let i = 0; i < arr.length; i++) { // O(n) tiempo
        suma += arr[i];
    }
    return suma;
}

// Funcion con complejidad O(1) tiempo, O(n) espacio
function crearArregloDuplicado(arr) {
    const duplicado = []; // O(n) espacio
    for (let i = 0; i < arr.length; i++) {
        duplicado.push(arr[i] * 2);
    }
    return duplicado;
}
```

### Ejemplo 10: Analisis espacial

```javascript
// O(1) espacio - In-place
function invertirArreglo(arr) {
    let izquierda = 0;
    let derecha = arr.length - 1;
    
    while (izquierda < derecha) {
        [arr[izquierda], arr[derecha]] = [arr[derecha], arr[izquierda]];
        izquierda++;
        derecha--;
    }
    return arr;
}

// O(n) espacio - Crea nuevo arreglo
function invertirArregloNuevo(arr) {
    const invertido = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        invertido.push(arr[i]);
    }
    return invertido;
}

// O(n^2) espacio - Matriz
function crearMatriz(n) {
    const matriz = [];
    for (let i = 0; i < n; i++) {
        matriz[i] = [];
        for (let j = 0; j < n; j++) {
            matriz[i][j] = i * n + j;
        }
    }
    return matriz;
}
```

---

## 4. Mejor Caso, Peor Caso y Caso Promedio

### Ejemplo 11: Analisis de casos

```javascript
// Busqueda lineal
function busquedaLineal(arr, objetivo) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === objetivo) {
            return i;
        }
    }
    return -1;
}

// Mejor caso: O(1) - El objetivo esta en la primera posicion
// Peor caso: O(n) - El objetivo esta en la ultima posicion o no existe
// Caso promedio: O(n/2) = O(n) - En promedio mitad del arreglo

// Bubble Sort con optimizacion
function bubbleSortOptimizado(arr) {
    const n = arr.length;
    let intercambiado;
    
    for (let i = 0; i < n; i++) {
        intercambiado = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                intercambiado = true;
            }
        }
        // Si no hubo intercambios, esta ordenado
        if (!intercambiado) break;
    }
    return arr;
}

// Mejor caso: O(n) - Arreglo ya ordenado
// Peor caso: O(n^2) - Arreglo en orden inverso
// Caso promedio: O(n^2)
```

### Ejemplo 12: Quick Sort - Analisis de casos

```javascript
function quickSort(arr, izquierda = 0, derecha = arr.length - 1) {
    if (izquierda < derecha) {
        const indicePivote = particion(arr, izquierda, derecha);
        quickSort(arr, izquierda, indicePivote - 1);
        quickSort(arr, indicePivote + 1, derecha);
    }
    return arr;
}

function particion(arr, izquierda, derecha) {
    const pivote = arr[derecha];
    let i = izquierda - 1;
    
    for (let j = izquierda; j < derecha; j++) {
        if (arr[j] <= pivote) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[derecha]] = [arr[derecha], arr[i + 1]];
    return i + 1;
}

// Mejor caso: O(n log n) - Pivote siempre divide al medio
// Peor caso: O(n^2) - Arreglo ya ordenado (con pivote ultimo)
// Caso promedio: O(n log n)
```

---

## 5. Tecnica de Analisis

### Ejemplo 13: Paso a paso

```javascript
function analizarComplejidad(arr) {
    let suma = 0;                    // 1 operacion O(1)
    let producto = 1;                // 1 operacion O(1)
    
    for (let i = 0; i < arr.length; i++) {  // n iteraciones
        suma += arr[i];              // 1 operacion por iteracion
        producto *= arr[i];          // 1 operacion por iteracion
    }
    
    // Total: 1 + 1 + n*(1+1) = 2 + 2n = O(n)
    
    for (let i = 0; i < arr.length; i++) {  // n iteraciones
        for (let j = 0; j < arr.length; j++) { // n iteraciones
            suma += arr[i] + arr[j]; // 2 operaciones por iteracion
        }
    }
    
    // Total anterior + n*n*2 = O(n) + O(n^2) = O(n^2)
    
    return { suma, producto };
}

// Regla: En sumas de complejidades, nos quedamos con la mayor
// O(1) + O(n) + O(n^2) = O(n^2)
```

### Ejemplo 14: Analisis de funciones anidadas

```javascript
function ejemploAnidado(arr) {
    // O(n)
    for (let i = 0; i < arr.length; i++) {
        // O(log n) - Busqueda binaria en cada iteracion
        let izquierda = 0;
        let derecha = arr.length - 1;
        
        while (izquierda <= derecha) {
            let medio = Math.floor((izquierda + derecha) / 2);
            if (arr[medio] === arr[i]) {
                break;
            } else if (arr[medio] < arr[i]) {
                izquierda = medio + 1;
            } else {
                derecha = medio - 1;
            }
        }
    }
    // Total: O(n) * O(log n) = O(n log n)
}

function otroEjemplo(matriz) {
    // O(n) iteraciones
    for (let i = 0; i < matriz.length; i++) {
        // O(m) iteraciones
        for (let j = 0; j < matriz[i].length; j++) {
            // O(1) operacion
            console.log(matriz[i][j]);
        }
    }
    // Total: O(n * m) donde n = filas, m = columnas
}
```

---

## 6. Analisis Amortizado

El analisis amortizado promedio el costo de operaciones a largo plazo, no operacion por operacion.

### Ejemplo 15: Array.push() en JavaScript

```javascript
// push() es O(1) amortizado, aunque ocasionalmente es O(n)
// cuando el arreglo necesita redimensionarse

function demostrarAmortizado() {
    const arr = [];
    let capacidad = 1;
    let operaciones = 0;
    
    for (let i = 0; i < 16; i++) {
        arr.push(i);
        operaciones++;
        
        // Cuando se llena, se crea nuevo arreglo (copiar todo)
        if (arr.length === capacidad) {
            capacidad *= 2; // Duplicar capacidad
            // Aqui serian O(n) operaciones para copiar
        }
    }
    
    // Aunque hay O(n) copias, cada elemento se copia solo unas pocas veces
    // Total amortizado: O(1) por push()
    return operaciones;
}

// Otro ejemplo: vector dinamico
class VectorDinamico {
    constructor() {
        this.capacidad = 1;
        this.tamano = 0;
        this.datos = new Array(this.capacidad);
    }
    
    // O(1) amortizado
    agregar(elemento) {
        if (this.tamano === this.capacidad) {
            this.redimensionar();
        }
        this.datos[this.tamano] = elemento;
        this.tamano++;
    }
    
    // O(n) pero ocurre raramente
    redimensionar() {
        const nuevaCapacidad = this.capacidad * 2;
        const nuevosDatos = new Array(nuevaCapacidad);
        
        for (let i = 0; i < this.tamano; i++) {
            nuevosDatos[i] = this.datos[i];
        }
        
        this.datos = nuevosDatos;
        this.capacidad = nuevaCapacidad;
    }
    
    obtener indice() {
        return this.datos[indice];
    }
    
    obtenerTamano() {
        return this.tamano;
    }
}
```

### Ejemplo 16: Stack con redimensionamiento

```javascript
class Stack {
    constructor() {
        this.items = [];
        this.capacidad = 10;
    }
    
    // O(1) amortizado
    push(elemento) {
        if (this.items.length === this.capacidad) {
            this.capacidad *= 2;
        }
        this.items.push(elemento);
    }
    
    // O(1) siempre
    pop() {
        if (this.estaVacio()) {
            throw new Error("Stack vacio");
        }
        return this.items.pop();
    }
    
    // O(1) siempre
    peek() {
        if (this.estaVacio()) {
            throw new Error("Stack vacio");
        }
        return this.items[this.items.length - 1];
    }
    
    estaVacio() {
        return this.items.length === 0;
    }
    
    tamaño() {
        return this.items.length;
    }
}
```

---

## 7. Compromisos Espacio-Tiempo

### Ejemplo 17: Espacio vs Tiempo

```javascript
// Version con menos tiempo, mas espacio: O(n) tiempo, O(n) espacio
function contarFrecuencias(arr) {
    const frecuencias = {}; // O(n) espacio adicional
    
    for (let i = 0; i < arr.length; i++) { // O(n) tiempo
        const elemento = arr[i];
        frecuencias[elemento] = (frecuencias[elemento] || 0) + 1;
    }
    
    return frecuencias;
}

// Version con menos espacio, mas tiempo: O(n^2) tiempo, O(1) espacio
function contarFrecuenciasLento(arr) {
    const resultado = [];
    
    for (let i = 0; i < arr.length; i++) { // O(n)
        let encontrado = false;
        
        for (let j = 0; j < resultado.length; j++) { // O(n)
            if (resultado[j].elemento === arr[i]) {
                resultado[j].frecuencia++;
                encontrado = true;
                break;
            }
        }
        
        if (!encontrado) {
            resultado.push({ elemento: arr[i], frecuencia: 1 });
        }
    }
    
    return resultado;
}
```

### Ejemplo 18: Cache de resultados (Memoizacion)

```javascript
// Sin memoizacion: O(2^n) tiempo, O(n) espacio
function fibonacciSinMemo(n) {
    if (n <= 1) return n;
    return fibonacciSinMemo(n - 1) + fibonacciSinMemo(n - 2);
}

// Con memoizacion: O(n) tiempo, O(n) espacio
function fibonacciConMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacciConMemo(n - 1, memo) + fibonacciConMemo(n - 2, memo);
    return memo[n];
}

// Sin memoizacion: O(n!) tiempo, O(n) espacio
function permutacionesSinMemo(arr) {
    if (arr.length <= 1) return [arr];
    
    const resultado = [];
    for (let i = 0; i < arr.length; i++) {
        const resto = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const permutacionesResto = permutacionesSinMemo(resto);
        
        for (const perm of permutacionesResto) {
            resultado.push([arr[i], ...perm]);
        }
    }
    return resultado;
}

// Con memoizacion: O(n^2) tiempo, O(n^2) espacio
function permutacionesConMemo(arr, memo = {}) {
    const clave = arr.join(',');
    if (clave in memo) return memo[clave];
    if (arr.length <= 1) return [arr];
    
    const resultado = [];
    for (let i = 0; i < arr.length; i++) {
        const resto = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const permutacionesResto = permutacionesConMemo(resto, memo);
        
        for (const perm of permutacionesResto) {
            resultado.push([arr[i], ...perm]);
        }
    }
    
    memo[clave] = resultado;
    return resultado;
}
```

### Ejemplo 19: Precomputacion vs Calculo en linea

```javascript
// Sin precomputacion: O(q * n) tiempo, O(1) espacio
function sumasRangoSinPrecomputacion(arr, consultas) {
    const resultados = [];
    
    for (const [inicio, fin] of consultas) { // q consultas
        let suma = 0;
        for (let i = inicio; i <= fin; i++) { // n elementos
            suma += arr[i];
        }
        resultados.push(suma);
    }
    
    return resultados;
}

// Con precomputacion: O(n + q) tiempo, O(n) espacio
function sumasRangoConPrecomputacion(arr, consultas) {
    // Precomputar sumas acumuladas
    const sumaAcumulada = [0];
    for (let i = 0; i < arr.length; i++) {
        sumaAcumulada[i + 1] = sumaAcumulada[i] + arr[i];
    }
    
    // Responder consultas en O(1)
    const resultados = [];
    for (const [inicio, fin] of consultas) {
        resultados.push(sumaAcumulada[fin + 1] - sumaAcumulada[inicio]);
    }
    
    return resultados;
}
```

---

## Buenas practicas

1. Siempre analiza la complejidad antes de implementar
2. Usa la notacion Big O para comunicar complejidad
3. Considera tanto tiempo como espacio
4. Para problemas grandes, evita O(n^2) y peor
5. Usa memoizacion cuando haya subproblemas repetidos
6. Prefiere algoritmos in-place cuando el espacio sea critico
7. Entiende el analisis amortizado para operaciones de coleccion
8. Documenta la complejidad de funciones importantes

---

## Ejercicios

### Ejercicio 1 (5 puntos)
Escribe una funcion que encuentre todos los pares de numeros en un arreglo que sumen un objetivo determinado. Analiza la complejidad temporal y espacial.

### Ejercicio 2 (5 puntos)
Implementa una funcion que determine si un string es un palindromo usando recursion. Analiza los tres casos (mejor, peor, promedio).

### Ejercicio 3 (5 puntos)
Escribe una funcion que cuente las ocurrencias de cada caractere en un string y devuelva el mas frecuente. Analiza compromisos espacio-tiempo.

### Ejercicio 4 (5 puntos)
Implementa una funcion que genere todos los subconjuntos de un conjunto dado. Analiza su complejidad.

### Ejercicio 5 (5 puntos)
Dada una matriz NxN, escribe una funcion que la rote 90 grados en sentido horario. Analiza complejidad temporal y espacial.

### Ejercicio 6 (5 puntos)
Implementa una funcion que determine si hay duplicados en un arreglo en O(n) tiempo y O(1) espacio (sin usar Set ni Object).

---

## Soluciones

### Solucion Ejercicio 1

```javascript
function encontrarPares(arr, objetivo) {
    const pares = [];
    const vistos = new Set();
    
    for (let i = 0; i < arr.length; i++) {
        const complemento = objetivo - arr[i];
        
        if (vistos.has(complemento)) {
            pares.push([complemento, arr[i]]);
        }
        
        vistos.add(arr[i]);
    }
    
    return pares;
}

// Ejemplo de uso
console.log(encontrarPares([1, 2, 3, 4, 5], 6)); // [[1,5], [2,4]]
console.log(encontrarPares([1, 1, 2, 3], 4)); // [[1,3], [1,3]]

// Complejidad:
// Tiempo: O(n) - Una sola pasada por el arreglo
// Espacio: O(n) - Para el Set de numeros vistos
```

### Solucion Ejercicio 2

```javascript
function esPalindromo(str) {
    // Caso base
    if (str.length <= 1) return true;
    
    // Comparar primer y ultimo caracter
    if (str[0] !== str[str.length - 1]) {
        return false;
    }
    
    // Llamada recursiva con el substring interno
    return esPalindromo(str.substring(1, str.length - 1));
}

// Version iterativa
function esPalindromoIterativo(str) {
    let izquierda = 0;
    let derecha = str.length - 1;
    
    while (izquierda < derecha) {
        if (str[izquierda] !== str[derecha]) {
            return false;
        }
        izquierda++;
        derecha--;
    }
    
    return true;
}

// Ejemplo de uso
console.log(esPalindromo("racecar")); // true
console.log(esPalindromo("hello")); // false
console.log(esPalindromo("")); // true
console.log(esPalindromo("a")); // true

// Analisis de casos:
// Mejor caso: O(1) - Primer y ultimo caracteres diferentes
// Peor caso: O(n/2) = O(n) - Palindromo completo
// Caso promedio: O(n/2) = O(n)
// Espacio: O(n/2) = O(n) por la recursion (iterativo es O(1))
```

### Solucion Ejercicio 3

```javascript
function caracterMasFrecuente(str) {
    const frecuencias = {};
    let maxFrecuencia = 0;
    let caracterMasComun = '';
    
    // Contar frecuencias
    for (const char of str) {
        frecuencias[char] = (frecuencias[char] || 0) + 1;
        
        if (frecuencias[char] > maxFrecuencia) {
            maxFrecuencia = frecuencias[char];
            caracterMasComun = char;
        }
    }
    
    return { caracter: caracterMasComun, frecuencia: maxFrecuencia };
}

// Version sin objeto auxiliar (menos espacio)
function caracterMasFrecuenteOptimizado(str) {
    const caracteres = str.split('').sort();
    let maxFrecuencia = 1;
    let frecuenciaActual = 1;
    let caracterMasComun = caracteres[0];
    
    for (let i = 1; i < caracteres.length; i++) {
        if (caracteres[i] === caracteres[i - 1]) {
            frecuenciaActual++;
            if (frecuenciaActual > maxFrecuencia) {
                maxFrecuencia = frecuenciaActual;
                caracterMasComun = caracteres[i];
            }
        } else {
            frecuenciaActual = 1;
        }
    }
    
    return { caracter: caracterMasComun, frecuencia: maxFrecuencia };
}

// Ejemplo de uso
console.log(caracterMasFrecuente("hello world")); 
// { caracter: 'l', frecuencia: 3 }

console.log(caracterMasFrecuente("javascript")); 
// { caracter: 'a', frecuencia: 2 }

// Analisis:
// Version 1: O(n) tiempo, O(k) espacio (k = caracteres unicos)
// Version 2: O(n log n) tiempo, O(1) espacio adicional
```

### Solucion Ejercicio 4

```javascript
function subconjuntos(arr) {
    if (arr.length === 0) return [[]];
    
    const [primero, ...resto] = arr;
    const subconjuntosResto = subconjuntos(resto);
    
    const conPrimero = subconjuntosResto.map(sub => [primero, ...sub]);
    
    return [...subconjuntosResto, ...conPrimero];
}

// Version iterativa
function subconjuntosIterativo(arr) {
    const resultado = [[]];
    
    for (const elemento of arr) {
        const subconjuntosActuales = [];
        
        for (const subconjunto of resultado) {
            subconjuntosActuales.push([...subconjunto, elemento]);
        }
        
        resultado.push(...subconjuntosActuales);
    }
    
    return resultado;
}

// Version con bitmask
function subconjuntosBitmask(arr) {
    const n = arr.length;
    const resultado = [];
    
    for (let i = 0; i < (1 << n); i++) {
        const subconjunto = [];
        
        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                subconjunto.push(arr[j]);
            }
        }
        
        resultado.push(subconjunto);
    }
    
    return resultado;
}

// Ejemplo de uso
console.log(subconjuntos([1, 2, 3]));
// [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

console.log(subconjuntosBitmask(['a', 'b']));
// [[], ['a'], ['b'], ['a', 'b']]

// Complejidad:
// Tiempo: O(2^n * n) - 2^n subconjuntos, cada uno de tamano promedio n
// Espacio: O(2^n * n) - Para almacenar todos los subconjuntos
```

### Solucion Ejercicio 5

```javascript
function rotarMatriz90(matriz) {
    const n = matriz.length;
    const resultado = [];
    
    for (let i = 0; i < n; i++) {
        resultado[i] = [];
        for (let j = 0; j < n; j++) {
            resultado[i][j] = matriz[n - 1 - j][i];
        }
    }
    
    return resultado;
}

// Version in-place (para matrices cuadradas)
function rotarMatriz90InPlace(matriz) {
    const n = matriz.length;
    
    // Transponer
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matriz[i][j], matriz[j][i]] = [matriz[j][i], matriz[i][j]];
        }
    }
    
    // Invertir cada fila
    for (let i = 0; i < n; i++) {
        matriz[i].reverse();
    }
    
    return matriz;
}

// Ejemplo de uso
const matriz1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(rotarMatriz90(matriz1));
// [[7, 4, 1], [8, 5, 2], [9, 6, 3]]

const matriz2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

rotarMatriz90InPlace(matriz2);
console.log(matriz2);
// [[7, 4, 1], [8, 5, 2], [9, 6, 3]]

// Complejidad:
// Tiempo: O(n^2) - Visitamos cada elemento una vez
// Espacio: O(n^2) para version nueva, O(1) para version in-place
```

### Solucion Ejercicio 6

```javascript
function tieneDuplicados(arr) {
    // Ordenar el arreglo primero
    arr.sort((a, b) => a - b);
    
    // Verificar elementos adyacentes
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
            return true;
        }
    }
    
    return false;
}

// Version con punteros (Floyd's cycle detection)
function tieneDuplicadosCiclo(arr) {
    if (arr.length <= 1) return false;
    
    let tortuga = 0;
    let liebre = 0;
    
    while (true) {
        tortuga = arr[tortuga];
        liebre = arr[arr[liebre]];
        
        if (tortuga === liebre) {
            return true;
        }
        
        if (liebre >= arr.length || arr[liebre] >= arr.length) {
            break;
        }
    }
    
    return false;
}

// Ejemplo de uso
console.log(tieneDuplicados([1, 2, 3, 4, 5])); // false
console.log(tieneDuplicados([1, 2, 3, 4, 5, 3])); // true
console.log(tieneDuplicados([])); // false
console.log(tieneDuplicados([1])); // false

// Complejidad:
// Tiempo: O(n log n) por la ordenacion
// Espacio: O(1) - In-place
// 
// Nota: Este ejercicio tiene una restriccion dificil.
// Sin usar Set ni Object, la mejor solucion es O(n log n).
// La solucion de Floyd's cycle detection asume valores
// en rango [0, n-1] y funciona en O(n) tiempo, O(1) espacio.
```
