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

    if (!name) setFormErrors(errors => ({ ...errors, name: 'Nome é obrigatório' }));
    if (!email) setFormErrors(errors => ({ ...errors, email: 'Email é obrigatório' }));
    if (!password) setFormErrors(errors => ({ ...errors, password: 'Senha é obrigatória' }));

    if (Object.keys(formErrors).length > 0) return;

    axios.post(`${API_URL}/users`, { name, email, password })
      .then(response => {
        setMessage('Usuário criado com sucesso!');
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login');
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
            {formErrors.name && <p>{formErrors.name}</p>}
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
            {formErrors.email && <p>{formErrors.email}</p>}
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
            {formErrors.password && <p>{formErrors.password}</p>}
            {message && <p className='red'>{message}</p>}
          </div>
          <button type="submit" className='entrar'>Cadastrar</button>
          <div className='cadastrar'>
            Já tem uma conta?
            <Button as={RouterLink} to="/login" mr={4} variant="outline" className='cadastrar-link'>Entrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
