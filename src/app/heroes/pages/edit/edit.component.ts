import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { HeroesStore } from '../../store/hero.store';
import { HeroesService } from '../../core/services';

import { DeleteHeroComponent } from './components/delete-hero/delete-hero.component';
import { SnackBarComponent } from '../../../shared/components';
import { environment } from '@environment/environment';
import { Hero, PublisherEnum } from '../../core/interfaces';

@Component({
  selector: 'w2m-edit',
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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialogService = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly heroesStore = inject(HeroesStore);
  private readonly heroesService = inject(HeroesService);

  urlImg = environment.static.urlImg;
  publisherEnum = PublisherEnum;

  hero: Signal<Hero> = signal(this.route.snapshot.data['hero']);
  dcOrMarvel: 'marvel' | 'dc' = (this.hero().publisher === this.publisherEnum.marvelPublisher) ? 'marvel' : 'dc';

  form = new FormGroup({
    superhero: new FormControl(this.hero().superhero, [Validators.required]),
    characters: new FormControl(this.hero().characters, [Validators.required]),
    alter_ego: new FormControl(this.hero().alter_ego, [Validators.required]),
    first_appearance: new FormControl(this.hero().first_appearance, [Validators.required]),
    publisher: new FormControl({ value: this.hero().publisher, disabled: true }, [Validators.required]),
  });

  handleDelete() {
    const dialogRef = this.dialogService.open(DeleteHeroComponent, {
      data: { name: this.hero().superhero }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.heroesStore.deleteHero(this.hero().id, this.dcOrMarvel);
      this.openSnackBar('success', `${this.hero().superhero} eliminado exitosamente`);
      this.redirectHome(this.hero());
    });
  }

  handleSubmit() {
    const heroUpadated: Hero = {
      ...this.hero(),
      ...this.form.value as Hero
    }
    this.heroesService.updateHero(heroUpadated).subscribe({
      next: () => {
        this.heroesStore.patchHero(heroUpadated, this.dcOrMarvel);
        this.openSnackBar('success', `${this.hero().superhero} editado exitosamente`);
        this.redirectHome(heroUpadated);
      },
      error: (err) => {
        console.warn('Handle error', err);
        this.openSnackBar('error', `Error editando a ${this.hero().superhero} intentanlo nuevamente`);
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

  private redirectHome(hero: Hero) {
    this.router.navigate(['/heroes/home'], { queryParams: { tab: this.dcOrMarvel === 'marvel' ? 0 : 1 } });
  }

  get superHeroCtrl(): FormControl { return this.form.controls.superhero };
  get charactersCtrl(): FormControl { return this.form.controls.characters };
  get alter_egoCtrl(): FormControl { return this.form.controls.alter_ego };
  get first_appearanceCtrl(): FormControl { return this.form.controls.first_appearance };
  get publisherCtrl(): FormControl { return this.form.controls.publisher };
}
