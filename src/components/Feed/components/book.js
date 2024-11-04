import React from 'react';

function Book({ book }) {
  if (!book) {
    return null; 
  }

  const { 
    currentPage = 0, 
    totalPages = 0, 
    name = 'Nome desconhecido', 
    author = 'Autor desconhecido', 
    genre = 'Gênero não especificado', 
    status = 'Status desconhecido', 
    image, 
    rating = 'Sem avaliação' 
  } = book;

  const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0; 

  const getProgressBarColor = (progress) => {
    if (progress < 20) return '#FF4C4C'; 
    if (progress < 40) return '#FF8C4C'; 
    if (progress < 60) return '#FFD74C'; 
    if (progress < 80) return '#B2FF4C'; 
    return '#4CFF4C'; 
  };

  return (
    <div className="book-card">
      {image ? (
        <img src={image} alt={name} className="book-image" />
      ) : (
        <div className="book-image-placeholder">No Image</div>
      )}
      <h3>{name}</h3>
      <p>{author}</p>
      <p className="text-card">{genre}</p>
      <p className="text-card">{status}</p>
      <p>{currentPage} / {totalPages} páginas</p>
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ 
            width: `${progress}%`, 
            backgroundColor: getProgressBarColor(progress) 
          }} 
        />
      </div>
      <p>{Math.round(progress)}% concluído</p>
      <p className="text-card">{rating}</p>
    </div>
  );
}

export default Book;
