import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import './OfficeLoginDetail.css';
interface Entry {
  id: number;
  username: string;
  password: string;
  department: string;
  role: string;
}

interface OfficeTableProps {
  entries: Entry[];
  editEntry: (entry: Entry) => void;
  removeEntry: (id: number) => void;
}

const OfficeTable: React.FC<OfficeTableProps> = ({ entries, editEntry, removeEntry }) => {
  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.username}</TableCell>
              <TableCell>{entry.password}</TableCell>
              <TableCell>{entry.department}</TableCell>
              <TableCell>{entry.role}</TableCell>
              <TableCell>
                <IconButton onClick={() => editEntry(entry)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => removeEntry(entry.id)} color="secondary">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OfficeTable;
