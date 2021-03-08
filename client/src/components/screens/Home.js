import React,{ useState,useEffect  } from 'react'
import Card from './Card.js'
import ParticlesBg from 'particles-bg'

function Home() {
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
        <div className="games">
            {/* <ParticlesBg color="black" type="cobweb" bg={true} /> */}
            {games?.map(item => (
                <div>
                    <Card id={item._id} photo={item.photo} name={item.name} oldrating={rate(item.totalRating, item.noOfRating)} category={item.category} company={item.company} number={item.noOfRating} />

                </div>
                ))}
         </div>
        

    )
}

export default Home