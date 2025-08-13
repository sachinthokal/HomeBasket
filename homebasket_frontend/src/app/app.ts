import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('homebasket-frontend');}
