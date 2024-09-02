

import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Checkbox, Col, Form, Input, Modal, Row, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { roomApi } from '../../../apis/room.api'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

const EditRoomModal = ({ idEdit, isOpen, isPending, onCloseModal, onSubmit }) => {

    const { handleSubmit, control, setValue, watch } = useForm({
        defaultValues: {
            maViTri: 0,
            // hinhAnh: undefined,
            tenPhong: '',
            moTa: '',
            phong: 0,
            giuong: 0,
            phongNgu: 0,
            phongTam: 0,
            tivi: false,
            wifi: false,
            mayGiat: false,
            banLa: false,
            dieuHoa: false,
            bep: false,
            doXe: false,
            hoBoi: false,
            giaTien: 0,
        }
    })

    const { data } = useQuery({
        queryKey: ["info-room", idEdit],
        queryFn: () => roomApi.getInfoRoom(idEdit),
        enabled: !!idEdit,
    });
    console.log('data: ', data);

    // const [imageUpload, setImageUpload] = useState(undefined);
    const watchHinhAnh = watch('hinhAnh')
    console.log('watchHinhAnh: ', watchHinhAnh);

    useEffect(() => {
        if (data) {
            // setValue("id", data.id);
            setValue("maViTri", data.maViTri);
            // setImageUpload(data.hinhAnh);
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
            onCancel={() => { onCloseModal() }}
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
                        <Controller
                            name='maViTri'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} className='mt-1' size='middle' placeholder='mã vị tri' />
                            }
                        />
                    </Col>
                    <Col span={24}>
                        <label className="text-xl text-black">
                            <span className="text-red-600">* </span>
                            Hình ảnh
                        </label>
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
                                            {watchHinhAnh || data
                                                ? (
                                                    <div>
                                                        <img className='w-10 h-10 object-cover' src={data?.hinhAnh || URL.createObjectURL(new Blob([watchHinhAnh]))} />
                                                        <div onClick={(event) => { event.stopPropagation(); setValue('hinhAnh', undefined) }} className='absolute top-2 right-2 cursor-pointer hover:text-red-500'>
                                                            <DeleteOutlined />
                                                        </div>
                                                    </div>)
                                                : (
                                                    <PlusOutlined />
                                                )}
                                            <div
                                                style={{
                                                    marginTop: 8,
                                                }}
                                            >
                                                Upload
                                            </div>
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
                        <Controller
                            name='tenPhong'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} className='mt-1' size='middle' placeholder='tên phòng' />
                            }
                        />
                    </Col>
                    <Col span={24}>
                        <label className="text-xl text-black">
                            <span className="text-red-600">* </span>
                            Mô tả
                        </label>
                        <Controller
                            name='moTa'
                            control={control}
                            render={({ field }) =>
                                <Input.TextArea {...field} rows={3} className='mt-1' size='middle' placeholder='tên phòng' />
                            }
                        />
                    </Col>
                    <Col span={24}>
                        <label className="text-xl text-black block">
                            <span className="text-red-600">* </span>
                            Option
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
                                        <Input {...field} className='mt-1' size='middle' placeholder='số khách' />
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
                                        <Input {...field} className='mt-1' size='middle' placeholder='số giường' />
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
                                        <Input {...field} className='mt-1' size='middle' placeholder='số phòng ngủ' />
                                    }
                                />
                            </div>
                            <div className='w-full'>
                                <Typography className='text-base '>
                                    Phòng Tắm
                                </Typography>
                                <Controller
                                    name='phongTam'
                                    control={control}
                                    render={({ field }) =>
                                        <Input {...field} className='mt-1' size='middle' placeholder='số phòng tắm' />
                                    }
                                />
                            </div>
                        </div>
                    </Col>

                    <Col span={24}>
                        <label className="text-xl text-black block">
                            <span className="text-red-600">* </span>
                            Amenities
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
                            Price
                        </label>
                        <Controller
                            name='giaTien'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} className='mt-1' size='middle' placeholder='giá' />
                            }
                        />
                    </Col>
                    <Col span={24} className='flex justify-end'>
                        <Button onClick={() => { onCloseModal() }} type='default' size='large'>Cancel</Button>
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