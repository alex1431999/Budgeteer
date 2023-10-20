import { ObjectId } from 'mongodb';

interface ObjectWithId {
  _id: ObjectId
}

export function addId<T>(obj: T): T & ObjectWithId {
  return {
    _id: new ObjectId(),
    ...obj,
  };
}
