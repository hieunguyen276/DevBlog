// import { number } from "joi";
import {ObjectId, createModel} from "./base";


export const Certificate = createModel("Certificate", "certificates", {
    name: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    author_id: {
        type: ObjectId,
        ref: "Author"
    }
});


