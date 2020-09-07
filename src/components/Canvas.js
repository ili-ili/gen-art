import React from 'react'
import { Main, Heading, Box } from 'grommet'
import { loadData } from '../firebase'
import p5 from 'p5'

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
    let a = [];
    items.map(item => {
      a.push(item.name)
    })
    console.log('render', items)
    const s = ( sketch ) => {
      let t = [];
      const MIN_RADIUS = 20;
      const STRS = ["TEST","WORDS","+++","TEXT","- - -","****","E","N","T","X"];
      class TextCircle
      {
        constructor(_str)
        {
          this.str = _str;
          this.charNum = 50;
          this.radius = MIN_RADIUS;
          this.angle = 0;
          this.texSize = 0;
          this.rotateSp = Math.random(-Math.PI/500,Math.PI/500);
        }
        
        update(newRadius)
        {
          this.radius = newRadius;
          this.texSize = this.radius*2*Math.PI/this.charNum;
          this.angle += this.rotateSp;
        }
        
        display()
        {
          sketch.textSize(this.texSize);
          const angleSpan = 2*Math.PI/this.charNum;
          let i = 0;
          for(let r = 2*Math.PI; r > 0; r -= angleSpan)
          {
            let char = this.str.charAt(i%this.str.length);
            sketch.push();
            sketch.translate(sketch.width/2,sketch.height/2);
            sketch.rotate(r+this.angle);
            sketch.text(char,0,this.radius);
            sketch.pop();
            i++
          }
        }
        
        isDead()
        {
          if(this.radius > sketch.max(sketch.width,sketch.height)*0.8)return true;
          else return false;
        }
      }
    
      sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        t[0] = new TextCircle(STRS[sketch.int(sketch.random(STRS.length))]);
      };
    
      sketch.draw = () => {
        sketch.background(245);
        for(let i = t.length-1; i >= 0; i--){
          if(i === t.length-1)t[i].update(t[i].radius+5);
          else t[i].update(t[i+1].radius-t[i+1].texSize);
          t[i].display();
          if(t[i].isDead())t.splice(i,1);
        }
        if(t[0].radius > MIN_RADIUS)t.unshift(new TextCircle(STRS[sketch.int(sketch.random(STRS.length))]));
      };
    };
    let myp5 = new p5(s);
    

    return (
      <Main pad="large" background='brand'
        {...this.props}
      >
        <Heading>----</Heading>
        <myp5></myp5>
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