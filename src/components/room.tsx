import React, { useState, useEffect } from 'react';
import '../assets/css/style.css';     
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';

const Home: React.FC = () => {
  const [currentIndex] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [studentList, setStudentList] = useState<string[]>([]);
  const [forumPosts, setForumPosts] = useState<any[]>([]); 
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newResponse, setNewResponse] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // Obter dados 
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

  // Obter lista
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
          setStudentList(response.data.map((user: any) => user?.name));
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error('Erro ao buscar a lista de alunos:', error);
      }
    };

    fetchStudentList();
  }, []);

  // Obter dados
  useEffect(() => {
    const fetchForumPosts = async () => {
      setIsLoading(true)

      try {
        const tokenStorage = localStorage.getItem('token');

        if (tokenStorage) {
          const token = JSON.parse(tokenStorage)[1]['plainTextToken'];
          const response = await axios.get('http://localhost:8000/api/posts', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setForumPosts(response.data);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error('Erro ao buscar os posts do fórum:', error);
      }
      finally {
        setIsLoading(false)
      }
    };

    fetchForumPosts();
  }, []);

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tokenStorage = localStorage.getItem('token');

      if (tokenStorage) {
        const token = JSON.parse(tokenStorage)[1]['plainTextToken'];
        await axios.post('http://localhost:8000/api/posts', {
          title: 'Nova Dúvida',
          body: newQuestion,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNewQuestion('');
        window.location.reload();
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error('Erro ao enviar a dúvida:', error);
    }

  };

  const handleSubmitResponse = async (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    try {
      const tokenStorage = localStorage.getItem('token');
      if (tokenStorage) {
        const token = JSON.parse(tokenStorage)[1]['plainTextToken'];
        await axios.post(`http://localhost:8000/api/posts/${postId}/comments`, {
          body: newResponse[postId],
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNewResponse((prev) => ({ ...prev, [postId]: '' }));
        window.location.reload();
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error('Erro ao enviar a resposta:', error);
    }
  };

  console.log(forumPosts)

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
          <a href="#home" className="active">Home</a>
          <a href="#about">Avaliações</a>
          <a href="#education">Turma</a>
          <img src="../assets/img/user.png" alt="" /> 
        <span className="active-navbar"></span>
        </nav>
      </header>
      <section className="home2" id="home">
        <div className="home-content">
        <div className="area" >
         <ul className="circles">
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
        </ul>
    </div >
          <h1>Olá <span>{userName || 'Usuário'}</span></h1>
          <p>Veja a sua turma e deixe sua avaliação! Esta é a oportunidade de compartilhar sua opinião e ajudar a melhorar a experiência de todos. Avalie seus colegas e contribua para o desenvolvimento de um ambiente mais colaborativo e produtivo.
          </p>
        </div>
      </section>
      <section className="about" id="about">
        <h1>Avaliações</h1>
        <div className='forum'>

          {isLoading ? (<p className='loader'></p>) : (forumPosts.map((post, index) => (
            <div key={index} className='teste'>
              <div className='questions'>
                <div className='response'>
                  <p className='title'>avaliação de {userName}</p>
                  <p className='texto'>{post.body}</p>
                  <div className='line'>

                  </div>
                </div>
                <form onSubmit={(e) => handleSubmitResponse(e, post.id)}>
                </form>
              </div>
            </div>
          )))}

        </div>

        <div className='teste1'>
          <form
            className='form-submit'
            onSubmit={handleSubmitQuestion}>
            <div className='textarea-field'>
              <textarea
                className='caixa-duvidas'
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Digite sua avalição aqui..."
                required
              />
            </div>
            <div className="btn-box" id='enviar-pergunta'>
              <button type="submit" className='btn' id='btn-av'>Enviar Avaliação</button>
            </div>
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

      <footer className="footer">
        <div className="footer-text">
          <p>&copy; 2024 - Luan Henrique</p>
        </div>

        <div className="footer-icorTop">
          <a href="#menu-icon" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <i className='bx bx-up-arrow-alt'></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
