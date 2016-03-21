
const getAWSCredentials = () => ({
   s3Bucket       : process.env.S3_BUCKET,
   region         : process.env.S3_BUCKET_REGION,
   accessKeyId    : process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
 })

export default getAWSCredentials
