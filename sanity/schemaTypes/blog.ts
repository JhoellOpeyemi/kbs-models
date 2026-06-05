import { defineType, defineField } from "sanity";

export const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "introduction",
      type: "markdown",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "markdown",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "conclusion",
      type: "markdown",
    }),
    defineField({
      name: "date",
      type: "string",
      description: "Date of publication. E.g., June 21, 2024",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
