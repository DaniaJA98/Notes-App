import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <div className="container p-4">
        <Routes>
          <Route exact path="/" element={<NotesList />} />
          <Route exact path="/edit/:id" element={<CreateNote />} />
          <Route exact path="/create" element={<CreateNote />} />
          <Route exact path="/user" element={<CreateUser />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
