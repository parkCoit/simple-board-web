
import { Route, Routes, useLocation } from 'react-router-dom';
import BoardPage from '@/pages/BoardPage'
import LoginPage from '@/pages/LoginPage';
import ViewPage from '@/pages/ViewPage';
import EditPage from '@/pages/EditPage';
import AuthPage from '@/pages/AuthPage';
import TopNavigation from '@/components/common/TopNavigation';

function App() {
  
  const location = useLocation(); 
  
  const hideTopNavPaths = ['/login', '/auth'];

  const showTopNav = !hideTopNavPaths.includes(location.pathname);

  return (
    <div className="App">
      {showTopNav && <TopNavigation/>}
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
