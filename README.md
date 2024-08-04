# Birthday Alert

Este é um projeto de envio de elerta via email de aniversários.

## Escopo

O escopo para esse projeto foi a possibilidade de receber emails de lembretes de aniversários de forma recorrente. Os métodos implementados foram:

- Aniversariantes no dia (TODAY)
- Aniversariantes na semana seguinte (NEXT_WEEK)
- Aniversariantes no mês (IN_THIS_MONTH)

## Tecnologias

As tecnoligias utilizadas para esse projeto foram:

- Node
  - Para criação das rotinas e de toda a lógica
  - Foi usado node com Typescript
- Node Schedule
  - Pacote para criação de acionadores recorrentes
- Nodemailer
  - Pacote de envio de email
- Google APIS
  - Pacote para acesso a planilha no google sheets
- Vitest
  - Teste usando Vitest

_package.json_

```json
"dependencies": {
    "dotenv": "^16.4.5",
    "googleapis": "105",
    "node-schedule": "^2.1.1",
    "nodemailer": "^6.9.14"
},
"devDependencies": {
    "@types/node": "^22.1.0",
    "@types/node-schedule": "^2.1.7",
    "@types/nodemailer": "^6.4.15",
    "@vitest/coverage-v8": "^2.0.5",
    "typescript": "^5.5.4",
    "vitest": "^2.0.5"
}
```

## Template de Emails

Cada email tem um template. Todos os templates utilizados se encontram em `src\html`.

## Execução do Projeto

Para executar o projeto, instale as dependências e depois execute o comando:

```shell
yarn
yarn dev
```

Caso queira algo mais espefício, veja a tabela abaixo com todos os comandos disponíveis:

| Comando       | Descriçãos                         |
| ------------- | ---------------------------------- |
| yarn build    | Gera o arquivo de `build`          |
| yarn start    | Executa o projeto em produção      |
| yarn dev      | Executa o projeto com o Typescript |
| yarn test     | Executa a pipe de testes           |
| yarn coverage | Gera um relatório de testes        |
