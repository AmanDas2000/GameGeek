import React from 'react'


function Review({title,rating,firstName,description}) {
    return (
        <div>
            {title}<br />
            {rating}/10<br/>
            <p>{description}</p><br />
                    
            <p class="yellow-text">by {firstName}</p>
        </div>
    )
}

export default Review
