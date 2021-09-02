import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TYPE_ORM_MODULE_OPTIONS: TypeOrmModuleOptions = {
  type: 'postgres',
  // database: ':memory:',
  synchronize: true,
  autoLoadEntities: false,
  // keepConnectionAlive: true,
  retryAttempts: 0,
};

export function getTypeOrmOptionsFactory(
  entities: any[],
): (...args: any[]) => TypeOrmModuleOptions {
  return (configService: ConfigService) => {
    return {
      entities,
      type: 'postgres',
      host: configService.get('DATABASE_HOST'),
      database: configService.get('DATABASE_DB'),
      username: configService.get('DATABASE_USER'),
      password: configService.get('DATABASE_PASSWORD'),
    };
  };
}

export function getTypeOrmOptions(entities: any[]): TypeOrmModuleOptions {
  return {
    ...TYPE_ORM_MODULE_OPTIONS,
    entities,
  };
}

export function getTypeOrmModule(entities: any[]) {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getTypeOrmOptionsFactory(entities),
  });
}
