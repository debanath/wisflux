import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/visitors');
      setCount(response.data.count);
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const incrementCount = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/visitors');
      setCount(response.data.count);
    } catch (error) {
      console.error('Error incrementing count:', error);
    }
  };

  useEffect(() => {
    fetchCount();
    incrementCount();
  }, []);

  return (
    <div>
      <h1>Visitor Count: {count}</h1>
    </div>
  );
};

export default App;
