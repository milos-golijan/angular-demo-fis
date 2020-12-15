import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class DOMHelper<T> {

    private fixture: ComponentFixture<T>;

    constructor(fixture: ComponentFixture<T>) {
        this.fixture = fixture;
    }

    public findAll(accessor: string): DebugElement[] {
        return this.fixture.debugElement
            .queryAll(By.css(accessor));
    }

    public findOne(accessor: string): DebugElement | null {
        const all = this.findAll(accessor);
        return all.length > 0 ? all[0] : null;
    }

    public findElement(accessor: string): HTMLElement | null {
        const debugElement = this.findOne(accessor);
        return debugElement ? debugElement.nativeElement : null;
    }

    public findText(accessor: string): string {
        const element = this.findOne(accessor);
        return element?.nativeElement.textContent;
    }

    public exists(accessor: string): boolean {
        return !!this.findOne(accessor);
    }

    public count(accessor: string): number {
        return this.findAll(accessor).length;
    }
}
