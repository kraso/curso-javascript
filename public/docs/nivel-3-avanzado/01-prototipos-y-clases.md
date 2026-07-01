# Leccion 1: Prototipos y Clases

## Objetivos de aprendizaje

- [ ] Comprender el sistema de prototipos de JavaScript
- [ ] Conocer la cadena de prototipos y __proto__
- [ ] Crear objetos con Object.create
- [ ] Implementar clases con sintaxis ES6
- [ ] Utilizar constructores, metodos estaticos, getters y setters
- [ ] Implementar herencia con extends y super
- [ ] Crear campos privados con #
- [ ] Entender y aplicar Mixins
- [ ] Comparar clases vs funciones de fabrica
- [ ] Implementar patrones OOP en JavaScript

---

## 1. El Sistema de Prototipos

JavaScript es un lenguaje basado en prototipos. Cada objeto tiene un enlace a otro objeto llamado prototipo. Este prototipo puede tener su propio prototipo, formando una cadena.

### 1.1 Proto y la Cadena de Prototipos

Todo objeto en JavaScript tiene una propiedad interna que referencia a otro objeto: su prototipo.

```javascript
const animal = {
  nombre: "Animal",
  hacerSonido() {
    return `${this.nombre} hace un sonido`;
  }
};

const perro = Object.create(animal);
perro.nombre = "Perro";
perro.ladrar = function() {
  return `${this.nombre} ladra`;
};

console.log(perro.hacerSonido()); // "Perro hace un sonido"
console.log(perro.ladrar());       // "Perro ladra"

// La cadena de prototipos:
// perro -> animal -> Object.prototype -> null
```

### 1.2 Accediendo al Prototipo con __proto__

```javascript
const persona = {
  nombre: "Sin nombre",
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
};

const juan = Object.create(persona);
juan.nombre = "Juan";

console.log(juan.__proto__ === persona); // true
console.log(juan.saludar());             // "Hola, soy Juan"

// Verificar la cadena
console.log(Object.getPrototypeOf(juan) === persona); // true
```

### 1.3 Creando Objetos con Object.create

```javascript
const prototipoCoche = {
  encender() {
    this.encendido = true;
    return `${this.modelo} encendido`;
  },
  apagar() {
    this.encendido = false;
    return `${this.modelo} apagado`;
  },
  estaEncendido() {
    return this.encendido ? "Encendido" : "Apagado";
  }
};

const miCoche = Object.create(prototipoCoche);
miCoche.modelo = "Toyota Corolla";
miCoche.color = "Rojo";

console.log(miCoche.encender());      // "Toyota Corolla encendido"
console.log(miCoche.estaEncendido()); // "Encendido"
console.log(miCoche.apagar());        // "Toyota Corolla apagado"
console.log(miCoche.estaEncendido()); // "Apagado"

// Crear objeto sin prototipo
const objVacio = Object.create(null);
console.log(objVacio.toString); // undefined
```

### 1.4 Prototype en Funciones Constructoras

```javascript
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

Persona.prototype.saludar = function() {
  return `Hola, soy ${this.nombre} y tengo ${this.edad} anos`;
};

Persona.prototype.cumplirAnios = function() {
  this.edad++;
  return this.edad;
};

const maria = new Persona("Maria", 25);
const pedro = new Persona("Pedro", 30);

console.log(maria.saludar());    // "Hola, soy Maria y tengo 25 anos"
console.log(pedro.saludar());    // "Hola, soy Pedro y tengo 30 anos"

// Ambos comparten el mismo prototipo
console.log(maria.__proto__ === pedro.__proto__); // true
console.log(maria.__proto__ === Persona.prototype); // true
```

---

## 2. Clases ES6

La sintaxis de clases ES6 proporciona una forma mas clara y organizada de crear constructores y manejar la herencia.

### 2.1 Sintaxis Basica de Clase

```javascript
class Animal {
  constructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
  }

  hacerSonido() {
    return `${this.nombre} hace un sonido`;
  }

  describir() {
    return `${this.nombre} es un ${this.tipo}`;
  }
}

const gato = new Animal("Michi", "felino");
console.log(gato.hacerSonido()); // "Michi hace un sonido"
console.log(gato.describir());   // "Michi es un felino"

// Las clases son syntactic sugar sobre funciones constructoras
console.log(typeof Animal); // "function"
```

### 2.2 Metodos Estaticos

```javascript
class Calculadora {
  constructor() {
    this.resultado = 0;
  }

  sumar(a, b) {
    this.resultado = a + b;
    return this;
  }

  restar(a, b) {
    this.resultado = a - b;
    return this;
  }

  // Metodo estatico: se llama en la clase, no en instancias
  static sumarDirecto(a, b) {
    return a + b;
  }

  static multiplicar(a, b) {
    return a * b;
  }
}

const calc = new Calculadora();
calc.sumar(5, 3);
console.log(calc.resultado); // 8

// Metodos estaticos se llaman en la clase
console.log(Calculadora.sumarDirecto(10, 5));    // 15
console.log(Calculadora.multiplicar(4, 3));       // 12

// No se puede llamar en instancias
// calc.sumarDirecto(1, 2); // Error
```

### 2.3 Getters y Setters

```javascript
class Persona {
  constructor(nombre, apellido, _edad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this._edad = _edad; // Convencion: guion bajo para propiedades privadas
  }

  // Getter
  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }

  // Setter con validacion
  set edad(nuevaEdad) {
    if (nuevaEdad < 0 || nuevaEdad > 150) {
      throw new Error("Edad invalida");
    }
    this._edad = nuevaEdad;
  }

  get edad() {
    return this._edad;
  }

  // Getter computado
  get esMayorDeEdad() {
    return this._edad >= 18;
  }
}

const persona = new Persona("Juan", "Garcia", 25);
console.log(persona.nombreCompleto); // "Juan Garcia"
console.log(persona.edad);           // 25

persona.edad = 30;
console.log(persona.edad);           // 30

persona.esMayorDeEdad;               // true

// La validacion funciona
try {
  persona.edad = -5;
} catch (e) {
  console.log(e.message); // "Edad invalida"
}
```

### 2.4 Clases con Multiples Metodos

```javascript
class CuentaBancaria {
  #saldo; // Campo privado

  constructor(titular, saldoInicial = 0) {
    this.titular = titular;
    this.#saldo = saldoInicial;
    this.fechaCreacion = new Date();
  }

  depositar(monto) {
    if (monto <= 0) {
      throw new Error("El monto debe ser positivo");
    }
    this.#saldo += monto;
    return this;
  }

  retirar(monto) {
    if (monto > this.#saldo) {
      throw new Error("Saldo insuficiente");
    }
    this.#saldo -= monto;
    return this;
  }

  get saldo() {
    return this.#saldo;
  }

  transferir(cuentaDestino, monto) {
    this.retirar(monto);
    cuentaDestino.depositar(monto);
    return this;
  }

  toString() {
    return `Cuenta de ${this.titular}: $${this.#saldo}`;
  }
}

const cuenta1 = new CuentaBancaria("Juan", 1000);
const cuenta2 = new CuentaBancaria("Maria", 500);

cuenta1.retirar(200);
cuenta1.transferir(cuenta2, 300);

console.log(cuenta1.saldo); // 500
console.log(cuenta2.saldo); // 800
console.log(cuenta1.toString()); // "Cuenta de Juan: $500"
```

---

## 3. Herencia con extends y super

### 3.1 Herencia Basica

```javascript
class Animal {
  constructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
  }

  hacerSonido() {
    return `${this.nombre} hace un sonido`;
  }

  describir() {
    return `${this.nombre} es un ${this.tipo}`;
  }
}

class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre, "canino"); // Llama al constructor del padre
    this.raza = raza;
  }

  ladrar() {
    return `${this.nombre} ladra: Guau!`;
  }

  // Sobreescribir metodo del padre
  hacerSonido() {
    return `${this.nombre} ladra`;
  }
}

class Gato extends Animal {
  constructor(nombre, color) {
    super(nombre, "felino");
    this.color = color;
  }

  maullar() {
    return `${this.nombre} maulla: Miau!`;
  }

  hacerSonido() {
    return `${this.nombre} maulla`;
  }
}

const perro = new Perro("Rex", "Pastor Aleman");
const gato = new Gato("Michi", "Negro");

console.log(perro.hacerSonido()); // "Rex ladra"
console.log(perro.ladrar());      // "Rex ladra: Guau!"
console.log(perro.describir());   // "Rex es un canino"

console.log(gato.hacerSonido());  // "Michi maulla"
console.log(gato.maullar());      // "Michi maulla: Miau!"
```

### 3.2 Herencia en Cadena

```javascript
class Vehiculo {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
    this.encendido = false;
  }

  encender() {
    this.encendido = true;
    return `${this.modelo} encendido`;
  }

  apagar() {
    this.encendido = false;
    return `${this.modelo} apagado`;
  }
}

class Coche extends Vehiculo {
  constructor(marca, modelo, puertas) {
    super(marca, modelo);
    this.puertas = puertas;
  }

  abrirPuertas() {
    return `${this.puertas} puertas abiertas`;
  }
}

class CocheElectrico extends Coche {
  constructor(marca, modelo, puertas, bateria) {
    super(marca, modelo, puertas);
    this.bateria = bateria;
    this.cargando = false;
  }

  cargar() {
    this.cargando = true;
    return `${this.modelo} cargando bateria`;
  }

  // Sobreescribir metodo
  encender() {
    this.encendido = true;
    return `${this.modelo} encendido electricamente`;
  }
}

const tesla = new CocheElectrico("Tesla", "Model 3", 4, 75);
console.log(tesla.encender());    // "Model 3 encendido electricamente"
console.log(tesla.abrirPuertas()); // "4 puertas abiertas"
console.log(tesla.cargar());      // "Model 3 cargando bateria"
console.log(tesla.bateria);       // 75
```

### 3.3 Uso de super

```javascript
class Forma {
  constructor(tipo) {
    this.tipo = tipo;
  }

  descripcion() {
    return `Soy una forma de tipo ${this.tipo}`;
  }
}

class Circulo extends Forma {
  constructor(radio) {
    super("circulo");
    this.radio = radio;
  }

  area() {
    return Math.PI * this.radio ** 2;
  }

  perimetro() {
    return 2 * Math.PI * this.radio;
  }

  descripcion() {
    return `${super.descripcion()} con radio ${this.radio}`;
  }
}

class Rectangulo extends Forma {
  constructor(alto, ancho) {
    super("rectangulo");
    this.alto = alto;
    this.ancho = ancho;
  }

  area() {
    return this.alto * this.ancho;
  }

  esCuadrado() {
    return this.alto === this.ancho;
  }
}

const circulo = new Circulo(5);
console.log(circulo.descripcion()); // "Soy una forma de tipo circulo con radio 5"
console.log(circulo.area().toFixed(2)); // "78.54"

const rect = new Rectangulo(10, 5);
console.log(rect.descripcion());   // "Soy una forma de tipo rectangulo"
console.log(rect.area());          // 50
console.log(rect.esCuadrado());    // false
```

---

## 4. Campos Privados con #

### 4.1 Campos Privados en Clases

```javascript
class CuentaBancaria {
  #saldo;
  #pin;
  #historial;

  constructor(titular, saldoInicial, pin) {
    this.titular = titular;
    this.#saldo = saldoInicial;
    this.#pin = pin;
    this.#historial = [];
  }

  #registrarTransaccion(tipo, monto) {
    this.#historial.push({
      fecha: new Date(),
      tipo,
      monto,
      saldo: this.#saldo
    });
  }

  depositar(monto, pin) {
    if (pin !== this.#pin) {
      throw new Error("PIN incorrecto");
    }
    this.#saldo += monto;
    this.#registrarTransaccion("deposito", monto);
    return this;
  }

  retirar(monto, pin) {
    if (pin !== this.#pin) {
      throw new Error("PIN incorrecto");
    }
    if (monto > this.#saldo) {
      throw new Error("Saldo insuficiente");
    }
    this.#saldo -= monto;
    this.#registrarTransaccion("retiro", monto);
    return this;
  }

  get saldo() {
    return this.#saldo;
  }

  get historial() {
    return [...this.#historial]; // Retorna copia
  }
}

const cuenta = new CuentaBancaria("Juan", 1000, "1234");
cuenta.depositar(500, "1234");
cuenta.retirar(200, "1234");

console.log(cuenta.saldo);       // 1300
console.log(cuenta.historial.length); // 2

// No se puede acceder directamente
// console.log(cuenta.#saldo); // Error de sintaxis
```

### 4.2 Metodos Privados y Propiedades Privadas Estáticas

```javascript
class Validador {
  static #patrones = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefono: /^\d{10}$/,
    codigoPostal: /^\d{5}$/
  };

  static #validar(campo, valor) {
    const patron = this.#patrones[campo];
    if (!patron) {
      throw new Error(`Campo no soportado: ${campo}`);
    }
    return patron.test(valor);
  }

  static email(valor) {
    return this.#validar("email", valor);
  }

  static telefono(valor) {
    return this.#validar("telefono", valor);
  }

  static codigoPostal(valor) {
    return this.#validar("codigoPostal", valor);
  }
}

console.log(Validador.email("test@email.com"));      // true
console.log(Validador.email("invalido"));             // false
console.log(Validador.telefono("1234567890"));        // true
console.log(Validador.codigoPostal("12345"));         // true
```

---

## 5. Mixins

Los mixins permiten compartir comportamiento entre clases que no comparten herencia.

### 5.1 Implementacion Basica de Mixins

```javascript
const Serializable = (superclass) => class extends superclass {
  serialize() {
    return JSON.stringify(this);
  }

  deserialize(json) {
    const data = JSON.parse(json);
    Object.assign(this, data);
    return this;
  }
};

const Loggeable = (superclass) => class extends superclass {
  log(mensaje) {
    console.log(`[${new Date().toISOString()}] ${mensaje}`);
  }

  error(mensaje) {
    console.error(`[ERROR] ${mensaje}`);
  }
};

class Usuario {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
  }
}

// Aplicar mixins
class UsuarioCompleto extends Serializable(Loggeable(Usuario)) {
  constructor(nombre, email, rol) {
    super(nombre, email);
    this.rol = rol;
  }
}

const user = new UsuarioCompleto("Juan", "juan@email.com", "admin");
user.log("Usuario creado");
const json = user.serialize();
console.log(json); // {"nombre":"Juan","email":"juan@email.com","rol":"admin"}
```

### 5.2 Mixins para React-like Components

```javascript
const WithLifecycle = (superclass) => class extends superclass {
  componentDidMount() {
    console.log(`${this.constructor.name} montado`);
  }

  componentWillUnmount() {
    console.log(`${this.constructor.name} desmontado`);
  }

  componentDidUpdate() {
    console.log(`${this.constructor.name} actualizado`);
  }
};

const WithState = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this._state = {};
  }

  setState(nuevoEstado) {
    this._state = { ...this._state, ...nuevoEstado };
    this.componentDidUpdate();
  }

  getState() {
    return { ...this._state };
  }
};

class ComponenteBase {
  constructor(nombre) {
    this.nombre = nombre;
  }

  render() {
    return `Componente: ${this.nombre}`;
  }
}

class MiComponente extends WithState(WithLifecycle(ComponenteBase)) {
  constructor(nombre) {
    super(nombre);
    this.setState({ contador: 0 });
  }

  incrementar() {
    this.setState({ contador: this.getState().contador + 1 });
  }
}

const comp = new MiComponente("MiBoton");
comp.componentDidMount(); // "[timestamp] MiComponente montado"
comp.incrementar();        // "[timestamp] MiComponente actualizado"
console.log(comp.getState()); // { contador: 1 }
```

---

## 6. Clases vs Funciones de Fabrica

### 6.1 Funciones de Fabrica

```javascript
function crearPersona(nombre, edad) {
  const persona = {
    nombre,
    edad,
    saludar() {
      return `Hola, soy ${this.nombre}`;
    },
    cumplirAnios() {
      this.edad++;
      return this;
    }
  };
  return persona;
}

const ana = crearPersona("Ana", 25);
console.log(ana.saludar()); // "Hola, soy Ana"
ana.cumplirAnios();
console.log(ana.edad); // 26

// Ventajas de fabricas:
// 1. No necesitan new
// 2. Pueden retornar objetos diferentes
// 3. Closures para privacidad real

function crearCuenta(saldoInicial) {
  let saldo = saldoInicial; // Variable privada via closure

  return {
    depositar(monto) {
      saldo += monto;
      return this;
    },
    retirar(monto) {
      if (monto > saldo) throw new Error("Saldo insuficiente");
      saldo -= monto;
      return this;
    },
    get saldo() {
      return saldo;
    }
  };
}

const cuenta = crearCuenta(1000);
cuenta.depositar(500);
console.log(cuenta.saldo); // 1500
// cuenta.saldo = 99999; // No funciona, es solo getter
```

### 6.2 Comparacion: Clases vs Fabricas

```javascript
// Con Clase
class CounterClass {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
    return this;
  }
  decrement() {
    this.count--;
    return this;
  }
  get value() {
    return this.count;
  }
}

// Con Fabrica
function crearCounter() {
  let count = 0;
  return {
    increment() {
      count++;
      return this;
    },
    decrement() {
      count--;
      return this;
    },
    get value() {
      return count;
    }
  };
}

// Uso
const counterClass = new CounterClass();
const counterFactory = crearCounter();

counterClass.increment().increment();
counterFactory.increment().increment();

console.log(counterClass.value);  // 2
console.log(counterFactory.value); // 2

// Diferencias:
// 1. Fabricas no necesitan new
// 2. Fabricas tienen encapsulamiento real via closures
// 3. Clases son mas formales y estandarizadas
// 4. Clases tienen mejor soporte para herencia
```

---

## 7. Patrones OOP en JavaScript

### 7.1 Patron Singleton

```javascript
class Database {
  static #instance = null;

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }
    this.conexion = " Conexion establecida";
    Database.#instance = this;
  }

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }

  query(sql) {
    return `Ejecutando: ${sql}`;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2); // true
console.log(db1.query("SELECT * FROM usuarios")); // "Ejecutando: SELECT * FROM usuarios"
```

### 7.2 Patron Observer

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

  off(evento, callback) {
    if (!this.eventos[evento]) return;
    this.eventos[evento] = this.eventos[evento].filter(cb => cb !== callback);
  }

  emit(evento, ...args) {
    if (!this.eventos[evento]) return;
    this.eventos[evento].forEach(callback => callback(...args));
  }
}

class Notificador extends EventEmitter {
  enviarNotificacion(usuario, mensaje) {
    console.log(`Notificando a ${usuario}: ${mensaje}`);
    this.emit("notificacion", { usuario, mensaje, fecha: new Date() });
  }
}

const notificador = new Notificador();

// Suscribirse a eventos
const unsubscribe = notificador.on("notificacion", (data) => {
  console.log("Recibido:", data);
});

notificador.enviarNotificacion("Juan", "Hola!");
// "Notificando a Juan: Hola!"
// "Recibido: { usuario: 'Juan', mensaje: 'Hola!', fecha: ... }"

unsubscribe(); // Desuscribirse
```

### 7.3 Patron Strategy

```javascript
class EstrategiaPago {
  static pagar(monto, estrategia) {
    return estrategia(monto);
  }
}

const estrategias = {
  efectivo: (monto) => `Pagando $${monto} en efectivo`,
  tarjeta: (monto) => `Cobrando $${monto} a tarjeta`,
  transferencia: (monto) => `Transfiriendo $${monto}`
};

console.log(EstrategiaPago.pagar(100, estrategias.efectivo));
// "Pagando $100 en efectivo"
console.log(EstrategiaPago.pagar(50, estrategias.tarjeta));
// "Cobrando $50 a tarjeta"
```

---

## Buenas practicas

1. **Usar clases** cuando se necesita herencia formal o múltiples instancias con el mismo comportamiento
2. **Usar funciones de fabrica** cuando se necesita encapsulamiento privado simple o no se necesita herencia
3. **Campos privados (#)** para datos que no deben ser accesibles externamente
4. **Metodos estaticos** para utilidades que no dependen de instancias
5. **Preferir composicion sobre herencia** cuando sea posible
6. **Evitar herencia profunda** (mas de 2-3 niveles)
7. **Usar mixins** para compartir comportamiento sin herencia
8. **Inicializar propiedades** en el constructor, nunca fuera
9. **Retornar `this`** en metodos de cadena (fluent interface)
10. **Validar parametros** en constructores y metodos

---

## Ejercicios

### Ejercicio 1: Sistema de Empleados (5 puntos)

Crear una clase `Empleado` con nombre, puesto y salario. Crear subclases `Gerente` y `Desarrollador` con bonos diferentes. Implementar metodo `calcularBono()`.

### Ejercicio 2: Clase Cuenta (5 puntos)

Crear una clase `Cuenta` con campos privados para saldo y historial. Implementar deposito, retiro, transferencia y obtener historial. Usar getters para saldo.

### Ejercicio 3: Patron Observer (5 puntos)

Implementar una clase `Tienda` que extienda `EventEmitter`. Debe emitir eventos cuando se agrega un producto, se realiza una venta y se actualiza inventario.

### Ejercicio 4: Mixins (5 puntos)

Crear un mixin `ConPermisos` que agregue metodos `tienePermiso(permiso)`, `agregarPermiso(permiso)` y `removerPermiso(permiso)`. Aplicar a una clase `Usuario`.

### Ejercicio 5: Patron Singleton (5 puntos)

Crear un `ConfigManager` Singleton que almacene configuraciones. Debe permitir `set(key, value)`, `get(key)` y `getAll()`. Asegurar que solo exista una instancia.

### Ejercicio 6: Fabrica vs Clase (5 puntos)

Implementar la misma funcionalidad (un contador) usando una clase y una funcion de fabrica. Crear una funcion `benchmark` que compare el rendimiento de ambas implementaciones con 100,000 operaciones.

---

## Soluciones

### Solucion Ejercicio 1: Sistema de Empleados

```javascript
class Empleado {
  #salario;

  constructor(nombre, puesto, salario) {
    this.nombre = nombre;
    this.puesto = puesto;
    this.#salario = salario;
  }

  get salario() {
    return this.#salario;
  }

  calcularBono() {
    return this.#salario * 0.05;
  }

  descripcion() {
    return `${this.nombre} - ${this.puesto} - Salario: $${this.#salario}`;
  }

  toString() {
    return this.descripcion();
  }
}

class Gerente extends Empleado {
  constructor(nombre, salario, departamento) {
    super(nombre, "Gerente", salario);
    this.departamento = departamento;
  }

  calcularBono() {
    return this.salario * 0.15;
  }

  descripcion() {
    return `${super.descripcion()} - Depto: ${this.departamento}`;
  }
}

class Desarrollador extends Empleado {
  constructor(nombre, salario, lenguajes = []) {
    super(nombre, "Desarrollador", salario);
    this.lenguajes = lenguajes;
  }

  calcularBono() {
    return this.salario * 0.10;
  }

  descripcion() {
    return `${super.descripcion()} - Lenguajes: ${this.lenguajes.join(", ")}`;
  }
}

// Uso
const gerente = new Gerente("Carlos", 80000, "Tecnologia");
const dev = new Desarrollador("Ana", 60000, ["JavaScript", "Python"]);

console.log(gerente.descripcion());
// "Carlos - Gerente - Salario: $80000 - Depto: Tecnologia"
console.log(`Bono gerente: $${gerente.calcularBono()}`);
// "Bono gerente: $12000"

console.log(dev.descripcion());
// "Ana - Desarrollador - Salario: $60000 - Lenguajes: JavaScript, Python"
console.log(`Bono dev: $${dev.calcularBono()}`);
// "Bono dev: $6000"
```

### Solucion Ejercicio 2: Clase Cuenta

```javascript
class Cuenta {
  #saldo;
  #historial;
  #titular;

  constructor(titular, saldoInicial = 0) {
    if (saldoInicial < 0) {
      throw new Error("El saldo inicial no puede ser negativo");
    }
    this.#titular = titular;
    this.#saldo = saldoInicial;
    this.#historial = [];
    this.#registrar("apertura", saldoInicial);
  }

  #registrar(tipo, monto) {
    this.#historial.push({
      fecha: new Date().toISOString(),
      tipo,
      monto,
      saldo: this.#saldo
    });
  }

  get titular() {
    return this.#titular;
  }

  get saldo() {
    return this.#saldo;
  }

  get historial() {
    return [...this.#historial];
  }

  depositar(monto) {
    if (monto <= 0) throw new Error("Monto debe ser positivo");
    this.#saldo += monto;
    this.#registrar("deposito", monto);
    return this;
  }

  retirar(monto) {
    if (monto <= 0) throw new Error("Monto debe ser positivo");
    if (monto > this.#saldo) throw new Error("Saldo insuficiente");
    this.#saldo -= monto;
    this.#registrar("retiro", monto);
    return this;
  }

  transferir(cuentaDestino, monto) {
    this.retirar(monto);
    cuentaDestino.depositar(monto);
    this.#registrar(`transferencia a ${cuentaDestino.titular}`, monto);
    return this;
  }
}

// Uso
const cuenta1 = new Cuenta("Juan", 1000);
const cuenta2 = new Cuenta("Maria", 500);

cuenta1.depositar(200).retirar(100);
cuenta1.transferir(cuenta2, 300);

console.log(cuenta1.saldo); // 800
console.log(cuenta2.saldo); // 800
console.log(cuenta1.historial.length); // 4
```

### Solucion Ejercicio 3: Patron Observer

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

  off(evento, callback) {
    if (!this.eventos[evento]) return;
    this.eventos[evento] = this.eventos[evento].filter(cb => cb !== callback);
  }

  emit(evento, ...args) {
    if (!this.eventos[evento]) return;
    this.eventos[evento].forEach(callback => callback(...args));
  }
}

class Tienda extends EventEmitter {
  constructor(nombre) {
    super();
    this.nombre = nombre;
    this.productos = [];
    this.ventas = [];
    this.inventario = {};
  }

  agregarProducto(producto) {
    this.productos.push(producto);
    this.inventario[producto.id] = producto.stock;
    this.emit("producto_agregado", producto);
    return this;
  }

  vender(productoId, cantidad) {
    if (!this.inventario[productoId]) {
      throw new Error("Producto no encontrado");
    }
    if (this.inventario[productoId] < cantidad) {
      throw new Error("Stock insuficiente");
    }
    this.inventario[productoId] -= cantidad;
    const venta = { productoId, cantidad, fecha: new Date() };
    this.ventas.push(venta);
    this.emit("venta_realizada", venta);
    this.emit("inventario_actualizado", { productoId, stock: this.inventario[productoId] });
    return this;
  }
}

// Uso
const tienda = new Tienda("Mi Tienda");

tienda.on("producto_agregado", (producto) => {
  console.log(`Producto agregado: ${producto.nombre}`);
});

tienda.on("venta_realizada", (venta) => {
  console.log(`Venta: ${venta.cantidad} unidades del producto ${venta.productoId}`);
});

tienda.on("inventario_actualizado", (data) => {
  console.log(`Stock actualizado: ${data.productoId} = ${data.stock}`);
});

tienda.agregarProducto({ id: 1, nombre: "Laptop", stock: 10 });
tienda.vender(1, 2);
// "Producto agregado: Laptop"
// "Venta: 2 unidades del producto 1"
// "Stock actualizado: 1 = 8"
```

### Solucion Ejercicio 4: Mixins

```javascript
const ConPermisos = (superclass) => class extends superclass {
  #permisos;

  constructor(...args) {
    super(...args);
    this.#permisos = new Set();
  }

  tienePermiso(permiso) {
    return this.#permisos.has(permiso);
  }

  agregarPermiso(permiso) {
    this.#permisos.add(permiso);
    return this;
  }

  removerPermiso(permiso) {
    this.#permisos.delete(permiso);
    return this;
  }

  get permisos() {
    return [...this.#permisos];
  }

  get esAdmin() {
    return this.tienePermiso("admin");
  }
};

class Usuario {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
  }
}

class UsuarioConPermisos extends ConPermisos(Usuario) {
  constructor(nombre, email, rol) {
    super(nombre, email);
    this.rol = rol;
  }
}

// Uso
const usuario = new UsuarioConPermisos("Juan", "juan@email.com", "editor");

usuario.agregarPermiso("leer")
       .agregarPermiso("escribir")
       .agregarPermiso("admin");

console.log(usuario.tienePermiso("leer"));    // true
console.log(usuario.tienePermiso("borrar"));  // false
console.log(usuario.permisos); // ["leer", "escribir", "admin"]
console.log(usuario.esAdmin);  // true

usuario.removerPermiso("admin");
console.log(usuario.esAdmin);  // false
```

### Solucion Ejercicio 5: Patron Singleton

```javascript
class ConfigManager {
  static #instance = null;
  #configuraciones;

  constructor() {
    if (ConfigManager.#instance) {
      return ConfigManager.#instance;
    }
    this.#configuraciones = {};
    ConfigManager.#instance = this;
  }

  static getInstance() {
    if (!ConfigManager.#instance) {
      ConfigManager.#instance = new ConfigManager();
    }
    return ConfigManager.#instance;
  }

  set(key, value) {
    this.#configuraciones[key] = value;
    return this;
  }

  get(key) {
    return this.#configuraciones[key];
  }

  getAll() {
    return { ...this.#configuraciones };
  }

  has(key) {
    return key in this.#configuraciones;
  }

  remove(key) {
    delete this.#configuraciones[key];
    return this;
  }

  clear() {
    this.#configuraciones = {};
    return this;
  }
}

// Uso
const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();

console.log(config1 === config2); // true

config1.set("apiUrl", "https://api.example.com")
       .set("timeout", 5000)
       .set("debug", true);

console.log(config2.get("apiUrl")); // "https://api.example.com"
console.log(config2.getAll());
// { apiUrl: "https://api.example.com", timeout: 5000, debug: true }
```

### Solucion Ejercicio 6: Fabrica vs Clase

```javascript
// Implementacion con Clase
class CounterClass {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
    return this;
  }
  decrement() {
    this.count--;
    return this;
  }
  get value() {
    return this.count;
  }
  reset() {
    this.count = 0;
    return this;
  }
}

// Implementacion con Fabrica
function crearCounter() {
  let count = 0;
  return {
    increment() {
      count++;
      return this;
    },
    decrement() {
      count--;
      return this;
    },
    get value() {
      return count;
    },
    reset() {
      count = 0;
      return this;
    }
  };
}

// Benchmark
function benchmark(tipo, crearInstancia, operaciones) {
  const inicio = performance.now();

  for (let i = 0; i < operaciones; i++) {
    const instancia = crearInstancia();
    for (let j = 0; j < 100; j++) {
      instancia.increment();
    }
  }

  const fin = performance.now();
  const tiempo = fin - inicio;
  console.log(`${tipo}: ${tiempo.toFixed(2)}ms para ${operaciones} instancias`);
  return tiempo;
}

// Ejecutar benchmark
const operaciones = 100000;

const tiempoClase = benchmark("Clase", () => new CounterClass(), operaciones);
const tiempoFabrica = benchmark("Fabrica", crearCounter, operaciones);

console.log(`\nResumen:`);
console.log(`Clase: ${tiempoClase.toFixed(2)}ms`);
console.log(`Fabrica: ${tiempoFabrica.toFixed(2)}ms`);

// Demostracion de uso
const counterClass = new CounterClass();
const counterFabrica = crearCounter();

counterClass.increment().increment().increment();
counterFabrica.increment().increment().increment();

console.log(`\nClase valor: ${counterClass.value}`);   // 3
console.log(`Fabrica valor: ${counterFabrica.value}`); // 3
```
