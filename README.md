# 🚀 Mini Seller Console

> A modern, responsive lead management system built with React, Vite, and Tailwind CSS

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Navigation Guide](#-navigation-guide)
- [Components](#-components)
- [Technologies](#-technologies)
- [Development](#-development)
- [Contributing](#-contributing)

## 🎯 Overview

Mini Seller Console is a comprehensive lead management application designed for sales teams to efficiently track, manage, and convert leads into opportunities. The application provides an intuitive interface for lead filtering, detailed lead management, and opportunity tracking.

### Key Highlights

- **Real-time Lead Management**: Search, filter, and sort leads by various criteria
- **Interactive Lead Details**: Edit lead information with validation
- **Lead Conversion**: Transform qualified leads into sales opportunities
- **Persistent Filters**: Automatically save and restore user preferences
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## ✨ Features

### 🔍 Lead Management
- **Smart Search**: Search leads by name or company
- **Advanced Filtering**: Filter by status (New, Contacted, Qualified, Converted)
- **Intelligent Sorting**: Sort by lead score (highest to lowest)
- **Lead Scoring**: Visual score indicators with color-coded ratings
- **Status Badges**: Color-coded status indicators for quick identification

### 📊 Lead Details Panel
- **Slide-out Panel**: Non-intrusive detailed view
- **Inline Editing**: Edit contact information and status
- **Email Validation**: Real-time email format validation
- **Lead Conversion**: Convert qualified leads to opportunities
- **Error Handling**: User-friendly error messages and loading states

### 🎯 Opportunity Tracking
- **Opportunity Pipeline**: Track converted leads through sales stages
- **Stage Management**: Visual stage indicators (Prospecting, Qualification, Proposal, etc.)
- **Value Tracking**: Monitor potential revenue from opportunities
- **Progress Visualization**: Clear progress indicators for each opportunity

### 💾 Data Persistence
- **Local Storage**: Automatically save filter preferences
- **Session Recovery**: Restore previous search and filter settings
- **State Management**: Efficient React state management

## 🎮 Demo

The application includes sample data with 10 pre-loaded leads from various sources:
- Website inquiries
- LinkedIn connections
- Referrals
- Trade show contacts
- Cold calls
- Email campaigns

## 🛠 Installation

### Prerequisites

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/marcusplech/mini-seller-console.git
   cd mini-seller-console
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000/
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🎯 Usage

### Getting Started

1. **Launch the Application**: Open http://localhost:3000/ in your browser
2. **Explore Sample Data**: The app loads with 10 sample leads automatically
3. **Search and Filter**: Use the search bar and status filter to find specific leads
4. **View Lead Details**: Click on any lead to open the detailed panel
5. **Edit Information**: Use the "Edit Lead" button to modify lead details
6. **Convert Leads**: Click "Convert to Opportunity" for qualified leads

### Workflow Example

1. **Search for a Lead**: Type "TechCorp" in the search bar
2. **Select Lead**: Click on "John Smith - TechCorp Inc"
3. **Review Details**: Check the lead score (85) and current status (New)
4. **Update Status**: Edit the lead and change status to "Contacted"
5. **Convert**: If qualified, convert the lead to an opportunity
6. **Track Progress**: Monitor the new opportunity in the right panel

## 📁 Project Structure

```
newproject/
├── 📄 README.md                 # Project documentation
├── 📄 package.json              # Dependencies and scripts
├── 📄 vite.config.js            # Vite configuration
├── 📄 tailwind.config.js        # Tailwind CSS configuration
├── 📄 postcss.config.js         # PostCSS configuration
├── 📄 eslint.config.js          # ESLint configuration
├── 📄 index.html                # HTML entry point
├── 📁 public/                   # Static assets
│   └── 🖼️ vite.svg
└── 📁 src/                      # Source code
    ├── 📄 main.jsx              # Application entry point
    ├── 📄 App.jsx               # Main application component
    ├── 📄 App.css               # Application styles
    ├── 📄 index.css             # Global styles and Tailwind imports
    ├── 📁 components/           # React components
    │   ├── 📄 LeadsList.jsx     # Lead list with filtering
    │   ├── 📄 LeadDetailPanel.jsx # Lead details slide-out panel
    │   └── 📄 OpportunitiesList.jsx # Opportunities display
    ├── 📁 data/                 # Sample data
    │   └── 📄 leads.json        # Sample leads data
    └── 📁 assets/               # Static assets
        └── 🖼️ react.svg
```

## 🧭 Navigation Guide

### Main Interface

- **Header Section**: Application title and description
- **Left Panel**: Leads management area
  - Search bar for filtering by name/company
  - Status dropdown filter
  - Sort options
  - Lead list with scores and status badges
- **Right Panel**: Opportunities tracking area
  - Converted leads display
  - Stage indicators
  - Value tracking

### Lead Detail Panel

- **Access**: Click any lead in the main list
- **Navigation**: 
  - Close: Click X button or backdrop
  - Edit: Click "Edit Lead" button
  - Save: Click "Save" after editing
  - Cancel: Click "Cancel" to discard changes
  - Convert: Click "Convert to Opportunity"

### Keyboard Shortcuts

- **Escape**: Close lead detail panel
- **Enter**: Submit forms (search, edit)
- **Tab**: Navigate through form fields

## 🧩 Components

### App.jsx
**Main application component**
- State management for leads and opportunities
- Filter and search logic
- API simulation with loading states
- Error handling and recovery

### LeadsList.jsx
**Lead management interface**
- Search functionality
- Status filtering
- Score-based sorting
- Local storage integration
- Responsive design with loading states

### LeadDetailPanel.jsx
**Detailed lead view and editing**
- Slide-out panel design
- Inline editing capabilities
- Form validation (email format)
- Lead conversion functionality
- Error handling and user feedback

### OpportunitiesList.jsx
**Opportunity tracking display**
- Stage-based organization
- Color-coded progress indicators
- Value and timeline tracking
- Empty state handling

## 🛠 Technologies

### Core Framework
- **React 19.1.1**: Modern React with hooks and functional components
- **Vite 7.1.2**: Fast build tool and development server
- **JavaScript (ES6+)**: Modern JavaScript features

### Styling
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization
- **Responsive Design**: Mobile-first approach

### Development Tools
- **ESLint**: Code quality and consistency
- **React Hooks**: State management and lifecycle
- **Local Storage API**: Data persistence

### Key Features
- **Hot Module Replacement (HMR)**: Instant updates during development
- **Tree Shaking**: Optimized bundle size
- **Code Splitting**: Efficient loading
- **Modern Browser Support**: ES6+ features

## 🔧 Development

### Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Code Quality Checks**
   ```bash
   npm run lint
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

### Customization

#### Adding New Leads
Edit `src/data/leads.json` to add more sample data:
```json
{
  "id": 11,
  "name": "New Lead",
  "company": "Company Name",
  "email": "email@company.com",
  "source": "Website",
  "score": 85,
  "status": "new"
}
```

#### Styling Modifications
- **Global Styles**: Edit `src/index.css`
- **Component Styles**: Modify Tailwind classes in components
- **Theme Customization**: Update `tailwind.config.js`

#### Adding Features
- **New Components**: Create in `src/components/`
- **State Management**: Extend existing hooks in `App.jsx`
- **API Integration**: Replace JSON data with real API calls

### Performance Optimization

- **Lazy Loading**: Components load on demand
- **Memoization**: Prevent unnecessary re-renders
- **Efficient Filtering**: Optimized search and filter algorithms
- **Bundle Optimization**: Vite's built-in optimizations

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

*For questions or support, please open an issue in the repository.*
