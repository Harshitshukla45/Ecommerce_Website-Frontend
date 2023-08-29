import React, { useState } from 'react'
import './Sign.css';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

    const history = useHistory("");
    const [logdata, setdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });
    const addata = (event) => {
        const { name, value } = event.target;

        setdata(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    };
    //console.log(logdata);

    const senddata = async (e) => {
        e.preventDefault();
        const { fname, email, mobile, password, cpassword } = logdata;

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, email, mobile, password, cpassword
            })
        });

        const data = await res.json();
        //console.log(data)

        if (res.status === 422 || !data) {
            //alert("PLEASE FILL THE DATA CAREFULLY");
            toast.error("Fill the data carefully !", {
                position: "top-center"
            });
        }
        else if (res.status === 421) {
            toast.error("User already present !", {
                position: "top-center"
            });
        }
        else if (res.status === 400) {
            toast.error("Data insufficient !", {
                position: "top-center"
            });
        }
        else {
            // alert("YOU ARE NOW REGISTERED");
            toast.success("You are now registered.", {
                position: "top-center"
            });
            history.push("/signin")
            setdata({
                ...logdata,
                fname: "",
                email: "",
                mobile: "",
                password: "",
                cpassword: ""
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
                        <h1>Create Account</h1>
                        <div className="form_data">
                            <label htmlFor="name">Your name</label>
                            <input type="text" onChange={addata} name="fname" value={logdata.fname}
                                id="name" required />
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">email</label>
                            <input type="email" onChange={addata} name="email" value={logdata.email}
                                id="email" required />
                        </div>
                        <div className="form_data">
                            <label htmlFor="mobile">Mobile number</label>
                            <input type="Number" onChange={addata} name="mobile" value={logdata.mobile}
                                id="mobile" required />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={addata} name="password" value={logdata.password}
                                id="password" placeholder="At least 8 characters" required />
                        </div>
                        <div className="form_data">
                            <label htmlFor="passwordg">Password again</label>
                            <input type="password" onChange={addata} name="cpassword" value={logdata.cpassword}
                                id="passwordg" required />
                        </div>
                        <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>
                        <ToastContainer />
                        <div className="signin_info">
                            <p>Already have an account ?</p>
                            <button><Link to="/Signin" style={{ textDecoration: 'none' }}>Sign into your account</Link></button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Signup
