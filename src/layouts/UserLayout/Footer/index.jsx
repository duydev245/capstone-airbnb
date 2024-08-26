

import React from 'react'

const Footer = () => {
    return (
        <footer className="border-t mt-5 pt-5 bg-gray-100">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6 gap-12 ">
                <div className="space-y-3">
                    <h2 className="font-bold uppercase">Giới thiệu</h2>
                    <ul className="text-sm space-y-3">
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Phương thức hoạt động của Airbnb</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Trang tin tức</a></li><li><a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Nhà đầu tư</a></li><li><a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Airbnb Plus</a></li><li><a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Airbnb Luxe</a></li><li><a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">HotelTonight</a></li><li><a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Airbnb for Work</a></li><li><a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Nhờ có Host, mọi điều đều có thể</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Cơ hội nghề nghiệp</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Thư của nhà sáng lập</a>
                        </li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h2 className="font-bold uppercase">Cộng đồng</h2>
                    <ul className="text-sm space-y-3">
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Sự đa đạng và Cảm giác thân thuộc</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Tiện nghi phù hợp cho người khuyết tật</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Đối tác liên kết Airbnb</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Chỗ ở cho tuyến đầu</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Lượt giới thiệu của khách</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Airbnb.org</a>
                        </li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h2 className="font-bold uppercase">Đón tiếp khách</h2>
                    <ul className="text-sm space-y-3">
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Cho thuê nhà</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Tổ chức Trải nghiệm trực tuyến</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Tổ chức Trải nghiệm</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Đón tiếp khách có trách nhiệm</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Trung tâm tài nguyên</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Trung tâm cộng đồng</a>
                        </li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h2 className="font-bold uppercase">Hỗ trợ</h2>
                    <ul className="text-sm space-y-3">
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Biện pháp ứng phó đại dịch COVID-19</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Trung tâm trợ giúp</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Các tùy chọn hủy</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Hỗ trợ khu dân cư</a>
                        </li>
                        <li>
                            <a href="https://www.airbnb.com" target="blank" className="cursor-pointer hover:underline">Tin cây và an toàn</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-gray-50 border-t z-0 fixed bottom-0 w-screen py-3 hidden md:block ">
                <div className="container mx-auto px-10 flex justify-between items-center text-gray-500 ">
                    <div>
                        <span>© 2022 Airbnb, Inc.</span>
                        <span className="px-3 hover:underline cursor-pointer">Quyền riêng tư</span>.
                        <span className="px-3 hover:underline cursor-pointer">Điều khoản</span>.
                        <span className="px-3 hover:underline cursor-pointer">Sơ đồ trang web</span>.
                    </div>
                    <div className="text-gray-700">
                        <span><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'inline-block', height: 16, width: 16, fill: 'currentcolor' }}><path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z" /></svg></span>
                        <span className="hover:underline cursor-pointer px-2 font-medium">Tiếng Việt (VN)</span>
                        <span className="hover:underline cursor-pointer px-2 font-medium">USD</span>
                        <span className="hover:underline px-2 font-medium">Hỗ trợ tài nguyên</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer