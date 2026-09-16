# 🎓 StudyPilot — AI Study Companion

> **An intelligent, curriculum-aligned AI learning platform tailored for Pakistan Board Education (FBISE & Provincial BISE — Classes 9–12: Matric & Intermediate).**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

**StudyPilot** is built to bridge the gap between AI education technology and national board standards in Pakistan. Instead of providing generic, ungrounded AI answers that hallucinate outside the syllabus, StudyPilot grounds AI explanations strictly in:
1. **Official Textbooks** (Federal FBISE, BISE Lahore, Rawalpindi, Karachi, Peshawar).
2. **Teacher-Verified Study Notes & Past Papers**.
3. **Class-Isolated Academic Contexts**.

---

## ✨ Key Features

### 🤖 1. Adaptive AI Tutor & Learning Engine
- **Curriculum-Grounded Context**: Explanations, derivations, and definitions structured according to FBISE/BISE marking schemes.
- **Multimodal Learning Modes**:
  - *Conceptual Explanation*: Deep breakdown with analogies and LaTeX formulas ($p = mv$, $F = ma$).
  - *Simplify*: Explanations tailored to foundational understanding.
  - *Exam Answers*: Point-by-point, board-marking-ready answers.
  - *Practice Problems*: Interactive questions with step-by-step guidance.
- **Source Transparency**: Every answer cites exact textbook chapters, pages, and teacher notes.

### 📚 2. Strict Academic Curriculum Configuration
Dynamic resolution path:
$$\text{Board} \longrightarrow \text{Class (9--12)} \longrightarrow \text{Stream} \longrightarrow \text{Subject Combination}$$
- **Streams Supported**: Matric Science (Biology / Computer Science), Matric Arts, F.Sc. Pre-Medical, F.Sc. Pre-Engineering, ICS (Physics / Statistics).

### 👥 3. Multi-Role Workspace Hierarchy
- 🎓 **Student**: Interactive tutor, study planner missions, revision flowcharts, notebook mode, quizzes, and class group discussions.
- 👨‍🏫 **Teacher**: Class management, 6-character secure join codes (`FB10A1`), student approval queue, study notes verification, and aggregated learning analytics.
- 🏛️ **Management**: Teacher verification workflow (Approve/Reject pending teacher credentials), institutional oversight, and material audits.
- ⚙️ **Administrator**: Curriculum management, board configuration, and system seeding.

### 🧭 4. Interactive Visual & Revision Tools
- **Flowchart Visual Revision**: Interactive concept trees powered by `@xyflow/react`.
- **Handwritten Notebook Mode**: Authentic paper-ruled notebook simulator for formula sheets and quick review.
- **Floating AI Tutorial Guide**: First-time onboarding assistant guiding students and teachers through every page without confusion.
- **Centrally Focused Universal Search**: Quick topic and subject lookup situated in the top-center navigation bar.
- **Theme Support**: Seamless Dark Mode and Light Mode switching with custom surface and brand tokens.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript + Vite |
| **Styling & UI** | Tailwind CSS v4 + Lucide Icons + Motion (Framer Motion) |
| **State Management** | Zustand |
| **Diagrams & Flows** | `@xyflow/react` |
| **Testing** | Vitest + Testing Library |
| **Backend (Target Architecture)** | FastAPI (Python 3.11+) + SQLite (WAL Mode) + SQLAlchemy 2.0 Async |
| **Vector DB / RAG** | ChromaDB + `sentence-transformers` (`all-MiniLM-L6-v2`) |
| **LLM Provider** | Google Gemini (`google-genai`) with Ollama local fallback |

---

## 🚀 Quick Start (Frontend)

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yasir12345678909/ai-study-companion.git
   cd ai-study-companion
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Run Unit Tests:**
   ```bash
   npm test
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
ai-study-companion/
├── public/                 # Static assets and icons
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/         # Shared reusable UI components
│   │   ├── common/         # Buttons, badges, modals, search
│   │   ├── layout/         # AppLayout, TopNav (Center search), Sidebar
│   │   ├── tutorial/       # Floating AI Tutorial Companion
│   │   └── ui/             # Radix primitives & shadcn components
│   ├── data/               # Curriculum configs and mock datasets
│   ├── features/           # Modular feature views
│   │   ├── admin/          # Admin configuration & oversight
│   │   ├── auth/           # Login, Sign Up & Academic onboarding
│   │   ├── flowchart/      # Visual concept flowcharts (@xyflow/react)
│   │   ├── groups/         # Class groups & material sharing
│   │   ├── handwritten/    # Ruled paper notebook revision
│   │   ├── home/           # Student command center dashboard
│   │   ├── management/     # Teacher verification & institutional views
│   │   ├── planner/        # Study planner & mission generator
│   │   ├── revision/       # Quick revision & formula sheets
│   │   ├── teacher/        # Teacher class manager & approvals
│   │   └── tutor/          # AI Tutor interactive chat & sources
│   ├── stores/             # Zustand state stores (app, theme, onboarding)
│   ├── types/              # Comprehensive TypeScript interfaces
│   ├── App.tsx             # 25+ routed application views
│   └── main.tsx            # Entry point
├── backend/                # FastAPI backend specification & RAG pipeline
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite build configuration
└── README.md
```

---

## 🔐 Security & Governance Invariants

1. **Teacher Privileges**: Teachers in `pending` status are strictly read-only until validated by Institutional Management.
2. **Student Privacy**: AI study sessions and queries remain private to the student; teachers receive aggregated diagnostic insights only.
3. **Curriculum Trust Tiers**: Student notes are isolated and must be verified by a teacher before indexing into the class AI RAG pipeline.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
