import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';

type Task = {
  id: number;
  title: string;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        title: inputValue.trim(),
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div style={{ maxWidth: '568px', margin: '0 auto' }}>
      <h1>Lista de Tarefas</h1>
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <TextField
          label="Adicionar tarefa"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          variant="outlined"
          fullWidth
          onKeyDown={handleKeyPress}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          style={{ marginLeft: '16px' }}
        >
          Adicionar
        </Button>
      </div>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText primary={task.title} />
            <Button
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => deleteTask(task.id)}
            >
              Excluir
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default App;