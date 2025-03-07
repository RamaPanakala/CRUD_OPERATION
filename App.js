import React, { useState, useEffect, useRef } from 'react';
import { Container, TextField, Button, Paper, Typography, Select, MenuItem } from '@mui/material';
import OfficeTable from './OfficeTable';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const OfficeLoginDetail = () => {
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entryData, setEntryData] = useState({ id: null, username: '', password: '', department: '', role: '' });
  const [editingMode, setEditingMode] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    fetchOfficeLogins();
  }, []);

  const fetchOfficeLogins = async () => {
    try {
      const response = await fetch(API_URL);
      const users = await response.json();
      const formattedData = users.map(user => ({
        id: user.id,
        username: user.username,
        password: '********',
        department: ['HR', 'Finance', 'IT', 'Operations'][user.id % 4],
        role: ['Admin', 'Manager', 'Employee'][user.id % 3]
      }));
      setEntries(formattedData);
      console.log("Fetched Data:", formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEntryData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!entryData.username || !entryData.password || !entryData.department || !entryData.role) {
      alert("Please fill all fields before submitting.");
      return;
    }
    editingMode ? updateEntry(entryData.id) : addEntry();
    resetForm();
  };

  const addEntry = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entryData)
      });
      const newEntry = await response.json();
      setEntries([newEntry, ...entries]);
      console.log("Added Entry:", newEntry);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const updateEntry = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entryData)
      });
      setEntries(entries.map(item => (item.id === id ? { ...item, ...entryData } : item)));
      console.log("Updated Entry:", entryData);
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const removeEntry = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setEntries(entries.filter(item => item.id !== id));
      console.log("Deleted Entry ID:", id);
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const editEntry = (entry) => {
    setEntryData(entry);
    setEditingMode(true);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetForm = () => {
    setEntryData({ id: null, username: '', password: '', department: '', role: '' });
    setEditingMode(false);
  };

  const filteredEntries = entries.filter(entry =>
    entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" className="container">
      <Typography variant="h3" align="center" className="header">
        Office Login Management
      </Typography>

      <Paper ref={formRef} elevation={3} className="form-container">
        <form onSubmit={handleFormSubmit} className="form">
          <TextField fullWidth label="Username" name="username" value={entryData.username} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth type="password" label="Password" name="password" value={entryData.password} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Department" name="department" value={entryData.department} onChange={handleInputChange} margin="normal" />
          <Select fullWidth name="role" value={entryData.role} onChange={handleInputChange} displayEmpty>
            <MenuItem value="" disabled>Select Role</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </Select>
          <div className="button-group">
            <Button type="submit" variant="contained" className="submit-button">
              {editingMode ? 'Update' : 'Add'}
            </Button>
            <Button variant="outlined" onClick={resetForm} className="reset-button">
              Reset
            </Button>
          </div>
        </form>
      </Paper>

      <TextField fullWidth label="Search Office Logins" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} margin="normal" className="search-bar" />

      <OfficeTable entries={filteredEntries} editEntry={editEntry} removeEntry={removeEntry} />
    </Container>
  );
};

export default OfficeLoginDetail;
