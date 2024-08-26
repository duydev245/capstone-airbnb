

import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBacon, faCar, faHandsBubbles, faHouseSignal, faKitchenSet, faSnowflake, faTv, faWaterLadder } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'
import { roomApi } from '../../../apis/room.api'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getLocalStorage } from '../../../utils'



const ListRooms = () => {

    const maps = [
        {
            tenTinhThanh: "Hồ Chí Minh",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501726.1646414578!2d106.07127147626535!3d10.754844246101994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1724342759078!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Cần Thơ",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62860.622877846734!2d105.71637052066208!3d10.034268928598033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3edb7%3A0x527f09dbfb20b659!2zQ-G6p24gVGjGoSwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1724341784681!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Nha Trang",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124762.63351940841!2d109.16410015538298!3d12.259625610462964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170677811cc886f%3A0x5c4bbc0aa81edcb9!2zTmhhIFRyYW5nLCBLaMOhbmggSMOyYSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1724341918501!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Hà Nội",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.95149196312!2d105.75902241592615!3d21.022801972859618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1724341948763!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Phú Quốc",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251289.71520420123!2d103.79261134649917!3d10.229141876492273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78c62b49eda17%3A0x8aa79fbbdd72cdb!2zUGjDuiBRdeG7kWM!5e0!3m2!1svi!2s!4v1724342009743!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Đà Nẵng",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245367.87556434073!2d107.9133141381754!3d16.072075929687767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0x1df0cb4b86727e06!2zxJDDoCBO4bq1bmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1724342051890!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Đà Lạt",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124928.46940373944!2d108.36832085093964!3d11.904066868946709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112fef20988b1%3A0xad5f228b672bf930!2zVHAuIMSQw6AgTOG6oXQsIEzDom0gxJDhu5NuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1724342072167!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Phan Thiết",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250743.53678967577!2d108.00914572575647!3d10.897653062200572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3176830f876e16e5%3A0x2a82c373d3a16cc8!2zVHAuIFBoYW4gVGhp4bq_dCwgQsOsbmggVGh14bqtbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1724342106289!5m2!1svi!2s`
        }
    ]

    const { id } = useParams()

    const seachParams = getLocalStorage("seachParams")
    console.log('seachParams: ', seachParams);

    const listLocation = useSelector((state) => state.dataLocation.listLocation)

    const { data: roomsById, isLoading, error } = useQuery({
        queryKey: ['list-roomsbyid'],
        queryFn: () => roomApi.getRoomsById(id),
    });
    console.log(roomsById)

    const currentLocation = listLocation?.find(location => location.id == id);
    const currentMap = currentLocation ? maps?.find(map => map.tenTinhThanh === currentLocation.tinhThanh) : null;

    // const filterRooms = roomsById?.filter((room) => {
    //     if (!seachParams) {
    //         if (!seachParams.guest) {
    //             return true; // Nếu không có seachParams, trả về tất cả các phòng
    //         }
    //     }
    //     const guestCount = parseInt(seachParams.guest, 10);
    //     return room.khach === guestCount
    // });
    // console.log('filterRooms: ', filterRooms);

    useEffect(() => {

    }, [listLocation, seachParams])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong</div>;
    if (!roomsById) return ''

    return (
        <div className='max-w-screen-xl mx-auto '>
            {listLocation?.map((location) => (
                <Typography key={location.id} className='text-2xl font-bold '>
                    {location.id == id ? `Danh sách phòng tại khu vực ${location.tenViTri}, ${location.tinhThanh}` : ``}
                </Typography>
            ))}
            <Typography className='text-md font-md'>Có {roomsById.length} phòng có thể đặt
            </Typography>
            <Row gutter={24} className='mb-[100px] mt-5'>
                <Col span={14} className=' overflow-auto h-[650px] pb-5'>
                    {roomsById.map((room) => (
                        <Card
                            key={room.id}
                            className="hover-card hover-box-shadow mt-5"
                        >
                            <Row gutter={24} className='h-[200px]'>
                                <Col span={9} className='flex justify-center'>
                                    <img className='img-position h-full w-[290px] rounded-lg' alt="example" src={room.id === 232926 ? "https://shac.vn/wp-content/uploads/2019/05/y-tuong-trang-tri-noi-that-phong-ngu-hien-dai-doc-dao-theo-ca-tinh-cua-chu-nhan-can-phong.jpg" : room.hinhAnh}
                                    />
                                </Col>
                                <Col span={15} className='flex flex-col justify-between'>
                                    <Typography className='title-changes-color text-lg font-semibold'>{room.tenPhong}</Typography>
                                    <hr />
                                    <ul className='flex gap-1'>
                                        <li>{room.khach} khách</li>
                                        <li>• {room.phongNgu} phòng ngủ</li>
                                        <li>• {room.giuong} giường</li>
                                        <li>• {room.phongTam} phòng tắm</li>
                                    </ul>
                                    <Typography className='text-sm font-semibold'>Tiện nghi</Typography>
                                    <ul className='grid grid-cols-3'>
                                        {room.tivi && (
                                            <li className='inline-flex gap-1 items-center'>
                                                <FontAwesomeIcon className='w-5 text-green-600' icon={faTv} />
                                                <span>Tivi</span>
                                            </li>
                                        )}
                                        {room.wifi && (
                                            <li className='inline-flex gap-1 items-center'>
                                                <FontAwesomeIcon className='w-5 text-green-600' icon={faHouseSignal} />
                                                <span>Wifi</span>
                                            </li>
                                        )}
                                        {room.dieuHoa && (
                                            <li className='inline-flex gap-1 items-center'>
                                                <FontAwesomeIcon className='w-5 text-green-600' icon={faSnowflake} />
                                                <span>Điều hòa</span>
                                            </li>
                                        )}
                                        {room.mayGiat && (
                                            <li className='inline-flex gap-1 items-center'>
                                                <FontAwesomeIcon className='w-5 text-green-600' icon={faHandsBubbles} />
                                                <span>Máy giặt</span>
                                            </li>
                                        )}
                                        {room.bep && (
                                            <li className='inline-flex gap-1 items-center'>
                                                <FontAwesomeIcon className='w-5 text-green-600' icon={faKitchenSet} />
                                                <span>Bếp</span>
                                            </li>
                                        )}
                                        {room.banLa && (
                                            <li className='inline-flex gap-1 items-center'>
                                                <FontAwesomeIcon className='w-5 text-green-600' icon={faBacon} />
                                                <span>Bàn là</span>
                                            </li>
                                        )}
                                        {room.doXe && (
                                            <li className='inline-flex gap-1 items-center'>
                                                <FontAwesomeIcon className='w-5 text-green-600' icon={faCar} />
                                                <span>Bãi đỗ xe</span>
                                            </li>
                                        )}
                                        {room.hoBoi && (
                                            <li className='inline-flex gap-1 items-center'>
                                                <FontAwesomeIcon className='w-5 text-green-600' icon={faWaterLadder} />
                                                <span>Hồ bơi</span>
                                            </li>
                                        )}
                                    </ul>
                                    <Typography className='flex justify-end text-xl text-green-600'>{room.giaTien} $</Typography>
                                </Col>
                            </Row>
                        </Card>))}
                    {/* {filterRooms.length === 0 && (
                        <Card
                            className=" mt-5 flex justify-center text-center "
                        >
                            <Typography className=' text-xl text-red-500'>Danh sách trống!</Typography>
                            <Typography className=' text-sm text-gray-400'>không có phòng dành cho 1 khách</Typography>
                            <button className="button-gradient text-center py-2 px-3 mt-5 font-semibold rounded-md md:dark:text-white no-underline cursor-pointer">Xem tất cả phòng</button>
                        </Card>)} */}
                </Col>
                <Col span={10} className='flex justify-center mt-5'>
                    {currentMap && (
                        <iframe
                            src={currentMap.linkMap}
                            width="600"
                            height="600"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default ListRooms
