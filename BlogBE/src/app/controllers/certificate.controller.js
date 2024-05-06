import { responseSuccess} from "@/utils/helpers";
import * as certificateService from "../services/certificate.service";

export async function readRoot(req, res) {
    return responseSuccess(res, await certificateService.filter(req.query));
}

export async function readItem(req, res) {
    await responseSuccess(res, await certificateService.details(req.params.id));
}

export async function createItem(req, res) {
    await certificateService.create(req.body);
    return responseSuccess(res, null, 201);
}

export async function updateItem(req, res) {
    await certificateService.update(req.certificate, req.body);
    return responseSuccess(res, null, 201);
}

export async function removeItem(req, res) {
    await certificateService.remove(req.certificate);
    return responseSuccess(res);
}
