# CRUD de Usuários com autenticação

Acesse a versão live do projeto [este link](http://ec2-52-14-239-7.us-east-2.compute.amazonaws.com:3000).
Para ter acesso como admin, autenticar com:  
```
email: usuario1@email.com.br  
senha: <senha padrão do db.json fornecido>  
```

Todos os registros estão como no `db.json` original.

## Instruções

Após clonar este repositório, execute

- `npm install` para instalar as dependências;
- `npm start` para iniciar o frontend;

A aplicação estará rodando em `localhost:3000`.

**Importante**: Você precisa rodar o próprio server.  
A URL pré-definida para o server é _localhost:3001_.  
Esta url pode ser configurada no arquivo `/src/api/index.js`, na variável `LOCAL_URL`
