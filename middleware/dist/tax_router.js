"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.percentageRoute = exports.regionYearRoute = exports.yearsRoute = exports.incomeRoute = exports.tableRoute = exports.tablesRoute = exports.descriptionsRoute = exports.regionsRoute = void 0;
var taxquery_1 = require("./taxquery");
function regionsRoute(req, res, next) {
    try {
        res.json((0, taxquery_1.getRegions)());
    }
    catch (e) {
        var err = e;
        console.error("Error while getting quotes ", err.message);
        next(err);
    }
}
exports.regionsRoute = regionsRoute;
function descriptionsRoute(req, res, next) {
    try {
        res.json((0, taxquery_1.getDescription)());
    }
    catch (e) {
        var err = e;
        console.error("Error while getting quotes ", err.message);
        next(err);
    }
}
exports.descriptionsRoute = descriptionsRoute;
function tablesRoute(req, res, next) {
    try {
        var region_id = req.params.regionID;
        res.json((0, taxquery_1.getRegionTables)(region_id));
    }
    catch (e) {
        var err = e;
        console.error("Error while getting quotes ", err.message);
        next(err);
    }
}
exports.tablesRoute = tablesRoute;
function tableRoute(req, res, next) {
    try {
        var region_id = req.params.regionID;
        var table_number = req.params.tableNum;
        res.json((0, taxquery_1.getRegionTable)(region_id, table_number));
    }
    catch (e) {
        var err = e;
        console.error("Error while getting quotes ", err.message);
        next(err);
    }
}
exports.tableRoute = tableRoute;
function incomeRoute(req, res, next) {
    try {
        var region_id = req.params.regionID;
        var table_number = req.params.tableNum;
        var value = req.params.value;
        res.json((0, taxquery_1.getIncome)(region_id, table_number, value));
    }
    catch (e) {
        var err = e;
        console.error("Error while getting quotes ", err.message);
        next(err);
    }
}
exports.incomeRoute = incomeRoute;
function yearsRoute(req, res, next) {
    try {
        res.json((0, taxquery_1.getYears)());
    }
    catch (e) {
        var err = e;
        console.error("Error while getting quotes ", err.message);
        next(err);
    }
}
exports.yearsRoute = yearsRoute;
function regionYearRoute(req, res, next) {
    try {
        var year = req.params.region_year;
        res.json((0, taxquery_1.getRegionByYear)(year));
    }
    catch (e) {
        var err = e;
        console.error("Error while getting quotes ", err.message);
        next(err);
    }
}
exports.regionYearRoute = regionYearRoute;
function percentageRoute(req, res, next) {
    try {
        var bid = req.params.bracketID;
        res.json((0, taxquery_1.getPercentage)(bid));
    }
    catch (e) {
        var err = e;
        console.error("Error while getting quotes ", err.message);
        next(err);
    }
}
exports.percentageRoute = percentageRoute;
