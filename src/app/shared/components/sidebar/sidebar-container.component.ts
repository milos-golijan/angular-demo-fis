import {
    Input,
    OnInit,
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { Route, RoutingService } from '../../services/routing.service';

@Component({
    selector: 'app-sidebar-container',
    templateUrl: './sidebar-container.component.html',
    styleUrls: ['./sidebar-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarContainerComponent implements OnInit {

    @Input() open: boolean;
    private route: string;

    public constructor(
        private changeDetection: ChangeDetectorRef,
        private routingService: RoutingService
    ) { }

    public ngOnInit(): void {
        this.routingService.route.subscribe((route: string) => {
            this.route = route;
            this.changeDetection.markForCheck();
        });
    }

    public isActive(route: string, matchFull?: boolean): boolean {
        if (!this.route) {
            return false;
        }
        return matchFull ? this.route === route : this.route.includes(route);
    }

    public onNavigate(route: string): void {
        this.routingService.navigate(route as Route);
    }
}
