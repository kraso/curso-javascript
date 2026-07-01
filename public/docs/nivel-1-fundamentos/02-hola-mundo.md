# Lección 2: Hola Mundo — Tu primer script

## Objetivos de aprendizaje

- [ ] Saber cómo insertar JavaScript en una página HTML
- [ ] Conocer la diferencia entre scripts inline y externos
- [ ] Entender cómo mostrar información al usuario (alert, console, DOM)
- [ ] Comprender el orden de ejecución de los scripts

---

## 1. La etiqueta `<script>`

Los programas de JavaScript se insertan en HTML usando la etiqueta `<script>`:

```html
<!DOCTYPE html>
<html lang="es">
<body>
    <p>Antes del script...</p>

    <script>
        alert("¡Hola, mundo!");
    </script>

    <p>...Después del script.</p>
</body>
</html>
```

El código dentro de `<script>` se ejecuta **automáticamente** cuando el navegador procesa la etiqueta.

---

## 2. Scripts externos

Si tenemos mucho código JavaScript, podemos colocarlo en un archivo separado:

```html
<script src="mi-script.js"></script>
```

### Ventajas de los scripts externos

- **Caché del navegador:** Se descarga una sola vez y se reutiliza
- **Mejor organizacion:** Separa HTML de JavaScript
- **Reutilización:** El mismo script puede usarse en múltiples páginas

### Rutas de scripts

```html
<!-- Ruta absoluta desde la raíz del sitio -->
<script src="/js/script.js"></script>

<!-- Ruta relativa desde la página actual -->
<script src="script.js"></script>

<!-- URL completa (CDN) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

---

## 3. Múltiples scripts

Para adjuntar varios scripts, se usan varias etiquetas:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
```

> **Nota:** Cuando se establece el atributo `src`, el contenido del script dentro de la etiqueta se ignora.

```html
<!-- ¡Esto NO funciona! -->
<script src="archivo.js">
    alert(1); // Se ignora porque se estableció src
</script>

<!-- Solución: dividir en dos etiquetas -->
<script src="archivo.js"></script>
<script>
    alert(1);
</script>
```

---

## 4. Mostrar información al usuario

### 4.1 `alert()` — Ventana emergente

Muestra un cuadro de diálogo con un mensaje y un botón OK:

```javascript
alert("¡Hola, mundo!");
```

### 4.2 `console.log()` — Consola del navegador

Muestra información en la consola del desarrollador (F12):

```javascript
console.log("Hola, mundo!");
console.log("Fecha:", new Date());
console.log("Objeto:", { nombre: "Ana", edad: 25 });
```

### 4.3 Modificar el DOM — Cambiar contenido HTML

```javascript
// Cambiar el contenido de un elemento
document.getElementById("titulo").innerHTML = "Nuevo contenido";

// Cambiar el estilo de un elemento
document.body.style.backgroundColor = "#f0f0f0";

// Crear un nuevo elemento
let parrafo = document.createElement("p");
parrafo.textContent = "Este párrafo fue creado con JavaScript";
document.body.appendChild(parrafo);
```

### 4.4 `prompt()` — Solicitar información al usuario

```javascript
let nombre = prompt("¿Cuál es tu nombre?");
alert("¡Hola, " + nombre + "!");
```

### 4.5 `confirm()` — Confirmar una acción

```javascript
let respuesta = confirm("¿Estás seguro de que quieres continuar?");
if (respuesta) {
    alert("Confirmado");
} else {
    alert("Cancelado");
}
```

---

## 5. Comentarios

Los comentarios se utilizan para explicar el código y son ignorados por el navegador:

```javascript
// Comentario de una sola línea

/*
   Comentario
   de múltiples
   líneas
*/

/*
 *
 * Comentario de documentación (JSDoc)
 * Se usa para documentar funciones
 * 
*/

function saludar() {
    // Esta función saluda al usuario
    console.log("¡Hola!");
}

```

---

## 6. Orden de ejecución

Los scripts se ejecutan **de arriba hacia abajo**:

```html
<script>
    console.log("Primero");  // Se ejecuta primero
</script>

<script>
    console.log("Segundo");  // Se ejecuta después
</script>

<script>
    console.log("Tercero");  // Se ejecuta último
</script>
```

> **Importante:** Si un script tiene un error, los scripts posteriores **no se ejecutarán**.

---

## 7. Buenas prácticas

1. **Coloca los scripts al final del `<body>`** para que el HTML se cargue primero
2. **Usa scripts externos** para código complejo
3. **Usa `console.log()`** en lugar de `alert()` para depurar
4. **Escribe comentarios** para explicar código complejo
5. **No mezcles** `<script src="...">` con código inline en la misma etiqueta

```html
<!DOCTYPE html>
<html lang="es">
<body>
    <!-- Contenido HTML aquí -->

    <!-- Scripts al final -->
    <script src="app.js"></script>
</body>
</html>
```

---

## Resumen

- Se usa `<script>` para agregar código JavaScript a una página
- Los atributos `type` y `language` ya no son necesarios
- Un script externo se inserta con `<script src="ruta/archivo.js"></script>`
- `alert()` muestra ventanas emergentes, `console.log()` es para depuración
- Los scripts se ejecutan de arriba hacia abajo

---

## Ejercicios

### Ejercicio 1 (Básico) — 1 punto
**Primer script**

Crea un archivo HTML con un script que muestre "¡Hola, mundo!" en una alerta.

### Ejercicio 2 (Básico) — 2 puntos
**Script externo**

1. Crea un archivo `saludo.js` con un `alert("¡Hola desde archivo externo!")`
2. Crea un archivo HTML que incluya ese script

### Ejercicio 3 (Intermedio) — 2 puntos
**Múltiples métodos de salida**

Crea un script que muestre un mensaje de tres formas diferentes:
1. Con `alert()`
2. Con `console.log()`
3. Modificando el contenido de un elemento `<p>` en la página

### Ejercicio 4 (Intermedio) — 2 puntos
**Interacción con el usuario**

Crea un script que:
1. Pida el nombre del usuario con `prompt()`
2. Pida la edad del usuario con `prompt()`
3. Muestre un saludo personalizado con `alert()`: "¡Hola [nombre], tienes [edad] años!"

### Ejercicio 5 (Avanzado) — 3 puntos
**Calculadora básica**

Crea un script que:
1. Pida dos números con `prompt()`
2. Realice las 4 operaciones básicas (suma, resta, multiplicación, división)
3. Muestre los resultados en la consola con `console.log()`

### Ejercicio 6 (Práctico) — 3 puntos
**Generador de perfiles**

Crea un script que pida al usuario su nombre, apellido y edad, y luego:
1. Genere un nombre de usuario: primera letra del nombre + apellido en minúsculas
2. Determine si es mayor de edad
3. Muestre toda la información en la página (no en alert)

---

## Soluciones

### Solución Ejercicio 1
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <script>
        alert("¡Hola, mundo!");
    </script>
</body>
</html>
```

### Solución Ejercicio 2
**saludo.js:**
```javascript
alert("¡Hola desde archivo externo!");
```

**index.html:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <script src="saludo.js"></script>
</body>
</html>
```

### Solución Ejercicio 3
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <p id="mensaje"></p>

    <script>
        let texto = "¡Hola desde JavaScript!";

        // Método 1: alert
        alert(texto);

        // Método 2: consola
        console.log(texto);

        // Método 3: DOM
        document.getElementById("mensaje").textContent = texto;
    </script>
</body>
</html>
```

### Solución Ejercicio 4
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <script>
        let nombre = prompt("¿Cuál es tu nombre?");
        let edad = prompt("¿Cuál es tu edad?");

        alert("¡Hola " + nombre + ", tienes " + edad + " años!");
    </script>
</body>
</html>
```

### Solución Ejercicio 5
```javascript
let num1 = parseFloat(prompt("Ingresa el primer número:"));
let num2 = parseFloat(prompt("Ingresa el segundo número:"));

console.log("Suma:", num1 + num2);
console.log("Resta:", num1 - num2);
console.log("Multiplicación:", num1 * num2);
console.log("División:", num1 / num2);
```

### Solución Ejercicio 6
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <h1 id="perfil"></h1>
    <p id="usuario"></p>
    <p id="edad"></p>

    <script>
        let nombre = prompt("¿Cuál es tu nombre?");
        let apellido = prompt("¿Cuál es tu apellido?");
        let edad = parseInt(prompt("¿Cuál es tu edad?"));

        let usuario = nombre.charAt(0).toLowerCase() + apellido.toLowerCase();
        let mayorEdad = edad >= 18 ? "Sí" : "No";

        document.getElementById("perfil").textContent = "Perfil de " + nombre + " " + apellido;
        document.getElementById("usuario").textContent = "Usuario: " + usuario;
        document.getElementById("edad").textContent = "Edad: " + edad + " años. Mayor de edad: " + mayorEdad;
    </script>
</body>
</html>
```
