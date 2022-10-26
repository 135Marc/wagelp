"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegionByYear = exports.getYears = exports.getPercentage = exports.getIncome = exports.getRegionTable = exports.getRegionTables = exports.getDescription = exports.getRegions = void 0;
var taxdb_1 = require("./taxdb");
function getRegions() {
    var data = (0, taxdb_1.query)("SELECT * FROM REGION ", []);
    return { data: data };
}
exports.getRegions = getRegions;
function getDescription() {
    var data = (0, taxdb_1.query)("SELECT * FROM [TableDescriptions]", []);
    return { data: data };
}
exports.getDescription = getDescription;
function getRegionTables(rid) {
    var data = (0, taxdb_1.query)("SELECT * FROM RetentionTable WHERE ID = ?", [rid]);
    return { data: data };
}
exports.getRegionTables = getRegionTables;
function getRegionTable(rid, tid) {
    var data = (0, taxdb_1.query)("SELECT * FROM RetentionTable WHERE ID = ? AND TableNum = ?", [rid, tid]);
    return { data: data };
}
exports.getRegionTable = getRegionTable;
function getIncome(rid, tid, value) {
    var data = (0, taxdb_1.query)("SELECT * FROM RetentionTable WHERE ID = ? AND TableNum = ? AND ? > Minimum AND ? < Maximum ", [rid, tid, value, value]);
    return { data: data };
}
exports.getIncome = getIncome;
function getPercentage(bid) {
    var data = (0, taxdb_1.query)("SELECT ID,Bracket_ID,Dependents,Value FROM Percentage WHERE Bracket_ID = ?", [bid]);
    return { data: data };
}
exports.getPercentage = getPercentage;
function getYears() {
    var data = (0, taxdb_1.query)("SELECT DISTINCT Year,\"From\",\"To\",ID,Region From RetentionTable", []);
    return { data: data };
}
exports.getYears = getYears;
function getRegionByYear(year) {
    var data = (0, taxdb_1.query)("SELECT DISTINCT Region From RetentionTable WHERE Year = ? ", [year]);
    return { data: data };
}
exports.getRegionByYear = getRegionByYear;
