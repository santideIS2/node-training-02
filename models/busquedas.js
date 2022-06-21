const fs = require('fs');

const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        if( !fs.existsSync( this.dbPath ) ) return;
        
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info );

        this.historial = data.historial;
    }

    get hist(){
        return this.historial;
    }

    async ciudad(lugar = '') {

        try {
            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: {//los params se pueden poner fuera en un getter y llamarlos <params: this."nombreget">
                    'limit': 3,
                    'types': 'place,locality',//ciudades, paises, pueblos, etc
                    'language': 'en',
                    'access_token': process.env.MAPBOX_KEY
                }
            });

            const resGet = await instance.get();
            return resGet.data.features.map( resp => ({
                id: resp.id,
                nombre: resp.place_name,
                lng: resp.center[0],//longitud
                lat: resp.center[1]//latitud
            }))

        } catch (error) {
            return [];
        }
        
    }

    async climaLugar(lat, lng) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {//los params se pueden poner fuera en un getter y llamarlos <params: this."nombreget">
                    lat,
                    'lon': lng,//ciudades, paises, pueblos, etc
                    'appid': process.env.OP_WEATHER_KEY,
                    'units': 'metric'
                }
            });

            const resGet = await instance.get();
            const { weather, main } = resGet.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max
            }

        } catch (error) {
            console.log(error)
        }
    }

    addHist(lugar=''){

        if( !this.historial.includes( lugar ) ){
            this.historial = this.historial.splice(0,4);
            this.historial.unshift(lugar);
            this.guardarDB();
        }

    }

    guardarDB() {

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );

    }
}

module.exports = Busquedas;