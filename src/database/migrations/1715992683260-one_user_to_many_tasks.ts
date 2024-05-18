import { MigrationInterface, QueryRunner } from 'typeorm';

export class OneUserToManyTasks1715992683260 implements MigrationInterface {
  name = 'OneUserToManyTasks1715992683260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tasks\` ADD \`user_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_db55af84c226af9dce09487b61b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_db55af84c226af9dce09487b61b\``,
    );
    await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`user_id\``);
  }
}
