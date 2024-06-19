import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexForFieldLogin1718776163127 implements MigrationInterface {
  name = 'AddIndexForFieldLogin1718776163127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_fa5ee966b605d2a1e8064df19e" ON "user_table" ("login") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fa5ee966b605d2a1e8064df19e"`,
    );
  }
}
