// resources/modules/intel.js
export default function getPaths(homeDir) {
  return [
    `${homeDir}\\AppData\\Local\\Intel\\DXCache`,
    `${homeDir}\\AppData\\Local\\Intel\\GLCache`,
    `${homeDir}\\AppData\\Local\\Intel\\ShaderCache`,
    `${homeDir}\\AppData\\Local\\Intel\\GPUCache`,
  ];
}
