import { Document, model, Schema, models } from 'mongoose';

export interface GoogleUserDocument extends Document {
  email: string;
  name: string;
  api: string;
  image: string
  createdAt: Date;
  updatedAt: Date;
}

const GoogleUserSchema = new Schema<GoogleUserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    name: {
      type: String,
      required: [true, 'Fullname is required'],
      minLength: [3, 'fullname must be at least 3 characters'],
      maxLength: [25, 'fullname must be at most 25 characters'],
    },
    image: {
        type: String,
    },
    api: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const GoogleUser = models.GoogleUser || model<GoogleUserDocument>('GoogleUser', GoogleUserSchema);

export default GoogleUser;
