import z, { number } from "zod";


export enum FeedStatus {
    PUBLIC = 'public',
    PRIVATE = 'private'
}

export type tag = {
    id : number,
    name : string
}

const tagSchema = z.object({
    id : z.number(),
    name : z.string()
})

export const feedbackSchema = z.object({
    title : z.string().min(1, 'Title Required').max(100, 'title should be less than 100 words'),
    description : z.string().min(30, 'Description must be atleast 30 words').max(500, 'title should be less than 500 words'),
    status : z.enum(FeedStatus),
    tags : z.array(tagSchema)
})

export type FeedbackInputs = z.infer<typeof feedbackSchema>