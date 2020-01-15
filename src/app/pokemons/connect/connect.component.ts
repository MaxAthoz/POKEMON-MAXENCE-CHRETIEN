import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonService} from '../../services/pokemon.service';
import {tap} from 'rxjs/operators';
import {TokenPokemon} from '../models/token';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  loginForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit(data: FormGroup) {
    this.pokemonService.login(data).pipe(
      tap((myUser: TokenPokemon) => {
          localStorage.setItem('access_token', myUser.access_token);
          localStorage.setItem('refresh_token', myUser.refresh_token);
          localStorage.setItem('expires_in', myUser.expires_in);
        })
      ).subscribe();
    console.log(localStorage.getItem('access_token'));
    this.router.navigate(['/my-team']);

  }

}
