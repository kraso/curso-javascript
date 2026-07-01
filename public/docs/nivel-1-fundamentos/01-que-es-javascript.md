# Lección 1: ¿Qué es JavaScript?

## Objetivos de aprendizaje

- [ ] Comprender qué es JavaScript y para qué se utiliza
- [ ] Conocer los motores de JavaScript y cómo funcionan
- [ ] Entender qué puede y qué no puede hacer JavaScript en el navegador
- [ ] Diferenciar JavaScript de otros lenguajes como Java
- [ ] Conocer los lenguajes que se transpilan a JavaScript

---

## 1. Introducción

JavaScript fue creado inicialmente para **"dar vida a las páginas web"**. Los programas en este lenguaje se llaman *scripts* y se pueden escribir directamente en el HTML de una página web, ejecutándose automáticamente a medida que se carga la página.

Los scripts se proporcionan y ejecutan como **texto plano**. No necesitan preparación especial ni compilación para funcionar.

> **Nota histórica:** JavaScript fue creado con el nombre "LiveScript", pero Java era muy popular en ese momento, y se decidió que posicionarlo como un "hermano menor" de Java ayudaría. Sin embargo, JavaScript evolucionó hasta convertirse en un lenguaje completamente independiente con su propia especificación llamada **ECMAScript**.

---

## 2. ¿Qué es un motor de JavaScript?

Los motores de JavaScript son programas que ejecutan el código JavaScript. Diferentes navegadores utilizan diferentes motores:

| Motor | Navegador |
|-------|-----------|
| **V8** | Chrome, Opera, Edge |
| **SpiderMonkey** | Firefox |
| **Chakra** | Internet Explorer |
| **JavaScriptCore** | Safari |

### ¿Cómo funcionan los motores?

1. El motor **lee** (analiza) el script
2. Lo **convierte** (compila) a lenguaje de máquina
3. El código máquina se **ejecuta** rápidamente

El motor aplica optimizaciones en cada paso del proceso, incluso analizando los datos que fluyen a través del script compilado.

---

## 3. ¿Qué puede hacer JavaScript en el navegador?

JavaScript moderno es un lenguaje de programación **"seguro"**. No proporciona acceso de bajo nivel a la memoria ni a la CPU. En el navegador, JavaScript puede:

- **Manipular el HTML:** Agregar nuevo contenido, modificar estilos, cambiar elementos existentes
- **Reaccionar al usuario:** Ejecutarse con clics del ratón, movimientos del puntero y pulsaciones de teclas
- **Comunicarse con el servidor:** Enviar solicitudes de red, descargar y cargar archivos (AJAX, COMET)
- **Gestionar datos:** Obtener y configurar cookies, recordar datos con almacenamiento local (localStorage)

### Ejemplo práctico

```javascript
// Cambiar el contenido de un elemento HTML
document.getElementById("demo").innerHTML = "¡Hola, JavaScript!";

// Reaccionar a un clic del usuario
boton.addEventListener("click", function() {
    alert("¡Has hecho clic!");
});

// Obtener datos del servidor
fetch("https://api.ejemplo.com/datos")
    .then(respuesta => respuesta.json())
    .then(datos => console.log(datos));
```

---

## 4. ¿Qué NO puede hacer JavaScript en el navegador?

JavaScript en el navegador tiene **limitaciones de seguridad**:

| Restricción | Motivo |
|-------------|--------|
| No puede leer/escribir archivos arbitrariamente | Proteger el sistema del usuario |
| No puede acceder a otras pestañas de diferente dominio | Política del mismo origen |
| No puede comunicarse con otros servidores sin permiso | Seguridad de red |

Estas restricciones existen para **proteger la privacidad del usuario**. Por ejemplo, una página web no debe poder acceder a la información de tu correo electrónico en otra pestaña.

---

## 5. ¿Qué hace único a JavaScript?

JavaScript es la única tecnología del navegador que combina:

1. **Integración completa con HTML y CSS** — Puede modificar tanto la estructura como el estilo de las páginas
2. **Las cosas simples se hacen de manera simple** — Sintaxis accesible para principiantes
3. **Soporte universal** — Habilitado por defecto en todos los navegadores modernos

---

## 6. Lenguajes que se transpilan a JavaScript

Existen lenguajes que se **convierten** (transpilan) a JavaScript antes de ejecutarse en el navegador:

| Lenguaje | Desarrollador | Característica principal |
|----------|---------------|--------------------------|
| **TypeScript** | Microsoft | Tipado estricto |
| **CoffeeScript** | Comunidad Ruby | Sintaxis más concisa |
| **Flow** | Facebook | Tipado estático |
| **Dart** | Google | Independiente, también tiene su propio motor |
| **Kotlin** | JetBrains | Moderno, seguro, conciso |
| **Brython** | Comunidad | Transpilador de Python a JavaScript |

---

## 7. Entornos de ejecución

JavaScript ya no es solo para navegadores. Hoy puede ejecutarse en:

- **Navegadores web** — El uso original
- **Servidores** — Con Node.js
- **Aplicaciones móviles** — Con React Native, Flutter
- **Aplicaciones de escritorio** — Con Electron
- **Dispositivos IoT** — Con plataformas como Johnny-Five

---

## Resumen

- JavaScript fue inicialmente creado para el navegador, pero ahora se usa en muchos otros entornos
- Tiene una posición única como el lenguaje más extendido del navegador, con integración completa con HTML y CSS
- Muchos lenguajes se transpilan a JavaScript y aportan características adicionales
- Es un lenguaje **seguro** con limitaciones deliberadas para proteger al usuario
- Los motores JavaScript (V8, SpiderMonkey, etc.) ejecutan el código de manera optimizada

---

## Ejercicios

### Ejercicio 1 (Básico) — 1 punto
**Identifica los motores de JavaScript**

Asocia cada navegador con su motor de JavaScript:
- Chrome → ?
- Firefox → ?
- Safari → ?
- Edge → ?

### Ejercicio 2 (Intermedio) — 2 puntos
**Compara capacidades**

Crea una tabla comparativa con 5 cosas que JavaScript **puede** hacer en el navegador y 5 cosas que **no puede** hacer. Explica brevemente el motivo de cada limitación.

### Ejercicio 3 (Intermedio) — 2 puntos
**Investiga transpiladores**

Elige dos lenguajes que se transpilan a JavaScript (TypeScript, CoffeeScript, Flow, etc.) y explica:
- ¿Qué problema específico resuelve cada uno?
- ¿Por qué alguien usaría ese lenguaje en vez de JavaScript directamente?

### Ejercicio 4 (Avanzado) — 3 puntos
**Entornos de ejecución**

Describe 3 escenarios reales donde JavaScript se utiliza fuera del navegador. Para cada uno, menciona:
- El entorno de ejecución
- Las ventajas de usar JavaScript en ese contexto
- Una librería o framework popular que se utilice

### Ejercicio 5 (Práctico) — 3 puntos
**Primer script**

Crea un archivo HTML con un script que:
1. Muestre un `alert` con tu nombre
2. Cambie el color de fondo de la página
3. Muestre la fecha actual en la consola del navegador

---

## Soluciones

### Solución Ejercicio 1
| Navegador | Motor |
|-----------|-------|
| Chrome | V8 |
| Firefox | SpiderMonkey |
| Safari | JavaScriptCore |
| Edge | V8 |

### Solución Ejercicio 2
**Puede:**
1. Modificar el contenido HTML → Para actualizar la interfaz
2. Reaccionar a eventos del usuario → Para crear interactividad
3. Comunicarse con servidores → Para obtener/enviar datos
4. Almacenar datos localmente → Para persistir información
5. Validar formularios → Para mejorar la experiencia de usuario

**No puede:**
1. Leer/escribir archivos → Seguridad del sistema
2. Acceder a otras pestañas → Política del mismo origen
3. Acceder a hardware directamente → Entorno aislado (sandbox)
4. Ejecutar programas del sistema → Protección del usuario
5. Comunicarse con otros dominios sin permiso → Seguridad de red

### Solución Ejercicio 3
**TypeScript (Microsoft):**
- Resuelve: Errores en tiempo de compilación por tipos incorrectos
- Ventaja: Detección temprana de bugs en proyectos grandes

**Flow (Facebook):**
- Resuelve: Verificación de tipos estática sin cambiar la sintaxis
- Ventaja: Integra fácilmente en proyectos JavaScript existentes

### Solución Ejercicio 4
1. **Servidores (Node.js):** APIs REST, microservicios → Express.js, Fastify
2. **Apps móviles (React Native):** Aplicaciones multiplataforma → React Native, Expo
3. **Apps de escritorio (Electron):** Aplicaciones como VS Code, Slack → Electron, Tauri

### Solución Ejercicio 5
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi primer script</title>
</head>
<body>
    <h1 id="titulo">Hola JavaScript</h1>

    <script>
        // 1. Mostrar alert con nombre
        alert("Mi nombre es [Tu Nombre]");

        // 2. Cambiar color de fondo
        document.body.style.backgroundColor = "#f0f8ff";

        // 3. Mostrar fecha en consola
        console.log("Fecha actual:", new Date().toLocaleString());
    </script>
</body>
</html>
```
