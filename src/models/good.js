import { Schema, model } from 'mongoose';
import { AVAILABLE_COLORS } from '../constants/colors.js';

const translatedStringRequired = {
  uk: { type: String, required: true, trim: true },
  en: { type: String, required: true, trim: true },
};

const translatedString = {
  uk: { type: String, trim: true },
  en: { type: String, trim: true },
};

const translatedStringArray = {
  uk: [{ type: String }],
  en: [{ type: String }],
};

const goodSchema = new Schema(
  {
    name: translatedStringRequired,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    price: {
      value: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        default: 'грн',
      },
    },
    size: [
      {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
    ],
    colors: [
      {
        type: String,
        enum: AVAILABLE_COLORS,
        trim: true,
      },
    ],
    description: translatedString,
    feedbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
      },
    ],
    prevDescription: translatedString,
    gender: {
      type: String,
      enum: ['women', 'unisex', 'man'],
    },
    characteristics: translatedStringArray,
    averageRate: { type: Number, default: 0 },
    feedbackCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

goodSchema.virtual('localizedName').get(function () {
  return this.name?.[this.schema.options.lang] || this.name?.uk;
});
goodSchema.virtual('localizedDescription').get(function () {
  return this.description?.[this.schema.options.lang] || this.description?.uk;
});
goodSchema.virtual('localizedPrevDescription').get(function () {
  return (
    this.prevDescription?.[this.schema.options.lang] || this.prevDescription?.uk
  );
});
goodSchema.virtual('localizedCharacteristics').get(function () {
  return (
    this.characteristics?.[this.schema.options.lang] || this.characteristics?.uk
  );
});

goodSchema.index({
  'name.uk': 'text',
  'description.uk': 'text',
  'name.en': 'text',
  'description.en': 'text',
});
goodSchema.index({ 'price.value': 1 });
goodSchema.index({ category: 1 });
goodSchema.index({ gender: 1 });
goodSchema.index({ colors: 1 });
goodSchema.index({ size: 1 });
goodSchema.index({
  feedbackCount: -1,
  averageRate: -1,
  name: 1,
});

export const Good = model('Good', goodSchema);
