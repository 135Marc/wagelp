"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
var better_sqlite3_1 = __importDefault(require("better-sqlite3"));
var db = new better_sqlite3_1.default("../database/tax_db");
function query(sql, params) {
    return db.prepare(sql).all(params);
}
exports.query = query;
