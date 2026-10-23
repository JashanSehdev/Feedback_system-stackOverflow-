import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Role } from "../enum/roles.enum.js";
import { Feedback } from "../../feedback/entities/feedback.entity.js";
import { Comment } from "../../comments/entities/comment.entity.js";
import { Vote, } from "../../vote/entities/votes.entity.js";

@Entity('users')

export class User {
    
    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'varchar', length : 120})
    username : string

    @Column({type : 'varchar' , unique: true})
    email : string

    @Column({type: 'varchar', length : 120, nullable : true})
    password : string

    @Column({type : 'enum', enum : Role, default : Role.CREATOR})
    role : Role

    @Column({type : 'varchar', unique:true, nullable: true})
    googleId : string

    @CreateDateColumn()
    createdAt : Date

    @OneToMany(()=>Feedback, (feedback) => feedback.user)
    createdFeedbacks : Relation<Feedback[]>

    @OneToMany(()=>Comment, (comment) => comment.user)
    comments : Relation<Comment[]>

    @OneToMany(() => Vote, (vote) => vote.user)
    votes : Relation<Vote[]>


}