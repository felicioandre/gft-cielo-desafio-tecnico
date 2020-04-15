import { Component, OnInit, Input } from '@angular/core';
import { ICard } from 'src/app/interfaces/ICard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() content: ICard;

  constructor() {}

  ngOnInit(): void {}
}
