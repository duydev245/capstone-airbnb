import { Button, Card, Col, Row } from 'antd'
import React from 'react'
import dayjs from "dayjs";


const ListBookingRoom = ({ dataBookingRoom, isLoadingBooking }) => {
    return (
        <div className='space-y-6'>
            {dataBookingRoom?.map((room, index) => (
                <div className='space-y-6' key={index}>
                    <div className='duration-300 mb-5'>
                        <Card
                            hoverable={true}
                            loading={isLoadingBooking}
                            className="mt-5"
                        >
                            <Row className=''>
                                <Col span={24} className='mb-2'>
                                    <p className='text-base'>
                                        <span className="font-semibold">Mã Phòng: </span>
                                        <span>{room.maPhong}</span>
                                    </p>
                                </Col>
                                <Col span={24} className='mb-2'>
                                    <p className='text-base'>
                                        <span className="font-semibold">Ngày nhận phòng: </span>
                                        <span>{dayjs(room.ngayDen).format('DD/MM/YYYY')}</span>
                                    </p>
                                </Col>
                                <Col span={24} className='mb-2'>
                                    <p className='text-base'>
                                        <span className="font-semibold">Ngày trả phòng: </span>
                                        <span>{dayjs(room.ngaydi).format('DD/MM/YYYY')}</span>
                                    </p>
                                </Col>
                                <Col span={24} className='mb-2'>
                                    <p className='text-base'>
                                        <span className="font-semibold">Số lượng khách: </span>
                                        <span>{room.soLuongKhach}</span>
                                    </p>
                                </Col>
                                <Col span={24} className='mb-2 flex justify-end'>
                                    <a href={`/room-details/${room.maPhong}`}>
                                        <Button type="primary">Chi tiết</Button>
                                    </a>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListBookingRoom
