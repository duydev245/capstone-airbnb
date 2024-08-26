

import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Col, Row, Typography } from 'antd';
const ListPopularLocations = () => {

    const data = [
        { title: 'Toàn bộ nhà', img: 'https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329222%2Fmjwqhra4wbzlvoo2pe27.jpg&w=1920&q=75' },
        { title: 'Chỗ ở độc đáo', img: 'https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329186%2Ffmoml05qcd0yk2stvl9r.jpg&w=1920&q=75' },
        { title: 'Trang trại và thiên nhiên', img: 'https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329121%2Fguagj5r2bkccgr1paez3.jpg&w=1920&q=75' },
        { title: 'Cho phép mang theo thú cưng', img: 'https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329252%2Fgqhtg9ua6jdrffhbrfv1.jpg&w=1920&q=75' }
    ]

    return (
        <div className='max-w-screen-xl mx-auto my-8'>
            <Typography className=' text-2xl font-bold'>Ở bất cứ đâu</Typography>
            <Typography className=' text-md font-md'>Từ biệt thự, lâu đài cho đến nhà thuyền, chúng tôi đều có hết</Typography>
            <Row gutter={24} className='mt-5 ' >
                {data.map((item, index) => (
                    <Col span={6} key={index} className='h-[380px]'>
                        <Card
                            className='hover-card hover-box-shadow h-full cursor-pointer'
                            cover={<img className='hover-img object-cover p-3' alt="example" src={item.img} />}
                            size='small'
                        >
                            <Typography className='title-changes-color text-lg font-semibold '>{item.title}</Typography>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>

    )
}

export default ListPopularLocations