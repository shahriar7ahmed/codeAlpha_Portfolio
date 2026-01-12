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

