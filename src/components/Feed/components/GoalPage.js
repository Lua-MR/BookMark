const GoalPage = ({ books = [] }) => { // Adicione um valor padrão vazio para books
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState(initialGoalState);
  const [editingGoal, setEditingGoal] = useState(null);
  const [isStatusInputVisible, setIsStatusInputVisible] = useState(false);
  const [statusInput, setStatusInput] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

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

  const addBookToGoal = () => {
    if (!selectedBook) return;

    const selectedBookObj = books.find((book) => book.name === selectedBook);
    if (!selectedBookObj) return;

    // Adiciona o livro à meta
    setNewGoal((prevGoal) => ({
      ...prevGoal,
      books: [...prevGoal.books, selectedBookObj],
    }));

    selectedBookObj.goal = editingGoal ? editingGoal.id : Date.now();

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
                {/* Imagem da meta */}
              </div>
              <div className="modal-right">
                <label>Adicionar Livro</label>
                <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
                  <option value="">Selecione um livro</option>
                  {books.length > 0 ? ( // Verificação para evitar acessar map em undefined
                    books
                      .filter((book) => !book.goal) // Filtrar apenas livros sem metas atribuídas
                      .map((book) => (
                        <option key={book.name} value={book.name}>
                          {book.name}
                        </option>
                      ))
                  ) : (
                    <option value="">Nenhum livro disponível</option>
                  )}
                </select>
                <button onClick={addBookToGoal}>Adicionar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalPage;
