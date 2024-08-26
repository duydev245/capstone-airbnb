import React, { useState } from 'react'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DatePicker, Popconfirm } from 'antd';
import { StarFilled } from "@ant-design/icons";


const BookingForm = ({ roomDetails, messageApi, listComment, currentUser, handleBookingRoom }) => {

    const [guestCount, setGuestCount] = useState(1);
    const [dateCount, setDateCount] = useState(0);
    const [selectedDates, setSelectedDates] = useState([]);

    let avgRate = 0;
    if (Array.isArray(listComment) && listComment.length > 0) {
        const total = listComment.reduce((acc, item) => acc + item.saoBinhLuan, 0);
        avgRate = total / listComment.length;
        avgRate = Math.round(avgRate * 100) / 100;
    }

    // guestCount
    const decreaseGuestCount = () => {
        if (guestCount > 1) {
            setGuestCount(guestCount - 1);
        } else {
            messageApi.open({
                content: "Phải có tối thiểu 1 khách!",
                type: "warning",
                duration: 3,
            });
        }
    };

    const increaseGuestCount = () => {
        if (roomDetails && guestCount < roomDetails.khach) {
            setGuestCount(guestCount + 1);
        } else {
            messageApi.open({
                content: "Đã đạt tới số khách tối đa!",
                type: "warning",
                duration: 3,
            });
        }
    };

    //DatePick
    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    const handleOnChange = (dates) => {
        setSelectedDates(dates);
        if (dates && dates.length === 2) {
            const diff = dates[1].diff(dates[0], 'day');
            setDateCount(diff);
        } else {
            setDateCount(0);
        }
    };

    const tienPhong = roomDetails?.giaTien * dateCount;
    const cleaningFee = 8;
    const total = tienPhong + cleaningFee;

    const handleSubmit = () => {
        if (selectedDates && selectedDates.length === 2) {
            const startDay = dayjs(selectedDates[0]).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            const endDay = dayjs(selectedDates[1]).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            if (startDay != endDay) {
                const payload = {
                    maPhong: roomDetails.id,
                    ngayDen: startDay,
                    ngayDi: endDay,
                    soLuongKhach: guestCount,
                    maNguoiDung: currentUser.id,
                }
                handleBookingRoom(payload);
            } else {
                messageApi.open({
                    content: "Phải có tối thiểu 1 đêm!",
                    type: "warning",
                    duration: 3,
                });
            }
        } else {
            messageApi.open({
                content: "Vui lòng chọn ngày nhận trả phòng!",
                type: "warning",
                duration: 3,
            });
        }
    };

    return (
        <div className='p-6 rounded-lg border-2 border-gray-300 space-y-6 shadow-xl'>
            <div className='flex flex-wrap justify-between items-center gap-3'>
                <div>
                    <span className="font-bold">${roomDetails?.giaTien}</span>
                    / night
                </div>
                <div>
                    <span className='space-x-2 flex items-center justify-center'>
                        <StarFilled style={{ color: "#fe6b6e" }} />
                        <span className='text-black font-bold'>{avgRate}</span>

                        <span className="underline cursor-pointer text-gray-600">
                            ({listComment?.length ? listComment.length : 0}) đánh giá
                        </span>
                    </span>
                </div>
            </div>
            <div className='w-full'>
                <div className='border-2 border-gray-600 rounded-lg'>
                    <RangePicker className='w-full h-[50px] font-semibold' placeholder={[`Nhận phòng`, `Trả phòng`]} disabledDate={disabledDate} format="DD/MM/YYYY" onChange={handleOnChange} />
                </div>
                <div className='p-3 border-2 border-gray-600 rounded-lg'>
                    <div className="mb-3 font-bold">Khách</div>
                    <div className='flex justify-between items-center'>
                        <div>
                            <button className="font-bold w-9 h-9 text-white btn-rate hover:btn-rate rounded-full duration-300 flex items-center justify-center" onClick={decreaseGuestCount}>
                                <div>–</div>
                            </button>
                        </div>
                        <div className='font-semibold'>{guestCount} khách</div>
                        <div>
                            <button className="font-bold w-9 h-9 text-white btn-rate hover:btn-rate rounded-full duration-300 flex items-center justify-center" onClick={increaseGuestCount}>
                                <div>+</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Popconfirm
                title="THÔNG BÁO"
                description="Bạn có chắc muốn đặt phòng này?"
                onConfirm={handleSubmit}
                onCancel={() => { }}
                placement="left"
                okText="XÁC NHẬN"
                cancelText="HỦY"
            >
                <button className="btn-rate w-full py-3 rounded-lg font-bold text-white duration-300 hover:bg-pink-800">
                    Đặt phòng
                </button>
            </Popconfirm>
            <p className="text-center text-gray-400">Bạn vẫn chưa bị trừ tiền</p>
            <div className="flex justify-between items-center">
                <p className="underline text-base">${roomDetails?.giaTien} X {dateCount} nights</p>
                <p className="font-mono text-lg font-bold">$ {tienPhong}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="underline text-base">Cleaning fee</p>
                <p className="font-mono text-lg font-bold">$ {cleaningFee}</p>
            </div>
            <div className="mb-5 w-full h-px bg-gray-300 "></div>
            <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Total before taxes</p>
                <p className="font-mono text-lg font-bold">$ {total}</p>
            </div>
        </div>
    )
}

export default BookingForm
