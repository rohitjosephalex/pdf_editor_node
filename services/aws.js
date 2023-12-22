const AWS = require('aws-sdk');
const fs = require('fs');

// Set up AWS credentials
AWS.config.update({
  accessKeyId: 'AKIAUTSMW6C6OJIDURRF',
  secretAccessKey: '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',
  region: 'ap-south-1',
});

// Create an S3 instance
const s3 = new AWS.S3();

// Specify bucket and file information
const bucketName = 'rja.pdf.saver';
const key = 'myfile.pdf';
const filePath = '../services/DOP_BulkCustomerIntegration_v8_1.pdf';
const downloadPath='../download.pdf'

const fileStream = fs.createWriteStream(downloadPath);

// Upload a PDF file to S3
const uploadParams = {
  Bucket: bucketName,
  Key: key,
  Body: fs.createReadStream(filePath),
  ContentType: 'application/pdf', // Specify the content type
};
const downloadParams = {
  Bucket: bucketName,
  Key: key,
};

const upload=async()=>{
s3.upload(uploadParams, (err, data) => {
  if (err) {
    console.error('Error uploading PDF file:', err);
  } else {
    console.log('PDF file uploaded successfully:', data.Location);
  }
});
}
// upload()

const download=async()=>{
  const download = s3.getObject(downloadParams).createReadStream().pipe(fileStream);

download.on('error', (err) => {
  console.error('Error downloading file from S3:', err);
});

download.on('close', () => {
  console.log('File downloaded successfully.');
});
}
download();