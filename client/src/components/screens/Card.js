import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'


function Card({ id, photo, name, oldrating,category,company,number }) {
  const history=useHistory()
  const [rating, setRating] = useState(0)

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
              <img className="activator" src={photo} alt={name} />
              
    </div>
            <div class="card-action">
            
              <span className="card-title activator white-text text-darken-4">{ name}<i class="material-icons right">more_vert</i></span>
              <p class="rate white-text text-darken-4">{oldrating}/10 ({number} reviews)</p>
              
              
    </div>
    <div class="card-reveal">
      <span class="card-title text-darken-4">{name}<i class="material-icons right">close</i></span>
              <p>genre: {category}</p>
            <p>company: {company}</p>
              <input
                    type='text'
                    placeholder='rate'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
            <button className="waves-effect waves-light btn #1b5e20 green darken-1"
                onClick={()=>{PostData()}}>
                    rate
                </button>
              
    </div>
  </div>
    </div>
  </div>
    )
}

export default Card
