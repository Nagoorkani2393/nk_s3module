import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { GetSignedUrl, S3Config } from "./s3.interface";

import * as URL from "url";

@Injectable()
export class S3Service {
  private logger = new Logger("S3Service");
  constructor(@Inject("s3_config") private readonly options: S3Config) {}
  private _create(): S3Client {
    return new S3Client({
      endpoint: this.options.endpoint,
      region: this.options.region,
      credentials: {
        accessKeyId: this.options.accessKeyId,
        secretAccessKey: this.options.secretAccessKey,
      },
    });
  }

  private async _uploadFileToS3(file: any): Promise<PutObjectCommandOutput> {
    try {
      const params: PutObjectCommand = new PutObjectCommand({
        Bucket: this.options.bucket,
        Key: file.fieldname,
        Body: file.buffer,
        ContentType: "multipart/form-data",
      });

      return await this._create().send(params);
    } catch (error) {
      this.logger.error("s3 upload error", error);
      throw error;
    }
  }

  public async multerUploadFilesToS3(
    files: any[]
  ): Promise<PutObjectCommandOutput[]> {
    const _uploadList: PutObjectCommandOutput[] = [];

    for (const file of files) {
      try {
        const uploadedData = await this._uploadFileToS3(file);
        _uploadList.push(uploadedData);
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }

    this.logger.log("uploaded files", _uploadList);
    return _uploadList;
  }

  public async getSignedS3Url(signedUrl: GetSignedUrl): Promise<string> {
    const bucket = this.options.bucket;
    const parsedUrl = new URL.URL(`https://${signedUrl.url}`);
    const fullKey = parsedUrl.pathname.startsWith("/")
      ? parsedUrl.pathname.slice(1)
      : parsedUrl.pathname;
    const filePathKey = fullKey.split("/").slice(1).join("/");

    return new Promise(async (resolve, reject) => {
      const s3client: S3Client = this._create();
      const command: GetObjectCommand = new GetObjectCommand({
        Bucket: bucket,
        Key: filePathKey,
      });
      await getSignedUrl(s3client, command, { expiresIn: signedUrl.expiresIn })
        .then((url) => resolve(url))
        .catch((error) => reject(error));
    });
  }
}
