import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { FeedTag } from "../../feed_tag/entities/feed_tag.entity.js";

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'varchar'})
    name : string

    @OneToMany(() => FeedTag, (feed_tag) => feed_tag.tag)
    feedbacks : Relation<FeedTag[]>

}
