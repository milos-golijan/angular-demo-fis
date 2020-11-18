import {
    Input,
    Output,
    OnChanges,
    Component,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';

export type IconSwitchOption = {
    value: string,
    icon: string
};

@Component({
    selector: 'app-icon-switch',
    templateUrl: './icon-switch.component.html',
    styleUrls: ['./icon-switch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconSwitchComponent implements OnChanges {

    @Input() options: IconSwitchOption[];
    @Output() changed: EventEmitter<string>;
    public selected: string;
    public get first(): IconSwitchOption { return this.options[0]; }
    public get second(): IconSwitchOption { return this.options[1]; }

    public constructor() {
        this.changed = new EventEmitter<string>();
    }

    public ngOnChanges(): void {
        if (this.options?.length > 1) {
            this.selected = this.first.value;
        }
    }

    public onSelect(value: string): void {
        this.selected = value;
        this.changed.emit(value);
    }
}
