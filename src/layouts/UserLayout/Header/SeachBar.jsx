

import { useQuery } from '@tanstack/react-query'
import { Col, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { locationApi } from '../../../apis/location.api'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../redux/slices/location.slice';

const SeachBar = () => {

    const guestOption = [
        { option: "1 khách", value: "1" },
        { option: "2 khách", value: "2" },
        { option: "từ 3 đến 5 khách", value: "3" },
    ];

    const [locationSelected, setLocationSelected] = useState('')

    const [optionSelected, setOptionSelected] = useState('')

    const dispatch = useDispatch()

    const { data: listLocation, isLoading, error } = useQuery({
        queryKey: ['list-location'],
        queryFn: () => locationApi.getLocation(),
    });

    //DatePick
    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;
    // const range = (start, end) => {
    //     const result = [];
    //     for (let i = start; i < end; i++) {
    //         result.push(i);
    //     }
    //     return result;
    // };

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    const handleDateSelected = (dates, dateStrings) => {
        console.log(" date selected", dateStrings);
    }

    const handleOnSelect = (event) => {
        const currentLocation = listLocation.find(location => location.tinhThanh === event);

        if (currentLocation) {
            if (currentLocation.tinhThanh === event) {
                setLocationSelected(currentLocation.tinhThanh);
            }
        } else {
            setOptionSelected(event);
        }
    }

    useEffect(() => {
        dispatch(setLocation(listLocation))
    }, [listLocation, locationSelected, optionSelected])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong</div>;
    if (!listLocation) return ''

    return (
        <Row gutter={24} style={{ margin: 'auto' }} className=" max-w-screen-xl mx-auto absolute seachbar border-2 shadow-xl border-gray-300 bg-white md:rounded-lg w-full">
            <Col span={8} className="col-span-4 flex-1 px-6 py-3 flex flex-col justify-center items-center cursor-pointer">
                <Select
                    onSelect={handleOnSelect}
                    className="h-[50px]"
                    style={{ width: 300 }}
                    placeholder={<span className="font-semibold">Bạn muốn đến đâu ?</span>}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {listLocation.map((location) => (
                        <Select.Option key={location.id} value={location.tinhThanh}>
                            <div className={`flex gap-3 justify-start items-center hover:text-orange-600 ${locationSelected === location.tinhThanh ? 'text-orange-600 bg-[#D1E9F6]' : ''}`}>
                                <img width={40} className=' h-[40px] rounded-md object-cover' src={location.hinhAnh} alt="img-tinhthanh" />
                                <p className='text-lg font-mono'>{location.tinhThanh}</p>
                            </div>
                        </Select.Option>
                    ))}
                </Select>
            </Col>
            <Col span={8} className='flex justify-center items-center'>
                <RangePicker
                    format="DD/MM/YYYY"
                    className='w-[300px] h-[50px] text-orange-600 font-semibold'
                    placeholder={[`Ngày nhận phòng`, `Ngày trả phòng`]}
                    disabledDate={disabledDate}
                    onChange={handleDateSelected}
                />
            </Col>

            <Col span={8} className=" flex-1 p-3 flex justify-center items-center gap-3">
                <Select
                    onSelect={handleOnSelect}
                    className='h-[50px]'
                    style={{
                        width: 300,
                    }}
                    placeholder={<span className="font-semibold">Số người ?</span>}
                    options={guestOption.map(option => ({
                        value: option.value,
                        label:
                            <div className={`flex gap-3 justify-start items-center hover:text-orange-600 ${optionSelected === option.value ? 'text-orange-600 bg-[#D1E9F6]' : ''}`}>
                                <p className='text-lg font-mono'>{option.option}</p>
                            </div>,
                    }))}
                />
                <button className='button-gradient text-white p-1 h-[50px] rounded-md font-semibold'>Tìm phòng</button>
            </Col>

        </Row>

    )
}


export default SeachBar