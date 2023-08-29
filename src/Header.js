import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { LoginContext } from "./ContextProvider";
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Drawer_left from './Drawer_left';
import ListItem from '@mui/material/ListItem';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';

function Header() {
    const [account, setAccount] = useContext(LoginContext);
    const [dropen, setDropen] = useState(false);

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

        if (res.status !== 201) {
            alert("no data available")
        } else {
            // console.log("data cart main hain");
            setAccount(data);
        }
    };

    useEffect(() => {
        getdatabuy();
    }, []);

    const handleopen = (event) => {
        event.stopPropagation();
        setDropen(true);
    }

    const handleclose = () => {
        setDropen(false);
    };


    useEffect(() => {

        const handleOutsideClick = (event) => {
            if (dropen && !event.target.closest(".MuiDrawer-paper")) {
                setDropen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };

    }, [dropen]);

    const [text, setText] = useState("");
    const [liopen, setLiopen] = useState(true);
    const { products } = useSelector(state => state.getProReducer);
    //console.log(products)

    const getText = (text) => {
        setText(text)
        setLiopen(false)
    }

    return (

        <div className='header'>
            <Link to="/">
                <img className='header_logo' src='https://logos-world.net/wp-content/uploads/2020/04/Amazon-Emblem.jpg' alt='amazon logo' />
            </Link>
            <div className='header_search'>
                <input className='header_searchInput' onChange={(e) => getText(e.target.value)} placeholder="Search Your Products" />
                <SearchIcon className='header_searchIcon' />
            </div>
            {
                text &&
                <Grid className="extrasearch" hidden={liopen} >
                    {products
                        .filter(product => product.title.toLowerCase().includes(text.toLowerCase()))
                        .map(product => (
                            <ListItem className="extradoc" key={product.id}>
                                <NavLink to={`/getpone/${product.id}`} onClick={() => setLiopen(true)}>
                                    {product.title}
                                </NavLink>
                            </ListItem>
                        ))}
                </Grid>
            }

            <div className='header_nav'>
                {
                    account && account.fname ?

                        <div className='header_option'>
                            <Avatar className="avtar2" onClick={handleopen}>
                                {account.fname[0].toUpperCase()}
                            </Avatar>
                            <Drawer open={dropen} onClose={() => setDropen(false)}>
                                <Drawer_left logclose={handleclose} />
                            </Drawer>
                        </div>

                        :
                        <>
                            <Link to="/signin">
                                <div className='header_option'>
                                    <span className='header_optionLineOne'>Hello Guest</span>
                                    <span className='header_optionLineTwo'>Sign In</span>
                                </div>
                            </Link>
                        </>
                }

                <Link to="/checkout">
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon />
                        {account && account.carts ? (
                            <span className='header_optionLineTwo header_basketCount'>
                                {account.carts.length}
                            </span>
                        ) : (
                            <span className='header_optionLineTwo header_basketCount'>0</span>
                        )}
                    </div>
                </Link>

            </div >



        </div >
    )
}

export default Header;
