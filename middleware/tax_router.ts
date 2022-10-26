import { getDescription, getRegions,getRegionTables,getRegionTable,getIncome,getYears,getRegionByYear, getPercentage } from "./taxquery";

export function regionsRoute(req:any, res:any, next:any) {
  try {
        res.json(getRegions());
      } catch(e) {
        let err = (e as Error);
        console.error(`Error while getting quotes `, err.message);
        next(err);
      }
}

export function descriptionsRoute(req:any,res:any,next:any) {
  try {
    res.json(getDescription());
  } catch(e) {
    let err = (e as Error);
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
}

export function tablesRoute(req:any,res:any,next:any) {
  try {
    let region_id : number = req.params.regionID;
    res.json(getRegionTables(region_id));
  } catch(e) {
    let err = (e as Error);
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
}

export function tableRoute(req:any,res:any,next:any) {
  try {
    let region_id : number = req.params.regionID;
    let table_number : number = req.params.tableNum;
    res.json(getRegionTable(region_id,table_number));
  } catch(e) {
    let err = (e as Error);
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
}

export function incomeRoute(req:any,res:any,next:any) {
  try {
    let region_id : number = req.params.regionID;
    let table_number : number = req.params.tableNum;
    let value : number = req.params.value;
    console.log(req.params);
    res.json(getIncome(region_id,table_number,value));
  } catch(e) {
    let err = (e as Error);
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
}

export function yearsRoute(req:any,res:any,next:any) {
  try {
    res.json(getYears());
  } catch(e) {
    let err = (e as Error);
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
}

export function regionYearRoute(req:any,res:any,next:any) {
  try {
    let year:number = req.params.region_year;
    res.json(getRegionByYear(year));
  } catch(e) {
    let err = (e as Error);
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
}

export function percentageRoute(req:any,res:any,next:any) {
  try {
    let bid:number = req.params.bracketID;
    res.json(getPercentage(bid));
  } catch(e) {
    let err = (e as Error);
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
}