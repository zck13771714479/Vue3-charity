import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { queryHandler,deleteHandler,addHandler,updateHandler } from '../routerHandler/operationsHandler.js';
const express = require('express');

const operationRoute = express.Router();

operationRoute.post('/donate',queryHandler)
operationRoute.post('/deleteDonate',deleteHandler);
operationRoute.post('/add',addHandler);
operationRoute.post('/update',updateHandler)
export {operationRoute}