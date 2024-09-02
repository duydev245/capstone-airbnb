import React from 'react'
import { getLocalStorage, setLocalStorage } from '../../../utils';
import Navbar from '../../../layouts/UserLayout/Header/Navbar';
import Footer from '../../../layouts/UserLayout/Footer';
import { Button, Card, Col, message, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { userApi } from '../../../apis/user.api';
import { bookingApi } from '../../../apis/booking.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useOpenModal } from '../../../hooks/useOpenModal';
import InfoModal from './InfoModal';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/user.slice';
import ListBookingRoom from './ListBookingRoom';
import UploadModal from './UploadModal';

const ProfileUser = () => {
    const currentUser = getLocalStorage("user");
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const { isOpen: isOpenInfoModal, openModal: openInfoModal, closeModal: closeInfoModal } = useOpenModal();
    const { isOpen: isOpenUploadModal, openModal: openUploadModal, closeModal: closeUploadModal } = useOpenModal();

    // dataUser
    const { data: dataUser, isLoading: isLoadingUser, error } = useQuery({
        queryKey: ["info-user"],
        queryFn: () => userApi.getInfoUser(currentUser.id),
    });

    // dataBookingRoom
    const { data: dataBookingRoom, isLoading: isLoadingBooking } = useQuery({
        queryKey: ["booking-list"],
        queryFn: () => bookingApi.getListBookingRoomById(currentUser.id),
    });

    // update info api
    const { mutate: handleUpdateUserApi, isPending: isPendingUpdate } = useMutation({
        mutationFn: (payload) => userApi.updateUser(payload),
        onSuccess: (data) => {
            setLocalStorage("user", data);
            dispatch(setUser(data));
            messageApi.open({
                content: "Update thông tin thành công",
                type: "success",
                duration: 3,
            });
            closeInfoModal();
            queryClient.refetchQueries({
                queryKey: ["info-user"],
                type: "active",
            });
        },
        onError: (error) => {
            messageApi.open({
                content: error?.message,
                type: "error",
                duration: 3,
            });
        },
    });

    // upload avatar
    const { mutate: handleUpload, isPending: isPendingUpload } = useMutation({
        mutationFn: (payload) => userApi.uploadAvatar(payload),
        onSuccess: (data) => {
            console.log("🚀 ~ ProfileUser ~ data:", data)
            setLocalStorage("user", data);
            dispatch(setUser(data));
            messageApi.open({
                content: "Upload avatar thành công!",
                type: "success",
                duration: 3,
            });
            closeUploadModal();
            queryClient.refetchQueries({
                queryKey: ["info-user"],
                type: "active",
            });
        },
        onError: (error) => {
            messageApi.open({
                content: error?.message,
                type: "error",
                duration: 3,
            });
        },
    });

    if (!isLoadingUser && error) {
        return <div>Something went wrong</div>;
    }

    return (
        <>
            <Navbar />
            {contextHolder}
            {/* banner */}
            <div className="uppercase">
                <div className="w-full relative banner-responsive flex items-center smm:h-[50vh] md:h-[50vh] lg:h-[40vh]" style={{ background: "url('https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center bottom / cover no-repeat" }}>
                    <div className="mask bg-gradient-dark smm:h-[50vh] md:h-[50vh] lg:h-[40vh] "></div>
                    <div className="container mx-auto z-10 flex justify-center">
                        <p className="smm:pt-10 font-bold text-white lg:text-3xl md:text-xl smm:text-lg animate__animated animate__flipInX animate__delay-1s">
                            Thông tin người dùng {currentUser.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* main */}
            <div className='container mx-auto grid lg:flex gap-10 py-5'>
                {/* left section */}
                <Card
                    hoverable
                    className='basis-auto block lg:sticky top-0 lg:top-20 h-fit'
                >
                    <div className="space-y-3">
                        {currentUser.avatar ? (
                            <img className="mx-auto w-36 h-36 object-cover rounded-full" alt="" src={currentUser.avatar} />
                        ) : (
                            <img className="mx-auto w-36 h-36 object-cover rounded-full" alt="" src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
                        )}
                        <div className="w-full flex justify-center">
                            <button className="mx-auto w-auto underline font-bold text-sm" onClick={openUploadModal}>Cập nhật ảnh</button>
                        </div>
                    </div>
                    <div className="space-y-6 mt-3">
                        <div className="flex justify-start items-center gap-3">
                            <img className="w-6" alt="" src="https://cdn-icons-png.flaticon.com/512/5972/5972778.png" />
                            <p className="font-bold text-xl">Xác minh danh tính</p>
                        </div>
                        <p className="text-justify">Xác minh danh tính của bạn với huy hiệu xác minh danh tính.</p>
                        <Button>Nhận huy hiệu</Button>
                        <div className="w-full h-px bg-gray-300"></div>
                        <p className="text-xl font-bold uppercase">{currentUser.name} đã xác nhận</p>
                        <p className="space-x-3 block">
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Địa chỉ email</span>
                        </p>
                    </div>
                </Card>

                {/* right section */}
                <div className='basis-9/12 space-y-3'>
                    <p className="font-bold text-xl">Xin chào, tôi là <span className="capitalize">{currentUser.name}</span></p>
                    <p className="text-gray-500 text-sm">Bắt đầu tham gia vào 2023</p>
                    <button className="w-auto underline font-bold text-sm" onClick={openInfoModal}>Chỉnh sửa hồ sơ</button>
                    <h1 className="font-bold text-2xl">Phòng đã thuê</h1>
                    {dataBookingRoom ? (
                        <ListBookingRoom
                            dataBookingRoom={dataBookingRoom}
                            isLoadingBooking={isLoadingBooking}
                        />
                    ) : (
                        <p className="text-base font-semibold">bạn chưa thuê phòng</p>
                    )}
                </div>
            </div>

            <Footer />

            <InfoModal
                key={"update"}
                data={dataUser}
                isOpen={isOpenInfoModal}
                onCloseModal={closeInfoModal}
                isPending={isPendingUpdate}
                handleUpdateUserApi={handleUpdateUserApi}
            />

            <UploadModal
                key={'upload'}
                handleUpload={handleUpload}
                isOpen={isOpenUploadModal}
                onCloseModal={closeUploadModal}
                isPending={isPendingUpload}
            />

        </>
    )
}

export default ProfileUser
