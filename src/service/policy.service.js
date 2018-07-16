const axios = require("axios");
const endpoints = require("../endpoints");

exports.getAllById = async (id) => {
    const response = await axios.get(endpoints.policies);
    const data = response.data;
    policies = data.policies.filter( p => p.clientId == id);
    return policies;
}

