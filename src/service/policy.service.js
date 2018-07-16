const axios = require("axios");
const config = require("../../config");


exports.getAllByClientId = async (id,offset, quantity) => {
    const response = await axios.get(config.policiesEndpoint);
    const data = response.data;
    policies = data.policies.filter( p => p.clientId == id);
    const page = buildPage(policies, offset, quantity);
    return page;
}

exports.getById = async (id) => {
    const response = await axios.get(config.policiesEndpoint);
    const data = response.data;
    policies = data.policies.find( p => p.id == id);
    return policies;
}

buildPage = (data, offset, pageSize) => {
    const contentData = data.slice(offset, offset + pageSize);
    return { content: contentData, offset: offset, quantity: pageSize };
}

