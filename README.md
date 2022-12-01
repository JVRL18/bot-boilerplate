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
  &emsp;|-->assets (aqui ficam as embeds , botões ou seja, a parte visual do bot (v0))<br>
  &emsp;|-->commands (aqui ficam os comandos 2 em 1, slash e message, junto de suas embeds (v1)<br>
  &emsp;|-->commands_fixed (aqui ficam os comandos fixos executados por botões ou outros tipos de interação)
  &emsp;|-->events (aqui fica uma "abstração" para os eventos event.on() no index, buscarem dentro dos commandos)<br>
  &emsp;|-->events_custom (aqui ficam os eventos relacionados a canais fixos botões de registro/ticket) <br>
  &emsp;|-->events_music (aqui ficam os eventos do discord player) <br>
  &emsp;|-->models (aqui fica a estrutura de dados do bot na mongodb) <br>
  &emsp;|-->configs (aqui ficam as conexões dos (eventos_<evento>) e o crud do banco de dados para registro de canais por select menu) <br>
  &emsp;|index.js (arquivo principal, logins do bot e handlers)<br>
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
    * Add option to checking users via slash in [check] command
    * Add new data model for transactions ids
* `1.0.0 - 24/11/2022`
    * <details><summary>NEW</summary>

        * Tickets command added at config.js
        * Model for perks creation
        * Rob command
        * Music commands: [STOP, SKIP, SHUFFLE, QUEUE]
    * <details><summary>System changes</summary>

        * Code refactored in general
        * `crud folder created` inside configs for CRUD commands.
        * `Commands_fixed && events_custom folders` created for holding fixed commands, like ticket button.
        * Now index.js `exports` the client
        * Now command loader ignores "_embeds.js" files
        * Economy embeds changed
        * Daily command now adds to wallet instead of Bank
        * Perks, Transactions, guilds, User `schemas added/changed`
    * <details><summary>New command structure</summary>

        * Recomended to use new structure for new commands: `New folder` using the `command name` with a `'_embeds.js' file inside` and also a command file that has the same name as the folder.
    </details>
* `2.0.0 - 26/11/2022`
    * `MUSIC FEATURES UPDATE`
    * <details><summary>NEW</summary>

        * Play command added.
        * `Shuffle, queue, pause, stop, skip, loop and pause` commands added.
        * NEW schema for playlists in general.
        * NEW folder `events_music` created for holding all discord-player `music events`.
        * NEW "button" handler created at `interactionCreate` in `events_custom`.
    </details>

    * <details><summary>System changes</summary>

        * `Tickets` events changed according to `fixed buttons rules` and moved to `commands_fixed/ticket`
        * Guild schema changed to hold music features for individual guilds.
        * User schema changed to hold private user music features data.
        * Edited folder `commands_fixed` strucutre for holding all `fixed buttons` commands.
        * old `music` commands refactored.
    </details>

    * <details><summary>REMOVED</summary>

        * `unite_api` deleted.
        * old `music assets` at `assets folder` deleted.
    </details>
* `2.1.0` - `01/12/2022`
    * `HOTFIX + Quick update`
    * <details><summary>BUGS REMOVED</summary>

        * `fixed` music `loop` bug when player is not defined.
        * `fixed` pause and queue slash commands.
        * `fixed` bug when pressing queue button doesn't show the actual queue and just show when using chat input commands
    </details>
       
    * <details><summary>Changes</summary>

        * `Pause-Skip-Stop` commands now requires user to be admin/music owner
        * Play embeds now calc total playlist length and display single songs duration.
        * Queue embeds changed to display how many pages is there.
        * Almost everthing in music changed to `check permissions` before command execution, using `emojis`
    </details>

    * <details><summary>New</summary>

        * New button to change the added song when `play` command is triggered in case added song is wrong.
        * New buttons commands `save` `delete`, to user save current music to database and use later with favorite command.
        * New commands `favorite` `autoplay`
        * New music events `channelEmpty` `queueEnd` that has the same functions as `stop command` but automaticly when event is triggered
        * New file `global_embeds` for embeds that will be used in mutiple cases
        * New `dev` command `button` for testing button emoji preview 
        * New file emojis.js that exports emojis ID to be accessed everywere `doesn't work in embeds if you're not in the CU discord server.`
        * New `Debug` features in `configs/utils` folder for a better console.log view and checking `music` permissions for almost every music command.
    </details>
* `2.1.1` - `01/12/2022`
    * `Patch`
    * <details><summary>BUGS FIXED</summary>

        * `fixed` save command when user has no profile and now strigify data the parse the data to database to prevent error 
        * `fixed` bug that bot doesn't reset the channels that was set to db when disconnecting
    </details>
## 📋 Licença/License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Spidus/Teste_Final_1">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">INTELI, VICTOR BRUNO ALEXANDER ROSETTI DE QUIROZ</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>

## 🎓 Referências

Aqui estão as referências usadas no projeto.

1. <https://github.com/Intelihub/Template_M1>