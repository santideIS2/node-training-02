const { iMenu, pausa, leerIn } = require("./helpers/inquirer.js");
const Busquedas = require("./models/busquedas.js");

const main = async() => {

    let opcion;
    const busquedas = new Busquedas();

    do {

        opcion = await iMenu();

        switch (opcion) {
            case 1:
                const lugar = leerIn('Ciudad:');
                busquedas.ciudad(lugar)
                break;
            
            case 2:
                console.log(opcion);
                break
        
            case 3:
                console.log(opcion);
                break;

            case 4:
                console.log(opcion);
                break;

            default:
                console.log('introduzca una opcion válida o moriras');
                break;
        }

        await pausa();
            
    } while (opcion !== 4);

}

main();