import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'


function Signin() {
    const history=useHistory()
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
                        M.toast({ html: "Signed in successfully", classes: "#43a047 green darken-1" })
                        history.push('/')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    
     
    return (
        <div className="mycard">
            <div className="card auth-card #212121 grey darken-4">
                <h2 class="white-text">GameGeek.GG</h2>
                <input
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="waves-effect waves-light btn #1b5e20 green darken-1"
                onClick={()=>{PostData()}}>
                    Sign in
                </button>
                <h5>
                    <Link to="/signup">Dont have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin
