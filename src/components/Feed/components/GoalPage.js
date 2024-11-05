import React, { useState, useRef, useEffect } from 'react';
import GoalCard from './GoalCard';
import mockData from '../../../data/dados.json'; // Certifique-se de que o caminho para o arquivo JSON está correto

const initialGoalState = {
  name: '',
  totalBooks: 0,
  progress: 0,
  progressPercentage: 0,
  status: 'Em andamento',
};

const GoalPage = ({ books }) => {
  const [goals, setGoals] = useState(mockData.goals || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState(initialGoalState);
  const [statusInput, setStatusInput] = useState('');
  const [isStatusInputVisible, setIsStatusInputVisible] = useState(false);

  const statusOptions = ['Em andamento', 'Concluído', 'Pausado'];
  const imageInputRef = useRef(null);

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem('goals'));
    setGoals(Array.isArray(savedGoals) ? savedGoals : mockData.goals);
  }, []);

  const saveGoalsToLocalStorage = (updatedGoals) => {
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const removeGoal = (goalId) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    setGoals(updatedGoals);
    saveGoalsToLocalStorage(updatedGoals);
  };

  const openModal = () => setIsModalOpen(true);
  
  const closeModal = () => {
    setIsModalOpen(false);
    resetNewGoal();
  };

  const resetNewGoal = () => setNewGoal(initialGoalState);

  const addGoal = () => {
    if (!newGoal.name || !newGoal.totalBooks) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const updatedGoals = [...goals, { id: Date.now(), ...newGoal }];
    setGoals(updatedGoals);
    saveGoalsToLocalStorage(updatedGoals);
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
  };

  const updateGoalProgress = (goalId) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const booksInGoal = books.filter((book) => book.goal === goalId);
        const progress = booksInGoal.length;
        const progressPercentage = (progress / goal.totalBooks) * 100;
        return {
          ...goal,
          progress,
          progressPercentage,
          status: progress >= goal.totalBooks ? 'Concluído' : 'Em andamento',
        };
      }
      return goal;
    });
    setGoals(updatedGoals);
    saveGoalsToLocalStorage(updatedGoals);
  };

  useEffect(() => {
    goals.forEach((goal) => updateGoalProgress(goal.id));
  }, [books]);

  return (
    <div className="library-screen">
      <h1>Metas de Leitura</h1>
      <div className="book-list">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onClose={() => removeGoal(goal.id)} />
          ))
        ) : (
          <p>Nenhuma meta adicionada ainda</p>
        )}
        <button className="add-book-button" onClick={openModal}>
          +
        </button>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="modal-close" onClick={closeModal}>X</button>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div className="modal-right">
                  <label>Nome da Meta</label>
                  <input
                    type="text"
                    name="name"
                    value={newGoal.name}
                    onChange={handleInputChange}
                    placeholder="Nome da meta"
                  />

                  <label>Total de Livros</label>
                  <input
                    type="number"
                    name="totalBooks"
                    value={newGoal.totalBooks}
                    onChange={handleInputChange}
                    placeholder="Total de livros"
                  />

                  <div className="form-group">
                    <label>Status</label>
                    <input
                      type="text"
                      placeholder="Status"
                      value={statusInput}
                      onChange={(e) => setStatusInput(e.target.value)}
                      onFocus={() => setIsStatusInputVisible(true)}
                    />
                    {isStatusInputVisible && (
                      <ul className="status-list">
                        {statusOptions.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setNewGoal((prevData) => ({ ...prevData, status: option }));
                              setStatusInput(option);
                              setIsStatusInputVisible(false);
                            }}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={addGoal}
                    style={{ marginBottom: '10px', marginLeft: 'auto', display: 'block' }}
                  >
                    Salvar
                  </button>
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
