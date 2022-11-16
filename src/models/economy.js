class Perk {
    constructor({
        name: name,
        xp: xp = 0,
        level: level = 1
    }) {
        this.perkName = name
        this.level = level
        this.xp = xp
    }

    build() {
        let obj = {
            name: this.perkName,
            level: this.level,
            xp: this.xp
        }
        return obj
    }
}

module.exports = {
    Perk: Perk
}