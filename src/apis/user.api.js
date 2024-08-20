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

  // getInfoUser: async (maNhom: string, taiKhoan: string) => {
  //   try {
  //     const response = await fetcher.get<ApiResponse<UserItem>>(
  //       `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${taiKhoan}`
  //     );
  //     return response.data.content;
  //   } catch (error: any) {
  //     throw Error(error.response.data.content);
  //   }
  // },

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

  // updateUser: async (payload: FormData) => {
  //   try {
  //     const response = await fetcher.post(
  //       "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
  //       payload
  //     );

  //     return response.data.content;
  //   } catch (error: any) {
  //     throw Error(error.response.data.content);
  //   }
  // },

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
