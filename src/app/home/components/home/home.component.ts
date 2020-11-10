import { Component, OnInit } from '@angular/core';
import { Route, RoutingService } from '../../../shared/services/routing.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    public constructor(
        private routingService: RoutingService
    ) { }

    public onView(): void {
        this.routingService.navigate(Route.ContactList);
    }

    public onCreate(): void {
        this.routingService.navigate(Route.ContactNew);
    }

    public onOverview(): void {
        this.routingService.navigate(Route.Overview);
    }
}
