

import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom'

const ListPopularLocations = () => {

    const data = [
        { title: 'Toàn bộ nhà', room: '/rooms/1', img: 'https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329222%2Fmjwqhra4wbzlvoo2pe27.jpg&w=1920&q=75' },
        { title: 'Chỗ ở độc đáo', room: '/rooms/2', img: 'https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329186%2Ffmoml05qcd0yk2stvl9r.jpg&w=1920&q=75' },
        { title: 'Trang trại và thiên nhiên', room: '/rooms/3', img: 'https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329121%2Fguagj5r2bkccgr1paez3.jpg&w=1920&q=75' },
        { title: 'Cho phép mang thú cưng', room: '/rooms/4', img: 'https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329252%2Fgqhtg9ua6jdrffhbrfv1.jpg&w=1920&q=75' }
    ]

    const navigate = useNavigate()

    const handleDetailRoom = (room) => {
        navigate(`${room}`)
    }

    return (
        <div className='container mx-auto my-8'>
            <Typography className=' text-2xl font-bold'>Ở bất cứ đâu</Typography>
            <Typography className=' text-md font-md'>Từ biệt thự, lâu đài cho đến nhà thuyền, chúng tôi đều có</Typography>
            <Row gutter={24} className='mt-5' >
                {data.map((item, index) => (
                    <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }} key={index} className='h-fit xs:mb-4 xs-plus:mb-4 sm:mb-5 md:mb-6 flex justify-center'>
                        <Card
                            className='border border-gray-200 rounded-lg hover-card hover-box-shadow cursor-pointer md:w-[300px] lg:w-[400px]'
                            cover={<img className='hover-img object-cover p-4 ' alt="example" src={item.img} />}
                            size='small'
                            onClick={() => { handleDetailRoom(item.room) }}
                        >
                            <Typography className='title-changes-color text-lg font-semibold lg:h-10 xl:h-20 xl:flex xl:items-center'>{item.title}</Typography>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>

    )
}

export default ListPopularLocations