import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  record_id: {
    type: Number,
    required: true,
    unique: true,
  },
  unit_id: {
    type: String,
    required: true,
    unique: true,
  },
  smm_link: {
    type: Number,
  },
  type: {
    type: String,

  },
  person: {
    type: String,

  },
  pp_id: {
    type: Number,

  },
  dbid: {
    type: Number,

  },
  type_01: {
    type: String,
    // enum: ['null','Type A', 'Type B', 'Type C'], // Replace with actual options

  },
  type_02: {
    type: String,
    // enum: ['null','Type A', 'Type B', 'Type C'], // Replace with actual options

  },
  dat: {
    type: String,
    // enum: ['null','Type A', 'Type B', 'Type C'], // Replace with actual options

  },
  platform: {
    type: String,
    // enum: ['null','Platform1', 'Platform2', 'Platform3', 'Platform4'], // Replace with actual options

  },
  from: {
    type: String,

  },
  report_date: {
    type: String,

  },
  reference: {
    type: String,

  },
  organization: {
    type: String,

  },
  sm_name: {
    type: String,

  },
  mobile: {
    type: Number,

  },
  link: {
    type: String,

  },
  social: {
    type: String,

  },
  remarks: {
    type: String,

  },
},
  { timestamps: true });// This will add createdAt and updatedAt automatically

export default mongoose.model("SocialData", dataSchema)