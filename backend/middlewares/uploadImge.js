const multer = require("multer");
const path = require("path");

// Função para criar a configuração do multer
const createMulterConfig = () => {
  return multer({
    // Configuração para onde o arquivo será salvo
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./assets/upload/users"); // Diretório para salvar os arquivos
      },

      filename: (req, file, cb) => {
        // Nome do arquivo com timestamp para evitar conflitos
        cb(null, Date.now().toString() + path.extname(file.originalname));
      },
    }),

    // Função para validar a extensão do arquivo
    fileFilter: (req, file, cb) => {
      // Tipos MIME permitidos
      const allowedFormats = ["image/png", "image/jpg", "image/jpeg"];
      const isValidFormat = allowedFormats.includes(file.mimetype);

      // Retorna TRUE se a extensão é válida
      if (isValidFormat) {
        return cb(null, true);
      }

      // Retorna FALSE se a extensão não é válida e gera um erro
      return cb(
        new Error("Invalid file type. Allowed types are: .png, .jpg, .jpeg"),
        false
      );
    },
  });
};

// Exporta a função para ser usada em outros arquivos
module.exports = createMulterConfig;
