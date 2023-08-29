import React, { useState, useContext } from 'react'
import './Sign.css';
import { Link, useHistory } from 'react-router-dom';
import { LoginContext } from "./ContextProvider"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {

    const history = useHistory("");
    const [account, setAccount] = useContext(LoginContext);
    const [logdata, setdata] = useState({
        email: "",
        password: ""
    });
    const addata = (e) => {
        const { name, value } = e.target;
        // console.log(e.target.value);

        setdata(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    }

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();
        //console.log(data)

        if (res.status === 422 || !data) {
            //alert("PLEASE FILL THE DATA CAREFULLY");
            toast.error("Please fill the data carefully !", {
                position: "top-center"
            });
        }
        else if (res.status === 421) {
            // alert("USER NOT FOUND");
            toast.error("User not found !", {
                position: "top-center"
            });
        }
        else {
            // alert("YOU ARE NOW SIGNED");
            toast.success("You are now signed.", {
                position: "top-center"
            });
            history.push("/")
            setAccount(data);
            setdata({
                ...logdata,
                email: "",
                password: ""
            })

        }
    }


    return (
        <section>
            <div className="sign_container">
                <Link to="/">
                    <div className="sign_header">
                        <img src="https://www.freepnglogos.com/uploads/amazon-png-logo-vector/world-brand-amazon-png-logo-vector-27.png" alt="signupimg" />
                    </div>
                </Link>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Sign-In</h1>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input onChange={addata} value={logdata.email} type="email" name="email" id="email" required />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={addata} value={logdata.password} id="password" placeholder="At least 8 characters" required />
                        </div>
                        <button type="submit" className="signin_btn" onClick={senddata} >Continue</button>
                        <ToastContainer />
                    </form>
                </div>
                <div className="create_accountinfo">
                    <p>New to Amazon ?</p>
                    <button><Link to="/signup">Create your Amazon Account</Link></button>
                </div>
            </div>

        </section>
    )
}

export default Signin
