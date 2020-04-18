'use strict';

import _ from 'lodash';
import {
  Car
} from '../models';
// import response from '../helpers/response';
import ResponseFactory from '../helpers/response';
const postCar = {};

//GET
postCar.getAll = async (req, res) => {
  try {
    let filter = {};
    // const keys = Object.keys(Car.attributes);
    // const params = _.pick(req.query, keys);
    // const bodyUser = res.locals.oauth.user.id;
    // let filter = {
    //   where: {
    //     userID: bodyUser
    //   }
    // };
    // if (req.query.isIncludeActions) {
    //   filter.include = [{
    //     model: Action,
    //     as: 'Actions'
    //   }];
    // }
    // if (req.query.isIncludeZone) {
    //   if (filter.include) {
    //     filter.include.push({
    //       model: Zone,
    //       as: 'Zone'
    //     });
    //   } else {
    //     filter.include = [{
    //       model: Zone,
    //       as: 'Zone'
    //     }];
    //   }
    // }
    // if (!_.isEmpty(params)) {
    //   filter.where = {
    //     ...filter.where,
    //     ...params
    //   };
    // }

    const car = await Car.findAll(filter);
    //return response.sendOK(res, car);
    const response = new ResponseFactory('ok', car);
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

//GET By ID
postCar.getById = async (req, res) => {
  try {
    let resData = {};
    const car = await Car.findById(req.params.id);
    resData = car.dataValues;

    const response = new ResponseFactory('ok', resData);
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

//Create
postCar.add = async (req, res) => {
  try {
    const keys = Object.keys(Car.attributes);
    const body = _.pick(req.body, keys);

    const data = await Car.create(body);
    const response = new ResponseFactory('ok', data);
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

//Update
postCar.update = async (req, res) => {
  try {
    const keys = Object.keys(Car.attributes);
    const body = _.pick(req.body, keys);

    const result = await Car.update(body, {
      where: {
        id: req.params.id
      }
    });
    if (result) {
      const response = new ResponseFactory('ok', result);
      return res.status(response.status).json(response.payload)
    }
    const response = new ResponseFactory('err', 'Fail to update Car');
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

//remove post
postCar.remove = async (req, res) => {
  try {
    const result = await Car.findById(req.params.id);
    if (result) {
      const car = await Car.destroy({
        where: {
          id: req.params.id
        }
      });
      const response = new ResponseFactory('ok', car);
      return res.status(response.status).json(response.payload)
    }
    const response = new ResponseFactory('notFound');
    return res.status(response.status).json(response.payload)
  } catch (err) {
    const response = new ResponseFactory('err', err.message);
    return res.status(response.status).json(response.payload)
  }
}

export default postCar;