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

/***/ "./app/GraphQL/address.js":
/*!********************************!*\
  !*** ./app/GraphQL/address.js ***!
  \********************************/
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


var o = {
  name: 'address',
  graphQLType: 'Address',
  graphQLPlural: 'Addresses'
};
var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_database__WEBPACK_IMPORTED_MODULE_1__["generateTypeDefs"](o));
var resolvers = _database__WEBPACK_IMPORTED_MODULE_1__["generateGraphQLImpl"](o);

/***/ }),

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


var o = {
  name: 'person',
  graphQLType: 'Person',
  graphQLPlural: 'People'
};
var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_database__WEBPACK_IMPORTED_MODULE_1__["generateTypeDefs"](o));
var resolvers = _database__WEBPACK_IMPORTED_MODULE_1__["generateGraphQLImpl"](o);

/***/ }),

/***/ "./app/GraphQL/query.js":
/*!******************************!*\
  !*** ./app/GraphQL/query.js ***!
  \******************************/
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


var o = {
  name: 'query',
  graphQLType: 'PersonQuery',
  graphQLPlural: 'PersonQueries'
};
var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_database__WEBPACK_IMPORTED_MODULE_1__["generateTypeDefs"](o));
var resolvers = _database__WEBPACK_IMPORTED_MODULE_1__["generateGraphQLImpl"](o);

/***/ }),

/***/ "./app/GraphQL/segment.js":
/*!********************************!*\
  !*** ./app/GraphQL/segment.js ***!
  \********************************/
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


var o = {
  name: 'segment',
  graphQLType: 'Segment',
  graphQLPlural: 'Segments'
};
var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_database__WEBPACK_IMPORTED_MODULE_1__["generateTypeDefs"](o));
var resolvers = _database__WEBPACK_IMPORTED_MODULE_1__["generateGraphQLImpl"](o);

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
  modules: [__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module './GraphQL/common'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())), __webpack_require__(/*! ./GraphQL/person */ "./app/GraphQL/person.js"), __webpack_require__(/*! ./GraphQL/segment */ "./app/GraphQL/segment.js"), __webpack_require__(/*! ./GraphQL/address */ "./app/GraphQL/address.js"), __webpack_require__(/*! ./GraphQL/query */ "./app/GraphQL/query.js")]
});
server.applyMiddleware({
  app: app
});
app.get('/', function (req, res) {
  return res.send('Hello BlueSteel');
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
var models = {
  person: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module './models/person.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  segment: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module './models/segment.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  address: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module './models/address.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  query: __webpack_require__(/*! ./models/query.js */ "./app/models/query.js")
}; // Initialize models

Object.values(models).forEach(function (model) {
  var seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
}); // Apply associations

Object.keys(db).forEach(function (key) {
  if ('associate' in db[key]) {
    db[key].associate(db);
  }
});

var uc = function uc(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

db.generateTypeDefs = function (_ref) {
  var name = _ref.name,
      graphQLType = _ref.graphQLType,
      graphQLPlural = _ref.graphQLPlural;
  var model = sequelize["modelManager"].getModel(name);
  if (!model) throw new Error("Could not find model " + name + ", are you sure it exists?");
  var fields = Object.keys(model.tableAttributes).filter(function (d) {
    return ['id', 'createdAt', 'updateAt'].indexOf(d) < 0;
  }).map(function (name) {
    return Object.assign({}, model.tableAttributes, {
      name: name
    });
  });
  var q = "extend type Query {\n\t\t".concat(uc(graphQLType), "(id: ID!): ").concat(uc(graphQLType), "\n\t\tall").concat(uc(graphQLPlural), "(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ").concat(uc(graphQLType), "Filter): [").concat(uc(graphQLType), "]\n\t\t_all").concat(uc(graphQLPlural), "Meta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ").concat(uc(graphQLType), "Filter): ListMetadata\n\t}\n\textend type Mutation {\n\t\tcreate").concat(uc(graphQLType), "(\n\t\t\t\t").concat(fields.map(function (d) {
    return d.name + ":String";
  }).join("\n\t\t"), "\n\t\t):").concat(uc(graphQLType), "\n\t\tupdate").concat(uc(graphQLType), "(id:ID!,").concat(fields.map(function (d) {
    return d.name + ":String";
  }).join(","), "):").concat(uc(graphQLType), "\n\t\tdelete").concat(uc(graphQLType), "(id:ID!):").concat(uc(graphQLType), "\n\t}\n\ttype ").concat(uc(graphQLType), " {\n\t\t\tid: ID!\n\t\t\t").concat(fields.map(function (d) {
    return d.name + ":String";
  }).join("\n\t\t"), "\n\t}\n\n\tinput ").concat(uc(graphQLType), "Filter {\n\t\t\tq: String\n\t\t\tid: ID\n\t\t\tids: [ID]\n\t\t\t").concat(fields.map(function (d) {
    return d.name + ":String";
  }).join("\n\t\t"), "\n\t}");
  return q;
};

db.generateGraphQLImpl = function (_ref2) {
  var _Query, _Mutation;

  var name = _ref2.name,
      graphQLType = _ref2.graphQLType,
      graphQLPlural = _ref2.graphQLPlural;
  return {
    Query: (_Query = {}, _defineProperty(_Query, uc(graphQLType), function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", db[name].findByPk(args.id));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }()), _defineProperty(_Query, "all" + uc(graphQLPlural), function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj, _ref5) {
        var _ref5$perPage, perPage, _ref5$page, page, _ref5$filter, filter, where;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref5$perPage = _ref5.perPage, perPage = _ref5$perPage === void 0 ? 50 : _ref5$perPage, _ref5$page = _ref5.page, page = _ref5$page === void 0 ? 0 : _ref5$page, _ref5$filter = _ref5.filter, filter = _ref5$filter === void 0 ? {} : _ref5$filter;
                where = {};

                if (filter.ids) {
                  where = {
                    id: filter.ids
                  };
                } else {
                  where = filter;
                }

                ;
                return _context2.abrupt("return", db[name].findAll({
                  where: where,
                  limit: perPage,
                  offset: page * perPage
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x5, _x6) {
        return _ref4.apply(this, arguments);
      };
    }()), _defineProperty(_Query, "_all" + uc(graphQLPlural) + "Meta", _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var count;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return db[name].count();

            case 2:
              count = _context3.sent;
              return _context3.abrupt("return", {
                count: count
              });

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))), _Query),
    Mutation: (_Mutation = {}, _defineProperty(_Mutation, "create" + uc(graphQLType), function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", db[name].create({
                  values: args
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x7, _x8, _x9, _x10) {
        return _ref7.apply(this, arguments);
      };
    }()), _defineProperty(_Mutation, "update" + uc(graphQLType), function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(obj, args, context, info) {
        var count;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.error(args);
                _context5.next = 3;
                return db[name].update(args, {
                  where: {
                    id: args.id
                  }
                });

              case 3:
                count = _context5.sent;
                return _context5.abrupt("return", db[name].findByPk(args.id));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x11, _x12, _x13, _x14) {
        return _ref8.apply(this, arguments);
      };
    }()), _defineProperty(_Mutation, "remove" + uc(graphQLType), function () {
      var _ref9 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", db[name].destroy({
                  where: {
                    id: args.id
                  }
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x15, _x16, _x17, _x18) {
        return _ref9.apply(this, arguments);
      };
    }()), _Mutation)
  };
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;

/***/ }),

/***/ "./app/models/query.js":
/*!*****************************!*\
  !*** ./app/models/query.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 1 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('query', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    config: {
      type: DataTypes.TEXT,
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
    tableName: 'query'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvYWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvR3JhcGhRTC9wZXJzb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvc2VnbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcC9kYXRhYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbW9kZWxzL3F1ZXJ5LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29yc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiJdLCJuYW1lcyI6WyJvIiwibmFtZSIsImdyYXBoUUxUeXBlIiwiZ3JhcGhRTFBsdXJhbCIsInR5cGVEZWZzIiwiZ3FsIiwiZGIiLCJyZXNvbHZlcnMiLCJib2R5UGFyc2VyIiwicmVxdWlyZSIsIkFwb2xsb1NlcnZlciIsImNvcnMiLCJhcHAiLCJleHByZXNzIiwidXNlIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNlcnZlciIsIm1vZHVsZXMiLCJhcHBseU1pZGRsZXdhcmUiLCJnZXQiLCJyZXEiLCJyZXMiLCJzZW5kIiwibGlzdGVuIiwicG9ydCIsImNvbnNvbGUiLCJsb2ciLCJTZXF1ZWxpemUiLCJjb25maWciLCJzZXF1ZWxpemUiLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfTkFNRSIsIkRBVEFCQVNFX1VTRVIiLCJEQVRBQkFTRV9QQVNTV09SRCIsImhvc3QiLCJEQVRBQkFTRV9IT1NUIiwiREFUQUJBU0VfUE9SVCIsImRpYWxlY3QiLCJkZWZpbmUiLCJmcmVlemVUYWJsZU5hbWUiLCJwb29sIiwibWF4IiwibWluIiwiYWNxdWlyZSIsImlkbGUiLCJvcGVyYXRvcnNBbGlhc2VzIiwibW9kZWxzIiwicGVyc29uIiwic2VnbWVudCIsImFkZHJlc3MiLCJxdWVyeSIsIk9iamVjdCIsInZhbHVlcyIsImZvckVhY2giLCJtb2RlbCIsInNlcU1vZGVsIiwia2V5cyIsImtleSIsImFzc29jaWF0ZSIsInVjIiwicyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJnZW5lcmF0ZVR5cGVEZWZzIiwiZ2V0TW9kZWwiLCJFcnJvciIsImZpZWxkcyIsInRhYmxlQXR0cmlidXRlcyIsImZpbHRlciIsImQiLCJpbmRleE9mIiwibWFwIiwiYXNzaWduIiwicSIsImpvaW4iLCJnZW5lcmF0ZUdyYXBoUUxJbXBsIiwiUXVlcnkiLCJvYmoiLCJhcmdzIiwiY29udGV4dCIsImluZm8iLCJmaW5kQnlQayIsImlkIiwicGVyUGFnZSIsInBhZ2UiLCJ3aGVyZSIsImlkcyIsImZpbmRBbGwiLCJsaW1pdCIsIm9mZnNldCIsImNvdW50IiwiTXV0YXRpb24iLCJjcmVhdGUiLCJlcnJvciIsInVwZGF0ZSIsImRlc3Ryb3kiLCJtb2R1bGUiLCJleHBvcnRzIiwiRGF0YVR5cGVzIiwidHlwZSIsIklOVEVHRVIiLCJhbGxvd051bGwiLCJwcmltYXJ5S2V5IiwibGFiZWwiLCJTVFJJTkciLCJURVhUIiwiY3JlYXRlZEF0IiwiREFURSIsImRlZmF1bHRWYWx1ZSIsImxpdGVyYWwiLCJ1cGRhdGVkQXQiLCJ0YWJsZU5hbWUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNB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QjtBQVVoQzNFLFVBQU0sRUFBRTtBQUNQeUUsVUFBSSxFQUFFRCxTQUFTLENBQUNPLElBRFQ7QUFFUEosZUFBUyxFQUFFO0FBRkosS0FWd0I7QUFjaENLLGFBQVMsRUFBRTtBQUNWUCxVQUFJLEVBQUVELFNBQVMsQ0FBQ1MsSUFETjtBQUVWTixlQUFTLEVBQUUsS0FGRDtBQUdWTyxrQkFBWSxFQUFFakYsU0FBUyxDQUFDa0YsT0FBVixDQUFrQixtQkFBbEI7QUFISixLQWRxQjtBQW1CaENDLGFBQVMsRUFBRTtBQUNWWCxVQUFJLEVBQUVELFNBQVMsQ0FBQ1MsSUFETjtBQUVWTixlQUFTLEVBQUUsS0FGRDtBQUdWTyxrQkFBWSxFQUFFakYsU0FBUyxDQUFDa0YsT0FBVixDQUFrQixtQkFBbEI7QUFISjtBQW5CcUIsR0FBMUIsRUF3Qko7QUFDRkUsYUFBUyxFQUFFO0FBRFQsR0F4QkksQ0FBUDtBQTJCQSxDQTVCRCxDOzs7Ozs7Ozs7OztBQ0ZBLDRDOzs7Ozs7Ozs7OztBQ0FBLGtEOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL2FwcC5qc1wiKTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5sZXQgbz17bmFtZTonYWRkcmVzcycsZ3JhcGhRTFR5cGU6J0FkZHJlc3MnLGdyYXBoUUxQbHVyYWw6J0FkZHJlc3Nlcyd9O1xuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsKGRiLmdlbmVyYXRlVHlwZURlZnMobykpO1xuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IGRiLmdlbmVyYXRlR3JhcGhRTEltcGwobyk7XG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xuaW1wb3J0ICogYXMgZGIgZnJvbSAnLi4vZGF0YWJhc2UnO1xubGV0IG89e25hbWU6J3BlcnNvbicsZ3JhcGhRTFR5cGU6J1BlcnNvbicsZ3JhcGhRTFBsdXJhbDonUGVvcGxlJ307XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoZGIuZ2VuZXJhdGVUeXBlRGVmcyhvKSk7XG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0gZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbChvKTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5sZXQgbz17bmFtZToncXVlcnknLGdyYXBoUUxUeXBlOidQZXJzb25RdWVyeScsZ3JhcGhRTFBsdXJhbDonUGVyc29uUXVlcmllcyd9O1xuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsKGRiLmdlbmVyYXRlVHlwZURlZnMobykpO1xuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IGRiLmdlbmVyYXRlR3JhcGhRTEltcGwobyk7XG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xuaW1wb3J0ICogYXMgZGIgZnJvbSAnLi4vZGF0YWJhc2UnO1xubGV0IG89e25hbWU6J3NlZ21lbnQnLGdyYXBoUUxUeXBlOidTZWdtZW50JyxncmFwaFFMUGx1cmFsOidTZWdtZW50cyd9O1xuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsKGRiLmdlbmVyYXRlVHlwZURlZnMobykpO1xuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IGRiLmdlbmVyYXRlR3JhcGhRTEltcGwobyk7XG4iLCJpbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgeyBBcG9sbG9TZXJ2ZXIgfSA9IHJlcXVpcmUoJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcycpO1xuY29uc3QgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGNvcnMoKSk7XG5cbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuXHRtb2R1bGVzOiBbXG5cdFx0cmVxdWlyZSgnLi9HcmFwaFFML2NvbW1vbicpLFxuXHRcdHJlcXVpcmUoJy4vR3JhcGhRTC9wZXJzb24nKSxcblx0XHRyZXF1aXJlKCcuL0dyYXBoUUwvc2VnbWVudCcpLFxuXHRcdHJlcXVpcmUoJy4vR3JhcGhRTC9hZGRyZXNzJyksXG5cdFx0cmVxdWlyZSgnLi9HcmFwaFFML3F1ZXJ5Jylcblx0XSxcbn0pO1xuXG5zZXJ2ZXIuYXBwbHlNaWRkbGV3YXJlKHsgYXBwIH0pO1xuXG5hcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiByZXMuc2VuZCgnSGVsbG8gQmx1ZVN0ZWVsJykpO1xuXG5hcHAubGlzdGVuKHsgcG9ydDogNTAwMCB9LCAoKSA9PlxuXHRjb25zb2xlLmxvZyhg8J+agCBTZXJ2ZXIgcmVhZHkgYXQgaHR0cDovL2xvY2FsaG9zdDo1MDAwYClcbik7XG4iLCJjb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbnJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xuXG52YXIgZGIgPSB7fTtcblxuY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZShcblx0cHJvY2Vzcy5lbnYuREFUQUJBU0VfTkFNRSxcblx0cHJvY2Vzcy5lbnYuREFUQUJBU0VfVVNFUixcblx0cHJvY2Vzcy5lbnYuREFUQUJBU0VfUEFTU1dPUkQsXG5cdHtcblx0XHRob3N0OiBwcm9jZXNzLmVudi5EQVRBQkFTRV9IT1NULFxuXHRcdHBvcnQ6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1BPUlQsXG5cdFx0ZGlhbGVjdDogJ215c3FsJyxcblx0XHRkZWZpbmU6IHtcblx0XHRcdGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcblx0XHR9LFxuXHRcdHBvb2w6IHtcblx0XHRcdG1heDogNSxcblx0XHRcdG1pbjogMCxcblx0XHRcdGFjcXVpcmU6IDMwMDAwLFxuXHRcdFx0aWRsZTogMTAwMDAsXG5cdFx0fSxcblx0XHQvLyA8aHR0cDovL2RvY3Muc2VxdWVsaXplanMuY29tL21hbnVhbC90dXRvcmlhbC9xdWVyeWluZy5odG1sI29wZXJhdG9ycz5cblx0XHRvcGVyYXRvcnNBbGlhc2VzOiBmYWxzZSxcblx0Ly90aW1lc3RhbXBzOiBmYWxzZSAvL0lmIGNyZWF0ZWRBdCwgbW9kaWZpZWRBdCBhcmUgYWxsIGF2YWlsYWJsZSwgd2UgY2FuIHVzZSB0aGlzXG5cdH0sXG4pO1xuXG5sZXQgbW9kZWxzID0ge1xuXHRwZXJzb246cmVxdWlyZSgnLi9tb2RlbHMvcGVyc29uLmpzJyksXG5cdHNlZ21lbnQ6cmVxdWlyZSgnLi9tb2RlbHMvc2VnbWVudC5qcycpLFxuXHRhZGRyZXNzOnJlcXVpcmUoJy4vbW9kZWxzL2FkZHJlc3MuanMnKSxcblx0cXVlcnk6cmVxdWlyZSgnLi9tb2RlbHMvcXVlcnkuanMnKVxufTtcblxuLy8gSW5pdGlhbGl6ZSBtb2RlbHNcbk9iamVjdC52YWx1ZXMobW9kZWxzKS5mb3JFYWNoKG1vZGVsID0+IHtcblx0Y29uc3Qgc2VxTW9kZWwgPSBtb2RlbChzZXF1ZWxpemUsIFNlcXVlbGl6ZSk7XG5cdGRiW3NlcU1vZGVsLm5hbWVdID0gc2VxTW9kZWw7XG59KTtcblxuLy8gQXBwbHkgYXNzb2NpYXRpb25zXG5PYmplY3Qua2V5cyhkYikuZm9yRWFjaChrZXkgPT4ge1xuXHRpZiAoJ2Fzc29jaWF0ZScgaW4gZGJba2V5XSkge1xuXHRcdGRiW2tleV0uYXNzb2NpYXRlKGRiKTtcblx0fVxufSk7XG5jb25zdCB1YyA9IChzKSA9PiB7XG5cdGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHJldHVybiAnJztcblx0cmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xufTtcblxuZGIuZ2VuZXJhdGVUeXBlRGVmcz1mdW5jdGlvbih7bmFtZSxncmFwaFFMVHlwZSxncmFwaFFMUGx1cmFsfSl7XG5cdGxldCBtb2RlbD1zZXF1ZWxpemVbXCJtb2RlbE1hbmFnZXJcIl0uZ2V0TW9kZWwobmFtZSk7XG5cdGlmICghbW9kZWwpIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIG1vZGVsIFwiK25hbWUrXCIsIGFyZSB5b3Ugc3VyZSBpdCBleGlzdHM/XCIpO1xuXG5cdGxldCBmaWVsZHM9T2JqZWN0LmtleXMobW9kZWwudGFibGVBdHRyaWJ1dGVzKVxuXHRcdC5maWx0ZXIoZD0+WydpZCcsJ2NyZWF0ZWRBdCcsJ3VwZGF0ZUF0J10uaW5kZXhPZihkKTwwKVxuXHRcdC5tYXAobmFtZT0+e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sbW9kZWwudGFibGVBdHRyaWJ1dGVzLHtuYW1lfSk7XG5cdFx0fSk7XG5cblx0bGV0IHE9YGV4dGVuZCB0eXBlIFF1ZXJ5IHtcblx0XHQke3VjKGdyYXBoUUxUeXBlKX0oaWQ6IElEISk6ICR7dWMoZ3JhcGhRTFR5cGUpfVxuXHRcdGFsbCR7dWMoZ3JhcGhRTFBsdXJhbCl9KHBhZ2U6IEludCwgcGVyUGFnZTogSW50LCBzb3J0RmllbGQ6IFN0cmluZywgc29ydE9yZGVyOiBTdHJpbmcsIGZpbHRlcjogJHt1YyhncmFwaFFMVHlwZSl9RmlsdGVyKTogWyR7dWMoZ3JhcGhRTFR5cGUpfV1cblx0XHRfYWxsJHt1YyhncmFwaFFMUGx1cmFsKX1NZXRhKHBhZ2U6IEludCwgcGVyUGFnZTogSW50LCBzb3J0RmllbGQ6IFN0cmluZywgc29ydE9yZGVyOiBTdHJpbmcsIGZpbHRlcjogJHt1YyhncmFwaFFMVHlwZSl9RmlsdGVyKTogTGlzdE1ldGFkYXRhXG5cdH1cblx0ZXh0ZW5kIHR5cGUgTXV0YXRpb24ge1xuXHRcdGNyZWF0ZSR7dWMoZ3JhcGhRTFR5cGUpfShcblx0XHRcdFx0JHtmaWVsZHMubWFwKGQ9PmQubmFtZStcIjpTdHJpbmdcIikuam9pbihcIlxcblxcdFxcdFwiKX1cblx0XHQpOiR7dWMoZ3JhcGhRTFR5cGUpfVxuXHRcdHVwZGF0ZSR7dWMoZ3JhcGhRTFR5cGUpfShpZDpJRCEsJHtmaWVsZHMubWFwKGQ9PmQubmFtZStcIjpTdHJpbmdcIikuam9pbihcIixcIil9KToke3VjKGdyYXBoUUxUeXBlKX1cblx0XHRkZWxldGUke3VjKGdyYXBoUUxUeXBlKX0oaWQ6SUQhKToke3VjKGdyYXBoUUxUeXBlKX1cblx0fVxuXHR0eXBlICR7dWMoZ3JhcGhRTFR5cGUpfSB7XG5cdFx0XHRpZDogSUQhXG5cdFx0XHQke2ZpZWxkcy5tYXAoZD0+ZC5uYW1lK1wiOlN0cmluZ1wiKS5qb2luKFwiXFxuXFx0XFx0XCIpfVxuXHR9XG5cblx0aW5wdXQgJHt1YyhncmFwaFFMVHlwZSl9RmlsdGVyIHtcblx0XHRcdHE6IFN0cmluZ1xuXHRcdFx0aWQ6IElEXG5cdFx0XHRpZHM6IFtJRF1cblx0XHRcdCR7ZmllbGRzLm1hcChkPT5kLm5hbWUrXCI6U3RyaW5nXCIpLmpvaW4oXCJcXG5cXHRcXHRcIil9XG5cdH1gO1xuXHRyZXR1cm4gcTtcbn07XG5cbmRiLmdlbmVyYXRlR3JhcGhRTEltcGw9ZnVuY3Rpb24oe25hbWUsZ3JhcGhRTFR5cGUsZ3JhcGhRTFBsdXJhbH0pe1xuXHRyZXR1cm4ge1xuXHRcdFF1ZXJ5OiB7XG5cdFx0XHRbdWMoZ3JhcGhRTFR5cGUpXTogYXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4gZGJbbmFtZV0uZmluZEJ5UGsoYXJncy5pZCksXG5cdFx0XHRbXCJhbGxcIit1YyhncmFwaFFMUGx1cmFsKV06IGFzeW5jIChvYmose3BlclBhZ2U9NTAscGFnZT0wLGZpbHRlcj17fX0pID0+e1xuXHRcdFx0XHRsZXQgd2hlcmU9e307XG5cdFx0XHRcdGlmIChmaWx0ZXIuaWRzKXtcblx0XHRcdFx0XHR3aGVyZT17aWQ6ZmlsdGVyLmlkc307XG5cdFx0XHRcdH1lbHNle3doZXJlPWZpbHRlcjt9O1xuXHRcdFx0XHRyZXR1cm4gZGJbbmFtZV0uZmluZEFsbCh7d2hlcmUsbGltaXQ6cGVyUGFnZSxvZmZzZXQ6cGFnZSpwZXJQYWdlfSk7XG5cdFx0XHR9LFxuXHRcdFx0W1wiX2FsbFwiK3VjKGdyYXBoUUxQbHVyYWwpK1wiTWV0YVwiXTphc3luYygpPT57XG5cdFx0XHRcdGxldCBjb3VudD1hd2FpdCBkYltuYW1lXS5jb3VudCgpO1xuXHRcdFx0XHRyZXR1cm4ge2NvdW50fTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdE11dGF0aW9uOntcblx0XHRcdFtcImNyZWF0ZVwiK3VjKGdyYXBoUUxUeXBlKV06YXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4gZGJbbmFtZV0uY3JlYXRlKHt2YWx1ZXM6YXJnc30pLFxuXHRcdFx0W1widXBkYXRlXCIrdWMoZ3JhcGhRTFR5cGUpXTphc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoYXJncyk7XG5cdFx0XHRcdGxldCBjb3VudD1hd2FpdCBkYltuYW1lXS51cGRhdGUoYXJncyx7d2hlcmU6e2lkOmFyZ3MuaWR9fSk7XG5cdFx0XHRcdHJldHVybiBkYltuYW1lXS5maW5kQnlQayhhcmdzLmlkKTtcblx0XHRcdH0sXG5cdFx0XHRbXCJyZW1vdmVcIit1YyhncmFwaFFMVHlwZSldOmFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IGRiW25hbWVdLmRlc3Ryb3koe3doZXJlOntpZDphcmdzLmlkfX0pXG5cdFx0fVxuXHR9O1xufTtcblxuZGIuc2VxdWVsaXplID0gc2VxdWVsaXplO1xuZGIuU2VxdWVsaXplID0gU2VxdWVsaXplO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuIiwiLyoganNoaW50IGluZGVudDogMSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XG5cdHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKCdxdWVyeScsIHtcblx0XHRpZDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIoMTEpLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdHByaW1hcnlLZXk6IHRydWVcblx0XHR9LFxuXHRcdGxhYmVsOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGNvbmZpZzoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlRFWFQsXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGNyZWF0ZWRBdDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBzZXF1ZWxpemUubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKVxuXHRcdH0sXG5cdFx0dXBkYXRlZEF0OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IHNlcXVlbGl6ZS5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpXG5cdFx0fVxuXHR9LCB7XG5cdFx0dGFibGVOYW1lOiAncXVlcnknXG5cdH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==