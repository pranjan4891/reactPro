import mongoose from 'mongoose';

export const toUpperCaseWithUnderscore = (str: string): string => {
  return str.split(' ').join('_').toUpperCase();
};

export const convertStringToObjectId = (
  stringValue: string | null | undefined,
) => (stringValue ? new mongoose.Types.ObjectId(stringValue) : null);

export const isMongooseObjectId = (
  objectId: string | null | undefined,
): boolean => {
  // Check if the objectId is a valid MongoDB ObjectId
  return mongoose.Types.ObjectId.isValid(objectId);
};
