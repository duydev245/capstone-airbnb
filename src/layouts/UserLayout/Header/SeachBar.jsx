

import { useQuery } from '@tanstack/react-query'
import { Button, Col, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { locationApi } from '../../../apis/location.api'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../redux/slices/location.slice';

const SeachBar = () => {

    const [locationSelected, setLocationSelected] = useState('')
    console.log('locationSelected: ', locationSelected);

    const dispatch = useDispatch()

    const { data, isLoading, error } = useQuery({
        queryKey: ['list-location'],
        queryFn: () => locationApi.getLocation(),
    });
    console.log("location", data)

    const handleOnSelect = (event) => {
        setLocationSelected(event)
    }

    //DatePick
    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;
    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    useEffect(() => {
        dispatch(setLocation(data))
    }, [data])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong</div>;
    if (!data) return ''

    return (
        <Row gutter={24} style={{ margin: 'auto' }} className=" container mx-auto absolute seachbar border-2 shadow-xl border-gray-300 bg-white md:rounded-lg w-full">
            <Col span={8} className="col-span-4 flex-1 px-6 py-3 flex flex-col justify-center items-center cursor-pointer">
                <Select
                    showSearch
                    onSelect={handleOnSelect}
                    className="h-[50px]"
                    style={{ width: 300 }}
                    placeholder={<span className="font-semibold">Bạn muốn đến đâu ?</span>}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {data.map((location) => (
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
                <RangePicker className='w-[300px] h-[50px] text-orange-600 font-semibold' placeholder={[`Ngày nhận phòng`, `Ngày trả phòng`]} disabledDate={disabledDate} />
            </Col>

            <Col span={8} className=" flex-1 p-3 flex justify-center items-center gap-3">
                <Select
                    className=' h-[50px]'
                    style={{
                        width: 300,
                    }}
                    placeholder={<span className="font-semibold">Số người ?</span>}
                    options={[
                        {
                            value: '1',
                            label: '1 người',
                        },
                        {
                            value: '2',
                            label: '2 người',
                        },
                        {
                            value: '3',
                            label: 'nhóm từ 3 tới 5 người',
                        },
                        {
                            value: '5',
                            label: 'nhóm từ 5 tới 10 người',
                        },
                    ]}
                />
                <button style={{ transition: "0.5s" }} className=' text-white bg-orange-600 hover:bg-orange-800 p-1 h-[50px] rounded-md font-semibold'>Tìm phòng</button>
            </Col>

        </Row>

    )
}


export default SeachBar