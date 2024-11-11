# Tic-Tac-Toe Game

## Introduction
This project is a web-based Tic-Tac-Toe game where two players can play against each other on a classic 3x3 grid. Players can register and log in, with their data securely stored in a MySQL database. The game features a responsive user interface, real-time move validation, and automatic detection of winning and draw conditions.

## Technologies Used
- **Backend**: Node.js – Handles user management and API endpoints.
- **Database**: MySQL – Stores user data and game records.
- **Frontend**: React with TypeScript – Provides a responsive, interactive interface with game logic.

## Features
- **User Registration/Login**: Players register before playing, and their details are stored in MySQL.
- **Game Board**: A 3x3 grid where players place their "X" or "O" symbols.
- **Turn-Based System**: Players alternate turns, with moves validated to prevent overwriting previous moves.
- **Winning/Draw Detection**: Automatically checks for three consecutive symbols in any direction or a draw when the grid is full.

## Setup & Installation

1. **Database SetUp**:
    - Create database and use it:
   ```
   CREATE DATABASE tictactoe;
   USE tictactoe;
   ```
   - Create table named users:
   ```
   CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
    );
    ```

2. **Backend Setup**:
   - Configure `.env` file for MySQL connection (example):
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=TicTacToe
     ```
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install the backend dependencies:
     ```
     npm install
     ```
   
   - Start the backend server:
     ```
     node server.js
     ```

3. **Frontend Setup**:
   - Open a new terminal and navigate to the frontend directory:
     ```
     cd frontend
     ```
   - Install the frontend dependencies:
     ```
     npm install
     ```
   - Start the frontend server:
     ```
     npm start
     ```

## Usage
- Open a browser and navigate to `http://localhost:3000` to access the Tic-Tac-Toe game.
- Register two users, log in, and start the game.
