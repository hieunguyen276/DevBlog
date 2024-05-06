import {responseSuccess} from "@/utils/helpers";
import * as blogService from "../services/blog.service";

export async function readRoot(req, res) {
    return responseSuccess(res, await blogService.filter(req.query));
}

export async function readItem(req, res) {
    // await responseSuccess(res, await blogService.details(req.params.id));
    await responseSuccess(res, await blogService.details(req.blog));
}

export async function createItem(req, res) {
    await blogService.create(req.body);
    return responseSuccess(res, null, 201);
}

export async function updateItem(req, res) {
    await blogService.update(req.blog, req.body);
    return responseSuccess(res, null, 201);
}

export async function removeItem(req, res) {
    await blogService.remove(req.blog);
    return responseSuccess(res);
}

// export async function resetPassword(req, res) {
//     await blogService.resetPassword(req.blog, req.body.new_password);
//     return responseSuccess(res, null, 201);
// }
