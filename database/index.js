const elastic = require('elasticlunr');
const clientsFile = require('./clients.json');

const clients = clientsFile.clients;

const clientsIndex = elastic(function() {
  this.addField('name');
  this.addField('email');
  this.addField('role');
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
  initializeDb
}
