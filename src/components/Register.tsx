import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { register } from '../dataProvider';
import { useNavigate } from 'react-router-dom';

const Background = styled(Box)({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: `url(images/ap.png)`, // Utilisez l'URL de votre image de fond
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const RegisterBox = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.50)',
  padding: '2rem',
  borderRadius: '8px',
  backdropFilter: 'blur(10px)',
  textAlign: 'center',
  width: '300px',
});

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const result = await register(username, email, password);
      console.log('Registration successful', result);
      navigate('/login'); // Redirection vers la page de connexion
    } catch (e) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Background>
      <RegisterBox>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Button href="/login">Login</Button>
        </Typography>
      </RegisterBox>
    </Background>
  );
};

export default Register;
