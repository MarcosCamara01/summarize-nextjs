import { Document, model, Schema, models } from 'mongoose';

export interface UserKeyDocument extends Document {
  email: string;
  apiKey: string;
}

const UserKeySchema = new Schema<UserKeyDocument>({
  email: {
    required: true,
    type: String,
  },
  apiKey: {
    type: String,
    default: "empty"
  },
});

const UserKey = models.UserKey || model<UserKeyDocument>('UserKey', UserKeySchema);

export default UserKey;
