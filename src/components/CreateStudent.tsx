
import '../assets/css/login.css';
import React, { useState } from 'react';
import {  Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para processar o cadastro
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Simulação de envio ao backend
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className='center'>
      <div className='login'>
        <h2 className='tag'>Cadastrar</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              className='credencias'
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
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
          <button type="submit" className='entrar'>Cadastrar</button>
          <div className='cadastrar'>Já tem uma conta   ?  
              <Button as={RouterLink} to="/Login" mr={4} variant="outline" className='cadastrar-link' >Entrar</Button>
              </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
