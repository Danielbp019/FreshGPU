## FreshGPU

Limpiar las carpetas de caché de controladores gráficos de diferentes rutas, dependiendo del fabricante y muestra las rutas a donde el programa apunta.

## 🚀 Características.

- Limpieza de caché de controladores NVIDIA, AMD e Intel.

- Interfaz ligera con Bulma CSS.

- Compatible con Windows.

- Interfaz construida con Neutralino.js.

## 📋 Requisitos previos para desarrollo.

- Neutralinojs instalado globalmente.

```sh
npm install -g @neutralinojs/neu
```

- Node.js (opcional, para desarrollo).

## Actualizar para descargar el core del programa

```sh
neu update
```

## Ejecutando su aplicación:

```sh
neu run
```

## Construyendo la aplicación:

```sh
neu build --release --clean
```

## Árbol:

```sh
FreshGPU/
├── bin/
├── neutralino.config
├── resources/
│   ├── css/
│   │   ├── styles.css
│   │   └── bulma/
│   ├── fonts/
│   ├── icons/
│   ├── js/
│   │   ├── main.js
│   │   ├── neutralino.d
│   │   └── neutralino.js
│   ├── modules/
│   │   ├── amd.js
│   │   ├── intel.js
│   │   ├── nvidia.js
│   │   └── shared.js
│   └── index.html
```
