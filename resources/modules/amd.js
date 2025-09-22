// resources/modules/amd.js
export default function getPaths(homeDir) {
  return [
    `${homeDir}\\AppData\\Local\\AMD\\DXCache`,
    `${homeDir}\\AppData\\Local\\AMD\\GLCache`,
    `${homeDir}\\AppData\\Local\\AMD\\ShaderCache`,
    `${homeDir}\\AppData\\Local\\AMD\\Common\\Cache`,
  ];
}
