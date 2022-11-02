const { EmbedBuilder, Embed } = require('discord.js')
const ranksURL = {
    Veteran:"https://uniteapi.dev/_next/image?url=https://uniteapi.dev/cdn-cgi/imagedelivery/guk1RGHkY4OYAyTreXhvuA/t_rankBigIcon_04.png/public&w=128&q=75",
    Master:"https://uniteapi.dev/_next/image?url=https%3A%2F%2Funiteapi.dev%2Fcdn-cgi%2Fimagedelivery%2Fguk1RGHkY4OYAyTreXhvuA%2Ft_rankBigIcon_06.png%2Fpublic&w=128&q=75",
    Ultra:"https://uniteapi.dev/_next/image?url=https%3A%2F%2Funiteapi.dev%2Fcdn-cgi%2Fimagedelivery%2Fguk1RGHkY4OYAyTreXhvuA%2Ft_rankBigIcon_05.png%2Fpublic&w=128&q=75",
    Beginner:"https://uniteapi.dev/_next/image?url=https%3A%2F%2Funiteapi.dev%2Fcdn-cgi%2Fimagedelivery%2Fguk1RGHkY4OYAyTreXhvuA%2Ft_rankBigIcon_01.png%2Fpublic&w=128&q=75",
    Great:"https://uniteapi.dev/_next/image?url=https%3A%2F%2Funiteapi.dev%2Fcdn-cgi%2Fimagedelivery%2Fguk1RGHkY4OYAyTreXhvuA%2Ft_rankBigIcon_02.png%2Fpublic&w=128&q=75",
    Expert:"https://uniteapi.dev/_next/image?url=https%3A%2F%2Funiteapi.dev%2Fcdn-cgi%2Fimagedelivery%2Fguk1RGHkY4OYAyTreXhvuA%2Ft_rankBigIcon_03.png%2Fpublic&w=128&q=75"
}

const wichRank = (r) => {
    const ranks = ['Veteran', 'Master', 'Ultra', 'Great', 'Expert', 'Beginner']
    for(key of ranks){
        if(r.includes(key)){
            return key
        }
    }
    let all = {}
    let broke = {}
    for(key of r){
        broke[key] === undefined? broke[key] = 1 : broke[key]++
    }
    for(x of ranks){
        all[x] = 0
        for(key of x){
            if(broke[key] !== undefined){
                all[x]++
            }
        }
    }
    let found
    let max = 0
    for(x in all){
        if(all[x] > max){
            found = x
            max = all[x]
        }
    }
    return found
}

this.unite_profile_embed = (infos) => {
    let wich = wichRank(infos.rank)
    const embed = new EmbedBuilder()
    .setColor("#FFD700.")
    .setTitle(`\`${infos.username}'s\` Profile lookup.`)
    .setDescription(`⭐ Rank: \`${infos.rank}\`.\n🔸 Level: ${infos.level > 0 ? infos.level : '`\`Probably > 0\``'}.`)
    .setFooter({text:`🎮 Played ${infos.battles} games\n🥇 Total wins: ${infos.wins}\n🚧 Win rate: ${infos.wr}%\n⏳ Time spent: ${Math.floor(infos.battles*8.5/60)}h\n
    ${infos.rankPoints === null ? '' : `🔺 Rank points: ${infos.rankPoints}`}`})
    .setThumbnail("https://uniteapi.dev/_next/image?url=https://uniteapi.dev/cdn-cgi/imagedelivery/guk1RGHkY4OYAyTreXhvuA/t_CreateRole_male3_1.png/public&w=256&q=75")
    .setImage(ranksURL[`${wich}`])


    return embed
}