const http = require("http");
const endpoints = require("./endpoints");

exports.getByName = async (name) => {
    const response = await http.get(endpoints.clients);
    console.log(response);
    return response.body;
}