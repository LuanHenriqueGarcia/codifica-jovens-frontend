import React, { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';

const Room: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    axios.get('/api/topics', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(response => {
      setTopics(response.data);
    });
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const id = JSON.parse(token)[0]['id'];
          const response = await axios.get(`http://localhost:8000/api/users/${id}`);
          setUserName(response.data.name);
        } else {
          window.location.href = "http://localhost:3000/login";
        }
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
      }
    };

    fetchUserName();
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
          <a href="#about">Forum</a>
          <a href="#education">Turma</a>
          <a href="#skills">Dúvidas</a>
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
        <h2 className="heading">Próximas <span>Aulas</span></h2>
        <div className="education-row">
          <div className="education-column">
            <h3 className="title">Presencial</h3>
            <div className="education-box">
              <div className="education-content">
                <div className="content">
                  <div className="year"><i className='bx bxs-calendar'></i>10/08/2024</div>
                  <h3>Umuarama - PR</h3>
                  <p>Realidade virtual</p>
                </div>
              </div>

              <div className="education-content">
                <div className="content">
                  <div className="year"><i className='bx bxs-calendar'></i>14/09/2024</div>
                  <h3>Umuarama - PR</h3>
                  <p>Robótica</p>
                </div>
              </div>

              <div className="education-content">
                <div className="content">
                  <div className="year"><i className='bx bxs-calendar'></i>19/10/2024</div>
                  <h3>Umuarama - PR</h3>
                  <p>Robótica</p>
                </div>
              </div>
            </div>
          </div>

          <div className="education-column">
            <h3 className="title">Online</h3>
            <div className="education-box">
              <div className="education-content">
                <div className="content">
                  <div className="year"><i className='bx bxs-calendar'></i>24/08/2024</div>
                  <h3>Douradina - PR</h3>
                  <p>Realidade virtual</p>
                </div>
              </div>

              <div className="education-content">
                <div className="content">
                  <div className="year"><i className='bx bxs-calendar'></i>28/09/2024</div>
                  <h3>Douradina - PR</h3>
                  <p>Robótica</p>
                </div>
              </div>

              <div className="education-content">
                <div className="content">
                  <div className="year"><i className='bx bxs-calendar'></i>26/10/2024</div>
                  <h3>Douradina - PR</h3>
                  <p>Robótica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Room;
