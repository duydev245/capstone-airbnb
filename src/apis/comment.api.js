import fetcher from "./fetcher"

export const commentApi = {
    getListComment: async () => {
        try {
            const response = await fetcher.get(`/binh-luan`);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },

    getListCommentByRoom: async (id) => {
        try {
            const response = await fetcher.get(`/binh-luan/lay-binh-luan-theo-phong/${id}`);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },

    postComment: async (payload) => {
        try {
            const response = await fetcher.post(`/binh-luan`, payload);
            return response.data.content;
        } catch (error) {
            throw Error(error.response.data.content);
        }
    },


}