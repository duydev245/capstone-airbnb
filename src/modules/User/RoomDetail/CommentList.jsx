import React from 'react'
import dayjs from 'dayjs';
import { Rate } from 'antd';


const CommentList = ({ listComment }) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 false overscroll-y-auto overflow-y-auto px-2'>
            {listComment?.map((cmt) => (
                <div key={cmt?.id} className="space-y-3">
                    <div className='flex items-center gap-3'>
                        <div>
                            {cmt?.avatar ? (
                                <img alt="" className="w-12 h-12 rounded-full object-cover" src={cmt.avatar} />
                            ) : (
                                <img alt="" className="w-12 h-12 rounded-full object-cover" src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
                            )}
                        </div>
                        <div>
                            <p className="font-bold space-x-2">
                                <span className="uppercase font-bold text-sm">{cmt?.tenNguoiBinhLuan}</span>
                                <Rate disabled value={cmt?.saoBinhLuan} count={5} style={{ fontSize: '15px' }} />
                            </p>
                            <p className='text-gray-600'>
                                <small>
                                    {cmt?.ngayBinhLuan ? dayjs(cmt.ngayBinhLuan).format('DD/MM/YYYY HH:mm') : 'Invalid date'}
                                </small>
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="ps-2 text-justify w-full truncate">{cmt?.noiDung}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CommentList
