import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Feedback } from "../../feedback/entities/feedback.entity.js";
import { Tag } from "../../tags/entities/tag.entity.js";

@Entity('feed_tag')
export class FeedTag {

    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'integer'})
    feedbackId : number

    @Column({type : 'integer'})
    tagId : number

    @ManyToOne(() => Feedback, (feedback)=> feedback.tags)
    feed: Relation<Feedback>

    @ManyToOne(() => Tag, (tag)=> tag.feedbacks)
    tag: Relation<Tag>
}
