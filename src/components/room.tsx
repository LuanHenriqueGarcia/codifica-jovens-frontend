import React, { useState, useEffect } from 'react';
import '../assets/css/style.css';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';

const Home: React.FC = () => {
  const [currentIndex] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [studentList, setStudentList] = useState<string[]>([]);
  const [forumPosts, setForumPosts] = useState<any[]>([]); // Lista de posts no fórum
  const [newQuestion, setNewQuestion] = useState<string>(''); // Pergunta a ser feita

  useEffect(() => {
    const menuIcon = document.querySelector('#menu-icon') as HTMLElement | null;
    const navbar = document.querySelector('.navbar') as HTMLElement | null;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header') as HTMLElement | null;

    if (menuIcon && navbar) {
      menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
      };
    }

    const handleScroll = () => {
      sections.forEach((sec) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            document.querySelector(`header nav a[href*=${id}]`)?.classList.add('active');
          });
        }
      });

      if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
      }

      if (menuIcon && navbar) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex]);

  // Fetch user data
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const id = JSON.parse(token)[0]['id'];
          const response = await axios.get(`http://localhost:8000/api/users/${id}`);
          setUserName(response.data.name);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
      }
    };

    fetchUserName();
  }, []);

  // Fetch students list
  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8000/api/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setStudentList(response.data.map((user: any) => user.name));
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error('Erro ao buscar a lista de alunos:', error);
      }
    };

    fetchStudentList();
  }, []);

  // Fetch forum posts
  useEffect(() => {
    const fetchForumPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts');
        setForumPosts(response.data); // Atualiza a lista de posts do fórum
      } catch (error) {
        console.error('Erro ao buscar os posts do fórum:', error);
      }
    };
    ; fetchForumPosts();
  }, []);


  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (token) {
          await axios.post('http://localhost:8000/api/posts', {
          title: 'Nova Dúvida',
          body: newQuestion,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNewQuestion(''); // Limpa o campo após o enviosta de post
        window.location.reload(); // Recarrega a página para atualizar a lis
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error('Erro ao enviar a dúvida:', error);
    }

  };

  return (
    <div>
      <header className="header">
        <a href="#a" className="logo">
          <span style={{ color: '#c9fe00' }}>&lt;</span>od<span style={{ color: '#c9fe00' }}>:</span>fica
          Jo<span id="barra">
            \<span style={{ color: '#c9fe00' }}>/</span>
          </span>ens <span style={{ color: '#c9fe00' }}> _ </span>
        </a>
        <div className="bx bx-menu" id="menu-icon"></div>
        <nav className="navbar">
          <a href="#home" className="active">Aulas</a>
          <a href="#about">Dúvidas</a>
          <a href="#education">Turma</a>
          <a href=""><i className='bx bxs-user bx-md'></i></a>
          <span className="active-navbar"></span>
        </nav>
      </header>

      <section className="home2" id="home">
        <div className="home-content">
          <h1>Olá <span>{userName || 'Usuário'}</span></h1>
          <p>Organize seus estudos com facilidade nesta área do aluno! Encontre sua turma, assista às aulas gravadas no seu tempo e interaja com seus colegas no fórum de dúvidas.</p>
        </div>
      </section>

      {/* Seção do fórum de dúvidas */}
      <section className="about" id="about">
        <h1>Fórum de dúvidas</h1>
        <div className='forum'>
          {forumPosts.map((post, index) => (
            <div key={index} className='questions'>
              <p>{post.user.name}</p>
              <div className='response'>
                {post.body}
              </div>
            </div>
          ))}

          {/* Formulário para enviar nova dúvida */}
          <form onSubmit={handleSubmitQuestion}>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Digite sua dúvida aqui"
              required
            />
            <button type="submit">Enviar Dúvida</button>
          </form>
        </div>
      </section>

      <section className="education" id="education">
        <h2 className="heading">Sua <span>Turma</span></h2>
        <ul className='list'>
          {studentList.map((student, index) => (
            <li key={index} className='list-li'>{student}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
