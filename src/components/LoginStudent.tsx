
import '../assets/css/login.css';
import React, { useState } from 'react';
import {  Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <div className='center'>
        <div className='login'>
          <h2 className='tag'>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" >Email:</label>
              <input
                className='credencias'
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <input
                className='credencias'
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className='entrar'>Entrar</button>
            <div className='cadastrar'>Ainda não se cadastrou?  
              <Button as={RouterLink} to="/cadastrar" mr={4} variant="outline" className='cadastrar-link' >Cadastrar</Button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

