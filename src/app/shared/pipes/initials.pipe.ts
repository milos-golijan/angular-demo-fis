import { Pipe, PipeTransform } from '@angular/core';

const PIPE_KEY = 'initials';
const UNKNOWN_VALUE = 'N/A';

@Pipe({ name: PIPE_KEY })
export class InitialsPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return UNKNOWN_VALUE;
        }
        const nameParts = value.split(' ');
        let initials = nameParts[0].charAt(0);
        if (nameParts.length < 2) {
            return initials.toUpperCase();
        }
        initials += nameParts[nameParts.length - 1].charAt(0);
        return initials.toUpperCase();
    }
}
