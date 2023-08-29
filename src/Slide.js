import React, { useContext, useEffect, useState } from 'react'
import "./Slide.css";
import { Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { LoginContext } from "./ContextProvider"
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slide = () => {

    const { id } = useParams("");

    const [account, setAccount] = useContext(LoginContext);

    const [inddata, setIndedata] = useState("");

    //console.log([inddata]);

    const getinddata = async () => {
        const res = await fetch(`/api/getpone/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        });

        const data = await res.json();
        //console.log(data);

        if (res.status !== 201) {
            console.log("error in showing");
        } else {
            setIndedata(data);
        }
    };
    useEffect(() => {
        getinddata();
    }, [id]);


    const addtocart = async (id) => {
        try {
            const checkres = await fetch(`/api/addcart/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inddata
                }),
                credentials: "include"
            });
            const data1 = await checkres.json();

            if (checkres.status === 201) {
                toast.success("Product added in your cart.", {
                    position: "top-center"
                });
                setAccount(data1);
            } else if (checkres.status === 200) {
                toast.info("Product already in your cart.", {
                    position: "top-center"
                });
            } else {
                toast.error("No Data Available!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            toast.info("Sign In to Add Product", {
                position: "top-center"
            });
            console.error(error);
        }
    };


    return (

        <div className="cart_section">
            {inddata && Object.keys(inddata).length &&
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={inddata.image} alt="cart" />
                        <div className="cart_btn">
                            <button className="cart_btn1" onClick={() => addtocart(inddata.id)}>Add to Cart</button>
                            <ToastContainer />
                            <button className="cart_btn2">Buy Now</button>
                        </div>


                    </div>
                    <div className="right_cart">
                        <h3>{inddata.title}</h3>
                        <Divider />
                        <p className="mrp">M.R.P. : Rs {inddata.price}</p>
                        <p>Deal of the Day : Rs  {inddata.price - (inddata.price / 10)}</p>
                        <p>You save : <span style={{ color: "#B12704" }}>{inddata.price / 10}</span></p>

                        <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>10% OFF</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span></h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11 AM</span></p>
                        </div>
                        <p className="description"><span style={{ display: "flex", flexdirection: "row", color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>Rating :  {Array(inddata.rating).fill().map((i) => (<p>⭐</p>))}</span></p>
                    </div>
                </div>
            }
            {!inddata ? <div className="circle">
                <CircularProgress />
                <h2> Loading....</h2>
            </div> : ""}
        </div >
    )
}


export default Slide