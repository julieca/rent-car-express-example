'use strict';

import _ from 'lodash';
import {
  RentTransaction
} from '../models';
import response from '../helpers/response';

const rentTransaction = {};

//Create
rentTransaction.add = async (req, res) => {
  try {
    const keys = Object.keys(RentTransaction.attributes);
    const body = _.pick(req.body, keys);

    const transaction = await RentTransaction.create(body);
    await transaction.setDetails(req.body.cars);
    return response.sendOK(res, transaction);
  } catch (err) {
    return response.sendError(res, err);
  }
}

export default rentTransaction;