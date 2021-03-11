import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
<<<<<<< HEAD
import Slide from '@material-ui/core/Slide';



function Card({ id, photo, name, oldrating,genre,company,platform,number,date,description }) {
  
  const history = useHistory()
  const [rating, setRating] = useState("")
  const [title, setTitle] = useState("")
=======


function Card({ id, photo, name, oldrating,category,company,number }) {
  const history=useHistory()
  const [rating, setRating] = useState("")
>>>>>>> e5d8a44a5e96c35ab098ebfda8e9a6f47163693f
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
<<<<<<< HEAD

  const [openReview, setOpenReview] = React.useState(false);
  const handleClickOpenReview = () => {
    setOpenReview(true);
  };
  
  const handleCloseReview = () => {
    setOpenReview(false);
  };
=======
>>>>>>> e5d8a44a5e96c35ab098ebfda8e9a6f47163693f

  const PostData = () => {
    console.log({rating})
    fetch("/rate", {
        method: "post",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            rating:parseInt(rating)
        })
    }).then(res => res.json())
        .then(data => {
            console.log(data)
                if (data.error) { 
                    M.toast({html: data.error, classes:"#e57373 red"})
                }
                else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
    }
  
  return (
      <div className="row ">
    <div className="col s40 m40">
          <div className="card sticky-action #212121 grey darken-4">
          {/* <div className="product__rating">
                {Array(rating)
	         	.fill()
	         	.map((_) => (
	         		<p>🔥</p>
	         	))}
	        </div>  */}
    <div class="card-image waves-effect waves-block waves-light">
              <img className="activator" onClick={handleClickOpen} src={photo} alt={name} />
              
    </div>
            <div class="card-action">
            
            <span className="card-title activator white-text text-darken-4">{name}<i onClick={ handleClickOpen} class="material-icons right">more_vert</i></span>
              <p class="rate white-text text-darken-4">{oldrating}/10 ({number} reviews)</p>
              
              
    </div>
<<<<<<< HEAD
    <div >
      
              
            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle className="testBlack white-text" id="form-dialog-title">{name}</DialogTitle>
              
        <DialogContent className="testBlack white-text" >
          <div className="game_single" >
            <div className="dp" style={{
                        margin: "5px auto",
                        
            }}>
                    <img
                      style={{
                        width: "100%",
                        height:"100%"
                      }}
                          className="card-image small"
                          src={photo}
                          alt={name} />
            </div>
              
            <div style={{
              margin:"20px 20px"
            }}>
              <p>
                Genre : {genre}
              </p>
              <p>
               Platform : {platform?.join(", ")}
              </p>
              <p>
                Realesed: date
              </p>
              <p>
                 From : {company?.join(", ")}
              </p>
              
              </div>
    </div>
          <DialogContentText className="testBlack white-text" style={{
            margin:"10px auto"
          }}>
             {description} 
          </DialogContentText>
          <DialogContentText className="game_single testBlack white-text">
            <div>
              review1
            </div>
            <div>
              review2
            </div>
          </DialogContentText>
          
        </DialogContent>
              <DialogActions className="testBlack white-text">
              <div class="switch">
    <label className="toggle white-text">
      Favourite
      <input type="checkbox"/>
      <span class="lever"></span>
      
    </label>
  </div>
        <button className="waves-effect waves-light btn #1b5e20 green darken-1"
                onClick={()=>{handleClickOpenReview()}}>
                    write review
                </button>
    <Dialog style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}} open={openReview} onClose={handleCloseReview} aria-labelledby="form-dialog-title">
      <DialogTitle className="testBlack white-text" id="form-dialog-title">Review</DialogTitle>
      <DialogContent className="testBlack white-text">
        <DialogContentText className="testBlack white-text">
                    {name}
                    
                  </DialogContentText>
                    <input
                      className="testBlack white-text"
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                          
                />
                    <textarea
                      className="testBlack white-text"
                    className="review-text"
                    type='text'
                    rows = "5" cols = "60"
                    placeholder='lets talk about the game'
                    //onChange={(e) => setRating(e.target.value)}
                />
        <input
                    className="testBlack white-text"
                    type='text'
=======
    <div class="card-reveal">
      <span class="card-title text-darken-4">{name}<i class="material-icons right">close</i></span>
              <p>genre: {category}</p>
            <p>company: {company}</p>

  <div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Write Review
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
                    Game: {name}
                    
                  </DialogContentText>
        <textarea
                    className="review-text"
                    type='text'
                    rows = "5" cols = "60"
                    placeholder='lets talk about the game'
                    //onChange={(e) => setRating(e.target.value)}
                />
        <input
                    type='text'
>>>>>>> e5d8a44a5e96c35ab098ebfda8e9a6f47163693f
                    placeholder='rate from 1 to 10'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
      </DialogContent>
<<<<<<< HEAD
      <DialogActions className="testBlack white-text">
        <Button onClick={handleCloseReview} className="green-text">
=======
      <DialogActions>
        <Button onClick={handleClose} color="primary">
>>>>>>> e5d8a44a5e96c35ab098ebfda8e9a6f47163693f
          close
        </Button>
        <button className="waves-effect waves-light btn #1b5e20 green darken-1"
                onClick={()=>{PostData()}}>
                    rate
                </button>
      </DialogActions>
    </Dialog>
<<<<<<< HEAD
        </DialogActions>
      </Dialog>
=======
  </div>

              
>>>>>>> e5d8a44a5e96c35ab098ebfda8e9a6f47163693f
    </div>

  
  </div>
    </div>
  </div>
    )
}

export default Card
