import React from 'react'
import { Main, Heading, Box } from 'grommet'
import { loadData } from '../firebase'
import Sketch from "react-p5"

class Canvas extends React.Component {
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
    let x = 50
    const y = 50
    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(1024, 600).parent(canvasParentRef)
    }

    const draw = (p5) => {
      p5.background(0)
      p5.ellipse(x, y, 70, 70)
      x++
    }

    return (
      <Main pad="large" background='brand'
        {...this.props}
      >
        <Heading>----</Heading>
        <Sketch setup={setup} draw={draw} />
        {/* <div>
          {items && items.map(item => 
            <Box key={item.id} border="default" padding={10} marginTop={20} width="100%">
              <h3>{item.name}</h3> 
              <div style={{ width: 30, height: 30, backgroundColor: item.color }} />
            </Box>
          )}
        </div>  */}
      </Main>
    )
  }
}
export default Canvas