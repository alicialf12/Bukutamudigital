import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";  
import DaftarTamu from "./DaftarTamu";  

function App() {
  const [guests, setGuests] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); 
  const [editData, setEditData] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const tamuBaru = {
      nama: e.target.nama.value,
      keterangan: e.target.keterangan.value,
      pesan: e.target.pesan.value
    };

    if (editIndex !== null) {
      
      const updatedGuests = guests.map((guest, index) => 
        index === editIndex ? tamuBaru : guest
      );
      setGuests(updatedGuests);
      setEditIndex(null); 
    } else {
      
      setGuests([...guests, tamuBaru]);
    }

    e.target.reset();
    setEditData(null); 

    navigate('/daftar-tamu');
  };


  
  const handleEdit = (index) => {
    const tamu = guests[index];
    setEditIndex(index); 
    setEditData(tamu); 
    navigate("/"); 
  };

  
  const handleDelete = (index) => {
    const updatedGuests = guests.filter((_, i) => i !== index);
    setGuests(updatedGuests); 
  };

  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home handleSubmit={handleSubmit} editData={editData} />} />
      <Route path="/daftar-tamu" element={
        <DaftarTamu 
          guests={guests}
          handleEdit={handleEdit} 
          handleDelete={handleDelete}
        />} />
    </Routes>
  );
}

export default App;
