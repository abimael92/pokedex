# Pokedex App

The Pokedex App is a Single Page Application (SPA) that allows users to enter any Pokemon name and display its image along with general stats from the Pokedex. It's built using React and leverages the PokeAPI to fetch Pokemon data and images.

![Pokedex App Preview](https://abimael-common-assets.s3.eu-west-1.amazonaws.com/myproject-resources/pokedex-preview.png)

---

![Vite](https://img.shields.io/badge/Built_With-Vite-646CFF?style=plastic&logo=vite&logoColor=white)
![NPM](https://img.shields.io/badge/Package_Manager-NPM-%23CB3837.svg?style=plastic&logo=npm&logoColor=white)
![PokeAPI](https://img.shields.io/badge/API-PokeAPI-red?style=plastic)

![React](https://img.shields.io/badge/React-%2320232a.svg?style=plastic&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3A79C1?style=plastic&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?style=plastic&logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=plastic&logo=github&logoColor=white)

[![Repo Size](https://img.shields.io/github/repo-size/abimael92/pokedex?style=plastic)](#) [![Commits](https://img.shields.io/github/commit-activity/t/abimael92/pokedex?style=plastic)](#) [![Forks](https://img.shields.io/github/forks/abimael92/pokedex?style=plastic)](#) [![Version](https://img.shields.io/github/package-json/v/abimael92/pokedex?style=plastic)](#) [![Last Commit](https://img.shields.io/github/last-commit/abimael92/pokedex?style=plastic)](#) [![Created At](https://img.shields.io/github/created-at/abimael92/pokedex?style=plastic)](#)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Documentation](#documentation)
- [Usage](#usage)
- [Features](#features)
- [FAQs](#faqs)

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: CSS Modules
- **State Management**: React Hooks
- **API**: [PokeAPI](https://pokeapi.co/)
- **Build Tool**: Vite

## 🚀 Installation and Setup

### 1. Clone the repository:

```
git clone https://github.com/your-username/pokedex-app.git
```

### 2. Navigate to the project directory:

```bash
cd pokedex
```

### 3. Install the dependencies:

```bash
npm install
```

### 4. Run the app:

```bash
npm run dev
```

### 5. Open in browser:

```bash
http://localhost:5173/
```

## Documentation

- PokeAPI Documentation: https://pokeapi.co/docs/v2

## 📂 Project Structure

```bash
src/
├── components/          # Reusable UI components
│   ├── Pokedex/         # Main Pokedex shell
│   ├── PokedexScreen/   # Display screens
│   └── ...              # Other components
├── hooks/               # Custom hooks
│   ├── usePokemon.ts    # Pokemon data fetcher
│   └── ...              # Other hooks
├── services/            # API services
│   └── pokemonApi.ts    # PokeAPI wrapper
├── types/               # Type definitions
└── utils/               # Helper functions     # Scripts para desarrollo
```

## Usage

The Pokedex App allows users to search for a specific Pokemon by entering its name. The app fetches data from the PokeAPI and displays the Pokemon's image along with its general stats. Users can easily find information about their favorite Pokemon using this user-friendly interface.

## ✨ Features

- **Search by Name or ID**  
  Instantly find any Pokémon using its name or Pokédex number.

- **Detailed Stats & Info**  
  View height, weight, types, abilities, base stats, and evolution chains.

- **Authentic Pokémon Cries**  
  Hear the original in-game cries of each Pokémon.

- **Type Effectiveness Calculator**  
  Understand strengths and weaknesses based on typing matchups.

- **Generation Filter**  
  Filter Pokémon by generation for targeted browsing.

- **Animated Pokédex Interface**  
  Enjoy a nostalgic, animated design inspired by the classic Pokédex.

- **Responsive Design**  
  Fully optimized for mobile, tablet, and desktop screens.

- **User-Friendly Interface**  
  Clean layout and intuitive navigation for a smooth user experience.

## 📸 Screenshots

### Pokémon Detail View

![Pokemon Detail](https://your-screenshot-url)

### Type Effectiveness

![Type Effectiveness](https://your-screenshot-url)

## Key Learnings & Technical Highlights

- Implemented efficient data fetching strategies using `async/await` with proper error handling.
- Applied scalable component-based architecture using React and TypeScript.
- Strengthened strong typing practices across components, hooks, and services to improve maintainability.
- Created a polished, responsive UI inspired by the original Pokédex — with animations and accessibility in mind.
- Integrated real-time type-effectiveness calculations based on dual-type logic.
- Migrated from JavaScript to TypeScript, improving developer experience and catching type errors early.
- Leveraged Vite for fast development builds and optimized hot module replacement (HMR).

## FAQs

- Q1: How do I search for a Pokemon?
- A1: On the Pokedex App homepage, you'll find a search bar. Simply enter the name of the Pokemon you want to search for and press Enter. The app will fetch the data and display the Pokemon's image and general stats.

- Q2: How accurate is the information displayed?
- A2: The app fetches data from the PokeAPI, which provides accurate and up-to-date information about Pokemon.

- Q3: Can I search for Pokemon using their Pokedex numbers?
- A3: Yes, in addition to searching by Pokemon names, the app also supports searching by the Pokedex ID numbers of Pokemon. Simply enter either the name or the ID number in the search bar to retrieve information about the desired Pokemon.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to fork the repository and submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.
