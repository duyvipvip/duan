export const APICONFIG = {
    // BASEPOINT: 'http://192.168.1.142:3000',
    BASEPOINT: 'http://localhost:3000',
    AUTH: {
      LOGIN: '/api/auth/login',
      DANGKI: '/api/auth/register'
    },
    USER: {
      GETINFOBYTOKEN: '/api/users/getInforByToken'
    },
    KHACHHANG: {
      BOOKCHUYENDI: `/api/khachhang/bookChuyenDi`
    },
    CHUXE: {
      DANHSACHCHUYENDICHUACOCHUXE: `/api/chuxe/danhSachCacChuyenDi`,
      NHANCHUYENDI: `/api/chuxe/nhanChuyenDi/`,
      THONGTINCOBANCHUXE: `/api/chuxe/thongTinCoBanChuXeByID`,
      CAPNHATTHONGTINCHUXE: `/api/chuxe/update`
    }
  };
