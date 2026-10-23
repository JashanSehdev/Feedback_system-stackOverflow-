import { Tag } from "./tag.type"

export type Feedback = {
    id : number,
    title : string,
    score : number,
    description : string,
    tags : Tags[]
    user : User
    createdAt : string
}

type User = {
    id : number,
    username : string
}

type Tags = {
    id : number,
    tag : Tag
}

export enum VoteEnum {
    up = 'upVote',
    down = 'downVote'
}