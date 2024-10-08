import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Student {
  id: number; // ou string, conforme seu banco de dados
  name: string;
}

const ListUser: React.FC = () => {
  const [studentList, setStudentList] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const response = await axios.get('/api/students'); // Ajuste a URL se necessário
        console.log('Lista de alunos:', response.data); // Log para verificar o retorno
        setStudentList(response.data);
      } catch (error) {
        console.error('Erro ao buscar a lista de alunos:', error);
      }
    };

    fetchStudentList();
  }, []);

  const deleteUser = (id: number) => {
    axios.delete(`/api/users/${id}`)
      .then((response) => {
        console.log('Usuário deletado:', response.data);
        // Aqui você pode atualizar a lista de usuários no frontend após a exclusão
        setStudentList((prevList) => prevList.filter((student) => student.id !== id)); // Atualiza a lista local
      })
      .catch((error) => {
        console.error('Erro ao deletar o usuário:', error);
      });
  };

  return (
    <section className="education" id="education">
      <h2 className="heading"><span>Turmas</span></h2>
      <ul className='list'>
        {studentList.length > 0 ? (
          studentList.map((student) => (
            <li key={student.id} className='list-li'>
              <div className='student-container'>
                <span className='student-name'>{student.name}</span>
                <button className='delete' onClick={() => deleteUser(student.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className='list-li'>Nenhum aluno encontrado.</li>
        )}
      </ul>
    </section>
  );
};

export default ListUser;
