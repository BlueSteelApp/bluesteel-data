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


var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_database__WEBPACK_IMPORTED_MODULE_1__["generateTypeDefs"]('address', 'addresses'));
var resolvers = _database__WEBPACK_IMPORTED_MODULE_1__["generateGraphQLImpl"]('address', 'addresses');

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


var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_database__WEBPACK_IMPORTED_MODULE_1__["generateTypeDefs"]('person', 'People'));
var resolvers = _database__WEBPACK_IMPORTED_MODULE_1__["generateGraphQLImpl"]('person', 'People');

/***/ }),

/***/ "./app/GraphQL/search.js":
/*!*******************************!*\
  !*** ./app/GraphQL/search.js ***!
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


var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_database__WEBPACK_IMPORTED_MODULE_1__["generateTypeDefs"]('search', 'searches'));
var resolvers = _database__WEBPACK_IMPORTED_MODULE_1__["generateGraphQLImpl"]('search', 'searches');

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


var typeDefs = Object(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"])(_database__WEBPACK_IMPORTED_MODULE_1__["generateTypeDefs"]('segment', 'segments'));
var resolvers = _database__WEBPACK_IMPORTED_MODULE_1__["generateGraphQLImpl"]('segment', 'segments');

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
  modules: [__webpack_require__(/*! ./GraphQL/common */ "./app/GraphQL/common.js"), __webpack_require__(/*! ./GraphQL/person */ "./app/GraphQL/person.js"), __webpack_require__(/*! ./GraphQL/segment */ "./app/GraphQL/segment.js"), __webpack_require__(/*! ./GraphQL/address */ "./app/GraphQL/address.js"), __webpack_require__(/*! ./GraphQL/search */ "./app/GraphQL/search.js")]
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
  search: __webpack_require__(/*! ./models/search.js */ "./app/models/search.js")
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

db.generateTypeDefs = function (object, plural) {
  var model = sequelize["modelManager"].getModel(object);
  if (!model) throw new Error("Could not find model " + object + ", are you sure it exists?");
  var fields = Object.keys(model.tableAttributes).filter(function (d) {
    return ['id', 'createdAt', 'updateAt'].indexOf(d) < 0;
  }).map(function (name) {
    return Object.assign({}, model.tableAttributes, {
      name: name
    });
  });
  var q = "extend type Query {\n\t\t".concat(uc(object), "(id: ID!): ").concat(uc(object), "\n\t\tall").concat(uc(plural), "(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ").concat(uc(object), "Filter): [").concat(uc(object), "]\n\t\t_all").concat(uc(plural), "Meta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ").concat(uc(object), "Filter): ListMetadata\n\t}\n\textend type Mutation {\n\t\tcreate").concat(uc(object), "(\n\t\t\t\t").concat(fields.map(function (d) {
    return d.name + ":String";
  }).join("\n\t\t"), "\n\t\t):").concat(uc(object), "\n\t\tupdate").concat(uc(object), "(id:ID!,").concat(fields.map(function (d) {
    return d.name + ":String";
  }).join(","), "):").concat(uc(object), "\n\t\tdelete").concat(uc(object), "(id:ID!):").concat(uc(object), "\n\t}\n\ttype ").concat(uc(object), " {\n\t\t\tid: ID!\n\t\t\t").concat(fields.map(function (d) {
    return d.name + ":String";
  }).join("\n\t\t"), "\n\t}\n\n\tinput ").concat(uc(object), "Filter {\n\t\t\tq: String\n\t\t\tid: ID\n\t\t\t").concat(fields.map(function (d) {
    return d.name + ":String";
  }).join("\n\t\t"), "\n\t}");
  return q;
};

db.generateGraphQLImpl = function (object, plural) {
  var _Query, _Mutation;

  return {
    Query: (_Query = {}, _defineProperty(_Query, uc(object), function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", db[object].findByPk(args.id));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }()), _defineProperty(_Query, "all" + uc(plural), function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(obj, _ref3) {
        var _ref3$perPage, perPage, _ref3$page, page;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref3$perPage = _ref3.perPage, perPage = _ref3$perPage === void 0 ? 50 : _ref3$perPage, _ref3$page = _ref3.page, page = _ref3$page === void 0 ? 0 : _ref3$page;
                return _context2.abrupt("return", db[object].findAll({
                  limit: perPage,
                  offset: page * perPage
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }()), _defineProperty(_Query, "_all" + uc(plural) + "Meta", _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var count;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return db[object].count();

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
    Mutation: (_Mutation = {}, _defineProperty(_Mutation, "create" + uc(object), function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", db[object].create({
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
        return _ref5.apply(this, arguments);
      };
    }()), _defineProperty(_Mutation, "update" + uc(object), function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(obj, args, context, info) {
        var count;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.error(args);
                _context5.next = 3;
                return db[object].update(args, {
                  where: {
                    id: args.id
                  }
                });

              case 3:
                count = _context5.sent;
                return _context5.abrupt("return", db[object].findByPk(args.id));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x11, _x12, _x13, _x14) {
        return _ref6.apply(this, arguments);
      };
    }()), _defineProperty(_Mutation, "remove" + uc(object), function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(obj, args, context, info) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", db[object].destroy({
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
        return _ref7.apply(this, arguments);
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
    person_id: {
      type: DataTypes.INTEGER(11),
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
    personId: {
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

/***/ "./app/models/search.js":
/*!******************************!*\
  !*** ./app/models/search.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 1 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('search', {
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
    tableName: 'search'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvYWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvR3JhcGhRTC9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvcGVyc29uLmpzIiwid2VicGFjazovLy8uL2FwcC9HcmFwaFFML3NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvR3JhcGhRTC9zZWdtZW50LmpzIiwid2VicGFjazovLy8uL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGFiYXNlLmpzIiwid2VicGFjazovLy8uL2FwcC9tb2RlbHMvYWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbW9kZWxzL3BlcnNvbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbW9kZWxzL3NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbW9kZWxzL3NlZ21lbnQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGJhYmVsL3BvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIl0sIm5hbWVzIjpbInR5cGVEZWZzIiwiZ3FsIiwiZGIiLCJyZXNvbHZlcnMiLCJib2R5UGFyc2VyIiwicmVxdWlyZSIsIkFwb2xsb1NlcnZlciIsImNvcnMiLCJhcHAiLCJleHByZXNzIiwidXNlIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNlcnZlciIsIm1vZHVsZXMiLCJhcHBseU1pZGRsZXdhcmUiLCJnZXQiLCJyZXEiLCJyZXMiLCJzZW5kIiwibGlzdGVuIiwicG9ydCIsImNvbnNvbGUiLCJsb2ciLCJTZXF1ZWxpemUiLCJjb25maWciLCJzZXF1ZWxpemUiLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfTkFNRSIsIkRBVEFCQVNFX1VTRVIiLCJEQVRBQkFTRV9QQVNTV09SRCIsImhvc3QiLCJEQVRBQkFTRV9IT1NUIiwiREFUQUJBU0VfUE9SVCIsImRpYWxlY3QiLCJkZWZpbmUiLCJmcmVlemVUYWJsZU5hbWUiLCJwb29sIiwibWF4IiwibWluIiwiYWNxdWlyZSIsImlkbGUiLCJvcGVyYXRvcnNBbGlhc2VzIiwibW9kZWxzIiwicGVyc29uIiwic2VnbWVudCIsImFkZHJlc3MiLCJzZWFyY2giLCJPYmplY3QiLCJ2YWx1ZXMiLCJmb3JFYWNoIiwibW9kZWwiLCJzZXFNb2RlbCIsIm5hbWUiLCJrZXlzIiwia2V5IiwiYXNzb2NpYXRlIiwidWMiLCJzIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImdlbmVyYXRlVHlwZURlZnMiLCJvYmplY3QiLCJwbHVyYWwiLCJnZXRNb2RlbCIsIkVycm9yIiwiZmllbGRzIiwidGFibGVBdHRyaWJ1dGVzIiwiZmlsdGVyIiwiZCIsImluZGV4T2YiLCJtYXAiLCJhc3NpZ24iLCJxIiwiam9pbiIsImdlbmVyYXRlR3JhcGhRTEltcGwiLCJRdWVyeSIsIm9iaiIsImFyZ3MiLCJjb250ZXh0IiwiaW5mbyIsImZpbmRCeVBrIiwiaWQiLCJwZXJQYWdlIiwicGFnZSIsImZpbmRBbGwiLCJsaW1pdCIsIm9mZnNldCIsImNvdW50IiwiTXV0YXRpb24iLCJjcmVhdGUiLCJlcnJvciIsInVwZGF0ZSIsIndoZXJlIiwiZGVzdHJveSIsIm1vZHVsZSIsImV4cG9ydHMiLCJEYXRhVHlwZXMiLCJ0eXBlIiwiSU5URUdFUiIsImFsbG93TnVsbCIsInByaW1hcnlLZXkiLCJwZXJzb25faWQiLCJlbWFpbCIsIlNUUklORyIsInBob25lIiwic3RyZWV0XzEiLCJzdHJlZXRfMiIsImNpdHkiLCJyZWdpb24iLCJwb3N0YWxfY29kZSIsImxhdGl0dWRlIiwiREVDSU1BTCIsImxvbmdpdHVkZSIsImNyZWF0ZWRBdCIsIkRBVEUiLCJkZWZhdWx0VmFsdWUiLCJsaXRlcmFsIiwidXBkYXRlZEF0IiwicGVyc29uSWQiLCJ0YWJsZU5hbWUiLCJnaXZlbl9uYW1lIiwiZmFtaWx5X25hbWUiLCJkd2lkIiwic291cmNlX2NvZGUiLCJsYWJlbCIsIlRFWFQiLCJkZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDTyxJQUFNQSxRQUFRLEdBQUdDLGlFQUFHLENBQUNDLDBEQUFBLENBQW9CLFNBQXBCLEVBQThCLFdBQTlCLENBQUQsQ0FBcEI7QUFDQSxJQUFNQyxTQUFTLEdBQUdELDZEQUFBLENBQXVCLFNBQXZCLEVBQWlDLFdBQWpDLENBQWxCLEM7Ozs7Ozs7Ozs7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QSxDQTVCRCxDOzs7Ozs7Ozs7OztBQ0ZBLDRDOzs7Ozs7Ozs7OztBQ0FBLGtEOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL2FwcC5qc1wiKTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoZGIuZ2VuZXJhdGVUeXBlRGVmcygnYWRkcmVzcycsJ2FkZHJlc3NlcycpKTtcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSBkYi5nZW5lcmF0ZUdyYXBoUUxJbXBsKCdhZGRyZXNzJywnYWRkcmVzc2VzJyk7XG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xuXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoYFxuXHRcdFx0dHlwZSBRdWVyeVxuXHRcdFx0dHlwZSBNdXRhdGlvblxuXHRcdFx0dHlwZSBMaXN0TWV0YWRhdGEge1xuXHRcdFx0ICAgIGNvdW50OiBJbnQhXG5cdFx0XHR9XG5cdFx0XHRzY2FsYXIgRGF0ZVxuXHRcdFx0YCk7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7fTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoZGIuZ2VuZXJhdGVUeXBlRGVmcygncGVyc29uJywnUGVvcGxlJykpO1xuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IGRiLmdlbmVyYXRlR3JhcGhRTEltcGwoJ3BlcnNvbicsJ1Blb3BsZScpO1xuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RhdGFiYXNlJztcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbChkYi5nZW5lcmF0ZVR5cGVEZWZzKCdzZWFyY2gnLCdzZWFyY2hlcycpKTtcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSBkYi5nZW5lcmF0ZUdyYXBoUUxJbXBsKCdzZWFyY2gnLCdzZWFyY2hlcycpO1xuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RhdGFiYXNlJztcbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbChkYi5nZW5lcmF0ZVR5cGVEZWZzKCdzZWdtZW50Jywnc2VnbWVudHMnKSk7XG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0gZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbCgnc2VnbWVudCcsJ3NlZ21lbnRzJyk7XG4iLCJpbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgeyBBcG9sbG9TZXJ2ZXIgfSA9IHJlcXVpcmUoJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcycpO1xuY29uc3QgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGNvcnMoKSk7XG5cbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuXHRtb2R1bGVzOiBbXG5cdFx0cmVxdWlyZSgnLi9HcmFwaFFML2NvbW1vbicpLFxuXHRcdHJlcXVpcmUoJy4vR3JhcGhRTC9wZXJzb24nKSxcblx0XHRyZXF1aXJlKCcuL0dyYXBoUUwvc2VnbWVudCcpLFxuXHRcdHJlcXVpcmUoJy4vR3JhcGhRTC9hZGRyZXNzJyksXG5cdFx0cmVxdWlyZSgnLi9HcmFwaFFML3NlYXJjaCcpXG5cdF0sXG59KTtcblxuc2VydmVyLmFwcGx5TWlkZGxld2FyZSh7IGFwcCB9KTtcblxuYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4gcmVzLnNlbmQoJ0hlbGxvIEJsdWVTdGVlbCcpKTtcblxuYXBwLmxpc3Rlbih7IHBvcnQ6IDUwMDAgfSwgKCkgPT5cblx0Y29uc29sZS5sb2coYPCfmoAgU2VydmVyIHJlYWR5IGF0IGh0dHA6Ly9sb2NhbGhvc3Q6NTAwMGApXG4pO1xuIiwiY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5yZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcblxudmFyIGRiID0ge307XG5cbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoXG5cdHByb2Nlc3MuZW52LkRBVEFCQVNFX05BTUUsXG5cdHByb2Nlc3MuZW52LkRBVEFCQVNFX1VTRVIsXG5cdHByb2Nlc3MuZW52LkRBVEFCQVNFX1BBU1NXT1JELFxuXHR7XG5cdFx0aG9zdDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfSE9TVCxcblx0XHRwb3J0OiBwcm9jZXNzLmVudi5EQVRBQkFTRV9QT1JULFxuXHRcdGRpYWxlY3Q6ICdteXNxbCcsXG5cdFx0ZGVmaW5lOiB7XG5cdFx0XHRmcmVlemVUYWJsZU5hbWU6IHRydWUsXG5cdFx0fSxcblx0XHRwb29sOiB7XG5cdFx0XHRtYXg6IDUsXG5cdFx0XHRtaW46IDAsXG5cdFx0XHRhY3F1aXJlOiAzMDAwMCxcblx0XHRcdGlkbGU6IDEwMDAwLFxuXHRcdH0sXG5cdFx0Ly8gPGh0dHA6Ly9kb2NzLnNlcXVlbGl6ZWpzLmNvbS9tYW51YWwvdHV0b3JpYWwvcXVlcnlpbmcuaHRtbCNvcGVyYXRvcnM+XG5cdFx0b3BlcmF0b3JzQWxpYXNlczogZmFsc2UsXG5cdC8vdGltZXN0YW1wczogZmFsc2UgLy9JZiBjcmVhdGVkQXQsIG1vZGlmaWVkQXQgYXJlIGFsbCBhdmFpbGFibGUsIHdlIGNhbiB1c2UgdGhpc1xuXHR9LFxuKTtcblxubGV0IG1vZGVscyA9IHtcblx0cGVyc29uOnJlcXVpcmUoJy4vbW9kZWxzL3BlcnNvbi5qcycpLFxuXHRzZWdtZW50OnJlcXVpcmUoJy4vbW9kZWxzL3NlZ21lbnQuanMnKSxcblx0YWRkcmVzczpyZXF1aXJlKCcuL21vZGVscy9hZGRyZXNzLmpzJyksXG5cdHNlYXJjaDpyZXF1aXJlKCcuL21vZGVscy9zZWFyY2guanMnKVxufTtcblxuLy8gSW5pdGlhbGl6ZSBtb2RlbHNcbk9iamVjdC52YWx1ZXMobW9kZWxzKS5mb3JFYWNoKG1vZGVsID0+IHtcblx0Y29uc3Qgc2VxTW9kZWwgPSBtb2RlbChzZXF1ZWxpemUsIFNlcXVlbGl6ZSk7XG5cdGRiW3NlcU1vZGVsLm5hbWVdID0gc2VxTW9kZWw7XG59KTtcblxuLy8gQXBwbHkgYXNzb2NpYXRpb25zXG5PYmplY3Qua2V5cyhkYikuZm9yRWFjaChrZXkgPT4ge1xuXHRpZiAoJ2Fzc29jaWF0ZScgaW4gZGJba2V5XSkge1xuXHRcdGRiW2tleV0uYXNzb2NpYXRlKGRiKTtcblx0fVxufSk7XG5jb25zdCB1YyA9IChzKSA9PiB7XG5cdGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHJldHVybiAnJztcblx0cmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xufTtcblxuZGIuZ2VuZXJhdGVUeXBlRGVmcz1mdW5jdGlvbihvYmplY3QscGx1cmFsKXtcblx0bGV0IG1vZGVsPXNlcXVlbGl6ZVtcIm1vZGVsTWFuYWdlclwiXS5nZXRNb2RlbChvYmplY3QpO1xuXHRpZiAoIW1vZGVsKSB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBtb2RlbCBcIitvYmplY3QrXCIsIGFyZSB5b3Ugc3VyZSBpdCBleGlzdHM/XCIpO1xuXG5cdGxldCBmaWVsZHM9T2JqZWN0LmtleXMobW9kZWwudGFibGVBdHRyaWJ1dGVzKVxuXHRcdC5maWx0ZXIoZD0+WydpZCcsJ2NyZWF0ZWRBdCcsJ3VwZGF0ZUF0J10uaW5kZXhPZihkKTwwKVxuXHRcdC5tYXAobmFtZT0+e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sbW9kZWwudGFibGVBdHRyaWJ1dGVzLHtuYW1lfSk7XG5cdFx0fSk7XG5cblx0bGV0IHE9YGV4dGVuZCB0eXBlIFF1ZXJ5IHtcblx0XHQke3VjKG9iamVjdCl9KGlkOiBJRCEpOiAke3VjKG9iamVjdCl9XG5cdFx0YWxsJHt1YyhwbHVyYWwpfShwYWdlOiBJbnQsIHBlclBhZ2U6IEludCwgc29ydEZpZWxkOiBTdHJpbmcsIHNvcnRPcmRlcjogU3RyaW5nLCBmaWx0ZXI6ICR7dWMob2JqZWN0KX1GaWx0ZXIpOiBbJHt1YyhvYmplY3QpfV1cblx0XHRfYWxsJHt1YyhwbHVyYWwpfU1ldGEocGFnZTogSW50LCBwZXJQYWdlOiBJbnQsIHNvcnRGaWVsZDogU3RyaW5nLCBzb3J0T3JkZXI6IFN0cmluZywgZmlsdGVyOiAke3VjKG9iamVjdCl9RmlsdGVyKTogTGlzdE1ldGFkYXRhXG5cdH1cblx0ZXh0ZW5kIHR5cGUgTXV0YXRpb24ge1xuXHRcdGNyZWF0ZSR7dWMob2JqZWN0KX0oXG5cdFx0XHRcdCR7ZmllbGRzLm1hcChkPT5kLm5hbWUrXCI6U3RyaW5nXCIpLmpvaW4oXCJcXG5cXHRcXHRcIil9XG5cdFx0KToke3VjKG9iamVjdCl9XG5cdFx0dXBkYXRlJHt1YyhvYmplY3QpfShpZDpJRCEsJHtmaWVsZHMubWFwKGQ9PmQubmFtZStcIjpTdHJpbmdcIikuam9pbihcIixcIil9KToke3VjKG9iamVjdCl9XG5cdFx0ZGVsZXRlJHt1YyhvYmplY3QpfShpZDpJRCEpOiR7dWMob2JqZWN0KX1cblx0fVxuXHR0eXBlICR7dWMob2JqZWN0KX0ge1xuXHRcdFx0aWQ6IElEIVxuXHRcdFx0JHtmaWVsZHMubWFwKGQ9PmQubmFtZStcIjpTdHJpbmdcIikuam9pbihcIlxcblxcdFxcdFwiKX1cblx0fVxuXG5cdGlucHV0ICR7dWMob2JqZWN0KX1GaWx0ZXIge1xuXHRcdFx0cTogU3RyaW5nXG5cdFx0XHRpZDogSURcblx0XHRcdCR7ZmllbGRzLm1hcChkPT5kLm5hbWUrXCI6U3RyaW5nXCIpLmpvaW4oXCJcXG5cXHRcXHRcIil9XG5cdH1gO1xuXHRyZXR1cm4gcTtcbn07XG5cbmRiLmdlbmVyYXRlR3JhcGhRTEltcGw9ZnVuY3Rpb24ob2JqZWN0LHBsdXJhbCl7XG5cdHJldHVybiB7XG5cdFx0UXVlcnk6IHtcblx0XHRcdFt1YyhvYmplY3QpXTogYXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4gZGJbb2JqZWN0XS5maW5kQnlQayhhcmdzLmlkKSxcblx0XHRcdFtcImFsbFwiK3VjKHBsdXJhbCldOiBhc3luYyAob2JqLHtwZXJQYWdlPTUwLHBhZ2U9MH0pID0+IGRiW29iamVjdF0uZmluZEFsbCh7bGltaXQ6cGVyUGFnZSxvZmZzZXQ6cGFnZSpwZXJQYWdlfSksXG5cdFx0XHRbXCJfYWxsXCIrdWMocGx1cmFsKStcIk1ldGFcIl06YXN5bmMoKT0+e1xuXHRcdFx0XHRsZXQgY291bnQ9YXdhaXQgZGJbb2JqZWN0XS5jb3VudCgpO1xuXHRcdFx0XHRyZXR1cm4ge2NvdW50fTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdE11dGF0aW9uOntcblx0XHRcdFtcImNyZWF0ZVwiK3VjKG9iamVjdCldOmFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IGRiW29iamVjdF0uY3JlYXRlKHt2YWx1ZXM6YXJnc30pLFxuXHRcdFx0W1widXBkYXRlXCIrdWMob2JqZWN0KV06YXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGFyZ3MpO1xuXHRcdFx0XHRsZXQgY291bnQ9YXdhaXQgZGJbb2JqZWN0XS51cGRhdGUoYXJncyx7d2hlcmU6e2lkOmFyZ3MuaWR9fSk7XG5cdFx0XHRcdHJldHVybiBkYltvYmplY3RdLmZpbmRCeVBrKGFyZ3MuaWQpO1xuXHRcdFx0fSxcblx0XHRcdFtcInJlbW92ZVwiK3VjKG9iamVjdCldOmFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IGRiW29iamVjdF0uZGVzdHJveSh7d2hlcmU6e2lkOmFyZ3MuaWR9fSlcblx0XHR9XG5cdH07XG59O1xuXG5kYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XG5kYi5TZXF1ZWxpemUgPSBTZXF1ZWxpemU7XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG4iLCIvKiBqc2hpbnQgaW5kZW50OiAxICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ2FkZHJlc3MnLCB7XG5cdFx0aWQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSKDExKSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRwcmltYXJ5S2V5OiB0cnVlXG5cdFx0fSxcblx0XHRwZXJzb25faWQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSKDExKSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0ZW1haWw6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0cGhvbmU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjQpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRzdHJlZXRfMToge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRzdHJlZXRfMjoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRjaXR5OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdHJlZ2lvbjoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRwb3N0YWxfY29kZToge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygxNiksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGxhdGl0dWRlOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREVDSU1BTCxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0bG9uZ2l0dWRlOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREVDSU1BTCxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0Y3JlYXRlZEF0OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IHNlcXVlbGl6ZS5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpXG5cdFx0fSxcblx0XHR1cGRhdGVkQXQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdGRlZmF1bHRWYWx1ZTogc2VxdWVsaXplLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJylcblx0XHR9LFxuXHRcdHBlcnNvbklkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUigxMSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9XG5cdH0sIHtcblx0XHR0YWJsZU5hbWU6ICdhZGRyZXNzJ1xuXHR9KTtcbn07XG4iLCIvKiBqc2hpbnQgaW5kZW50OiAxICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ3BlcnNvbicsIHtcblx0XHRpZDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIoMTEpLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdHByaW1hcnlLZXk6IHRydWVcblx0XHR9LFxuXHRcdGdpdmVuX25hbWU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0ZmFtaWx5X25hbWU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0ZW1haWw6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0cGhvbmU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjQpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRkd2lkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUigxMSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdHNvdXJjZV9jb2RlOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGNyZWF0ZWRBdDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBzZXF1ZWxpemUubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKVxuXHRcdH0sXG5cdFx0dXBkYXRlZEF0OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IHNlcXVlbGl6ZS5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpXG5cdFx0fVxuXHR9LCB7XG5cdFx0dGFibGVOYW1lOiAncGVyc29uJ1xuXHR9KTtcbn07XG4iLCIvKiBqc2hpbnQgaW5kZW50OiAxICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ3NlYXJjaCcsIHtcblx0XHRpZDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIoMTEpLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdHByaW1hcnlLZXk6IHRydWVcblx0XHR9LFxuXHRcdGxhYmVsOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGNvbmZpZzoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlRFWFQsXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGNyZWF0ZWRBdDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBzZXF1ZWxpemUubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKVxuXHRcdH0sXG5cdFx0dXBkYXRlZEF0OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IHNlcXVlbGl6ZS5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpXG5cdFx0fVxuXHR9LCB7XG5cdFx0dGFibGVOYW1lOiAnc2VhcmNoJ1xuXHR9KTtcbn07XG4iLCIvKiBqc2hpbnQgaW5kZW50OiAxICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VxdWVsaXplLCBEYXRhVHlwZXMpIHtcblx0cmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoJ3NlZ21lbnQnLCB7XG5cdFx0aWQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSKDExKSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRwcmltYXJ5S2V5OiB0cnVlXG5cdFx0fSxcblx0XHRsYWJlbDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRkZXNjcmlwdGlvbjoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlRFWFQsXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGNyZWF0ZWRBdDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBzZXF1ZWxpemUubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKVxuXHRcdH0sXG5cdFx0dXBkYXRlZEF0OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IHNlcXVlbGl6ZS5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpXG5cdFx0fVxuXHR9LCB7XG5cdFx0dGFibGVOYW1lOiAnc2VnbWVudCdcblx0fSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3BvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9