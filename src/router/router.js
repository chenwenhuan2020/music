export const routes = [{
        path: "/login",
        name: "Login",
        component: () => import('../views/Login.vue')
    },
    {
        path: "/main",
        name: "Main",
        component: () => import("../views/Main.vue"),

        children: [{
                path: "home",
                name: "Home",
                component: () => import('../views/Home.vue'),
            },
            {
                path: "list",
                name: "List",
                component: () => import('../views/List.vue')
            },
            {
                path: "rbt",
                name: "Rbt",
                component: () => import('../views/Rbt.vue')
            },
            {
                path: "shop",
                name: "Shop",
                component: () => import('../views/Shop.vue')
            },
            {
                path: 'remlist/:id',
                name: 'Remlist',
                component: () => import('../views/Remlist.vue')
            },
            {
                path: 'newdisc/:url',
                name: 'Newdisc',
                component: () => import('../views/Newdisc.vue')
            },
            {
                path: 'rankinglist/:id',
                name: 'Rankinglist',
                component: () => import('../views/Rankinglist.vue')
            },
            {
                path: '/singeralbum/',
                name: 'Singeralbum',
                component: () => import('../views/Singeralbum.vue'),

                children: [{
                        path: 'namehot',
                        name: 'Namehot',
                        component: () => import('../views/Namehot.vue')
                    },
                    {
                        path: 'namezj',
                        name: 'Namezj',
                        component: () => import('../views/Namezj.vue')
                    },
                    {
                        path: 'namemv',
                        name: 'Namemv',
                        component: () => import('../views/Namemv.vue')
                    },
                    {
                        path: 'namejs',
                        name: 'Namejs',
                        component: () => import('../views/Namejs.vue')
                    },
                ]
            },
            {
                path: 'search/',
                name: 'Search',
                component: () => import('../views/Search.vue')
            },
            {
                path: 'namezjlist/:id',
                name: "Namezjlist",
                component: () => import('../views/Namezjlist.vue')
            },
            {
                path: "playinterface",
                name: "Playinterface",
                component: () => import('../views/Playinterface.vue')
            },
        ],

    },

    {
        path: "/mv/:id",
        name: "Mv",
        component: () => import('../views/Mv.vue')
    },
    {
        path: "*",
        redirect: {
            name: "Home"
        }
    },
]