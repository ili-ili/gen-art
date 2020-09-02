import React, { useState } from 'react'
import { Box, Button, Layer } from 'grommet'
import { Close } from 'grommet-icons'

import TheForm from './TheForm'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <Box>
      {/* <Button label='show' onClick={() => setShowSidebar(!showSidebar)} /> */}
      
      {showSidebar && (
        <Layer
          position='right' full='true' modal={false}
          animation='slide'
          background='brand'          
        >
          <Button onClick={() => setShowSidebar(!showSidebar)}><Close color='plain' size='medium' /></Button>
          <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <TheForm onItemAdded={() => setShowSidebar(false)} />
          </div>
          
        </Layer>
      )}
    </Box>
  );
}
export default Sidebar