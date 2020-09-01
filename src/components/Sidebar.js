import React, { useState } from 'react'
import { Box, Button, Layer } from 'grommet'

import TheForm from './TheForm'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Box>
      <Button label='show' onClick={() => setShowSidebar(!showSidebar)} />
      
      {showSidebar && (
        <Layer
          position='right' full='true' modal={false}
          animation='slide'
          background='brand'          
        >
          <Button label='hide' onClick={() => setShowSidebar(!showSidebar)} />

          <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <TheForm onItemAdded={() => setShowSidebar(false)} />
          </div>
          
        </Layer>
      )}
    </Box>
  );
}
export default Sidebar