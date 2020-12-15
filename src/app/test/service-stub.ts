import { Observable, of, Subject } from 'rxjs';
import { Route } from '../shared/services/routing.service';

export class ActivatedRouteStub {

    public mockParams: any;

    public get params(): Observable<any> {
        return of(this.mockParams);
    }

    public constructor() {
        this.mockParams = {};
    }
}

export class RoutingServiceStub {

    private current: string;
    private previous: string;
    public route: Subject<string>;

    constructor() {
        this.route = new Subject<string>();
    }

    public navigate(route: Route, index?: string): void {
        this.previous = this.current;
        this.current = route + (index || '');
        this.route.next(this.current);
    }

    public navigateBack(): void {
        this.current = this.previous;
        this.route.next(this.previous);
    }

    public destroy(): void {
        this.route.complete();
    }
}
