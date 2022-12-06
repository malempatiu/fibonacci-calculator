import { useState } from "react";
import styled from "styled-components";

const App = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  }

  return (
    <Wrapper>
      <Header>
        <h1>Fibonacci Calculator</h1>
      </Header>
      <Calculator>
        <form onSubmit={handleSubmit}>
          <label>Enter your Index:</label>{' '}
          <input type="text" name="index" />{' '}
          <button type="submit">Submit</button>
        </form>
      </Calculator>
      <Summary>
        <div>
          <h2>Indicies I have seen:</h2>
          <span>10, 5, 7</span>
        </div>
        <div>
          <h2>Calculated Values:</h2>
          <p>For index 10 I calculated 89</p>
          <p>For index 7 I calculated 21</p>
          <p>For index 5 I calculated 8</p>
        </div>
      </Summary>
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
  alignItems: 'center'
})

const Summary = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& > div': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '12px 0px'
  }
})

export { App };