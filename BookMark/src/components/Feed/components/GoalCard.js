import React from 'react';

const getProgressBarColor = (progress) => {
    if (progress < 20) return '#FF4C4C'; 
    if (progress < 40) return '#FF8C4C'; 
    if (progress < 60) return '#FFD74C'; 
    if (progress < 80) return '#B2FF4C'; 
    return '#4CFF4C'; 
};

const GoalCard = ({ goal, onClose }) => {
    const { image, name, totalBooks, startDate, endDate, status, books = [] } = goal;

    const completedBooksCount = books.filter(book => book.currentPage === book.totalPages).length;

    const progressPercentage = (completedBooksCount / totalBooks) * 100;

    const currentStatus = progressPercentage === 100 ? "Concluído" : status;

    const completionDate = progressPercentage === 100 && !endDate ? new Date().toLocaleDateString() : endDate;

    return (
        <div className="book-card">
            <button className="card-close" onClick={onClose} aria-label="Close card">X</button>
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

export default GoalCard;
