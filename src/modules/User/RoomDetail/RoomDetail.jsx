import React, { useState } from 'react'
import Navbar from '../../../layouts/UserLayout/Header/Navbar'
import Footer from '../../../layouts/UserLayout/Footer'
import Banner from '../../../layouts/UserLayout/Header/Banner'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Alert, Image, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { roomApi } from '../../../apis/room.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBacon, faCar, faHandsBubbles, faWifi, faKitchenSet, faSnowflake, faTv, faWaterLadder } from '@fortawesome/free-solid-svg-icons'
import { commentApi } from '../../../apis/comment.api';
import CommentList from './CommentList';
import { getLocalStorage } from '../../../utils';
import CommentBox from './CommentBox';
import BookingForm from './BookingForm';
import { bookingApi } from '../../../apis/booking.api';

const RoomDetail = () => {
    const { id } = useParams();
    const currentUser = getLocalStorage("user");

    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    const { data: roomDetails, isLoading, error } = useQuery({
        queryKey: ['room-details'],
        queryFn: () => roomApi.getRoomDetail(id),
    });

    const { data: listComment } = useQuery({
        queryKey: ['list-comment'],
        queryFn: () => commentApi.getListCommentByRoom(id),
    });

    // Post Comment
    const { mutate: handlePostComment } = useMutation({
        mutationFn: (payload) => commentApi.postComment(payload),
        onSuccess: () => {
            messageApi.open({
                content: "Thêm comment thành công",
                type: "success",
                duration: 3,
            });
            queryClient.refetchQueries({
                queryKey: ["list-comment"],
                type: "active",
            });
        },
        onError: (error) => {
            console.log("🚀 ~ RoomDetail ~ error:", error)
            messageApi.open({
                content: error?.message,
                type: "error",
                duration: 3,
            });
        },
    });

    // Booking room
    const { mutate: handleBookingRoom } = useMutation({
        mutationFn: (payload) => bookingApi.postBookingRoom(payload),
        onSuccess: () => {
            messageApi.open({
                content: "Booking thành công!",
                type: "success",
                duration: 3,
            });
        },
        onError: (error) => {
            console.log("🚀 ~ RoomDetail ~ error:", error)
            messageApi.open({
                content: error?.message,
                type: "error",
                duration: 3,
            });
        },
    });


    if (!roomDetails && !isLoading && error) {
        return <div>Something went wrong</div>;
    }

    return (
        <>
            <Navbar />
            <Banner />
            {contextHolder}

            <div className='container mx-auto py-5'>
                {/* roomDetails.tenPhong */}
                <h2 className='font-bold text-3xl pt-4'>{roomDetails?.tenPhong}</h2>
                <div className="pt-3 items-center justify-start md:flex">
                    <div className="flex gap-x-5">
                        <div className="flex gap-x-3 items-center">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="award" className="svg-inline--fa fa-award w-4 h-4 text-[#FF5A5F]" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path fill="currentColor" d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"></path>
                            </svg>
                            <span className="text-gray-600">Chủ nhà siêu cấp</span>
                        </div>
                        <a className="underline cursor-pointer text-gray-600 hover:text-[#FF5A5F] duration-300" href="/rooms/ho-chi-minh">Hồ Chí Minh, Việt Nam</a>
                    </div>
                </div>

                {/* roomDetails.hinhAnh */}
                <div className="w-full py-4">
                    <Swiper
                        slidesPerView={1}
                    >
                        <SwiperSlide width={1024}>
                            <Image
                                width={`100%`}
                                style={{ width: `100%` }}
                                className='object-cover rounded-xl'
                                src={roomDetails?.hinhAnh}
                            />
                        </SwiperSlide>

                        <SwiperSlide width={1024}>
                            <Image
                                width={`100%`}
                                style={{ width: `100%` }}
                                className='object-cover rounded-xl'
                                src={roomDetails?.hinhAnh}
                            />
                        </SwiperSlide>

                        <SwiperSlide width={1024}>
                            <Image
                                width={`100%`}
                                style={{ width: `100%` }}
                                className='object-cover rounded-xl'
                                src={roomDetails?.hinhAnh}
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                <div className="grid grid-cols-1 lg:flex gap-5">
                    <div className="basis-7/12 space-y-5">
                        <div className='flex justify-between items-center'>
                            <div className="space-y-3">
                                <h3 className='text-2xl font-bold'>
                                    Toàn bộ căn hộ. Chủ nhà {" "}
                                    <span className="underline uppercase">nnhatsang</span>
                                </h3>
                                <p>{roomDetails?.khach} Khách • Phòng Studio • {roomDetails?.phongNgu} Phòng ngủ • {roomDetails?.giuong} giường • {roomDetails?.phongTam} Phòng tắm</p>
                            </div>
                            <div className="relative">
                                <img className="w-12 h-12 rounded-full object-cover" alt="" src="https://avatars.githubusercontent.com/u/93591100?v=4" />
                                <div className="absolute top-7 left-7">
                                    <svg viewBox="0 0 14 24" role="presentation" aria-hidden="true" focusable="false" className="w-6 h-6 block fill-current">
                                        <path d="m10.5 20.0005065c0 1.9326761-1.56704361 3.4994935-3.5 3.4994935s-3.5-1.5668174-3.5-3.4994935c0-1.9326762 1.5670426-3.5005065 3.5-3.5005065s3.5 1.5678303 3.5 3.5005065m-9.99486248-18.58757644-.00513752 8.13836018c0 .45796416.21682079.88992936.58880718 1.17090736l5.07730539 3.831699c.4870761.367971 1.16836618.367971 1.65647028.0009994l5.08141685-3.8266984c.3719859-.2789784.5898342-.7109444.5908612-1.16790827.0010271-1.75186288.0041101-6.21051146.0051391-8.14035983 0-.50396002-.4202834-.91292822-.9392158-.91292822l-11.11643181-.00699945c-.51790391-.00099942-.93818728.40796878-.93921487.91292823" fill="#fff"></path>
                                        <path d="m12 9.5-5-3.70124468 5-3.79875532zm-6.1292309 9.187485c-.52182677.3180834-.8707691.8762459-.8707691 1.5144379 0 .9937534.83703449 1.7980771 1.870162 1.7980771.81806646 0 1.50434636-.5065007 1.75946763-1.2095239z" fill="#ffb400"></path>
                                        <path d="m12 9.5-5 3.75-5-3.75v-7.5z" fill="#ff5a5f"></path>
                                        <path d="m7 24c-2.2060547 0-4-1.7939453-4-3.9990234 0-2.2060547 1.7939453-4.0009766 4-4.0009766s4 1.7949219 4 4.0009766c0 2.2050781-1.7939453 3.9990234-4 3.9990234zm0-7c-1.6542969 0-3 1.3466797-3 3.0009766 0 1.6533203 1.3457031 2.9990234 3 2.9990234s3-1.3457031 3-2.9990234c0-1.6542969-1.3457031-3.0009766-3-3.0009766zm.0039062-1.8242188c-.4560547 0-.9121094-.1064453-1.2617188-.3164062l-5.0458984-3.8642578c-.4697265-.3642578-.696289-.8525391-.696289-1.4951172v-8c.0009766-.3730469.1679688-.7529297.4580078-1.0429688.2900391-.2905273.6689453-.4570312 1.0410156-.4570312h.0019531 10.9990235c.7851562 0 1.5.7148438 1.5 1.5v7.9277344c-.0009766.6762695-.2421875 1.2177734-.6953125 1.5668945l-5.0009766 3.8325195c-.3505859.2333985-.8251953.3486328-1.2998047.3486328zm-5.5058593-14.1757812c-.1044922 0-.2324219.0625-.3330078.1635742-.1015625.1020508-.1650391.230957-.1650391.3374024v7.9990234c0 .3305664.0888672.5341797.3066406.703125l4.9970703 3.8310547c.3330078.1953125 1.0859375.2001953 1.4208984-.0205078l4.9716797-3.8125c.2001954-.1542969.3027344-.4155274.303711-.7749024v-7.9267578c0-.2285156-.2714844-.4995117-.5-.4995117h-11-.0009766s0 0-.0009765 0z" fill="#484848"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5 w-full h-px bg-gray-300 "></div>

                        <div className="space-y-5">
                            <div className="flex gap-5">
                                <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M408 406.545V248H288v158.545ZM320 280h56v94.545h-56Z"></path>
                                    <path fill="currentColor" d="M271.078 33.749a34 34 0 0 0-47.066.984L32 226.745V496h112V336h64v160h272V225.958ZM448 464H240V304H112v160H64V240L249.412 57.356V57.3L448 240Z"></path>
                                </svg>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold">Toàn bộ nhà</h4>
                                    <p className="text-sm text-gray-600 text-justify">Bạn sẽ có chung cư cao cấp cho riêng mình.</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <svg width="24" height="24" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"></path>
                                    <path fill="currentColor" d="M17.003 20a4.895 4.895 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.699 5.699 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.617 16.617 0 0 1 10 24H8a17.342 17.342 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13.025 13.025 0 0 0 17.596 28Z"></path>
                                </svg>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold">Vệ sinh tăng cường</h4>
                                    <p className="text-sm text-gray-600 text-justify">
                                        Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước của Airbnb.
                                        {" "}
                                        <span className="underline font-bold cursor-pointer">Hiển thị thêm</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <svg width="24" height="24" viewBox="0 0 880 880" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M480 896V702.08A256.256 256.256 0 0 1 264.064 512h-32.64a96 96 0 0 1-91.968-68.416L93.632 290.88a76.8 76.8 0 0 1 73.6-98.88H256V96a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v96h88.768a76.8 76.8 0 0 1 73.6 98.88L884.48 443.52A96 96 0 0 1 792.576 512h-32.64A256.256 256.256 0 0 1 544 702.08V896h128a32 32 0 1 1 0 64H352a32 32 0 1 1 0-64zm224-448V128H320v320a192 192 0 1 0 384 0m64 0h24.576a32 32 0 0 0 30.656-22.784l45.824-152.768A12.8 12.8 0 0 0 856.768 256H768zm-512 0V256h-88.768a12.8 12.8 0 0 0-12.288 16.448l45.824 152.768A32 32 0 0 0 231.424 448z"></path>
                                </svg>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold">Phong là Chủ nhà siêu cấp</h4>
                                    <p className="text-sm text-gray-600 text-justify">
                                        Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"></path>
                                    <path fill="currentColor" d="M17.003 20a4.895 4.895 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.699 5.699 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.617 16.617 0 0 1 10 24H8a17.342 17.342 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13.025 13.025 0 0 0 17.596 28Z"></path>
                                </svg>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold">Miễn phí hủy trong 48 giờ</h4>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5 w-full h-px bg-gray-300 "></div>

                        {/* {roomDetails?.moTa} */}
                        <div className='w-full'>
                            <div>
                                <button className="w-full text-black bg-white border-2 border-black rounded-lg py-3 hover:bg-gray-200 duration-300 flex justify-between items-center px-6">
                                    <span>Dịch sang tiếng Anh </span>
                                    <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="currentColor" d="M20 18h-1.44a.6.6 0 0 1-.4-.12a.8.8 0 0 1-.23-.31L17 15h-5l-1 2.54a.8.8 0 0 1-.22.3a.6.6 0 0 1-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a12 12 0 0 1-.39-1.24q-.09.37-.19.69l-.19.56l-1.58 4.19zm-6.3-1.58a13.4 13.4 0 0 1-2.91-1.41a11.46 11.46 0 0 0 2.81-5.37H12V4H7.31a4 4 0 0 0-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 0 0 5 10.7a17.2 17.2 0 0 1-5 2.1q.56.82.87 1.38a23.3 23.3 0 0 0 5.22-2.51a15.6 15.6 0 0 0 3.56 1.77zM3.63 5.33h4.91a8.1 8.1 0 0 1-2.45 4.45a9.1 9.1 0 0 1-2.46-4.45"></path>
                                    </svg>
                                </button>
                            </div>
                            <p className='text-justify py-3'>
                                {roomDetails?.moTa}
                            </p>
                            <span className="font-bold underline cursor-pointer">Hiển thị thêm</span>
                        </div>

                        <div className="mb-5 w-full h-px bg-gray-300 "></div>
                    </div>

                    <div className="basis-1/12 empty"></div>

                    <div className='basis-4/12 space-y-6 sticky w-full lg:h-[350px] top-32 mb-10'>
                        {/* booking form */}
                        {currentUser ? (
                            <BookingForm
                                roomDetails={roomDetails}
                                messageApi={messageApi}
                                listComment={listComment}
                                currentUser={currentUser}
                                handleBookingRoom={handleBookingRoom}
                            />
                        ) : (
                            <Alert message="Cần đăng nhập để đặt phòng" type="warning" />
                        )}
                    </div>
                </div>

                {/* tiện ích */}
                <div className='space-y-6 mt-5'>
                    <h3 className="text-2xl font-bold">Các tiện ích đi kèm</h3>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {roomDetails?.tivi && (
                            <div className='space-x-3'>
                                <FontAwesomeIcon className='w-5' icon={faTv} />
                                <span>Tivi</span>
                            </div>
                        )}
                        {roomDetails?.wifi && (
                            <div className='space-x-3'>
                                <FontAwesomeIcon className='w-5' icon={faWifi} />
                                <span>Wifi</span>
                            </div>
                        )}
                        {roomDetails?.dieuHoa && (
                            <div className='space-x-3'>
                                <FontAwesomeIcon className='w-5' icon={faSnowflake} />
                                <span>Điều hòa</span>
                            </div>
                        )}
                        {roomDetails?.mayGiat && (
                            <div className='space-x-3'>
                                <FontAwesomeIcon className='w-5' icon={faHandsBubbles} />
                                <span>Máy giặt</span>
                            </div>
                        )}
                        {roomDetails?.bep && (
                            <div className='space-x-3'>
                                <FontAwesomeIcon className='w-5' icon={faKitchenSet} />
                                <span>Bếp</span>
                            </div>
                        )}
                        {roomDetails?.banLa && (
                            <div className='space-x-3'>
                                <FontAwesomeIcon className='w-5' icon={faBacon} />
                                <span>Bàn là</span>
                            </div>
                        )}
                        {roomDetails?.doXe && (
                            <div className='space-x-3'>
                                <FontAwesomeIcon className='w-5' icon={faCar} />
                                <span>Bãi đỗ xe</span>
                            </div>
                        )}
                        {roomDetails?.hoBoi && (
                            <div className='space-x-3'>
                                <FontAwesomeIcon className='w-5' icon={faWaterLadder} />
                                <span>Hồ bơi</span>
                            </div>
                        )}
                    </div>

                    <button className="w-56 text-black bg-white border-2 border-black rounded-lg p-3 hover:bg-gray-200 duration-300">
                        Ẩn bớt tiện nghi
                    </button>
                </div>

                <div className="pb-[30px]"></div>
                <div className="mb-5 w-full h-px bg-gray-300 "></div>

                {/* CommentBox */}
                <div className='mb-4'>
                    {currentUser ? (
                        <CommentBox
                            currentUser={currentUser}
                            roomDetails={roomDetails}
                            handlePostComment={handlePostComment}
                        />
                    ) : (
                        <Alert message="Cần đăng nhập để bình luận" type="warning" />
                    )}
                </div>

                <div className="mb-5 w-full h-px bg-gray-300 "></div>
                <h3 className="font-bold text-2xl mb-3">Bình luận</h3>
                <CommentList
                    listComment={listComment}
                />

            </div>
            <Footer />
        </>
    )
}

export default RoomDetail
