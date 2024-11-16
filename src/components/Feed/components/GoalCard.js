const GoalCard = ({ goal, onClose, onEdit }) => {
    const { image, name, totalBooks, startDate, endDate, status, books = [] } = goal;
  
    const completedBooksCount = books.filter(book => book.currentPage === book.totalPages).length;
  
    const progressPercentage = (completedBooksCount / totalBooks) * 100;
  
    const currentStatus = progressPercentage === 100 ? "Concluído" : status;
  
    const completionDate = progressPercentage === 100 && !endDate ? new Date().toLocaleDateString() : endDate;
  
    const handleClose = (e) => {
      e.stopPropagation(); // Impede a propagação do evento de clique para o onEdit
      onClose();
    };
  
    return (
      <div className="book-card" onClick={() => onEdit(goal)}>
        <button className="card-close" onClick={handleClose} aria-label="Close card">X</button>
        <img src={image} alt={name} />
        <h2>{name}</h2>
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
            marginTop: '5px'
          }}
        >
          {`${progressPercentage.toFixed(2)}%`}
        </div>
        <p><strong>Data de Início:</strong> {startDate}</p>
        <p><strong>Data de Término:</strong> {completionDate}</p>
        <p><strong>Status:</strong> {currentStatus}</p>
  
        {books.length > 0 && (
          <div>
            <h3>Livros nesta Meta:</h3>
            <ul>
              {books.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
