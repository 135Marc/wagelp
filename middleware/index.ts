import { regionsRoute,descriptionsRoute,tablesRoute,tableRoute, incomeRoute,yearsRoute,regionYearRoute,percentageRoute } from "./tax_router";
import express  from "express";
import cors from 'cors';
import compression from "compression";

const app = express();
const port = 8080;
const comp = compression();

const options: cors.CorsOptions = {
    origin: '*'
  };

app.use(cors(options))
app.use(comp);

app.use('/years',yearsRoute)
app.use('/regions',regionsRoute)
app.use('/regimes',descriptionsRoute)

app.use('/regionyear/:region_year',regionYearRoute)
app.use('/tables/:regionID',tablesRoute)
app.use('/table/:regionID/:tableNum',tableRoute)
app.use('/percentages/:bracketID',percentageRoute)
app.use('/income/:value/:regionID/:tableNum/:dependents',incomeRoute)




app.listen(port,() => {
    console.log(`LOCALHOST LISTENING ON PORT ${port}`);
})