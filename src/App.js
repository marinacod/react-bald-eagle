import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import TodoContainer from './Components/TodoContainer';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Components/Home';

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/weekly"
            element={
              <TodoContainer
                tableName="Weekly planner"
                myClass={styles.todoContainer1}
              />
            }
          />
          <Route
            exact
            path="/grocery"
            element={
              <TodoContainer
                tableName="Grocery List"
                myClass={styles.todoContainer2}
              />
            }
          />
          <Route
            exact
            path="/bucket"
            element={
              <TodoContainer
                tableName="Bucket List"
                myClass={styles.todoContainer3}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
