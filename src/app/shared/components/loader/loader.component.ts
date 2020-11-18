import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
    Input,
    OnInit,
    Component
} from '@angular/core';
import { getIsLoading, SharedState } from '../../state/shared.reducer';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

    @Input() label: string;
    public loading: boolean;
    public loadingSubscription: Subscription;

    public constructor(
        private store: Store<{ shared: SharedState }>
    ) { }

    public ngOnInit(): void {
        this.loadingSubscription = this.store
        .select(getIsLoading)
        .subscribe(isLoading => {
            this.loading = isLoading;
        });
    }
}
