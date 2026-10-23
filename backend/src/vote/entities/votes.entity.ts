import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { VoteEnum } from "../enum/vote.enum.js";
import { User } from "../../users/entities/users.entity.js";
import { Feedback } from "../../feedback/entities/feedback.entity.js";


@Entity('votes')

export class Vote {

    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'integer'})
    userId  : number

    @Column({type : 'integer'})
    feedbackId : number

    @Column({type : 'enum', enum: VoteEnum, enumName : 'feedback_vote'})
    vote_type : VoteEnum

    @ManyToOne(() => User, (user) => user.votes)
    @JoinColumn({name : 'userId'})
    user : Relation<User>

    @ManyToOne(() => Feedback, (feedback) => feedback.votes)
    @JoinColumn({name : 'feedbackId'})
    feedback : Relation<Feedback>

}
