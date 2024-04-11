
import { Route, Routes } from 'react-router-dom';
import BoardPage from '@/pages/BoardPage'
import LoginPage from '@/pages/LoginPage';
import ViewPage from '@/pages/ViewPage';
import EditPage from '@/pages/EditPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<BoardPage/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/view' element={<ViewPage/>} />
        <Route path='/edit' element={<EditPage/>} />
      </Routes>
    </div>
  );
}

export default App;
