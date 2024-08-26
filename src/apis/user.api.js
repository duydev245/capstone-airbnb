import { PAGE_SIZE } from "../constants";
import fetcher from "./fetcher";

export const userApi = {

  login: async (data) => {
    try {
      const response = await fetcher.post(
        `/auth/signin`,
        data
      );

      return response.data.content;
    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

  register: async (payload) => {
    try {
      const response = await fetcher.post(
        `/auth/signup`,
        payload
      );

      return response.data.content;
    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

  getListUser: async () => {
    try {
      const response = await fetcher.get(
        `/users`
      );
      return response.data.content;
    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

  getInfoUser: async (idUser) => {
    try {
      const response = await fetcher.get(
        `/users/${idUser}`
      );
      return response.data.content;
    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

  addUser: async (payload) => {
    try {
      const response = await fetcher.post(
        "/users",
        payload
      );

      return response.data.content;
    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

  updateUser: async (payload) => {
    try {
      const response = await fetcher.put(
        `/users/${payload.id}`,
        payload
      );

      return response.data.content;
    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

  deleteUser: async (idUser) => {
    try {
      const response = await fetcher.delete(
        `/users?id=${idUser}`
      );
      return response.data.content;
    } catch (error) {
      throw Error(error.response.data.content);
    }
  },
};
