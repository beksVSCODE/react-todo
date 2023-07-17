import React,{ useEffect,useState } from 'react';

const Counter = () => {
    const [count,setCount] = useState(0)    
    useEffect(() => {
        console.log('Сomponent Mount');
        return () => {
          console.log('Сomponent UNMOUNT');
        }
      },[])
      useEffect(() => {
        console.log('Count:',count);
      },[count])

    return (
        <div>
            <button onClick={() => setCount(preveCount => preveCount -1)}>-</button>
              {count}
            <button onClick={() => setCount(preveCount => preveCount +1)}>+</button>
        </div>
    );
};

export default Counter;