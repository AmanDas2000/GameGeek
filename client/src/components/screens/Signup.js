import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'


function Signup() {
    const history=useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email, setEmail] = useState("")
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
                name,
                password,
                email
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
        <div className="mycard">
            <div className="card auth-card #212121 grey darken-4">
                <h2 class="white-text">GameGeek.GG</h2>
                <input
                    type='text'
                    placeholder='name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
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
