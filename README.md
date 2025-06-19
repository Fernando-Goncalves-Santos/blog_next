# TheBlog ✍️🚀

Bem-vindo ao **TheBlog**, uma aplicação web desenvolvida com Next.js que permite criar, editar e gerenciar posts de forma simples, intuitiva e eficiente. Este projeto é focado em uma boa experiência tanto para desenvolvedores quanto para usuários finais.

--

## 📋 1. Descrição

O **TheBlog** é uma plataforma de blog full stack que permite:

- ✅ Criação, edição e exclusão de posts
- 🖼️ Upload de imagens
- 🔐 Autenticação com JWT
- 📝 Escrita com suporte a Markdown
- 🎨 Design responsivo e limpo utilizando Tailwind CSS
- 🔍 URLs amigáveis com slugs automáticos
- 🔒 Sanitização de conteúdo para garantir segurança

--

## 🚀 2. Como Executar o Projeto

###  Você pode conferir a versão online 👉 **[Clicando aqui](https://theblog-sable.vercel.app)**, ou se prefererir pode rodar localmente o projeto executando o passo a passo a seguir:

### 🔧 **Passo a passo para rodar localmente:**

> **Pré-requisitos:**  
✔ Node.js instalado na sua máquina

> **Pré-requisitos OPCIONAIS:**
✔ Um banco de dados PostgreSQL configurado **no prisma accelerate**. Caso não possua, configure o projeto para utilizar o banco de dados SQLite (seção 4)
✔ Uma conta no Cloudinary para upload de imagens na web. Caso não possua, configure o projeto para upload local (seção 5)


--

### 🏗️ 3. **Instalação e Setup para rodar localmente**

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

--

#### 4. Alteração do banco de dados de postgreSQL para SQLite com DrizzleDB:

No arquivo index.ts em src/repositories/post altere de:
```ts
import { PostRepository } from "./post-repository";
import { PrismaPostRepository } from "./prisma-post-repository";

export const postRepository: PostRepository = new PrismaPostRepository()
```

para:
```ts
import { DrizzlePostRepository } from "./drizzle-post-repository";
import { PostRepository } from "./post-repository";

export const postRepository: PostRepository = new DrizzlePostRepository()
```

--

### Crie as tabelas no banco de dados SQLite

Crie as tabelas no banco
```bash
npm run migrate

# (Opcional) Popule o banco com posts de exemplo
npm run seed
```

--

### 5. Alteração do servidor Cloudinary para upload de imagens local

Cole o conteúdo do [gist](https://gist.github.com/Fernando-Goncalves-Santos/e0701f7936db19ac91828ab49c989b58#file-upload-image-action-ts) no arquivo /src/actions/upload/upload-image-action.ts substituindo todo o conteúdo.

--

## 🤝 6. Como Contribuir

Contribuições são sempre bem-vindas! Se você quiser contribuir para o projeto **TheBlog**, siga os passos abaixo:

- Faça um **fork** deste repositório.
- Crie uma nova branch para sua feature:  
`git checkout -b feature/sua-nova-feature`
- Faça o commit das suas alterações:  
`git commit -m 'Adiciona nova feature'`
- Faça o push para sua branch:  
`git push origin feature/sua-nova-feature`
- Abra um **Pull Request** neste repositório e descreva suas alterações.

--

## 👨‍💻 7. Autor

**Fernando Gonçalves Santos**

- LinkedIn: [Fernando](https://www.linkedin.com/in/fernando-goncalves-santos)

--

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


