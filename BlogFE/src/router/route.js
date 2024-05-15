import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Employee from '../pages/Employee';
import About from '../pages/About';
import { rootLoader } from "./rootLoader";
import Authors from '../pages/Author';
import Category from '../pages/Category';
import Blogs from '../pages/Blog';
import CategoryDetail from '../pages/CategoryDetail';
import BlogCreateOrUpdate from '../pages/BlogCreateOrUpdate';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>,
    loader: ({request}) => rootLoader(
      {request},false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/register',
    element: <Register/>,
    loader: ({request}) => rootLoader(
      {request}, false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>,
    loader: ({request}) => rootLoader(
      {request}, false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: 'profile',
    element: <Profile/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_PROFILE_PAGE'
    )
  },
  {
    path: '',
    element: <Home/>,
    loader: ({request}) => rootLoader(
      {request}, true, 'LOAD_HOME_PAGE'
    )
  },
  {
    path: '/about',
    element: <About/>,
    loader: ({request}) => rootLoader(
      {request}, true, 'LOAD_ABOUT_PAGE'
    ),
    children: [
      {
        path: ":id",
        element: <About/>,
        loader: ({request}) => rootLoader(
          {request}, true, 'LOAD_ABOUT_PAGE'
        ),
      },
    ],
  },
  {
    path: '/users',
    element: <Employee/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_EMPLOYEE_PAGE'
    )
  },
  {
    path: '/authors',
    element: <Authors/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_AUTHOR_PAGE'
    )
  },
  {
    path: '/categories',
    element: <Category/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_CATEGORY_PAGE'
    )
  },

  {
    path: '/categories/:id',
    element: <CategoryDetail/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_CATEGORY_DETAIL_PAGE'
    )
  },

  {
    path: '/blogCreateOrUpdate',
    element: <BlogCreateOrUpdate/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_CREATE_UPDATE_BLOG_PAGE'
    )
  },

  {
    path: '/blogCreateOrUpdate/:id',
    element: <BlogCreateOrUpdate/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_CREATE_UPDATE_BLOG_PAGE'
    )
  },

  {
    path: '/blogs',
    element: <Blogs/>,
    loader: ({request}) => rootLoader(
      {request},true, 'LOAD_BLOG_PAGE'
    )
  },
]);

export default router;
