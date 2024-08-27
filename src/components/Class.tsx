import React, { useState, useEffect } from 'react';
import '../assets/css/login.css';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Container, Alert, VStack } from '@chakra-ui/react';



function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='center'>
    <div className='login'>
    <Container maxW="md" py={6}>
      <Box mb={4} textAlign="center">
        <h2 className='tag'>Avaliações</h2>
      </Box>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel htmlFor="email">Excel</FormLabel>
          <div className="progress">
                  <h3>qualidade <span>0%</span></h3>
                  <div className="bar">
                    </div>
                    </div>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input
            className='credencias'
            id="password"
            type="password"
      
          />
        </FormControl>
      
      </VStack>

    </Container>
 </div>

 </div>
  );
}

export default UserList;