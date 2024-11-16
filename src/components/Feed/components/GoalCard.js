import React from 'react';

const getProgressBarColor = (progress) => {
  if (progress < 20) return '#FF4C4C';
  if (progress < 40) return '#FF8C4C';
  if (progress < 60) return '#FFD74C';
  if (progress < 80) return '#B2FF4C';
  return '#4CFF4C';
};

const GoalCard = ({ goal, onClose, onEdit }) => {
  const { image, name, totalBooks = 0, startDate, endDate, status = "Pendente", books = [] } = goal;

  const completedBooksCount = books.filter((book) => book.currentPage === book.totalPages).length;

  // Calcula o progresso, tratando casos onde totalBooks é 0
  const progressPercentage = totalBooks > 0 ? (completedBooksCount / totalBooks) * 100 : 0;

  // Determina o status atual
  const currentStatus = progressPercentage === 100 ? "Concluído" : status;

  // Define a data de conclusão, se aplicável
  const completionDate =
    progressPercentage === 100 && !endDate ? new Date().toLocaleDateString() : endDate || "Não definido";

  return (
    <div className="book-card" onClick={() => onEdit(goal)} style={{ cursor: 'pointer' }}>
      <button className="card-close" onClick={(e) => {
        e.stopPropagation(); // Evita que o clique feche o card ao editar
        onClose();
      }} aria-label="Close card">
        X
      </button>
      <img src={image || '/placeholder.png'} alt={name || 'Imagem não disponível'} />
      <h2>{name || 'Meta Sem Nome'}</h2>
      <p><strong>Livros a Ler:</strong> {completedBooksCount}/{totalBooks}</p>
      <p><strong>Progresso:</strong> {progressPercentage.toFixed(2)}%</p>
      <div
        style={{
          width: '100%',
          height: '20px',
          backgroundColor: getProgressBarColor(progressPercentage),
          borderRadius: '8px',
          textAlign: 'center',
          color: 'white',
          marginTop: '5px',
        }}
      >
        {`${progressPercentage.toFixed(2)}%`}
      </div>
      <p><strong>Data de Início:</strong> {startDate || "Não definida"}</p>
      <p><strong>Data de Término:</strong> {completionDate}</p>
      <p><strong>Status:</strong> {currentStatus}</p>

      {books.length > 0 && (
        <div>
          <h3>Livros nesta Meta:</h3>
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                {book.name || `Livro ${index + 1}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoalCard;
