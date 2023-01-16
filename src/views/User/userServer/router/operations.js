import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { deleteHandler } from '../routerHandler/operationsHandler.js';
const express = require('express');

const operationRoute = express.Router();

operationRoute.post('/deleteDonate',deleteHandler);

export {operationRoute}