interface AddID {
    type: "addID",
    payload:number
}

interface ChangeID {
    type: "changeID",
    payload:number
}

interface AddType {
    type: "addType",
    payload:number
}

interface ChangeType {
    type: "changeType",
    payload:number
}

export type Action = AddID | ChangeID | AddType | ChangeType