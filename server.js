const app = require("./src/app");
const { sequelize } = require("./src/models");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.sync({ force: false }); 
    console.log("Tabelas criadas com sucesso");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

start();