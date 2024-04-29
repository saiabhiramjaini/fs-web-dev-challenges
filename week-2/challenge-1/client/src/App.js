import React, { useEffect, useContext, useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css'

// Counter context
const CounterContext = React.createContext();

// Reducer function for managing counter state
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { count: action.count,myCount:state.myCount };
      case 'SET_MYCOUNT':
        return { count: state.count,myCount:action.myCount };
    case 'INCREMENT':
      return { ...state,count: state.count + 1 };
    case 'DECREMENT':
      return { ...state,count: state.count - 1 };
    case 'INCREMENT_MY_COUNT':
      return { ...state, myCount: state.myCount + 1 };
    case 'DECREMENT_MY_COUNT':
      return { ...state, myCount: state.myCount - 1 };
    default:
      return state;
  }
};

const Home = () => {
  const { state } = useContext(CounterContext);

  return (
    <div>
      <h1>Counter Value: {state.count}</h1>
      <h1>My Count: {state.myCount}</h1>
      <Link to="/counter">Counter</Link>
    </div>
  );
};

const Counter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchCounter = useCallback(async () => {
    try {
      const response = await axios.get('https://saiabhiramjaini-web-dev-week-2-challenge.onrender.com/api/counter');
      dispatch({ type: 'SET', count: response.data.count });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  const incrementCounter = useCallback(async () => {
    try {
      await axios.post('https://saiabhiramjaini-web-dev-week-2-challenge.onrender.com/api/counter/increment');
      dispatch({ type: 'INCREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementCounter = useCallback(async () => {
    try {
      await axios.post('https://saiabhiramjaini-web-dev-week-2-challenge.onrender.com/api/counter/decrement');
      dispatch({ type: 'DECREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {state.count}</p>
      <p>My Counter Value: {state.myCount}</p> 
      <br/>
      <br/>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};




const DualCounter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchMyCount = useCallback(async () => {
    try {
      const response = await axios.get('https://saiabhiramjaini-web-dev-week-2-challenge.onrender.com/api/counter');
      console.log("Fetch MyCount:", response.data);  
      dispatch({ type: 'SET_MYCOUNT', myCount: response.data.myCount });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);
  

  useEffect(() => {
    fetchMyCount();
  }, [fetchMyCount]);
  // const fetchCounter = useCallback(async () => {
  //   try {
  //     const response = await axios.get('http://localhost:9000/api/counter');
  //     dispatch({ type: 'SET_MYCOUNT', count: response.data.count });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   fetchCounter();
  // }, [fetchCounter]);

  const incrementMyCount = useCallback(async () => {
    try {
      await axios.post('https://saiabhiramjaini-web-dev-week-2-challenge.onrender.com/api/mycounter/increment');
      dispatch({ type: 'INCREMENT_MY_COUNT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementMyCount = useCallback(async () => {
    try {
      await axios.post('https://saiabhiramjaini-web-dev-week-2-challenge.onrender.com/api/mycounter/decrement');
      dispatch({ type: 'DECREMENT_MY_COUNT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>My Counter</h2>
      <p>Count: {state.count}</p>
      <p>My Count: {state.myCount}</p>
      <br/>
      <br/>
      <button onClick={incrementMyCount}>Increment MyCount</button>
      <button onClick={decrementMyCount}>Decrement MyCount</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};


const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, myCount: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/dual-counter">Dual Counter</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/dual-counter" element={<DualCounter />} />
          </Routes>
        </div>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;