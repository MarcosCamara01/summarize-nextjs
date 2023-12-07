import { Schema, model, Document, models } from "mongoose";

export interface SummaryDoc extends Document {
  title: string;
  summary: string;
  userId: string;
  inputTokens: number;
  outputTokens: number;
}

const SummarySchema = new Schema<SummaryDoc>({
  title: {
    type: String,
    default: "No title"
  },
  summary: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  inputTokens: {
    type: Number,
    required: true
  },
  outputTokens: {
    type: Number,
    required: true
  },
});

const Summary = models.Summary || model('Summary', SummarySchema);

export default Summary;
