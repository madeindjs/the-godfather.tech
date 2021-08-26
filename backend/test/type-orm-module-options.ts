import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TYPE_ORM_MODULE_OPTIONS: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  autoLoadEntities: false,
  keepConnectionAlive: true,
  retryAttempts: 0,
};

export function getTypeOrmOptions(entities: any[]): TypeOrmModuleOptions {
  return {
    ...TYPE_ORM_MODULE_OPTIONS,
    entities,
  };
}
