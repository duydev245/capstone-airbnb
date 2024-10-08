import fetcher from "./fetcher"

export const bookingApi = {
    getListBooking: async () => {
        try {
            const response = await fetcher.get(`/dat-phong`);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },

    postBookingRoom: async (payload) => {
        try {
            const response = await fetcher.post(`/dat-phong`, payload);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },

    deleteBookedRoom: async (idBooked) => {
        try {
            const response = await fetcher.delete(`/dat-phong/${idBooked}`)
            return response.data.content;
        } catch (error) {
            console.log('error: ', error);
            throw Error(error.response.data.content);
        }
    },

    getListBookingRoomById: async (idUser) => {
        try {
            const response = await fetcher.get(`/dat-phong/lay-theo-nguoi-dung/${idUser}`);
            return response.data.content;
        } catch (error) {
            console.log('error: ', error);
            throw Error(error.response.data.content);
        }
    },

    updateBookedRoom: async (payload) => {
        try {
            const response = await fetcher.put(`/dat-phong/${payload.id}`, payload)
            return response.data.content;
        } catch (error) {
            console.log('error: ', error);
            throw Error(error.response.data.content);
        }
    }

}