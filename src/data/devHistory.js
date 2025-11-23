export const devHistory = [
    {
        version: "v1.0",
        date: "2025-11-23",
        title: "Project Initialization & Core MVP",
        userPrompt: "Create a checklist dashboard for service planning. I need phases like Platform, Resource, Dev, Launch.",
        features: [
            "React + Vite + Tailwind CSS Setup",
            "Stepper Component for Phase Navigation",
            "StepCard Component for Checklist Items",
            "Basic Progress Calculation",
            "LocalStorage Persistence"
        ],
        techStack: "React, Vite, Tailwind CSS, Lucide React",
        description: "Initial setup of the Vibe Pilot Dashboard with basic checklist functionality and phase navigation."
    },
    {
        version: "v1.1",
        date: "2025-11-23",
        title: "Project Status Board (Overview)",
        userPrompt: "I need a dashboard overview to see the status of all phases at a glance.",
        features: [
            "Sidebar Navigation",
            "Overview Component (Dashboard)",
            "Phase Summary Cards",
            "Total Progress Tracking",
            "View Switching Logic (Overview <-> Workflow)"
        ],
        techStack: "React State Management, Conditional Rendering",
        description: "Added a high-level overview dashboard to track progress across all phases."
    },
    {
        version: "v1.2",
        date: "2025-11-23",
        title: "Mobile Optimization & CRUD",
        userPrompt: "Make it work on mobile and allow me to add/edit items.",
        features: [
            "Responsive Design (Mobile Menu)",
            "CRUD Operations (Add, Edit, Delete Items)",
            "Hamburger Menu for Mobile",
            "Dynamic Item Management"
        ],
        techStack: "Tailwind Responsive Classes, Array Manipulation",
        description: "Optimized for mobile devices and enabled full management of checklist items."
    },
    {
        version: "v1.3",
        date: "2025-11-23",
        title: "UI Redesign (Figma Style)",
        userPrompt: "Make it look like a modern Figma design. Clean and premium.",
        features: [
            "Global Font (Inter)",
            "Refined Color Palette (Slate/Indigo)",
            "Modern Card Styling (Borders, Soft Shadows)",
            "Polished UI Components"
        ],
        techStack: "CSS Variables, Advanced Tailwind Utility Classes",
        description: "Complete visual overhaul to align with modern design trends."
    },
    {
        version: "v1.4",
        date: "2025-11-23",
        title: "Item Progress & Enhanced Content",
        userPrompt: "Allow % progress for items and add realistic content for planners.",
        features: [
            "Percentage-based Items (Slider)",
            "Detailed Item Progress in Overview",
            "Realistic Planner Checklist Content",
            "Grade System (Basic/Advanced)",
            "Development History Modal"
        ],
        techStack: "Complex State Logic, Data Modeling",
        description: "Added granular progress tracking and populated with practical, real-world checklist data."
    }
];
