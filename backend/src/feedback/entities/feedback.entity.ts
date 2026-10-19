import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,type Relation } from "typeorm";
import { FeedStatus } from "../enum/feedback.enum.js";
import { User } from "../../users/entities/users.entity.js";
import { FeedTag } from "../../feed_tag/entities/feed_tag.entity.js";
import { Comment } from "../../comments/entities/comment.entity.js";

@Entity('feedbacks')
export class Feedback {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : 'integer'})
    userId : number

    @Column({type :'text'})
    title : string

    @Column({type :'text'})
    description : string

    @Column({type : 'enum' , enum : FeedStatus, enumName:'feedback_status'})
    status : FeedStatus
    
    @Column({type : 'boolean', default : false})
    isDeleted : boolean

    @Column({type : 'integer', default : 0})
    score : number

    @Column({type : 'timestamp', default: 'CURRENT_TIMESTAMP'})
    createdAt: Date
    
    //relationship with user
    @ManyToOne(() => User, (user) => user.createdFeedbacks)
    @JoinColumn({name : 'userId'})
    user : Relation<User>

    //relationship with tags
    @OneToMany(() =>FeedTag, (feed_tag) => feed_tag.feed )
    tags : Relation <FeedTag[]>

    @OneToMany(() => Comment, (comment) => comment.feedback)
    comments : Relation<Comment>

}
