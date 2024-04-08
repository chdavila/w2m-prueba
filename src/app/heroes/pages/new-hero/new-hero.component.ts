import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HeroesStore } from '../../store/hero.store';
import { HeroesService } from '../../core/services';

import { SnackBarComponent } from '../../../shared/components';
import { environment } from '@environment/environment';
import { Hero, PublisherEnum } from '../../core/interfaces';

@Component({
  selector: 'w2m-new-hero',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './new-hero.component.html',
  styleUrl: './new-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewHeroComponent {
  private readonly router = inject(Router);
  private readonly heroesStore = inject(HeroesStore);
  private readonly heroesService = inject(HeroesService);
  private readonly snackBar = inject(MatSnackBar);

  publisherEnum = PublisherEnum;

  urlUnsplash = environment.static.urlUnsplash

  form = new FormGroup({
    superhero: new FormControl('', [Validators.required]),
    characters: new FormControl('', [Validators.required]),
    alter_ego: new FormControl('', [Validators.required]),
    first_appearance: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
  });

  handleSubmit() {
    const nameToId = `${this.form.value.superhero}`.replaceAll(' ', '-').toLocaleLowerCase();
    const dcOrMarvel = this.form.value.publisher === this.publisherEnum.dcPublisher ? 'dc' : 'marvel'
    const newHero: Hero = {
      ...this.form.value as Hero,
      id: `${dcOrMarvel}-${nameToId}`,
      img: this.urlUnsplash
    };
    this.heroesService.createHero(newHero).subscribe({
      next: () => {
        this.heroesStore.addHero(newHero, dcOrMarvel);
        this.openSnackBar('success', `${newHero.superhero} creado exitosamente`);
        this.router.navigate(['/heroes/home'], { queryParams: { tab: dcOrMarvel === 'marvel' ? 0 : 1 } });
      },
      error: (err: HttpErrorResponse) => {
        console.warn(`Hanlde error`, err);
        this.openSnackBar('success', `Error creando al hero ${newHero.superhero}, intentanlo nuevamente`);
      }
    })
  }

  private openSnackBar(type: 'error' | 'success', message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      panelClass: ['custom-snackbar', `custom-snackbar--${type}`],
      data: { message }
    });
  }

  get superHeroCtrl(): FormControl { return this.form.controls.superhero };
  get charactersCtrl(): FormControl { return this.form.controls.characters };
  get alter_egoCtrl(): FormControl { return this.form.controls.alter_ego };
  get first_appearanceCtrl(): FormControl { return this.form.controls.first_appearance };
  get publisherCtrl(): FormControl { return this.form.controls.publisher };
}
