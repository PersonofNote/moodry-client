// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Moods, Users } = initSchema(schema);

export {
  Moods,
  Users
};