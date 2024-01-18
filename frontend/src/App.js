import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Components/Login';
import Main from './Components/Main';
import Page404 from './Components/Page404';
import AuthContext from './contexts';
import useAuth from './hooks';
import { Button, Navbar, Container } from 'react-bootstrap';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const userId = JSON.parse(localStorage.getItem('userId'));

  return (
    auth.loggedIn || (userId && userId.token) 
    ? children
    : <Navigate to="/login" />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const userId = JSON.parse(localStorage.getItem('userId'));

  return (
    auth.loggedIn || (userId && userId.token)
      ? <Button onClick={auth.logOut} variant="success">Выйти</Button>
      : false
  );
};

function App() {
  return (
    <>
      <div className='d-flex flex-column h-100'>
        <AuthProvider>
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">TIGRA Chat</Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>

        <Routes>
          <Route path='*' element={<Page404 />} />
          <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
      </div>
      <div className='Toastify'></div>
    </>
    
  );
}

export default App;