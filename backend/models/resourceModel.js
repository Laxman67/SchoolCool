import { model, Schema } from 'mongoose';

const resourceSchema = new Schema({
  resourceName: { type: String, required: true },
  type: { type: String, required: true },
  availability: {
    type: String,
    enum: ['Available', 'In Use', 'Under Maintenance'],
    required: true,
  },
  location: {
    room: String,
    building: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const resourceModel = model('Resource', resourceSchema);

export default resourceModel;
