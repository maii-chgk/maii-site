module.exports = ({ env }) => ({
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('UPLOAD_AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('UPLOAD_AWS_ACCESS_SECRET'),
      region: env('UPLOAD_AWS_REGION'),
      params: {
        Bucket: env('UPLOAD_AWS_BUCKET'),
      },
    },
  },
});