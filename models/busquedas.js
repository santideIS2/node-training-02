const axios = require('axios');

class Busquedas {

    historial = [];

    constructor() {
        //hacemos cosas
    }

    async ciudad(ciudad = '') {

        const resGet = axios.get();
        console.log(resGet.data);
    }
}

module.exports = Busquedas;