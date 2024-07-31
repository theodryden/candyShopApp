// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import './App.css';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = index => {
        const updatedTasks = tasks.map((task, i) => (
            i === index ? { ...task, completed: !task.completed } : task
        ));
        setTasks(updatedTasks);
    };

    const deleteTask = index => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <>
        <h1>Candy Shop 🍬</h1>
        <div className="container">
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    placeholder="Add a candy"
                />
                <button onClick={addTask}>Add Candy</button>
            </div>

            {tasks.length === 0 ? (
                <p>Your inventory is empty!</p>
            ) : (
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} className={task.completed ? 'completed' : ''}>
                            <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
                            <button onClick={() => deleteTask(index)}>Delete Candy</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    );
}

export default TodoList;
