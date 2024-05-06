import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, upload} from "../app/middleware/common";
import * as blogRequest from "../app/requests/blog.request";
import * as blogMiddleware from "../app/middleware/blog.middleware";
import * as blogController from "../app/controllers/blog.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(blogRequest.readRoot)),
    asyncHandler(blogController.readRoot)
);

router.get(
    "/:id",
    asyncHandler(blogMiddleware.checkBlogId),
    asyncHandler(blogController.readItem)
);

router.post(
    "/",
    asyncHandler(upload),
    asyncHandler(validate(blogRequest.createItem)),
    asyncHandler(blogController.createItem)
);

router.put(
    "/:id",
    asyncHandler(upload),
    asyncHandler(blogMiddleware.checkBlogId),
    asyncHandler(validate(blogRequest.updateItem)),
    asyncHandler(blogController.updateItem),
);

router.delete(
    "/:id",
    asyncHandler(blogMiddleware.checkBlogId),
    asyncHandler(blogController.removeItem)
);

export default router;
