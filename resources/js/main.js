/*
    Function to set up a system tray menu with options specific to the window mode.
    This function checks if the application is running in window mode, and if so,
    it defines the tray menu items and sets up the tray accordingly.
*/
function setTray() {
  // Tray menu is only available in window mode
  if (NL_MODE != "window") {
    console.log("INFO: Tray menu is only available in the window mode.");
    return;
  }

  // Define tray menu items
  let tray = {
    icon: "/resources/icons/trayIcon.png",
    menuItems: [
      { id: "VERSION", text: "Get version" },
      { id: "SEP", text: "-" },
      { id: "QUIT", text: "Quit" },
    ],
  };

  // Set the tray menu
  Neutralino.os.setTray(tray);
}

/*
    Function to handle click events on the tray menu items.
*/
function onTrayMenuItemClicked(event) {
  switch (event.detail.id) {
    case "VERSION":
      Neutralino.os.showMessageBox(
        "Version information",
        `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`
      );
      break;
    case "QUIT":
      Neutralino.app.exit();
      break;
  }
}

/*
    Function to handle the window close event.
*/
function onWindowClose() {
  Neutralino.app.exit();
}

// Initialize Neutralino
Neutralino.init();

// Register event listeners
Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

// Conditional initialization: Set up system tray if not running on macOS
if (NL_OS != "Darwin") {
  setTray();
}

// -----------------------------
// Interfaz y lógica del proyecto
// -----------------------------
const gpuSelect = document.getElementById("gpuSelect");
const deleteButton = document.getElementById("deleteCacheButton");
const gpuSelectWrapper = document.getElementById("gpuSelectWrapper");
const gpuPathsList = document.querySelector("#gpuPaths ul");
const procesoList = document.querySelector("#proceso ul");

// Modal
const confirmModal = document.getElementById("confirmModal");
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
const cancelButtons = document.querySelectorAll(".cancelButton, .delete");

// Estado
let currentVendor = null;
let currentModule = null;

// Cargar módulo dinámicamente
async function loadVendorModule(vendor) {
  try {
    const homeDir = await Neutralino.os.getEnv("USERPROFILE");

    const module = await import(`../modules/${vendor}.js`);
    const paths = module.default(homeDir);

    currentVendor = vendor;
    currentModule = module;
    currentModule.paths = paths;

    showPaths(paths);
  } catch (err) {
    console.error(`Error cargando módulo de ${vendor}:`, err);
  }
}

// Mostrar rutas
function showPaths(paths) {
  gpuPathsList.innerHTML = "";
  procesoList.innerHTML = "";
  paths.forEach((path) => {
    const li = document.createElement("li");
    li.textContent = path;
    gpuPathsList.appendChild(li);
  });
}

// Abrir modal
function openModal() {
  confirmModal.classList.add("is-active");
}

// Cerrar modal
function closeModal() {
  confirmModal.classList.remove("is-active");
}

// Ejecutar borrado usando el módulo cargado
async function deleteCache() {
  if (!currentModule || !currentModule.paths) return;

  procesoList.innerHTML = "";

  for (const path of currentModule.paths) {
    const li = document.createElement("li");
    li.textContent = `Eliminando archivos en: ${path}`;
    procesoList.appendChild(li);

    try {
      await currentModule.cleanPath(path);
      const li2 = document.createElement("li");
      li2.textContent = `Completado: ${path}`;
      procesoList.appendChild(li2);
    } catch (err) {
      const liErr = document.createElement("li");
      liErr.textContent = `Error al eliminar: ${path}`;
      procesoList.appendChild(liErr);
    }
  }
}

// Eventos
gpuSelect.addEventListener("change", async () => {
  deleteButton.className = "button";
  gpuSelectWrapper.className = "select";
  deleteButton.disabled = false;

  if (gpuSelect.value) {
    await loadVendorModule(gpuSelect.value);
  }

  switch (gpuSelect.value) {
    case "nvidia":
      deleteButton.classList.add("is-success");
      gpuSelectWrapper.classList.add("is-success");
      break;
    case "amd":
      deleteButton.classList.add("is-danger");
      gpuSelectWrapper.classList.add("is-danger");
      break;
    case "intel":
      deleteButton.classList.add("is-link");
      gpuSelectWrapper.classList.add("is-link");
      break;
    default:
      deleteButton.classList.add("is-light");
      gpuSelectWrapper.classList.add("is-light");
      deleteButton.disabled = true;
  }
});

// Botón borrar abre modal
deleteButton.addEventListener("click", () => {
  if (!deleteButton.disabled && currentVendor) {
    openModal();
  }
});

// Confirmar borrado
confirmDeleteButton.addEventListener("click", async () => {
  closeModal();
  await deleteCache();
});

// Cancelar modal
cancelButtons.forEach((btn) => btn.addEventListener("click", closeModal));
