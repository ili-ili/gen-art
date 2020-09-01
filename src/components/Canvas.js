import React from 'react'
import { Main, Heading, Box } from 'grommet'
import { loadData } from '../firebase'


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

    return (
      <Main pad="large"
        {...this.props}
      >
        <Heading>Here goes the visualization</Heading>
        <div>
          {items && items.map(item => 
            <Box key={item.id} border="default" padding={10} marginTop={20} width="100%">
              <h3>{item.name}</h3> 
              <div style={{ width: 30, height: 30, backgroundColor: item.color }} />
            </Box>
          )}
        </div> 
      </Main>
    )
  }
}
export default Canvas