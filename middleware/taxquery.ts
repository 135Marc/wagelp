import { query } from "./taxdb";

export function getRegions() {
    const data = query(`SELECT * FROM REGION `, []);
    return {data};
}

export function getDescription() {
    const data = query(`SELECT * FROM [TableDescriptions]`,[]);
    return {data};
}

export function getRegionTables(rid:number) {
    const data = query(`SELECT * FROM RetentionTable WHERE ID = ?`,[rid]); 
    return {data};
}

export function getRegionTable(rid:number,tid:number) {
    const data = query(`SELECT * FROM RetentionTable WHERE ID = ? AND TableNum = ?`,[rid,tid]); 
    return {data};
}

export function getIncome(rid:number,tid:number,value:number) {
    const data = query(`SELECT * FROM RetentionTable WHERE ID = ? AND TableNum = ? AND ? > Minimum AND ? < Maximum `,[rid,tid,value,value]); 
    return {data};
}

export function getPercentage(bid:number) {
    const data = query(`SELECT ID,Bracket_ID,Dependents,Value FROM Percentage WHERE Bracket_ID = ?`,[bid]); 
    return {data};
}

export function getYears() {
    const data = query(`SELECT DISTINCT Year,"From","To",ID,Region From RetentionTable`,[]); 
    return {data};
}

export function getRegionByYear(year:number) {
    const data = query(`SELECT DISTINCT Region From RetentionTable WHERE Year = ? `,[year]); 
    return {data};
}