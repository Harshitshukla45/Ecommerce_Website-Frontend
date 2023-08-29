import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format";
import { useEffect, useState } from 'react';

const Subtotal = ({ iteam }) => {

    const [price, setPrice] = useState(0);

    const totalAmount = () => {
        let price = 0
        iteam.map((item) => {
            price += item.price
        });
        setPrice(price)
    }

    useEffect(() => {
        totalAmount();
    }, [iteam]);


    return (
        <div className='subtotal'>
            <CurrencyFormat renderText={(value) => (
                <>
                    <p>
                        Subtotal ({iteam.length} items): <strong>{price}</strong>
                    </p>
                    <small className='subtotal_gift'>
                        <input type='checkbox' />This order conatains a gift
                    </small>
                </>
            )}
                decimalScale={2}
                value={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs"}

            />
            <button>Proceed to BUY</button>
        </div>
    )
}

export default Subtotal
