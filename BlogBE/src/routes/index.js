import authRouter from "./auth";
import userRouter from "./user";
import blogRouter from "./blog";
import authorRouter from "./author";
import categoryRouter from "./category";
import certificateRouter from "./certificate";

export default function route(app) {
    app.use("/auth", authRouter);
    app.use("/users", userRouter);
    app.use("/blogs", blogRouter);
    app.use("/authors", authorRouter);
    app.use("/categories", categoryRouter);
    app.use("/certificates", certificateRouter);
}
