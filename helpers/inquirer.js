const inquirer = require('inquirer');

const menuOpt = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Opción a elegir ->',
        choices: [
            {
                value: 1,
                name: '1. Buscar lugar'
            },
            {
                value: 2,
                name: '2. Ver Historial'
            },
            {
                value: 3,
                name: '3. Buscar ayuda en YT'
            },
            {
                value: 4,
                name: '4. Salir'
            }
        ]
    }
];

const iMenu = async() => {

    console.log(`#############################
    selecione una opción:
    `);

    const { opcion } = await inquirer.prompt( menuOpt );
    return opcion;
}

const pausa = async() => {

    const paus = [
        {
            type: 'input',
            name: 'pausa',
            message: 'preisone ENTER para continuar'
        }
    ]

    await inquirer.prompt( paus );

}

const leerIn = async( message ) => {

    const pregunta = [
        {
            type: 'input',
            name: 'mensaje',
            message,
            validate( value ) {
                if ( value.length === 0 ) {
                    return 'introduzca un lugar válido'
                }
                return true;
            }
        }
    ]

    const { mensaje } = await inquirer.prompt( pregunta );
    return mensaje;

}

const listaLugares = async( lugares ) => {

    const choices = lugares.map(( lug, i ) => {
        return {
            value: lug.id,
            name: `${ i+1 } ${ lug.nombre }`
        }
    });

    choices.unshift({
        value: 0,
        name: 'cancelar',

    });
    
    const listBorrar = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices    
        }
    ]

    const { id } = await inquirer.prompt( listBorrar );
    return id;
}

module.exports = {
    iMenu,
    pausa,
    leerIn,
    listaLugares
}