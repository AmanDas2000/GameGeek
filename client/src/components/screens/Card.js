import React from 'react'


function Card({ id, photo, name, rating,category,company,number }) {
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
	        </div> */}
    <div class="card-image waves-effect waves-block waves-light">
              <img className="activator" src={photo} alt={name} />
              
    </div>
            <div class="card-action">
            
              <span className="card-title activator white-text text-darken-4">{ name}<i class="material-icons right">more_vert</i></span>
              <p class="rate white-text text-darken-4">{rating}/10 ({number} reviews)</p>
              
              
    </div>
    <div class="card-reveal">
      <span class="card-title text-darken-4">{name}<i class="material-icons right">close</i></span>
              <p>genre: {category}</p>
              <p>company: {company}</p>
              <a class="waves-effect waves-light btn-small">review</a>
              
    </div>
  </div>
    </div>
  </div>
    )
}

export default Card
