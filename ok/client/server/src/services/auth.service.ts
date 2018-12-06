import {
    IAuthService,
    IUserRepository,
    IRepositories,
    IUserModel,
    IToken,
    IContrib,
    IMail,
    ITokenConfig,
    IKhachHangRepository,
    IChuXeRepository
} from "../interfaces";
import { User } from "../entities";
import { Error, Roles } from "../constants";
import { hashWithSalt, genSalt, compare } from "../utils";

export class AuthService implements IAuthService {
    private userRepo: IUserRepository;
    private KHRepo: IKhachHangRepository;
    private chuXeRepo: IChuXeRepository;

    private token: IToken;
    private mailer: IMail;
    private tokenConfig: ITokenConfig;

    constructor(repoList: IRepositories, contrib: IContrib, config: ITokenConfig) {
        this.userRepo = repoList.userRepository;
        this.KHRepo = repoList.khachHangRepository;
        this.chuXeRepo = repoList.chuXeRepository;
        this.token = contrib.token;
        this.mailer = contrib.mail;
        this.tokenConfig = config;
    }

    public async login(id: string, password: string): Promise<object> {
        try {
            // console.log("point");
            const checkUser: any = await this.userRepo.findOne({ TenDangNhap: id });
            if (checkUser) {
                if ((password.toString().localeCompare(checkUser.Password.toString())) === 0) {
                    const token = await this.token.generate(checkUser.toJSON() as any);
                    return { checkUser, token };
                }
            }
            throw Error.WRONG_INFO;
        } catch (err) {
            throw err;
        }
    }

    public async register(user: any): Promise<User> {
        try {
            // tslint:disable-next-line:no-console
            // let IDKH: any;
            // let IDCX: any;
            const checkUser = await this.userRepo.findOne({ TenDangNhap: user.TenDangNhap });
            if (checkUser) {
                throw { error: "Tài khoản đã tồn tại, vui lòng thử tên khác", status: 400 };
            }
            const nameUser = {
                Ten: user.TenDangNhap.toString() || " "
            };
            if (user.Role === Roles.ChuXe) {
                const IDChuXe = await this.chuXeRepo.create(user);
                user["IDChuXe"] = IDChuXe._id;
            }
            if (user.Role === Roles.KhachHang) {
                const IDKH = await this.KHRepo.create(user);
                user["IDKH"] = IDKH._id;
            }
            const newUser = await this.userRepo.create(user);
            const resultLogin: any = await this.login(user.TenDangNhap, user.Password);
            return resultLogin;

            // const userByEmail = await this.userRepo.findOne({ email:  user.email});
            // const userByUsername = await this.userRepo.findOne({ username:  user.username});
            // if (userByEmail || userByUsername) {
            //     throw Error.USER_EXIST;
            // }
            // const salt = await genSalt();
            // const hashPass = await hashWithSalt(user.password, salt);
            // user.salt = salt;
            // user.password = hashPass;
            // const newUser = await this.userRepo.create(user as IUserModel);

            // const payload = this.toResponseObj(newUser.toJSON() as User);

            // const token = await this.token.generate(payload);
            // const isSent = await this.mailer.sendActivateUser(newUser, token);
            // return payload;
        } catch (err) {
            throw err;
        }
    }

    public async forgotPassword(email: string): Promise<boolean> {
        try {
            const userByEmail = await this.userRepo.findOne({ email });
            if (!userByEmail) {
                throw Error.NOT_FOUND;
            }
            const payload = this.toResponseObj(userByEmail.toJSON() as User);
            const token = await this.token.generate(payload, { expiresIn: this.tokenConfig.resetTokenExpiresIn });
            const isSent = await this.mailer.sendForgotPassword(userByEmail, token);
            return isSent;
        } catch (err) {
            throw err;
        }
    }

    public async resetPassword(user: User, newPass: string): Promise<boolean> {
        try {
            const hashPass = await hashWithSalt(newPass, user.salt);
            const updatedUser = await this.userRepo.updateById(user.id, { password: hashPass });
            if (!updatedUser) {
                throw Error.SYSTEM_ERROR;
            }
            return updatedUser;
        } catch (err) {
            throw err;
        }
    }

    public async activateUser(user: User): Promise<boolean> {
        try {
            const updatedUser = await this.userRepo.updateById(user.id, { activated: true });
            if (!updatedUser) {
                throw Error.SYSTEM_ERROR;
            }
            return updatedUser;
        } catch (err) {
            throw err;
        }
    }

    private toResponseObj(user: User) {
        delete user.password;
        delete user.salt;
        return user;
    }
}
