import { ModuleMetadata } from "@nestjs/common";

export interface S3Config {
  bucket: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  global?: boolean;
}

export interface S3Options {
  key: string;
  body: Buffer;
  contentType: string;
}

export interface S3AsyncConfig extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useFactory: (...args: any[]) => Promise<S3Options> | S3Options;
  inject?: any[];
}

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface GetSignedUrl {
  url: string;
  expiresIn?: number;
}
