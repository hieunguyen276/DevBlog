// import { number } from "joi";
import { createModel } from "./base";
import { AUTHOR_STATUS } from "../middleware/common/enum";
import { DEFAULT_AVATAR } from "@/configs";


export const Author = createModel("Author", "authors", {
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
    bio: {
        type: String,
        default: "",
    },
    birthday: {
        type: Number,
        default: "",
    },
    status: {
        type: Number,
        enum: Object.values(AUTHOR_STATUS),
        required: true
    }
});


