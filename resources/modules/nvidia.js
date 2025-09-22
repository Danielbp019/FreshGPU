// resources/modules/nvidia.js
export default function getPaths(homeDir) {
  return [
    `${homeDir}\\AppData\\Local\\NVIDIA\\DXCache`, 
    `${homeDir}\\AppData\\Local\\NVIDIA\\GLCache`,
  ];
}
