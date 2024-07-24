import { model, Schema } from 'mongoose';

const reportSchema = new Schema({
  reportType: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const reportModel = model('Report', reportSchema);
