import loadAuthSaga from "../states/modules/auth/saga";
import loadHomeSaga from "../states/modules/home/saga";
import loadAboutSaga from "../states/modules/about/saga";
import loadProfileSaga from "../states/modules/profile/saga";
import loadEmployeeSaga from "../states/modules/employee/saga";
import loadAuthorSaga from "../states/modules/author/saga";
import loadCategorySaga from "../states/modules/category/saga";
import loadBlogSaga from "../states/modules/blog/saga";
import loadCategoryDetailSaga from "../states/modules/categoryDetail/saga";
import loadCreateOrUpdateBlogSaga from "../states/modules/blogCreateOrUpdate/saga";

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga
ROUTE_SAGAS['LOAD_HOME_PAGE'] = loadHomeSaga
ROUTE_SAGAS['LOAD_ABOUT_PAGE'] = loadAboutSaga
ROUTE_SAGAS['LOAD_PROFILE_PAGE'] = loadProfileSaga
ROUTE_SAGAS['LOAD_EMPLOYEE_PAGE'] = loadEmployeeSaga
ROUTE_SAGAS['LOAD_AUTHOR_PAGE'] = loadAuthorSaga
ROUTE_SAGAS['LOAD_CATEGORY_PAGE'] = loadCategorySaga
ROUTE_SAGAS['LOAD_BLOG_PAGE'] = loadBlogSaga
ROUTE_SAGAS['LOAD_CATEGORY_DETAIL_PAGE'] = loadCategoryDetailSaga
ROUTE_SAGAS['LOAD_CREATE_UPDATE_BLOG_PAGE'] = loadCreateOrUpdateBlogSaga

