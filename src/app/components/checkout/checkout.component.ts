import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  submitted = false;
  paymentSuccess = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]], // 16 ספרות
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')]], // פורמט MM/YY
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]] // 3 ספרות
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;
    if (this.checkoutForm.valid) {
      // סימולציה לעיבוד תשלום
      console.log('Payment processed successfully with data:', this.checkoutForm.value);
      this.paymentSuccess = true;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
      this.paymentSuccess = false;
    }
  }
}