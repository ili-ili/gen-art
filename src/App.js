import React from 'react';
import './App.css';
import { Button, Pane, Text, TextInputField, Textarea, toaster } from 'evergreen-ui'

import {
  saveData,
  loadData
} from './firebase'

class App extends React.Component {
  state = { items: [] }

  async componentDidMount() {
    const items = await loadData()
    this.setState({ items })
    console.log('data loaded', items)
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { name, description } = this.state
    const item = { name, description }
    console.log('state', item)
    await saveData(item)
    toaster.notify('Data saved!')
    this.setState({ items: this.state.items.concat(item) })
  }

  handleChange = e => {
    console.log('change', { [e.target.name]: e.target.value })
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { items } = this.state
    console.log('render', items)
    return (
      <div className="App">
        <Pane
          maxWidth={500}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          flexDirection="column"
          border="default"
          padding={40}
          style={{ margin: 'auto', marginTop: 100 }}
          elevation={1}
        >
          <Text>This is a form</Text>
          <br/>
          <form onSubmit={this.onSubmit} style={{ width: '100%' }}>
            <TextInputField
              required
              onChange={this.handleChange}
              name='name'
              width="100%"
              label="Write some stuff"
              description="This is a description."
            />

            <Textarea
              onChange={this.handleChange}
              name="description"
              placeholder="Textarea placeholder..."
            />
            <br />
            <Button type="submit">Sup 😎</Button>
          </form>
          <div>
            {items && items.map(item => 
              <Pane key={item.id} border="default" padding={10} marginTop={20}>
                <h3>{item.name}</h3> 
                <p>{item.description}</p>
              </Pane>
            )}
          </div>
        </Pane>

        
      </div>
    )
  } 
}

export default App;
