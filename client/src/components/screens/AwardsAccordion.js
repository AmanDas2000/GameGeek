import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

  function getFormattedDate(BSONdate){
    var date = new Date(BSONdate);
    return (date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());
  }


    function AwardsAccordion({
        awards  
        }) {
        
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    console.log({awards});
        return (
          <div>
            {awards?.map(item => (
            <div className="accordion-gaps">
              <Accordion className="testBlack white-text">
                <AccordionSummary className="testBlack white-text"
                  expandIcon={<ExpandMoreIcon style={{color:"white"}} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="testBlack white-text" style={{fontSize:"1.5rem"}}>{item.category}</div>
                  
                </AccordionSummary>
                <AccordionDetails>
                <div className="award_container testBlack white-text">
                    <div className="award_title">
                        {item.game.name}
                    </div>
                    
                        <div
                            className="award_photo dp"
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
                            src={item.game.coverPhoto}
                            alt={item.game.name}
                            />
                        </div>

                        <div
                            className="award_details"
                            style={{
                            margin: "20px 20px",
                            }}
                        >
                            <p>Genre : {item.game.genre.join(", ")}</p>
                            <p>Awarded Platform : {item.platform}</p>
                            <p>Released : {getFormattedDate(item.game.releaseDate)}</p>
                            <p>Year Awarded : {item.year}</p>
                            <p>From : {item.game.company.join(", ")}</p>
                        </div>
                    

                    <div className="award_description">
                        {item.game.description}
                    </div>
                </div>
                </AccordionDetails>
              </Accordion>
            </div>
            ))}
          </div>
          );
  
    }

    export default AwardsAccordion