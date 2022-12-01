const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { play_emoji, loop_emoji, shuffle_emoji, skip_emoji, trash_emoji } = require('../emojis');
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.song_options_buttons = () => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('pause_song')
            .setStyle(Secondary)
            .setEmoji(play_emoji),
        new ButtonBuilder()
            .setCustomId('loop_song')
            .setStyle(Secondary)
            .setEmoji(loop_emoji),
        new ButtonBuilder()
            .setCustomId('stop_song')
            .setLabel('Stop')
            .setStyle(Danger),
        new ButtonBuilder()
            .setCustomId('shuffle_song')
            .setStyle(Secondary)
            .setEmoji(shuffle_emoji),
        new ButtonBuilder()
            .setCustomId('skip_song')
            .setStyle(Secondary)
            .setEmoji(skip_emoji),
    )
}

this.features_options_buttons = () => new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('save_song')
            .setLabel('Save')
            .setStyle(Success),
        new ButtonBuilder()
            .setCustomId('unsave_song')
            .setStyle(Danger)
            .setEmoji(trash_emoji),
        new ButtonBuilder()
            .setCustomId('queue_song')
            .setStyle(Secondary)
            .setEmoji("🔎"),
    );