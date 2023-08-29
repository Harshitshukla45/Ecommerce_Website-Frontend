import React from 'react'
import Carousel from 'react-material-ui-carousel'
import './Banner.css';

function Banner() {

    const data = [
        "https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?w=1060&t=st=1691588654~exp=1691589254~hmac=5af4e4316acf2af015a38ef9a18702dbdd9e9475af7f41285b5774467336b277",
        "https://as1.ftcdn.net/v2/jpg/02/21/68/88/1000_F_221688829_LWscGbMcSNWvAmOrU1R7gAGoAd5hDY3P.jpg",
        "https://img.freepik.com/premium-psd/summer-banner-promotion-social-media-facebook-cover-banner-template_368797-1134.jpg?w=1380",
        "https://as1.ftcdn.net/v2/jpg/04/65/46/52/1000_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"]


    return (
        <div>
            <Carousel className='carasousel'
                autoPlay={true}
                animation='slide'
                indicators={false}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        backgroundColor: '#fff', color: '#494949', borderRadius: '0',
                        marginTop: '-22', height: '104px'
                    }
                }}
            >
                {
                    data.map((imag, i) => {
                        return (
                            <>
                                <img src={imag} alt="" className='banner_img' />
                            </>
                        )
                    })
                }

            </Carousel>

        </div>
    )
}

export default Banner
