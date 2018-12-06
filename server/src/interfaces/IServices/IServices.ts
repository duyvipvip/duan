import { IAuthService, IUserService, IKHService, IChuXeService } from ".";

export interface IServices {
    authService: IAuthService;
    userService: IUserService;
    KHService: IKHService;
    ChuXeService: IChuXeService;
}
