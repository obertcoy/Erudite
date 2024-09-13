import { LayoutEnum } from "@/lib/enum/layout-enum"

export interface Route {
    path: string
    element: JSX.Element
}

export interface GroupRoutes {
    prefix: string
    layout: LayoutEnum
    children: Route[]
}