import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/login.css';
import { Link as RouterLink } from 'react-router-dom';


import { Box, Button, FormControl, FormLabel, Input, Container, Alert, VStack } from '@chakra-ui/react';

const API_URL = 'http://localhost:8000/api'; // Ajuste a URL da API

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = () => {
    setMessage(null);

    // Validação básica
    if (!email || !password) {
      setMessage('Email e senha são obrigatórios');
      return;
    }

    axios.post(`${API_URL}/login`, { email, password })
      .then(response => {
        const { token } = response.data as { token: object}; 
        localStorage.setItem('token', JSON.stringify(token)); // Armazena o token no local storage
        setMessage('Login bem-sucedido!');
      })
      .catch(error => {
        setMessage('Falha no login. Verifique suas credenciais.');
      });
  };

    


  return (
    <div className='center'>
       <div className='login'>
    <Container maxW="md" py={6}>
      <Box mb={4} textAlign="center">
        <h2 className='tag'>Login</h2>
      </Box>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            className='credencias'
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input
            className='credencias'
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button onClick={handleLogin}  className='entrar' >Login</Button>
        <div className='cadastrar'>
           Ainda não tem uma conta?
            <Button as={RouterLink} to="/create" mr={4} variant="outline" className='cadastrar-link'>Cadastrar-se</Button>
            </div>
      </VStack>
      {message && <Alert status="info" mt={4}>{message}</Alert>}
    </Container>
    </div>
    </div>
  );
};

export default Login;