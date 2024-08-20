

import React from 'react'
import { Typography } from 'antd';
import { useSelector } from 'react-redux';


const ListLocations = () => {

    const listLocation = useSelector((state) => state.dataLocation.listLocation);
    console.log('listLocation: ', listLocation);

    return (
        <>
            <div className='container mx-auto'>
                <Typography className=' text-2xl font-bold'>Khám phá Việt Nam</Typography>
                <Typography className=' text-md font-md'>Các điểm đến du lịch phổ biến</Typography>
                <div className='grid grid-cols-5'>
                    {listLocation?.map((item) => (
                        <div key={item.id} className='cursor-pointer p-3'>
                            <img className='hover-img rounded-xl w-full h-[200px] objectfit-contain' src={item.hinhAnh} alt="" />
                            <Typography className='text-lg font-semibold mt-2'>{item.tinhThanh}</Typography>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default ListLocations