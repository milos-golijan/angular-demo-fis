import { Pipe, PipeTransform } from '@angular/core';

const PIPE_KEY = 'initials';
const UNKNOWN_VALUE = 'N/A';

@Pipe({ name: PIPE_KEY })
export class InitialsPipe implements PipeTransform {
    transform(value: string): string {
        const nameParts = value.split(' ');
        if (nameParts.length === 0) {
            return UNKNOWN_VALUE;
        }
        let initials = nameParts[0].charAt(0);
        if (nameParts.length < 2) {
            return initials.toUpperCase();
        }
        initials += nameParts[nameParts.length - 1].charAt(0);
        return initials.toUpperCase();
    }
}
