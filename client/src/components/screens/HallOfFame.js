import {React,useState, useEffect} from 'react'
import AwardsAccordion from './AwardsAccordion'

function HallOfFame() {
    const [hallOfFameAwards, setHallOfFameAwards] = useState([]);

    useEffect(()=>{
        fetch("/findAwardsByPlatform", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({"platform":"HallOfFame"})
        }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setHallOfFameAwards(data.awards);
                }).catch(err => {
                    console.log(err);
                });
      },[]);
      
        
    return (

        <div >
            <div>
                <h5
                    class="white-text halloffame">Hall of Fame</h5>
            </div>
            <div className="accordion">
                <AwardsAccordion 
                awards={hallOfFameAwards} 
                />
            </div>
        </div>
    )
}

export default HallOfFame
