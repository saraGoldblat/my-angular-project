import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
 @Input() text: string = '';
  @Input() isShown: boolean = false;
  // מיקום: 'above' (ברירת מחדל), 'below', 'left', 'right'
  @Input() position: 'above' | 'below' | 'left' | 'right' = 'above';
}
