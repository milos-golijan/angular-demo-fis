import { Store } from '@ngrx/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getWorkspace, SharedState } from '../../state/shared.reducer';
import { Observable } from 'rxjs';
import { changeWorkspace } from '../../state/shared.actions';
import { Route, RoutingService } from '../../services/routing.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() sidebarToggled: EventEmitter<void>;
    public workspace$: Observable<string>;

    public constructor(
        private routingService: RoutingService,
        private store: Store<{ shared: SharedState }>
    ) {
        this.sidebarToggled = new EventEmitter<void>();
    }

    public ngOnInit(): void {
        this.workspace$ = this.store
        .select(getWorkspace);
    }

    public onToggleSidebar(): void {
        this.sidebarToggled.emit();
    }

    public onWorkspaceChanged(workspace: string): void {
        this.store.dispatch(changeWorkspace({ workspace }));
        this.routingService.navigate(Route.Home);
    }
}
