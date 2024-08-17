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
        ``
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

  // addUser: async (payload: FormData) => {
  //   try {
  //     const response = await fetcher.post(
  //       "/QuanLyNguoiDung/ThemNguoiDung",
  //       payload
  //     );

  //     return response.data.content;
  //   } catch (error: any) {
  //     throw Error(error.response.data.content);
  //   }
  // },

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

  // deleteUser: async (idUser: string) => {
  //   try {
  //     const response = await fetcher.delete(
  //       `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${idUser}`
  //     );
  //     return response.data.content;
  //   } catch (error: any) {
  //     throw Error(error.response.data.content);
  //   }
  // },
};
