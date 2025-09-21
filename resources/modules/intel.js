// resources/modules/intel.js
export default function getPaths(homeDir) {
  return [
    `${homeDir}\\AppData\\Local\\Intel\\DXCache`,
    `${homeDir}\\AppData\\Local\\Intel\\GLCache`,
    `${homeDir}\\AppData\\Local\\Intel\\ShaderCache`,
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
