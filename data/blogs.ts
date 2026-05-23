import { brandTokens } from "@/lib/designTokens";

export type BlogType = {
  title: string;
  body: string;
  image: string;
  datePosted: string;
};

export const blogs: BlogType[] = [
  {
    title: "How to safely introduce your child to modelling in lagos",
    body: "If you’re a parent and you are wondering how to safely introduce your child to modeling, you’re not alone. The kids modeling industry in Nigeria is growing fast, offering children opportunities to build confidence, explore creativity, and shine on stage or in front of the…",
    image: "/brands-img.png",
    datePosted: "18/09/2025",
  },
  {
    title: "What is Modeling? A Beginner’s Guide to the Industry",
    body: ` Discover the world of modeling with this beginner's guide. Learn about different types, how to start your career, and why choosing ${brandTokens.academyName} in Lagos, Nigeria, is your best first step. Modeling is a professional industry where individuals, known as models showcase...`,
    image: "/hero-img.png",
    datePosted: "18/09/2025",
  },
  {
    title:
      "How to Transition from Modeling to Acting: Tips for Expanding Your Career",
    body: `Transitioning from modeling to acting can be an exciting and rewarding career move. Many successful actors began their careers as models, using their experience in front of the camera and their understanding of visual storytelling as a foundation for acting. At ${brandTokens.agencyShortName}...`,
    image: "/brands-img.png",
    datePosted: "18/09/2025",
  },
  {
    title:
      "The Business Side of Modeling: Managing Finances, Contracts, and Career Longevity",
    body: `Modeling is not just about striking poses and walking runways; it is a business that requires careful management of finances, contracts, and career strategies to ensure long-term success. At ${brandTokens.academyName}, we understand the importance of equipping models with the...`,
    image: "/hero-img.png",
    datePosted: "18/09/2025",
  },
  {
    title: "How to safely introduce your child to modelling in lagos",
    body: "If you’re a parent and you are wondering how to safely introduce your child to modeling, you’re not alone. The kids modeling industry in Nigeria is growing fast, offering children opportunities to build confidence, explore creativity, and shine on stage or in front of the…",
    image: "/brands-img.png",
    datePosted: "18/09/2025",
  },
];
