import { Subject, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';

export enum Route {
    Home = '',
    ContactNew = 'contact/new',
    ContactEdit = 'contact/edit/',
    ContactList = 'contact/list',
    Overview = 'overview'
}

@Injectable({
    providedIn: 'root'
})
export class RoutingService implements OnDestroy {

    public route: Subject<string>;
    private routeChangeSubscription: Subscription;

    constructor(
        private router: Router,
        private location: Location
    ) {
        this.route = new Subject<string>();
        this.routeChangeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.route.next(this.currentRoute);
            }
        });
    }

    public get currentRoute(): string {
        return this.router.url;
    }

    public navigate(route: Route, index?: string): void {
        this.router.navigate([route + (index || '')]);
    }

    public navigateBack(): void {
        this.location.back();
    }

    public ngOnDestroy(): void {
        this.route.complete();
        this.routeChangeSubscription.unsubscribe();
    }
}
