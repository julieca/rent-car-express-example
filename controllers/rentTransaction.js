'use strict';

import _ from 'lodash';
import {
  RentTransaction,
  RentTransactionDetail
} from '../../models';
import response from '../../helpers/response';

const rentTransaction = {};

//Create
rentTransaction.add = async (req, res) => {
  try {
    const keys = Object.keys(RentTransaction.attributes);
    const body = _.pick(req.body, keys);

    const data = await RentTransaction.create(body);
    return response.sendOK(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
}

export default rentTransaction;