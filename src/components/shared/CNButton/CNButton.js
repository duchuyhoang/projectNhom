import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

export const Buttons = () =>{
  const [variant, setVariant] =useState("contained")
  function setHoverIn() {
    setVariant("outlined")
  }
  function setHoverOut() {
    setVariant("contained")
  }
  return (
    <Button 
      color='primary'
      
      variant={variant}
      style={{
        minWidth: "100px",
        color:"#000",
        fontWeight:"500",
        fontSize:"16px"
      }}
      onMouseOver={() => setHoverIn()}
      onMouseOut={() => setHoverOut()}

  
    > 
      Search
    </Button>
  );
}