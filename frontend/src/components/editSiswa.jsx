import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditSiswa = () => {
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [tanggal_lahir, setTanggal] = useState('')
  const [jurusan, setJurusan] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const updateSiswa = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:8000/siswa/${id}`, {
      nama,
      alamat,
      tanggal_lahir,
      jurusan,
    })
    navigate('/')
  }

  useEffect(() => {
    const getSiswaById = async () => {
      const response = await axios.get(`http://localhost:8000/siswa/${id}`)
      setNama(response.data.nama)
      setAlamat(response.data.alamat)

      // ✅ Format tanggal agar cocok dengan input type="date"
      let tanggal = response.data.tanggal_lahir
      if (tanggal) {
        // Jika format dd/mm/yyyy → ubah ke yyyy-mm-dd
        if (tanggal.includes('/')) {
          const [d, m, y] = tanggal.split('/')
          tanggal = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
        } else {
          // Jika format lain (misal ISO atau timestamp)
          const tgl = new Date(tanggal)
          if (!isNaN(tgl)) {
            tanggal = tgl.toISOString().split('T')[0]
          }
        }
      }
      setTanggal(tanggal)

      setJurusan(response.data.jurusan)
    }
    getSiswaById()
  }, [id])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={updateSiswa}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Data Siswa
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan nama siswa"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Alamat</label>
          <input
            type="text"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan alamat siswa"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Tanggal Lahir</label>
          <input
            type="date"
            value={tanggal_lahir}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Jurusan</label>
          <input
            type="text"
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan jurusan siswa"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default EditSiswa
