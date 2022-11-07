# DiscordJS bot boilerplate

## Integrantes: <a href="https://www.linkedin.com/in/joao-vitor-ribeiro-de-lima-dev/">João Vitor Ribeiro</a>

## Descrição
📜 Este boilerplate é um projeto simples que te poupa tempo e te coloca direto na mão na massa na hora de criar bots do discord.
<br><br>

💡 Meu projeto é uma estrutura que passo a quem tem contato comigo e também traz o multi-handler para os comandos serem 2 em 1
<br><br>
## 🛠 Estrutura de pastas
-Raiz<br>
|<br>
|-->src<br>
  &emsp;|-->assets<br>
  &emsp;|-->commands<br>
  &emsp;|-->events<br>
  &emsp;|-->models<br>
  &emsp;|index.js<br>
|.env<br>
|.gitignore<br>
|package.json<br>
|readme.md<br>

## 💻 Configuração para Desenvolvimento

1 - Faça o download do NodeJS e deste repositório.

2 - Selecione a pasta onde descompactou este repositório.

3 - Abra seu terminal na pasta do projeto e execute o comando `npm i`.

4 - Coloque suas chaves (moongose, discord developer) em .env em suas respectivas variáveis.

5 - Escolha um prefixo para seu bot e coloque ele no respectivo campo em `.env`

5 - Em package.json cole o ID do seu servidor após `local=` em scripts, ex: `local=123123` ou altere `local=` para `global`.

6 - Execute `npm run dev`

Para abrir este projeto você necessita das seguintes ferramentas:

--> <a href="nodejs.org"> NODEJS </a>

## 🗃 Histórico de lançamentos

* 0.1.0 - 25/10/2022
    * Lançamento do projeto base.
* 0.2.0 - 02/11/2022
    * Add pokemon unite profile lookup feature as required
    * Create temporary voice chat features
    * Start working on owner interface configuration page
* 0.2.1 - 02/11/2022
    * Changed folder structure on commands now it's based by utility
    * Changed command "finder" so it searchs recursively in commands folder
    * Finish add/remove feature on owner config menu
    * Change temp_vc.js variables to acess database variables
    * Change event voice state variables to access database variables
* 0.3.0 - 04/11/2022
    * Fix bugs of text commands register errors.
    * New economy commands: Give, Withdraw, deposit.
    * New moderation command dev start: Kick.
    * Changed messageCreate commands execute arguments to get all parms by an array.
    * Removed index.js
* 0.3.1 - 04/11/2022
    * Bug fixes in kick commands.
    * Variable input1 at messageCreate changed to first element of args.
    * Added index.js
* 0.4.0 - 05/11/2022
    * Add experimental music [play] command
    * Fix give command bugs
* 0.4.1 - 07/11/2022
    * Add optin to checking users via slash in [check] command
    * Add new data model for transactions ids
    
## 📋 Licença/License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Spidus/Teste_Final_1">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">INTELI, VICTOR BRUNO ALEXANDER ROSETTI DE QUIROZ</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>

## 🎓 Referências

Aqui estão as referências usadas no projeto.

1. <https://github.com/Intelihub/Template_M1>