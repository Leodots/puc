## Api Restful com Cache

### Pré-requisitos

Antes de começar, você precisa ter o Node.js e o npm (Node Package Manager) instalados em sua máquina. Para verificar a instalação, execute:

```
bash
Copy code
node --version
npm --version
```

Caso esses comandos exibam as versões, você está pronto para prosseguir. Se não, instale o Node.js seguindo as instruções no site oficial.

## Executando o Projeto

Para iniciar o servidor do projeto, execute:

```
node server.js
```

O servidor iniciará na porta definida no seu arquivo server.js, geralmente na porta 3000. Você pode acessar a aplicação via navegador em http://localhost:3000.

## Testando os Endpoints da API

Você pode testar os endpoints da API usando uma ferramenta como o Postman ou diretamente no terminal com curl. Aqui estão exemplos de como testar cada operação CRUD:

### Obter Todos os Produtos

```
curl --location --request GET 'http://localhost:3000/produtos'
```

### Adicionar um Novo Produto

```
curl --location --request POST 'http://localhost:3000/produtos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "descricao": "Café Moído 500g",
    "valor": 10.50,
    "marca": "Café Exemplo"
}'
```

### Atualizar um Produto

Substitua {id} pelo ID do produto que você deseja atualizar.

```
curl --location --request PUT 'http://localhost:3000/produtos/{id}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "descricao": "Café Moído 500g - Nova Embalagem",
    "valor": 11.00,
    "marca": "Café Exemplo"
}'
```

### Deletar um Produto

Substitua {id} pelo ID do produto que você deseja deletar.

```
curl --location --request DELETE 'http://localhost:3000/produtos/{id}'
```
