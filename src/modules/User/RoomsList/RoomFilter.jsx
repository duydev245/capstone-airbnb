

import React, { useEffect } from 'react';

const RoomFilter = ({ filters, setFilters }) => {
    console.log('filters: ', filters);

    const filterItem = [
        { label: 'khách', type: 'khach' },
        { label: 'giường', type: 'giuong' },
        { label: 'phòng ngủ', type: 'phongNgu' },
        { label: 'phòng tắm', type: 'phongTam' },
    ]

    const increaseCount = (type) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [type]: (prevFilters[type] || 0) + 1,
        }));
    };

    const decreaseCount = (type) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [type]: Math.max((prevFilters[type] || 0) - 1, 0),
        }));
    };

    useEffect(() => {

    }, [filters])

    return (
        <>
            {filterItem.map((item) => (
                <div key={item.type} className='flex justify-between items-center mt-5 border-b'>
                    <button
                        className="font-bold w-6 h-6 text-white button-gradient rounded-md flex justify-center"
                        onClick={() => decreaseCount(item.type)}
                    >
                        <div>–</div>
                    </button>
                    <div className='text-sm text-center'>{filters[item.type]} {item.label}</div>
                    <button
                        className="font-bold w-6 h-6 text-white button-gradient rounded-md flex justify-center"
                        onClick={() => increaseCount(item.type)}
                    >
                        <div>+</div>
                    </button>
                </div>
            ))}
        </>
    );
};

export default RoomFilter;
