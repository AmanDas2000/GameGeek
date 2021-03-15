import React from 'react'

function Review() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  console.log(open)
  return (
    <div>
      <label class="switch">
	<input class="switch-input" type="checkbox" />
        <span class="switch-label"
          data-on={handleClickOpen}
          data-off={handleClose}></span>
        {console.log(open)}
	<span class="switch-handle"></span> 
</label>
    </div>
  )
}

export default Review
