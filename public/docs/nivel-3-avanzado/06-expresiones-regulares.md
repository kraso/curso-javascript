# Leccion 6: Expresiones Regulares

## Objetivos de aprendizaje

- [ ] Comprender los fundamentos de las expresiones regulares
- [ ] Crear RegExp con sintaxis literal y constructor
- [ ] Dominar clases de caracteres
- [ ] Usar cuantificadores correctamente
- [ ] Aplicar anclas y limitadores de palabra
- [ ] Manejar grupos y captura
- [ ] Implementar lookahead y lookbehind
- [ ] Conocer patrones comunes (email, telefono, URL, etc.)
- [ ] Dominar metodos de RegExp en JavaScript
- [ ] Optimizar expresiones regulares

---

## 1. Fundamentos de RegExp

### 1.1 Crear Expresiones Regulares

```javascript
// Forma 1: Literal (recomendada)
const patron = /patron/;

// Forma 2: Constructor
const patron2 = new RegExp("patron");

// Con flags
const patronConFlags = /patron/gi;
const patronConFlags2 = new RegExp("patron", "gi");

// Diferencia: el literal evalua en tiempo de parseo
// El constructor evalua en tiempo de ejecucion
```

### 1.2 Metodos Principales

```javascript
const texto = "Hola mundo, hola JavaScript";

// test(): retorna true/false
console.log(/hola/i.test(texto)); // true
console.log(/python/.test(texto)); // false

// match(): retorna array de coincidencias
console.log(texto.match(/hola/gi)); // ["Hola", "hola"]

// search(): retorna indice de la primera coincidencia
console.log(texto.search(/mundo/)); // 5

// replace(): reemplaza coincidencias
console.log(texto.replace(/hola/gi, "adios")); // "adios mundo, adios JavaScript"

// split(): divide string basado en patron
console.log(texto.split(/,\s*/)); // ["Hola mundo", "hola JavaScript"]
```

---

## 2. Clases de Caracteres

### 2.1 Clases Basicas

```javascript
const texto = "Hola Mundo 123! @#$%";

// . (cualquier caracter excepto salto de linea)
console.log("a1b".match(/./g)); // ["a", "1", "b"]

// \d (digito: 0-9)
console.log(texto.match(/\d+/g)); // ["123"]

// \D (no digito)
console.log(texto.match(/\D+/g)); // ["Hola Mundo ", "! @#$%"]

// \w (caracter de palabra: a-z, A-Z, 0-9, _)
console.log(texto.match(/\w+/g)); // ["Hola", "Mundo", "123"]

// \W (no caracter de palabra)
console.log(texto.match(/\W+/g)); // [" ", " ", "! @#$%"]

// \s (espacio en blanco)
console.log(texto.match(/\s/g)); // [" ", " ", " "]

// \S (no espacio en blanco)
console.log(texto.match(/\S+/g)); // ["Hola", "Mundo", "123!", "@#$%"]
```

### 2.2 Conjuntos

```javascript
const texto = "Hola Mundo 123!@#";

// [abc] (a, b o c)
console.log(texto.match(/[aeiou]/gi)); // ["o", "a", "u", "n", "o"]

// [^abc] (no a, b ni c)
console.log(texto.match(/[^aeiou]/gi)); // ["H", "l", " ", "M", "n", "d", " ", "1", "2", "3", "!", "@", "#"]

// [a-z] (rango: de a a z)
console.log("abc123".match(/[a-z]+/g)); // ["abc"]

// [A-Z] (rango: de A a Z)
console.log("ABC123".match(/[A-Z]+/g)); // ["ABC"]

// [0-9] (rango: de 0 a 9)
console.log("abc123".match(/[0-9]+/g)); // ["123"]

// Combinar rangos
console.log("abcABC123".match(/[a-zA-Z0-9]+/g)); // ["abcABC123"]
```

### 2.3 Negacion de Conjuntos

```javascript
const texto = "abc123!@#";

// [^a-z] (no minusculas)
console.log(texto.match(/[^a-z]+/g)); // ["123!@#"]

// [^0-9] (no digitos)
console.log(texto.match(/[^0-9]+/g)); // ["abc!@#"]

// [^a-zA-Z] (no letras)
console.log(texto.match(/[^a-zA-Z]+/g)); // ["123!@#"]
```

---

## 3. Cuantificadores

### 3.1 Cuantificadores Basicos

```javascript
// * (cero o mas)
console.log("abc".match(/a*/g)); // ["a", "", "", ""]
console.log("aaa".match(/a*/g)); // ["aaa", "", ""]

// + (uno o mas)
console.log("abc".match(/a+/g)); // ["a"]
console.log("aaa".match(/a+/g)); // ["aaa"]

// ? (cero o uno)
console.log("abc".match(/a?/g)); // ["a", "", "", ""]
console.log("aac".match(/a?/g)); // ["a", "a", "", ""]

// {n} (exactamente n veces)
console.log("aabaa".match(/a{2}/g)); // ["aa", "aa"]

// {n,} (n o mas veces)
console.log("aabaa".match(/a{2,}/g)); // ["aa", "aa"]

// {n,m} (entre n y m veces)
console.log("aabaaa".match(/a{2,3}/g)); // ["aa", "aaa"]
```

### 3.2 Cuantificadores con Ejemplos

```javascript
// Validar longitud de password
const password = "abc123";
const patronPassword = /^.{8,}$/;
console.log(patronPassword.test(password)); // false (menos de 8 caracteres)

// Buscar numeros de 3 o mas digitos
const texto = "12 123 1234 12345";
console.log(texto.match(/\d{3,}/g)); // ["123", "1234", "12345"]

// Buscar palabras de exactamente 5 letras
const palabras = "hola mundo programacion js python";
console.log(palabras.match(/\b\w{5}\b/g)); // ["mundo"]
```

### 3.3 Cuantificadores Voraces vs Perezosos

```javascript
// Voraz (greedy): coincide con la mayor cantidad posible
const texto1 = "<div>contenido</div>";
console.log(texto1.match(/<.*>/g)); // ["<div>contenido</div>"]

// Perezoso (lazy): coincide con la menor cantidad posible
console.log(texto1.match(/<.*?>/g)); // ["<div>", "</div>"]

// Ejemplo practico
const html = '<p>parrafo 1</p><p>parrafo 2</p>';
console.log(html.match(/<p>.*?<\/p>/g)); // ["<p>parrafo 1</p>", "<p>parrafo 2</p>"]
```

---

## 4. Anclas y Limitadores de Palabra

### 4.1 Anclas

```javascript
// ^ (inicio del string)
console.log(/^Hola/.test("Hola mundo")); // true
console.log(/^Hola/.test("Adios mundo")); // false

// $ (fin del string)
console.log(/mundo$/.test("Hola mundo")); // true
console.log(/mundo$/.test("Hola")); // false

// ^ y $ juntos: coincidencia exacta
console.log(/^Hola mundo$/.test("Hola mundo")); // true
console.log(/^Hola mundo$/.test("Hola mundo!")); // false
```

### 4.2 Limitadores de Palabra

```javascript
// \b (limite de palabra)
console.log(/\bcat\b/.test("cat"));         // true
console.log(/\bcat\b/.test("cats"));         // false
console.log(/\bcat\b/.test("concatenar"));   // false

// \B (no limite de palabra)
console.log(/\Bcat\B/.test("concatenar"));   // true
console.log(/\Bcat\B/.test("cat"));          // false

// Ejemplo: buscar palabras completas
const texto = "cat cats concatenate cat";
console.log(texto.match(/\bcat\b/g)); // ["cat", "cat"]
console.log(texto.match(/\bcat\w*\b/g)); // ["cat", "cats", "concatenate"]
```

### 4.3 Ejemplos de Anclas

```javascript
// Validar que un string empiece y termice con letras
const patron = /^[a-zA-Z]+$/;
console.log(patron.test("abc")); // true
console.log(patron.test("abc123")); // false

// Validar que un string empiece con mayuscula
const patronMayuscula = /^[A-Z]/;
console.log(patronMayuscula.test("Hola")); // true
console.log(patronMayuscula.test("hola")); // false

// Validar que un string termice con punto
const patronPunto = /\.$/;
console.log(patronPunto.test("hola.")); // true
console.log(patronPunto.test("hola")); // false
```

---

## 5. Grupos y Captura

### 5.1 Grupos Basicos

```javascript
// Grupo basico: (...)
const fecha = "2024-01-15";
const patron = /(\d{4})-(\d{2})-(\d{2})/;
const coincidencia = fecha.match(patron);

console.log(coincidencia[0]); // "2024-01-15" (coincidencia completa)
console.log(coincidencia[1]); // "2024" (grupo 1: anio)
console.log(coincidencia[2]); // "01" (grupo 2: mes)
console.log(coincidencia[3]); // "15" (grupo 3: dia)

// Con grupos nombrados
const patronNombrado = /(?<anio>\d{4})-(?<mes>\d{2})-(?<dia>\d{2})/;
const coincidenciaNombrada = fecha.match(patronNombrado);

console.log(coincidenciaNombrada.groups.anio); // "2024"
console.log(coincidenciaNombrada.groups.mes);  // "01"
console.log(coincidenciaNombrada.groups.dia);  // "15"
```

### 5.2 Grupos sin Captura

```javascript
// (?:...) grupo sin captura
const texto = "abc123def456";
const patron = /(?:abc|def)(\d+)/;
const coincidencia = texto.match(patron);

console.log(coincidencia[0]); // "abc123"
console.log(coincidencia[1]); // "123" (solo captura los digitos)

// Diferencia con grupos normales
const patronConCaptura = /(abc|def)(\d+)/;
const coincidenciaConCaptura = texto.match(patronConCaptura);

console.log(coincidenciaConCaptura[0]); // "abc123"
console.log(coincidenciaConCaptura[1]); // "abc"
console.log(coincidenciaConCaptura[2]); // "123"
```

### 5.3 Backreferences

```javascript
// \1, \2, etc. referencian grupos anteriores
const patron = /(\w+)\s+\1/; // Buscar palabras repetidas
console.log(patron.test("hola hola")); // true
console.log(patron.test("hola mundo")); // false

// Ejemplo: encontrar pares de palabras iguales
const texto = "el gato come el raton el gato come";
const coincidencias = texto.match(/(\w+)\s+\1/g);
console.log(coincidencias); // ["el el"]
```

### 5.4 Grupos con Alterno

```javascript
// | (alternacion: OR)
const patron = /cat|dog|bird/;
console.log(patron.test("cat"));  // true
console.log(patron.test("dog"));  // true
console.log(patron.test("bird")); // true

// Con grupos
const patronComplejo = /(cat|dog)s?/;
console.log(patronComplejo.test("cats"));  // true
console.log(patronComplejo.test("dogs"));  // true
console.log(patronComplejo.test("bird"));  // false
```

---

## 6. Lookahead y Lookbehind

### 6.1 Lookahead Positivo

```javascript
// (?=...) lookahead positivo: busca lo que sigue
const texto = "100px 200px 300em";
const patron = /\d+(?=px)/;
console.log(texto.match(patron)); // ["100", "200"]

// Buscar numeros seguidos de px
console.log(texto.match(/\d+(?=px)/g)); // ["100", "200"]
```

### 6.2 Lookahead Negativo

```javascript
// (?!...) lookahead negativo: busca lo que NO sigue
const texto = "100px 200px 300em";
const patron = /\d+(?!px)/;
console.log(texto.match(patron)); // ["300"]

// Buscar numeros NO seguidos de px
console.log(texto.match(/\d+(?!px)/g)); // ["300"]
```

### 6.3 Lookbehind Positivo

```javascript
// (?<=...) lookbehind positivo: busca lo que precede
const texto = "$100 €200 $300";
const patron = /(?<=\$)\d+/;
console.log(texto.match(patron)); // ["100", "300"]

// Buscar numeros precedidos de $
console.log(texto.match(/(?<=\$)\d+/g)); // ["100", "300"]
```

### 6.4 Lookbehind Negativo

```javascript
// (?<!...) lookbehind negativo: busca lo que NO precede
const texto = "$100 €200 $300";
const patron = /(?<!\$)\d+/;
console.log(texto.match(patron)); // ["200"]

// Buscar numeros NO precedidos de $
console.log(texto.match(/(?<!\$)\d+/g)); // ["200"]
```

### 6.5 Ejemplos Combinados

```javascript
// Validar password con lookahead
function validarPassword(password) {
  const tieneMinuscula = /(?=.*[a-z])/.test(password);
  const tieneMayuscula = /(?=.*[A-Z])/.test(password);
  const tieneNumero = /(?=.*\d)/.test(password);
  const tieneEspecial = /(?=.*[!@#$%^&*])/.test(password);
  const longitudMinima = /^.{8,}$/.test(password);

  return tieneMinuscula && tieneMayuscula && tieneNumero && tieneEspecial && longitudMinima;
}

console.log(validarPassword("Abc123!@")); // true
console.log(validarPassword("abc123"));   // false
```

---

## 7. Patrones Comunes

### 7.1 Validar Email

```javascript
const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

console.log(patronEmail.test("usuario@email.com")); // true
console.log(patronEmail.test("usuario.name@email.co")); // true
console.log(patronEmail.test("invalido@")); // false
console.log(patronEmail.test("@email.com")); // false
```

### 7.2 Validar Telefono

```javascript
// Formato: (123) 456-7890 o 123-456-7890 o 1234567890
const patronTelefono = /^(\(\d{3}\)\s?|\d{3}[-.]?)\d{3}[-.]?\d{4}$/;

console.log(patronTelefono.test("(123) 456-7890")); // true
console.log(patronTelefono.test("123-456-7890")); // true
console.log(patronTelefono.test("1234567890")); // true
console.log(patronTelefono.test("123-45-6789")); // false
```

### 7.3 Validar URL

```javascript
const patronURL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

console.log(patronURL.test("https://www.ejemplo.com")); // true
console.log(patronURL.test("http://ejemplo.com/path")); // true
console.log(patronURL.test("www.ejemplo.com")); // true
console.log(patronURL.test("invalido")); // false
```

### 7.4 Validar Codigo Postal (EE.UU.)

```javascript
const patronCodigoPostal = /^\d{5}(-\d{4})?$/;

console.log(patronCodigoPostal.test("12345")); // true
console.log(patronCodigoPostal.test("12345-6789")); // true
console.log(patronCodigoPostal.test("1234")); // false
```

### 7.5 Validar IPv4

```javascript
const patronIPv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

console.log(patronIPv4.test("192.168.1.1")); // true
console.log(patronIPv4.test("255.255.255.255")); // true
console.log(patronIPv4.test("256.1.1.1")); // false
```

### 7.6 Validar Fecha (YYYY-MM-DD)

```javascript
const patronFecha = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;

console.log(patronFecha.test("2024-01-15")); // true
console.log(patronFecha.test("2024-12-31")); // true
console.log(patronFecha.test("2024-13-01")); // false
console.log(patronFecha.test("2024-00-15")); // false
```

### 7.7 Validar Hex Color

```javascript
const patronHexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

console.log(patronHexColor.test("#FF5733")); // true
console.log(patronHexColor.test("#FFF")); // true
console.log(patronHexColor.test("#GGG")); // false
```

---

## 8. Metodos de RegExp en JavaScript

### 8.1 test()

```javascript
const patron = /hola/i;

console.log(patron.test("Hola mundo")); // true
console.log(patron.test("adios mundo")); // false

// Uso en validacion
function esValido(valor) {
  return /^[a-zA-Z0-9]+$/.test(valor);
}
```

### 8.2 match()

```javascript
const texto = "Mi numero es 123-456-7890";

// Sin flag g: retorna primera coincidencia con grupos
const coincidencia = texto.match(/(\d{3})-(\d{3})-(\d{4})/);
console.log(coincidencia[0]); // "123-456-7890"
console.log(coincidencia[1]); // "123"

// Con flag g: retorna array de todas las coincidencias
const todos = texto.match(/\d+/g);
console.log(todos); // ["123", "456", "7890"]
```

### 8.3 matchAll()

```javascript
const texto = "foo1 bar2 baz3";
const coincidencias = [...texto.matchAll(/(\w+?)(\d)/g)];

coincidencias.forEach(coincidencia => {
  console.log(`${coincidencia[0]}: ${coincidencia[1]}, ${coincidencia[2]}`);
});
// "foo1: foo, 1"
// "bar2: bar, 2"
// "baz3: baz, 3"
```

### 8.4 replace()

```javascript
const texto = "Hola Mundo";

// Reemplazo basico
console.log(texto.replace("Mundo", "JavaScript")); // "Hola JavaScript"

// Con RegExp
console.log(texto.replace(/mundo/i, "JavaScript")); // "Hola JavaScript"

// Con funcion de reemplazo
console.log(texto.replace(/(\w+)/g, (match, grupo1, indice) => {
  return `${match.toUpperCase()}(${indice})`;
}));
// "HOLA(0) MUNDO(5)"

// Reemplazo con grupos
const fecha = "2024-01-15";
console.log(fecha.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1"));
// "15/01/2024"
```

### 8.5 replaceAll()

```javascript
const texto = "aabbcc";
console.log(texto.replaceAll("a", "x")); // "xxbbcc"
console.log(texto.replaceAll(/a/g, "x")); // "xxbbcc"
```

### 8.6 search()

```javascript
const texto = "Hola Mundo";

console.log(texto.search(/mundo/i)); // 5
console.log(texto.search(/python/i)); // -1
```

### 8.7 split()

```javascript
const texto = "hola, mundo; python; javascript";

console.log(texto.split(/[,;]\s*/)); // ["hola", "mundo", "python", "javascript"]
```

### 8.8 exec()

```javascript
const patron = /(\d{4})-(\d{2})-(\d{2})/g;
const texto = "Fecha: 2024-01-15 y 2024-12-31";

let coincidencia;
while ((coincidencia = patron.exec(texto)) !== null) {
  console.log(`${coincidencia[0]}: ${coincidencia[1]}/${coincidencia[2]}/${coincidencia[3]}`);
}
// "2024-01-15: 2024/01/15"
// "2024-12-31: 2024/12/31"
```

---

## 9. Flags

### 9.1 Flag g (Global)

```javascript
// Sin g: solo primera coincidencia
console.log("abcabc".match(/a/)); // ["a"]

// Con g: todas las coincidencias
console.log("abcabc".match(/a/g)); // ["a", "a"]
```

### 9.2 Flag i (Insensible a Mayusculas/Minusculas)

```javascript
console.log(/hola/i.test("Hola")); // true
console.log(/hola/i.test("HOLA")); // true
console.log(/hola/.test("Hola")); // false
```

### 9.3 Flag m (Multilinea)

```javascript
const texto = "linea1\nlinea2\nlinea3";

// Sin m: ^ y $ solo coinciden con inicio/fin del string
console.log(/^linea/.test(texto)); // true

// Con m: ^ y $ coinciden con inicio/fin de cada linea
console.log(/^linea2$/m.test(texto)); // true
```

### 9.4 Flag s (DotAll)

```javascript
// Sin s: . no coincide con saltos de linea
const texto = "linea1\nlinea2";
console.log(/linea1.linea2/.test(texto)); // false

// Con s: . coincide con saltos de linea
console.log(/linea1.linea2/s.test(texto)); // true
```

### 9.5 Flag u (Unicode)

```javascript
// Sin u: cuenta cada byte
console.log("😀".length); // 2
console.log("😀".match(/./)); // ["�"]

// Con u: cuenta puntos de codigo Unicode
console.log("😀".match(/./u)); // ["😀"]
```

---

## 10. Consejos de Rendimiento

### 10.1 Evitar Backtracking

```javascript
// Mal: backtracking exponencial
const patronLento = /^(a+)+$/;
console.log(patronLento.test("aaaaaaaaaaaaaaaaaaaaaaaaaaa!")); // false, pero lento

// Bien: patron simple
const patronRapido = /^a+$/;
console.log(patronRapido.test("aaaaaaaaaaaaaaaaaaaaaaaaaaa!")); // false, rapido
```

### 10.2 Usar Anclas Correctamente

```javascript
// Mal: sin ancas, busca en todo el string
const texto = "abc123def456";
console.log(/\d+/.test(texto)); // true

// Bien: con ancas si necesitas coincidencia exacta
console.log(/^\d+$/.test("123")); // true
```

### 10.3 Pre-compilar RegExp

```javascript
// Mal: crear RegExp en loop
function buscarMal(texto) {
  for (let i = 0; i < 1000; i++) {
    texto.replace(/patron/g, "");
  }
}

// Bien: compilar una sola vez
function buscarBien(texto) {
  const patron = /patron/g;
  for (let i = 0; i < 1000; i++) {
    texto.replace(patron, "");
  }
}
```

### 10.4 Usar Grupos Sin Captura

```javascript
// Mal: captura innecesaria
const patronCaptura = /(a)(b)(c)/;

// Bien: grupo sin captura
const patronSinCaptura = /(?:a)(?:b)(?:c)/;
```

---

## Buenas practicas

1. **Usar literals** sobre constructor cuando sea posible
2. **Nombrar grupos** para codigo mas legible
3. **Usar grupos sin captura** cuando no necesites el valor
4. **Evitar backtracking** con patrones simples
5. **Pre-compilar RegExp** en loops
6. **Usar flags** correctamente (g, i, m, s, u)
7. **Documentar patrones complejos** con comentarios
8. **Probar patrones** con casos de prueba variados
9. **Usar herramientas** como regex101.com para depurar
10. **No exagerar**: usar RegExp solo cuando sea necesario

---

## Ejercicios

### Ejercicio 1: Validador de Formularios (5 puntos)

Crear un objeto `Validador` con metodos para validar: email, telefono, password (8+ caracteres, mayuscula, minuscula, numero, especial), URL, y fecha (YYYY-MM-DD).

### Ejercicio 2: Parser de Logs (5 puntos)

Crear una funcion `parsearLogs(texto)` que extraiga de un log: timestamp, nivel (INFO, ERROR, WARN), y mensaje. Usar grupos nombrados.

### Ejercicio 3: Buscar y Reemplazar (5 puntos)

Crear una funcion `reemplazarPatron(texto, patron, reemplazo)` que reemplace todas las ocurrencias y retorne el texto modificado y el numero de reemplazos.

### Ejercicio 4: Validador de Exprsiones Matematicas (5 puntos)

Crear un RegExp que valide expresiones matematicas simples: "2 + 3", "10 * 5", "100 / 2 - 5". Debe permitir numeros, operadores (+, -, *, /), y espacios.

### Ejercicio 5: Extraccion de Datos (5 puntos)

Crear una funcion `extraerDatos(html)` que extraiga de HTML: urls (href), emails, y numeros de telefono. Retornar un objeto con cada tipo.

### Ejercicio 6: Generador de Patrones (5 puntos)

Crear una funcion `generarPatron(tipo)` que retorne un RegExp para: matricula de coche (ABC-1234), codigo ISBN (10 o 13 digitos con guiones), y numero de seguro social (XXX-XX-XXXX).

---

## Soluciones

### Solucion Ejercicio 1: Validador de Formularios

```javascript
const Validador = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  telefono: /^(\(\d{3}\)\s?|\d{3}[-.]?)\d{3}[-.]?\d{4}$/,

  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,

  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,

  fecha: /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/,

  validar(tipo, valor) {
    const patron = this[tipo];
    if (!patron) {
      throw new Error(`Tipo de validacion no soportado: ${tipo}`);
    }
    return patron.test(valor);
  }
};

// Uso
console.log(Validador.validar("email", "test@email.com")); // true
console.log(Validador.validar("telefono", "(123) 456-7890")); // true
console.log(Validador.validar("password", "Abc123!@")); // true
console.log(Validador.validar("url", "https://www.ejemplo.com")); // true
console.log(Validador.validar("fecha", "2024-01-15")); // true
```

### Solucion Ejercicio 2: Parser de Logs

```javascript
function parsearLogs(texto) {
  const patron = /^\[(?<timestamp>[^\]]+)\] (?<nivel>INFO|ERROR|WARN): (?<mensaje>.+)$/gm;

  const logs = [];
  let coincidencia;

  while ((coincidencia = patron.exec(texto)) !== null) {
    logs.push({
      timestamp: coincidencia.groups.timestamp,
      nivel: coincidencia.groups.nivel,
      mensaje: coincidencia.groups.mensaje
    });
  }

  return logs;
}

// Uso
const textoLog = `[2024-01-15 10:30:00] INFO: Aplicacion iniciada
[2024-01-15 10:30:05] WARN: Memoria baja
[2024-01-15 10:30:10] ERROR: Conexion fallida`;

const logs = parsearLogs(textoLog);
logs.forEach(log => {
  console.log(`${log.timestamp} [${log.nivel}]: ${log.mensaje}`);
});
// "2024-01-15 10:30:00 [INFO]: Aplicacion iniciada"
// "2024-01-15 10:30:05 [WARN]: Memoria baja"
// "2024-01-15 10:30:10 [ERROR]: Conexion fallida"
```

### Solucion Ejercicio 3: Buscar y Reemplazar

```javascript
function reemplazarPatron(texto, patron, reemplazo) {
  let numeroReemplazos = 0;
  const textoModificado = texto.replace(patron, (...args) => {
    numeroReemplazos++;
    if (typeof reemplazo === "function") {
      return reemplazo(...args);
    }
    return reemplazo;
  });

  return {
    texto: textoModificado,
    reemplazos: numeroReemplazos
  };
}

// Uso
const texto = "Hola Mundo, hola JavaScript, hola Node.js";

const resultado1 = reemplazarPatron(texto, /hola/gi, "adios");
console.log(resultado1.texto); // "adios Mundo, adios JavaScript, adios Node.js"
console.log(resultado1.reemplazos); // 3

const resultado2 = reemplazarPatron(texto, /(\w+)\s+(\w+)/g, (match, p1, p2) => {
  return `${p2} ${p1}`;
});
console.log(resultado2.texto); // "Mundo Hola, JavaScript hola, Node.js hola"
console.log(resultado2.reemplazos); // 3
```

### Solucion Ejercicio 4: Validador de Exprsiones Matematicas

```javascript
const patronMatematico = /^\s*\d+(\.\d+)?\s*([+\-*\/]\s*\d+(\.\d+)?\s*)*$/;

// Uso
console.log(patronMatematico.test("2 + 3")); // true
console.log(patronMatematico.test("10 * 5")); // true
console.log(patronMatematico.test("100 / 2 - 5")); // true
console.log(patronMatematico.test("2 + 3 * 4 - 5 / 2")); // true
console.log(patronMatematico.test("2 +")); // false
console.log(patronMatematico.test("+ 2")); // false
console.log(patronMatematico.test("2 + a")); // false
```

### Solucion Ejercicio 5: Extraccion de Datos

```javascript
function extraerDatos(html) {
  const urls = [...html.matchAll(/href="([^"]+)"/g)]
    .map(match => match[1]);

  const emails = [...html.matchAll(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)]
    .map(match => match[0]);

  const telefonos = [...html.matchAll(/(\(\d{3}\)\s?|\d{3}[-.]?)\d{3}[-.]?\d{4}/g)]
    .map(match => match[0]);

  return { urls, emails, telefonos };
}

// Uso
const html = `
<a href="https://www.ejemplo.com">Sitio</a>
<a href="mailto:info@email.com">Email</a>
<p>Contacto: (123) 456-7890 o 098-765-4321</p>
<p>Email: usuario@ejemplo.com</p>
`;

const datos = extraerDatos(html);
console.log("URLs:", datos.urls);
// ["https://www.ejemplo.com", "mailto:info@email.com"]
console.log("Emails:", datos.emails);
// ["info@email.com", "usuario@ejemplo.com"]
console.log("Telefonos:", datos.telefonos);
// ["(123) 456-7890", "098-765-4321"]
```

### Solucion Ejercicio 6: Generador de Patrones

```javascript
const GeneradorPatrones = {
  matriculaCoche: /^[A-Z]{3}-\d{4}$/,

  isbn: /^(?:\d{10}|\d{13}|(?:\d{9}[\dXx]))$|^\d{1,5}-\d{1,7}-\d{1,7}-[\dXx]$/,

  numeroSeguroSocial: /^\d{3}-\d{2}-\d{4}$/,

  generar(tipo) {
    const patron = this[tipo];
    if (!patron) {
      throw new Error(`Tipo de patron no soportado: ${tipo}`);
    }
    return patron;
  }
};

// Uso
console.log(GeneradorPatrones.generar("matriculaCoche").test("ABC-1234")); // true
console.log(GeneradorPatrones.generar("matriculaCoche").test("AB-1234")); // false

console.log(GeneradorPatrones.generar("isbn").test("1234567890")); // true
console.log(GeneradorPatrones.generar("isbn").test("123-4-567-89012-3")); // true

console.log(GeneradorPatrones.generar("numeroSeguroSocial").test("123-45-6789")); // true
console.log(GeneradorPatrones.generar("numeroSeguroSocial").test("12-345-6789")); // false
```
