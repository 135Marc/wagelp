"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tax_router_1 = require("./tax_router");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = 8080;
var options = {
    origin: '*'
};
app.use((0, cors_1.default)(options));
app.use('/years', tax_router_1.yearsRoute);
app.use('/regions', tax_router_1.regionsRoute);
app.use('/regimes', tax_router_1.descriptionsRoute);
app.use('/regionyear/:region_year', tax_router_1.regionYearRoute);
app.use('/tables/:regionID', tax_router_1.tablesRoute);
app.use('/table/:regionID/:tableNum', tax_router_1.tableRoute);
app.use('/percentages/:bracketID', tax_router_1.percentageRoute);
app.use('/income/:value/:regionID/:tableNum/:dependents', tax_router_1.incomeRoute);
app.listen(port, function () {
    console.log("LOCALHOST LISTENING ON PORT ".concat(port));
});
