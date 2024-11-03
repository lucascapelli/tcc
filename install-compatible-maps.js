const { exec } = require("child_process");

// Versões que sabemos serem compatíveis
const reactNativeMapsVersion = "1.18.2";
const reactNativeMapsDirectionsVersion = "1.9.0";

// Comando para instalar versões específicas com a flag --legacy-peer-deps
const installCommand = `npm install react-native-maps@${reactNativeMapsVersion} react-native-maps-directions@${reactNativeMapsDirectionsVersion} --legacy-peer-deps`;

console.log("Instalando versões compatíveis de react-native-maps e react-native-maps-directions...");

exec(installCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao instalar dependências: ${error.message}`);
    return;
  }
  if (stderr) {
    console.warn(`Aviso durante a instalação: ${stderr}`);
  }
  console.log(`Resultado da instalação:\n${stdout}`);
  console.log("Dependências instaladas com sucesso!");
});
