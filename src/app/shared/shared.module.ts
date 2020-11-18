import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { IconSwitchComponent } from './components/icon-switch/icon-switch.component';

// State
import { sharedReducer } from './state/shared.reducer';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [
        InitialsPipe,
        TableComponent,
        HeaderComponent,
        ConfirmDialogComponent,
        SidebarContainerComponent,
        IconSwitchComponent,
        LoaderComponent
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
        MatProgressSpinnerModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        AgGridModule.withComponents(),
        StoreModule.forFeature('shared', sharedReducer)
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
        MatProgressSpinnerModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        InitialsPipe,
        TableComponent,
        HeaderComponent,
        ConfirmDialogComponent,
        SidebarContainerComponent,
        IconSwitchComponent,
        LoaderComponent
    ]
})
export class SharedModule { }
