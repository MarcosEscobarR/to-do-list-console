require('colors')
const {
    guardarTarea,
    verTareas
} = require('./helpers/database');
const {
    inquirerMenu,   
    pausa,
    leerInput,
    getTareaId,
    borrarTareaInquirer
} = require('./helpers/inquirer')
const Tareas = require('./models/tareas');

const main = async () => {
    console.clear()
    let opt;
    const tareas = new Tareas();
    let tareasDb = verTareas();
    if (tareasDb) {
        tareas.CargarTareas(tareasDb);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:')
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoFormateado(tareasDb);
                break;
            case '3':
                tareas.ListadoTareasCompletadas(tareasDb);
                break;
            case '4':
                tareas.ListadoTareasNoCompletadas(tareasDb);
                break;
            case '5':
                const tareaId = await getTareaId(tareasDb);
                tareas.marcarCompletada(tareaId);
                break;
            case '6':
                const tareaIdBorrado = await borrarTareaInquirer(tareasDb);
                tareas.borrarTarea(tareaIdBorrado);
                break;
            default:
                break;
        }
        guardarTarea(tareas.getListado);
        tareasDb = verTareas();
        if (tareasDb) {
            tareas.CargarTareas(tareasDb);
        }
        if (opt !== '0') await pausa();
    } while (opt !== '0')
}

main();