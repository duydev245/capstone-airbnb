

import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link as ScrollLink } from "react-scroll";

const RoomFilter = ({ filters, setFilters, showSkeleton }) => {

    const filterItem = [
        { label: 'Khách', type: 'khach' },
        { label: 'Giường', type: 'giuong' },
        { label: 'Phòng ngủ', type: 'phongNgu' },
        { label: 'Phòng tắm', type: 'phongTam' },
    ]

    const increaseCount = (type) => {
        showSkeleton()
        setFilters(prevFilters => ({
            ...prevFilters,
            [type]: (prevFilters[type] || 0) + 1,
        }));
    };

    const decreaseCount = (type) => {
        const currentCount = filters[type] || 0;
        if (currentCount > 0) {
            showSkeleton();
            setFilters(prevFilters => ({
                ...prevFilters,
                [type]: currentCount - 1,
            }));
        }
    };

    useEffect(() => {

    }, [filters])

    return (
        <>
            <Typography className='text-lg font-semibold mb-4 flex justify-center'>
                Tùy chọn
            </Typography>
            {filterItem.map((item) => (
                <div key={item.type} className='border-b mt-1'>
                    <div className='flex justify-center'>
                        {item.label}
                    </div>
                    <div className=' flex justify-between items-center h-10'>
                        <ScrollLink
                            to='list'
                            smooth={true}
                            className="font-bold w-6 h-6 text-white button-gradient rounded-md flex justify-center"
                            onClick={() => decreaseCount(item.type)}
                        >
                            -
                        </ScrollLink>
                        <div className='text-sm text-center'>
                            <span className={`${filters[item.type] === 0 ? 'text-gray-300' : ''}`}>{filters[item.type]}</span>
                        </div>
                        <ScrollLink
                            to='list'
                            smooth={true}
                            className="font-bold w-6 h-6 text-white button-gradient rounded-md flex justify-center"
                            onClick={() => increaseCount(item.type)}
                        >
                            +
                        </ScrollLink>
                    </div>
                </div>
            ))}
        </>
    );
};

export default RoomFilter;
