

import { useQuery } from '@tanstack/react-query'
import { Col, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { locationApi } from '../../../apis/location.api'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../redux/slices/location.slice';
import { Link, useLocation } from 'react-router-dom';
import { setLocalStorage } from '../../../utils';

const SearchBar = () => {

    //Date Select
    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;

    const guestOptions = [
        { option: "1 khách", value: "1" },
        { option: "2 khách", value: "2" },
        { option: "từ 3 khách trở lên", value: "3" },
    ];

    const [locationSelected, setLocationSelected] = useState('');
    const [datesSelected, setDatesSelected] = useState('');
    const [guestSelected, setGuestSelected] = useState('');

    const dispatch = useDispatch()

    const { pathname } = useLocation()

    const { data: listLocation, isLoading, error } = useQuery({
        queryKey: ['list-location'],
        queryFn: () => locationApi.getLocation(),
    });

    const handleDateSelected = (dates, dateStrings) => {
        setDatesSelected(dateStrings)
    }

    const handleOnSelect = (value) => {
        const currentLocation = listLocation.find(location => location.id === value);

        if (currentLocation) {
            if (currentLocation.id === value) {
                setLocationSelected(currentLocation.id);
            }
        } else {
            setGuestSelected(value);
        }
    }

    const seachParams = {
        date: datesSelected,
        guest: guestSelected,
    }


    useEffect(() => {
        dispatch(setLocation(listLocation))
        if (seachParams.guest) {
            // setLocalStorage('seachParams', seachParams)
        }

    }, [listLocation, seachParams])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong</div>;
    if (!listLocation) return ''

    return (
        <>
            <Row gutter={24} style={{ margin: 'auto' }} className=" max-w-screen-xl mx-auto absolute seachbar border-2 shadow-xl border-gray-400 bg-white md:rounded-lg w-full">
                <Col span={8} className="col-span-4 flex-1 px-6 py-3 flex flex-col justify-center items-center">
                    <Select
                        onSelect={handleOnSelect}
                        className="h-[50px] cursor-pointer"
                        style={{ width: 300 }}
                        placeholder={<span className="font-semibold">Bạn muốn đến đâu ?</span>}
                        options={listLocation.map((location) => ({
                            value: location.id,
                            label: (
                                <div className={`flex gap-3 justify-start items-center hover:text-orange-600 ${locationSelected === location.id ? 'text-orange-600 bg-[#D1E9F6]' : ''}`}>
                                    <img width={40} className=' h-[40px] rounded-md object-cover' src={location.hinhAnh} alt="img-tinhthanh" />
                                    <p className='text-lg font-mono'>{location.tinhThanh}</p>
                                </div>
                            )
                        }))}
                    />
                </Col>
                <Col span={8} className='flex justify-center items-center'>
                    <RangePicker
                        format="DD/MM/YYYY"
                        className='w-[300px] h-[50px] text-orange-600 font-semibold'
                        placeholder={[`Ngày nhận phòng`, `Ngày trả phòng`]}
                        onChange={handleDateSelected}
                    />
                </Col>
                <Col span={8} className=" flex-1 p-3 flex justify-center items-center gap-3">
                    <Select
                        onSelect={handleOnSelect}
                        className='h-[50px]'
                        style={{ width: 300 }}
                        placeholder={<span className="font-semibold">Số khách ?</span>}
                        options={guestOptions.map((guest) => ({
                            value: guest.value,
                            label: (
                                <div className={`flex gap-3 justify-start items-center hover:text-orange-600 ${guestSelected === guest.value ? 'text-orange-600 bg-[#D1E9F6]' : ''}`}>
                                    <p className='text-lg font-mono'>{guest.option}</p>
                                </div>
                            )
                        }))}
                    />
                    {locationSelected ? (
                        <Link to={pathname === "/" ? `rooms/${locationSelected}` : `/rooms/${locationSelected}`}>
                            <button className='button-gradient text-white p-1 h-[50px] rounded-md font-semibold'>Tìm phòng</button>
                        </Link>
                    ) : (
                        <button className='button-gradient text-white p-1 h-[50px] rounded-md font-semibold'>
                            Tìm phòng
                        </button>
                    )}
                </Col>

            </Row>
        </>

    )
}


export default SearchBar