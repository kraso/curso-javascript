# Examen Nivel 1: Fundamentos de JavaScript

## Instrucciones

- **Duración:** 60 minutos
- **Puntuación total:** 50 puntos
- **Aprobado:** 35 puntos o más
- **Parte A:** Teoría (20 puntos)
- **Parte B:** Práctica (30 puntos)

---

## Parte A: Teoría (20 puntos)

### Pregunta 1 (2 puntos)
¿Cuál es la diferencia entre `let` y `const`?

a) `let` es para números, `const` para textos
b) `let` permite reasignación, `const` no
c) `const` es más rápido que `let`
d) No hay diferencia

### Pregunta 2 (2 puntos)
¿Cuál es el resultado de `typeof null`?

a) `"null"`
b) `"undefined"`
c) `"object"`
d) `"boolean"`

### Pregunta 3 (2 puntos)
¿Cuál es el resultado de `"5" + 3`?

a) `8`
b) `"53"`
c) `"8"`
d) `NaN`

### Pregunta 4 (2 puntos)
¿Qué hace el operador `??` (nullish coalescing)?

a) Compara si dos valores son iguales
b) Retorna el valor derecho solo si el izquierdo es `null` o `undefined`
c) Convierte un valor a número
d) Retorna `true` si ambos valores son truthy

### Pregunta 5 (2 puntos)
¿Cuál es la diferencia entre `==` y `===`?

a) `==` es más rápido
b) `===` compara sin conversión de tipos
c) `==` solo funciona con números
d) No hay diferencia

### Pregunta 6 (2 puntos)
¿Qué valor retorna una función sin `return`?

a) `null`
b) `undefined`
c) `0`
d) `"null"`

### Pregunta 7 (2 puntos)
¿Cuál es el resultado de `2 ** 3 ** 2`?

a) `64`
b) `512`
c) `36`
d) `18`

### Pregunta 8 (2 puntos)
¿Qué es un "closure" en JavaScript?

a) Una función que cierra el navegador
b) Una función que recuerda su alcance léxico
c) Un tipo de variable global
d) Un método para cerrar bucles

### Pregunta 9 (2 puntos)
¿Cuál de estos es un nombre de variable INVÁLIDO?

a) `_nombre`
b) `$precio`
c) `2doValor`
d) `miVariable`

### Pregunta 10 (2 puntos)
¿Qué hace `break` dentro de un bucle?

a) Detiene la ejecución del programa
b) Salta a la siguiente iteración
c) Sale completamente del bucle
d) Reinicia el contador a 0

---

## Parte B: Práctica (30 puntos)

### Ejercicio 1 (5 puntos)
**Calculadora de IMC**

Crea una función `calcularIMC(peso, altura)` que calcule el Índice de Masa Corporal usando la fórmula: `IMC = peso / altura²`

La función debe retornar un objeto con:
- `imc`: el valor redondeado a 2 decimales
- `categoria`: "Bajo peso" (<18.5), "Normal" (18.5-24.9), "Sobrepeso" (25-29.9), "Obesidad" (≥30)

```javascript
// Prueba:
calcularIMC(70, 1.75)
// { imc: 22.86, categoria: "Normal" }
```

### Ejercicio 2 (5 puntos)
**Validador de email**

Crea una función `validarEmail(email)` que verifique:
1. Contiene exactamente un `@`
2. Tiene al menos un `.` después del `@`
3. No empieza ni termina con espacio
4. Tiene al menos 3 caracteres antes del `@`
5. Tiene al menos 2 caracteres después del último `.`

```javascript
// Pruebas:
validarEmail("usuario@ejemplo.com")  // true
validarEmail("usr@ej.com")           // true
validarEmail("@ejemplo.com")         // false
validarEmail("usuario@ejemplo")      // false
```

### Ejercicio 3 (5 puntos)
**Fibonacci recursivo**

Crea una función `fibonacci(n)` que retorne el n-ésimo número de la secuencia de Fibonacci usando recursión.

```javascript
// Pruebas:
fibonacci(0)  // 0
fibonacci(1)  // 1
fibonacci(5)  // 5
fibonacci(10) // 55
```

### Ejercicio 4 (5 puntos)
**Array de objetos**

Dado el siguiente array de estudiantes:
```javascript
let estudiantes = [
    { nombre: "Ana", nota: 90 },
    { nombre: "Carlos", nota: 75 },
    { nombre: "María", nota: 85 },
    { nombre: "Pedro", nota: 60 },
    { nombre: "Laura", nota: 95 }
];
```

Crea funciones para:
1. `aprobar(estudiantes)` — Retornar solo los que tienen nota ≥ 70
2. `promedio(estudiantes)` — Calcular el promedio de notas
3. `mejorEstudiante(estudiantes)` — Retornar el nombre del mejor

### Ejercicio 5 (5 puntos)
**Manipulación de DOM**

Crea una función `crearTabla(datos)` que reciba un array de objetos y genere una tabla HTML. Cada objeto es una fila, cada propiedad es una columna.

```javascript
// Prueba:
let datos = [
    { nombre: "Ana", edad: 25 },
    { nombre: "Carlos", edad: 30 }
];

crearTabla(datos);
// Debe agregar una tabla al DOM con los datos
```

### Ejercicio 6 (5 puntos)
**Sistema de autenticación simple**

Crea un objeto `auth` con estos métodos:
1. `registrar(usuario, contrasena)` — Guarda el usuario (validar que tenga ≥ 8 caracteres y una mayúscula)
2. `iniciarSesion(usuario, contrasena)` — Retorna `true` si las credenciales coinciden
3. `cambiarContrasena(usuario, contrasenaVieja, contrasenaNueva)` — Cambia la contraseña
4. `usuarios()` — Retorna la lista de usuarios registrados

---

## Soluciones

### Soluciones Parte A

1. **b)** `let` permite reasignación, `const` no
2. **c)** `"object"` (error histórico de JavaScript)
3. **b)** `"53"` (concatenación)
4. **b)** Retorna el valor derecho solo si el izquierdo es `null` o `undefined`
5. **b)** `===` compara sin conversión de tipos
6. **b)** `undefined`
7. **b)** `512` (2^(3^2) = 2^9 = 512)
8. **b)** Una función que recuerda su alcance léxico
9. **c)** `2doValor` (no puede empezar con número)
10. **c)** Sale completamente del bucle

### Soluciones Parte B

#### Solución Ejercicio 1
```javascript
function calcularIMC(peso, altura) {
    let imc = peso / (altura * altura);
    let categoria;

    if (imc < 18.5) {
        categoria = "Bajo peso";
    } else if (imc < 25) {
        categoria = "Normal";
    } else if (imc < 30) {
        categoria = "Sobrepeso";
    } else {
        categoria = "Obesidad";
    }

    return {
        imc: Math.round(imc * 100) / 100,
        categoria
    };
}

console.log(calcularIMC(70, 1.75));  // { imc: 22.86, categoria: "Normal" }
```

#### Solución Ejercicio 2
```javascript
function validarEmail(email) {
    // No debe empezar o terminar con espacio
    if (email.startsWith(" ") || email.endsWith(" ")) {
        return false;
    }

    // Debe tener exactamente un @
    let arrobaIndex = email.indexOf("@");
    if (arrobaIndex === -1 || email.indexOf("@", arrobaIndex + 1) !== -1) {
        return false;
    }

    // Debe tener al menos 3 caracteres antes del @
    if (arrobaIndex < 3) {
        return false;
    }

    // Debe tener un punto después del @
    let parteDespues = email.substring(arrobaIndex + 1);
    let ultimoPunto = parteDespues.lastIndexOf(".");
    if (ultimoPunto === -1) {
        return false;
    }

    // Debe tener al menos 2 caracteres después del último punto
    if (parteDespues.length - ultimoPunto - 1 < 2) {
        return false;
    }

    return true;
}

console.log(validarEmail("usuario@ejemplo.com"));  // true
console.log(validarEmail("usr@ej.com"));           // true
console.log(validarEmail("@ejemplo.com"));         // false
console.log(validarEmail("usuario@ejemplo"));      // false
```

#### Solución Ejercicio 3
```javascript
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(0));   // 0
console.log(fibonacci(1));   // 1
console.log(fibonacci(5));   // 5
console.log(fibonacci(10));  // 55
```

#### Solución Ejercicio 4
```javascript
let estudiantes = [
    { nombre: "Ana", nota: 90 },
    { nombre: "Carlos", nota: 75 },
    { nombre: "María", nota: 85 },
    { nombre: "Pedro", nota: 60 },
    { nombre: "Laura", nota: 95 }
];

function aprobar(estudiantes) {
    return estudiantes.filter(e => e.nota >= 70);
}

function promedio(estudiantes) {
    let suma = estudiantes.reduce((total, e) => total + e.nota, 0);
    return Math.round((suma / estudiantes.length) * 100) / 100;
}

function mejorEstudiante(estudiantes) {
    let mejor = estudiantes[0];
    for (let e of estudiantes) {
        if (e.nota > mejor.nota) {
            mejor = e;
        }
    }
    return mejor.nombre;
}

console.log(aprobar(estudiantes));
console.log(promedio(estudiantes));     // 81
console.log(mejorEstudiante(estudiantes)); // "Laura"
```

#### Solución Ejercicio 5
```javascript
function crearTabla(datos) {
    if (datos.length === 0) return;

    let tabla = document.createElement("tabla");

    // Encabezados
    let encabezados = Object.keys(datos[0]);
    let thead = document.createElement("thead");
    let filaEncabezado = document.createElement("tr");

    for (let key of encabezados) {
        let th = document.createElement("th");
        th.textContent = key;
        filaEncabezado.appendChild(th);
    }

    thead.appendChild(filaEncabezado);
    tabla.appendChild(thead);

    // Cuerpo
    let tbody = document.createElement("tbody");

    for (let objeto of datos) {
        let fila = document.createElement("tr");

        for (let key of encabezados) {
            let td = document.createElement("td");
            td.textContent = objeto[key];
            fila.appendChild(td);
        }

        tbody.appendChild(fila);
    }

    tabla.appendChild(tbody);
    document.body.appendChild(tabla);
}
```

#### Solución Ejercicio 6
```javascript
const auth = {
    usuarios: [],

    registrar(usuario, contrasena) {
        // Validar contraseña
        if (contrasena.length < 8) {
            return { exito: false, error: "La contraseña debe tener al menos 8 caracteres" };
        }

        if (!/[A-Z]/.test(contrasena)) {
            return { exito: false, error: "La contraseña debe tener al menos una mayúscula" };
        }

        // Verificar si el usuario ya existe
        if (this.usuarios.find(u => u.usuario === usuario)) {
            return { exito: false, error: "El usuario ya existe" };
        }

        this.usuarios.push({ usuario, contrasena });
        return { exito: true, mensaje: "Usuario registrado correctamente" };
    },

    iniciarSesion(usuario, contrasena) {
        let user = this.usuarios.find(
            u => u.usuario === usuario && u.contrasena === contrasena
        );
        return user !== undefined;
    },

    cambiarContrasena(usuario, contrasenaVieja, contrasenaNueva) {
        let user = this.usuarios.find(
            u => u.usuario === usuario && u.contrasena === contrasenaVieja
        );

        if (!user) {
            return { exito: false, error: "Credenciales incorrectas" };
        }

        if (contrasenaNueva.length < 8) {
            return { exito: false, error: "La nueva contraseña debe tener al menos 8 caracteres" };
        }

        user.contrasena = contrasenaNueva;
        return { exito: true, mensaje: "Contraseña cambiada correctamente" };
    }
};

// Pruebas
console.log(auth.registrar("ana", "Clave123!"));    // { exito: true, mensaje: "..." }
console.log(auth.registrar("ana", "clave123!"));    // { exito: false, error: "..." }
console.log(auth.iniciarSesion("ana", "Clave123!")); // true
console.log(auth.cambiarContrasena("ana", "Clave123!", "NuevaClave456!")); // { exito: true }
```

---

## Criterios de evaluación

| Criterio | Puntos |
|----------|--------|
| Correcta implementación de funciones | 50% |
| Manejo de errores y casos edge | 20% |
| Legibilidad y estilo del código | 15% |
| Uso apropiado de conceptos aprendidos | 15% |
