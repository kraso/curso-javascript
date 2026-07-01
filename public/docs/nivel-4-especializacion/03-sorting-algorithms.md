# Leccion 3: Algoritmos de Ordenamiento

## Objetivos de aprendizaje

- [ ] Implementar Bubble Sort y sus optimizaciones
- [ ] Implementar Selection Sort
- [ ] Implementar Insertion Sort
- [ ] Implementar Merge Sort (divide y venceras)
- [ ] Implementar Quick Sort con diferentes estrategias de pivote
- [ ] Entender algoritmos de ordenamiento no comparativos
- [ ] Comparar y elegir el algoritmo adecuado
- [ ] Entender como funciona Array.sort() en JavaScript

---

## 1. Bubble Sort

### Ejemplo 1: Bubble Sort basico

```javascript
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

const numeros = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort([...numeros])); // [11, 12, 22, 25, 34, 64, 90]
```

### Ejemplo 2: Bubble Sort optimizado

```javascript
function bubbleSortOptimizado(arr) {
    const n = arr.length;
    let intercambiado;
    for (let i = 0; i < n - 1; i++) {
        intercambiado = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                intercambiado = true;
            }
        }
        if (!intercambiado) break;
    }
    return arr;
}

const arr1 = [1, 2, 3, 4, 5];
console.log(bubbleSortOptimizado([...arr1])); // [1, 2, 3, 4, 5] - Solo 1 pasada
```

### Ejemplo 3: Analisis de complejidad

```javascript
function bubbleSortConConteo(arr) {
    const n = arr.length;
    let intercambios = 0;
    let comparaciones = 0;
    for (let i = 0; i < n - 1; i++) {
        let intercambiado = false;
        for (let j = 0; j < n - i - 1; j++) {
            comparaciones++;
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                intercambios++;
                intercambiado = true;
            }
        }
        if (!intercambiado) break;
    }
    return { resultado: arr, intercambios, comparaciones };
}

// Mejor caso: O(n), Peor caso: O(n^2), Espacio: O(1), Estable: Si
```

---

## 2. Selection Sort

### Ejemplo 4: Selection Sort basico

```javascript
function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let indiceMinimo = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[indiceMinimo]) {
                indiceMinimo = j;
            }
        }
        if (indiceMinimo !== i) {
            [arr[i], arr[indiceMinimo]] = [arr[indiceMinimo], arr[i]];
        }
    }
    return arr;
}

const numeros = [64, 25, 12, 22, 11];
console.log(selectionSort([...numeros])); // [11, 12, 22, 25, 64]
```

### Ejemplo 5: Selection Sort detallado

```javascript
function selectionSortDetallado(arr) {
    const n = arr.length;
    let intercambios = 0;
    let comparaciones = 0;
    for (let i = 0; i < n - 1; i++) {
        let indiceMinimo = i;
        for (let j = i + 1; j < n; j++) {
            comparaciones++;
            if (arr[j] < arr[indiceMinimo]) {
                indiceMinimo = j;
            }
        }
        if (indiceMinimo !== i) {
            [arr[i], arr[indiceMinimo]] = [arr[indiceMinimo], arr[i]];
            intercambios++;
        }
    }
    return { resultado: arr, intercambios, comparaciones };
}

// Mejor caso: O(n^2), Peor caso: O(n^2), Espacio: O(1), Estable: No
```

---

## 3. Insertion Sort

### Ejemplo 6: Insertion Sort basico

```javascript
function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const elementoActual = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > elementoActual) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = elementoActual;
    }
    return arr;
}

const numeros = [12, 11, 13, 5, 6];
console.log(insertionSort([...numeros])); // [5, 6, 11, 12, 13]
```

### Ejemplo 7: Insertion Sort optimizado

```javascript
function insertionSortBinario(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const elementoActual = arr[i];
        let izquierda = 0;
        let derecha = i;
        while (izquierda < derecha) {
            const medio = Math.floor((izquierda + derecha) / 2);
            if (arr[medio] > elementoActual) {
                derecha = medio;
            } else {
                izquierda = medio + 1;
            }
        }
        for (let j = i; j > izquierda; j--) {
            arr[j] = arr[j - 1];
        }
        arr[izquierda] = elementoActual;
    }
    return arr;
}

function insertionSortPequeno(arr, izquierda = 0, derecha = arr.length - 1) {
    for (let i = izquierda + 1; i <= derecha; i++) {
        const elementoActual = arr[i];
        let j = i - 1;
        while (j >= izquierda && arr[j] > elementoActual) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = elementoActual;
    }
    return arr;
}

// Mejor caso: O(n), Peor caso: O(n^2), Espacio: O(1), Estable: Si
```

---

## 4. Merge Sort

### Ejemplo 8: Merge Sort basico

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const medio = Math.floor(arr.length / 2);
    const izquierda = arr.slice(0, medio);
    const derecha = arr.slice(medio);
    return merge(mergeSort(izquierda), mergeSort(derecha));
}

function merge(izquierda, derecha) {
    const resultado = [];
    let i = 0, j = 0;
    while (i < izquierda.length && j < derecha.length) {
        if (izquierda[i] <= derecha[j]) {
            resultado.push(izquierda[i++]);
        } else {
            resultado.push(derecha[j++]);
        }
    }
    while (i < izquierda.length) resultado.push(izquierda[i++]);
    while (j < derecha.length) resultado.push(derecha[j++]);
    return resultado;
}

const numeros = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort([...numeros])); // [3, 9, 10, 27, 38, 43, 82]
```

### Ejemplo 9: Merge Sort in-place

```javascript
function mergeSortInPlace(arr, izquierda = 0, derecha = arr.length - 1) {
    if (izquierda < derecha) {
        const medio = Math.floor((izquierda + derecha) / 2);
        mergeSortInPlace(arr, izquierda, medio);
        mergeSortInPlace(arr, medio + 1, derecha);
        mergeInPlace(arr, izquierda, medio, derecha);
    }
    return arr;
}

function mergeInPlace(arr, izquierda, medio, derecha) {
    const n1 = medio - izquierda + 1;
    const n2 = derecha - medio;
    const izq = arr.slice(izquierda, izquierda + n1);
    const der = arr.slice(medio + 1, medio + 1 + n2);
    let i = 0, j = 0, k = izquierda;
    while (i < n1 && j < n2) {
        if (izq[i] <= der[j]) arr[k++] = izq[i++];
        else arr[k++] = der[j++];
    }
    while (i < n1) arr[k++] = izq[i++];
    while (j < n2) arr[k++] = der[j++];
}

// Mejor caso: O(n log n), Peor caso: O(n log n), Espacio: O(n), Estable: Si
```

---

## 5. Quick Sort

### Ejemplo 10: Quick Sort basico

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

const numeros = [10, 7, 8, 9, 1, 5];
console.log(quickSort([...numeros])); // [1, 5, 7, 8, 9, 10]
```

### Ejemplo 11: Quick Sort con pivote aleatorio

```javascript
function quickSortAleatorio(arr, izquierda = 0, derecha = arr.length - 1) {
    if (izquierda < derecha) {
        const indicePivote = particionAleatorio(arr, izquierda, derecha);
        quickSortAleatorio(arr, izquierda, indicePivote - 1);
        quickSortAleatorio(arr, indicePivote + 1, derecha);
    }
    return arr;
}

function particionAleatorio(arr, izquierda, derecha) {
    const idx = Math.floor(Math.random() * (derecha - izquierda + 1)) + izquierda;
    [arr[idx], arr[derecha]] = [arr[derecha], arr[idx]];
    return particion(arr, izquierda, derecha);
}

// Mejor caso: O(n log n), Peor caso: O(n^2), Espacio: O(log n), Estable: No
```

---

## 6. Counting Sort

### Ejemplo 12: Counting Sort

```javascript
function countingSort(arr) {
    if (arr.length === 0) return arr;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const rango = max - min + 1;
    const conteo = new Array(rango).fill(0);
    for (const num of arr) conteo[num - min]++;
    const resultado = [];
    let indice = 0;
    for (let i = 0; i < rango; i++) {
        while (conteo[i] > 0) {
            resultado[indice++] = i + min;
            conteo[i]--;
        }
    }
    return resultado;
}

const numeros = [4, 2, 2, 8, 3, 3, 1];
console.log(countingSort([...numeros])); // [1, 2, 2, 3, 3, 4, 8]
```

### Ejemplo 13: Counting Sort para caracteres

```javascript
function countingSortCadena(str) {
    const caracteres = str.split('');
    const min = Math.min(...caracteres.map(c => c.charCodeAt(0)));
    const max = Math.max(...caracteres.map(c => c.charCodeAt(0)));
    const rango = max - min + 1;
    const conteo = new Array(rango).fill(0);
    for (const char of caracteres) conteo[char.charCodeAt(0) - min]++;
    let resultado = '';
    for (let i = 0; i < rango; i++) {
        resultado += String.fromCharCode(i + min).repeat(conteo[i]);
    }
    return resultado;
}

console.log(countingSortCadena("programming")); // "aggmmmnoprrr"
```

---

## 7. Radix Sort

### Ejemplo 14: Radix Sort

```javascript
function radixSort(arr) {
    if (arr.length === 0) return arr;
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortPorDigito(arr, exp);
    }
    return arr;
}

function countingSortPorDigito(arr, exp) {
    const n = arr.length;
    const salida = new Array(n);
    const conteo = new Array(10).fill(0);
    for (let i = 0; i < n; i++) {
        const digito = Math.floor(arr[i] / exp) % 10;
        conteo[digito]++;
    }
    for (let i = 1; i < 10; i++) conteo[i] += conteo[i - 1];
    for (let i = n - 1; i >= 0; i--) {
        const digito = Math.floor(arr[i] / exp) % 10;
        salida[conteo[digito] - 1] = arr[i];
        conteo[digito]--;
    }
    for (let i = 0; i < n; i++) arr[i] = salida[i];
}

const numeros = [170, 45, 75, 90, 802, 24, 2, 66];
console.log(radixSort([...numeros])); // [2, 24, 45, 66, 75, 90, 170, 802]
```

### Ejemplo 15: Radix Sort con negativos

```javascript
function radixSortConNegativos(arr) {
    const negativos = arr.filter(x => x < 0).map(x => Math.abs(x));
    const positivos = arr.filter(x => x >= 0);
    if (negativos.length > 0) {
        radixSort(negativos);
        negativos.reverse();
        negativos.forEach((x, i) => negativos[i] = -x);
    }
    if (positivos.length > 0) radixSort(positivos);
    return [...negativos, ...positivos];
}

const conNegativos = [-3, -1, -4, 1, 5, -9, 2, 6];
console.log(radixSortConNegativos([...conNegativos])); // [-9, -4, -3, -1, 1, 2, 5, 6]
```

---

## 8. Comparacion de algoritmos

### Ejemplo 16: Tabla comparativa

```javascript
function mostrarComparacion() {
    const algoritmos = [
        { nombre: "Bubble Sort", mejor: "O(n)", peor: "O(n^2)", promedio: "O(n^2)", espacio: "O(1)", estable: true },
        { nombre: "Selection Sort", mejor: "O(n^2)", peor: "O(n^2)", promedio: "O(n^2)", espacio: "O(1)", estable: false },
        { nombre: "Insertion Sort", mejor: "O(n)", peor: "O(n^2)", promedio: "O(n^2)", espacio: "O(1)", estable: true },
        { nombre: "Merge Sort", mejor: "O(n log n)", peor: "O(n log n)", promedio: "O(n log n)", espacio: "O(n)", estable: true },
        { nombre: "Quick Sort", mejor: "O(n log n)", peor: "O(n^2)", promedio: "O(n log n)", espacio: "O(log n)", estable: false },
        { nombre: "Counting Sort", mejor: "O(n+k)", peor: "O(n+k)", promedio: "O(n+k)", espacio: "O(k)", estable: true },
        { nombre: "Radix Sort", mejor: "O(d*n)", peor: "O(d*n)", promedio: "O(d*n)", espacio: "O(n+k)", estable: true }
    ];
    console.log("ALGORITMO         | MEJOR      | PEOR       | PROMEDIO   | ESPACIO | ESTABLE");
    console.log("-".repeat(85));
    for (const algo of algoritmos) {
        console.log(
            `${algo.nombre.padEnd(18)} | ${algo.mejor.padEnd(10)} | ${algo.peor.padEnd(10)} | ${algo.promedio.padEnd(10)} | ${algo.espacio.padEnd(7)} | ${algo.estable ? 'Si' : 'No'}`
        );
    }
}

mostrarComparacion();
```

### Ejemplo 17: Guia de seleccion

```javascript
function elegirAlgoritmo(requisitos) {
    const { tamano, estaOrdenado, rangoLimitado, necesitaEstabilidad, memoriaLimitada, tipoDatos } = requisitos;
    if (tamano < 10) return "Insertion Sort";
    if (tipoDatos === "entero" && rangoLimitado) {
        return necesitaEstabilidad ? "Counting Sort o Radix Sort" : "Radix Sort";
    }
    if (estaOrdenado) return "Insertion Sort o Bubble Sort";
    if (memoriaLimitada) return "Quick Sort (in-place)";
    if (necesitaEstabilidad) return "Merge Sort";
    return "Quick Sort";
}

console.log(elegirAlgoritmo({ tamano: 5, estaOrdenado: false, rangoLimitado: false, necesitaEstabilidad: false, memoriaLimitada: false, tipoDatos: "numero" }));
// "Insertion Sort"
```

---

## 9. Array.sort() en JavaScript

### Ejemplo 18: Como funciona Array.sort()

```javascript
// Array.sort() por defecto convierte a strings
const numeros = [10, 9, 80, 7, 100];
console.log([...numeros].sort()); // [10, 100, 7, 80, 9] - Orden lexicografico

// Para ordenar numeros, proporcionar funcion comparadora
console.log([...numeros].sort((a, b) => a - b)); // [7, 9, 10, 80, 100]
console.log([...numeros].sort((a, b) => b - a)); // [100, 80, 10, 9, 7]

// Ordenar strings
const frutas = ['manzana', 'naranja', 'platano', 'cereza'];
console.log([...frutas].sort()); // ['cereza', 'manzana', 'naranja', 'platano']

// Case sensitive
const letras = ['b', 'A', 'c', 'B', 'a'];
console.log([...letras].sort()); // ['A', 'B', 'a', 'b', 'c']
```

### Ejemplo 19: Array.sort() con objetos

```javascript
const personas = [
    { nombre: 'Juan', edad: 25 },
    { nombre: 'Maria', edad: 30 },
    { nombre: 'Pedro', edad: 20 }
];

// Por edad
console.log([...personas].sort((a, b) => a.edad - b.edad));
// [{nombre: 'Pedro', edad: 20}, {nombre: 'Juan', edad: 25}, {nombre: 'Maria', edad: 30}]

// Por nombre
console.log([...personas].sort((a, b) => a.nombre.localeCompare(b.nombre)));
// [{nombre: 'Juan', ...}, {nombre: 'Maria', ...}, {nombre: 'Pedro', ...}]

// Orden multiple
const datos = [
    { apellido: 'Garcia', edad: 25 },
    { apellido: 'Lopez', edad: 30 },
    { apellido: 'Garcia', edad: 20 }
];

console.log([...datos].sort((a, b) => {
    const comparacionApellido = a.apellido.localeCompare(b.apellido);
    if (comparacionApellido !== 0) return comparacionApellido;
    return a.edad - b.edad;
}));
// Ordena por apellido, luego por edad

// Ordenar con localeCompare para español
const nombres = ['zebra', 'apple', 'banana'];
console.log([...nombres].sort((a, b) => a.localeCompare(b, 'es')));
// ['apple', 'banana', 'zebra']
```

---

## Buenas practicas

1. Para arreglos pequenos (< 10), usa Insertion Sort
2. Para arreglos casi ordenados, usa Insertion Sort o Bubble Sort optimizado
3. Para estabilidad, usa Merge Sort
4. Para memoria limitada, usa Quick Sort
5. Para enteros con rango pequeno, usa Counting Sort o Radix Sort
6. En JavaScript, siempre usa funcion comparadora con Array.sort()
7. Quick Sort es generalmente el mas rapido en la practica
8. Entiende las caracteristicas de cada algoritmo antes de elegir

---

## Ejercicios

### Ejercicio 1 (5 puntos)
Implementa Merge Sort que ordene un array de objetos por una propiedad especifica.

### Ejercicio 2 (5 puntos)
Modifica Quick Sort para que funcione con strings usando localeCompare.

### Ejercicio 3 (5 puntos)
Implementa una funcion que determine si dos arrays son iguales despues de ordenarlos.

### Ejercicio 4 (5 puntos)
Crea una funcion que ordene un array usando dos algoritmos diferentes y compare sus tiempos de ejecucion.

### Ejercicio 5 (5 puntos)
Implementa Bucket Sort para ordenar numeros decimales entre 0 y 1.

### Ejercicio 6 (5 puntos)
Implementa Shell Sort y compara su rendimiento con Insertion Sort.

---

## Soluciones

### Solucion Ejercicio 1

```javascript
function mergeSortObjetos(arr, propiedad) {
    if (arr.length <= 1) return arr;
    const medio = Math.floor(arr.length / 2);
    const izquierda = arr.slice(0, medio);
    const derecha = arr.slice(medio);
    return mergeObjetos(mergeSortObjetos(izquierda, propiedad), mergeSortObjetos(derecha, propiedad), propiedad);
}

function mergeObjetos(izquierda, derecha, propiedad) {
    const resultado = [];
    let i = 0, j = 0;
    while (i < izquierda.length && j < derecha.length) {
        if (izquierda[i][propiedad] <= derecha[j][propiedad]) {
            resultado.push(izquierda[i++]);
        } else {
            resultado.push(derecha[j++]);
        }
    }
    while (i < izquierda.length) resultado.push(izquierda[i++]);
    while (j < derecha.length) resultado.push(derecha[j++]);
    return resultado;
}

const personas = [
    { nombre: 'Juan', edad: 25 },
    { nombre: 'Maria', edad: 30 },
    { nombre: 'Pedro', edad: 20 }
];

console.log(mergeSortObjetos([...personas], 'edad'));
// [{nombre: 'Pedro', edad: 20}, {nombre: 'Juan', edad: 25}, {nombre: 'Maria', edad: 30}]
```

### Solucion Ejercicio 2

```javascript
function quickSortStrings(arr, izquierda = 0, derecha = arr.length - 1) {
    if (izquierda < derecha) {
        const indicePivote = particionStrings(arr, izquierda, derecha);
        quickSortStrings(arr, izquierda, indicePivote - 1);
        quickSortStrings(arr, indicePivote + 1, derecha);
    }
    return arr;
}

function particionStrings(arr, izquierda, derecha) {
    const pivote = arr[derecha];
    let i = izquierda - 1;
    for (let j = izquierda; j < derecha; j++) {
        if (arr[j].localeCompare(pivote) <= 0) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[derecha]] = [arr[derecha], arr[i + 1]];
    return i + 1;
}

const palabras = ['manzana', 'naranja', 'platano', 'cereza', 'arandano'];
console.log(quickSortStrings([...palabras]));
// ['arandano', 'cereza', 'manzana', 'naranja', 'platano']
```

### Solucion Ejercicio 3

```javascript
function sonIgualesDespuesDeOrdenar(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = [...arr1].sort((a, b) => a - b);
    const sorted2 = [...arr2].sort((a, b) => a - b);
    return sorted1.every((val, idx) => val === sorted2[idx]);
}

console.log(sonIgualesDespuesDeOrdenar([3, 1, 2], [2, 3, 1])); // true
console.log(sonIgualesDespuesDeOrdenar([1, 2, 3], [1, 2, 4])); // false
console.log(sonIgualesDespuesDeOrdenar([], [])); // true
```

### Solucion Ejercicio 4

```javascript
function compararAlgoritmos(algoritmo1, algoritmo2, arr, nombre1, nombre2) {
    const arr1 = [...arr];
    const arr2 = [...arr];
    
    const inicio1 = performance.now();
    algoritmo1(arr1);
    const fin1 = performance.now();
    
    const inicio2 = performance.now();
    algoritmo2(arr2);
    const fin2 = performance.now();
    
    console.log(`${nombre1}: ${(fin1 - inicio1).toFixed(3)}ms`);
    console.log(`${nombre2}: ${(fin2 - inicio2).toFixed(3)}ms`);
    
    return {
        [nombre1]: fin1 - inicio1,
        [nombre2]: fin2 - inicio2,
        rapido: (fin1 - inicio1) < (fin2 - inicio2) ? nombre1 : nombre2
    };
}

const arrGrande = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10000));
console.log(compararAlgoritmos(bubbleSortOptimizado, insertionSort, arrGrande, "Bubble Sort", "Insertion Sort"));
```

### Solucion Ejercicio 5

```javascript
function bucketSort(arr, numBuckets = 10) {
    if (arr.length === 0) return arr;
    
    const buckets = Array.from({ length: numBuckets }, () => []);
    
    for (const num of arr) {
        const indice = Math.floor(num * numBuckets);
        buckets[Math.min(indice, numBuckets - 1)].push(num);
    }
    
    for (const bucket of buckets) {
        insertionSort(bucket);
    }
    
    return buckets.flat();
}

const decimales = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51];
console.log(bucketSort([...decimales]));
// [0.23, 0.25, 0.32, 0.42, 0.47, 0.51, 0.52]
```

### Solucion Ejercicio 6

```javascript
function shellSort(arr) {
    const n = arr.length;
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}

const arr = [12, 34, 54, 2, 3, 17, 25, 8];
console.log(shellSort([...arr])); // [2, 3, 8, 12, 17, 25, 34, 54]

// Comparar con Insertion Sort
const arrGrande = Array.from({ length: 5000 }, () => Math.floor(Math.random() * 5000));

const inicio1 = performance.now();
insertionSort([...arrGrande]);
const fin1 = performance.now();

const inicio2 = performance.now();
shellSort([...arrGrande]);
const fin2 = performance.now();

console.log(`Insertion Sort: ${(fin1 - inicio1).toFixed(3)}ms`);
console.log(`Shell Sort: ${(fin2 - inicio2).toFixed(3)}ms`);
```
