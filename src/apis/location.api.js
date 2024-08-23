import fetcher from './fetcher';

export const locationApi = {
    getLocation: async () => {
        try {
            const response = await fetcher.get(`/vi-tri`);
            return response.data.content
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },

    addLocation: async (payload) => {
        try {
            const response = await fetcher.post(`/vi-tri`, payload);
            return response.data.content
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },

    uploadImgLocation: async (idLocation, payload) => {
        try {
            const response = await fetcher.post(`/vi-tri/upload-hinh-vitri?maViTri=${idLocation}`, payload);
            return response.data.content
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },

    deleteLocation: async (id) => {
        try {
            const response = await fetcher.delete(`/vi-tri/${id}`);
            return response.data.content
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },
};
