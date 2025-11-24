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
    },
    {
        version: "v1.5",
        date: "2025-11-24",
        title: "Project Registration & Deliverables",
        userPrompt: "Allow project registration and attaching deliverables (notes, prompts, links) to items.",
        features: [
            "Project Registration Modal",
            "Deliverables Management (Notes, Prompts, GitHub Links)",
            "Registration Validation Logic",
            "Project Status Tracking",
            "Reference Links for Checklist Items"
        ],
        techStack: "Context API, Conditional Rendering, Form Handling",
        description: "Implemented project lifecycle management, detailed output tracking, and reference materials."
    },
    {
        version: "v1.6",
        date: "2025-11-24",
        title: "Data Export/Import & Cloud Sync",
        userPrompt: "Add JSON export/import and cloud synchronization with Firebase.",
        features: [
            "JSON Export (Download Backup)",
            "JSON Import (Restore from File)",
            "Quick Save Button",
            "Firebase Cloud Storage Integration",
            "Project ID Generation & Sharing",
            "Cross-browser Data Access",
            "LocalStorage Persistence"
        ],
        techStack: "Firebase Storage, FileReader API, Blob, URL Generation",
        description: "Added data backup/restore capabilities and cloud synchronization for cross-device access."
    },
    {
        version: "v1.7",
        date: "2025-11-25",
        title: "Service Flow Builder",
        userPrompt: "Create a vertical flow builder like Opal/n8n but with New Day style cards.",
        features: [
            "5 Custom Node Types (Start, Auth, Vibe Code, Payment, End)",
            "New Day Style Card Design",
            "React Flow Integration",
            "Zustand State Management",
            "Auto-connect Nodes Vertically",
            "LocalStorage Auto-save",
            "Module Addition Dropdown Menu",
            "Flow Clear Function"
        ],
        techStack: "React Flow, Zustand, Custom Node Components",
        description: "Implemented a vertical flow builder for service architecture design with automatic node connection and state persistence."
    }
];
