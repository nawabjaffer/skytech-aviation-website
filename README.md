# SKYTECH AVIATION Website

## Overview
This project is a responsive website for SKYTECH AVIATION, an authorized civil aircraft parts supplier and member of ASA. The website includes multiple pages such as Home, Distributors, About, Products, Services, and Contacts, along with a chatbot feature integrated with an open-source free LLM for user assistance. The project also incorporates SEO support and quality assurance fixes.

## Project Structure
```
skytech-aviation-website
├── public
│   └── index.html          # Main HTML entry point
├── src
│   ├── pages               # Contains all page components
│   │   ├── Home.tsx
│   │   ├── Distributors.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── Services.tsx
│   │   └── Contacts.tsx
│   ├── components          # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── ChatbotWidget.tsx
│   │   └── SEOHead.tsx
│   ├── chatbot             # Chatbot related files
│   │   ├── llmClient.ts
│   │   ├── modelConfig.ts
│   │   └── prompts.ts
│   ├── seo                 # SEO related files
│   │   ├── metadata.ts
│   │   └── sitemapGenerator.ts
│   ├── styles              # CSS styles
│   │   ├── globals.css
│   │   └── variables.css
│   ├── hooks               # Custom hooks
│   │   └── useChatbot.ts
│   ├── utils               # Utility functions
│   │   ├── api.ts
│   │   └── validators.ts
│   ├── tests               # Test files
│   │   ├── pages.test.ts
│   │   ├── components.test.ts
│   │   └── accessibility.test.ts
│   ├── app.tsx             # Main application component
│   └── main.tsx            # Entry point for the React application
├── package.json            # npm configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## Setup Instructions
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd skytech-aviation-website
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open the application:**
   Navigate to `http://localhost:3000` in your web browser.

## Features
- **Responsive Design:** The website is designed to be fully responsive, ensuring a seamless experience across devices.
- **Chatbot Integration:** A chatbot feature is included for user assistance, utilizing an open-source free LLM.
- **SEO Support:** The website is optimized for search engines with proper metadata and a sitemap.
- **Quality Assurance:** The project includes tests for components and pages to ensure functionality and accessibility.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.