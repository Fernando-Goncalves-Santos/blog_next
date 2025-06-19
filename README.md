# TheBlog ✍️🚀

Bem-vindo ao **TheBlog**, uma aplicação web desenvolvida com Next.js que permite criar, editar e gerenciar posts de forma simples, intuitiva e eficiente. Este projeto é focado em uma boa experiência tanto para desenvolvedores quanto para usuários finais.

---

## 📋 Descrição

O **TheBlog** é uma plataforma de blog full stack que permite:

- ✅ Criação, edição e exclusão de posts
- 🖼️ Upload de imagens
- 🔐 Autenticação com JWT
- 📝 Escrita com suporte a Markdown
- 🎨 Design responsivo e limpo utilizando Tailwind CSS
- 🔍 URLs amigáveis com slugs automáticos
- 🔒 Sanitização de conteúdo para garantir segurança

---

## 🚀 Como Executar o Projeto

###  Você pode conferir a versão online 👉 **[Clicando aqui](https://theblog-sable.vercel.app)**, ou se prefererir pode rodar localmente o projeto executando o passo a passo a seguir:

### 🔧 **Passo a passo para rodar localmente:**

> **Pré-requisitos:**  
✔ Node.js instalado na sua máquina    

---

### 🏗️ **Instalação e Setup para rodar localmente**

```bash
# Clone o repositório
git clone https://github.com/---seu-usuario---/blog-app.git

# Acesse a pasta do projeto
cd blog-app

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Copie o .env.example e renomeie para .env.local

# Edite o .env.local com suas configurações:
# - URL do banco de dados (PostgreSQL ou SQLite)
# - Chave secreta JWT
# - Credenciais do Cloudinary

```

#### Altere o banco de dados de postgreSQL para SQLite com DrizzleDB:
```ts
# - No arquivo index.ts em src/repositories/post altere de:
import { PostRepository } from "./post-repository";
import { PrismaPostRepository } from "./prisma-post-repository";

export const postRepository: PostRepository = new PrismaPostRepository()
export const postRepository: PostRepository = new PrismaPostRepository()  
# - para:
import { DrizzlePostRepository } from "./drizzle-post-repository";
import { PostRepository } from "./post-repository";

export const postRepository: PostRepository = new DrizzlePostRepository()
```

### Crie as tabelas no banco de dados SQLite
```bash
# Crie as tabelas no banco
npm run migrate

# (Opcional) Popule o banco com posts de exemplo
npm run seed
```

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Se você quiser contribuir para o projeto **TheBlog**, siga os passos abaixo:

- Faça um **fork** deste repositório.
- Crie uma nova branch para sua feature:  
`git checkout -b feature/sua-nova-feature`
- Faça o commit das suas alterações:  
`git commit -m 'Adiciona nova feature'`
- Faça o push para sua branch:  
`git push origin feature/sua-nova-feature`
- Abra um **Pull Request** neste repositório e descreva suas alterações.

## 👨‍💻 Autor

**Fernando Gonçalves Santos**

- LinkedIn: [Fernando](https://www.linkedin.com/in/fernando-goncalves-santos)

---

💡 O TheBlog é um projeto focado na simplicidade e facilidade de uso. Atualmente, ele oferece funcionalidades essenciais para criação e gestão de conteúdos de blog.

Sinta-se à vontade para contribuir com:

- Novas funcionalidades
- Melhorias de performance
- Sugestões de design
- Correções de bugs
- Documentação

Caso tenha alguma dúvida, problema ou sugestão, não hesite em abrir uma **issue** neste repositório. 📝🚀

---

🎯 **Divirta-se desenvolvendo e utilizando o TheBlog!**


