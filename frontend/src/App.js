import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DataSiswa from "./components/dataSiswa.jsx"
import TambahSiswa from "./components/tambahSiswa.jsx"
import EditSiswa from './components/editSiswa.jsx'

function App() {
  return (
    <div> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataSiswa/>} />
          <Route path="/tambah" element={<TambahSiswa/>} />
          <Route path="/edit/:id" element={<EditSiswa/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
