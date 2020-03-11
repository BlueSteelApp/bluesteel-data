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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])("\n\t\t\ttype Query\n\t\t\ttype Mutation\n\t\t\ttype ListMetadata {\n\t\t\t    count: Int!\n\t\t\t}\n\t\t\tscalar Date\n\t\t\t");
var resolvers = {};

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

/* jshint indent: 1 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('address', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL,
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
    },
    person_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'address'
  });
};

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
    dwid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    source_code: {
      type: DataTypes.STRING(255),
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

/* jshint indent: 1 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('segment', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
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
    tableName: 'segment'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvYWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvR3JhcGhRTC9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvcGVyc29uLmpzIiwid2VicGFjazovLy8uL2FwcC9HcmFwaFFML3F1ZXJ5LmpzIiwid2VicGFjazovLy8uL2FwcC9HcmFwaFFML3NlZ21lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZGF0YWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21vZGVscy9hZGRyZXNzLmpzIiwid2VicGFjazovLy8uL2FwcC9tb2RlbHMvcGVyc29uLmpzIiwid2VicGFjazovLy8uL2FwcC9tb2RlbHMvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21vZGVscy9zZWdtZW50LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29yc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiJdLCJuYW1lcyI6WyJvIiwibmFtZSIsImdyYXBoUUxUeXBlIiwiZ3JhcGhRTFBsdXJhbCIsInR5cGVEZWZzIiwiZ3FsIiwiZGIiLCJyZXNvbHZlcnMiLCJib2R5UGFyc2VyIiwicmVxdWlyZSIsIkFwb2xsb1NlcnZlciIsImNvcnMiLCJhcHAiLCJleHByZXNzIiwidXNlIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNlcnZlciIsIm1vZHVsZXMiLCJhcHBseU1pZGRsZXdhcmUiLCJnZXQiLCJyZXEiLCJyZXMiLCJzZW5kIiwibGlzdGVuIiwicG9ydCIsImNvbnNvbGUiLCJsb2ciLCJTZXF1ZWxpemUiLCJjb25maWciLCJzZXF1ZWxpemUiLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfTkFNRSIsIkRBVEFCQVNFX1VTRVIiLCJEQVRBQkFTRV9QQVNTV09SRCIsImhvc3QiLCJEQVRBQkFTRV9IT1NUIiwiREFUQUJBU0VfUE9SVCIsImRpYWxlY3QiLCJkZWZpbmUiLCJmcmVlemVUYWJsZU5hbWUiLCJwb29sIiwibWF4IiwibWluIiwiYWNxdWlyZSIsImlkbGUiLCJvcGVyYXRvcnNBbGlhc2VzIiwibW9kZWxzIiwicGVyc29uIiwic2VnbWVudCIsImFkZHJlc3MiLCJxdWVyeSIsIk9iamVjdCIsInZhbHVlcyIsImZvckVhY2giLCJtb2RlbCIsInNlcU1vZGVsIiwia2V5cyIsImtleSIsImFzc29jaWF0ZSIsInVjIiwicyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJnZW5lcmF0ZVR5cGVEZWZzIiwiZ2V0TW9kZWwiLCJFcnJvciIsImZpZWxkcyIsInRhYmxlQXR0cmlidXRlcyIsImZpbHRlciIsImQiLCJpbmRleE9mIiwibWFwIiwiYXNzaWduIiwicSIsImpvaW4iLCJnZW5lcmF0ZUdyYXBoUUxJbXBsIiwiUXVlcnkiLCJvYmoiLCJhcmdzIiwiY29udGV4dCIsImluZm8iLCJmaW5kQnlQayIsImlkIiwicGVyUGFnZSIsInBhZ2UiLCJ3aGVyZSIsImlkcyIsImZpbmRBbGwiLCJsaW1pdCIsIm9mZnNldCIsImNvdW50IiwiTXV0YXRpb24iLCJjcmVhdGUiLCJlcnJvciIsInVwZGF0ZSIsImRlc3Ryb3kiLCJtb2R1bGUiLCJleHBvcnRzIiwiRGF0YVR5cGVzIiwidHlwZSIsIklOVEVHRVIiLCJhbGxvd051bGwiLCJwcmltYXJ5S2V5IiwiZW1haWwiLCJTVFJJTkciLCJwaG9uZSIsInN0cmVldF8xIiwic3RyZWV0XzIiLCJjaXR5IiwicmVnaW9uIiwicG9zdGFsX2NvZGUiLCJsYXRpdHVkZSIsIkRFQ0lNQUwiLCJsb25naXR1ZGUiLCJjcmVhdGVkQXQiLCJEQVRFIiwiZGVmYXVsdFZhbHVlIiwibGl0ZXJhbCIsInVwZGF0ZWRBdCIsInBlcnNvbl9pZCIsInRhYmxlTmFtZSIsImdpdmVuX25hbWUiLCJmYW1pbHlfbmFtZSIsImR3aWQiLCJzb3VyY2VfY29kZSIsImxhYmVsIiwiVEVYVCIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBLElBQUlBLENBQUMsR0FBQztBQUFDQyxNQUFJLEVBQUMsU0FBTjtBQUFnQkMsYUFBVyxFQUFDLFNBQTVCO0FBQXNDQyxlQUFhLEVBQUM7QUFBcEQsQ0FBTjtBQUNPLElBQU1DLFFBQVEsR0FBR0MsaUVBQUcsQ0FBQ0MsMERBQUEsQ0FB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QzZDLE1BQUUsRUFBRTtBQUNIaUIsVUFBSSxFQUFFRCxTQUFTLENBQUNFLE9BQVYsQ0FBa0IsRUFBbEIsQ0FESDtBQUVIQyxlQUFTLEVBQUUsS0FGUjtBQUdIQyxnQkFBVSxFQUFFO0FBSFQsS0FEOEI7QUFNbEN1QixTQUFLLEVBQUU7QUFDTjFCLFVBQUksRUFBRUQsU0FBUyxDQUFDTSxNQUFWLENBQWlCLEdBQWpCLENBREE7QUFFTkgsZUFBUyxFQUFFO0FBRkwsS0FOMkI7QUFVbEMwQixlQUFXLEVBQUU7QUFDWjVCLFVBQUksRUFBRUQsU0FBUyxDQUFDNEIsSUFESjtBQUVaekIsZUFBUyxFQUFFO0FBRkMsS0FWcUI7QUFjbENhLGFBQVMsRUFBRTtBQUNWZixVQUFJLEVBQUVELFNBQVMsQ0FBQ2lCLElBRE47QUFFVmQsZUFBUyxFQUFFLEtBRkQ7QUFHVmUsa0JBQVksRUFBRXpGLFNBQVMsQ0FBQzBGLE9BQVYsQ0FBa0IsbUJBQWxCO0FBSEosS0FkdUI7QUFtQmxDQyxhQUFTLEVBQUU7QUFDVm5CLFVBQUksRUFBRUQsU0FBUyxDQUFDaUIsSUFETjtBQUVWZCxlQUFTLEVBQUUsS0FGRDtBQUdWZSxrQkFBWSxFQUFFekYsU0FBUyxDQUFDMEYsT0FBVixDQUFrQixtQkFBbEI7QUFISjtBQW5CdUIsR0FBNUIsRUF3Qko7QUFDRkcsYUFBUyxFQUFFO0FBRFQsR0F4QkksQ0FBUDtBQTJCQSxDQTVCRCxDOzs7Ozs7Ozs7OztBQ0ZBLDRDOzs7Ozs7Ozs7OztBQ0FBLGtEOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL2FwcC5qc1wiKTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5sZXQgbz17bmFtZTonYWRkcmVzcycsZ3JhcGhRTFR5cGU6J0FkZHJlc3MnLGdyYXBoUUxQbHVyYWw6J0FkZHJlc3Nlcyd9O1xuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsKGRiLmdlbmVyYXRlVHlwZURlZnMobykpO1xuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IGRiLmdlbmVyYXRlR3JhcGhRTEltcGwobyk7XG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xuXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoYFxuXHRcdFx0dHlwZSBRdWVyeVxuXHRcdFx0dHlwZSBNdXRhdGlvblxuXHRcdFx0dHlwZSBMaXN0TWV0YWRhdGEge1xuXHRcdFx0ICAgIGNvdW50OiBJbnQhXG5cdFx0XHR9XG5cdFx0XHRzY2FsYXIgRGF0ZVxuXHRcdFx0YCk7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7fTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5sZXQgbz17bmFtZToncGVyc29uJyxncmFwaFFMVHlwZTonUGVyc29uJyxncmFwaFFMUGx1cmFsOidQZW9wbGUnfTtcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbChkYi5nZW5lcmF0ZVR5cGVEZWZzKG8pKTtcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSBkYi5nZW5lcmF0ZUdyYXBoUUxJbXBsKG8pO1xuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RhdGFiYXNlJztcbmxldCBvPXtuYW1lOidxdWVyeScsZ3JhcGhRTFR5cGU6J1BlcnNvblF1ZXJ5JyxncmFwaFFMUGx1cmFsOidQZXJzb25RdWVyaWVzJ307XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoZGIuZ2VuZXJhdGVUeXBlRGVmcyhvKSk7XG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0gZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbChvKTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5sZXQgbz17bmFtZTonc2VnbWVudCcsZ3JhcGhRTFR5cGU6J1NlZ21lbnQnLGdyYXBoUUxQbHVyYWw6J1NlZ21lbnRzJ307XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoZGIuZ2VuZXJhdGVUeXBlRGVmcyhvKSk7XG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0gZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbChvKTtcbiIsImltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5jb25zdCB7IEFwb2xsb1NlcnZlciB9ID0gcmVxdWlyZSgnYXBvbGxvLXNlcnZlci1leHByZXNzJyk7XG5jb25zdCBjb3JzID0gcmVxdWlyZSgnY29ycycpO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoY29ycygpKTtcblxuY29uc3Qgc2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcih7XG5cdG1vZHVsZXM6IFtcblx0XHRyZXF1aXJlKCcuL0dyYXBoUUwvY29tbW9uJyksXG5cdFx0cmVxdWlyZSgnLi9HcmFwaFFML3BlcnNvbicpLFxuXHRcdHJlcXVpcmUoJy4vR3JhcGhRTC9zZWdtZW50JyksXG5cdFx0cmVxdWlyZSgnLi9HcmFwaFFML2FkZHJlc3MnKSxcblx0XHRyZXF1aXJlKCcuL0dyYXBoUUwvcXVlcnknKVxuXHRdLFxufSk7XG5cbnNlcnZlci5hcHBseU1pZGRsZXdhcmUoeyBhcHAgfSk7XG5cbmFwcC5nZXQoJy8nLCAocmVxLCByZXMpID0+IHJlcy5zZW5kKCdIZWxsbyBCbHVlU3RlZWwnKSk7XG5cbmFwcC5saXN0ZW4oeyBwb3J0OiA1MDAwIH0sICgpID0+XG5cdGNvbnNvbGUubG9nKGDwn5qAIFNlcnZlciByZWFkeSBhdCBodHRwOi8vbG9jYWxob3N0OjUwMDBgKVxuKTtcbiIsImNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG5cbnZhciBkYiA9IHt9O1xuXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKFxuXHRwcm9jZXNzLmVudi5EQVRBQkFTRV9OQU1FLFxuXHRwcm9jZXNzLmVudi5EQVRBQkFTRV9VU0VSLFxuXHRwcm9jZXNzLmVudi5EQVRBQkFTRV9QQVNTV09SRCxcblx0e1xuXHRcdGhvc3Q6IHByb2Nlc3MuZW52LkRBVEFCQVNFX0hPU1QsXG5cdFx0cG9ydDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfUE9SVCxcblx0XHRkaWFsZWN0OiAnbXlzcWwnLFxuXHRcdGRlZmluZToge1xuXHRcdFx0ZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuXHRcdH0sXG5cdFx0cG9vbDoge1xuXHRcdFx0bWF4OiA1LFxuXHRcdFx0bWluOiAwLFxuXHRcdFx0YWNxdWlyZTogMzAwMDAsXG5cdFx0XHRpZGxlOiAxMDAwMCxcblx0XHR9LFxuXHRcdC8vIDxodHRwOi8vZG9jcy5zZXF1ZWxpemVqcy5jb20vbWFudWFsL3R1dG9yaWFsL3F1ZXJ5aW5nLmh0bWwjb3BlcmF0b3JzPlxuXHRcdG9wZXJhdG9yc0FsaWFzZXM6IGZhbHNlLFxuXHQvL3RpbWVzdGFtcHM6IGZhbHNlIC8vSWYgY3JlYXRlZEF0LCBtb2RpZmllZEF0IGFyZSBhbGwgYXZhaWxhYmxlLCB3ZSBjYW4gdXNlIHRoaXNcblx0fSxcbik7XG5cbmxldCBtb2RlbHMgPSB7XG5cdHBlcnNvbjpyZXF1aXJlKCcuL21vZGVscy9wZXJzb24uanMnKSxcblx0c2VnbWVudDpyZXF1aXJlKCcuL21vZGVscy9zZWdtZW50LmpzJyksXG5cdGFkZHJlc3M6cmVxdWlyZSgnLi9tb2RlbHMvYWRkcmVzcy5qcycpLFxuXHRxdWVyeTpyZXF1aXJlKCcuL21vZGVscy9xdWVyeS5qcycpXG59O1xuXG4vLyBJbml0aWFsaXplIG1vZGVsc1xuT2JqZWN0LnZhbHVlcyhtb2RlbHMpLmZvckVhY2gobW9kZWwgPT4ge1xuXHRjb25zdCBzZXFNb2RlbCA9IG1vZGVsKHNlcXVlbGl6ZSwgU2VxdWVsaXplKTtcblx0ZGJbc2VxTW9kZWwubmFtZV0gPSBzZXFNb2RlbDtcbn0pO1xuXG4vLyBBcHBseSBhc3NvY2lhdGlvbnNcbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKGtleSA9PiB7XG5cdGlmICgnYXNzb2NpYXRlJyBpbiBkYltrZXldKSB7XG5cdFx0ZGJba2V5XS5hc3NvY2lhdGUoZGIpO1xuXHR9XG59KTtcbmNvbnN0IHVjID0gKHMpID0+IHtcblx0aWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykgcmV0dXJuICcnO1xuXHRyZXR1cm4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSk7XG59O1xuXG5kYi5nZW5lcmF0ZVR5cGVEZWZzPWZ1bmN0aW9uKHtuYW1lLGdyYXBoUUxUeXBlLGdyYXBoUUxQbHVyYWx9KXtcblx0bGV0IG1vZGVsPXNlcXVlbGl6ZVtcIm1vZGVsTWFuYWdlclwiXS5nZXRNb2RlbChuYW1lKTtcblx0aWYgKCFtb2RlbCkgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgbW9kZWwgXCIrbmFtZStcIiwgYXJlIHlvdSBzdXJlIGl0IGV4aXN0cz9cIik7XG5cblx0bGV0IGZpZWxkcz1PYmplY3Qua2V5cyhtb2RlbC50YWJsZUF0dHJpYnV0ZXMpXG5cdFx0LmZpbHRlcihkPT5bJ2lkJywnY3JlYXRlZEF0JywndXBkYXRlQXQnXS5pbmRleE9mKGQpPDApXG5cdFx0Lm1hcChuYW1lPT57XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxtb2RlbC50YWJsZUF0dHJpYnV0ZXMse25hbWV9KTtcblx0XHR9KTtcblxuXHRsZXQgcT1gZXh0ZW5kIHR5cGUgUXVlcnkge1xuXHRcdCR7dWMoZ3JhcGhRTFR5cGUpfShpZDogSUQhKTogJHt1YyhncmFwaFFMVHlwZSl9XG5cdFx0YWxsJHt1YyhncmFwaFFMUGx1cmFsKX0ocGFnZTogSW50LCBwZXJQYWdlOiBJbnQsIHNvcnRGaWVsZDogU3RyaW5nLCBzb3J0T3JkZXI6IFN0cmluZywgZmlsdGVyOiAke3VjKGdyYXBoUUxUeXBlKX1GaWx0ZXIpOiBbJHt1YyhncmFwaFFMVHlwZSl9XVxuXHRcdF9hbGwke3VjKGdyYXBoUUxQbHVyYWwpfU1ldGEocGFnZTogSW50LCBwZXJQYWdlOiBJbnQsIHNvcnRGaWVsZDogU3RyaW5nLCBzb3J0T3JkZXI6IFN0cmluZywgZmlsdGVyOiAke3VjKGdyYXBoUUxUeXBlKX1GaWx0ZXIpOiBMaXN0TWV0YWRhdGFcblx0fVxuXHRleHRlbmQgdHlwZSBNdXRhdGlvbiB7XG5cdFx0Y3JlYXRlJHt1YyhncmFwaFFMVHlwZSl9KFxuXHRcdFx0XHQke2ZpZWxkcy5tYXAoZD0+ZC5uYW1lK1wiOlN0cmluZ1wiKS5qb2luKFwiXFxuXFx0XFx0XCIpfVxuXHRcdCk6JHt1YyhncmFwaFFMVHlwZSl9XG5cdFx0dXBkYXRlJHt1YyhncmFwaFFMVHlwZSl9KGlkOklEISwke2ZpZWxkcy5tYXAoZD0+ZC5uYW1lK1wiOlN0cmluZ1wiKS5qb2luKFwiLFwiKX0pOiR7dWMoZ3JhcGhRTFR5cGUpfVxuXHRcdGRlbGV0ZSR7dWMoZ3JhcGhRTFR5cGUpfShpZDpJRCEpOiR7dWMoZ3JhcGhRTFR5cGUpfVxuXHR9XG5cdHR5cGUgJHt1YyhncmFwaFFMVHlwZSl9IHtcblx0XHRcdGlkOiBJRCFcblx0XHRcdCR7ZmllbGRzLm1hcChkPT5kLm5hbWUrXCI6U3RyaW5nXCIpLmpvaW4oXCJcXG5cXHRcXHRcIil9XG5cdH1cblxuXHRpbnB1dCAke3VjKGdyYXBoUUxUeXBlKX1GaWx0ZXIge1xuXHRcdFx0cTogU3RyaW5nXG5cdFx0XHRpZDogSURcblx0XHRcdGlkczogW0lEXVxuXHRcdFx0JHtmaWVsZHMubWFwKGQ9PmQubmFtZStcIjpTdHJpbmdcIikuam9pbihcIlxcblxcdFxcdFwiKX1cblx0fWA7XG5cdHJldHVybiBxO1xufTtcblxuZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbD1mdW5jdGlvbih7bmFtZSxncmFwaFFMVHlwZSxncmFwaFFMUGx1cmFsfSl7XG5cdHJldHVybiB7XG5cdFx0UXVlcnk6IHtcblx0XHRcdFt1YyhncmFwaFFMVHlwZSldOiBhc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYltuYW1lXS5maW5kQnlQayhhcmdzLmlkKSxcblx0XHRcdFtcImFsbFwiK3VjKGdyYXBoUUxQbHVyYWwpXTogYXN5bmMgKG9iaix7cGVyUGFnZT01MCxwYWdlPTAsZmlsdGVyPXt9fSkgPT57XG5cdFx0XHRcdGxldCB3aGVyZT17fTtcblx0XHRcdFx0aWYgKGZpbHRlci5pZHMpe1xuXHRcdFx0XHRcdHdoZXJlPXtpZDpmaWx0ZXIuaWRzfTtcblx0XHRcdFx0fWVsc2V7d2hlcmU9ZmlsdGVyO307XG5cdFx0XHRcdHJldHVybiBkYltuYW1lXS5maW5kQWxsKHt3aGVyZSxsaW1pdDpwZXJQYWdlLG9mZnNldDpwYWdlKnBlclBhZ2V9KTtcblx0XHRcdH0sXG5cdFx0XHRbXCJfYWxsXCIrdWMoZ3JhcGhRTFBsdXJhbCkrXCJNZXRhXCJdOmFzeW5jKCk9Pntcblx0XHRcdFx0bGV0IGNvdW50PWF3YWl0IGRiW25hbWVdLmNvdW50KCk7XG5cdFx0XHRcdHJldHVybiB7Y291bnR9O1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0TXV0YXRpb246e1xuXHRcdFx0W1wiY3JlYXRlXCIrdWMoZ3JhcGhRTFR5cGUpXTphc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYltuYW1lXS5jcmVhdGUoe3ZhbHVlczphcmdzfSksXG5cdFx0XHRbXCJ1cGRhdGVcIit1YyhncmFwaFFMVHlwZSldOmFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihhcmdzKTtcblx0XHRcdFx0bGV0IGNvdW50PWF3YWl0IGRiW25hbWVdLnVwZGF0ZShhcmdzLHt3aGVyZTp7aWQ6YXJncy5pZH19KTtcblx0XHRcdFx0cmV0dXJuIGRiW25hbWVdLmZpbmRCeVBrKGFyZ3MuaWQpO1xuXHRcdFx0fSxcblx0XHRcdFtcInJlbW92ZVwiK3VjKGdyYXBoUUxUeXBlKV06YXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4gZGJbbmFtZV0uZGVzdHJveSh7d2hlcmU6e2lkOmFyZ3MuaWR9fSlcblx0XHR9XG5cdH07XG59O1xuXG5kYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XG5kYi5TZXF1ZWxpemUgPSBTZXF1ZWxpemU7XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG4iLCIvKiBqc2hpbnQgaW5kZW50OiAxICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ2FkZHJlc3MnLCB7XG5cdFx0aWQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSKDExKSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRwcmltYXJ5S2V5OiB0cnVlXG5cdFx0fSxcblx0XHRlbWFpbDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRwaG9uZToge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNCksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdHN0cmVldF8xOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdHN0cmVldF8yOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGNpdHk6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0cmVnaW9uOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdHBvc3RhbF9jb2RlOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDE2KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0bGF0aXR1ZGU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5ERUNJTUFMLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRsb25naXR1ZGU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5ERUNJTUFMLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRjcmVhdGVkQXQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdGRlZmF1bHRWYWx1ZTogc2VxdWVsaXplLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJylcblx0XHR9LFxuXHRcdHVwZGF0ZWRBdDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBzZXF1ZWxpemUubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKVxuXHRcdH0sXG5cdFx0cGVyc29uX2lkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUigxMSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9XG5cdH0sIHtcblx0XHR0YWJsZU5hbWU6ICdhZGRyZXNzJ1xuXHR9KTtcbn07XG4iLCIvKiBqc2hpbnQgaW5kZW50OiAxICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ3BlcnNvbicsIHtcblx0XHRpZDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIoMTEpLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdHByaW1hcnlLZXk6IHRydWVcblx0XHR9LFxuXHRcdGdpdmVuX25hbWU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0ZmFtaWx5X25hbWU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0ZW1haWw6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0cGhvbmU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjQpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRkd2lkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUigxMSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdHNvdXJjZV9jb2RlOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGNyZWF0ZWRBdDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBzZXF1ZWxpemUubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKVxuXHRcdH0sXG5cdFx0dXBkYXRlZEF0OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IHNlcXVlbGl6ZS5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpXG5cdFx0fVxuXHR9LCB7XG5cdFx0dGFibGVOYW1lOiAncGVyc29uJ1xuXHR9KTtcbn07XG4iLCIvKiBqc2hpbnQgaW5kZW50OiAxICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ3F1ZXJ5Jywge1xuXHRcdGlkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUigxMSksXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZVxuXHRcdH0sXG5cdFx0bGFiZWw6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0Y29uZmlnOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuVEVYVCxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0Y3JlYXRlZEF0OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IHNlcXVlbGl6ZS5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpXG5cdFx0fSxcblx0XHR1cGRhdGVkQXQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdGRlZmF1bHRWYWx1ZTogc2VxdWVsaXplLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJylcblx0XHR9XG5cdH0sIHtcblx0XHR0YWJsZU5hbWU6ICdxdWVyeSdcblx0fSk7XG59O1xuIiwiLyoganNoaW50IGluZGVudDogMSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XG5cdHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKCdzZWdtZW50Jywge1xuXHRcdGlkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUigxMSksXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZVxuXHRcdH0sXG5cdFx0bGFiZWw6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0ZGVzY3JpcHRpb246IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5URVhULFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRjcmVhdGVkQXQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdGRlZmF1bHRWYWx1ZTogc2VxdWVsaXplLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJylcblx0XHR9LFxuXHRcdHVwZGF0ZWRBdDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBzZXF1ZWxpemUubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKVxuXHRcdH1cblx0fSwge1xuXHRcdHRhYmxlTmFtZTogJ3NlZ21lbnQnXG5cdH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==