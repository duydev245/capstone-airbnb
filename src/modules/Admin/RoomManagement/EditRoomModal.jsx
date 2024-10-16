

import { useQuery } from '@tanstack/react-query'
import { Button, Checkbox, Col, Form, Input, Modal, Row, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { roomApi } from '../../../apis/room.api'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const EditRoomModal = ({ idEdit, setIdEdit, isOpen, isPending, onCloseModal, onSubmit }) => {

    const schema = yup.object({
        maViTri: yup.number()
            .min(1, "*Mã vị tríphải có ít nhất 1 số !")
            .required("*Mã vị trí không được bỏ trống !")
            .typeError("*Mã vị trí không được bỏ trống !"),
        hinhAnh: yup
            .mixed()
            .nullable()
            .required("*Hình ảnh không được bỏ trống !"),
        tenPhong: yup.string()
            .trim()
            .required("*Tên phòng không được bỏ trống !")
            .min(3, "*Tên phòng phải có ít nhất 3 ký tự !"),
        moTa: yup.string()
            .trim()
            .required("*Mô tả không được bỏ trống !")
            .min(10, "*Mô tả phải có ít nhất 10 ký tự !"),
        khach: yup.number()
            .min(0, "*Khách không được âm !")
            .required("*Khách không được bỏ trống !"),
        giuong: yup.number()
            .min(0, "*Giường không được âm !")
            .required("*Giường không được bỏ trống !"),
        phongNgu: yup.number()
            .min(0, "*Phòng ngủ không được âm !")
            .required("*Phòng ngủ không được bỏ trống !"),
        phongTam: yup.number()
            .min(0, "*Phòng tắm không được âm !")
            .required("*Phòng tắm không được bỏ trống !"),
        giaTien: yup.number()
            .required("*Giá tiền không được bỏ trống !")
            .min(0, "*Giá tiền không được âm !")
            .typeError("*Giá tiền phải là số !"),
    });

    const { handleSubmit, control, setValue, watch, formState: { errors }, reset } = useForm({

        defaultValues: {
            maViTri: null,
            hinhAnh: undefined,
            tenPhong: '',
            moTa: '',
            khach: null,
            giuong: null,
            phongNgu: null,
            phongTam: null,
            tivi: false,
            wifi: false,
            mayGiat: false,
            banLa: false,
            dieuHoa: false,
            bep: false,
            doXe: false,
            hoBoi: false,
            giaTien: 0,
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    })

    const { data } = useQuery({
        queryKey: ["info-room", idEdit],
        queryFn: () => roomApi.getInfoRoom(idEdit),
        enabled: !!idEdit,
    });

    const [imageUpload, setImageUpload] = useState(undefined);
    const watchHinhAnh = watch('hinhAnh')

    const getErrorMessage = (error) => {
        if (!error) return undefined;
        if (typeof error === "string") return error;
        if ("message" in error) return error.message;
        return undefined;
    };

    useEffect(() => {
        setValue("hinhAnh", imageUpload);
    }, [imageUpload])

    useEffect(() => {
        if (data) {
            setValue("id", data.id);
            setValue("maViTri", data.maViTri);
            setImageUpload(data.hinhAnh);
            setValue('tenPhong', data.tenPhong)
            setValue('moTa', data.moTa)
            setValue('giaTien', data.giaTien)
            setValue('khach', data.khach)
            setValue('giuong', data.giuong)
            setValue('phongNgu', data.phongNgu)
            setValue('phongTam', data.phongTam)
            setValue('tivi', data.tivi)
            setValue('wifi', data.wifi)
            setValue('mayGiat', data.mayGiat)
            setValue('banLa', data.banLa)
            setValue('dieuHoa', data.dieuHoa)
            setValue('bep', data.bep)
            setValue('doXe', data.doXe)
            setValue('hoBoi', data.hoBoi)
        }

        if (!isOpen) {
            reset()
        }
    }, [data, setValue]);

    return (
        <Modal
            open={isOpen}
            title={
                <Typography className="text-2xl font-medium">
                    Edit Room {idEdit}
                </Typography>
            }
            centered
            onCancel={() => {
                onCloseModal()
                setIdEdit('')
                data?.hinhAnh && setImageUpload(data.hinhAnh);
            }}
            footer={false}
            width={700}
        >
            <Form onFinish={handleSubmit(onSubmit)}>
                <Row gutter={[48, 15]}>
                    <Col span={24}>
                        <label className="text-xl text-black">
                            <span className="text-red-600">* </span>
                            Mã vị trí
                        </label>
                        {errors?.maViTri && (
                            <>
                                {" "}
                                <span className="mt-1 text-base text-red-500">
                                    {errors.maViTri.message}
                                </span>
                            </>
                        )}
                        <Controller
                            name='maViTri'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} type='number' className='mt-1' size='middle' placeholder='Nhập mã vị trí...' />
                            }
                        />
                    </Col>
                    <Col span={24}>
                        <label className="text-xl text-black">
                            <span className="text-red-600">* </span>
                            Hình ảnh
                        </label>
                        {errors.hinhAnh && (
                            <span className="mt-1 text-base text-red-500">
                                {" "}
                                {getErrorMessage(errors.hinhAnh)}
                            </span>
                        )}
                        <Controller
                            name='hinhAnh'
                            control={control}
                            render={({ field: { onChange, ...field } }) => {
                                return (
                                    <Upload
                                        {...field}
                                        name='avatar'
                                        listType='picture-card'
                                        className='avatar-uploader mt-1 relative w-fit'
                                        showUploadList={false}
                                        multiple={false}
                                        beforeUpload={() => false}
                                        onChange={({ file }) => {
                                            onChange(file);
                                        }}
                                    >
                                        <button
                                            style={{
                                                border: 0,
                                                background: 'none',
                                            }}
                                            type="button"
                                        >
                                            {watchHinhAnh || imageUpload ? (
                                                <div className="relative w-full h-full">
                                                    <img
                                                        className="w-[105px] h-[105px] rounded-lg"
                                                        src={
                                                            imageUpload ||
                                                            (watchHinhAnh instanceof File
                                                                ? URL.createObjectURL(watchHinhAnh)
                                                                : undefined)
                                                        }
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                        }}
                                                    />

                                                    <div
                                                        className="absolute top-1 right-1 cursor-pointer text-red-500 text-base"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setValue("hinhAnh", undefined);
                                                            setImageUpload(undefined);
                                                        }}
                                                    >
                                                        <DeleteOutlined />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <PlusOutlined />
                                                    <div style={{ marginTop: 8 }}>Upload</div>
                                                </>
                                            )}
                                        </button>
                                    </Upload>)
                            }}
                        />
                    </Col>
                    <Col span={24}>
                        <label className="text-xl text-black">
                            <span className="text-red-600">* </span>
                            Tên phòng
                        </label>
                        {errors?.tenPhong && (
                            <>
                                {" "}
                                <span className="mt-1 text-base text-red-500">
                                    {errors.tenPhong.message}
                                </span>
                            </>
                        )}
                        <Controller
                            name='tenPhong'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} className='mt-1' size='middle' placeholder='Nhập tên phòng...' />
                            }
                        />
                    </Col>
                    <Col span={24}>
                        <label className="text-xl text-black">
                            <span className="text-red-600">* </span>
                            Mô tả
                        </label>
                        {errors?.moTa && (
                            <>
                                {" "}
                                <span className="mt-1 text-base text-red-500">
                                    {errors.moTa.message}
                                </span>
                            </>
                        )}
                        <Controller
                            name='moTa'
                            control={control}
                            render={({ field }) =>
                                <Input.TextArea {...field} rows={3} className='mt-1' size='middle' placeholder='Nhập mô tả...' />
                            }
                        />
                    </Col>
                    <Col span={24}>
                        <label className="text-xl text-black block">
                            <span className="text-red-600">* </span>
                            Tùy chọn
                            {(errors?.khach || errors?.giuong || errors?.phongNgu || errors?.phongTam) && (
                                <>
                                    {" "}
                                    <span className="mt-1 text-base text-red-500">
                                        {errors?.khach?.message || errors?.giuong?.message || errors?.phongNgu?.message || errors?.phongTam?.message}
                                    </span>
                                </>
                            )}
                        </label>
                        <div className='flex gap-2'>
                            <div className='w-full'>
                                <Typography className='text-base'>
                                    Khách
                                </Typography>
                                <Controller
                                    name='khach'
                                    control={control}
                                    render={({ field }) =>
                                        <Input {...field} type='number' className='mt-1' size='middle' placeholder='Nhập số khách...' />
                                    }
                                />
                            </div>
                            <div className='w-full'>
                                <Typography className='text-base '>
                                    Giường
                                </Typography>
                                <Controller
                                    name='giuong'
                                    control={control}
                                    render={({ field }) =>
                                        <Input {...field} type='number' className='mt-1' size='middle' placeholder='Nhập số giường...' />
                                    }
                                />
                            </div>
                            <div className='w-full'>
                                <Typography className='text-base '>
                                    Phòng ngủ
                                </Typography>
                                <Controller
                                    name='phongNgu'
                                    control={control}
                                    render={({ field }) =>
                                        <Input {...field} type='number' className='mt-1' size='middle' placeholder='Nhập số phòng ngủ...' />
                                    }
                                />
                            </div>
                            <div className='w-full'>
                                <Typography className='text-base '>
                                    Phòng tắm
                                </Typography>
                                <Controller
                                    name='phongTam'
                                    control={control}
                                    render={({ field }) =>
                                        <Input {...field} type='number' className='mt-1' size='middle' placeholder='Nhập số phòng tắm...' />
                                    }
                                />
                            </div>
                        </div>
                    </Col>

                    <Col span={24}>
                        <label className="text-xl text-black block">
                            <span className="text-red-600">* </span>
                            Tiện ích
                        </label>
                        <div className='flex justify-between mt-1'>
                            <Controller
                                name='tivi'
                                control={control}
                                render={({ field }) =>
                                    <Checkbox checked={field.value} {...field}>Tivi</Checkbox>
                                }
                            />
                            <Controller
                                name='wifi'
                                control={control}
                                render={({ field }) =>
                                    <Checkbox checked={field.value} {...field}>Wifi</Checkbox>
                                }
                            />
                            <Controller
                                name='mayGiat'
                                control={control}
                                render={({ field }) =>
                                    <Checkbox checked={field.value} {...field}>Máy giặt</Checkbox>
                                }
                            />
                            <Controller
                                name='banLa'
                                control={control}
                                render={({ field }) =>
                                    <Checkbox checked={field.value} {...field}>Bàn là</Checkbox>
                                }
                            />
                            <Controller
                                name='dieuHoa'
                                control={control}
                                render={({ field }) =>
                                    <Checkbox checked={field.value} {...field}>Điều hòa</Checkbox>
                                }
                            />
                            <Controller
                                name='bep'
                                control={control}
                                render={({ field }) =>
                                    <Checkbox checked={field.value} {...field}>Bếp</Checkbox>
                                }
                            />
                            <Controller
                                name='doXe'
                                control={control}
                                render={({ field }) =>
                                    <Checkbox checked={field.value} {...field}>Đỗ xe</Checkbox>
                                }
                            />
                            <Controller
                                name='hoBoi'
                                control={control}
                                render={({ field }) =>
                                    <Checkbox checked={field.value} {...field}>Hồ bơi</Checkbox>
                                }
                            />
                        </div>

                    </Col>
                    <Col span={24}>
                        <label className="text-xl text-black">
                            <span className="text-red-600">* </span>
                            Giá phòng
                        </label>
                        <Controller
                            name='giaTien'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} type='number' className='mt-1' size='middle' placeholder='Nhập giá phòng...' />
                            }
                        />
                    </Col>
                    <Col span={24} className='flex justify-end'>
                        <Button onClick={() => {
                            onCloseModal();
                            data?.hinhAnh && setImageUpload(data.hinhAnh);
                            setIdEdit('');
                        }} type='default' size='large'>Cancel</Button>
                        <Button
                            loading={isPending}
                            disabled={isPending}
                            type='primary'
                            htmlType='submit'
                            size='large'
                            className='ml-2'
                        >
                            Update room</Button>
                    </Col>
                </Row>
            </Form>

        </Modal>
    )
}

export default EditRoomModal