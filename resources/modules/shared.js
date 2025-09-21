// Lógica genérica de borrado que usan todos los fabricantes
async function deleteFolderContents(folderPath) {
  let logs = [];

  try {
    const items = await Neutralino.filesystem.readDirectory(folderPath);

    for (const item of items) {
      if (item.entry === "." || item.entry === "..") continue;
      const itemPath = `${folderPath}\\${item.entry}`;

      try {
        if (item.type === "DIRECTORY") {
          logs = logs.concat(await deleteFolderContents(itemPath));
          await Neutralino.filesystem.removeDirectory(itemPath);
          logs.push(`📁 Carpeta eliminada: ${itemPath}`);
        } else {
          await Neutralino.filesystem.removeFile(itemPath);
          logs.push(`🗑️ Archivo eliminado: ${itemPath}`);
        }
      } catch (error) {
        logs.push(`⚠️ No se pudo borrar: ${itemPath} - ${error.message}`);
      }
    }
  } catch (error) {
    logs.push(`⚠️ Error al acceder a: ${folderPath} - ${error.message}`);
  }
  return logs;
}

async function clearCache(cachePaths) {
  let logs = [];

  for (const dirPath of cachePaths) {
    try {
      await Neutralino.filesystem.readDirectory(dirPath);
      logs = logs.concat(await deleteFolderContents(dirPath));
      logs.push(`✅ Contenido de ${dirPath} eliminado.`);
    } catch {
      logs.push(`⚠️ La carpeta ${dirPath} no existe o no se puede acceder.`);
    }
  }

  logs.push("🚀 Limpieza completada.");
  return logs;
}

export { clearCache };
