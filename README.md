# Memory Game Challenge

Interactive memory game built with React and Tailwind CSS.

The game starts with all cards face down. The player must find all matching pairs before the timer runs out. Each card contains a cosmic symbol, and the game includes animations, feedback modals, sound effects, and responsive layout.

## Live Demo

https://memory-game-challenge-jmajrs.netlify.app/

## Repository

https://github.com/jmajrs/memory-game-challenge.git

## Technologies

- React
- JavaScript
- Vite
- Tailwind CSS
- HTML5 Audio API

## Features

- Start screen with animated logo and start button
- Responsive memory game board using CSS grid
- 4 different card pairs:
  - Star
  - Moon
  - Sun
  - Comet
- Random card order on each game start
- Card flip animation
- Match and mismatch validation
- Feedback modal for correct and incorrect matches
- 30-second countdown timer
- Ticking sound when 10 seconds remain
- Background music with mute/unmute control
- Correct and incorrect sound effects
- Result screen with win/lose message
- Play again flow
- Responsive design for desktop, tablet, and mobile

## Installation

Clone the repository:

bash
git clone https://github.com/jmajrs/memory-game-challenge.git

Go to the project folder:

cd memory-game-challenge

Install dependencies:

npm install

Run the project locally:

npm run dev

Open the local URL shown in the terminal, usually:

http://localhost:5173/

## Project Structure

src/
|-- assets/
|   |-- audio/
|   |-- images/
|-- components/
|   |-- AudioButton/
|   |-- FeedbackModal/
|   |-- GameTimer/
|   |-- MemoryCard/
|-- constants/
|-- hooks/
|-- pages/
|   |-- Game/
|   |-- Home/
|   |-- Result/
|-- utils/
|-- App.jsx
|-- index.css
|-- main.jsx

## Technical Decisions
React

React was selected because it is the framework I currently work with and the one I feel most comfortable using for building interactive user interfaces. Its component-based approach works very well for this type of challenge because the game can be separated into reusable pieces such as cards, modals, timers, audio controls, and screens.

Vite

Vite was used because it provides a fast and modern development environment for React projects. It also keeps the setup simple and allows the project to run and build efficiently.

Tailwind CSS

Tailwind CSS was selected because it allows rapid UI development while keeping styles consistent and easy to adjust. It was especially useful for responsive layout, transitions, hover effects, and animation-related styling.

Project Structure

The project was organized by responsibility:

components contains reusable UI components.
pages contains the main screens of the game.
constants centralizes game values and configuration.
hooks contains reusable logic, such as audio control.
utils contains helper functions, such as card generation and shuffling.
assets contains images and audio files.

This structure keeps the project easy to maintain, extend, and review.

Game Logic Overview

The game creates two cards for each base card type and shuffles them before rendering the board.

When a player selects two cards:

If both cards have the same type, they remain visible.
If they do not match, a feedback modal is shown and the cards flip back down.
The board is temporarily locked while cards are being evaluated.
If the player finds all matches before time runs out, the win screen is displayed.
If the timer reaches zero, the lose screen is displayed.
Audio Behavior

The game starts muted to respect browser autoplay policies. When the user unmutes the game, the background music starts playing.

The game also includes:

Correct match sound
Incorrect match sound
Ticking sound when 10 seconds remain

All audio stops when the game ends.

## Deployment

This project is intended to be deployed using Netlify.

Deployment URL: https://memory-game-challenge-jmajrs.netlify.app/

## Notes

The implementation focuses on clean structure, readable code, responsive design, and a complete user experience while keeping the solution simple and maintainable.