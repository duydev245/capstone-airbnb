import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Modal, Row, Skeleton, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBacon, faCar, faHandsBubbles, faHouseSignal, faKitchenSet, faSnowflake, faTv, faWaterLadder } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'
import { roomApi } from '../../../apis/room.api'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Maps from './Maps'
import RoomFilter from './RoomFilter'
import { clearGuestSearchParams } from '../../../redux/slices/user.slice'
import { Element } from 'react-scroll'

const RoomsList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { id } = useParams()

    const scrollToList = useRef(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const listLocation = useSelector((state) => state.dataLocation.listLocation)

    const searchParams = useSelector((state) => state.user.searchParams);

    const [showAll, setShowAll] = useState(false);

    const { data: roomsById, isLoading, error } = useQuery({
        queryKey: ['list-roomsbyid'],
        queryFn: () => roomApi.getRoomsById(id),
    });

    const [filters, setFilters] = useState(
        {
            khach: 0,
            giuong: 0,
            phongNgu: 0,
            phongTam: 0,
        }
    );

    const filterRooms = roomsById?.filter((room) => {

        const matchKhach = !filters.khach || room.khach === filters.khach;
        const matchGiuong = !filters.giuong || room.giuong === filters.giuong;
        const matchPhongNgu = !filters.phongNgu || room.phongNgu === filters.phongNgu;
        const matchPhongTam = !filters.phongTam || room.phongTam === filters.phongTam;

        if (showAll || (matchKhach && matchGiuong && matchPhongNgu && matchPhongTam)) {
            return true;
        }

        return false;

    });

    const handleShowAll = () => {
        setShowAll(true)
    }

    const handleDetailRoom = (room) => {
        navigate(`/room-details/${room}`)
    }

    const [loading, setLoading] = useState(false);
    const showSkeleton = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    };

    useEffect(() => {

        if (scrollToList.current) {
            scrollToList.current.scrollIntoView({ behavior: 'smooth' });
        }

        setShowAll(false)

        if (searchParams) {
            showSkeleton();
            if (searchParams.guest) {
                setFilters(prevFilters => ({
                    ...prevFilters,
                    khach: searchParams.guest,
                }));
            }
        }
        if (showAll) {
            showSkeleton();
            setFilters({
                khach: 0,
                giuong: 0,
                phongNgu: 0,
                phongTam: 0,
            });

            dispatch(clearGuestSearchParams());

        }
    }, [listLocation, roomsById, searchParams, showAll])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong</div>;
    if (!roomsById) return ''

    return (
        <div className='container mx-auto mt-5 relative'>
            <div ref={scrollToList} className="cursor-default absolute top-[-200px]">
                <Element name='list' />
            </div>

            {listLocation?.map((location) => (
                <Typography key={location.id} className='text-2xl font-bold'>
                    {location.id == id ? `Danh sách phòng tại khu vực ${location.tenViTri}, ${location.tinhThanh}` : ``}
                </Typography>

            ))}
            <div className='flex gap-1 mb-3'>
                <Typography className='text-md font-md'>Có <span className='text-green-500'>{filterRooms.length}</span> phòng có thể đặt
                </Typography>
                {searchParams && (<Typography className='text-md font-md'>{searchParams.date[0]} - {searchParams.date[1]}</Typography>)}
            </div>
            <Row gutter={24} style={{ margin: 'auto' }}>
                <Col xs={{ span: 24 }} md={{ span: 6 }} xl={{ span: 3 }} className=' border border-gray-200 rounded-lg p-2 mt-3 lg:sticky lg:top-20 h-fit'>
                    <RoomFilter filters={filters} setFilters={setFilters} showSkeleton={showSkeleton} />
                    <div className=' lg:block xl:hidden text-center mt-4'>
                        <button onClick={() => setIsModalOpen(true)} className='button-gradient text-white font-mono rounded-md px-3 py-2'>
                            Xem bản đồ
                        </button>
                        <Modal
                            open={isModalOpen}
                            width={650}
                            onCancel={() => setIsModalOpen(false)}
                            centered
                            footer={false}
                        >
                            <Maps id={id} listLocation={listLocation} />
                        </Modal>
                    </div>

                </Col>
                <Col xs={{ span: 24 }} md={{ span: 18 }} xl={{ span: 13 }} className='pb-5 pt-3'>
                    {filterRooms.map((room) => (
                        <Card
                            bordered={true}
                            onClick={() => { handleDetailRoom(room.id) }}
                            key={room.id}
                            className="border border-gray-200 rounded-lg hover-card hover-box-shadow cursor-pointer mb-3"
                        >
                            {loading ? <Row gutter={24} className='md:h-[200px]'>
                                <Col xs={{ span: 24 }} sm={{ span: 9 }} className='flex justify-center items-center'>
                                    <Skeleton.Image active style={{
                                        width: 200, height: 200,
                                    }} />
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 15 }} className='flex flex-col justify-center'>
                                    <Skeleton active />
                                </Col>
                            </Row> : <Row gutter={24} className='md:h-[200px]'>
                                <Col xs={{ span: 24 }} sm={{ span: 9 }} className='flex justify-center items-center'>
                                    {room.hinhAnh ? (<img className='img-position md:h-full xs:h-[260px] md:w-[290px] xl:w-[290px] rounded-lg' alt="example" src={room.id === 232926 ? "https://shac.vn/wp-content/uploads/2019/05/y-tuong-trang-tri-noi-that-phong-ngu-hien-dai-doc-dao-theo-ca-tinh-cua-chu-nhan-can-phong.jpg" : room.hinhAnh} />) : (<Skeleton.Image active style={{
                                        width: 200, height: 200,
                                    }} />)}
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 15 }} className='flex flex-col justify-between'>
                                    <Typography className='title-changes-color text-lg font-semibold'>{room.tenPhong}</Typography>
                                    <hr />
                                    <ul className='flex gap-1'>
                                        <li>{room.khach} khách</li>
                                        <li>• {room.giuong} giường</li>
                                        <li>• {room.phongNgu} phòng ngủ</li>
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
                            </Row>}
                        </Card>))}
                    {filterRooms.length === 0 && (
                        <Card
                            className=" flex justify-center text-center h-full "
                        >
                            <Typography className=' text-xl text-red-500'>Danh sách trống!</Typography>
                            <Typography className=' text-sm text-gray-400'>không có phòng phù hợp {filters.khach > 0 ? `>> ${filters.khach} khách` : ''} {filters.giuong > 0 ? `>> ${filters.giuong} giường` : ''} {filters.phongNgu > 0 ? `>> ${filters.phongNgu} phòng ngủ` : ''} {filters.phongTam > 0 ? `>> ${filters.phongTam} phòng tắm` : ''}
                            </Typography>
                            <button onClick={handleShowAll} className="button-gradient text-center py-2 px-3 mt-5 font-semibold rounded-md md:dark:text-white no-underline cursor-pointer">Xem tất cả phòng</button>
                        </Card>)
                    }
                </Col>
                <Col style={{ padding: '0' }} span={8} xl={{ span: 8 }} className='flex xs:hidden lg:hidden xl:block 2xl:block justify-center lg:sticky lg:top-20 h-fit mt-3'>
                    <Maps id={id} listLocation={listLocation} />
                </Col>
            </Row>
        </div>
    )
}

export default RoomsList
