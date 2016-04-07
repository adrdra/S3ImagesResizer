import { keys, has } from 'lodash';
import { compose } from 'ramda';
import getObjectPropertyFromAWSEvent from './utils/getObjectPropertyFromAWSEvent';

const regex = new RegExp(/uploads\/(.*)\.(.*)/,'g');

// getAWSObject :: ({}) -> {}
const getAWSObject = (eventData) => getObjectPropertyFromAWSEvent(eventData);

// getObjectKey :: ({}) -> String
const getObjectKey = (object) => {
  if (has(object, "key") && object.key.match(regex)) return object.key;
  return null;
}

// createObjectPublicUrl :: (String) -> String
const createObjectPublicUrl = (key) => {
  if (key) return `http://s3-${process.env.S3_BUCKET_REGION}.amazonaws.com/${process.env.S3_BUCKET}/${key}`;
  return null;
};

// parse :: ({}) -> String
const parse = compose(createObjectPublicUrl, getObjectKey, getAWSObject);

export default {
  parse: parse
}
