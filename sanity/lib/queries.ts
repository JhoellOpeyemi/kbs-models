import { defineQuery } from "next-sanity";

export const BLOGS_QUERY = defineQuery(
  `*[_type =='blog' && defined(slug.current)] | order(_createdAt desc){
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        "slug": slug.current,
        date,
        image,
        title,
        introduction
    }`,
);

export const BLOG_DETAILS_QUERY = defineQuery(
  `*[_type =='blog' && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        "slug": slug.current,
        author,
        image,
        category,
        introduction,
        body,
        conclusion,
        date
    }`,
);

export const HOME_MODELS_QUERY = defineQuery(
  `*[_type =='model' && defined(slug.current) && tag == 'top'] | order(_createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        "slug": slug.current,
        headshot,
        eye_color,
        skin_tone,
    }`,
);

export const MODELS_QUERY = defineQuery(
  `*[_type =='model' && defined(slug.current)] | order(_createdAt) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        "slug": slug.current,
        headshot,
        gender,
    }`,
);

export const MODEL_DETAILS_QUERY = defineQuery(
  `*[_type =='model' && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        "slug": slug.current,
        headshot,
        gender,
        eye_color,
        hair,
        skin_tone,
        skin_type,
        face_shape,
        lip_size,
        "gallery": gallery[].asset->url,
    }`,
);
