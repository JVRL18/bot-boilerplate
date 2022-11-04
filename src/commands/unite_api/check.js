const fetch = require("node-fetch");
//const fs = require('fs')

const getPlayer = (player) => {
  return fetch(`https://uniteapi.dev/p/${player}`).then(async (r) => {
    let a = await await r.text();
    let innerText = 'meta content="Pokémon Unite :';
    let enderText = 'property="og:description"/';
    let expectedText = a.slice(
      a.indexOf(innerText) + innerText.length + 1,
      a.indexOf(enderText) - 2
    );
    const formatter = (update) => {
      const rankFormatter = function (e) {
        const infos = {
          rank: "",
          points: null,
          league: null,
        };
        let rankPoints = "";
        let name = "";
        for (const key of e) {
          if (key == Number(key)) {
            rankPoints += key;
          } else {
            infos.rank += key;
            name += key;
          }
        }
        if (name.includes("Master") === true) {
          if (name.includes("null") === true) {
            name = name.slice(0, name.indexOf("null"));
            infos.rank = name;
          }
          infos.points = Number(rankPoints);
          return infos;
        } else {
          infos.rank =
            infos.rank.slice(0, infos.rank.indexOf("null")) +
            ` ${Number(rankPoints)}`;
          infos.league = Number(rankPoints);
          return infos;
        }
      };
      let finalData = {
        level: Number,
        rank: String,
        wins: Number,
        wr: Number,
        battles: Number,
        rankPoints: Number,
        username: player,
      };
      let edit = "";
      for (const key of update) {
        if (key !== " ") edit += key;
      }

      const winsFinder = "\nWins:";
      const wrFinder = "\nWinRate:";
      const lvFinder = "Lv.";
      const rankFinder = lvFinder.length + 2;
      const battlesFinder = "Battles:";

      let wholeRank = rankFormatter(
        edit.slice(rankFinder, edit.indexOf(battlesFinder))
      );

      let battles = Number(
        edit.slice(
          edit.indexOf(battlesFinder) + battlesFinder.length,
          edit.indexOf(winsFinder)
        )
      );

      let wins = Number(
        edit.slice(
          edit.indexOf(winsFinder) + winsFinder.length,
          edit.indexOf(wrFinder)
        )
      );

      let winRate = Number(
        edit.slice(edit.indexOf(wrFinder) + wrFinder.length)
      );

      finalData.level = Number(
        edit.slice(lvFinder.length, lvFinder.length + 2)
      );
      finalData.rank = wholeRank.rank;
      finalData.rankPoints = wholeRank.points;
      finalData.battles = battles;
      finalData.wins = wins;
      finalData.wr = winRate;

      if (finalData.rank.length > 20) return undefined;
      return finalData;
    };
    return formatter(expectedText);
    // fs.writeFileSync('./html.txt', a)
    // fs.writeFileSync('./text.txt', expectedText)
    // fs.writeFileSync('./formated.json', JSON.stringify(cool, null, 2))
  });
};

const { SlashCommandBuilder } = require("discord.js");
const {
  embed_404_user,
  embed_404_error_message,
  await_fetching,
} = require("../../assets/embeds/global");
const { unite_profile_embed } = require("../../assets/embeds/unite_api");

const code = async (where, client, name) => {
  const msg = await where.reply({ embeds: [await_fetching()] });
  let infos = await getPlayer(name);
  if (infos === undefined) return msg.edit({ embeds: [embed_404_user(name)] });
  const b = "```";
  return msg.edit({ embeds: [await unite_profile_embed(infos)] });
};

const { prefix } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check")
    .setDescription("Get pokemon unite info about choosen user")
    .addUserOption((option) =>
      option.setName("user").setDescription("Person who you want to check")
    ),
  run: (interaction, client, typo) => {
    interaction.reply({
      embeds: [
        embed_404_error_message(
          `This command is actually set to be only text, try again using \`${client.prefix}check <user>\` `
        ),
      ],
    });
  },
  execute: (message, client, input1, typo) => {
    code(message, client, input1);
  },
};
