import fetcher from './fetcher';

export const roomApi = {

    getRoomsById: async (maViTri) => {
        try {
            const response = await fetcher.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`)
            return response.data.content
        } catch (error) {
            throw Error(error)
        }
    },

    getListRoom: async () => {
        try {
            const response = await fetcher.get(`/phong-thue`);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },

    addRoom: async (payload) => {
        try {
            const response = await fetcher.post('/phong-thue', payload
                // ,
                // {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // }
            );
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content)

        }
    },

    deleteRoom: async (idRoom) => {
        try {
            const response = await fetcher.delete(`/phong-thue/${idRoom}`)
            return response.data.content
        } catch (error) {
            throw Error(error.response.data.content)

        }
    },

    getInfoRoom: async (idRoom) => {
        try {
            const response = await fetcher.get(`/phong-thue/${idRoom}`)
            return response.data.content
        } catch (error) {
            throw Error(error.response.data.content)

        }
    },

    updateRoom: async (payload) => {
        try {
            const response = await fetcher.put(`/phong-thue/${payload.id}`, payload)
            return response.data.content
        } catch (error) {
            throw Error(error.response.data.content)

        }
    },

    uploadImgRoom: async (idRoom, payload) => {
        try {
            const response = await fetcher.post(`/phong-thue/upload-hinh-phong?maPhong=${idRoom}`, payload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            return response.data.content
        } catch (error) {
            throw Error(error.response.data.content)

        }
    },

    getRoomDetail: async (id) => {
        try {
            const response = await fetcher.get(`/phong-thue/${id}`);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },

}

