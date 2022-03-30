import { Injectable, InjectionToken } from '@angular/core';

export const MY_VALUE = new InjectionToken<number>('myValue', {
  providedIn: 'root',
  factory: () => 2,
});

@Injectable({
  providedIn: 'root',
})
export class ConsoleService {
  private id: number;
  
  getId(): void {
    if (!this.id) {
      console.log('Service created');
      this.id = Math.ceil(Math.random() * 100);
    }
  }
  
  show(): void {
    this.getId();
    console.log('service works, id: ', this.id);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CustomConsoleService {
  private id: number;
  
  getId(): void {
    if (!this.id) {
      console.log('Custom service created');
      this.id = Math.ceil(Math.random() * 100);
    }
  }
  
  show(): void {
    this.getId();
    console.log('custom service works, id: ', this.id);
  }
}
