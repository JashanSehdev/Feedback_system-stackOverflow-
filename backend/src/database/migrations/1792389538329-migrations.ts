import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Migrations1792389538329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feedbacks',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          {
            name: 'userId',
            type: 'integer',
          },

          {
            name: 'title',
            type: 'text',
          },

          {
            name: 'description',
            type: 'text',
          },

          {
            name: 'status',
            type: 'enum',
            enum: ['public', 'private'],
            enumName: 'feedback_status',
          },

          {
            name: 'isDeleted',
            type: 'boolean',
          },

          {
            name: 'score',
            type: 'integer',
          },

          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],

        foreignKeys: [
          new TableForeignKey({
            name: 'fk_feedback_user',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          }),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'feed_tag',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          {
            name: 'feedbackId',
            type: 'integer',
            isNullable: false,
          },

          {
            name: 'tagId',
            type: 'integer',
            isNullable: false,
          },
        ],

        foreignKeys: [
          new TableForeignKey({
            name: 'fk_feed_ft',
            columnNames: ['feedbackId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'feedbacks',
          }),

          new TableForeignKey({
            name: 'fk_tag_ft',
            columnNames: ['tagId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
          }),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'comments',

        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          {
            name : 'userId',
            type : 'integer',
          },

          {
            name : 'text',
            type : 'text'
          },

          {
            name : 'parentId',
            type : 'integer',
            isNullable : true
          },

          {
            name : 'feedbackId',
            type : 'integer'
          },

          {
            name : 'createdAt',
            type : 'timestamp',
            default : 'CURRENT_TIMESTAMP'
          }
        ],

        foreignKeys : [
            new TableForeignKey ({
                name : 'fk_comment_self',
                columnNames : ['parentId'],
                referencedColumnNames : ['id'],
                referencedTableName: 'comments'
            }),

            new TableForeignKey ({
                name : 'fk_comment_user',
                columnNames : ['userId'],
                referencedColumnNames : ['id'],
                referencedTableName: 'users'
            }),

            new TableForeignKey ({
                name : 'fk_comment_feedback',
                columnNames : ['feedbackId'],
                referencedColumnNames : ['id'],
                referencedTableName: 'feedbacks'
            })
        ]
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('comments', 'fk_comment_feedback' )
    await queryRunner.dropForeignKey('comments', 'fk_comment_user' )
    await queryRunner.dropForeignKey('comments', 'fk_comment_self' )
    await queryRunner.dropForeignKey('feed_tag', 'fk_feed_ft')
    await queryRunner.dropForeignKey('feed_tag', 'fk_tag_ft')
    await queryRunner.dropForeignKey('feedbacks', 'fk_feedback_user')

    await queryRunner.dropTable('comments')
    await queryRunner.dropTable('feed_tag')
    await queryRunner.dropTable('feedbacks')
    await queryRunner.dropTable('tags')
  }
}
