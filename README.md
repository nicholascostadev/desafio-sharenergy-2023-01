# Sharenergy

Teste para vaga de Full-stack Developer.

Dei deploy do site nessa [URL](https://sharenergy-test.netlify.app/)

## Vídeo

- [Vídeo de apresentação](https://www.youtube.com/watch?v=gPYd0Up-WRM)

## Tecnologias utilizadas

Front-end

Escolhi essas tecnologias a partir do que estava sendo dito no repositório que a empresa utiliza, como o React(Não foi especificado Nextjs, então usei o Vite, mas acharia melhor o Nextjs), TypeScript (Não utilizo mais JavaScript praticamente, TailwindCSS(minha estilização favorita):

- [React + Vite](https://vitejs.dev/)
- [Tailwindcss](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [classNames](https://github.com/JedWatson/classnames)
- [React-query](https://react-query-v3.tanstack.com/)
- [React-hook-form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [dayjs](https://day.js.org/)

Back-end

Não foi dito exatamente qual framework era utilizado para trabalhar com o MongoDB, como eu tenho mais experiência com o Prisma, acabei optando por ele.

- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Express](https://expressjs.com/)
- [jwt](https://jwt.io/)
- [Zod](https://github.com/colinhacks/zod)

## Pontos fortes da aplicação

- Clean Code
- Componentização do front-end permitindo melhor reusabilidade
- Todos os dados tanto enviados quanto recebidos são altamente validados através da biblioteca [zod](https://github.com/colinhacks/zod).

## Pontos que não puderam ser resolvidos em deploy

- A autorização está sendo feita através de um Header `authorization: Bearer tokenDoUsuário`, está sendo desta maneira por dois motivos:
  1. Só existe um usuário na aplicação
  2. Como eu não possuo um domínio próprio, não consegui deixar o back-end e o front-end no mesmo domínio, impossibilitando de setar os cookies no front-end
- O token sendo passado no `Bearer` é apenas o token JWT do usuário, não chega a ser um problema porque o token é verificado no back-end todas requisições para saber se está válido ou não, porém, não está seguindo as recomendações de autorização tipo [Auth0](https://auth0.com/).

## Como rodar o projeto localmente

Pra rodar o site localmente você vai precisar rodar tanto o back-end quanto o front-end ao mesmo tempo, para fazer isso você pode seguir esses passos:

```bash
# Clone o repositório
git clone https://github.com/nicholascostadev/desafio-sharenergy-2023-01.git
# Entre na pasta do Front-end
cd front-end
# Instale as dependências
npm install
# Rode o servidor em modo desenvolvimento
npm run dev
```

Em outro terminal:

```bash
# Entre na pasta do back-end
cd back-end
# Instale as dependências
npm install
# Rode o servidor em modo desenvolvimento
npm run dev
```

Agora está tudo funcionando e basta entrar na url: `http://localhost:5173s`

## Rodar os testes

Os testes só foram desenvolvidos para o Back-end, fazer os testes para o Front-end levaria muito tempo e não achei necessário priorizar nesse desafio.

```bash
# Entre na pasta do back-end
cd back-end
# Rode os testes
npm run test

# Caso queira rodar os testes com coverage report, pode usar também:
npm run test:coverage
```

## Como testar

- Único usuário cadastrado: login: `desafiosharenergy`, senha: `sh@r3n3rgy`
- Páginas:
  1. Dashboard - Essa página pega é responsável por pegar os usuário aleatórios da [random user api](https://randomuser.me/) e renderiza uma tabela mostrando a foto, nome, email, username e idade. É possível escolher a quantidade de usuários por página e filtrar através do seu nome, email ou username
  2. Cat - Essa página espera um código HTTP válido e retorna uma imagem de um gato correspondente com o código HTTP enviado. Utiliza-se a api de [httpCat](https://http.cat/) passando o status desejado, que retorna uma imagem que corresponde.
  3. Dog - Essa página carrega inicialmente uma imagem ou GIF de cachorro aleatório e possui um botão capaz de gerar mais. Os GIFs e imagens são gerados a partir da [api](https://random.dog/). Como essa API retorna um HTML, foi necessário pegar o HTML e encontrar o elemento que contenha o `src` necessário para imagem ou GIF, assim sendo possível mostrar na tela (essa foi a maneira que eu encontrei para utilizar essa API, não encontrei uma maneria de pegar o src a partir de um endpoint, então fiz o possível)
  4. Clientes - Página responsável por mostrar clientes cadastrados e permitir o cadastro de novos, edição ou deleção de clientes já cadastrados. Possui diversas validações, não permitindo CPFs inválidos. Na tabela é possível pesquisar clientes pelo email ou nome, alterar o número de itens por página.
