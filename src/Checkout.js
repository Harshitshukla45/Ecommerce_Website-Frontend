import React, { useState, useContext } from 'react'
import './Checkout.css';
import Subtotal from './Subtotal';
import { useEffect } from 'react';
import { LoginContext } from "./ContextProvider";
import CircularProgress from '@mui/material/CircularProgress';

function Checkout() {

    const [cartdata, setCartdata] = useState("");
    // console.log(cartdata.length);

    const getdatabuy = async () => {
        const res = await fetch("/api/checkout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data.carts);

        if (res.status === 201) {
            setCartdata(data.carts);
        }
    };

    useEffect(() => {
        setTimeout(getdatabuy, 1000)
    }, []);

    const [account, setAccount] = useContext(LoginContext);

    const removedata = async (id) => {
        try {
            const res = await fetch(`/api/remove/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data1 = await res.json();

            if (res.status === 400 || !data1) {
                console.log("error");
            }
            else {
                getdatabuy();
                setAccount(data1);

            }
        } catch (error) {
            console.log(error);
        }

    }
    const [content, setContent] = useState("");

    useEffect(() => {
        const delay = setTimeout(() => {
            setContent(<>
                <img className="alt_Img" src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/media/f59ed80d5c527e2461d8ba49adc36160.gif" alt="imageitem" />
                <h1 className="alt_Head" > Your Cart Is Empty</h1 >
            </>
            );
        }, 2500);

        return () => clearTimeout(delay);
    }, []);

    return (
        <>
            {
                cartdata.length ?
                    <>
                        <div className='checkout'>
                            <div className='checkout_left'>
                                <img className='checkout_ad' src='https://img.freepik.com/free-vector/minimal-charity-social-media-pack-youtube-channel-art_23-2149381218.jpg?size=626&ext=jpg&ga=GA1.2.654673844.1678444809&semt=ais' alt='amazon ad' />
                                <div>
                                    <h2 className='checkout_title'>
                                        your shopping basket
                                    </h2>
                                </div>
                            </div>
                            <div className='checkout_right'>
                                <Subtotal iteam={cartdata} />
                            </div>
                        </div>
                        {
                            cartdata.map((e, k) => {
                                return (
                                    <>
                                        <div className="item_container" >
                                            <img src={e.image} alt="imageitem" />
                                            <div className="item_details">
                                                <h3 className="unusuall">{e.title}</h3>
                                                <h3 className="diffrentprice">₹{e.price}.00</h3>
                                                <p >Usually dispatched in 8 days.</p>
                                                <button className='button4' onClick={() => removedata(e.id)}>Remove Product</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </>
                    :
                    <>
                        {content}
                    </>
            }
            {!content && !cartdata.length ? <div className="circle">
                <CircularProgress />
                <h2> Loading....</h2>
            </div> : ""}
        </>
    );
}

export default Checkout
