const inquirer = require('inquirer')
require('colors')

const choices = [
    {
        value: '1',
        name: '1. Crear Tarea'
    },
    {
        value: '2',
        name: '2. Listar Tarea'
    },
    {
        value: '3',
        name: '3. Listar Tareas Completadas'
    },
    {
        value: '4',
        name: '4. Listar Tareas Pendientes'
    },
    {
        value: '5',
        name: '5. Completar Tarea(s)'
    },
    {
        value: '6',
        name: '6. Borrar Tareas'
    },
    {
        value: '0',
        name: '0. Salir'
    },
]

const preguntas = [{
    type: 'list',
    name: 'opt',
    message: 'Que desea hacer?',
    choices: choices
}]
const inquirerMenu = async () => {
    console.clear();

    console.log('============================='.green);
    console.log('   Selecciona una opcion'.white);
    console.log('=============================\n'.green);

    const {opt} = await inquirer.prompt(preguntas)
    return opt;
}


const mapListadoNoCompletado = (listado = []) =>  {
    return listado.filter(tarea => tarea.completadoEn === null)
                    .map(tarea => ({value: tarea.id, name: tarea.descripcion}))
}

const mapListadoNoCompleto = (listado = []) =>  {
    return listado.map(tarea => ({value: tarea.id, name: tarea.descripcion}))
}

const getTareaId = async(listado = []) => {
    console.clear();

    console.log('============================='.green);
    console.log('   Selecciona la Tarea Completada'.white);
    console.log('=============================\n'.green);
    
    const {id} =  await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Seleccione Tarea',
        choices: mapListadoNoCompletado(listado),
    }]);

    return id;
}

const borrarTareaInquirer = async (listado = []) => {
    console.clear();

    console.log('============================================='.green);
    console.log('   Selecciona la Tarea que desea eliminar'.white);
    console.log('=============================================\n'.green);
    
    const {id} =  await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Seleccione Tarea',
        choices: mapListadoNoCompleto(listado),
    }]);

    return id;
}
const pausa = async () => {
    const pausaQuestion = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }]
    console.log('\n');
    await inquirer.prompt(pausaQuestion);

}

const leerInput = async (message) => {
    const tareaQuestion = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length <= 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]
   const {desc} =  await inquirer.prompt(tareaQuestion);
   return desc;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    getTareaId   ,
    borrarTareaInquirer 
}

