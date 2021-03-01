import { HomeOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
const menuList = [{
        title: "首页", // 菜单标题名称
        key: "/home", // 对应的path
        icon: < HomeOutlined / > , // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: "文章",
        key: "/article",
        icon: < HomeOutlined / > ,
        children: [{
                title: "品类管理",
                key: "/category",
                icon: < HomeOutlined / > ,
            },
            {
                title: "文章管理",
                key: "/articles",
                icon: < HomeOutlined / > ,
            },
        ],
    },

    {
        title: "用户管理",
        key: "/user",
        icon: < UserOutlined / > ,
    },
    {
        title: "角色管理",
        key: "/role",
        icon: < TeamOutlined / > ,
    },
];

export default menuList;