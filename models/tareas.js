require('colors')
const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get getListado() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key])
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    CargarTareas(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoFormateado(listado = []) {
        let cont = 1;
        listado.forEach(item => {
            let estado = 'Completado'.green;

            if(item.completadoEn === null) {
                estado = 'Pendiente'.red
            }
            console.log(`${`${cont}.`.green} ${item.descripcion} :: ${estado}\n`); 
            cont ++;           
        });
    }


    ListadoTareasCompletadas(listado = []) {
        let cont = 1;
        listado.forEach(item => {
            if(item.completadoEn) {
                console.log(`${`${cont}.`.green} ${item.descripcion} :: ${"Completado".green}\n`); 
            }
            cont ++;
        }) 
    }
    ListadoTareasNoCompletadas(listado = []) {
        let cont = 1;
        listado.forEach(item => {
            if(!item.completadoEn) {
                console.log(`${`${cont}.`.green} ${item.descripcion} :: ${"Pendiente".red}\n`); 
            }
            cont ++;
        }) 
    }

    marcarCompletada(id = 0) {
        try {
            this._listado[id].completadoEn = Date.now();
            console.log('Tarea Completada!!'.green);
        } catch (error) {
            console.log('Ocurrio un error'.red);
        }
    }

    borrarTarea(id = 0) {
        try {
            delete this._listado[id]
            console.log('Borrado Exitosamente'.green);            
        } catch (error) {
            console.log('Ocurrio un error'.red);
        }
    }
}

module.exports = Tareas