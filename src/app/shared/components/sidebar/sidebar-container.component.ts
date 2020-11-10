import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Route, RoutingService } from '../../services/routing.service';

@Component({
    selector: 'app-sidebar-container',
    templateUrl: './sidebar-container.component.html',
    styleUrls: ['./sidebar-container.component.scss']
})
export class SidebarContainerComponent implements OnInit {

    @Input() open: boolean;
    private route: string;

    public constructor(
        private routingService: RoutingService
    ) { }

    public ngOnInit(): void {
        this.routingService.route.subscribe((route: string) => {
            this.route = route;
        });
    }

    public isActive(route: string, matchFull?: boolean): boolean {
        if (!this.route) {
            return false;
        }
        return matchFull ? this.route === route : this.route.startsWith(route);
    }

    public onNavigate(route: string): void {
        this.routingService.navigate(route as Route);
    }
}
