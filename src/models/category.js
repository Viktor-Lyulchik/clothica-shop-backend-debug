import { Schema, model } from 'mongoose';
import slugify from 'slugify';

const translatedString = {
  uk: { type: String, required: true, unique: true, trim: true },
  en: { type: String, required: true, unique: true, trim: true },
};

const categorySchema = new Schema(
  {
    name: translatedString,
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      uk: { type: String, trim: true },
      en: { type: String, trim: true },
    },
    img: {
      type: String,
      required: false,
      default: '',
    },
    img_id: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

categorySchema.pre('validate', function (next) {
  if (this.isModified('name.uk')) {
    this.slug = slugify(this.name.uk, {
      lower: true,
      strict: true,
      locale: 'uk',
    });
  }
  next();
});

categorySchema.virtual('localizedName').get(function () {
  return this.name?.[this.schema.options.lang] || this.name?.uk;
});
categorySchema.virtual('localizedDescription').get(function () {
  return this.description?.[this.schema.options.lang] || this.description?.uk;
});

export const Category = model('Category', categorySchema);
