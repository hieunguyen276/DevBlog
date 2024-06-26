import React from "react";

export const routeMap = [
  {
    label: 'Dashboard',
    icon: (
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16" width="18" height="16">
        <g fill="currentColor">
          <path d="M17.994 7.984a1.01 1.01 0 0 1-1 1.003h-1l.022 5.006c0 .084-.006.169-.016.253v.504A1.25 1.25 0 0 1 14.75 16h-.5c-.034 0-.069 0-.103-.003-.044.003-.087.003-.131.003H12.25A1.25 1.25 0 0 1 11 14.75V12a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2.75A1.25 1.25 0 0 1 5.75 16H4.003c-.047 0-.094-.003-.141-.006a1.4 1.4 0 0 1-.113.006h-.5a1.25 1.25 0 0 1-1.25-1.25v-3.5c0-.028 0-.059.003-.087V8.988H1c-.563 0-1-.438-1-1.003 0-.281.094-.531.313-.75L8.325.25c.219-.219.469-.25.688-.25s.469.063.656.219l7.981 7.016c.25.219.375.469.344.75z" />
        </g>
      </svg>

    ),
    path: '/',
    routeActive: ['/'],
    permissions: [
      'home_page',
    ],
  },
  {
    label: 'User Management',
    icon: (
      // <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16" width="20" height="16">
      //   <g fill="currentColor">
      //     <path d="M4.5 5A2.5 2.5 0 1 1 4.499.001 2.5 2.5 0 0 1 4.5 5zM16 5a2.5 2.5 0 1 1-.001-4.999A2.5 2.5 0 0 1 16 5zM0 9.335A3.336 3.336 0 0 1 3.335 6H4.67c.498 0 .969.11 1.394.302a3.999 3.999 0 0 0 1.294 3.696H.666A.666.666 0 0 1 0 9.335zM12.666 10h-.021a3.992 3.992 0 0 0 1.294-3.696 3.287 3.287 0 0 1 1.394-.302h1.335a3.336 3.336 0 0 1 3.335 3.335c0 .369-.3.666-.666.666h-6.67zm.335-3A3 3 0 1 1 7 6.999 3 3 0 0 1 13 7zM4 15.166A4.168 4.168 0 0 1 8.166 11h3.669a4.168 4.168 0 0 1 4.166 4.166.834.834 0 0 1-.834.834H4.834A.834.834 0 0 1 4 15.166z"/>
      //   </g>
      // </svg>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <circle cx="9" cy="9" r="2" stroke="#1C274C" strokeWidth="1.5"></circle>
            <path d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z" stroke="#1C274C" strokeWidth="1.5"></path> <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.298 5.64118 21.5794 6.2255 21.748 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M19 12H15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M19 9H14" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M19 15H16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
          </g>
        </g>
      </svg>
    ),
    path: '/users',
    routeActive: ['/users'],
    permissions: [
      'employee_page',
    ]
  },
  {
    label: 'Author Management',
    icon: (
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16" width="20" height="16">
        <g fill="currentColor">
          <path d="M4.5 5A2.5 2.5 0 1 1 4.499.001 2.5 2.5 0 0 1 4.5 5zM16 5a2.5 2.5 0 1 1-.001-4.999A2.5 2.5 0 0 1 16 5zM0 9.335A3.336 3.336 0 0 1 3.335 6H4.67c.498 0 .969.11 1.394.302a3.999 3.999 0 0 0 1.294 3.696H.666A.666.666 0 0 1 0 9.335zM12.666 10h-.021a3.992 3.992 0 0 0 1.294-3.696 3.287 3.287 0 0 1 1.394-.302h1.335a3.336 3.336 0 0 1 3.335 3.335c0 .369-.3.666-.666.666h-6.67zm.335-3A3 3 0 1 1 7 6.999 3 3 0 0 1 13 7zM4 15.166A4.168 4.168 0 0 1 8.166 11h3.669a4.168 4.168 0 0 1 4.166 4.166.834.834 0 0 1-.834.834H4.834A.834.834 0 0 1 4 15.166z" />
        </g>
      </svg>
    ),
    path: '/authors',
    routeActive: ['/authors'],
    permissions: [
      'author_page',
    ]
  },
  {
    label: 'Category Management',
    icon: (
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000">
        <g fill="currentColor">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <rect x="0" fill="none" width="20" height="20"></rect> <g>
              <path d="M5 7h13v10H2V4h7l2 2H4v9h1V7z"></path> </g> </g>
        </g>
      </svg>
    ),
    path: '/categories',
    routeActive: ['/categories'],
    permissions: [
      'category_page',
    ]
  },
  {
    label: 'Blog Management',
    icon: (
      <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000">
        <g fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <g> <rect x="293.186" y="307.184" className="st0" width="131.572" height="112.986"></rect> <rect x="87.243" y="308.893" className="st0" width="154.448" height="17.162"></rect> <rect x="87.243" y="401.298" className="st0" width="154.448" height="17.162"></rect> <rect x="87.243" y="355.1" className="st0" width="154.448" height="17.162"></rect>
            <path className="st0" d="M416.428,0.004H95.58C42.787,0.013,0.016,42.792,0,95.577v303.685 c0.025,62.262,50.463,112.717,112.742,112.734h286.524c62.27-0.017,112.717-50.464,112.734-112.734V95.577 C511.992,42.792,469.212,0.013,416.428,0.004z M464.805,399.262c-0.008,18.15-7.308,34.424-19.198,46.34 c-11.916,11.891-28.19,19.19-46.34,19.198H112.742c-18.15-0.009-34.433-7.308-46.348-19.198 c-11.892-11.916-19.182-28.19-19.198-46.34V118.696h417.61V399.262z"></path>
            <path className="st0" d="M88.96,267.908h34.583c19.71,0,31.642-8.581,31.642-26.548c0-10.852-6.167-18.368-12.2-20.648v-0.268 c6.034-3.352,10.592-9.519,10.592-19.432c0-14.489-9.251-24.268-29.086-24.268H88.96c-0.796,0-1.332,0.536-1.332,1.34v88.475 C87.628,267.371,88.164,267.908,88.96,267.908z M107.338,193.495c0-0.528,0.251-0.804,0.804-0.804h13.944 c7.5,0,11.925,3.888,11.925,10.584c0,6.712-4.425,10.734-11.925,10.734h-13.944c-0.553,0-0.804-0.268-0.804-0.804V193.495z M107.338,229.955c0-0.528,0.251-0.795,0.804-0.795h15c8.061,0,12.343,4.424,12.343,11.405c0,7.097-4.282,11.396-12.343,11.396h-15 c-0.553,0-0.804-0.276-0.804-0.812V229.955z"></path>
            <path className="st0" d="M181.516,267.908h59.404c0.796,0,1.332-0.536,1.332-1.349v-14.874c0-0.813-0.536-1.341-1.332-1.341h-40.224 c-0.544,0-0.804-0.268-0.804-0.812v-71.447c0-0.804-0.528-1.34-1.341-1.34h-17.036c-0.805,0-1.332,0.536-1.332,1.34v88.475 C180.183,267.371,180.711,267.908,181.516,267.908z"></path> <path className="st0" d="M292.708,269.374c15.963,0,28.558-7.366,33.251-22.115c2.011-6.301,2.539-11.396,2.539-24.938 c0-13.542-0.528-18.637-2.539-24.939c-4.693-14.739-17.288-22.114-33.251-22.114c-15.956,0-28.558,7.375-33.243,22.114 c-2.02,6.302-2.556,11.397-2.556,24.939c0,13.542,0.536,18.637,2.556,24.938C264.149,262.009,276.752,269.374,292.708,269.374z M278.361,202.746c2.011-6.301,6.847-10.055,14.346-10.055c7.508,0,12.335,3.754,14.346,10.055 c1.073,3.226,1.474,7.634,1.474,19.576c0,11.924-0.402,16.357-1.474,19.567c-2.011,6.31-6.838,10.072-14.346,10.072 c-7.5,0-12.335-3.763-14.346-10.072c-1.064-3.21-1.475-7.643-1.475-19.567C276.886,210.38,277.297,205.972,278.361,202.746z"></path>
            <path className="st0" d="M387.961,269.374c16.081,0,28.685-8.171,33.251-22.794c1.6-4.952,2.263-12.46,2.263-20.505v-7.517 c0-0.788-0.536-1.333-1.332-1.333h-31.366c-0.813,0-1.349,0.545-1.349,1.333v12.888c0,0.796,0.536,1.332,1.349,1.332h12.326 c0.536,0,0.805,0.277,0.805,0.805c0,3.879-0.403,6.703-1.073,8.991c-1.878,6.026-7.777,9.386-14.614,9.386 c-7.91,0-12.88-3.763-14.891-10.072c-1.064-3.21-1.466-7.643-1.466-19.567c0-11.941,0.402-16.223,1.466-19.441 c2.011-6.302,6.847-10.19,14.631-10.19c7.5,0,12.05,3.218,15.678,9.385c0.269,0.67,0.939,0.939,1.886,0.67l14.338-6.033 c0.796-0.402,0.947-1.206,0.536-2.019c-4.299-10.995-15.419-19.425-32.439-19.425c-16.232,0-28.835,7.375-33.527,22.114 c-2.012,6.302-2.556,11.397-2.556,24.939c0,13.542,0.545,18.637,2.556,24.938C359.126,262.009,371.73,269.374,387.961,269.374z"></path> </g>
          </g>
        </g>
      </svg>
    ),
    path: '/blogs',
    routeActive: ['/blogs'],
    permissions: [
      'blog_page',
    ]
  },
  // {
  //   label: 'Settings',
  //   icon: (
  //     <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" transform="scale(-1 1)" width="16" height="16">
  //       <g fill="currentColor">
  //         <path fill="currentColor" d="M5 8c0-1.684 1.316-3 3-3 1.656 0 3 1.316 3 3 0 1.656-1.344 3-3 3-1.684 0-3-1.344-3-3zm3-1.5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8 6.5zM9.159 0a1.5 1.5 0 0 1 1.459 1.148l.244 1.015c.266.13.519.277.759.44l1.003-.295a1.502 1.502 0 0 1 1.725.689l1.159 2.007c.344.6.234 1.359-.266 1.837l-.759.694a6.34 6.34 0 0 1 0 .904l.759.722c.5.478.609 1.238.266 1.837l-1.159 2.006c-.347.6-1.059.884-1.725.691l-1.003-.297a6.617 6.617 0 0 1-.759.441l-.244 1.016a1.502 1.502 0 0 1-1.459 1.147H6.84a1.5 1.5 0 0 1-1.459-1.147l-.244-1.016a6.314 6.314 0 0 1-.759-.441l-1.031.297c-.637.194-1.349-.091-1.695-.691L.493 10.998a1.5 1.5 0 0 1 .265-1.837l.757-.723a6.578 6.578 0 0 1 0-.904L.758 6.84a1.5 1.5 0 0 1-.265-1.837l1.159-2.007c.347-.6 1.059-.885 1.695-.689l1.031.295c.241-.163.494-.31.759-.44l.244-1.015A1.501 1.501 0 0 1 6.841 0H9.16zM6.422 3.237l-.35.147a4.941 4.941 0 0 0-1.1.637l-.303.231-1.718-.506-1.16 2.006 1.297 1.234-.048.375a5.208 5.208 0 0 0 0 1.276l.048.375-1.297 1.234 1.159 2.006 1.718-.506.303.231c.334.256.703.472 1.1.637l.35.147.419 1.738h2.319l.419-1.738.35-.147a4.941 4.941 0 0 0 1.1-.637l.303-.231 1.719.506 1.159-2.006-1.297-1.234.047-.375A4.8 4.8 0 0 0 13 8c0-.216-.013-.428-.041-.637l-.047-.375 1.297-1.234-1.159-2.006-1.719.506-.303-.231a4.903 4.903 0 0 0-1.1-.637l-.35-.147L9.159 1.5H6.84l-.419 1.738z"/>
  //       </g>
  //     </svg>
  //   ),
  //   path: '',
  //   routeActive: ['/about', '/contact'],
  //   permissions: [
  //     'about_page',
  //   ],
  //   children: [
  //     {
  //       label: 'About',
  //       icon: '',
  //       path: '/about',
  //       routeActive: ['/about'],
  //       permissions: ['about_page'],
  //     },
  //     {
  //       label: 'Contact',
  //       icon: '',
  //       path: '',
  //       routeActive: ['/contact'],
  //       permissions: ['contact_page'],
  //     },
  //   ]
  // }
]
