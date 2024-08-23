import fetcher from "./fetcher"

export const roomApi = {
    getListRoom: async () => {
        try {
            const response = await fetcher.get(`/phong-thue`);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    }
}