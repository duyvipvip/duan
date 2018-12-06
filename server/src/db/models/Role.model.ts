import { Schema, model } from "mongoose";
import { IUserModel } from "../../interfaces";
import { Roles, CollectionNames } from "../../constants";

const roleSchema = new Schema(
    {
        Ten: {
            type: String,
            default: "KhachHang"
        }
    }
);

export const RoleModel = model<any>(CollectionNames.Role, roleSchema);
