import { DynamicModule, Module } from "@nestjs/common";
import { S3AsyncConfig, S3Config } from "./s3.interface";
import { S3Service } from "./s3module.service";

@Module({})
export class S3Module {
  static register(options: S3Config): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: "s3_config",
          useValue: options,
        },
        S3Service,
      ],
      exports: [S3Service],
      global: options.global ?? true,
    };
  }

  static registerAsync(options: S3AsyncConfig): DynamicModule {
    const AsyncProvider = {
      provide: "s3_config",
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      module: S3Module,
      imports: options.imports,
      providers: [AsyncProvider],
      exports: [S3Service],
    };
  }
}
