/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/GraphQL/person.js":
/*!*******************************!*\
  !*** ./app/GraphQL/person.js ***!
  \*******************************/
/*! exports provided: typeDefs, resolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../database */ "./app/database.js");
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_database__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\t\ttype Person {\n\t\t\t\tid: ID!\n\t\t\t\temail: String\n\t\t\t\tgiven_name: String\n\t\t\t\tfamily_name: String\n\t\t\t\tupdatedAt:\n\t\t}\n    extend type Query {\n        allPersons: [Person]\n        person(id: ID!): Person\n    }\n\t\textend type Mutation {\n        createPerson(given_name:String,family_name:String):Person\n\t\t\t\tupdatePerson(id:ID!,given_name:String,family_name:String):Person\n\t\t\t\tdeletePerson(id:ID!):Person\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_templateObject());
var resolvers = {
  Query: {
    allPersons: function () {
      var _allPersons = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _database__WEBPACK_IMPORTED_MODULE_1__["person"].findAll());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function allPersons() {
        return _allPersons.apply(this, arguments);
      }

      return allPersons;
    }(),
    person: function () {
      var _person = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _database__WEBPACK_IMPORTED_MODULE_1__["person"].findByPk(args.id));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function person(_x, _x2, _x3, _x4) {
        return _person.apply(this, arguments);
      }

      return person;
    }()
  },
  Mutation: {
    createPerson: function () {
      var _createPerson = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _database__WEBPACK_IMPORTED_MODULE_1__["person"].create({
                  values: args
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createPerson(_x5, _x6, _x7, _x8) {
        return _createPerson.apply(this, arguments);
      }

      return createPerson;
    }(),
    updatePerson: function () {
      var _updatePerson = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(obj, args, context, info) {
        var count;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _database__WEBPACK_IMPORTED_MODULE_1__["person"].update(args, {
                  where: {
                    id: args.id
                  }
                });

              case 2:
                count = _context4.sent;
                return _context4.abrupt("return", _database__WEBPACK_IMPORTED_MODULE_1__["person"].findByPk(args.id));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updatePerson(_x9, _x10, _x11, _x12) {
        return _updatePerson.apply(this, arguments);
      }

      return updatePerson;
    }(),
    deletePerson: function () {
      var _deletePerson = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _database__WEBPACK_IMPORTED_MODULE_1__["person"].destroy({
                  where: {
                    id: args.id
                  }
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deletePerson(_x13, _x14, _x15, _x16) {
        return _deletePerson.apply(this, arguments);
      }

      return deletePerson;
    }()
  }
};

/***/ }),

/***/ "./app/app.js":
/*!********************!*\
  !*** ./app/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ "@babel/polyfill");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);



var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

var _require = __webpack_require__(/*! apollo-server-express */ "apollo-server-express"),
    ApolloServer = _require.ApolloServer;

var cors = __webpack_require__(/*! cors */ "cors");

var app = express__WEBPACK_IMPORTED_MODULE_1___default()();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
var server = new ApolloServer({
  modules: [__webpack_require__(/*! ./GraphQL/person */ "./app/GraphQL/person.js")]
});
server.applyMiddleware({
  app: app
});
app.get('/', function (req, res) {
  return res.send('Hello World!');
});
app.listen({
  port: 5000
}, function () {
  return console.log("\uD83D\uDE80 Server ready at http://localhost:5000");
});

/***/ }),

/***/ "./app/database.js":
/*!*************************!*\
  !*** ./app/database.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Sequelize = __webpack_require__(/*! sequelize */ "sequelize");

__webpack_require__(/*! dotenv */ "dotenv").config();

var db = {};
var sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'mysql',
  define: {
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
  operatorsAliases: false //timestamps: false //If createdAt, modifiedAt are all available, we can use this

});
var models = [__webpack_require__(/*! ./models/person.js */ "./app/models/person.js")]; // Initialize models

models.forEach(function (model) {
  var seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
}); // Apply associations

Object.keys(db).forEach(function (key) {
  if ('associate' in db[key]) {
    db[key].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;

/***/ }),

/***/ "./app/models/person.js":
/*!******************************!*\
  !*** ./app/models/person.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 1 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('person', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    remote_person_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_modified: {
      type: DataTypes.DATE,
      allowNull: true
    },
    given_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    family_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    street_1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    street_2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    dwid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    source_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    opt_out_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'person'
  });
};

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvcGVyc29uLmpzIiwid2VicGFjazovLy8uL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGFiYXNlLmpzIiwid2VicGFjazovLy8uL2FwcC9tb2RlbHMvcGVyc29uLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29yc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiJdLCJuYW1lcyI6WyJ0eXBlRGVmcyIsImdxbCIsInJlc29sdmVycyIsIlF1ZXJ5IiwiYWxsUGVyc29ucyIsImRiIiwiZmluZEFsbCIsInBlcnNvbiIsIm9iaiIsImFyZ3MiLCJjb250ZXh0IiwiaW5mbyIsImZpbmRCeVBrIiwiaWQiLCJNdXRhdGlvbiIsImNyZWF0ZVBlcnNvbiIsImNyZWF0ZSIsInZhbHVlcyIsInVwZGF0ZVBlcnNvbiIsInVwZGF0ZSIsIndoZXJlIiwiY291bnQiLCJkZWxldGVQZXJzb24iLCJkZXN0cm95IiwiYm9keVBhcnNlciIsInJlcXVpcmUiLCJBcG9sbG9TZXJ2ZXIiLCJjb3JzIiwiYXBwIiwiZXhwcmVzcyIsInVzZSIsImpzb24iLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJzZXJ2ZXIiLCJtb2R1bGVzIiwiYXBwbHlNaWRkbGV3YXJlIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZCIsImxpc3RlbiIsInBvcnQiLCJjb25zb2xlIiwibG9nIiwiU2VxdWVsaXplIiwiY29uZmlnIiwic2VxdWVsaXplIiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX05BTUUiLCJEQVRBQkFTRV9VU0VSIiwiREFUQUJBU0VfUEFTU1dPUkQiLCJob3N0IiwiREFUQUJBU0VfSE9TVCIsIkRBVEFCQVNFX1BPUlQiLCJkaWFsZWN0IiwiZGVmaW5lIiwiZnJlZXplVGFibGVOYW1lIiwicG9vbCIsIm1heCIsIm1pbiIsImFjcXVpcmUiLCJpZGxlIiwib3BlcmF0b3JzQWxpYXNlcyIsIm1vZGVscyIsImZvckVhY2giLCJtb2RlbCIsInNlcU1vZGVsIiwibmFtZSIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJhc3NvY2lhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiRGF0YVR5cGVzIiwidHlwZSIsIklOVEVHRVIiLCJhbGxvd051bGwiLCJwcmltYXJ5S2V5IiwicmVtb3RlX3BlcnNvbl9pZCIsIlNUUklORyIsImRhdGVfY3JlYXRlZCIsIkRBVEUiLCJsYXN0X21vZGlmaWVkIiwiZ2l2ZW5fbmFtZSIsImZhbWlseV9uYW1lIiwiZW1haWwiLCJwaG9uZSIsInN0cmVldF8xIiwic3RyZWV0XzIiLCJjaXR5IiwicmVnaW9uIiwicG9zdGFsX2NvZGUiLCJkd2lkIiwibGF0aXR1ZGUiLCJERUNJTUFMIiwibG9uZ2l0dWRlIiwic291cmNlX2NvZGUiLCJvcHRfb3V0X2RhdGUiLCJjcmVhdGVkQXQiLCJkZWZhdWx0VmFsdWUiLCJsaXRlcmFsIiwidXBkYXRlZEF0IiwidGFibGVOYW1lIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxj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LEVBQUVELFNBQVMsQ0FBQ1EsSUFETjtBQUVWTCxlQUFTLEVBQUUsS0FGRDtBQUdWdUIsa0JBQVksRUFBRXZELFNBQVMsQ0FBQ3dELE9BQVYsQ0FBa0IsbUJBQWxCO0FBSEosS0ExRXNCO0FBK0VqQ0MsYUFBUyxFQUFFO0FBQ1YzQixVQUFJLEVBQUVELFNBQVMsQ0FBQ1EsSUFETjtBQUVWTCxlQUFTLEVBQUUsS0FGRDtBQUdWdUIsa0JBQVksRUFBRXZELFNBQVMsQ0FBQ3dELE9BQVYsQ0FBa0IsbUJBQWxCO0FBSEo7QUEvRXNCLEdBQTNCLEVBb0ZKO0FBQ0ZFLGFBQVMsRUFBRTtBQURULEdBcEZJLENBQVA7QUF1RkEsQ0F4RkQsQzs7Ozs7Ozs7Ozs7QUNGQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxrRDs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC9hcHAuanNcIik7XG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnXG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSdcblxuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsYFxuXHRcdHR5cGUgUGVyc29uIHtcblx0XHRcdFx0aWQ6IElEIVxuXHRcdFx0XHRlbWFpbDogU3RyaW5nXG5cdFx0XHRcdGdpdmVuX25hbWU6IFN0cmluZ1xuXHRcdFx0XHRmYW1pbHlfbmFtZTogU3RyaW5nXG5cdFx0XHRcdHVwZGF0ZWRBdDpcblx0XHR9XG4gICAgZXh0ZW5kIHR5cGUgUXVlcnkge1xuICAgICAgICBhbGxQZXJzb25zOiBbUGVyc29uXVxuICAgICAgICBwZXJzb24oaWQ6IElEISk6IFBlcnNvblxuICAgIH1cblx0XHRleHRlbmQgdHlwZSBNdXRhdGlvbiB7XG4gICAgICAgIGNyZWF0ZVBlcnNvbihnaXZlbl9uYW1lOlN0cmluZyxmYW1pbHlfbmFtZTpTdHJpbmcpOlBlcnNvblxuXHRcdFx0XHR1cGRhdGVQZXJzb24oaWQ6SUQhLGdpdmVuX25hbWU6U3RyaW5nLGZhbWlseV9uYW1lOlN0cmluZyk6UGVyc29uXG5cdFx0XHRcdGRlbGV0ZVBlcnNvbihpZDpJRCEpOlBlcnNvblxuICAgIH1cbmBcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcbiAgICBRdWVyeToge1xuICAgICAgICBhbGxQZXJzb25zOiBhc3luYyAoKSA9PiBkYi5wZXJzb24uZmluZEFsbCgpLFxuICAgICAgICBwZXJzb246IGFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IGRiLnBlcnNvbi5maW5kQnlQayhhcmdzLmlkKSxcbiAgICB9LFxuXHRcdE11dGF0aW9uOntcblx0XHRcdGNyZWF0ZVBlcnNvbjphc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYi5wZXJzb24uY3JlYXRlKHt2YWx1ZXM6YXJnc30pLFxuXHRcdFx0dXBkYXRlUGVyc29uOmFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IHtcblx0XHRcdFx0XHRsZXQgY291bnQ9YXdhaXQgZGIucGVyc29uLnVwZGF0ZShhcmdzLHt3aGVyZTp7aWQ6YXJncy5pZH19KTtcblx0XHRcdFx0XHRyZXR1cm4gZGIucGVyc29uLmZpbmRCeVBrKGFyZ3MuaWQpO1xuXHRcdFx0fSxcblx0XHRcdGRlbGV0ZVBlcnNvbjphc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYi5wZXJzb24uZGVzdHJveSh7d2hlcmU6e2lkOmFyZ3MuaWR9fSlcblx0XHR9XG59XG4iLCJpbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCdcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKVxuY29uc3QgeyBBcG9sbG9TZXJ2ZXIgfSA9IHJlcXVpcmUoJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcycpXG5jb25zdCBjb3JzID0gcmVxdWlyZSgnY29ycycpXG5jb25zdCBhcHAgPSBleHByZXNzKClcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKVxuYXBwLnVzZShjb3JzKCkpXG5cbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICAgIG1vZHVsZXM6IFtcbiAgICAgICAgcmVxdWlyZSgnLi9HcmFwaFFML3BlcnNvbicpXG4gICAgXSxcbn0pXG5cbnNlcnZlci5hcHBseU1pZGRsZXdhcmUoeyBhcHAgfSlcblxuYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4gcmVzLnNlbmQoJ0hlbGxvIFdvcmxkIScpKVxuXG5hcHAubGlzdGVuKHsgcG9ydDogNTAwMCB9LCAoKSA9PlxuICAgIGNvbnNvbGUubG9nKGDwn5qAIFNlcnZlciByZWFkeSBhdCBodHRwOi8vbG9jYWxob3N0OjUwMDBgKSxcbilcbiIsImNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG5cbnZhciBkYiA9IHt9XG5cbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoXG4gICAgcHJvY2Vzcy5lbnYuREFUQUJBU0VfTkFNRSxcbiAgICBwcm9jZXNzLmVudi5EQVRBQkFTRV9VU0VSLFxuICAgIHByb2Nlc3MuZW52LkRBVEFCQVNFX1BBU1NXT1JELFxuICAgIHtcbiAgICAgICAgaG9zdDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfSE9TVCxcbiAgICAgICAgcG9ydDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfUE9SVCxcbiAgICAgICAgZGlhbGVjdDogJ215c3FsJyxcbiAgICAgICAgZGVmaW5lOiB7XG4gICAgICAgICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHBvb2w6IHtcbiAgICAgICAgICAgIG1heDogNSxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGFjcXVpcmU6IDMwMDAwLFxuICAgICAgICAgICAgaWRsZTogMTAwMDAsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIDxodHRwOi8vZG9jcy5zZXF1ZWxpemVqcy5jb20vbWFudWFsL3R1dG9yaWFsL3F1ZXJ5aW5nLmh0bWwjb3BlcmF0b3JzPlxuICAgICAgICBvcGVyYXRvcnNBbGlhc2VzOiBmYWxzZSxcblx0XHRcdFx0Ly90aW1lc3RhbXBzOiBmYWxzZSAvL0lmIGNyZWF0ZWRBdCwgbW9kaWZpZWRBdCBhcmUgYWxsIGF2YWlsYWJsZSwgd2UgY2FuIHVzZSB0aGlzXG4gICAgfSxcbilcblxubGV0IG1vZGVscyA9IFtcblx0cmVxdWlyZSgnLi9tb2RlbHMvcGVyc29uLmpzJyksXG5dXG5cbi8vIEluaXRpYWxpemUgbW9kZWxzXG5tb2RlbHMuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgY29uc3Qgc2VxTW9kZWwgPSBtb2RlbChzZXF1ZWxpemUsIFNlcXVlbGl6ZSlcbiAgICBkYltzZXFNb2RlbC5uYW1lXSA9IHNlcU1vZGVsXG59KVxuXG4vLyBBcHBseSBhc3NvY2lhdGlvbnNcbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKCdhc3NvY2lhdGUnIGluIGRiW2tleV0pIHtcbiAgICAgICAgZGJba2V5XS5hc3NvY2lhdGUoZGIpXG4gICAgfVxufSlcblxuZGIuc2VxdWVsaXplID0gc2VxdWVsaXplXG5kYi5TZXF1ZWxpemUgPSBTZXF1ZWxpemVcblxubW9kdWxlLmV4cG9ydHMgPSBkYlxuIiwiLyoganNoaW50IGluZGVudDogMSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XG5cdHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKCdwZXJzb24nLCB7XG5cdFx0aWQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSKDExKSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRwcmltYXJ5S2V5OiB0cnVlXG5cdFx0fSxcblx0XHRyZW1vdGVfcGVyc29uX2lkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGRhdGVfY3JlYXRlZDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGxhc3RfbW9kaWZpZWQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRnaXZlbl9uYW1lOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGZhbWlseV9uYW1lOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGVtYWlsOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdHBob25lOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI0KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0c3RyZWV0XzE6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0c3RyZWV0XzI6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0Y2l0eToge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRyZWdpb246IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0cG9zdGFsX2NvZGU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMTYpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRkd2lkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUigxMSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGxhdGl0dWRlOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREVDSU1BTCxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0bG9uZ2l0dWRlOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREVDSU1BTCxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0c291cmNlX2NvZGU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0b3B0X291dF9kYXRlOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0Y3JlYXRlZEF0OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IHNlcXVlbGl6ZS5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpXG5cdFx0fSxcblx0XHR1cGRhdGVkQXQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdGRlZmF1bHRWYWx1ZTogc2VxdWVsaXplLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJylcblx0XHR9XG5cdH0sIHtcblx0XHR0YWJsZU5hbWU6ICdwZXJzb24nXG5cdH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==