createServer({
  models: {
    transaction: Model,
  },

  //começar com alguma transaction já, porque por defaut vem sem nada
  seeds(server) {
    server.db.loadData({
      transactions: [],
    });
  },

  routes() {
    this.namespace = "api"; /* na chamada tem o api na url */
    this.get("/transactions", () => {
      return this.schema.all("transaction");
      //retornar todos os dados do model transaction, todas as transações do banco de dados
    });
    // criar rota de listagem;request: dadosque envia para transactionsb. scheame: banco de dados (qual o model, dados que passa para o model)
    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transaction", data);
    });
  },
});
