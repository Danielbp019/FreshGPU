// resources/js/main.js

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
    currentModule = { paths };

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

// Ejecutar borrado usando shared.js
async function deleteCache() {
  if (!currentModule || !currentModule.paths) return;

  procesoList.innerHTML = "";

  const logs = await window.clearCache(currentModule.paths);

  logs.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    procesoList.appendChild(li);
  });
}

// Eventos cambio de color de boton
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
      // Limpiar rutas y procesos cuando se vuelve a "Seleccione..."
      gpuPathsList.innerHTML = "";
      procesoList.innerHTML = "";
      currentVendor = null;
      currentModule = null;
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

// Inicializar Neutralino
Neutralino.init();
