import React, { useState, useRef, useEffect } from 'react';
import GoalCard from './GoalCard';

const initialGoalState = {
  image: '',
  name: '',
  totalBooks: 0,
  progress: 0,
  startDate: '',
  endDate: '',
  status: 'Em andamento',
};

const GoalPage = ({ books }) => {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState(initialGoalState);
  const [editingGoal, setEditingGoal] = useState(null);
  const [isStatusInputVisible, setIsStatusInputVisible] = useState(false);
  const [statusInput, setStatusInput] = useState('');
  const imageInputRef = useRef(null);

  const statusOptions = ['Em andamento', 'Concluído', 'Pausado'];

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
    setGoals(savedGoals);
  }, []);

  const saveGoalsToLocalStorage = (updatedGoals) => {
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const openModal = (goal = initialGoalState) => {
    setNewGoal(goal);
    setEditingGoal(goal.id ? goal : null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewGoal(initialGoalState);
    setEditingGoal(null);
  };

  const saveGoal = () => {
    if (!newGoal.name || !newGoal.totalBooks) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    let updatedGoals;
    if (editingGoal) {
      updatedGoals = goals.map((goal) =>
        goal.id === editingGoal.id ? { ...goal, ...newGoal } : goal
      );
    } else {
      updatedGoals = [...goals, { id: Date.now(), ...newGoal }];
    }

    setGoals(updatedGoals);
    saveGoalsToLocalStorage(updatedGoals);
    closeModal();
  };

  const removeGoal = (goalId) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    setGoals(updatedGoals);
    saveGoalsToLocalStorage(updatedGoals);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewGoal((prevGoal) => ({ ...prevGoal, image: reader.result }));
      reader.readAsDataURL(file);
    }
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
              onEdit={() => openModal(goal)}
              onClose={() => removeGoal(goal.id)}
            />
          ))
        ) : (
          <p>Nenhuma meta adicionada ainda</p>
        )}
        <button className="add-book-button" onClick={() => openModal()}>
          +
        </button>
      </div>

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
                <button className="add-image-button" onClick={() => imageInputRef.current.click()}>
                  🖼️ Capa
                </button>
                {newGoal.image && (
                  <img src={newGoal.image} alt="Preview" style={{ width: '100px', height: '100px' }} />
                )}
              </div>
              <div className="modal-right">
                <label>Nome da Meta*</label>
                <input
                  type="text"
                  name="name"
                  value={newGoal.name}
                  onChange={handleInputChange}
                  placeholder="Nome da meta"
                />

                <label>Total de Livros*</label>
                <input
                  type="number"
                  name="totalBooks"
                  value={newGoal.totalBooks}
                  onChange={handleInputChange}
                  placeholder="Total de livros"
                />

                <label>Data de Início</label>
                <input
                  type="date"
                  name="startDate"
                  value={newGoal.startDate}
                  onChange={handleInputChange}
                />

                <label>Data de Término</label>
                <input
                  type="date"
                  name="endDate"
                  value={newGoal.endDate}
                  onChange={handleInputChange}
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
                  onClick={saveGoal}
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
  );
};

export default GoalPage;
