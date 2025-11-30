# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern and clean UI design
- 📱 Fully responsive across all devices
- ⚡ Fast and optimized performance
- 🎭 Smooth animations with Framer Motion
- 🎯 Smooth scrolling navigation
- 📧 Contact form
- 🌙 Dark theme with gradient accents

## Sections

- **Hero** - Introduction with animated role titles
- **About** - Personal information and skills overview
- **Skills** - Technology stack and tools
- **Projects** - Featured projects with links
- **Experience** - Work experience and education timeline
- **Contact** - Contact form and information
- **Footer** - Social links and copyright

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd codeAlpha_Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Customization

### Update Personal Information

1. **Hero Section** (`src/sections/Hero.jsx`):
   - Update name
   - Modify roles array
   - Update social media links
   - Change description text

2. **About Section** (`src/sections/About.jsx`):
   - Update personal description
   - Modify skill highlights

3. **Skills Section** (`src/sections/Skills.jsx`):
   - Add or remove technologies
   - Update skill categories

4. **Projects Section** (`src/sections/Projects.jsx`):
   - Add your projects
   - Update project details and links

5. **Experience Section** (`src/sections/Experience.jsx`):
   - Add your work experience
   - Update education information

6. **Contact Section** (`src/sections/Contact.jsx`):
   - Update contact information
   - Connect contact form to your backend/email service

### Colors

Update the color scheme in:
- `tailwind.config.js` - Theme colors
- `src/index.css` - CSS variables

### Fonts

Change fonts in `index.html` and `tailwind.config.js`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library

## License

This project is open source and available under the MIT License.

## Contact

Feel free to reach out if you have any questions or suggestions!
