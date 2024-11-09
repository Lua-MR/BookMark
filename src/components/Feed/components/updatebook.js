import React, { useState, useRef, useEffect } from 'react';

const UpdateBook = ({ book, onUpdate, onDelete, onClose, goals = [] }) => {
    const [updatedBook, setUpdatedBook] = useState({ ...book });
    const [selectedGoalId, setSelectedGoalId] = useState(updatedBook.goal || '');
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const [isRatingInputVisible, setIsRatingInputVisible] = useState(false);
    const [isStatusInputVisible, setIsStatusInputVisible] = useState(false);
    const [isGenreInputVisible, setIsGenreInputVisible] = useState(false);
    const [isTypeInputVisible, setIsTypeInputVisible] = useState(false);
    const [isPropInputVisible, setIsPropInputVisible] = useState(false);
    const [isEditoraInputVisible, setIsEditoraInputVisible] = useState(false);

    const [ratings, setRatings] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [genreOptions, setGenreOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);
    const [propOptions, setPropOptions] = useState([]);
    const [editoraOptions, setEditoraOptions] = useState([]);

    useEffect(() => {
        console.log("Goals passed to UpdateBook:", goals);
        setSelectedGoalId(book.goal || '');
    }, [book, goals]);

    useEffect(() => {
        const savedRatings = JSON.parse(localStorage.getItem('ratingsOptions')) || ['1', '2', '3', '4', '5'];
        setRatings(savedRatings);

        const savedStatusOptions = JSON.parse(localStorage.getItem('statusOptions')) || ['Lendo', 'Lido', 'Ler', 'Abandonado'];
        setStatusOptions(savedStatusOptions);

        const savedGenres = JSON.parse(localStorage.getItem('genreOptions')) || ['Ficção', 'Não-ficção'];
        setGenreOptions(savedGenres);

        const savedTypes = JSON.parse(localStorage.getItem('typeOptions')) || ['Físico', 'Kindle'];
        setTypeOptions(savedTypes);

        const savedProps = JSON.parse(localStorage.getItem('propOptions')) || ['Pessoal', 'Emprestado'];
        setPropOptions(savedProps);

        const savedEditoras = JSON.parse(localStorage.getItem('editoraOptions')) || ['Intrínseca', 'Seguinte', 'Rocco'];
        setEditoraOptions(savedEditoras);
    }, []);

    const handleSave = () => {
        const { startDate, endDate } = updatedBook;
        const newHighlightedDays = [];
    
        const parsedStartDate = new Date(startDate + 'T00:00:00');
        const parsedEndDate = new Date(endDate + 'T23:59:59');
    
        if (parsedStartDate > parsedEndDate) {
            console.error('Start date is after end date');
            return;
        }
    
        for (let d = new Date(parsedStartDate); d <= parsedEndDate; d.setDate(d.getDate() + 1)) {
            newHighlightedDays.push(new Date(d).toLocaleDateString('en-CA'));
        }
    
        onUpdate({...updatedBook, goal: selectedGoalId }, newHighlightedDays);
        onClose();
    };

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleDelete = () => {
        onDelete(book.id);
        onClose();
    };

    const handleGoalChange = (e) => {
        const selectedId = e.target.value;
        setSelectedGoalId(selectedId);
        setUpdatedBook((prev) => ({ ...prev, goal: selectedId }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedBook((prevData) => ({ ...prevData, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <div className="modal-left">
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        required
                        ref={imageInputRef}
                        style={{ display: 'none' }}
                    />
                    <button className="add-image-button" onClick={() => imageInputRef.current.click()}>
                        🖼️ Capa
                    </button>
                    {updatedBook.image && (
                        <img src={updatedBook.image} alt="Capa do Livro" style={{ width: '90%', height: 'auto', marginBottom: '10px' }} />
                    )}

                    <label>Meta:
                        <select value={selectedGoalId} onChange={handleGoalChange} style={{ marginBottom: '10px', width: '100%' }}>
                            <option value="">Selecione uma Meta</option>
                            {goals.map((goal) => (
                                <option key={goal.id} value={goal.id}>
                                    {goal.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Other Inputs like Status, Genre, and others */}
                    <input
                        className="status-input"
                        type="text"
                        placeholder="Status"
                        value={updatedBook.status}
                        onChange={(e) => setUpdatedBook((prevData) => ({ ...prevData, status: e.target.value }))}
                        onFocus={() => setIsStatusInputVisible(true)}
                        onBlur={() => setTimeout(() => setIsStatusInputVisible(false), 100)}
                        onKeyDown={(e) => handleOptionSave(e, updatedBook.status, statusOptions, setStatusOptions, 'status', 'statusOptions')}
                        style={{ marginBottom: '10px' }}
                    />
                    {/*... other components ...*/}
                </div>

                <div className="modal-right">
                    {/* Text Inputs */}
                    <label>Nome:
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome do Livro"
                            value={updatedBook.name}
                            onChange={(e) => setUpdatedBook({ ...updatedBook, name: e.target.value })}
                            style={{ marginBottom: '10px' }}
                        />
                    </label>

                    <label>Autor:
                        <input
                            type="text"
                            name="author"
                            placeholder="Autor"
                            value={updatedBook.author}
                            onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })}
                            style={{ marginBottom: '10px' }}
                        />
                    </label>

                    <button onClick={handleDelete} style={{ marginBottom: '10px', marginLeft: 'auto', display: 'block' }}>Deletar</button>
                    <button onClick={handleSave} style={{ marginBottom: '10px', marginLeft: 'auto', display: 'block' }}>Salvar</button>
                </div> 
            </div>
        </div>
    );
};

export default UpdateBook;
