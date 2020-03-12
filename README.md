# ECommerce - JavaScript, NodeJS e MongoDB
Um sisteminha básico pra ajudar a galera que precisa evoluir nos estudos de Java e Interface Gráfica.

# Instruções
1. Abra a pasta com algum editor
2. npm i
3. nodemon

# Página inicial
![Alt Text](https://imgur.com/K5sZxdY.png)

# Tela para registro de usuário
![Alt Text](https://imgur.com/f1DhjaP.png)

# Tela login
![Alt Text](https://imgur.com/lmiLd9v.png)

# Tela para listagem de usuarios
![Alt Text](https://imgur.com/OFHYu92.png)


O sistema inclui também, funcionalidades para: editar, excluir e afins.



Como o javascript 'nao possui' a mesma ideologia de interfaces que linguagens como C# e Java usam eu utilizei uma pasta services no repositorio, onde criei comportamentos isolados (pra poder parecerem com interfeces), onde sao assinadas como contrato no construtor do repositorio... assim eu meio que 'obrigo' o repositorio a utilizar as funcionalidades das interfaces, claro que nao vai obrigar  devido o js nao suportar, mas na pratica fica organizado e atende bem aos principios de SOLID.

Com isso, temos o repositorio somente acessndo o banco, e as interfaces, que sao comportamentos mutaveis, isolei pra nao quebrar o escopo do repositorio e nao gerar uma dependencia.

Qualquer objeção eh so me mandar um email web.dborges@gmail.com