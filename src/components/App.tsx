

import React, { useState, useEffect } from 'react';
import '../assets/css/style.css';
import 'boxicons/css/boxicons.min.css';
import imageToAdd from "./../assets/img/image.png";
import imageToAdd2 from "./../assets/img/image1.png";


const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const generos = ["Professora ", "Professor "];
  const texts = ["Realidade virtual, Robótica e IA", "Word, Excel e Lógica de programação"];
  const images = [imageToAdd, imageToAdd2];
  const names = ["Eduarda", "Cleber"];

  const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const nextIndex = (currentIndex + 1) % texts.length;
    setCurrentIndex(nextIndex);

    document.getElementById("professor-genero")!.innerText = generos[nextIndex];
    document.getElementById("professor-name")!.innerText = names[nextIndex];
    document.getElementById("content-text")!.innerText = texts[nextIndex];
  };

  useEffect(() => {
    const menuIcon = document.querySelector('#menu-icon') as HTMLElement;
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    };

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

      const header = document.querySelector('header') as HTMLElement;
      header.classList.toggle('sticky', window.scrollY > 100);

      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    };

    window.onscroll = handleScroll;

    return () => {
      window.onscroll = null;
    };
  }, [currentIndex]);




  return (
    <div>
      <header className="header">
        <a href="#a" className="logo">
          <span style={{ color: '#c9fe00' }}>&lt;</span>od<span style={{ color: '#c9fe00' }}>: </span>fica
          Jo<span id="barra">
            \<span style={{ color: '#c9fe00' }}>/</span>
          </span>ens <span style={{ color: '#c9fe00' }}> _ </span>
        </a>
        <div className="bx bx-menu" id="menu-icon"></div>
        <nav className="navbar">
          <a href="#home" className="active">Home</a>
          <a href="#about">Professores</a>
          <a href="#education">Calendário</a>
          <a href="#skills">Progresso</a>
          <a href="#contact">Contato</a>
          <span className="active-navbar"></span>
        </nav>
      </header>

      <section className="home" id="home">
        <div className="home-content">
          <h1>Olá <span> TECH,</span> tudo bem?</h1>
          <div className="text-animate">
            <h3>Meu nome é Luan</h3>
          </div>
          <p>Eu estou aqui para apresentar a ideia que já está em prática. Uma parceria entre as empresas Gazin e Unipar, com o propósito de preparar jovens para o futuro.</p>
          <div className="btn-box">
            <a href="videos.tsx" className="btn">turmas</a>
            <a href="videos.tsx" className="btn">Aulas</a>
          </div>
        </div>

        <div className="home-sci">
          <a href="https://github.com/LuanHenriqueGarcia"><i className='bx bxl-github'></i></a>
          <a href="https://www.instagram.com/luangarcia.bjj/"><i className='bx bxl-instagram '></i></a>
          <a href="https://discord.gg/3MYx2rt6"><i className='bx bxl-discord-alt'></i></a>
        </div>
      </section>

      <section className="about" id="about">
        <h2 className="heading">
          <span id="professor-genero" className="white">{generos[currentIndex]}</span>
          <span id="professor-name">{names[currentIndex]}</span>
        </h2>
        <div className="about-img">
          <span className="circle-spin"></span>
          <img src={images[currentIndex]} alt={names[currentIndex]} />
        </div>
        <div className="about-content" id='teste'>
          <h3>Matérias:</h3>
          <p id="content-text">{texts[currentIndex]}</p>
          <div className="btn-box btns">
            <a href="#teste" className="btn" id="next-btn" onClick={handleNextClick}>Próximo</a>
          </div>
        </div>
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
            <h3 className="title">online</h3>
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

      <section className="skills" id="skills">
        <h2 className="heading">Progresso<span> 2024</span></h2>
        <div className="skills-row">
          <div className="skills-column">
            <h3 className="title">1º Bimestre</h3>
            <div className="skills-box">
              <div className="skills-content">
                <div className="progress">
                  <h3>Introducão<span></span>100%</h3>
                  <div className="bar">
                    <span>a</span>
                  </div>
                </div>

                <div className="progress">
                  <h3>Word<span>100%</span></h3>
                  <div className="bar">
                    <span>a</span>
                  </div>
                </div>

                <div className="progress">
                  <h3>Execel<span>100%</span></h3>
                  <div className="bar">
                    <span>a</span>
                  </div>
                </div>

                <div className="progress">
                  <h3>Realidade Virtual<span>75%</span></h3>
                  <div className="bar">
                    <span>a</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-column">
            <h3 className="title">2º Bimestre</h3>
            <div className="skills-box">
              <div className="skills-content">
                <div className="progress">
                  <h3>Robótica <span>0%</span></h3>
                  <div className="bar">
                    <span>a</span>
                  </div>
                </div>

                <div className="progress">
                  <h3>Lógica de programação <span>0%</span></h3>
                  <div className="bar">
                    <span>a</span>
                  </div>
                </div>

                <div className="progress">
                  <h3>Inteligência artificial (IA)<span>0%</span></h3>
                  <div className="bar">
                    <span>a</span>
                  </div>
                </div>

                <div className="progress">
                  <h3>Encerramento <span>0%</span></h3>
                  <div className="bar">
                    <span>a</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="heading">Fale <span>Comigo</span></h2>
        <form action="#">
          <div className="input-box">
            <div className="input-field">
              <input type="text" placeholder="Nome completo" required />
              <span className="focus"></span>
            </div>
            <div className="input-field">
              <input type="text" placeholder="Email" required />
              <span className="focus"></span>
            </div>
          </div>

          <div className="input-box">
            <div className="input-field">
              <input type="number" placeholder="Número de telefone" required />
              <span className="focus"></span>
            </div>
            <div className="input-field">
              <input type="text" placeholder="Tema do Email" required />
              <span className="focus"></span>
            </div>
          </div>

          <div className="textarea-field">
            <textarea cols={30} rows={10} placeholder="Sua Mensagem" required></textarea>
            <span className="focus"></span>
          </div>

          <div className="btn-box btns">
            <button type="submit" className="btn">Enviar</button>
          </div>
        </form>
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


export default App;
