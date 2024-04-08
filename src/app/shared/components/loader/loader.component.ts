import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'w2m-loader',
  standalone: true,
  imports: [],
  template: `<div class="loader"></div>`,
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {}
