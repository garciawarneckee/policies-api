/* import { controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';

import { authMiddleware } from '../middleware/AuthMiddleware';

import IController from './IController';

import ClientService from '../service/ClientService';

import Client  from '../models/Client'; */

const clientService = require("../service/client.service");

exports.getByName = (req, res) => { 
  const name = (req.query.name) ? req.query.name : res.sendStatus(400)
  const clients = clientService.getByName(name);
  res.send({ clients });
}
/*  constructor( @inject(TYPES.ClientService) private clientService: ClientService) { super() }

  getAll(request: Request, response: Response) {
    throw new Error("Method not implemented.");
  }

  @httpGet('/:id', authMiddleware({roles: [ 'admin', 'user' ]}))
  async getById(request: Request, response: Response) {
    await this.clientService.getById(request.params.id)
    .then( client => { 
      (client !== undefined) ? response.send(client) : response.status(404).send({ message:"The required client was not found"}); 
    })
    .catch( (error) => { 
      console.error("GetById error: ", error)
      response.statusCode = 422;
      response.end({message:'There was an error trying to get the client with id ' + request.params.id}); 
    });
  }

  @httpGet('/', authMiddleware({roles: [ 'admin', 'user' ]}))
  async getByName(request: Request, response: Response) {

    await this.clientService.getByName(request.query.name)
    .then(client => { 
      const clientToSend = this.prepareClientRepresentation(client);
      (client !== undefined) ? response.send(clientToSend) : response.status(404).send({ message:"The required client was not found"}); 
    })
    .catch( (error) => { 
      console.error("GetById error: ", error)
      response.statusCode = 422;
      response.end({message:'There was an error trying to get the client with name ' + request.params.name}); });
  }

  @httpGet('/policies/:id', authMiddleware({roles: [ 'admin' ]}))
  async getByPolicyNumber(request: Request, response: Response) {
    await this.clientService.getById(request.params.id)
    .then( client => { 
      (client !== undefined) ? response.send(client) : response.status(404).send({ message:"The required client was not found"}); 
    })
    .catch( (error) => { 
      console.error("GetById error: ", error)
      response.status(422).send({message:'There was an error trying to get the client with id ' + request.params.id}); });
  }

  @httpPost('/')
  async save(request: Request, response: Response) {
    return response.status(501).send({ message: "You are requesting that is not implemented in this release dude!" });
  }

  @httpPut('/:id')
  async update(request: Request, response: Response) {
    return response.status(501).send({ message: "You are requesting that is not implemented in this release dude!" });
  }

  @httpDelete('/:id')
  async delete(request: Request, response:Response) {
    return response.status(501).send({ message: "You are requesting that is not implemented in this release dude!" });
  }

  private prepareClientRepresentation(client: Client): Client {
    let clientToSend = new Client();
    clientToSend['name'] = client['name'];
    clientToSend['email'] = client['email'];
    clientToSend['role'] = client['role'];
    return clientToSend;
  }
}
 */