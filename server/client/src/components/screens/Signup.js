import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import M, { Datepicker } from 'materialize-css'
import ParticlesBg from 'particles-bg'


function Signup() {
    const history=useHistory()
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [dateOfBirth,setDateOfBirth] = useState("")
    const [password,setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [ign, setIgn] = useState("")
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#e57373 red" })
            return;
        }
        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)) {
             M.toast({ html: "password should contain atleast one number and atleast one special charecter", classes: "#e57373 red" })
             return;
         }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               firstName,
               lastName,
               email,
               password,
               dateOfBirth,
               ign
            })
        }).then(res => res.json())
                .then(data => {
                    if (data.error) { 
                        M.toast({html: data.error, classes:"#e57373 red"})
                    }
                    else {
                        M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                        history.push('/signin')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }

    return (
        <div className="mycard" style={{
            marginBottom:"18rem"
        }}>
            <ParticlesBg color="#1b4332" type="cobweb" bg={true} />
            <div className="card auth-card #212121 grey darken-4">
                <h2 class="white-text">GameGeek.GG</h2>
                <div style={{display : "flex"}}>
                <input 
                    class="white-text"
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                />
                <input
                    class="white-text"
                    type='text'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                />
                </div>
                <div style={{display : "flex"}}>
                <p 
                class="white-text"
                style={{margin:"6px 2px 2px 0px"}}>
                    <h6>IGN</h6>
                </p>
                <input
                    class="white-text"
                    type='text'
                    style ={{margin:"0px 0px 0px 8px"}}
                    placeholder='n00b'
                    value={ign}
                    onChange={(e)=>setIgn(e.target.value)}
                />
                </div>
                <div style={{display : "flex"}}>
                <p class = "white-text" style={{width:"30%"}} >Date Of Birth</p>
                <input
                    style={{width:"70%"}}
                    class = "white-text"
                    type ="date"
                    placeholder = "Date of Birth"
                    value={dateOfBirth}
                    onChange={(e)=>setDateOfBirth(e.target.value)}
                />
                </div>
                <input
                    class="white-text"
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    class="white-text"
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="waves-effect waves-light btn #1b5e20 green darken-1"
                onClick={()=>PostData()}>
                    Sign up
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup
