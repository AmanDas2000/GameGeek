import React,{ useState,useEffect  } from 'react'
import Card from './Card.js'
import ParticlesBg from 'particles-bg'
import { Link, useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

function Home() {
    const [show, setShow] = useState(false);
    const [games, setGames] = useState([]);
    
    useEffect(()=>{
        fetch("/allgames", {
            method: "get",

        }).then(res => res.json())
                .then(data => {
                    //console.log(data)
                    setGames(data.games);
                }).catch(err => {
                    console.log(err)
                })
    },[])
        
    console.log(games);
    const rate = (a, b) => {
        if (b === 0) {
            return 0;
        }
        return (a/b).toFixed(1);
    }
    
    
    
    return (
        <div>
            
            
  
 
           <div className="games">
            {/* <ParticlesBg color="#1b4332" type="cobweb" bg={true} /> */}
            
            
            {games?.map(item => (
                <div >
                    <Card id={item._id}
                        photo={item.coverPhoto}
                        name={item.name}
                        oldrating={rate(item.totalRating, item.noOfRating)}
                        genre={item.genre} company={item.company}
                        number={item.noOfRating} platform={item.platform}
                        releaseDate={item.releaseDate}
                        description={item.description}
                    />

                </div>
                ))}
         </div>
        </div>
        
        

    )
}

export default Home