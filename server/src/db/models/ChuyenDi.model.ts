import { Schema, model } from "mongoose";
import { Roles, CollectionNames } from "../../constants";

const chuyenDiSchema = new Schema(
    {
       IDChuXe: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.ChuXe,
       },
       IDKH: {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.KhachHang,
       },
    //    IDXe: {
    //     type: Schema.Types.ObjectId,
    //     ref: CollectionNames.,
    //    },
       DiemDi: [{
           lat: {
            type: String
           },
           lng: {
            type: String
           }
       }],
       DiemDen: [{
           lat: {
               type: String
           },
           lng: {
               type: String
           }
       }],
       ThoiGian: {
           type: Date,
           default: Date.now()
       },
       TrangThai: {
           type: Number,
           default: 1
       }
    }
);

export const chuyenDiModel = model<any>(CollectionNames.ChuyenDi, chuyenDiSchema);
