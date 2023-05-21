import DatabaseConstructor, {Database} from "better-sqlite3";

const db = new DatabaseConstructor("tax_db");

export function query(sql:any,params:any) {
    return db.prepare(sql).all(params);
}
