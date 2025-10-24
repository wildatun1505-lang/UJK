import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
 
const TambahSiswa = () => {
    const [nama, setNama] = useState('')
    const [alamat, setAlamat] = useState('')
    const [tanggal_lahir, setTanggal] = useState('')
    const [jurusan, setJurusan] = useState('')
    const navigate = useNavigate()

    const simpanSiswa = async(e)=>{
        e.preventDefault()
        await axios.post('http://localhost:8000/siswa',{
            nama: nama,
            alamat: alamat,
            tanggal_lahir: tanggal_lahir,
            jurusan: jurusan,
        })
        navigate('/')
    }

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9fafb'
    }}>
        <form 
          onSubmit={simpanSiswa} 
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px'
          }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Tambah Siswa</h2>

            <div style={{ marginBottom: '15px' }}>
                <label>Nama</label><br/>
                <input 
                    type='text' 
                    value={nama} 
                    onChange={(e)=>setNama(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label>Alamat</label><br/>
                <input 
                    type='text' 
                    value={alamat} 
                    onChange={(e)=>setAlamat(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label>Tanggal Lahir</label><br/>
                <input 
                    type='date' 
                    value={tanggal_lahir} 
                    onChange={(e)=>setTanggal(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label>Jurusan</label><br/>
                <input 
                    type='text' 
                    value={jurusan} 
                    onChange={(e)=>setJurusan(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
            </div>

            <button 
              type='submit' 
              style={{
                width: '100%',
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
                Simpan
            </button>
        </form>
    </div>
  )
}

export default TambahSiswa
