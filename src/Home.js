import './Home.css';
import Product from './Product.js'
import Banner from './Banner.js';
import React, { useEffect } from 'react'
import getProducts from "./redux_react/action";
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

function Home() {

    const { products } = useSelector(state => state.getProReducer);
    //console.log(products)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            {
                products.length > 0 ?
                    <div className='home'>
                        <div className='home_container'>
                            <Banner />
                            <div className='home_row '>
                                <Product
                                    price={products[0].price}
                                    id={products[0].id}
                                    title={products[0].title}
                                    rating={products[0].rating}
                                    image={products[0].image}
                                />
                                <Product
                                    price={products[1].price}
                                    id={products[1].id}
                                    title={products[1].title}
                                    rating={products[1].rating}
                                    image={products[1].image}
                                />
                            </div>
                            <div className='home_row'>
                                <Product
                                    price={products[2].price}
                                    id={products[2].id}
                                    title={products[2].title}
                                    rating={products[2].rating}
                                    image={products[2].image}
                                />
                            </div>
                            <div className='home_row '>
                                <Product
                                    price={products[3].price}
                                    id={products[3].id}
                                    title={products[3].title}
                                    rating={products[3].rating}
                                    image={products[3].image}
                                />
                                <Product
                                    price={products[4].price}
                                    id={products[4].id}
                                    title={products[4].title}
                                    rating={products[4].rating}
                                    image={products[4].image} />
                                <Product
                                    price={products[5].price}
                                    id={products[5].id}
                                    title={products[5].title}
                                    rating={products[5].rating}
                                    image={products[5].image}
                                />
                            </div>

                        </div>
                    </div> :
                    <div className="circle">
                        <CircularProgress />
                        <h2> Loading....</h2>
                    </div>
            }
        </>
    )
}

export default Home
