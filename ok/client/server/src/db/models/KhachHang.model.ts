import { Schema, model } from "mongoose";
import { Roles, CollectionNames } from "../../constants";

const KHSchema = new Schema(
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
        }
    }
);

export const KHModel = model<any>(CollectionNames.KhachHang, KHSchema);
