import React from 'react'
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { LoginContext } from './ContextProvider';
import "./Drawer_left.css";
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Drawer_left = ({ logclose }) => {

    const [account, setAccount] = useContext(LoginContext);

    const [dropen, setDropen] = useState(false);

    const logout = async () => {
        try {
            const res = await fetch("/api/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data2 = await res.json();

            if (res.status !== 201 || !data2) {
                console.log("error");
            }
            else {
                toast.success("You are logged out.", {
                    position: "top-center"
                });
                setAccount(false);

            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="rightheader">
            <div className="right_nav">
                {
                    account ?
                        <Avatar className="avtar2"
                            title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar> :
                        <Avatar className="avtar" />
                }
                {account ? <h3>HELLO , {account.fname.toUpperCase()}</h3> : ""}
            </div>
            <div className="nav_btn">
                <NavLink to="/" onClick={() => logclose()}>Home</NavLink>
                <NavLink to="/" onClick={() => logclose()}>Shop By Category</NavLink>
                <Divider style={{ width: "100%", marginLeft: -20 }} />
                <NavLink to="/" style={{ marginTop: 10 }} onClick={() => logclose()}>Today's Deal</NavLink>
                <NavLink to="/checkout" onClick={() => logclose()}>Your Order</NavLink>
                <Divider style={{ width: "100%", marginLeft: -20 }} />
                <div className="flag">
                    <NavLink to="" style={{ marginTop: 14 }} onClick={() => logclose()}>Settings</NavLink>
                </div>
                <div className="flag">
                    <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                    <h4 style={{ cursor: "pointer", fontWeight: 500 }} onClick={logout}>Log Out</h4>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Drawer_left