// resources/modules/nvidia.js
export default function getPaths(homeDir) {
  return [
    `${homeDir}\\AppData\\Local\\NVIDIA\\DXCache`, 
    `${homeDir}\\AppData\\Local\\NVIDIA\\GLCache`
  ];
}

export async function cleanPath(path) {
  try {
    await Neutralino.filesystem.removeDirectory(path, { recursive: true });
    await Neutralino.filesystem.createDirectory(path);
  } catch (err) {
    console.error(`Error borrando ${path}:`, err);
    throw err;
  }
}
