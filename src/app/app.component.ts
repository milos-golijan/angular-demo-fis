import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public title: string;
    public sideNavOpen: boolean;

    public constructor() {
        this.title = 'Angular Demo';
        this.sideNavOpen = false;
    }

    public onToggleSidebar(): void {
        this.sideNavOpen = !this.sideNavOpen;
    }
}
