"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = require("bcrypt");
var lodash_1 = require("lodash");
var auth_1 = require("../auth");
var formatErrors = function (e, models) {
    if (e instanceof models.sequelize.ValidationError) {
        return e.errors.map(function (x) { return lodash_1.default.pick(x, ['path', 'message']); });
    }
    return [{ path: 'name', message: 'something went wrong' }];
};
exports.default = {
    Query: {
        getUser: function (parent, _a, _b) {
            var id = _a.id;
            var models = _b.models;
            return models.User.findOne({ where: { id: id } });
        },
        allUsers: function (parent, args, _a) {
            var models = _a.models;
            return models.User.findAll();
        }
    },
    Mutation: {
        register: function (parent, _a, _b) {
            var models = _b.models;
            return __awaiter(_this, void 0, void 0, function () {
                var password = _a.password, otherArgs = __rest(_a, ["password"]);
                var hashedPassword, user, err_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            if (password.length < 5) {
                                return [2 /*return*/, {
                                        ok: false,
                                        errors: [{ path: 'password', message: 'Password length must be greater than 5' }]
                                    }];
                            }
                            return [4 /*yield*/, bcrypt_1.default.hash(password, 12)];
                        case 1:
                            hashedPassword = _c.sent();
                            return [4 /*yield*/, models.User.create(__assign({}, otherArgs, { password: hashedPassword }))];
                        case 2:
                            user = _c.sent();
                            return [2 /*return*/, {
                                    ok: true,
                                    user: user
                                }];
                        case 3:
                            err_1 = _c.sent();
                            console.log(err_1);
                            return [2 /*return*/, {
                                    ok: false,
                                    errors: formatErrors(err_1, models)
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        login: function (parent, _a, _b) {
            var email = _a.email, password = _a.password;
            var models = _b.models, SECRET = _b.SECRET, SECRET2 = _b.SECRET2;
            return auth_1.tryLogin(email, password, models, SECRET, SECRET2);
        }
    }
};
//# sourceMappingURL=user.js.map