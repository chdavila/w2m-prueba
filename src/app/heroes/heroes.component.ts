import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'w2m-heroes',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent {}
