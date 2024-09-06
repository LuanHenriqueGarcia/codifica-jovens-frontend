import '../assets/css/login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api';

const CreateUser: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setMessage(null);

    const errors: { name?: string; email?: string; password?: string } = {};
    if (!name) errors.name = 'Nome é obrigatório';
    if (!email) errors.email = 'Email é obrigatório';
    if (!password) errors.password = 'Senha é obrigatória';

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;


    axios.post(`${API_URL}/users`, { name, email, password })
      .then(() => {
        // Após criar o usuário, faz login automaticamente
        axios.post(`${API_URL}/login`, { email, password })
          .then(response => {
            const { token } = response.data;
            localStorage.setItem('token', JSON.stringify(token));
            setMessage('Usuário criado com sucesso e login realizado!');
            setName('');
            setEmail('');
            setPassword('');
            navigate('/room');
          })
          .catch(error => {
            console.log(error);
            setMessage('Usuário criado, mas falha ao fazer login.');
          });
      })
      .catch(error => {
        console.log(error);
        const errorMsg = error.response?.data?.message || 'Falha ao criar usuário';
        setMessage(errorMsg);
      });
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
            />
            {formErrors.name && <p className='red'>{formErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className='credencias'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && <p className='red'>{formErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              className='credencias'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && <p className='red'>{formErrors.password}</p>}
          </div>
          {message && <p className='red'>{message}</p>}
          <button type="submit" className='entrar'>Cadastrar</button>
          <div className='cadastrar'>
            Já tem uma conta?
            <Button as={RouterLink} to="/login" mr={4} variant="outline" className='cadastrar-link'>
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
