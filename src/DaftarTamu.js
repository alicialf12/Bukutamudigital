import React from 'react';
import { useNavigate } from 'react-router-dom';

function DaftarTamu({ guests, handleEdit, handleDelete }) {
    const navigate = useNavigate();

  return (
    <div className="guest-list">
      <h2>Daftar Tamu</h2>
      <ul>
        {guests.length > 0 ? (
          guests.map((guest, index) => (
            <li key={index}>
              <strong>{guest.nama}</strong> - {guest.keterangan} <br />
              {guest.pesan}
              <br />
              <button className='edit-btn' onClick={() => handleEdit(index)}>Edit</button>
              <button className='delete-btn' onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))
        ) : (
          <p>Tidak ada tamu yang terdaftar.</p>
        )}
      </ul>

      <button className='back-btn' onClick={() => navigate ('/')}>Kembali
      </button>

    </div>
  );
}

export default DaftarTamu;
