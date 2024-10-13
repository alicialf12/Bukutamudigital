import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";  
import DaftarTamu from "./DaftarTamu";  

function App() {
  const [guests, setGuests] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); 
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();

  // Mengambil daftar tamu dari backend
  const getDaftarTamu = async () =>{
    try{
      const response = await fetch('http://localhost:5001/api/tamu',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setGuests(data);
    } catch (error){
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getDaftarTamu();
  }, []);

  // Fungsi untuk submit tamu baru atau edit tamu yang ada
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tamuBaru = {
      nama: e.target.nama.value,
      keterangan: e.target.keterangan.value,
      pesan: e.target.pesan.value
    };

    try {
      if (editIndex !== null) {
        await fetch(`http://localhost:5001/api/tamu/${editIndex}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tamuBaru),
        });
        setEditIndex(null); 
      } else {
        await fetch('http://localhost:5001/api/tamu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tamuBaru),
        });
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }

    getDaftarTamu(); 
    e.target.reset();
    setEditData(null); 
    navigate('/daftar-tamu'); 
  };

  // Fungsi untuk menghapus tamu
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/tamu/${id}`, {
        method: 'DELETE',
      });
      getDaftarTamu(); 
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Fungsi untuk mengedit tamu
  const handleEdit = (id) => {
    const tamu = guests.find((guest) => guest.id === id); 
    setEditIndex(id); 
    setEditData(tamu); 
    navigate("/"); 
  };

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
