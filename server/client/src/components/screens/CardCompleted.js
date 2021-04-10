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

function Card({
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
  const [review, setReview] = useState("");
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

  const PostData = () => {
    console.log({ rating });
    fetch("/rate", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        review: {
          title: title,
          description: review,
        },
        rating: parseInt(rating),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#e57373 red" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          //history.push("/");
          window.parent.location.reload();

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const addFav = () => {
    fetch("/updatelist", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId : id,
        listType : "Fav",
        deleteGame : false
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#e57373 red" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          //history.push("/");
          window.parent.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCompleted = () => {
    console.log({ rating });
    fetch("/updatelist", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId : id,
        listType : "Completed",
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
          //history.push("/");
          window.parent.location.reload();
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
              <DialogActions className="testBlack white-text">
                <div class="switch"></div>

                <button
                  className="waves-effect waves-light btn #1976d2 blue darken-2"
                  onClick={() => {
                    addFav();
                  }}
                >
                  add to Favourites
                </button>
                <button
                  className="waves-effect waves-light btn #1b5e20 green darken-1"
                  onClick={() => {
                    handleClickOpenReview();
                  }}
                >
                  write review
                </button>
                <button
                  className="waves-effect waves-light btn #c62828 red darken-3"
                  onClick={() => {
                    deleteCompleted();
                  }}
                >
                  Remove
                </button>
                <Dialog
                  disableAutoFocus="false"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                  }}
                  open={openReview}
                  onClose={handleCloseReview}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle
                    className="testBlack white-text"
                    id="form-dialog-title"
                  >
                    Review
                  </DialogTitle>
                  <DialogContent className="testBlack white-text">
                    <DialogContentText className="testBlack white-text">
                      {name}
                    </DialogContentText>
                    <input
                      className="testBlack white-text"
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      className="testBlack white-text"
                      className="review-text"
                      type="text"
                      rows="5"
                      cols="60"
                      placeholder="lets talk about the game"
                      //onChange={(e) => setRating(e.target.value)}
                    />
                    <div
                      className="testBlack"
                      style={{
                        width: 250,
                      }}
                    >
                      <Typography
                        className="testBlack white-text"
                        id="input-slider"
                        gutterBottom
                      >
                        Rating
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item></Grid>
                        <Grid item xs>
                          <Slider
                            style={{ color: "green" }}
                            min={0}
                            step={1}
                            max={10}
                            value={typeof rating === "number" ? rating : 0}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="input-slider"
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </DialogContent>
                  <DialogActions className="testBlack white-text">
                    <Button onClick={handleCloseReview} className="green-text">
                      close
                    </Button>
                    <button
                      className="waves-effect waves-light btn #1b5e20 green darken-1"
                      onClick={() => {
                        PostData();
                      }}
                    >
                      rate
                    </button>
                  </DialogActions>
                </Dialog>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
