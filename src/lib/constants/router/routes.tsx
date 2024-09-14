import { LayoutEnum } from "@/lib/enum/layout-enum";
import { Route, GroupRoutes } from "@/lib/model/interfaces/route";
import HomePage from "@/pages/(public)/home-page";
import LoginPage from "@/pages/(public)/login_page";
import RegisterPage from "@/pages/(public)/register_page";


export const GROUP_ROUTES: GroupRoutes[] = [
    {
        prefix: "/",
        layout: LayoutEnum.PUBLIC,
        children: [
            {
                path: "",
                element: <HomePage />
            }
        ]
    }
];

export const INDEPENDENT_ROUTES: Route[] = [
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    }
];