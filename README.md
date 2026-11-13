# Nguyen Binh Phuong Huy — Personal Website & Portfolio

Rebuilt personal website and portfolio of **Nguyen Binh Phuong Huy** (Computer Science student at International University, VNU-HCM & Full-Stack Developer), migrated from the static `nbphuy.github.io` repository to a modern **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** stack.

## Key Features

- **100% Preserved Content & Aesthetics**: Retains all original pages, copywriting, social links, images, software icons, project cards, contact form logic (`@emailjs/browser`), and Markdown blog posts (`post1.md`, `post2.md`) from `nbphuy.github.io`.
- **Categorized Skills & Software Toolkit**: Lists technical proficiencies across Programming Languages, Frameworks & Libraries, Databases & Backend Architecture, AI Tools & Prompt Engineering, Tools & Technologies, Spoken Languages, and Design/Productivity Software (**strictly without percentage bars or arbitrary numeric ratings**).
- **Verified Certifications**: Displays 11+ certifications from IELTS, Google, Coursera, Cisco, Microsoft, and Thinking School.
- **Expanded Projects Portfolio**: Features both the original portfolio cards and new engineering projects from the CV (`StudentFood`, `MangaHub`, `Real-time EEG Meditation Monitoring Thesis`, `Coinbase Mobile UI Design`).
- **Hobbies & Interactive Photo Gallery (`/photos`)**: Filterable photography gallery with full-screen Lightbox preview and automatic file discovery for any photos added to `public/img/photos/`.
- **Markdown Blog & Local CMS (`/blog` & `/admin`)**: Server-cached Markdown blog reader supporting both `/blog/[id]` and legacy `?post=<id>` links, paired with a split-screen Local Markdown CMS (`/admin`).
- **Interactive & Printable Resume (`/cv`)**: Full CV view formatted for both dark-mode web reading and clean one-click PDF printing.

## Project Structure

```text
├── app/
│   ├── layout.tsx            # Root layout with Inter & Geist Mono fonts, Navbar, and Footer
│   ├── page.tsx              # Home page (Hero + animated blob avatar + quick highlights)
│   ├── about/page.tsx        # About Me, Skills (badge-only), Education, Experience, Certifications, Hobbies
│   ├── projects/page.tsx     # Original + CV Projects gallery
│   ├── photos/page.tsx       # Photography & Visuals gallery with Lightbox
│   ├── blog/
│   │   ├── page.tsx          # Blog feed + legacy ?post= redirect support
│   │   └── [id]/page.tsx     # Dynamic Markdown blog post page
│   ├── contact/page.tsx      # Contact page with EmailJS integration
│   ├── admin/page.tsx        # Local Markdown CMS editor & live preview
│   └── cv/page.tsx           # Printable Resume / CV page
├── components/               # Client & UI components (Navbar, Footer, PhotoGallery, ContactForm, AdminEditor)
├── lib/
│   ├── portfolio-data.ts     # Centralized profile, projects, skills, certifications, experience & hobbies data
│   ├── markdown.ts           # Isomorphic Markdown parser & blog metadata
│   ├── blog.ts               # Server-cached blog loader (Next.js 16 'use cache')
│   └── photos.ts             # Auto-discovery loader for public/img/photos/
├── posts/published/          # Markdown blog post files (post1.md, post2.md, ...)
└── public/                   # Static images, software logos, favicons, and documents
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.
