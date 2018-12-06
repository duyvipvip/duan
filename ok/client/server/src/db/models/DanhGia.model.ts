import { Schema, model } from "mongoose";
import { IUserModel } from "../../interfaces";
import { Roles, CollectionNames } from "../../constants";

const danhgiaSchema = new Schema(
    {
        Diem: {
            type: Number,
            default: 0
        },
        TieuDe: {
            type: String,
            default: ""
        },
        ChiTiet: {
            type: String,
            default: ""
        },
        IDChuXe: {
            type: Schema.Types.ObjectId,
            ref: CollectionNames.ChuXe
        },
        IDKhachHang: {
            type: Schema.Types.ObjectId,
            ref: CollectionNames.KhachHang
        }
    }
);

export const DanhGiaModel = model<any>(CollectionNames.User, danhgiaSchema);
