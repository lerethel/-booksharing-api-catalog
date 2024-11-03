import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { BadRequestException } from '@nestjs/common';

export default defineConfig({
  dbName: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  entities: ['./dist/**/entities/*.entity.js'],
  entitiesTs: ['./src/**/entities/*.entity.ts'],
  debug: true,
  findOneOrFailHandler(entityName) {
    throw new BadRequestException(`${entityName} does not exist`);
  },
});
