import { createHash } from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();

// grab the key and key length from envvars 
const { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = process.env;

const hash = (key) => createHash('sha3-512').update(key).digest('hex');

export function deterministicPartitionKey(event) {
  // Initialize the candidate with the default value
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = event.partitionKey
      ? event.partitionKey
      : hash(JSON.stringify(event));
  }

  candidate =
    typeof candidate !== 'string'
      ? (candidate = JSON.stringify(candidate))
      : candidate;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = hash(candidate);
  }
  return candidate;
}
