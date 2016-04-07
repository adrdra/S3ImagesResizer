import { compose } from 'ramda';
import { has } from 'lodash';

// getDataBody :: ({}) -> {}
const getDataBody = (data) => {
  return data['Body'];
};

// convertBodyToObject :: () -> {}
const convertBodyToObject = (body) => {
  return JSON.parse(body);
};

// getRecordsFromBody :: ({}) -> [{}, ...]
const getRecordsFromBody = (body) => {
  if (has(body, "Records")) return body['Records'];
  return [];
};

// getFirstRecordFromRecords :: ([{}, ...]) -> {}
const getFirstRecordFromRecords = (records) => {
  if (records.length > 0) return records[0];
  return {};
};

// getS3FromRecord :: ({}) -> {}
const getS3FromRecord = (record) => {
  if (has(record, 's3')) return record.s3;
  return {};
};

// getObjectFromS3 :: ({}) -> {}
const getObjectFromS3 = (s3) => {
  if (has(s3, 'object')) return s3.object;
  return {};
};

// getObjectPropertyFromAWSEvent :: ({}) -> {}
const getObjectPropertyFromAWSEvent = compose(
  getObjectFromS3,
  getS3FromRecord,
  getFirstRecordFromRecords,
  getRecordsFromBody,
  convertBodyToObject,
  getDataBody
);

export default getObjectPropertyFromAWSEvent;
