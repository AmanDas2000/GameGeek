import React, { useState, useContext } from 'react'
import {UserContext} from '../../App'
import { Link, useHistory } from 'react-router-dom'
import ParticlesBg from 'particles-bg'
import M from 'materialize-css'


function Signin() {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#e57373 red" })
            return;
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                    if (data.error) { 
                        M.toast({html: data.error, classes:"#e57373 red"})
                    }
                    else {
                        localStorage.setItem("jwt",data.token)
                        localStorage.setItem("user", JSON.stringify(data.user))
                        dispatch({type:"USER",payload:data.user})
                        M.toast({ html: "Sign in successful", classes: "#43a047 green darken-1" })
                        history.push('/')
                        
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    
     
    return (
        <div className="mycard" style={{
            marginBottom:"19rem"
        }}>
            <ParticlesBg color="#1b4332" type="cobweb" bg={true} />
            <div className="card auth-card #212121 grey darken-4">
                <h2 class="white-text">GameGeek.GG</h2>
                <input
                    class="white-text"
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    class="white-text"
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="waves-effect waves-light btn #1b5e20 green darken-1"
                onClick={()=>{PostData()}}>
                    Sign in
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin
