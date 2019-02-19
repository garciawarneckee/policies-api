const elastic = require('elasticlunr');
const clientsFile = require('./clients.json');

const clients = clientsFile.clients;

const clientsIndex = elastic(function() {
  this.addField('id');
  this.addField('name');
  this.addField('email');
  this.addField('role');
});

const tokenBlackListIndex = elastic(function() {
  this.addField('token');
});  

initializeDb = () => {
  try {
    clients.forEach(c => { clientsIndex.addDoc(c) });
  } catch(error) {
    console.log(error.message);
  }
  
}

module.exports = {
  clientsIndex,
  tokenBlackListIndex,
  initializeDb
}
