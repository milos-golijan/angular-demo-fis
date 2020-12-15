import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getWorkspace, SharedState } from '../state/shared.reducer';

export enum Route {
    Home = '',
    ContactList = 'contact/',
    ContactNew = 'contact/new',
    ContactEdit = 'contact/edit/',
    CompanyList = 'company/'
}

@Injectable({
    providedIn: 'root'
})
export class RoutingService implements OnDestroy {

    public workspace: string;
    public route: Subject<string>;
    private workspaceSubscription: Subscription;
    private routeChangeSubscription: Subscription;

    constructor(
        private router: Router,
        private location: Location,
        private store: Store<{ contact: SharedState }>
    ) {
        this.route = new Subject<string>();
        this.workspaceSubscription = this.store.select(getWorkspace)
        .subscribe((workspace: string) => this.workspace = workspace);
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
        const prefix: string = (route === Route.Home) ? '' : 'ws/' + this.workspace + '/';
        this.router.navigate([prefix + route + (index || '')]);
    }

    public navigateBack(): void {
        this.location.back();
    }

    public ngOnDestroy(): void {
        this.route.complete();
        this.workspaceSubscription.unsubscribe();
        this.routeChangeSubscription.unsubscribe();
    }
}
