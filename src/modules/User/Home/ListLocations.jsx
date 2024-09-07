import React from 'react'
import { Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const ListLocations = () => {

    const listLocation = useSelector((state) => state.dataLocation.listLocation);

    return (
        <>
            <div className='container mx-auto xs:mt-5 xs-plus:mt-5'>
                <Typography className=' text-2xl font-bold'>Khám phá Việt Nam</Typography>
                <Typography className=' text-md font-md'>Các điểm đến du lịch phổ biến</Typography>
                <div className='grid xs:grid-cols-2 xs-plus:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5'>
                    {listLocation?.map((location) => (
                        <div key={location.id} className='hover-card cursor-pointer p-3'>
                            <Link to={`/rooms/${location.id}`}>
                                <img className='hover-img hover-box-shadow rounded-xl w-full xs:h-32 xs-plus:h-32 sm:h-40 md:h-44 lg:h-44 xl:h-52 objectfit-contain' src={location.hinhAnh} alt="" />
                                <Typography className='title-changes-color text-lg font-semibold mt-2'>{location.tinhThanh}</Typography>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default ListLocations