import React from 'react'
import { Box, Button, Form, FormField, TextInput } from 'grommet'
import InputColor from 'react-input-color'
import styled from 'styled-components'
import { saveData } from '../firebase'

const ColorInput = styled.div`
  margin-top: 40px;
  margin-bottom: 20px; 
  margin-left: 12px;
  display: flex;
`

class App extends React.Component {
  state = { 
    name: '', 
    color: '#ff0000', 
    showPicker: false,
    notify: false
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { name, color } = this.state
    const item = { name, color }
    console.log('state', item)
    await saveData(item)
    this.setState({notify: true})
    // toaster.notify('Data saved!')
    this.props.onItemAdded && this.props.onItemAdded(item)
  }

  handleChange = e => {
    console.log('change', { [e.target.name]: e.target.value })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleColorChange = color => {
    this.setState({ color: color.hex, showPicker: false })
  }

  render () {
    const { color, notify } = this.state
    // console.log('color', color, 'showPicker', showPicker)
    return (
      <Box
        style={{ 
          margin: 'auto', marginTop: 100, 
          maxWidth: 500, padding: 40 
        }}>
        {/* {notify && (
          <Box state='Sample state'>Sample message</Box>
        )} */}
        <h3>Tell me color</h3>
        <br/>
        <Form onSubmit={this.onSubmit} style={{ width: '100%' }}>
          <ColorInput color={color}>
            Pick color: &nbsp;
            <InputColor
              initialValue='#5e72e4'
              onChange={this.handleColorChange}
              placement='right'
            />  
          </ColorInput>
          <FormField label='Enter your text'>
            <TextInput
              required
              onChange={this.handleChange}
              name='name'
              width='100%'
              label='Write some stuff'
              description='This is a description.'
            />
          </FormField>
          <br />
          <Button primary type='submit' size='medium' label='Sup 😎' />
        </Form>
      </Box>
    )
  } 
}

export default App;
