import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, List, ListItem, Alert } from '@chakra-ui/react';

interface User {
  id: number;
  name: string;
  email: string;
}

const API_URL = 'http://localhost:8000/api'

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>  ([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<User[]>(`${API_URL}/api`)
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })  
      .catch(error => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <Alert status="error">{error}</Alert>;

  return (
    <Container>
      <Box mb={4}>
        <h2>Lista de Usuarios</h2>
      </Box>
      <List spacing={3}>
        {users.map(user => (
          <ListItem key={user.id} p={3} shadow="md" borderWidth="1px">
            {user.name} - {user.email}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserList;
