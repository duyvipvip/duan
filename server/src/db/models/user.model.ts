import { Schema, model } from "mongoose";
import { IUserModel } from "../../interfaces";
import { Roles, CollectionNames } from "../../constants";

const userSchema = new Schema(
    {
        TenDangNhap: {
            type: String,
            required: true
        },
        Password: String,
        Email: {
            type: String
        },
        Role: {
            type: String,
            default: Roles.KhachHang
        },
        IDKH: {
            type: Schema.Types.ObjectId,
            ref: CollectionNames.KhachHang
        },
        IDChuXe: {
            type: Schema.Types.ObjectId,
            ref: CollectionNames.ChuXe
        }
    }
);

export const UserModel = model<IUserModel>(CollectionNames.User, userSchema);
