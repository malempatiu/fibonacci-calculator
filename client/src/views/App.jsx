import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';

const App = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/values', {index});
      const indexesResponse = await axios.get('http://localhost:8080/api/values/all');
      const outPutResponse = await axios.get('http://localhost:8080/api/values/current');
      setSeenIndexes([...new Set(indexesResponse.data.rows.map(row => row.number))]);
      setValues(outPutResponse.data.values);
    } catch (e) {
      if (e.response.data.error) {
        setError(e.response.data.error);
      }
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await axios.post('http://localhost:8080/api/values/clear');
        setSeenIndexes([]);
        setValues({});
      } catch (e) {
        if (e.response.data.error) {
          setError(e.response.data.error);
        }
      }
    })()
  }, []);

  return (
    <Wrapper>
      <Header>
        <h1>Fibonacci Calculator</h1>
      </Header>
      <Calculator>
        {error ? <p style={{color: 'red'}}>{error}, please try with index below 40</p> : null}
        <form onSubmit={handleSubmit}>
          <label>Enter your Index:</label>{' '}
          <input type="text" name="index" value={index} onChange={(event) => setIndex(event.target.value)}/>{' '}
          <button type="submit">Submit</button>
        </form>
      </Calculator>
      {seenIndexes.length ?
        <Summary>
          <div>
            <h2>Indicies I have seen:</h2>
            <div style={{textAlign: 'center'}}>{seenIndexes.map((index) => <span key={index} style={{marginRight: '4px'}}>{index}</span>)}</div>
          </div>
          <div>
            <h2>Calculated Values:</h2>
            {Object.keys(values).map(valueKey => <p key={valueKey}>For index {valueKey} I calculated {values[valueKey]}</p>)}
          </div>
        </Summary>
      : null}
    </Wrapper>
  )
}

const Wrapper = styled.div({
  width: '100%',
  height: '100%'
});

const Header = styled.header({
  width: '100%',
  padding: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid'
});

const Calculator = styled.div({
  width: '100%',
  padding: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '8px'
})

const Summary = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& > div:last-of-type': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '12px 0px'
  }
})

export { App };