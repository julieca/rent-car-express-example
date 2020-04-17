'use strict';

import _ from 'lodash';
import {
  Car
} from '../models';
import response from '../helpers/response';

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
    return response.sendOK(res, car);
  } catch (err) {
    return response.sendError(res, err);
  }
}

//GET By ID
postCar.getById = async (req, res) => {
  try {
    let resData = {};
    const car = await Car.findById(req.params.id);
    resData = car.dataValues;

    return response.sendOK(res, resData);
  } catch (err) {
    return response.sendError(res, err);
  }
}

//Create
postCar.add = async (req, res) => {
  try {
    const keys = Object.keys(Car.attributes);
    const body = _.pick(req.body, keys);

    const data = await Car.create(body);
    return response.sendOK(res, data);
  } catch (err) {
    return response.sendError(res, err);
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
      return response.sendOK(res, car)
    }
    return response.sendError(res, {
      message: 'Fail to update Car'
    });
  } catch (err) {
    return response.sendError(res, err);
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
      return response.sendOK(res, car)
    }
    return response.sendError(res, {
      message: 'Car not Found'
    });
  } catch (err) {
    return response.sendError(res, err);
  }
}

export default postCar;