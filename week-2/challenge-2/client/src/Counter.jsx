// CounterPage.js
import React, { useState, useContext, useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './App.jsx';  // Ensure the path is correct

const CounterContext = React.createContext();

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { count: action.count, myCount: state.myCount };
    case 'SET_MYCOUNT':
      return { count: state.count, myCount: action.myCount };
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'INCREMENT_MY_COUNT':
      return { ...state, myCount: state.myCount + 1 };
    case 'DECREMENT_MY_COUNT':
      return { ...state, myCount: state.myCount - 1 };
    default:
      return state;
  }
};

const CounterPage = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, myCount: 0 });
  const [activeComponent, setActiveComponent] = useState('counter'); // 'counter' or 'dualCounter'

  // Define toggleComponent function
  const toggleComponent = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'counter':
        return <Counter state={state} dispatch={dispatch} />;
      case 'dualCounter':
        return <DualCounter state={state} dispatch={dispatch} />;
      default:
        return <Counter state={state} dispatch={dispatch} />;
    }
  };

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <div>
        <button onClick={() => toggleComponent('counter')}>Counter</button>
        <button onClick={() => toggleComponent('dualCounter')}>My Counter</button>
        {renderComponent()}
      </div>
    </CounterContext.Provider>
  );
};

const Counter = ({ state, dispatch }) => {
  const { user } = useContext(AuthContext);

  const fetchCounter = useCallback(async () => {
    if (user && user.email) {
      try {
        const response = await axios.get(`http://localhost:9000/api/counter/${user.email}`);
        dispatch({ type: 'SET', count: response.data.count });
      } catch (err) {
        console.error(err);
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  const incrementCounter = async () => {
    if (user && user.email) {
      try {
        await axios.post('http://localhost:9000/api/counter/increment', { email: user.email });
        dispatch({ type: 'INCREMENT' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const decrementCounter = async () => {
    if (user && user.email) {
      try {
        await axios.post('http://localhost:9000/api/counter/decrement', { email: user.email });
        dispatch({ type: 'DECREMENT' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {state.count}</p>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
    </div>
  );
};

// DualCounter component within CounterPage.js or a separate file if you prefer modular components

const DualCounter = ({ state, dispatch }) => {
  const { user } = useContext(AuthContext);  // Use AuthContext directly

  const fetchMyCount = useCallback(async () => {
    if (user && user.email) {
      try {
        const response = await axios.get(`http://localhost:9000/api/mycounter/${user.email}`);
        dispatch({ type: 'SET_MYCOUNT', myCount: response.data.myCount });
      } catch (err) {
        console.error(err);
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    fetchMyCount();
  }, [fetchMyCount]);

  const incrementMyCount = async () => {
    if (user && user.email) {
      try {
        await axios.post('http://localhost:9000/api/mycounter/increment', { email: user.email });
        dispatch({ type: 'INCREMENT_MY_COUNT' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const decrementMyCount = async () => {
    if (user && user.email) {
      try {
        await axios.post('http://localhost:9000/api/mycounter/decrement', { email: user.email });
        dispatch({ type: 'DECREMENT_MY_COUNT' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>My Counter</h2>
      <p>My Count: {state.myCount}</p>
      <button onClick={incrementMyCount}>Increment MyCount</button>
      <button onClick={decrementMyCount}>Decrement MyCount</button>
    </div>
  );
};


export default CounterPage;