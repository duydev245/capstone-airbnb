import React from 'react'
import { Form, Row, Col, Input, Rate } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';

const CommentBox = ({ currentUser, roomDetails, handlePostComment }) => {
    const schema = yup.object({
        noiDung: yup
            .string()
            .trim()
            .required("* Bạn chưa có nội dung đánh giá"),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            noiDung: "",
            saoBinhLuan: 0,
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    const onSubmit = (values) => {
        const payload = {
            maNguoiBinhLuan: currentUser?.id,
            maPhong: roomDetails?.id,
            ngayBinhLuan: dayjs().format(),
            noiDung: values.noiDung,
            saoBinhLuan: values.saoBinhLuan,
        }
        handlePostComment(payload);
        reset();
    }

    return (
        <>
            <div className='flex items-center ml-3'>
                <div>
                    {currentUser?.avatar ? (
                        <img alt="" className="w-12 h-12 rounded-full object-cover" src={currentUser.avatar} />
                    ) : (
                        <img alt="" className="w-12 h-12 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
                    )}
                </div>
                <div>
                    <p className="font-bold ms-2">
                        <span className="uppercase font-bold text-sm">{currentUser?.name}</span>
                    </p>
                </div>
            </div>

            <Form className='mt-3' onFinish={handleSubmit(onSubmit)}>
                <Row gutter={[0, 12]}>
                    {/* saoBinhLuan */}
                    <Col span={24}>
                        <Controller
                            name="saoBinhLuan"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Rate
                                        {...field}
                                        className="ps-6"
                                        count={5}
                                        allowHalf={false}
                                        style={{ fontSize: '20px' }}
                                    />
                                );
                            }}
                        />
                    </Col>
                    {/* noiDung */}
                    <Col span={24} className='p-3 w-full'>
                        <Controller
                            name="noiDung"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input.TextArea
                                        {...field}
                                        type="text"
                                        className='border p-2 rounded w-full'
                                        rows={3}
                                        size="large"
                                        placeholder="Write something..."
                                        status={errors.noiDung ? "error" : ""}
                                    />
                                );
                            }}
                        />
                        {errors?.noiDung && (
                            <>
                                {" "}
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.noiDung.message}
                                </p>
                            </>
                        )}

                    </Col>
                    <Col span={24} className='flex justify-between mx-3'>
                        <button
                            type="submit"
                            size="large"
                            className="px-5 py-2 rounded-lg btn-rate text-white font-semibold text-base"
                        >
                            Đánh giá
                        </button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default CommentBox
