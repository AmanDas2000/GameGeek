import React,{ useState,useEffect  } from 'react'
import Card from './Card.js'
import CardHome from './CardHome.js'
import ParticlesBg from 'particles-bg'
import { Link, useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

function Home() {
    const [rated, setRated] = useState([]);
    const [popular, setPopular] = useState([]);
    const [open, setOpen] = React.useState("");
    
    useEffect(()=>{
        fetch("/getpopular", {
            method: "get",

        }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    setPopular(data);
                }).catch(err => {
                    console.log(err)
                })
    }, [])
    useEffect(()=>{
      fetch("/gethighestrated", {
          method: "get",

      }).then(res => res.json())
              .then(data => {
                  //console.log(data)
                  setRated(data);
              }).catch(err => {
                  console.log(err)
              })
  },[])
        
    console.log(popular);
    const rate = (a, b) => {
        if (b === 0) {
            return 0;
        }
        return (a/b).toFixed(1);
    }
    
    
    
    return (
        <div>
            
        <div>
          <h4 style={{
            margin:"20px 0px 0px 30px"
          }}
            class="white-text">Popular</h4>
            </div>
            
           <div className="gamesPopular">
            {/* <ParticlesBg color="#1b4332" type="cobweb" bg={true} /> */}
            
            
            {popular?.map(item => (
                <div >
                    <CardHome id={item._id}
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
        <div>
          <h4
            style={{
            margin:"-30px 0px 0px 30px"
          }}
            class="white-text">Highest Rated</h4>
            </div>
        <div className="gamesPopular">
            {/* <ParticlesBg color="#1b4332" type="cobweb" bg={true} /> */}
            
            
            {rated?.map(item => (
                <div >
                    <CardHome id={item._id}
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
        <div>
          <h4
            style={{
            margin:"-30px 0px 0px 30px"
          }}
            class="white-text">Highest Rated</h4>
            </div>
        <div className="gamesPopular">
            {/* <ParticlesBg color="#1b4332" type="cobweb" bg={true} /> */}
            
            
            {rated?.map(item => (
                <div>
                    <CardHome id={item._id}
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