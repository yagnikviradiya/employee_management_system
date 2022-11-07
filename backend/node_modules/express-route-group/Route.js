class Route {
  constructor() {

  }
}

Route.post = function (endpoint, handler) {
  return function (router) {
      router.post(endpoint, handler);
  }
}

Route.get = function (endpoint, handler) {
  return function (router) {
      router.get(endpoint, handler);
  }
}

Route.put = function (endpoint, handler) {
  return function (router) {
      router.put(endpoint, handler);
  }
}

Route.patch = function (endpoint, handler) {
  return function (router) {
      router.patch(endpoint, handler);
  }
}

Route.delete = function (endpoint, handler) {
  return function (router) {
      router.delete(endpoint, handler);
  }
}

/**
 * @param {*} methodHandlers -> Array filled with callbacks to be attached to router
 * e.g : 
 * [
 *  post(endpoint, handler),
 *  get(endpoint, handler)
 * ]    
 */
Route.routes = function (methodHandlers) {
  const express = require('express')
  const router = express.Router({
      mergeParams: true
  });
  methodHandlers.forEach((callback) => {
      callback(router);
  });
  return router;
}

module.exports = Route;