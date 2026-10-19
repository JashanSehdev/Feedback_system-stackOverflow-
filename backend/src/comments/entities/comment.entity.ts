import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { User } from "../../users/entities/users.entity.js";
import { Feedback } from "../../feedback/entities/feedback.entity.js";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'integer'})
    userId : number

    @Column({type : 'text'})
    text : string

    @Column({type : 'integer', nullable : true})
    parentId : number

    @Column({type : 'integer'})
    feedbackId : number

    @Column({type : 'timestamp', default : 'CURRENT_TIMESTAMP'})
    createdAt  : Date

    @OneToMany(() =>Comment, (comment) => comment.parentComment)
    childComments : Relation<Comment[]>
   

    @ManyToOne(() => Comment, (comment) => comment.childComments)
    @JoinColumn({name : 'parentId'})
    parentComment : Relation<Comment>

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({name : 'userId'})
    user : Relation<User>

    @ManyToOne(() => Feedback, (feedback) => feedback.comments)
    @JoinColumn({name : 'feedbackId'})
    feedback : Relation<Feedback>

}
