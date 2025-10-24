import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useSWR, { useSWRConfig } from 'swr'

// 🔹 Fungsi untuk format tanggal jadi dd/mm/yyyy
function formatTanggal(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const fetcher = async () => {
  const reponse = await axios.get('http://localhost:8000/siswa', {
    headers: { Accept: 'application/json' }
  })
  return reponse.data
}

const DataSiswa = () => {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR('http://localhost:8000/siswa', fetcher)

  const deleteSiswa = async (id) => {
    if (window.confirm("apakah anda yakin menghapus data ini?")) {
      await axios.delete(`http://localhost:8000/siswa/${id}`)
      mutate('http://localhost:8000/siswa')
    }
  }

  if (error) return <h1 className="text-center text-red-600 mt-5">Gagal memuat data..</h1>
  if (!data) return <h1 className="text-center mt-5">Loading..</h1>

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-700">📋 Data Siswa</h1>
        <Link
          to='/tambah'
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Tambah Siswa
        </Link>
      </div>

      <table className="w-full border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-center">No</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Alamat</th>
            <th className="border p-2">Tanggal Lahir</th>
            <th className="border p-2">Jurusan</th>
            <th className="border p-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((siswa, index) => (
            <tr key={siswa.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{siswa.nama}</td>
              <td className="border p-2">{siswa.alamat}</td>
              {/* 🔹 Format tanggal sebelum ditampilkan */}
              <td className="border p-2">{formatTanggal(siswa.tanggal_lahir)}</td>
              <td className="border p-2">{siswa.jurusan}</td>
              <td className="border p-2 text-center space-x-2">
                <Link
                  to={`/edit/${siswa.id}`}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteSiswa(siswa.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataSiswa
