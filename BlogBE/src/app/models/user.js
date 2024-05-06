import { DEFAULT_AVATAR } from "@/configs";
import {createModel} from "./base";

export const User = createModel("User", "users", {
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: DEFAULT_AVATAR,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: "",
        unique: true,
    }
    
});
