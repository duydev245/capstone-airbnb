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

    getInfoLocation: async (idLocation) => {
        try {
            const response = await fetcher.get(
                `/vi-tri/${idLocation}`
            );
            return response.data.content;
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

    updateLocation: async (payload) => {
        try {
            const response = await fetcher.put(
                `/vi-tri/${payload.id}`, payload
            );
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },


    uploadImgLocation: async (idLocation, payload) => {
        try {
            const response = await fetcher.post(`/vi-tri/upload-hinh-vitri?maViTri=${idLocation}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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
