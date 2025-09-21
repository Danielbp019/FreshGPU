// resources/modules/amd.js
export default function getPaths(homeDir) {
  return [
    `${homeDir}\\AppData\\Local\\AMD\\DXCache`,
    `${homeDir}\\AppData\\Local\\AMD\\GLCache`,
    `${homeDir}\\AppData\\Local\\AMD\\ShaderCache`,
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
