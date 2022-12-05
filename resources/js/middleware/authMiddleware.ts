import {LocationAsRelativeRaw, RouteLocationNormalized} from "vue-router";
import store, { Getters } from "../store";
import {ROUTE_NAMES} from "../router";

export async function AuthMiddleware(): Promise<RouteLocationNormalized|LocationAsRelativeRaw|undefined>
{
    const isAuth: boolean = store.getters[Getters.AUTH].isAuth;
    if (isAuth) {
        return undefined;
    } else {
        return { name: ROUTE_NAMES.LOGIN };
    }
}