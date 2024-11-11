import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import './App.css';

interface User {
  username: string;
  password: string;
}

const App: React.FC = () => {
  // State for managing user data and game status
  const [users, setUsers] = useState<User[]>([]);
  const [player1, setPlayer1] = useState<User | null>(null);
  const [player2, setPlayer2] = useState<User | null>(null);
  const [isGameReady, setIsGameReady] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // State for managing registration and login fields
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginPlayer1Username, setLoginPlayer1Username] = useState('');
  const [loginPlayer1Password, setLoginPlayer1Password] = useState('');
  const [loginPlayer2Username, setLoginPlayer2Username] = useState('');
  const [loginPlayer2Password, setLoginPlayer2Password] = useState('');

  // Fetch users from the backend
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleRegistrationComplete = (username: string, password: string) => {
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      alert('User already exists. Please log in.');
      setShowRegister(false);
      setError(null);
      return;
    }

    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('User already exists');
        }
        return res.json();
      })
      .then(() => {
        alert('Registration successful!');
        setShowRegister(false);
        setError(null);
        setRegisterUsername('');
        setRegisterPassword('');
        return fetch('http://localhost:3001/users'); 
      })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => setError(err.message));
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      const data = await response.json();
      setUsers(data);
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const handleLogin = async (
    username1: string,
    password1: string,
    username2: string,
    password2: string
  ) => {
    const data = await fetchUsers();
    const validPlayer1 = data.find(
      (user: User) => user.username === username1 && user.password === password1
    );
    const validPlayer2 = data.find(
      (user: User) => user.username === username2 && user.password === password2
    );

    if (validPlayer1 && validPlayer2) {
      setPlayer1(validPlayer1);
      setPlayer2(validPlayer2);
      setIsGameReady(true);
      setError(null);
    } else {
      setError('Invalid credentials for one or both players.');
    }
  };

  const handleGameEnd = (gameWinner: string | null) => {
    setWinner(gameWinner);
  };

  const resetGame = () => {
    setPlayer1(null);
    setPlayer2(null);
    setIsGameReady(false);
    setWinner(null);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
    setLoginPlayer1Username('');
    setLoginPlayer1Password('');
    setLoginPlayer2Username('');
    setLoginPlayer2Password('');
    setError(null);
  };

  const handleBackToRegister = () => {
    setShowRegister(true);
    setRegisterUsername('');
    setRegisterPassword('');
    setError(null);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      {!isGameReady ? (
        <>
          {showRegister ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegistrationComplete(registerUsername, registerPassword);
              }}
            >
              <h2>Register</h2>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
              <button type="submit">Register</button>
              <button type="button" onClick={handleBackToLogin}>Back to Login</button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const username1 = loginPlayer1Username;
                const password1 = loginPlayer1Password;
                const username2 = loginPlayer2Username;
                const password2 = loginPlayer2Password;
                handleLogin(username1, password1, username2, password2);
              }}
            >
              <h3>Player 1</h3>
              <input
                name="player1Username"
                type="text"
                placeholder="Username"
                value={loginPlayer1Username}
                onChange={(e) => setLoginPlayer1Username(e.target.value)}
                required
              />
              <input
                name="player1Password"
                type="password"
                placeholder="Password"
                value={loginPlayer1Password}
                onChange={(e) => setLoginPlayer1Password(e.target.value)}
                required
              />
              <h3>Player 2</h3>
              <input
                name="player2Username"
                type="text"
                placeholder="Username"
                value={loginPlayer2Username}
                onChange={(e) => setLoginPlayer2Username(e.target.value)}
                required
              />
              <input
                name="player2Password"
                type="password"
                placeholder="Password"
                value={loginPlayer2Password}
                onChange={(e) => setLoginPlayer2Password(e.target.value)}
                required
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button type="submit">Start Game</button>
              <button type="button" onClick={handleBackToRegister}>Register</button>
              <h5>Register if you are a new User.</h5>
            </form>
          )}
        </>
      ) : (
        <div>
          <h3>{player1?.username} (X) vs {player2?.username} (O)</h3>
          <GameBoard onGameEnd={handleGameEnd} />
          {winner && (
            <h4>
              {winner === 'Draw'
                ? 'It\'s a draw!'
                : winner === 'X'
                ? `${player1?.username} wins!`
                : `${player2?.username} wins!`}
            </h4>
          )}
          <button id="quitGame"onClick={resetGame}>Quit Game</button>
        </div>
      )}
    </div>
  );
};

export default App;