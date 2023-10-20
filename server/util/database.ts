import { ObjectId } from 'mongodb';
import _ from 'lodash';

interface ObjectWithId {
  _id: ObjectId
}

export function addId<T>(obj: T): T & ObjectWithId {
  return {
    _id: new ObjectId(),
    ...obj,
  };
}

export function addIdsToNestedObject<T>(obj: T): T & ObjectWithId {
  const objWithId = addId(obj);

  Object.keys(objWithId).forEach((key) => {
    const value = objWithId[key];

    if (_.isArray(value)) {
      objWithId[key] = value.map(addIdsToNestedObject);
    } else if (_.isObject(value) && !(value instanceof ObjectId)) {
      objWithId[key] = addIdsToNestedObject(value);
    }
  });

  return objWithId;
}
