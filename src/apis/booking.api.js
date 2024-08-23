import fetcher from "./fetcher"

export const bookingApi = {
    getListBooking: async () => {
        try {
            const response = await fetcher.get(`/dat-phong`);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    }
}