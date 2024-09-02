import { Avatar, Button, Col, Form, Modal, Row, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

const UploadModal = ({
    isOpen,
    onCloseModal,
    isPending,
    handleUpload,
}) => {
    const defaultImageUrl = "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState(defaultImageUrl);
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        register('avatar'); // Register ~ đăng kí 1 hidden input lấy value của avatar 
    }, [register]);

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
        // Show preview of the selected image
        if (fileList.length > 0) {
            const reader = new FileReader();
            reader.onload = e => setImageUrl(e.target.result);
            reader.readAsDataURL(fileList[0].originFileObj);
            // Set the file value for react-hook-form
            setValue('avatar', fileList[0].originFileObj);
        } else {
            setImageUrl(defaultImageUrl);
            setValue('avatar', null);
        }
    };

    const handleDelete = () => {
        setFileList([]);
        setImageUrl(defaultImageUrl);
        setValue('avatar', null);
    };

    useEffect(() => {
        if (!isOpen) {
            handleDelete();
        }
    }, [isOpen]);

    const handleFormSubmit = data => {
        const formData = new FormData();
        if (data.avatar) {
            formData.append('formFile', data.avatar);
        }

        // Log each key-value pair in the FormData object
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }

        handleUpload(formData);
    };


    return (
        <Modal
            open={isOpen}
            centered
            title={
                <Typography className="text-xl font-medium text-center">
                    Thay đổi ảnh đại diện
                </Typography>
            }
            onCancel={() => {
                onCloseModal();
                handleDelete(); // Reset image on modal close
            }}
            footer={null}
            width={700}
        >
            <Form className='my-4' onFinish={handleSubmit(handleFormSubmit)}>
                <Row gutter={[48, 24]}>
                    <Col span={24} className='flex justify-center'>
                        <Avatar
                            size={150}
                            src={imageUrl}
                            className="object-cover rounded-full relative"
                            icon={<UploadOutlined />}
                        />
                        {imageUrl !== defaultImageUrl && (
                            <DeleteOutlined
                                onClick={handleDelete}
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    right: '40%',
                                    fontSize: '18px',
                                    color: '#f5222d',
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                    padding: '2px',
                                    boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
                                }}
                            />
                        )}
                    </Col>
                    <Col span={24} className='flex justify-center'>
                        <Upload
                            listType="picture"
                            fileList={fileList}
                            onChange={handleChange}
                            beforeUpload={() => false} // Prevent auto upload
                            showUploadList={false}
                        >
                            <Button className='w-full' block icon={<UploadOutlined />}>Chọn tệp</Button>
                        </Upload>
                    </Col>
                    <Col span={24} className='flex justify-end'>
                        <Button size="large" type="default" onClick={() => {
                            onCloseModal();
                            handleDelete();
                        }}>
                            Cancel
                        </Button>
                        <Button
                            loading={isPending}
                            htmlType="submit"
                            size="large"
                            type="primary"
                            className="ml-3"
                        >
                            Upload Avatar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default UploadModal
