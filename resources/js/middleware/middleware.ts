import { LocationAsRelativeRaw, NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export type MiddlewareType = (
    next: NavigationGuardNext,
    to?: RouteLocationNormalized,
    from?: RouteLocationNormalized,
    meta?: any
) => Promise<RouteLocationNormalized|LocationAsRelativeRaw|undefined>;

export interface MiddlewareInterface {
    handle(next: NavigationGuardNext, to: RouteLocationNormalized, from: RouteLocationNormalized): Promise<RouteLocationNormalized|LocationAsRelativeRaw|undefined>;
}

export class Middleware implements MiddlewareInterface
{
    constructor(public next: NavigationGuardNext, public to: RouteLocationNormalized, public from: RouteLocationNormalized) {}

    public async handle(): Promise<RouteLocationNormalized|LocationAsRelativeRaw|undefined> {
        let middlewares: Array<{middleware: MiddlewareType, meta: any}> = [];
        for (let route of this.to.matched) {
            let currentMiddlewares = route.meta?.middleware as Array<MiddlewareType>;
            if (currentMiddlewares) {
                for (let currentMiddleware of currentMiddlewares) {
                    middlewares.push({
                        middleware: currentMiddleware,
                        meta: route.meta
                    });
                }
            }
        }
        for (const middleware of middlewares) {
            let result = await middleware.middleware(this.next, this.to, this.from, middleware.meta);
            if (result) {
                return result;
            }
        }
        return undefined;
    }
}
