import multer from "multer";
import multerS3 from "multer-s3";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getRandomFileName } from "../utils/helpers";
import { Request } from "express";
import { config } from "dotenv";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";

config();

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  filename: string;
}

const bucket_name = process.env.BUCKET_NAME;
const bucket_region = process.env.BUCKET_REGION;
const bucket_access_key = process.env.AWS_BUCKET_ACCESS_KEY_ID;
const bucket_secret_key = process.env.AWS_BUCKET_SECRET_ACCESS_KEY;
const cloudfront_distribution_id = process.env.CLOUDFRONT_DISTRIBUTION_ID;
const cloudfare_url = process.env.CLOUDFRONT_URL;

const s3Client = new S3Client({
  region: bucket_region!,
  credentials: {
    accessKeyId: bucket_access_key!,
    secretAccessKey: bucket_secret_key!,
  },
});

const cloudFront = new CloudFrontClient({
  region: bucket_region!,
  credentials: {
    accessKeyId: bucket_access_key!,
    secretAccessKey: bucket_secret_key!,
  },
});

export const uploadMulter = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: bucket_name!,
    metadata: function (req: Request, file: any, cb: any) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req: Request, file: any, cb: any) {
      const filename = getRandomFileName();
      cb(null, `uploads/inventory/${filename}-`);
    },
  }),
});

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const uploadFile = async (file: MulterFile) => {
  const filename = `uploads/inventory/${getRandomFileName()}-${
    file.originalname
  }`;

  const command = new PutObjectCommand({
    Bucket: bucket_name,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  const response = await s3Client.send(command);

  return { response, filename };
};

export const removeFile = async (filename: string) => {
  const command = new DeleteObjectCommand({
    Bucket: bucket_name,
    Key: filename,
  });

  await s3Client.send(command);

  // Invalidate the cloudfront cache for the deleted image
  const invalidationCommand = new CreateInvalidationCommand({
    DistributionId: cloudfront_distribution_id,
    InvalidationBatch: {
      CallerReference: filename,
      Paths: {
        Quantity: 1,
        Items: [`/${filename}`],
      },
    },
  });

  await cloudFront.send(invalidationCommand);
};
