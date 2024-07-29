import express from 'express';
import {
  addResource,
  getByIdResource,
  getResource,
  deleteResource,
  updateResource,
} from '../controllers/resourceController.js';
const resourceRoute = express.Router();

resourceRoute.post('/', addResource);
resourceRoute.get('/', getResource);
resourceRoute.get('/:id', getByIdResource);
resourceRoute.delete('/:id', deleteResource);
resourceRoute.patch('/:id', updateResource);
export default resourceRoute;
