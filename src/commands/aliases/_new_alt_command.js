/*
Only for terminal developer thing
*/

const fs = require('fs')
const input = require('readline-sync')

let addAlt = () => {
    let data = JSON.parse(fs.readFileSync('./cmds.json'))
    let text = ''
    let i = 1
    let options = []
    for(key in data){
        options.push(key)
    }
    for(key of options){
        text+=`[${i}] - `+key+'\n'
        i++
    }
    let res = Number(input.question(text+'Gostaria de adicionar alts a qual comando?\nR:'))-1
    while(true){
        text = ''
        text+='\nAlts atuais: -> ['+data[options[res]]+']\n'
        let selector = input.question(text+'\nGostaria de adicionar mais alts?\n\n("n" Para cancelar)\nR:').toLowerCase()
        if(selector === 'n'){
            break
        }
        data[options[res]].push(selector)
    }
    fs.writeFileSync('./cmds.json',JSON.stringify(data,null,2))
}
addAlt()