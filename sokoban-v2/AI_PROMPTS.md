# AI Development Prompts for Sokoban-v2

## Initial Setup (Successful)

**Prompt:**  
"Create a Sokoban game in React with these features:

- Tile-based movement
- Level editor for admins
- Leaderboard system
- User authentication
- Backend API integration using Express/MongoDB"

**AI Success:**

- Generated proper component structure
- Created working game mechanics
- Set up auth context correctly

## Problem Solving (Mixed Results)

**Prompt:**  
"The leaderboard isn't updating after game completion. The scores POST request succeeds but the GET /leaderboard doesn't show new entries."

**AI Success:**

- Identified missing response data in POST /scores
- Suggested adding `.populate()` to Mongoose query

**AI Failure:**

- Initially missed the need for client-side state updates

## Final Polish (Successful)

**Prompt:**  
"Improve the level editor UI with:

- Real-time preview
- Tile palette
- Grid resizing
- Input validation"

**AI Success:**

- Created intuitive UI components
- Added proper validation checks
- Implemented responsive design
