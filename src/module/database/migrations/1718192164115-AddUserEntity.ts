import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserEntity1718192164115 implements MigrationInterface {
  name = 'AddUserEntity1718192164115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_table" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(20) NOT NULL, "phone" character varying(20) NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "passwordHash" character varying NOT NULL, "passwordSalt" character varying NOT NULL, CONSTRAINT "PK_cf400c2dc2520573deb3a8d4569" PRIMARY KEY ("user_id")); COMMENT ON COLUMN "user_table"."user_id" IS 'Идентификатор пользователя'; COMMENT ON COLUMN "user_table"."login" IS 'Логин пользователя'; COMMENT ON COLUMN "user_table"."phone" IS 'Номер телефона пользователя'; COMMENT ON COLUMN "user_table"."firstName" IS 'Имя пользователя'; COMMENT ON COLUMN "user_table"."lastName" IS 'Фамилия пользователя'; COMMENT ON COLUMN "user_table"."passwordHash" IS 'Хеш пароля'; COMMENT ON COLUMN "user_table"."passwordSalt" IS 'Соль пароля'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_table"`);
  }
}
