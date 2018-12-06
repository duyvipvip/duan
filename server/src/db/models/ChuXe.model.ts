import { Schema, model } from "mongoose";
import { Roles, CollectionNames } from "../../constants";

const chuXeSchema = new Schema(
    {
        Ten: {
            type: String
        },
        GioiTinh: {
            type: Number
        },
        NgaySinh: {
            type: Date,
            default: Date.now()
        },
        TrangThai: {
            type: Number,
            default: 1
        },
        TongDiem: {
            type: Number,
            default: 0
        }
    }
);

export const chuXeModel = model<any>(CollectionNames.ChuXe, chuXeSchema);
