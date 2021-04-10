import React,{ useState,useEffect  } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AwardsAccordion from './AwardsAccordion.js'

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
    backgroundColor: theme.palette.background.paper,
  },
}));

function Awards() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [PCAwards, setPCAwards] = React.useState([]);
  const [PSAwards, setPSAwards] = React.useState([]);
  const [XboxAwards, setXboxAwards] = React.useState([]);
  const [NintendoAwards, setNintendoAwards] = React.useState([]);
  

  useEffect(()=>{
      fetch("/findAwardsByPlatform", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"platform":"PC"})
      }).then(res => res.json())
              .then(data => {
                  //console.log(data);
                  setPCAwards(data.awards);
              }).catch(err => {
                  console.log(err);
              });
  },[]);
  
  useEffect(()=>{
    fetch("/findAwardsByPlatform", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"platform":"PS"})
    }).then(res => res.json())
            .then(data => {
                //console.log(data);
                setPSAwards(data.awards);
            }).catch(err => {
                console.log(err);
            });
},[]);
useEffect(()=>{
  fetch("/findAwardsByPlatform", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"platform":"Xbox"})
  }).then(res => res.json())
          .then(data => {
              //console.log(data);
              setXboxAwards(data.awards);
          }).catch(err => {
              console.log(err);
          });
},[]);
useEffect(()=>{
  fetch("/findAwardsByPlatform", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"platform":"Nintendo"})
  }).then(res => res.json())
          .then(data => {
              //console.log(data);
              setNintendoAwards(data.awards);
          }).catch(err => {
              console.log(err);
          });
},[]);


  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    

  return (
    <div className="accordion">
      <div className="white-text" style={{
        fontSize:"2.5rem",margin:"0px 5% 20px 25%"
      }}>
        GameGeek.GG Awards 2020
      </div>
      <AppBar position="static">
        <Tabs centered
        className = "testBlack" 
        value={value} 
        onChange={handleChange} 
        aria-label="simple tabs example">
          <Tab label="PC" {...a11yProps(0)} />
          <Tab label="PlayStation" {...a11yProps(1)} />
          <Tab label="Xbox" {...a11yProps(2)} />
          <Tab label="Nintendo" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0}>
          <AwardsAccordion
            awards={PCAwards}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AwardsAccordion 
            awards={PSAwards}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AwardsAccordion 
            awards={XboxAwards}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AwardsAccordion 
            awards={NintendoAwards}
          />
        </TabPanel>
    </div>
  );
}

export default Awards;
