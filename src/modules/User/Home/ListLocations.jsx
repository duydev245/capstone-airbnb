

import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Typography } from 'antd';
import { useSelector } from 'react-redux';

const ListLocations = () => {

    const listLocation = useSelector((state) => state.dataLocation.listLocation);
    console.log('listLocation: ', listLocation);

    const settings = {
        dots: true,
        // infinite: true,
        // speed: 1200,
        slidesToShow: 5,
        slidesToScroll: 5,
        // autoplay: true,
    };

    return (
        <>
            <div className='container mx-auto'>
                <Typography className=' text-2xl font-bold'>Khám phá Việt Nam</Typography>
                <Typography className=' text-md font-md'>Các điểm đến du lịch phổ biến</Typography>
                <Slider className='mt-5' {...settings}>
                    {listLocation?.map((item) => (
                        <div key={item.id} className='cursor-pointer border-y-[1px] p-3'>
                            <img className='hover-img rounded-xl w-full h-[200px] objectfit-contain' src={item.hinhAnh} alt="" />
                            <Typography className='text-lg font-semibold mt-2'>{item.tinhThanh}</Typography>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default ListLocations