import React from 'react'
import './Product.css';
import { Link } from 'react-router-dom';
function Product(props) {
    return (

        <div className='product'>
            <Link to={`/getpone/${props.id}`} style={{ textDecoration: 'none' }}>
                <div className='product_info'>
                    <p className='titlebig'>{props.title}</p>
                    <p className='product_price'>
                        <small>₨ </small>
                        <strong>{props.price}</strong>
                    </p>
                    <div className='product_rating'>
                        {Array(props.rating).fill().map((_, i) => (<p>⭐</p>))}
                    </div>
                </div>
            </Link>
            <img src={props.image} alt='' />
            <a href={`/getpone/${props.id}`} class="button">BUY NOW</a>
        </div>
    );
}


export default Product
