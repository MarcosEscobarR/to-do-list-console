const fs = require('fs');
const path = './db/data.json';

const guardarTarea = (data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}

const verTareas = () => {
    if (!fs.existsSync(path)) return;

    var data = JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'}));
    return data;
}

module.exports = {
    guardarTarea, 
    verTareas
}