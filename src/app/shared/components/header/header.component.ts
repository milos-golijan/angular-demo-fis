import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Output() sidebarToggled: EventEmitter<void>;

    public constructor() {
        this.sidebarToggled = new EventEmitter<void>();
    }

    public onToggleSidebar(): void {
        this.sidebarToggled.emit();
    }
}
