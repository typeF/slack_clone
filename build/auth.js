"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var lodash_1 = require("lodash");
var bcrypt_1 = require("bcrypt");
exports.createTokens = function (user, secret, secret2) { return __awaiter(_this, void 0, void 0, function () {
    var createToken, createRefreshToken;
    return __generator(this, function (_a) {
        createToken = jsonwebtoken_1.default.sign({
            user: lodash_1.default.pick(user, ['id']),
        }, secret, {
            expiresIn: '1h',
        });
        createRefreshToken = jsonwebtoken_1.default.sign({
            user: lodash_1.default.pick(user, 'id'),
        }, secret2, {
            expiresIn: '7d',
        });
        return [2 /*return*/, [createToken, createRefreshToken]];
    });
}); };
exports.refreshTokens = function (token, refreshToken, models, SECRET) { return __awaiter(_this, void 0, void 0, function () {
    var userId, id, user, _a, newToken, newRefreshToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = -1;
                try {
                    id = jsonwebtoken_1.default.decode(refreshToken).user.id;
                    userId = id;
                }
                catch (err) {
                    return [2 /*return*/, {}];
                }
                if (!userId) {
                    return [2 /*return*/, {}];
                }
                return [4 /*yield*/, models.User.findOne({ where: { id: userId }, raw: true })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, {}];
                }
                try {
                    jsonwebtoken_1.default.verify(refreshToken, user.refreshSecret);
                }
                catch (err) {
                    return [2 /*return*/, {}];
                }
                return [4 /*yield*/, exports.createTokens(user, SECRET, user.refreshSecret)];
            case 2:
                _a = _b.sent(), newToken = _a[0], newRefreshToken = _a[1];
                return [2 /*return*/, {
                        token: newToken,
                        refreshToken: newRefreshToken,
                        user: user,
                    }];
        }
    });
}); };
exports.tryLogin = function (email, password, models, SECRET, SECRET2) { return __awaiter(_this, void 0, void 0, function () {
    var user, valid, refreshTokenSecret, _a, token, refreshToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, models.User.findOne({ where: { email: email }, raw: true })];
            case 1:
                user = _b.sent();
                if (!user) {
                    // user with provided email not found
                    return [2 /*return*/, {
                            ok: false,
                            errors: [{ path: 'email', message: 'Invalid login' }],
                        }];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                valid = _b.sent();
                if (!valid) {
                    // bad password
                    return [2 /*return*/, {
                            ok: false,
                            errors: [{ path: 'password', message: 'Invalid login' }],
                        }];
                }
                refreshTokenSecret = user.password + SECRET2;
                return [4 /*yield*/, exports.createTokens(user, SECRET, refreshTokenSecret)];
            case 3:
                _a = _b.sent(), token = _a[0], refreshToken = _a[1];
                return [2 /*return*/, {
                        ok: true,
                        token: token,
                        refreshToken: refreshToken,
                    }];
        }
    });
}); };
//# sourceMappingURL=auth.js.map