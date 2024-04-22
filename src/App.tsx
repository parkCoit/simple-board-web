
import { Route, Routes } from 'react-router-dom';
import BoardPage from '@/pages/BoardPage'
import LoginPage from '@/pages/LoginPage';
import ViewPage from '@/pages/ViewPage';
import EditPage from '@/pages/EditPage';
import AuthPage from '@/pages/AuthPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<BoardPage/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/view/:id' element={<ViewPage/>} />
        <Route path='/edit/:id?' element={<EditPage/>} />
        <Route path='/auth' element={<AuthPage/>} />
      </Routes>
    </div>
  );
}

export default App;
