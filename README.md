# SovnGarde

![SovnGarde Logo](public/logo.png)

SovnGarde is a platform for game developers to showcase their work, connect with players, and build communities around their games. Named after the Hall of Valor from The Elder Scrolls V: Skyrim, SovnGarde provides a place where creative developers can share their projects and connect with their audience.

## Features

- **Project Showcase**: Create detailed project pages with images, videos, and descriptions
- **Community Interaction**: Connect with players through comments, follows, and likes
- **Live Streaming**: Share your development process in real-time (coming soon)
- **Discover**: Find exciting game projects from indie developers
- **Developer Dashboard**: Track metrics and manage your game projects

## Technology Stack

- **Framework**: Vue 3 + Nuxt 3
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Authentication**: JWT-based auth system

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/sovngarde.git
cd sovngarde
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Build for production
```bash
npm run build
# or
yarn build
```

## Project Structure

```
sovngarde/
├── assets/          # Static assets (CSS, fonts, images)
├── components/      # Vue components
├── layouts/         # Page layouts
├── pages/           # Application pages
├── plugins/         # Vue plugins
├── public/          # Public static assets
├── stores/          # Pinia stores
├── server/          # Server middleware
└── utils/           # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

2025 - Amadeo de la Peña | All rights reserved
