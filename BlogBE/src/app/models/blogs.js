import {ObjectId, createModel} from "./base";

export const Blog = createModel("Blog", "blogs", {
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        // required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author_id: {
        type: ObjectId,
        ref: "Author",
        required: true
    },
    categories: {
        type: Array,
        ref: "Category",
        default: []
    }
});

