require('dotenv').config()

const { iMenu, pausa, leerIn, listaLugares } = require("./helpers/inquirer.js");
const Busquedas = require("./models/busquedas.js");

const main = async() => {

    let opcion;
    const busquedas = new Busquedas();

    do {

        opcion = await iMenu();

        switch (opcion) {
            case 1:
                //introduce lugar a buscar
                const lugar = await leerIn('Lugar:');

                //peticion http buscando el input anterior
                const resLugares = await busquedas.ciudad(lugar);//reslugares es un array de lugares

                //selecciono el lugar deseado del array y recibo el id
                const idSelect = await listaLugares(resLugares);
                if (idSelect === 0) continue;
                //recojo el lugar con id igual al seleccionado                
                const lugarSelect = resLugares.find( l => l.id === idSelect );

                //guardar en DB
                busquedas.addHist( lugarSelect.nombre );

                const clima = await busquedas.climaLugar(lugarSelect.lat, lugarSelect.lng);
                // console.log(`${lugarSelect.lat} y ${lugarSelect.lng}`)

                console.clear();
                console.log('\nInformación de la ciudad\n');
                console.log('Ciudad:', lugarSelect.nombre );
                console.log('Lat:', lugarSelect.lat );
                console.log('Lng:', lugarSelect.lng );
                console.log('Temperatura:', clima.temp );
                console.log('Mínima:', clima.min );
                console.log('Máxima:', clima.max );
                console.log('Como está el clima:',  clima.desc );
                break;
            
            case 2:
                busquedas.hist.forEach( (lugar, i) =>  {
                    const idx = `${ i + 1 }.`;
                    console.log( `${ idx } ${ lugar } ` );
                })
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