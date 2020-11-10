import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Pipes
import { InitialsPipe } from './pipes/initials.pipe';

// Components
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarContainerComponent } from './components/sidebar/sidebar-container.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';

// External Imports
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { IconSwitchComponent } from './components/icon-switch/icon-switch.component';

@NgModule({
    declarations: [
        InitialsPipe,
        TableComponent,
        HeaderComponent,
        ConfirmDialogComponent,
        SidebarContainerComponent,
        IconSwitchComponent
    ],
    imports: [
        MatIconModule,
        MatCardModule,
        MatRadioModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        AgGridModule.withComponents(),
    ],
    exports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        InitialsPipe,
        TableComponent,
        HeaderComponent,
        ConfirmDialogComponent,
        SidebarContainerComponent,
        IconSwitchComponent
    ]
})
export class SharedModule { }
