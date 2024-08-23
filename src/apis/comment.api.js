import fetcher from "./fetcher"

export const commentApi = {
    getListComment: async () => {
        try {
            const response = await fetcher.get(`/binh-luan`);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    }
}