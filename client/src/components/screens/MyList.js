import React ,{ useState,useEffect,useContext  } from 'react'
import Card from './Card.js'
import CardDelFav from './CardDelFav'
import CardFav from './CardFav'
import CardCurr from './CardCurr'
import CardCompleted from './CardCompleted'
import ParticlesBg from 'particles-bg'
import {UserContext} from '../../App'
import {Link,useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundcolor : "#212121"
    },
  }));

function MyList() {
    const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [fav, setFav] = useState([]);
  const [Curr, setCurr] = useState([]);
  const [Completed, setCompleted] = useState([]);
    const [games, setGames] = useState([]);
    const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
    
    useEffect(()=>{
        fetch("/userrated", {
            method: "get",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
            

        }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    setGames(data.userrated);
                }).catch(err => {
                    console.log(err)
                })
    }, [])
    
    useEffect(()=>{
        fetch("/getFav", {
        method: "get",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
        "Content-Type": "application/json"
        }
        
        }).then(res => res.json())
        .then(data => {
        console.log(data)
        setFav(data.getlist.games);
        }).catch(err => {
        console.log(err)
        })
        },[])

        useEffect(()=>{
          fetch("/getCompleted", {
          method: "get",
              headers: {
                  "Authorization":"Bearer "+localStorage.getItem("jwt"),
          "Content-Type": "application/json"
          }
          
          }).then(res => res.json())
          .then(data => {
          console.log(data)
          setCompleted(data.getlist.games);
          }).catch(err => {
          console.log(err)
          })
          },[])

        useEffect(()=>{
          fetch("/getCurr", {
          method: "get",
              headers: {
                  "Authorization":"Bearer "+localStorage.getItem("jwt"),
          "Content-Type": "application/json"
          }
          
          }).then(res => res.json())
          .then(data => {
          console.log(data)
          setCurr(data.getlist.games);
          }).catch(err => {
          console.log(err)
          })
          },[])
        
    //console.log(state);
    //console.log(fav);
    const rate = (a, b) => {
        if (b === 0) {
            return 0;
        }
        return (a/b).toFixed(1);
    }
    return (
        <div style={{
            maxWidth: "",
            margin: "0px auto",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img //class="dp"
                        style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src={state?.photo,`https://robohash.org/${state?.firstName}?size=200x200`}
                        />
                </div>
                <div class="white-text">
                    
                    <h4>{ state?.firstName} {state?.ign} { state?.lastName}</h4>
                    
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "110%",
                    }}>
                        <h5>5 year coin</h5>
                        <h5>{games.length} Ratings</h5> 
                    </div>
                </div>
            </div>
            <div class="white-text" style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "5px auto"
            }}>
            <div className="white-text" >
      <AppBar position="static" >
        <Tabs 
        centered
        className = "testBlack" 
        value={value} 
        onChange={handleChange} 
        aria-label="simple tabs example"
        >
          <Tab label="Favourites" {...a11yProps(0)} />
          <Tab label="On going" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
          <Tab label="User Rated" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div className="games">
            {/* <ParticlesBg color="black" type="cobweb" bg={true} /> */}
            {fav?.map(item => (
                <div>
                    <CardFav id={item._id}
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
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="games">
      {Curr?.map(item => (
                <div>
                    <CardCurr id={item._id}
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
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div className="games">
      {Completed?.map(item => (
                <div>
                    <CardCompleted id={item._id}
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
      </TabPanel>
      <TabPanel style={{}} value={value} index={3}>
        <div className="games">
            {/* <ParticlesBg color="black" type="cobweb" bg={true} /> */}
            {games?.map(item => (
                <div>
                    <Card id={item.game._id}
                        photo={item.game.coverPhoto}
                        name={item.game.name}
                        oldrating={rate(item.game.totalRating, item.game.noOfRating)}
                        genre={item.game.genre} company={item.game.company}
                        number={item.game.noOfRating} platform={item.game.platform}
                        releaseDate={item.game.releaseDate}
                        description={item.game.description}
                    />

                </div>
                ))}
                
         </div> 
      </TabPanel>
    </div>
            </div>
            
            
            
        </div>
    )
}

export default MyList