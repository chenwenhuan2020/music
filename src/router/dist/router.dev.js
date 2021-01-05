"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = [{
  path: "/login",
  name: "Login",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Login.vue'));
    });
  }
}, {
  path: "/main",
  name: "Main",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/Main.vue"));
    });
  },
  children: [{
    path: "home",
    name: "Home",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Home.vue'));
      });
    }
  }, {
    path: "list",
    name: "List",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/List.vue'));
      });
    }
  }, {
    path: "rbt",
    name: "Rbt",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Rbt.vue'));
      });
    }
  }, {
    path: "shop",
    name: "Shop",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Shop.vue'));
      });
    }
  }, {
    path: 'remlist/:id',
    name: 'Remlist',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Remlist.vue'));
      });
    }
  }, {
    path: 'newdisc/:url',
    name: 'Newdisc',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Newdisc.vue'));
      });
    }
  }, {
    path: 'rankinglist/:id',
    name: 'Rankinglist',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Rankinglist.vue'));
      });
    }
  }, {
    path: '/singeralbum/',
    name: 'Singeralbum',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Singeralbum.vue'));
      });
    },
    children: [{
      path: 'namehot',
      name: 'Namehot',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../views/Namehot.vue'));
        });
      }
    }, {
      path: 'namezj',
      name: 'Namezj',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../views/Namezj.vue'));
        });
      }
    }, {
      path: 'namemv',
      name: 'Namemv',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../views/Namemv.vue'));
        });
      }
    }, {
      path: 'namejs',
      name: 'Namejs',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../views/Namejs.vue'));
        });
      }
    }]
  }, {
    path: 'search/',
    name: 'Search',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Search.vue'));
      });
    }
  }, {
    path: 'namezjlist/:id',
    name: "Namezjlist",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Namezjlist.vue'));
      });
    }
  }, {
    path: "playinterface",
    name: "Playinterface",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Playinterface.vue'));
      });
    }
  }]
}, {
  path: "/mv/:id",
  name: "Mv",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Mv.vue'));
    });
  }
}, {
  path: "*",
  redirect: {
    name: "Home"
  }
}];
exports.routes = routes;