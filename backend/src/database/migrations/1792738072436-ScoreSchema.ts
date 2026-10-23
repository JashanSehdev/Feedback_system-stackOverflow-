import { ForeignKey, MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class ScoreSchema1792738072436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'votes',
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
            isNullable: false,
          },
          {
            name: 'feedbackId',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'vote_type',
            type: 'enum',
            enum: ['upVote', 'downVote'],
            isNullable: false,
          },
        ],
        foreignKeys : [
            new TableForeignKey({
                name : 'fk_feedback_votes',
                columnNames : ['feedbackId'],
                referencedColumnNames : ['id'],
                referencedTableName : 'feedbacks'
            }),
            new TableForeignKey({
                name : 'fk_user_votes',
                columnNames : ['userId'],
                referencedColumnNames : ['id'],
                referencedTableName : 'users'
            }),
        ]
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('votes', 'fk_feedback_votes')
    await queryRunner.dropForeignKey('votes', 'fk_user_votes')
  }
}
