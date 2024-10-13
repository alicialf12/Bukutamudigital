import React, { useEffect, useState } from 'react';

function Home({ handleSubmit, editData }) {
  const [nama, setNama] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [pesan, setPesan] = useState('');

 
  useEffect(() => {
    if (editData) {
      setNama(editData.nama);
      setKeterangan(editData.keterangan);
      setPesan(editData.pesan);
    }
  }, [editData]);

  return (
    <div className="container">
      <h1>Buku Tamu Pernikahan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama:</label>
          <input
            name="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Keterangan:</label>
          <input
            name="keterangan"
            type="text"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pesan:</label>
          <textarea
            name="pesan"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          {editData ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Home;
