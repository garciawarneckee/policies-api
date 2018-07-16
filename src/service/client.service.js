const axios = require("axios");
const endpoints = require("./endpoints");

exports.getByName = async (name) => {
    //traigo todos los clientes
    const response = await axios.get(endpoints.clients);
    const data = response.data;
    client = data.clients.find( c => c.name == name );
    return client;
}

exports.getByName = async (name) => {
    //traigo todos los clientes
    const response = await axios.get(endpoints.clients);
    const data = response.data;
    client = data.clients.find( c => c.name == name );
    return client;
}