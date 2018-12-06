import {
    UserService,
    AuthService
} from ".";
import {
    IRepositories,
    IServices,
    IUserService,
    IAuthService,
    IContrib,
    IKHService,
    IChuXeService
} from "../interfaces";
import Config from "../config";
import { KHService } from "./KhachHang.service";
import { ChuXeService } from "./ChuXe.service";

export default class Services implements IServices {
    public userService: IUserService;
    public authService: IAuthService;
    public KHService: IKHService;
    public ChuXeService: IChuXeService;
    /**
     * Create new services DI
     */
    constructor(contructor: {repositories: IRepositories, contrib: IContrib, config: Config }) {
        this.userService = new UserService(contructor.repositories);
        this.authService = new AuthService(contructor.repositories, contructor.contrib, contructor.config.TokenConfig);
        this.KHService = new KHService(contructor.repositories, contructor.contrib, contructor.config.TokenConfig);
        this.ChuXeService = new ChuXeService(contructor.repositories, contructor.contrib,
        contructor.config.TokenConfig);
    }
}
