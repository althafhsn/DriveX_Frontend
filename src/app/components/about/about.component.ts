import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'] // Corrected styleUrls
})
export class AboutComponent implements OnInit {
  
  ngOnInit(): void {
    this.initSubscriptionForm(); // Initialize the form logic
  }

  // Function to initialize event listeners
  initSubscriptionForm(): void {
    const form = document.querySelector('.subscribe-form') as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;

    // Handle form submission
    form.addEventListener('submit', (event: Event) => {
      event.preventDefault(); // Prevent form from refreshing the page

      const email = emailInput.value.trim();

      // Validate the email input
      if (this.validateEmail(email)) {
        // Display success message
        alert('Thank you for subscribing!');
        emailInput.value = ''; // Clear the input field
      } else {
        // Display error message
        alert('Please enter a valid email address.');
      }
    });
  }

  // Validate email using a regular expression
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
