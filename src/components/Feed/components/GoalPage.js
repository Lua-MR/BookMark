import React, { useState, useRef, useEffect } from 'react';
import GoalCard from './GoalCard';

const initialGoalState = {
  image: '',
  name: '',
  totalBooks: 0,
  startDate: '',
  endDate: '',
  status: 'Em andamento',
  books: [], // Associar livros à meta
};

const GoalPage = ({ books }) => {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null); // Meta atual para edição
  const [availableBooks, setAvailableBooks] = useState([]); // Livros disponíveis para adicionar à meta
  const [selectedBook, setSelectedBook] = useState(''); // Livro selecionado para adicionar à meta
  const [statusInput, setStatusInput] = useState('');
  const [isStatusInputVisible, setIsStatusInputVisible] = useState(false);

  const statusOptions = ['Em andamento', 'Concluído', 'Pausado'];
  const imageInputRef = useRef(null);

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
    setGoals(savedGoals);
    setAvailableBooks(books); // Inicializa os livros disponíveis
  }, [books]);

  const saveGoalsToLocalStorage = (updatedGoals) => {
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const openModal = (goal = null) => {
    setCurrentGoal(goal || { ...initialGoalState, id: Date.now() });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGoal(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setCurrentGoal((prevGoal) => ({ ...prevGoal, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const saveGoal = () => {
    if (!currentGoal.name || !currentGoal.totalBooks) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const updatedGoals = goals.some((goal) => goal.id === currentGoal.id)
      ? goals.map((goal) => (goal.id === currentGoal.id ? currentGoal : goal))
      : [...goals, currentGoal];

    setGoals(updatedGoals);
    saveGoalsToLocalStorage(updatedGoals);
    closeModal();
  };

  const deleteGoal = () => {
    const updatedGoals = goals.filter((goal) => goal.id !== currentGoal.id);
    setGoals(updatedGoals);
    saveGoalsToLocalStorage(updatedGoals);
    closeModal();
  };

  const addBookToGoal = () => {
    if (!selectedBook) return;

    setCurrentGoal((prevGoal) => ({
      ...prevGoal,
      books: [...prevGoal.books, selectedBook],
    }));
    setSelectedBook('');
  };

  return (
    <div className="library-screen">
      <h1>Metas de Leitura</h1>
      <div className="book-list">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onClose={() => openModal(goal)}
            />
          ))
        ) : (
          <p>Nenhuma meta adicionada ainda</p>
        )}
        <button className="add-book-button" onClick={() => openModal()}>
          +
        </button>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="modal-close" onClick={closeModal}>
                X
              </button>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div className="modal-left">
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    ref={imageInputRef}
                  />
                  <button
                    className="add-image-button"
                    onClick={() => imageInputRef.current.click()}
                  >
                    🖼️ Capa
                  </button>
                  {currentGoal?.image && (
                    <img
                      src={currentGoal.image}
                      alt="Preview"
                      style={{ width: '100px', height: '100px' }}
                    />
                  )}
                </div>

                <div className="modal-right">
                  <label>Nome da Meta</label>
                  <input
                    type="text"
                    name="name"
                    value={currentGoal?.name || ''}
                    onChange={handleInputChange}
                    placeholder="Nome da meta"
                  />

                  <label>Total de Livros</label>
                  <input
                    type="number"
                    name="totalBooks"
                    value={currentGoal?.totalBooks || ''}
                    onChange={handleInputChange}
                    placeholder="Total de livros"
                  />

                  <label>Data de Início</label>
                  <input
                    type="date"
                    name="startDate"
                    value={currentGoal?.startDate || ''}
                    onChange={handleInputChange}
                  />

                  <label>Data de Término</label>
                  <input
                    type="date"
                    name="endDate"
                    value={currentGoal?.endDate || ''}
                    onChange={handleInputChange}
                  />

                  <label>Adicionar Livro</label>
                  <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                  >
                    <option value="">Selecione um livro</option>
                    {availableBooks.map((book, index) => (
                      <option key={index} value={book.name}>
                        {book.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={addBookToGoal}>Adicionar</button>

                  <label>Status</label>
                  <input
                    type="text"
                    placeholder="Status"
                    value={currentGoal?.status || ''}
                    onFocus={() => setIsStatusInputVisible(true)}
                  />

                  {isStatusInputVisible && (
                    <ul className="status-list">
                      {statusOptions.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setCurrentGoal((prevData) => ({
                              ...prevData,
                              status: option,
                            }));
                            setIsStatusInputVisible(false);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div style={{ marginTop: '20px' }}>
                    <button onClick={saveGoal} style={{ marginRight: '10px' }}>
                      Salvar
                    </button>
                    {currentGoal?.id && (
                      <button onClick={deleteGoal}>Deletar</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalPage;
