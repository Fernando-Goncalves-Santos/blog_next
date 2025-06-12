# Servidor

Comandos para iniciar o site do zero:

```sh
# ***Para rodar o projeto é necessário ter o Node instalado***
# Instalação de todos os pacotes
npm i

# Configure o .env.local a partir do .env.example (copie o arquivo, altere o nome para .env.local e siga as configurações)

# Criação do banco de dados
npm run migrate

# O seed é opcional. Caso você queria inicializar o blog com alguns posts para referência. Caso deseje iniciar sem posts, não execute o comando a seguir
npm run seed

# build do next.js
npm run build
npm start # caso queria fazer alguns testes
```