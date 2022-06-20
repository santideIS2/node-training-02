const inquirer = require('inquirer');

const menuOpt = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Opción a elegir ->',
        choices: [
            {
                value: 1,
                name: '1. Buscar ciudad'
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

const leerIn = async( msj ) => {

    const pregunta = [
        {
            type: 'input',
            name: 'mensaje',
            msj,
            validate( value ) {
                if ( value.length === 0 ) {
                    return 'no pollo'
                }
                return true;
            }
        }
    ]

    const { mensaje } = await inquirer.prompt( pregunta );
    return mensaje;

}

const listDeleteProds = async( prods ) => {

    const choices = prods.map(( prod, i ) => {
        return {
            value: prod.id,
            name: `${ i+1 } ${ prod.desc }`
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
            message: 'borrar',
            choices    
        }
    ]

    const { id } = await inquirer.prompt( listBorrar );
    return id;
}

const confirmar = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'yesno',
            message
        }
    ];

    const { yesno } = await inquirer.prompt( question );
    return yesno;

}

module.exports = {
    iMenu,
    pausa,
    leerIn,
    listDeleteProds,
    confirmar
}