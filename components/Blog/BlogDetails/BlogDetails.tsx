"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { useBlogDetails } from "@/sanity/lib/hooks";
import { urlFor } from "@/sanity/lib/image";

import "./blogDetails.css";

interface BlogDetailsProps {
  slug: string;
}

export default function BlogDetails({ slug }: BlogDetailsProps) {
  const { data: blog, isLoading, error } = useBlogDetails(slug);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="blog-details-container">
      <div className="blog-details-header">
        <h1 className="blog-details-title">{blog.title}</h1>
        <div className="blog-details-meta">
          {blog.author && (
            <p>
              <span>By</span> {blog.author}
            </p>
          )}
          {blog.date && <p>{blog.date}</p>}
          {blog.category && (
            <p>
              <span>Category:</span> {blog.category}
            </p>
          )}
        </div>
      </div>

      {blog.image && (
        <div className="blog-details-image">
          <Image
            src={
              typeof blog.image === "string"
                ? blog.image
                : urlFor(blog.image)
                    .width(1100)
                    .auto("format")
                    .quality(75)
                    .url()
            }
            alt={blog.title || "blog image"}
            fill
            sizes="(max-width: 768px) 100vw, 65rem"
            priority
            unoptimized
          />
        </div>
      )}

      <div className="blog-details-content">
        {blog.introduction && (
          <section className="blog-details-section">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
              {blog.introduction}
            </ReactMarkdown>
          </section>
        )}

        {blog.body && (
          <section className="blog-details-section">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
              {blog.body}
            </ReactMarkdown>
          </section>
        )}

        {blog.conclusion && (
          <section className="blog-details-section">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
              {blog.conclusion}
            </ReactMarkdown>
          </section>
        )}
      </div>
    </div>
  );
}
