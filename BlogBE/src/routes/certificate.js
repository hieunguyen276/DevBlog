import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, upload} from "../app/middleware/common";
import * as certificateRequest from "../app/requests/certificate.request";
import * as certificateMiddleware from "../app/middleware/certificate.middleware";
import * as certificateController from "../app/controllers/certificate.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(certificateRequest.readRoot)),
    asyncHandler(certificateController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(certificateMiddleware.checkCertificateId),
    asyncHandler(certificateController.readItem)
);

router.post(
    "/",
    asyncHandler(upload),
    asyncHandler(validate(certificateRequest.createItem)),
    asyncHandler(certificateController.createItem)
);

router.put(
    "/:id",
    asyncHandler(certificateMiddleware.checkCertificateId),
    asyncHandler(validate(certificateRequest.updateItem)),
    asyncHandler(certificateController.updateItem),
    (req, res)=>{res.send(req);}
);

router.delete(
    "/:id",
    asyncHandler(certificateMiddleware.checkCertificateId),
    asyncHandler(certificateController.removeItem)
);


export default router;
