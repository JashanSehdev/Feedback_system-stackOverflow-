export type Comment = {
    id : number,
    userId : number,
    text : string,
    parentId : number | null,
    feedbackId : number,
    createdAt : string,
    user : User
}

type User = {
    id : number,
    username: string
}
