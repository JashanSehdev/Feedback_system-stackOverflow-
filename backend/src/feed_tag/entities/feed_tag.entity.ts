import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
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
    @JoinColumn({ name: 'feedbackId' })
    feed: Relation<Feedback>

    @ManyToOne(() => Tag, (tag)=> tag.feedbacks)
    @JoinColumn({ name: 'tagId' })
    tag: Relation<Tag>
}
