import React, { useState, useEffect } from 'react';
import '../assets/css/style.css';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';

const Home: React.FC = () => {
  const [currentIndex] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [studentList, setStudentList] = useState<string[]>([]);

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
          setStudentList(response.data.map((user: any) => user.name)); // Atualize a lista de alunos
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error('Erro ao buscar a lista de alunos:', error);
      }
    };

    fetchStudentList();
  }, []);

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
          <h1>Olá <span>{userName || 'Usuário'}</span> </h1>
          <p>Organize seus estudos com facilidade nesta área do aluno! Encontre sua turma, assista às aulas gravadas no seu tempo e interaja com seus colegas no fórum de dúvidas.</p>

        </div>
      </section>

      <section className="about" id="about">
        <h2>Fórum de Dúvidas</h2>
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
