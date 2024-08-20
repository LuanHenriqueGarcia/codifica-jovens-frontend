import React, { useState } from 'react';
import '../assets/css/style.css'; 



interface Video {
  title: string;
  date: string;
  src: string;
}



const Aula: Video[] = [
  {
    title: 'Módulo Word',
    date: '20/04/2024',
    src: 'https://drive.google.com/file/d/1ZhD3aa46-jnBxVlplLFBHN0gy36asgOQ/preview'
  },
  {
    title: 'Módulo Word',
    date: '20/04/2024',
    src: 'https://drive.google.com/file/d/1ceoHnD5_gpa--oagGBBf6JcYTCkjmkKg/preview'
  },
  {
    title: 'Módulo Excel',
    date: '25/05/2024',
    src: 'https://drive.google.com/file/d/1OFSQIukMVU44psbgijnupOX92Dg51SKW/preview'
  },
  {
    title: 'Módulo Excel',
    date: '08/06/2024',
    src: 'https://drive.google.com/file/d/1XCCHqAqHVIJFLcxfqZRRal3Copa9QUKr/preview'
  },
  {
    title: 'Módulo Excel',
    date: '17/06/2024',
    src: 'https://drive.google.com/file/d/1aNDfdN8DGvgfhtvWE27oJ8VNzBKzjdx-/preview'
  },
  {
    title: 'Módulo Realidade Virtual e Aumentada',
    date: '11/07/2024',
    src: 'https://drive.google.com/file/d/1_Xf20RCeFK2vtHX9iC1GHCb15CxxZ8yD/preview'
  }
];

const Videos: React.FC = () => {
  const [visibleVideo, setVisibleVideo] = useState<string | null>(null);

  const handleButtonClick = (src: string) => {
    setVisibleVideo(src);
  };

  return (
    <section className="videos" id="videos">
      <h2 className="heading">Aulas <span>Em Vídeo</span></h2>
      <div className="video-container">
        {Aula.map((video, index) => (
          <div className="video-item" key={index}>
            <div className="video-overlay">
              <h3>{video.title} <i className='bx bxs-calendar'></i>{video.date}</h3>
              <button onClick={() => handleButtonClick(video.src)}>Assistir Aula</button>
            </div>
            {visibleVideo === video.src && (
              <iframe
                src={video.src}
                frameBorder="0"
                allowFullScreen
                title={video.title}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Videos;
