import './App.css';
import React, { useMemo, useState } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Link,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Login from './Components/pages/LoginPage';
import Main from './Components/pages/MainPage';
import Page404 from './Components/pages/Page404';
import AuthContext from './contexts';
import useAuth from './hooks';
import SignUpPage from './Components/pages/SignUpPage';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const value = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
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

const App = () => (
  <>
    <div className="d-flex flex-column h-100">
      <AuthProvider>
        <BrowserRouter>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand as={Link} to="/">TIGRA Chat</Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>
          <Routes>
            <Route path="*" element={<Page404 />} />
            <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
    <ToastContainer />
  </>
);

export default App;
