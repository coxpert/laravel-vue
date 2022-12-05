import { LocationAsRelativeRaw, RouteLocationNormalized } from "vue-router";
import store, { Getters } from "../store";
import {ROUTE_NAMES} from "../router";

export async function NotAuthMiddleware(): Promise<RouteLocationNormalized|LocationAsRelativeRaw|undefined>
{
    const isAuth: boolean = store.getters[Getters.AUTH].isAuth;

    if (isAuth) {
        return { name: ROUTE_NAMES.HOME };
    } else {
        return undefined;
    }
}