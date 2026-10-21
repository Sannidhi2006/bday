# 💖 Birthday Surprise for Cuttu 🎂

A romantic, dreamy, Pinterest-style birthday surprise website built with React + Vite for my long-distance boyfriend **Cuttu** (Birthday: 23rd October).

## ✨ Features & Architecture
- **State-Based Multi-Page Flow**: Managed strictly via React state in `App.jsx` (`page` from 1 to 7) without React Router to ensure rock-solid navigation without broken browser back/forward flows.
- **Dreamy Aesthetics**: Soft blush pink, baby pink, cream, dusty rose, and subtle burgundy tones with glassmorphism, soft glowing shadows, and romantic Google Fonts (*Dancing Script* & *Cormorant Garamond*).
- **Reusable Floating Hearts & Sparkles**: `<FloatingHearts />` component with gentle random float physics, sparkles, and `pointer-events: none` to never obstruct clicks.
- **Page 1 (Passcode Unlock)**:
  - Custom rose-gold heart lock SVG illustration.
  - Secret 6-digit passcode: `235006`.
  - Digit slots, friendly validation, gentle shake animation on wrong inputs, and celebratory confetti upon unlocking.
- **Pages 2–7 Flow**:
  - Page 1: Passcode Unlock
  - Page 2: Birthday Welcome
  - Page 3: Cake Cutting
  - Page 4: Love Letter
  - Page 5: Romantic Shayari
  - Page 6: Virtual Hug
  - Page 7: Memories Gallery
- **Mobile First & Accessible**: Min 48px touch targets, prefers-reduced-motion support, no horizontal scroll.

## 📁 Project Structure
```text
birthday-surprise/
├── public/
│   ├── audio/              # Background music & romantic audio
│   └── images/             # cuttu.jpg goes here
│       └── memories/       # Photo gallery images for Page 7
├── src/
│   ├── components/
│   │   ├── BirthdayWelcomePage.jsx
│   │   ├── CakePage.jsx
│   │   ├── FloatingHearts.jsx
│   │   ├── LoveLetterPage.jsx
│   │   ├── MemoriesPage.jsx
│   │   ├── PasscodePage.jsx
│   │   ├── ShayariPage.jsx
│   │   └── VirtualHugPage.jsx
│   ├── data/
│   │   └── memories.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── package.json
└── vite.config.js
```

## 🚀 Running Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
