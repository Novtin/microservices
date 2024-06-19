import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexForLoginAndPhone1718779413837
  implements MigrationInterface
{
  name = 'AddIndexForLoginAndPhone1718779413837';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_6b1d2e4ac23f097aa6c7c322f2" ON "user_table" ("login", "phone") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6b1d2e4ac23f097aa6c7c322f2"`,
    );
  }
}
