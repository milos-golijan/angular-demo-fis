import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
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
    public loading$: Observable<boolean>;

    public constructor(
        private store: Store<{ shared: SharedState }>
    ) { }

    public ngOnInit(): void {
        this.loading$ = this.store
        .select(getIsLoading);
    }
}
