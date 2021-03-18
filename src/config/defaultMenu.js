const menus = [{
        title: "首页", // 菜单标题名称
        path: "/home", // 对应的path
    },
    {
        title: "文章",
        path: "/article",
        children: [{
                title: "分类管理",
                path: "/category",
            },
            {
                title: "文章管理",
                path: "/articles",
                children: [{
                    title: "增加文章",
                    path: "/articles/add",
                }, ],
            },
        ],
    },

    {
        title: "用户管理",
        path: "/user",
    },
    {
        title: "角色管理",
        path: "/role",
    },
];

export default menus;