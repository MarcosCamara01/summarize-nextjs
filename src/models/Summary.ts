import { Schema, model, Document, models } from "mongoose";

interface SummaryDoc extends Document {
  title: string;
  summary: string;
  userId: string;
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
});

const Summary = models.Summary || model('Summary', SummarySchema);

export default Summary;
