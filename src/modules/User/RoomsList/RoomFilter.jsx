

import React, { useEffect } from 'react';
import { Link as ScrollLink } from "react-scroll";

const RoomFilter = ({ filters, setFilters, showSkeleton }) => {
    console.log('filters: ', filters);

    const filterItem = [
        { label: 'khách', type: 'khach' },
        { label: 'giường', type: 'giuong' },
        { label: 'phòng ngủ', type: 'phongNgu' },
        { label: 'phòng tắm', type: 'phongTam' },
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
            {filterItem.map((item) => (
                <div key={item.type} className='flex justify-between items-center h-10 my-5 border-b'>
                    <ScrollLink
                        to='list'
                        smooth={true}
                        className="font-bold w-6 h-6 text-white button-gradient rounded-md flex justify-center"
                        onClick={() => decreaseCount(item.type)}
                    >
                        -
                    </ScrollLink>
                    <div className='text-sm text-center'>{filters[item.type]} {item.label}</div>
                    <ScrollLink
                        to='list'
                        smooth={true}
                        className="font-bold w-6 h-6 text-white button-gradient rounded-md flex justify-center"
                        onClick={() => increaseCount(item.type)}
                    >
                        +
                    </ScrollLink>
                </div>
            ))}
        </>
    );
};

export default RoomFilter;
