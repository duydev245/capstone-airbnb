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

    getRoomDetail: async (id) => {
        try {
            const response = await fetcher.get(`/phong-thue/${id}`);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },

}

