
import { Button, Col, DatePicker, Form, Input, Modal, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useQuery } from '@tanstack/react-query';
import { bookingApi } from '../../../apis/booking.api';

const EditBookingModal = ({ isOpen, idUser, setIdUser, setIdBooked, idBooked, onCloseModal, onSubmit, isPending }) => {

    const { handleSubmit, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            maPhong: 0,
            maNguoiDung: 0,
            ngayDen: "",
            ngayDi: "",
            soLuongKhach: 0,
        }
    })

    //Date Select
    dayjs.extend(customParseFormat);

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    const { data: bookedByIdUser } = useQuery({
        queryKey: ['info-bookedbyiduser', idUser],
        queryFn: () => bookingApi.getListBookingRoomById(idUser),
        enabled: !!idUser,
    })
    console.log("book", bookedByIdUser)

    const bookedById = bookedByIdUser?.find(booked => booked.id === idBooked)
    console.log('bookedById: ', bookedById);

    useEffect(() => {
        if (bookedById) {
            setValue("maPhong", bookedById.maPhong);
            setValue("maNguoiDung", bookedById.maNguoiDung);
            setValue("ngayDen", bookedById.ngayDen);
            setValue("ngayDi", bookedById.ngayDi);
            setValue("soLuongKhach", bookedById.soLuongKhach);
        }
    }, [bookedByIdUser, bookedById, setValue])


    return (
        <Modal
            open={isOpen}
            title={
                <Typography className="text-2xl font-medium">
                    Add Booking {bookedById?.id}
                </Typography>
            }
            centered
            onCancel={() => {
                onCloseModal()
                setIdUser("")
                setIdBooked("")
            }}
            footer={false}
            width={700}
        >
            <Form className='my-4' onFinish={handleSubmit(onSubmit)}>
                <Row gutter={[48, 15]}>
                    <Col span={24}>
                        <label className="text-xl text-black block mb-3">
                            <span className="text-red-600">* </span>
                            Mã người dùng
                        </label>
                        {errors?.maNguoiDung && (
                            <>
                                {" "}
                                <span className="mt-1 text-base text-red-500">
                                    {errors.maNguoiDung.message}
                                </span>
                            </>
                        )}
                        <Controller
                            name='maNguoiDung'
                            control={control}
                            disabled={true}
                            render={({ field }) => {
                                return (
                                    <Input {...field} size='large' type='number' placeholder='Nhập mã người dùng...' />
                                )
                            }
                            }
                        />
                    </Col>
                    <Col span={12}>
                        <label className="text-xl text-black block mb-3">
                            <span className="text-red-600">* </span>
                            Mã phòng
                        </label>
                        {errors?.maPhong && (
                            <>
                                {" "}
                                <span className="mt-1 text-base text-red-500">
                                    {errors.maPhong.message}
                                </span>
                            </>
                        )}
                        <Controller
                            name='maPhong'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input {...field} size='large' type='number' placeholder='Nhập mã phòng...' />
                                )
                            }
                            }
                        />
                    </Col>
                    <Col span={12}>
                        <label className="text-xl text-black block mb-3">
                            <span className="text-red-600">* </span>
                            Số khách
                        </label>
                        {errors?.soLuongKhach && (
                            <>
                                {" "}
                                <span className="mt-1 text-base text-red-500">
                                    {errors.soLuongKhach.message}
                                </span>
                            </>
                        )}
                        <Controller
                            name='soLuongKhach'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input {...field} size='large' type='number' placeholder='Nhập số khách...' />
                                )
                            }
                            }
                        />
                    </Col>
                    <Col span={12}>
                        <label className="text-xl text-black block mb-3">
                            <span className="text-red-600">* </span>
                            Ngày nhận phòng
                        </label>
                        {errors?.ngayDen && (
                            <>
                                {" "}
                                <span className="mt-1 text-base text-red-500">
                                    {errors.ngayDen.message}
                                </span>
                            </>
                        )}
                        <Controller
                            name='ngayDen'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <DatePicker
                                        {...field}
                                        disabledDate={disabledDate}
                                        size="large"
                                        placeholder="DD/MM/YYYY"
                                        format={"DD/MM/YYYY"}
                                        value={field.value ? dayjs(field.value) : null}
                                        className='w-full'
                                    />
                                )
                            }
                            }
                        />
                    </Col>
                    <Col span={12} >
                        <label className="text-xl text-black block mb-3">
                            <span className="text-red-600">* </span>
                            Ngày trả phòng
                        </label>
                        {errors?.ngayDi && (
                            <>
                                {" "}
                                <span className="mt-1 text-base text-red-500">
                                    {errors.ngayDi.message}
                                </span>
                            </>
                        )}
                        <Controller
                            name='ngayDi'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <DatePicker
                                        {...field}
                                        disabledDate={disabledDate}
                                        size="large"
                                        placeholder="DD/MM/YYYY"
                                        format={"DD/MM/YYYY"}
                                        value={field.value ? dayjs(field.value) : null}
                                        className='w-full'
                                    />
                                )
                            }
                            }
                        />
                    </Col>
                    <Col span={24} className='flex justify-end'>
                        <Button onClick={() => {
                            onCloseModal()
                            setIdUser("")
                            setIdBooked("")
                        }} type='default' size='large'>Cancel</Button>
                        <Button
                            loading={isPending}
                            disabled={isPending}
                            type='primary'
                            htmlType='submit'
                            size='large'
                            className='ml-2'
                        >
                            Update</Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default EditBookingModal