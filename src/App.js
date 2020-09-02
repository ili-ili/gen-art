import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import { Grommet } from 'grommet';

import { loadData } from './firebase'

const theme = {
  global: {
    colors: {
      brand: 'black',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};
class App extends React.Component {
  state = { items: [] }

  async componentDidMount() {
    const items = await loadData()
    this.setState({ items })
    console.log('data loaded', items)
  }

  handleChange = e => {
    console.log('change', { [e.target.name]: e.target.value })
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { items } = this.state
    console.log('render', items)
    return (
      <Grommet plain theme={theme} full>
        <Sidebar />    
        <Canvas />     
        {/* <div>
            {items && items.map(item => 
              <Pane key={item.id} border="default" padding={10} marginTop={20} width="100%">
                <h3>{item.name}</h3> 
                <p>{item.description}</p>
              </Pane>
            )}
          </div> */}
      </Grommet>
    )
  } 
}

export default App;
