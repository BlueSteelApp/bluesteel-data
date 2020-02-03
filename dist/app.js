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
  }).join("\n\t\t"), "\n\t}\n\n\tinput ").concat(uc(object), "Filter {\n\t\t\tq: String\n\t\t\tid: ID\n\t\t\tids: [ID]\n\t\t\t").concat(fields.map(function (d) {
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
        var _ref3$perPage, perPage, _ref3$page, page, filter, where;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref3$perPage = _ref3.perPage, perPage = _ref3$perPage === void 0 ? 50 : _ref3$perPage, _ref3$page = _ref3.page, page = _ref3$page === void 0 ? 0 : _ref3$page, filter = _ref3.filter;
                where = {};

                if (filter.ids) {
                  where = {
                    id: filter.ids
                  };
                } else {
                  where = filter;
                }

                ;
                return _context2.abrupt("return", db[object].findAll({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvYWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvR3JhcGhRTC9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0dyYXBoUUwvcGVyc29uLmpzIiwid2VicGFjazovLy8uL2FwcC9HcmFwaFFML3NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvR3JhcGhRTC9zZWdtZW50LmpzIiwid2VicGFjazovLy8uL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RhdGFiYXNlLmpzIiwid2VicGFjazovLy8uL2FwcC9tb2RlbHMvYWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbW9kZWxzL3BlcnNvbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbW9kZWxzL3NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbW9kZWxzL3NlZ21lbnQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGJhYmVsL3BvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIl0sIm5hbWVzIjpbInR5cGVEZWZzIiwiZ3FsIiwiZGIiLCJyZXNvbHZlcnMiLCJib2R5UGFyc2VyIiwicmVxdWlyZSIsIkFwb2xsb1NlcnZlciIsImNvcnMiLCJhcHAiLCJleHByZXNzIiwidXNlIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNlcnZlciIsIm1vZHVsZXMiLCJhcHBseU1pZGRsZXdhcmUiLCJnZXQiLCJyZXEiLCJyZXMiLCJzZW5kIiwibGlzdGVuIiwicG9ydCIsImNvbnNvbGUiLCJsb2ciLCJTZXF1ZWxpemUiLCJjb25maWciLCJzZXF1ZWxpemUiLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfTkFNRSIsIkRBVEFCQVNFX1VTRVIiLCJEQVRBQkFTRV9QQVNTV09SRCIsImhvc3QiLCJEQVRBQkFTRV9IT1NUIiwiREFUQUJBU0VfUE9SVCIsImRpYWxlY3QiLCJkZWZpbmUiLCJmcmVlemVUYWJsZU5hbWUiLCJwb29sIiwibWF4IiwibWluIiwiYWNxdWlyZSIsImlkbGUiLCJvcGVyYXRvcnNBbGlhc2VzIiwibW9kZWxzIiwicGVyc29uIiwic2VnbWVudCIsImFkZHJlc3MiLCJzZWFyY2giLCJPYmplY3QiLCJ2YWx1ZXMiLCJmb3JFYWNoIiwibW9kZWwiLCJzZXFNb2RlbCIsIm5hbWUiLCJrZXlzIiwia2V5IiwiYXNzb2NpYXRlIiwidWMiLCJzIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImdlbmVyYXRlVHlwZURlZnMiLCJvYmplY3QiLCJwbHVyYWwiLCJnZXRNb2RlbCIsIkVycm9yIiwiZmllbGRzIiwidGFibGVBdHRyaWJ1dGVzIiwiZmlsdGVyIiwiZCIsImluZGV4T2YiLCJtYXAiLCJhc3NpZ24iLCJxIiwiam9pbiIsImdlbmVyYXRlR3JhcGhRTEltcGwiLCJRdWVyeSIsIm9iaiIsImFyZ3MiLCJjb250ZXh0IiwiaW5mbyIsImZpbmRCeVBrIiwiaWQiLCJwZXJQYWdlIiwicGFnZSIsIndoZXJlIiwiaWRzIiwiZmluZEFsbCIsImxpbWl0Iiwib2Zmc2V0IiwiY291bnQiLCJNdXRhdGlvbiIsImNyZWF0ZSIsImVycm9yIiwidXBkYXRlIiwiZGVzdHJveSIsIm1vZHVsZSIsImV4cG9ydHMiLCJEYXRhVHlwZXMiLCJ0eXBlIiwiSU5URUdFUiIsImFsbG93TnVsbCIsInByaW1hcnlLZXkiLCJlbWFpbCIsIlNUUklORyIsInBob25lIiwic3RyZWV0XzEiLCJzdHJlZXRfMiIsImNpdHkiLCJyZWdpb24iLCJwb3N0YWxfY29kZSIsImxhdGl0dWRlIiwiREVDSU1BTCIsImxvbmdpdHVkZSIsImNyZWF0ZWRBdCIsIkRBVEUiLCJkZWZhdWx0VmFsdWUiLCJsaXRlcmFsIiwidXBkYXRlZEF0IiwicGVyc29uX2lkIiwidGFibGVOYW1lIiwiZ2l2ZW5fbmFtZSIsImZhbWlseV9uYW1lIiwiZHdpZCIsInNvdXJjZV9jb2RlIiwibGFiZWwiLCJURVhUIiwiZGVzY3JpcHRpb24iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ08sSUFBTUEsUUFBUSxHQUFHQyxpRUFBRyxDQUFDQywwREFBQSxDQUFvQixTQUFwQixFQUE4QixXQUE5QixDQUFELENBQXBCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHRCw2REFBQSxDQUF1QixTQUF2QixFQUFpQyxXQUFqQyxDQUFsQixDOzs7Ozs7Ozs7Ozs7QUNI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VmUsa0JBQVksRUFBRTVGLFNBQVMsQ0FBQzZGLE9BQVYsQ0FBa0IsbUJBQWxCO0FBSEo7QUFuQnVCLEdBQTVCLEVBd0JKO0FBQ0ZHLGFBQVMsRUFBRTtBQURULEdBeEJJLENBQVA7QUEyQkEsQ0E1QkQsQzs7Ozs7Ozs7Ozs7QUNGQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxrRDs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC9hcHAuanNcIik7XG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xuaW1wb3J0ICogYXMgZGIgZnJvbSAnLi4vZGF0YWJhc2UnO1xuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsKGRiLmdlbmVyYXRlVHlwZURlZnMoJ2FkZHJlc3MnLCdhZGRyZXNzZXMnKSk7XG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0gZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbCgnYWRkcmVzcycsJ2FkZHJlc3NlcycpO1xuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcblxuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsKGBcblx0XHRcdHR5cGUgUXVlcnlcblx0XHRcdHR5cGUgTXV0YXRpb25cblx0XHRcdHR5cGUgTGlzdE1ldGFkYXRhIHtcblx0XHRcdCAgICBjb3VudDogSW50IVxuXHRcdFx0fVxuXHRcdFx0c2NhbGFyIERhdGVcblx0XHRcdGApO1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge307XG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xuaW1wb3J0ICogYXMgZGIgZnJvbSAnLi4vZGF0YWJhc2UnO1xuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsKGRiLmdlbmVyYXRlVHlwZURlZnMoJ3BlcnNvbicsJ1Blb3BsZScpKTtcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSBkYi5nZW5lcmF0ZUdyYXBoUUxJbXBsKCdwZXJzb24nLCdQZW9wbGUnKTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoZGIuZ2VuZXJhdGVUeXBlRGVmcygnc2VhcmNoJywnc2VhcmNoZXMnKSk7XG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0gZGIuZ2VuZXJhdGVHcmFwaFFMSW1wbCgnc2VhcmNoJywnc2VhcmNoZXMnKTtcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi9kYXRhYmFzZSc7XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWwoZGIuZ2VuZXJhdGVUeXBlRGVmcygnc2VnbWVudCcsJ3NlZ21lbnRzJykpO1xuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IGRiLmdlbmVyYXRlR3JhcGhRTEltcGwoJ3NlZ21lbnQnLCdzZWdtZW50cycpO1xuIiwiaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IHsgQXBvbGxvU2VydmVyIH0gPSByZXF1aXJlKCdhcG9sbG8tc2VydmVyLWV4cHJlc3MnKTtcbmNvbnN0IGNvcnMgPSByZXF1aXJlKCdjb3JzJyk7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuYXBwLnVzZShjb3JzKCkpO1xuXG5jb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtcblx0bW9kdWxlczogW1xuXHRcdHJlcXVpcmUoJy4vR3JhcGhRTC9jb21tb24nKSxcblx0XHRyZXF1aXJlKCcuL0dyYXBoUUwvcGVyc29uJyksXG5cdFx0cmVxdWlyZSgnLi9HcmFwaFFML3NlZ21lbnQnKSxcblx0XHRyZXF1aXJlKCcuL0dyYXBoUUwvYWRkcmVzcycpLFxuXHRcdHJlcXVpcmUoJy4vR3JhcGhRTC9zZWFyY2gnKVxuXHRdLFxufSk7XG5cbnNlcnZlci5hcHBseU1pZGRsZXdhcmUoeyBhcHAgfSk7XG5cbmFwcC5nZXQoJy8nLCAocmVxLCByZXMpID0+IHJlcy5zZW5kKCdIZWxsbyBCbHVlU3RlZWwnKSk7XG5cbmFwcC5saXN0ZW4oeyBwb3J0OiA1MDAwIH0sICgpID0+XG5cdGNvbnNvbGUubG9nKGDwn5qAIFNlcnZlciByZWFkeSBhdCBodHRwOi8vbG9jYWxob3N0OjUwMDBgKVxuKTtcbiIsImNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG5cbnZhciBkYiA9IHt9O1xuXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKFxuXHRwcm9jZXNzLmVudi5EQVRBQkFTRV9OQU1FLFxuXHRwcm9jZXNzLmVudi5EQVRBQkFTRV9VU0VSLFxuXHRwcm9jZXNzLmVudi5EQVRBQkFTRV9QQVNTV09SRCxcblx0e1xuXHRcdGhvc3Q6IHByb2Nlc3MuZW52LkRBVEFCQVNFX0hPU1QsXG5cdFx0cG9ydDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfUE9SVCxcblx0XHRkaWFsZWN0OiAnbXlzcWwnLFxuXHRcdGRlZmluZToge1xuXHRcdFx0ZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuXHRcdH0sXG5cdFx0cG9vbDoge1xuXHRcdFx0bWF4OiA1LFxuXHRcdFx0bWluOiAwLFxuXHRcdFx0YWNxdWlyZTogMzAwMDAsXG5cdFx0XHRpZGxlOiAxMDAwMCxcblx0XHR9LFxuXHRcdC8vIDxodHRwOi8vZG9jcy5zZXF1ZWxpemVqcy5jb20vbWFudWFsL3R1dG9yaWFsL3F1ZXJ5aW5nLmh0bWwjb3BlcmF0b3JzPlxuXHRcdG9wZXJhdG9yc0FsaWFzZXM6IGZhbHNlLFxuXHQvL3RpbWVzdGFtcHM6IGZhbHNlIC8vSWYgY3JlYXRlZEF0LCBtb2RpZmllZEF0IGFyZSBhbGwgYXZhaWxhYmxlLCB3ZSBjYW4gdXNlIHRoaXNcblx0fSxcbik7XG5cbmxldCBtb2RlbHMgPSB7XG5cdHBlcnNvbjpyZXF1aXJlKCcuL21vZGVscy9wZXJzb24uanMnKSxcblx0c2VnbWVudDpyZXF1aXJlKCcuL21vZGVscy9zZWdtZW50LmpzJyksXG5cdGFkZHJlc3M6cmVxdWlyZSgnLi9tb2RlbHMvYWRkcmVzcy5qcycpLFxuXHRzZWFyY2g6cmVxdWlyZSgnLi9tb2RlbHMvc2VhcmNoLmpzJylcbn07XG5cbi8vIEluaXRpYWxpemUgbW9kZWxzXG5PYmplY3QudmFsdWVzKG1vZGVscykuZm9yRWFjaChtb2RlbCA9PiB7XG5cdGNvbnN0IHNlcU1vZGVsID0gbW9kZWwoc2VxdWVsaXplLCBTZXF1ZWxpemUpO1xuXHRkYltzZXFNb2RlbC5uYW1lXSA9IHNlcU1vZGVsO1xufSk7XG5cbi8vIEFwcGx5IGFzc29jaWF0aW9uc1xuT2JqZWN0LmtleXMoZGIpLmZvckVhY2goa2V5ID0+IHtcblx0aWYgKCdhc3NvY2lhdGUnIGluIGRiW2tleV0pIHtcblx0XHRkYltrZXldLmFzc29jaWF0ZShkYik7XG5cdH1cbn0pO1xuY29uc3QgdWMgPSAocykgPT4ge1xuXHRpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSByZXR1cm4gJyc7XG5cdHJldHVybiBzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcy5zbGljZSgxKTtcbn07XG5cbmRiLmdlbmVyYXRlVHlwZURlZnM9ZnVuY3Rpb24ob2JqZWN0LHBsdXJhbCl7XG5cdGxldCBtb2RlbD1zZXF1ZWxpemVbXCJtb2RlbE1hbmFnZXJcIl0uZ2V0TW9kZWwob2JqZWN0KTtcblx0aWYgKCFtb2RlbCkgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgbW9kZWwgXCIrb2JqZWN0K1wiLCBhcmUgeW91IHN1cmUgaXQgZXhpc3RzP1wiKTtcblxuXHRsZXQgZmllbGRzPU9iamVjdC5rZXlzKG1vZGVsLnRhYmxlQXR0cmlidXRlcylcblx0XHQuZmlsdGVyKGQ9PlsnaWQnLCdjcmVhdGVkQXQnLCd1cGRhdGVBdCddLmluZGV4T2YoZCk8MClcblx0XHQubWFwKG5hbWU9Pntcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LG1vZGVsLnRhYmxlQXR0cmlidXRlcyx7bmFtZX0pO1xuXHRcdH0pO1xuXG5cdGxldCBxPWBleHRlbmQgdHlwZSBRdWVyeSB7XG5cdFx0JHt1YyhvYmplY3QpfShpZDogSUQhKTogJHt1YyhvYmplY3QpfVxuXHRcdGFsbCR7dWMocGx1cmFsKX0ocGFnZTogSW50LCBwZXJQYWdlOiBJbnQsIHNvcnRGaWVsZDogU3RyaW5nLCBzb3J0T3JkZXI6IFN0cmluZywgZmlsdGVyOiAke3VjKG9iamVjdCl9RmlsdGVyKTogWyR7dWMob2JqZWN0KX1dXG5cdFx0X2FsbCR7dWMocGx1cmFsKX1NZXRhKHBhZ2U6IEludCwgcGVyUGFnZTogSW50LCBzb3J0RmllbGQ6IFN0cmluZywgc29ydE9yZGVyOiBTdHJpbmcsIGZpbHRlcjogJHt1YyhvYmplY3QpfUZpbHRlcik6IExpc3RNZXRhZGF0YVxuXHR9XG5cdGV4dGVuZCB0eXBlIE11dGF0aW9uIHtcblx0XHRjcmVhdGUke3VjKG9iamVjdCl9KFxuXHRcdFx0XHQke2ZpZWxkcy5tYXAoZD0+ZC5uYW1lK1wiOlN0cmluZ1wiKS5qb2luKFwiXFxuXFx0XFx0XCIpfVxuXHRcdCk6JHt1YyhvYmplY3QpfVxuXHRcdHVwZGF0ZSR7dWMob2JqZWN0KX0oaWQ6SUQhLCR7ZmllbGRzLm1hcChkPT5kLm5hbWUrXCI6U3RyaW5nXCIpLmpvaW4oXCIsXCIpfSk6JHt1YyhvYmplY3QpfVxuXHRcdGRlbGV0ZSR7dWMob2JqZWN0KX0oaWQ6SUQhKToke3VjKG9iamVjdCl9XG5cdH1cblx0dHlwZSAke3VjKG9iamVjdCl9IHtcblx0XHRcdGlkOiBJRCFcblx0XHRcdCR7ZmllbGRzLm1hcChkPT5kLm5hbWUrXCI6U3RyaW5nXCIpLmpvaW4oXCJcXG5cXHRcXHRcIil9XG5cdH1cblxuXHRpbnB1dCAke3VjKG9iamVjdCl9RmlsdGVyIHtcblx0XHRcdHE6IFN0cmluZ1xuXHRcdFx0aWQ6IElEXG5cdFx0XHRpZHM6IFtJRF1cblx0XHRcdCR7ZmllbGRzLm1hcChkPT5kLm5hbWUrXCI6U3RyaW5nXCIpLmpvaW4oXCJcXG5cXHRcXHRcIil9XG5cdH1gO1xuXHRyZXR1cm4gcTtcbn07XG5cbmRiLmdlbmVyYXRlR3JhcGhRTEltcGw9ZnVuY3Rpb24ob2JqZWN0LHBsdXJhbCl7XG5cdHJldHVybiB7XG5cdFx0UXVlcnk6IHtcblx0XHRcdFt1YyhvYmplY3QpXTogYXN5bmMgKG9iaiwgYXJncywgY29udGV4dCwgaW5mbykgPT4gZGJbb2JqZWN0XS5maW5kQnlQayhhcmdzLmlkKSxcblx0XHRcdFtcImFsbFwiK3VjKHBsdXJhbCldOiBhc3luYyAob2JqLHtwZXJQYWdlPTUwLHBhZ2U9MCxmaWx0ZXJ9KSA9Pntcblx0XHRcdFx0bGV0IHdoZXJlPXt9O1xuXHRcdFx0XHRpZiAoZmlsdGVyLmlkcyl7XG5cdFx0XHRcdFx0d2hlcmU9e2lkOmZpbHRlci5pZHN9O1xuXHRcdFx0XHR9ZWxzZXt3aGVyZT1maWx0ZXI7fTtcblx0XHRcdFx0cmV0dXJuIGRiW29iamVjdF0uZmluZEFsbCh7d2hlcmUsbGltaXQ6cGVyUGFnZSxvZmZzZXQ6cGFnZSpwZXJQYWdlfSk7XG5cdFx0XHR9LFxuXHRcdFx0W1wiX2FsbFwiK3VjKHBsdXJhbCkrXCJNZXRhXCJdOmFzeW5jKCk9Pntcblx0XHRcdFx0bGV0IGNvdW50PWF3YWl0IGRiW29iamVjdF0uY291bnQoKTtcblx0XHRcdFx0cmV0dXJuIHtjb3VudH07XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRNdXRhdGlvbjp7XG5cdFx0XHRbXCJjcmVhdGVcIit1YyhvYmplY3QpXTphc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYltvYmplY3RdLmNyZWF0ZSh7dmFsdWVzOmFyZ3N9KSxcblx0XHRcdFtcInVwZGF0ZVwiK3VjKG9iamVjdCldOmFzeW5jIChvYmosIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihhcmdzKTtcblx0XHRcdFx0bGV0IGNvdW50PWF3YWl0IGRiW29iamVjdF0udXBkYXRlKGFyZ3Mse3doZXJlOntpZDphcmdzLmlkfX0pO1xuXHRcdFx0XHRyZXR1cm4gZGJbb2JqZWN0XS5maW5kQnlQayhhcmdzLmlkKTtcblx0XHRcdH0sXG5cdFx0XHRbXCJyZW1vdmVcIit1YyhvYmplY3QpXTphc3luYyAob2JqLCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiBkYltvYmplY3RdLmRlc3Ryb3koe3doZXJlOntpZDphcmdzLmlkfX0pXG5cdFx0fVxuXHR9O1xufTtcblxuZGIuc2VxdWVsaXplID0gc2VxdWVsaXplO1xuZGIuU2VxdWVsaXplID0gU2VxdWVsaXplO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuIiwiLyoganNoaW50IGluZGVudDogMSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XG5cdHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKCdhZGRyZXNzJywge1xuXHRcdGlkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUigxMSksXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZVxuXHRcdH0sXG5cdFx0ZW1haWw6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0cGhvbmU6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjQpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRzdHJlZXRfMToge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRzdHJlZXRfMjoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRjaXR5OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdHJlZ2lvbjoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRwb3N0YWxfY29kZToge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygxNiksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGxhdGl0dWRlOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREVDSU1BTCxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0bG9uZ2l0dWRlOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREVDSU1BTCxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0Y3JlYXRlZEF0OiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuREFURSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IHNlcXVlbGl6ZS5saXRlcmFsKCdDVVJSRU5UX1RJTUVTVEFNUCcpXG5cdFx0fSxcblx0XHR1cGRhdGVkQXQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdGRlZmF1bHRWYWx1ZTogc2VxdWVsaXplLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJylcblx0XHR9LFxuXHRcdHBlcnNvbl9pZDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIoMTEpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fVxuXHR9LCB7XG5cdFx0dGFibGVOYW1lOiAnYWRkcmVzcydcblx0fSk7XG59O1xuIiwiLyoganNoaW50IGluZGVudDogMSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XG5cdHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKCdwZXJzb24nLCB7XG5cdFx0aWQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSKDExKSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRwcmltYXJ5S2V5OiB0cnVlXG5cdFx0fSxcblx0XHRnaXZlbl9uYW1lOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGZhbWlseV9uYW1lOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdGVtYWlsOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI1NSksXG5cdFx0XHRhbGxvd051bGw6IHRydWVcblx0XHR9LFxuXHRcdHBob25lOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuU1RSSU5HKDI0KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0ZHdpZDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLklOVEVHRVIoMTEpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRzb3VyY2VfY29kZToge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRjcmVhdGVkQXQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdGRlZmF1bHRWYWx1ZTogc2VxdWVsaXplLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJylcblx0XHR9LFxuXHRcdHVwZGF0ZWRBdDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBzZXF1ZWxpemUubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKVxuXHRcdH1cblx0fSwge1xuXHRcdHRhYmxlTmFtZTogJ3BlcnNvbidcblx0fSk7XG59O1xuIiwiLyoganNoaW50IGluZGVudDogMSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XG5cdHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKCdzZWFyY2gnLCB7XG5cdFx0aWQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSKDExKSxcblx0XHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0XHRwcmltYXJ5S2V5OiB0cnVlXG5cdFx0fSxcblx0XHRsYWJlbDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLlNUUklORygyNTUpLFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRjb25maWc6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5URVhULFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRjcmVhdGVkQXQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdGRlZmF1bHRWYWx1ZTogc2VxdWVsaXplLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJylcblx0XHR9LFxuXHRcdHVwZGF0ZWRBdDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBzZXF1ZWxpemUubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKVxuXHRcdH1cblx0fSwge1xuXHRcdHRhYmxlTmFtZTogJ3NlYXJjaCdcblx0fSk7XG59O1xuIiwiLyoganNoaW50IGluZGVudDogMSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlcXVlbGl6ZSwgRGF0YVR5cGVzKSB7XG5cdHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKCdzZWdtZW50Jywge1xuXHRcdGlkOiB7XG5cdFx0XHR0eXBlOiBEYXRhVHlwZXMuSU5URUdFUigxMSksXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0cHJpbWFyeUtleTogdHJ1ZVxuXHRcdH0sXG5cdFx0bGFiZWw6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5TVFJJTkcoMjU1KSxcblx0XHRcdGFsbG93TnVsbDogdHJ1ZVxuXHRcdH0sXG5cdFx0ZGVzY3JpcHRpb246IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5URVhULFxuXHRcdFx0YWxsb3dOdWxsOiB0cnVlXG5cdFx0fSxcblx0XHRjcmVhdGVkQXQ6IHtcblx0XHRcdHR5cGU6IERhdGFUeXBlcy5EQVRFLFxuXHRcdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRcdGRlZmF1bHRWYWx1ZTogc2VxdWVsaXplLmxpdGVyYWwoJ0NVUlJFTlRfVElNRVNUQU1QJylcblx0XHR9LFxuXHRcdHVwZGF0ZWRBdDoge1xuXHRcdFx0dHlwZTogRGF0YVR5cGVzLkRBVEUsXG5cdFx0XHRhbGxvd051bGw6IGZhbHNlLFxuXHRcdFx0ZGVmYXVsdFZhbHVlOiBzZXF1ZWxpemUubGl0ZXJhbCgnQ1VSUkVOVF9USU1FU1RBTVAnKVxuXHRcdH1cblx0fSwge1xuXHRcdHRhYmxlTmFtZTogJ3NlZ21lbnQnXG5cdH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==