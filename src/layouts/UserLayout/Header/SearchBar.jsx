

import { useQuery } from '@tanstack/react-query'
import { Col, message, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { locationApi } from '../../../apis/location.api'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../redux/slices/location.slice';
import { useNavigate } from 'react-router-dom';
import { setSearchParams } from '../../../redux/slices/user.slice';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const [locationSelected, setLocationSelected] = useState(null);
    const [datesSelected, setDatesSelected] = useState(null);
    const [guestCount, setGuestCount] = useState(0);

    const dispatch = useDispatch()

    const navigate = useNavigate()

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
            setGuestCount(value);
        }
    }

    //Date Select
    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    // guestCount quantity
    const handleDropdownVisibleChange = (open) => {
        if (open && guestCount === 0) {
            setGuestCount(1);
        }
    };
    const decreaseGuestCount = () => {
        if (guestCount > 1) {
            setGuestCount(guestCount - 1);
        }

    };
    const increaseGuestCount = () => {
        setGuestCount(guestCount + 1);
    };

    const handleSearchRoom = (room) => {
        if (locationSelected && datesSelected && guestCount) {
            navigate(`/rooms/${room}`)
            dispatch(setSearchParams(searchParams))
        } else {
            messageApi.open({
                content: "Chọn thông tin phòng muốn tìm kiếm!",
                type: "error",
                duration: 2,
                style: {
                    marginTop: '8vh',
                },
            });
        }
    }

    const searchParams = {
        date: datesSelected,
        guest: guestCount,
    }

    useEffect(() => {

        dispatch(setLocation(listLocation))

    }, [listLocation, searchParams, guestCount])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong</div>;
    if (!listLocation) return ''

    return (
        <>
            {contextHolder}
            <Row gutter={24} style={{ margin: 'auto' }} className=" container seachbar border-2 shadow-xl border-gray-400 bg-white xs:mb-8 xs-plus:mb-8 xs:rounded-b-lg xs-plus:rounded-b-lg md:rounded-lg w-full">
                <Col xs={{ span: 24 }} md={{ span: 8 }} className="col-span-4 flex-1 px-6 py-3 flex flex-col justify-center items-center">
                    <Select
                        onSelect={handleOnSelect}
                        className="xs:h-10 xs-plus:h-10 md:h-14 xs:w-full xs-plus:w-full xl:w-72"
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
                <Col xs={{ span: 24 }} md={{ span: 8 }} className='flex justify-center items-center'>
                    <RangePicker
                        disabledDate={disabledDate}
                        disabled={locationSelected ? false : true}
                        format="DD/MM/YYYY"
                        className="xs:h-10 xs-plus:h-10 md:h-14 xs:w-full xs-plus:w-full xl:w-72"
                        placeholder={[`Ngày nhận phòng`, `Ngày trả phòng`]}
                        onChange={handleDateSelected}
                        allowClear={false}
                        inputReadOnly={true}
                    />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} className=" p-3 flex justify-center items-center gap-3">
                    <Select
                        disabled={datesSelected ? false : true}
                        className="customselect xs:h-10 xs-plus:h-10 md:h-14 xs:w-full xs-plus:w-full xl:w-72"
                        style={{ width: 300 }}
                        placeholder={<span className="font-semibold">Số khách ?</span>}
                        value={guestCount === 0 ? null : `${guestCount} khách`}
                        onDropdownVisibleChange={handleDropdownVisibleChange}
                        dropdownRender={() => (
                            <div className='flex justify-between items-center p-4 '>
                                <button
                                    className="font-bold w-9 h-9 text-white button-gradient rounded-md duration-300 flex items-center justify-center"
                                    onClick={decreaseGuestCount}
                                >
                                    <div>–</div>
                                </button>
                                <div className='text-lg font-mono'>{guestCount} khách</div>
                                <button
                                    className="font-bold w-9 h-9 text-white button-gradient rounded-md duration-300 flex items-center justify-center"
                                    onClick={increaseGuestCount}
                                >
                                    <div>+</div>
                                </button>
                            </div>
                        )}
                    />
                    <button onClick={() => { handleSearchRoom(locationSelected) }} className='button-gradient text-white p-1 h-full w-[100px] rounded-md font-medium    '>
                        <SearchOutlined style={{ marginRight: 3 }} /> Tìm
                    </button>

                </Col>

            </Row>
        </>

    )
}


export default SearchBar