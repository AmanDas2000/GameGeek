import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

function CardFav({
  id,
  photo,
  name,
  oldrating,
  genre,
  company,
  platform,
  number,
  releaseDate,
  description,
}) {
  const [value, setValue] = React.useState(0);
  const [rating, setRating] = useState(0);
  var date = new Date(releaseDate);
  var formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
  const handleSliderChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleInputChange = (event) => {
    setRating(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (rating < 0) {
      setRating(0);
    } else if (rating > 10) {
      setRating(10);
    }
  };
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openReview, setOpenReview] = React.useState(false);
  const handleClickOpenReview = () => {
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const deleteFav = () => {
    console.log({ rating });
    fetch("/updatelist", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId : id,
        listType : "Fav",
        deleteGame : true
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#e57373 red" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

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
            <img
              className="activator"
              onClick={handleClickOpen}
              src={photo}
              alt={name}
            />
          </div>
          <div class="card-action">
            <span className="card-title activator white-text text-darken-4">
              {name}
              <i onClick={handleClickOpen} class="material-icons right">
                more_vert
              </i>
            </span>
            <p class="rate white-text text-darken-4">
              {oldrating}/10 ({number} reviews)
            </p>
          </div>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle
                className="testBlack white-text"
                id="form-dialog-title"
              >
                {name}
              </DialogTitle>

              <DialogContent className="testBlack white-text">
                <div className="game_single">
                  <div
                    className="dp"
                    style={{
                      margin: "5px auto",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      className="card-image small"
                      src={photo}
                      alt={name}
                    />
                  </div>

                  <div
                    style={{
                      margin: "20px 20px",
                    }}
                  >
                    <p>Genre : {genre.join(", ")}</p>
                    <p>Platform : {platform?.join(", ")}</p>
                    <p>Released: {formattedDate}</p>
                    <p>From : {company?.join(", ")}</p>
                  </div>
                </div>
                <DialogContentText
                  className="testBlack white-text"
                  style={{
                    margin: "10px auto",
                  }}
                >
                  {description}
                </DialogContentText>
                
              </DialogContent>
              <DialogActions className="testBlack white-text ">
                <div class="switch"></div>
                <button
                  className="waves-effect waves-light btn #c62828 red darken-3 "
                  onClick={()=>{deleteFav()}}
                >
                  Remove
                </button>
               
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardFav;
