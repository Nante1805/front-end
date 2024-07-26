import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { login } from '../dataProvider';
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

const LoginBox = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.50)',
  padding: '2rem',
  borderRadius: '8px',
  backdropFilter: 'blur(10px)',
  textAlign: 'center',
  width: '300px',
});

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await login(username, password);
      console.log('Login successful', result);
      navigate('/dashboard'); // Redirection vers le tableau de bord
    } catch (e) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Background>
      <LoginBox>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            endAdornment: (
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon />
              </Box>
            ),
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <LockIcon />
              </Box>
            ),
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <FormControlLabel
          control={<Checkbox name="remember" color="primary" />}
          label="Remember me"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button href="#" size="small">
            Forgot password?
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don&apos;t have an account? <Button href="/register">Register</Button>
        </Typography>
      </LoginBox>
    </Background>
  );
};

export default Login;
