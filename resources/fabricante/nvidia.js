const path = require("node:path");
const os = require("os");
const fs = require("fs").promises;

function getNvidiaCachePaths() {
  const userName = os.userInfo().username; // Obtiene el nombre del usuario
  return [
    path.join("C:\\Users", userName, "AppData\\Local\\NVIDIA\\DXCache"),
    path.join("C:\\Users", userName, "AppData\\Local\\NVIDIA\\GLCache"),
  ];
}

// Función recursiva para borrar archivos y carpetas dentro de DXCache y GLCache
async function deleteFolderContents(folderPath, event) {
  try {
    const items = await fs.readdir(folderPath, { withFileTypes: true });

    for (const item of items) {
      const itemPath = path.join(folderPath, item.name);
      try {
        if (item.isDirectory()) {
          await deleteFolderContents(itemPath, event); // Llamada recursiva para subcarpetas
          await fs.rmdir(itemPath); // Borra la subcarpeta si está vacía
          event.reply("update-process", `📁 Carpeta eliminada: ${itemPath}`);
        } else {
          await fs.unlink(itemPath); // Borra el archivo
          event.reply("update-process", `🗑️ Archivo eliminado: ${itemPath}`);
        }
      } catch (error) {
        event.reply("update-process", `⚠️ No se pudo borrar: ${itemPath} - ${error.message}`);
      }
    }
  } catch (error) {
    event.reply("update-process", `⚠️ Error al acceder a: ${folderPath} - ${error.message}`);
  }
}

async function clearNvidiaCache(event) {
  const cachePaths = getNvidiaCachePaths();

  for (const dirPath of cachePaths) {
    try {
      await fs.access(dirPath); // Verifica si la carpeta existe
      await deleteFolderContents(dirPath, event); // Borra todo dentro
      event.reply("update-process", `✅ Contenido de ${dirPath} eliminado.`);
    } catch {
      event.reply("update-process", `⚠️ La carpeta ${dirPath} no existe o no se puede acceder.`);
    }
  }

  event.reply("update-process", "🚀 Limpieza completada.");
}

module.exports = { getNvidiaCachePaths, clearNvidiaCache };
