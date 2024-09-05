


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Typography } from 'antd'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';

const AddBookingModal = ({ isOpen, onCloseModal, onSubmit, isPending }) => {

    const schema = yup.object({
        maPhong: yup.number()
            .required('Mã phòng là bắt buộc')
            .min(1, 'Mã phòng phải lớn hơn hoặc bằng 1'),
        maNguoiDung: yup.number()
            .required('Mã người dùng là bắt buộc')
            .min(1, 'Mã phòng phải lớn hơn hoặc bằng 1'),
        ngayDen: yup.date()
            .required('Ngày đến là bắt buộc')
            .typeError('Ngày đến phải đúng định dạng'),
        ngayDi: yup.date()
            .required('Ngày đi là bắt buộc')
            .typeError('Ngày đi phải đúng định dạng')
            .min(yup.ref('ngayDen'), 'Ngày đi phải lớn hơn ngày đến'),
        soLuongKhach: yup.number()
            .required('Số lượng khách là bắt buộc')
            .min(1, 'Số lượng khách phải lớn hơn hoặc bằng 1')
            .typeError('Số lượng khách phải là số hợp lệ'),
    })

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            maPhong: null,
            maNguoiDung: null,
            ngayDen: "",
            ngayDi: "",
            soLuongKhach: null,
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    //Date Select
    dayjs.extend(customParseFormat);

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    useEffect(() => {
        if (!isOpen) {
            reset()
        }

    }, [isOpen])

    return (
        <Modal
            open={isOpen}
            title={
                <Typography className="text-2xl font-medium">
                    Add Booking
                </Typography>
            }
            centered
            onCancel={onCloseModal}
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
                                        className='w-full'
                                    />
                                )
                            }
                            }
                        />
                    </Col>
                    <Col span={24} className='flex justify-end'>
                        <Button onClick={onCloseModal} type='default' size='large'>Cancel</Button>
                        <Button
                            loading={isPending}
                            disabled={isPending}
                            type='primary'
                            htmlType='submit'
                            size='large'
                            className='ml-2'
                        >
                            Add Booking</Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default AddBookingModal