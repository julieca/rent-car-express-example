'use strict';

import _ from 'lodash';
import {
  RentTransaction
} from '../models';

import ResponseFactory from '../helpers/response';
const rentTransaction = {};

//Create
rentTransaction.add = async (req, res) => {
  try {
    const keys = Object.keys(RentTransaction.attributes);
    const body = _.pick(req.body, keys);

    const transaction = await RentTransaction.create(body);
    await transaction.setDetails(req.body.cars);
    const response = new ResponseFactory('ok', transaction);
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

export default rentTransaction;