"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

import { urlFor } from "@/sanity/lib/image";
import { Blog } from "@/sanity/types";
import StyledLink from "@/components/utils/StyledLink/StyledLink";

import "./blogCard.css";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className="blog-container">
      <div className="blog-text-container">
        <div className="blog-title-n-body-container">
          <h2 className="blog-title">{blog.title}</h2>

          <div className="blog-intro">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
              {blog.introduction || ""}
            </ReactMarkdown>
          </div>
        </div>

        <StyledLink path={`/blog/${blog.slug}`} label="Read More" />
      </div>

      <div className="blog-image-container">
        {blog.image && (
          <Image
            src={urlFor(blog.image).width(400).auto("format").quality(75).url()}
            alt=""
            className="blog-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            unoptimized
          />
        )}
      </div>

      <p className="blog-date-posted">{blog.date}</p>
    </div>
  );
};

export default BlogCard;
