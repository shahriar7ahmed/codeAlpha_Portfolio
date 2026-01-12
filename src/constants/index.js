import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "technologies",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "certificates",
    title: "Certificates",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Full Stack Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "UI/UX Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

export { services, technologies };

// Sample Poems for Poetry Section
export const samplePoems = [
  {
    id: 'poem-1',
    title: {
      en: 'My Bengal',
      bn: 'আমার বাংলা'
    },
    content: `আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।
চিরদিন তোমার আকাশ, তোমার বাতাস, আমার প্রাণে বাজায় বাঁশি॥
ও মা, ফাগুনে তোর আমের বনে ঘ্রাণে পাগল করে,
মরি হায়, হায় রে—
ও মা, অঘ্রানে তোর ভরা ক্ষেতে আমি কী দেখেছি মধুর হাসি॥`,
    excerpt: 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।\nচিরদিন তোমার আকাশ, তোমার বাতাস...',
    language: 'bn',
    author: 'Shahriar Ahmed',
    publishedDate: '2024-01-15T10:00:00Z',
    tags: ['Nature', 'Patriotic', 'Love'],
    featured: true
  },
  {
    id: 'poem-2',
    title: {
      en: 'The Road Not Taken',
      bn: null
    },
    content: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same.`,
    excerpt: 'Two roads diverged in a yellow wood,\nAnd sorry I could not travel both...',
    language: 'en',
    author: 'Shahriar Ahmed',
    publishedDate: '2024-02-10T14:30:00Z',
    tags: ['Life', 'Choice', 'Journey'],
    featured: true
  },
  {
    id: 'poem-3',
    title: {
      en: 'Silent Night',
      bn: 'নীরব রাত্রি'
    },
    content: `চাঁদের আলোয় ভাসে রাত,
নীরবতা মনের কথা কয়।
তারাদের মেলায় একাকী আমি,
স্বপ্নের ডানায় উড়ে যায় ভয়।`,
    excerpt: 'চাঁদের আলোয় ভাসে রাত,\nনীরবতা মনের কথা কয়...',
    language: 'bn',
    author: 'Shahriar Ahmed',
    publishedDate: '2024-03-05T20:15:00Z',
    tags: ['Night', 'Solitude', 'Dreams'],
    featured: false
  }
];

// Sample Blog Posts
export const sampleBlogs = [
  {
    id: 'blog-1',
    title: 'Getting Started with React and Vite',
    excerpt: 'Learn how to set up a modern React development environment using Vite, the next-generation frontend tooling.',
    content: `# Getting Started with React and Vite

Vite has revolutionized the way we build React applications. It provides instant server start, lightning-fast Hot Module Replacement (HMR), and optimized production builds.

## Why Vite?

Traditional build tools can be slow, especially as projects grow. Vite leverages native ES modules and provides:
- Instant server start regardless of app size
- Lightning-fast HMR that stays fast regardless of app size
- Rich features with optimized build

## Setup

\`\`\`bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
\`\`\`

## Conclusion

Vite is the future of frontend tooling, offering developers a superior development experience.`,
    featuredImage: '/blog/vite-react.jpg',
    language: 'en',
    category: 'Tech',
    tags: ['React', 'Vite', 'JavaScript', 'Tutorial'],
    author: 'Shahriar Ahmed',
    publishedDate: '2024-01-20T09:00:00Z',
    readTime: 5,
    featured: true
  },
  {
    id: 'blog-2',
    title: 'প্রোগ্রামিং শেখার সহজ উপায়',
    excerpt: 'নতুনদের জন্য প্রোগ্রামিং শেখার কিছু কার্যকরী টিপস এবং পরামর্শ।',
    content: `# প্রোগ্রামিং শেখার সহজ উপায়

প্রোগ্রামিং শেখা অনেকের কাছে কঠিন মনে হলেও সঠিক পদ্ধতি অনুসরণ করলে এটি অনেক সহজ হয়ে যায়।

## প্রথম ধাপ

প্রথমেই একটি প্রোগ্রামিং ভাষা বেছে নিন। নতুনদের জন্য Python বা JavaScript ভালো পছন্দ। এই ভাষাগুলো শিখতে সহজ এবং চাকরির বাজারে ব্যাপক চাহিদা রয়েছে।

## নিয়মিত অনুশীলন

প্রতিদিন অন্তত ৩০ মিনিট কোডিং করুন। ছোট ছোট প্রজেক্ট তৈরি করুন। এতে আপনার দক্ষতা দ্রুত বৃদ্ধি পাবে।

## সম্প্রদায়ে যুক্ত হন

GitHub, Stack Overflow এবং বিভিন্ন প্রোগ্রামিং কমিউনিটিতে সক্রিয় থাকুন। অন্যদের কোড পড়ুন এবং প্রশ্ন করুন।

## উপসংহার

ধৈর্য ধরুন এবং নিয়মিত অনুশীলন করুন। প্রোগ্রামিং একটি দক্ষতা যা সময়ের সাথে উন্নত হয়।`,
    featuredImage: '/blog/programming-bangla.jpg',
    language: 'bn',
    category: 'Tech',
    tags: ['Programming', 'Bangla', 'Beginners', 'Tutorial'],
    author: 'Shahriar Ahmed',
    publishedDate: '2024-02-15T11:30:00Z',
    readTime: 7,
    featured: true
  },
  {
    id: 'blog-3',
    title: 'জীবনে ভারসাম্য রক্ষা করার শিল্প',
    excerpt: 'কর্ম এবং ব্যক্তিগত জীবনের মধ্যে ভারসাম্য কীভাবে বজায় রাখবেন।',
    content: `# জীবনে ভারসাম্য রক্ষা করার শিল্প

আধুনিক জীবনে কাজ এবং ব্যক্তিগত জীবনের মধ্যে ভারসাম্য রক্ষা করা একটি বড় চ্যালেঞ্জ।

## সময় ব্যবস্থাপনা

সময়কে সঠিকভাবে ভাগ করা খুবই গুরুত্বপূর্ণ। কাজের জন্য নির্দিষ্ট সময় বরাদ্দ করুন এবং সেই সময়ের বাইরে পরিবার ও বন্ধুদের সাথে সময় কাটান।

## স্বাস্থ্যের যত্ন

শারীরিক এবং মানসিক স্বাস্থ্য উভয়ই গুরুত্বপূর্ণ। নিয়মিত ব্যায়াম করুন এবং পর্যাপ্ত ঘুমান।

## নিজের জন্য সময়

প্রতিদিন কিছু সময় নিজের জন্য রাখুন। এই সময়ে আপনার পছন্দের কাজ করুন - বই পড়া, মিউজিক শোনা বা মেডিটেশন।

## উপসংহার

ভারসাম্যপূর্ণ জীবনযাপন সুখী এবং সফল জীবনের চাবিকাঠি।`,
    featuredImage: '/blog/work-life-balance.jpg',
    language: 'bn',
    category: 'Life',
    tags: ['Life', 'Balance', 'Productivity', 'Bangla'],
    author: 'Shahriar Ahmed',
    publishedDate: '2024-03-01T16:45:00Z',
    readTime: 6,
    featured: false
  }
];

// Blog Categories
export const blogCategories = [
  { id: 'all', name: 'All', color: '#915EFF' },
  { id: 'tech', name: 'Tech', color: '#06B6D4' },
  { id: 'life', name: 'Life', color: '#F59E0B' },
  { id: 'poetry', name: 'Poetry', color: '#F43F5E' },
  { id: 'culture', name: 'Culture', color: '#10B981' },
  { id: 'tutorial', name: 'Tutorial', color: '#3B82F6' }
];

