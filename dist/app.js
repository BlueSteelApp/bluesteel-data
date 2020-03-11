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

/***/ "./app/GraphQL/common.js":
/*!*******************************!*\
  !*** ./app/GraphQL/common.js ***!
  \*******************************/
/*! exports provided: typeDefs, resolvers */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/Users/clundberg/frakture/bs/bluesteel-data/app/GraphQL/common.js'");

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
  modules: [__webpack_require__(/*! ./GraphQL/common */ "./app/GraphQL/common.js"), __webpack_require__(/*! ./GraphQL/person */ "./app/GraphQL/person.js"), __webpack_require__(/*! ./GraphQL/segment */ "./app/GraphQL/segment.js"), __webpack_require__(/*! ./GraphQL/address */ "./app/GraphQL/address.js"), __webpack_require__(/*! ./GraphQL/query */ "./app/GraphQL/query.js")]
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
  person: __webpack_require__(/*! ./models/person.js */ "./app/models/person.js"),
  segment: __webpack_require__(/*! ./models/segment.js */ "./app/models/segment.js"),
  address: __webpack_require__(/*! ./models/address.js */ "./app/models/address.js"),
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

/***/ "./app/models/address.js":
/*!*******************************!*\
  !*** ./app/models/address.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/Users/clundberg/frakture/bs/bluesteel-data/app/models/address.js'");

/***/ }),

/***/ "./app/models/person.js":
/*!******************************!*\
  !*** ./app/models/person.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/Users/clundberg/frakture/bs/bluesteel-data/app/models/person.js'");

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

/***/ "./app/models/segment.js":
/*!*******************************!*\
  !*** ./app/models/segment.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/Users/clundberg/frakture/bs/bluesteel-data/app/models/segment.js'");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvYWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvR3JhcGhRTC9wZXJzb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvc2VnbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcC9kYXRhYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbW9kZWxzL3F1ZXJ5LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29yc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiJdLCJuYW1lcyI6WyJvIiwibmFtZSIsImdyYXBoUUxUeXBlIiwiZ3JhcGhRTFBsdXJhbCIsInR5cGVEZWZzIiwiZ3FsIiwiZGIiLCJyZXNvbHZlcnMiLCJib2R5UGFyc2VyIiwicmVxdWlyZSIsIkFwb2xsb1NlcnZlciIsImNvcnMiLCJhcHAiLCJleHByZXNzIiwidXNlIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNlcnZlciIsIm1vZHVsZXMiLCJhcHBseU1pZGRsZXdhcmUiLCJnZXQiLCJyZXEiLCJyZXMiLCJzZW5kIiwibGlzdGVuIiwicG9ydCIsImNvbnNvbGUiLCJsb2ciLCJTZXF1ZWxpemUiLCJjb25maWciLCJzZXF1ZWxpemUiLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfTkFNRSIsIkRBVEFCQVNFX1VTRVIiLCJEQVRBQkFTRV9QQVNTV09SRCIsImhvc3QiLCJEQVRBQkFTRV9IT1NUIiwiREFUQUJBU0VfUE9SVCIsImRpYWxlY3QiLCJkZWZpbmUiLCJmcmVlemVUYWJsZU5hbWUiLCJwb29sIiwibWF4IiwibWluIiwiYWNxdWlyZSIsImlkbGUiLCJvcGVyYXRvcnNBbGlhc2VzIiwibW9kZWxzIiwicGVyc29uIiwic2VnbWVudCIsImFkZHJlc3MiLCJxdWVyeSIsIk9iamVjdCIsInZhbHVlcyIsImZvckVhY2giLCJtb2RlbCIsInNlcU1vZGVsIiwia2V5cyIsImtleSIsImFzc29jaWF0ZSIsInVjIiwicyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJnZW5lcmF0ZVR5cGVEZWZzIiwiZ2V0TW9kZWwiLCJFcnJvciIsImZpZWxkcyIsInRhYmxlQXR0cmlidXRlcyIsImZpbHRlciIsImQiLCJpbmRleE9mIiwibWFwIiwiYXNzaWduIiwicSIsImpvaW4iLCJnZW5lcmF0ZUdyYXBoUUxJbXBsIiwiUXVlcnkiLCJvYmoiLCJhcmdzIiwiY29udGV4dCIsImluZm8iLCJmaW5kQnlQayIsImlkIiwicGVyUGFnZSIsInBhZ2UiLCJ3aGVyZSIsImlkcyIsImZpbmRBbGwiLCJsaW1pdCIsIm9mZnNldCIsImNvdW50IiwiTXV0YXRpb24iLCJjcmVhdGUiLCJlcnJvciIsInVwZGF0ZSIsImRlc3Ryb3kiLCJtb2R1bGUiLCJleHBvcnRzIiwiRGF0YVR5cGVzIiwidHlwZSIsIklOVEVHRVIiLCJhbGxvd051bGwiLCJwcmltYXJ5S2V5IiwibGFiZWwiLCJTVFJJTkciLCJURVhUIiwiY3JlYXRlZEF0IiwiREFURSIsImRlZmF1bHRWYWx1ZSIsImxpdGVyYWwiLCJ1cGRhdGVkQXQiLCJ0YWJsZU5hbWUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNB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akIsQ0FEQTtBQUVOSCxlQUFTLEVBQUU7QUFGTCxLQU55QjtBQVVoQzNFLFVBQU0sRUFBRTtBQUNQeUUsVUFBSSxFQUFFRCxTQUFTLENBQUNPLElBRFQ7QUFFUEosZUFBUyxFQUFFO0FBRkosS0FWd0I7QUFjaENLLGFBQVMsRUFBRTtBQUNWUCxVQUFJLEVBQUVELFNBQVMsQ0FBQ1MsSUFETjtBQUVWTixlQUFTLEVBQUUsS0FGRDtBQUdWTyxrQkFBWSxFQUFFakYsU0FBUyxDQUFDa0YsT0FBVixDQUFrQixtQkFBbEI7QUFISixLQWRxQjtBQW1CaENDLGFBQVMsRUFBRTtBQUNWWCxVQUFJLEVBQUVELFNBQVMsQ0FBQ1MsSUFETjtBQUVWTixlQUFTLEVBQUUsS0FGRDtBQUdWTyxrQkFBWSxFQUFFakYsU0FBUyxDQUFDa0YsT0FBVixDQUFrQixtQkFBbEI7QUFISjtBQW5CcUIsR0FBMUIsRUF3Qko7QUFDRkUsYUFBUyxFQUFFO0FBRFQsR0F4QkksQ0FBUDtBQTJCQSxDQTVCRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkEsNEM7Ozs7Ozs7Ozs7O0FDQUEsa0Q7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hcHAvYXBwLmpzXCIpO1xuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RhdGFiYXNlJztcbmxldCBvPXtuYW1lOidhZGRyZXNzJyxncmFwaFFMVHlwZTonQWRkcmVzcycsZ3JhcGhRTFBsdXJhbDonQWRkcmVzc2VzJ307XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoZGIuZ2VuZXJhdGVUeXBlRGVmcyhvKSk7XG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0gZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbChvKTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5sZXQgbz17bmFtZToncGVyc29uJyxncmFwaFFMVHlwZTonUGVyc29uJyxncmFwaFFMUGx1cmFsOidQZW9wbGUnfTtcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbChkYi5nZW5lcmF0ZVR5cGVEZWZzKG8pKTtcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSBkYi5nZW5lcmF0ZUdyYXBoUUxJbXBsKG8pO1xuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RhdGFiYXNlJztcbmxldCBvPXtuYW1lOidxdWVyeScsZ3JhcGhRTFR5cGU6J1BlcnNvblF1ZXJ5JyxncmFwaFFMUGx1cmFsOidQZXJzb25RdWVyaWVzJ307XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoZGIuZ2VuZXJhdGVUeXBlRGVmcyhvKSk7XG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0gZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbChvKTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5sZXQgbz17bmFtZTonc2VnbWVudCcsZ3JhcGhRTFR5cGU6J1NlZ21lbnQnLGdyYXBoUUxQbHVyYWw6J1NlZ21lbnRzJ307XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoZGIuZ2VuZXJhdGVUeXBlRGVmcyhvKSk7XG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0gZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbChvKTtcbiIsImltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5jb25zdCB7IEFwb2xsb1NlcnZlciB9ID0gcmVxdWlyZSgnYXBvbGxvLXNlcnZlci1leHByZXNzJyk7XG5jb25zdCBjb3JzID0gcmVxdWlyZSgnY29ycycpO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoY29ycygpKTtcblxuY29uc3Qgc2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcih7XG5cdG1vZHVsZXM6IFtcblx0XHRyZXF1aXJlKCcuL0dyYXBoUUwvY29tbW9uJyksXG5cdFx0cmVxdWlyZSgnLi9HcmFwaFFML3BlcnNvbicpLFxuXHRcdHJlcXVpcmUoJy4vR3JhcGhRTC9zZWdtZW50JyksXG5cdFx0cmVxdWlyZSgnLi9HcmFwaFFML2FkZHJlc3MnKSxcblx0XHRyZXF1aXJlKCcuL0dyYXBoUUwvcXVlcnknKVxuXHRdLFxufSk7XG5cbnNlcnZlci5hcHBseU1pZGRsZXdhcmUoeyBhcHAgfSk7XG5cbmFwcC5nZXQoJy8nLCAocmVxLCByZXMpID0+IHJlcy5zZW5kKCdIZWxsbyBCbHVlU3RlZWwnKSk7XG5cbmFwcC5saXN0ZW4oeyBwb3J0OiA1MDAwIH0sICgpID0+XG5cdGNvbnNvbGUubG9nKGDwn5qAIFNlcnZlciByZWFkeSBhdCBodHRwOi8vbG9jYWxob3N0OjUwMDBgKVxuKTtcbiIsImNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG5cbnZhciBkYiA9IHt9O1xuXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKFxuXHRwcm9jZXNzLmVudi5EQVRBQkFTRV9OQU1FLFxuXHRwcm9jZXNzLmVudi5EQVRBQkFTRV9VU0VSLFxuXHRwcm9jZXNzLmVudi5EQVRBQkFTRV9QQVNTV09SRCxcblx0e1xuXHRcdGhvc3Q6IHByb2Nlc3MuZW52LkRBVEFCQVNFX0hPU1QsXG5cdFx0cG9ydDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfUE9SVCxcblx0XHRkaWFsZWN0OiAnbXlzcWwnLFxuXHRcdGRlZmluZToge1xuXHRcdFx0ZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuXHRcdH0sXG5cdFx0cG9vbDoge1xuXHRcdFx0bWF4OiA1LFxuXHRcdFx0bWluOiAwLFxuXHRcdFx0YWNxdWlyZTogMzAwMDAsXG5cdFx0XHRpZGxlOiAxMDAwMCxcblx0XHR9LFxuXHRcdC8vIDxodHRwOi8vZG9jcy5zZXF1ZWxpemVqcy5jb20vbWFudWFsL3R1dG9yaWFsL3F1ZXJ5aW5nLmh0bWwjb3BlcmF0b3JzPlxuXHRcdG9wZXJhdG9yc0FsaWFzZXM6IGZhbHNlLFxuXHQvL3RpbWVzdGFtcHM6IGZhbHNlIC8vSWYgY3JlYXRlZEF0LCBtb2RpZmllZEF0IGFyZSBhbGwgYXZhaWxhYmxlLCB3ZSBjYW4gdXNlIHRoaXNcblx0fSxcbik7XG5cbmxldCBtb2RlbHMgPSB7XG5cdHBlcnNvbjpyZXF1aXJlKCcuL21vZGVscy9wZXJzb24uanMnKSxcblx0c2VnbWVudDpyZXF1aXJlKCcuL21vZGVscy9zZWdtZW50LmpzJyksXG5cdGFkZHJlc3M6cmVxdWlyZSgnLi9tb2RlbHMvYWRkcmVzcy5qcycpLFxuXHRxdWVyeTpyZXF1aXJlKCcuL21vZGVscy9xdWVyeS5qcycpXG59O1xuXG4vLyBJbml0aWFsaXplIG1vZGVsc1xuT2JqZWN0LnZhbHVlcyhtb2RlbHMpLmZvckVhY2gobW9kZWwgPT4ge1xuXHRjb25zdCBzZXFNb2RlbCA9IG1vZGVsKHNlcXVlbGl6ZSwgU2VxdWVsaXplKTtcblx0ZGJbc2VxTW9kZWwubmFtZV0gPSBzZXFNb2RlbDtcbn0pO1xuXG4vLyBBcHBseSBhc3NvY2lhdGlvbnNcbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKGtleSA9PiB7XG5cdGlmICgnYXNzb2NpYXRlJyBpbiBkYltrZXldKSB7XG5cdFx0ZGJba2V5XS5hc3NvY2lhdGUoZGIpO1xuXHR9XG59KTtcbmNvbnN0IHVjID0gKHMpID0+IHtcblx0aWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykgcmV0dXJuICcnO1xuXHRyZXR1cm4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSk7XG59O1xuXG5kYi5nZW5lcmF0ZVR5cGVEZWZzPWZ1bmN0aW9uKHtuYW1lLGdyYXBoUUxUeXBlLGdyYXBoUUxQbHVyYWx9KXtcblx0bGV0IG1vZGVsPXNlcXVlbGl6ZVtcIm1vZGVsTWFuYWdlclwiXS5nZXRNb2RlbChuYW1lKTtcblx0aWYgKCFtb2RlbCkgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgbW9kZWwgXCIrbmFtZStcIiwgYXJlIHlvdSBzdXJlIGl0IGV4aXN0cz9cIik7XG5cblx0bGV0IGZpZWxkcz1PYmplY3Qua2V5cyhtb2RlbC50YWJsZUF0dHJpYnV0ZXMpXG5cdFx0LmZpbHRlcihkPT5bJ2lkJywnY3JlYXRlZEF0JywndXBkYXRlQXQnXS5pbmRleE9mKGQpPDApXG5cdFx0Lm1hcChuYW1lPT57XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxtb2RlbC50YWJsZUF0dHJpYnV0ZXMse25hbWV9KTtcblx0XHR9KTtcblxuXHRsZXQgcT1gZXh0ZW5kIHR5cGUgUXVlcnkge1xuXHRcdCR7dWMoZ3JhcGhRTFR5cGUpfShpZDogSUQhKTogJHt1YyhncmFwaFFMVHlwZSl9XG5cdFx0YWxsJHt1YyhncmFwaFFMUGx1cmFsKX0ocGFnZTogSW50LCBwZXJQYWdlOiBJbnQsIHNvcnRGaWVsZDogU3RyaW5nLCBzb3J0T3JkZXI6IFN0cmluZywgZmlsdGVyOiAke3VjKGdyYXBoUUxUeXBlKX1GaWx0ZXIpOiBbJHt1YyhncmFwaFFMVHlwZSl9XVxuXHRcdF9hbGwke3VjKGdyYXBoUUxQbHVyYWwpfU1ldGEocGFnZTogSW50LCBwZXJQYWdlOiBJbnQsIHNvcnRGaWVsZDogU3RyaW5nLCBzb3J0T3JkZXI6IFN0cmluZywgZmlsdGVyOiAke3VjKGdyYXBoUUxUeXBlKX1GaWx0ZXIpOiBMaXN0TWV0YWRhdGFcblx0fVxuXHRleHRlbmQgdHlwZSBNdXRhdGlvbiB7XG5cdFx0Y3JlYXRlJHt1YyhncmFwaFFMVHlwZSl9KFxuXHRcdFx0XHQke2ZpZWxkcy5tYXAoZD0+ZC5uYW1lK1wiOlN0cmluZ1wiKS5qb2luKFwiXFxuXFx0XFx0XCIpfVxuXHRcdCk6JHt1YyhncmFwaFFMVHlwZSl9XG5cdFx0dXBkYXRlJHt1YyhncmFwaFFMVHlwZSl9KGlkOklEISwke2ZpZWxkcy5tYXAoZD0+ZC5uYW1lK1wiOlN0cmluZ1wiKS5qb2luKFwiLFwiKX0pOiR7dWMoZ3JhcGhRTFR5cGUpfVxuXHRcdGRlbGV0ZSR7dWMoZ3JhcGhRTFR5cGUpfShpZDpJRCEpOiR7dWMoZ3JhcGhRTFR5cGUpfVxuXHR9XG5cdHR5cGUgJHt1YyhncmFwaFFMVHlwZSl9IHtcblx0XHRcdGlkOiBJRCFcblx0XHRcdCR7ZmllbGRzLm1hcChkPT5kLm5hbWUrXCI6U3RyaW5nXCIpLmpvaW4oXCJcXG5cXHRcXHRcIil9XG5cdH1cblxuXHRpbnB1dCAke3VjKGdyYXBoUUxUeXBlKX1GaWx0ZXIge1xuXHRcdFx0cTogU3RyaW5nXG5cdFx0XHRpZDogSURcblx0XHRcdGlkczogW0lEXVxuXHRcdFx0JHtmaWVsZHMubWFwKGQ9PmQubmFtZStcIjpTdHJpbmdcIikuam9pbihcIlxcblxcdFxcdFwiKX1cblx0fWA7XG5cdHJldHVybiBxO1xufTtcblxuZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbD1mdW5jdGlvbih7bmFtZSxncmFwaFFMVHlwZSxncmFwaFFMUGx1cmFsfSl7XG5cdHJldHVybiB7XG5cdFx0UXVlcnk6IHtcblx0XHRcdFt1YyhncmFwaFFMVHlwZSldOiBhc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYltuYW1lXS5maW5kQnlQayhhcmdzLmlkKSxcblx0XHRcdFtcImFsbFwiK3VjKGdyYXBoUUxQbHVyYWwpXTogYXN5bmMgKG9iaix7cGVyUGFnZT01MCxwYWdlPTAsZmlsdGVyPXt9fSkgPT57XG5cdFx0XHRcdGxldCB3aGVyZT17fTtcblx0XHRcdFx0aWYgKGZpbHRlci5pZHMpe1xuXHRcdFx0XHRcdHdoZXJlPXtpZDpmaWx0ZXIuaWRzfTtcblx0XHRcdFx0fWVsc2V7d2hlcmU9ZmlsdGVyO307XG5cdFx0XHRcdHJldHVybiBkYltuYW1lXS5maW5kQWxsKHt3aGVyZSxsaW1pdDpwZXJQYWdlLG9mZnNldDpwYWdlKnBlclBhZ2V9KTtcblx0XHRcdH0sXG5cdFx0XHRbXCJfYWxsXCIrdWMoZ3JhcGhRTFBsdXJhbCkrXCJNZXRhXCJdOmFzeW5jKCk9Pntcblx0XHRcdFx0bGV0IGNvdW50PWF3YWl0IGRiW25hbWVdLmNvdW50KCk7XG5cdFx0XHRcdHJldHVybiB7Y291bnR9O1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0TXV0YXRpb246e1xuXHRcdFx0W1wiY3JlYXRlXCIrdWMoZ3JhcGhRTFR5cGUpXTphc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYltuYW1lXS5jcmVhdGUoe3ZhbHVlczphcmdzfSksXG5cdFx0XHRbXCJ1cGRhdGVcIit1YyhncmFwaFFMVHlwZSldOmFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihhcmdzKTtcblx0XHRcdFx0bGV0IGNvdW50PWF3YWl0IGRiW25hbWVdLnVwZGF0ZShhcmdzLHt3aGVyZTp7aWQ6YXJncy5pZH19KTtcblx0XHRcdFx0cmV0dXJuIGRiW25hbWVdLmZpbmRCeVBrKGFyZ3MuaWQpO1xuXHRcdFx0fSxcblx0XHRcdFtcInJlbW92ZVwiK3VjKGdyYXBoUUxUeXBlKV06YXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4gZGJbbmFtZV0uZGVzdHJveSh7d2hlcmU6e2lkOmFyZ3MuaWR9fSlcblx0XHR9XG5cdH07XG59O1xuXG5kYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XG5kYi5TZXF1ZWxpemUgPSBTZXF1ZWxpemU7XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG4iLCIvKiBqc2hpbnQgaW5kZW50OiAxICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ3F1ZXJ5Jywge1xuXHRcdGlkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUigxMSksXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZVxuXHRcdH0sXG5cdFx0bGFiZWw6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0Y29uZmlnOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuVEVYVCxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0Y3JlYXRlZEF0OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IHNlcXVlbGl6ZS5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpXG5cdFx0fSxcblx0XHR1cGRhdGVkQXQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdGRlZmF1bHRWYWx1ZTogc2VxdWVsaXplLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJylcblx0XHR9XG5cdH0sIHtcblx0XHR0YWJsZU5hbWU6ICdxdWVyeSdcblx0fSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3BvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9