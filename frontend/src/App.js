import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import("./components/Home"));
const Sport = lazy(() => import("./components/Sport"));
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const Participant = lazy(() => import("./components/Participant"));
const Footer = lazy(() => import("./components/Footer"));
const Diet = lazy(() => import("./components/Diet"));
const ErrorPage = lazy(() => import("./components/Error"));
const CreateParticipant = lazy(() => import("./components/CreateParticipant"));

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <Suspense fallback={<div className="rotate-spinner"></div>}>
              <Home />
            </Suspense>
          } />
          <Route path='/sports/:name' element={
            <Suspense fallback={<div className="rotate-spinner"></div>}>
              <Sport />
            </Suspense>
          } />
          <Route path='/diet' element={
            <Suspense fallback={<div className="rotate-spinner"></div>}>
              <Diet />
            </Suspense>
          } />
          <Route path='/my-details' element={
            <Suspense fallback={<div className="rotate-spinner"></div>}>
              <Participant />
            </Suspense>
          } />
          <Route path='/error' element={
            <Suspense fallback={<div className="rotate-spinner"></div>}>
              <ErrorPage />
            </Suspense>
          } />
          <Route path='/create-participant' element={
            <Suspense fallback={<div className="rotate-spinner"></div>}>
              <CreateParticipant />
            </Suspense>
          } />
          <Route path='/login' element={
            <Suspense fallback={<div className="rotate-spinner"></div>}>
              <Login />
            </Suspense>
          } />
          <Route path='/register' element={
            <Suspense fallback={<div className="rotate-spinner"></div>}>
              <Register />
            </Suspense>
          } />
        </Routes>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
