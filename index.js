import Consumer from 'sqs-consumer';
import AWS from 'aws-sdk';
import getAWSCredentials from './lib/config/awsConfig';
import eventParse from './lib/eventParse';

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

AWS.config.update(getAWSCredentials())

const app = Consumer.create({
  queueUrl: process.env.SQS_URL,
  handleMessage: (function (message, done) {
    // do some work with `message`

    console.log(eventParse.parse(message))

    done();
  }),
  sqs: new AWS.SQS()
});

app.on('error', function (err) {
  console.log(err.message);
});

app.start();
