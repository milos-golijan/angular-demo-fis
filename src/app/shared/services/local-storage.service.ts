import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public exists(key: string): boolean {
        return !!this.get(key);
    }

    public get(key: string): any {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);
    }

    public set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
