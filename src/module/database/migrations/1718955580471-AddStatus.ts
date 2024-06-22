import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatus1718955580471 implements MigrationInterface {
  name = 'AddStatus1718955580471';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_table_type_enum" AS ENUM('WITHDRAWL', 'DEPOSIT', 'TRANSFER')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_table_status_enum" AS ENUM('IN_PROGRESS', 'COMPLETED', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_table" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "transaction_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "amount" character varying NOT NULL, "type" "public"."transaction_table_type_enum" NOT NULL, "status" "public"."transaction_table_status_enum" NOT NULL DEFAULT 'IN_PROGRESS', CONSTRAINT "PK_b747a5462a0239fb23ff368e6ba" PRIMARY KEY ("transaction_id")); COMMENT ON COLUMN "transaction_table"."transaction_id" IS 'Идентификатор транзакции'; COMMENT ON COLUMN "transaction_table"."user_id" IS 'Идентификатор пользователя, совершающего транзакцию'; COMMENT ON COLUMN "transaction_table"."amount" IS 'Сумма транзакции в копейках'; COMMENT ON COLUMN "transaction_table"."type" IS 'Тип транзакции'; COMMENT ON COLUMN "transaction_table"."status" IS 'Статус транзакции'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transaction_table"`);
    await queryRunner.query(
      `DROP TYPE "public"."transaction_table_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."transaction_table_type_enum"`);
  }
}
