const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.song_options_buttons = () => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('pause_song')
            .setLabel('Pause')
            .setStyle(Secondary)
            .setEmoji("⏸"),
        new ButtonBuilder()
            .setCustomId('loop_song')
            .setLabel('Loop')
            .setStyle(Secondary)
            .setEmoji("🔁"),
        new ButtonBuilder()
            .setCustomId('stop_song')
            .setLabel('Stop')
            .setStyle(Danger),
        new ButtonBuilder()
            .setCustomId('shuffle_song')
            .setLabel('Shuffle')
            .setStyle(Secondary)
            .setEmoji("🔀"),
        new ButtonBuilder()
            .setCustomId('skip_song')
            .setLabel('Skip')
            .setStyle(Secondary)
            .setEmoji("⏭"),
    )
}

this.features_options_buttons = () => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('save_song')
            .setLabel('Favorite')
            .setStyle(Success)
            .setEmoji("⭐")
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId('unsave_song')
            .setLabel('Unfavorite')
            .setStyle(Danger)
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId('queue_song')
            .setLabel('Next songs')
            .setStyle(Primary)
            .setEmoji("🔎"),
    )
}