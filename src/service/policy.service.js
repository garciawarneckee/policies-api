const axios = require("axios");
const config = require("../../config");

exports.getAllByClientId = async (id) => {
    const response = await axios.get(config.policiesEndpoint);
    const data = response.data;
    policies = data.policies.filter( p => p.clientId == id);
    return policies;
}

exports.getById = async (id) => {
    const response = await axios.get(config.policiesEndpoint);
    const data = response.data;
    policies = data.policies.find( p => p.id == id);
    return policies;
}

