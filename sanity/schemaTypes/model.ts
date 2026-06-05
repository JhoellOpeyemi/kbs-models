import { defineType, defineField } from "sanity";

export const model = defineType({
  name: "model",
  title: "Model",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "Full name of the model",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "URL friendly identifier",
      options: {
        source: "name",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headshot",
      type: "image",
      description: "Upload a headshot photo of the model",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gender",
      type: "string",
      description: "Select the gender of the model",
      options: {
        list: [
          { title: "Female", value: "female" },
          { title: "Male", value: "male" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    // common fields
    defineField({
      name: "skin_tone",
      type: "string",
      description: "Skin tone of the model. E.g., fair, ebony, dark",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skin_type",
      type: "string",
      description: "Skin type of the model. E.g., oily, dry, combination",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "face_shape",
      type: "string",
      description: "Face shape of the model",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hair",
      type: "string",
      description: "Hair color",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eye_color",
      type: "string",
      description: "Eye color",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lip_size",
      type: "string",
      description: "Lip size of the model",
      options: {
        list: [
          { title: "Full", value: "full" },
          { title: "Medium", value: "medium" },
          { title: "Thin", value: "thin" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      type: "array",
      description:
        "Upload photos to the model's gallery. Minimum 1, maximum 10 images.",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
      validation: (rule) => rule.required().min(1).max(10),
    }),
    defineField({
      name: "tag",
      type: "string",
      description:
        "Tag the model as 'Top' or 'Normal'. Top models  show on the homepage and should be limited to a maximum of 6'",
      options: {
        list: [
          { title: "Top", value: "top" },
          { title: "Normal", value: "normal" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
