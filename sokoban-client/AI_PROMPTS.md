# 🤖 AI_PROMPTS.md

This file outlines key AI-assisted prompts used to streamline the development of the Sokoban game clone built with Vite + React.

The AI support was used thoughtfully to speed up ideation, refactor logic for clarity, and establish a scalable design baseline. All final decisions and structural choices were reviewed and adapted to meet the specific goals of the project.

---

## 🎮 1. Core Game Design

> Create a Sokoban game.  
> The player sprite must be able to move in all directions.  
> Blocks can only be pushed and not pulled.  
> Only one block can be pushed at a time.

📝 **Purpose:** Establish the fundamental gameplay rules and constraints. This served as the gameplay foundation for both logic and UI interaction.

---

## 🧱 2. Project Structure & Initialization

> I want to use Vite and React for the frontend.  
> Remove the default files generated by Vite and create a clean folder structure.

📝 **Purpose:** Define a clean and minimal project scaffold suitable for incremental development, with React component separation and fast Vite tooling.

---

## 🧠 3. Logic Refactoring & Maintainability

> I think this needs refactoring. Move helper functions to a separate file.

📝 **Purpose:** Break out core movement and win-checking logic into modular utility functions, enabling testability and future reuse (e.g., undo, multiplayer logic, backend integration).

## 🔍 Notes on Design Intent

- The goal was to build a Sokoban clone that’s simple but structurally solid.
- The AI played a support role, offering suggestions that were adapted to the project’s design principles.
- Special attention was paid to readability, reusability, and frontend-backend separation.

---
