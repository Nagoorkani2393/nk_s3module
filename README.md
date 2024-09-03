## Installation

```bash
$ npm i nk-s3module

$ pnpm i nk-s3module
```

## S3 upload module

```bash
UploadS3Module.register({
      bucket: 'xxxxxxx',
      accessKeyId: 'xxxxxxx',
      endpoint: 'xxxxxxx',
      secretAccessKey: 'xxxxxxx',
      global: true,
    }),

(or)

UploadS3Module.registerAsync({
  imports:[ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService) => {
      bucket: configService.getOrThrow('xxxxxxx')',
      accessKeyId: configService.getOrThrow('xxxxxxx')',
      endpoint: configService.getOrThrow('xxxxxxx')',
      secretAccessKey: configService.getOrThrow('xxxxxxx')',
    },
)



// function to perform upload process
async uploadFilesToS3(files: MulterFile[]){
  //logic
}

// function to perform signed the s3 url
async signedUrl(url: GetSignedUrl){
    getSignedS3Url(url); // utilize the function inside s3 service to sign the s3 url
}
```
