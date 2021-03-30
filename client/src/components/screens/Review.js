import React from 'react'

function Review() {
  const [open, setOpen] = React.useState("");
  
  console.log(open)
  return (
    <div>
      <input
                    class="white-text"
                    type='text'
                    placeholder='text'
                    value={open}
                    onChange={(e)=>setOpen(e.target.value)}
      />
      <button onClick={()=>{window.find(open)}}>
        find
      </button>
    </div>
  )
}

export default Review
