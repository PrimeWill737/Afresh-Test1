// JS & TS number limit, bringing the birth of BigInt
// const maxInt = Number.MAX_SAFE_INTEGER;
// console.log(maxInt);

// let bigint = BigInt(20);
// console.log(bigint);


// Define the User type alias
// type User = {
//     readonly id: number; // read-only
//     name: string;
//     age?: number; // optional
//     contact: {
//         email: string;
//         phone?: string; // optional
//     };
//     preferences: {
//         theme: "light" | "dark";
//         language: "English" | "Spanish";
//         [key: string]: any; // index signature
//     };
// };

// // Initialize the user object
// const user: User = {
//     id: 1,
//     name: "John Doe",
//     // age is optional, so we skip initializing it
//     contact: {
//         email: "john@example.com",
//         // phone is optional, so we skip it too
//     },
//     preferences: {
//         theme: "dark",
//         language: "English",
//         additionalInfo: "This is an example of an index signature property",
//     },
// };

// console.log(user.preferences.additionalInfo);


//Async Function test 'revisit'
// type User = {
//     name: string,
//     age: number,
// }

// async function returnUser(id:number): Promise<User> {
//     return Promise.resolve({
//         name: 'John',
//         age: 3,
//     })
// }

//function multiply(by: number, ...numbers: number[]) {
 //   return numbers.map((number) => by * number);
//}

//console.log(multiply(2, 3, 5, 6));


// interfaces.ts - Type definitions for data structures
interface ContactFormData {
  name: string;
  email: string;
  product: string;
  message: string;
}

interface PurchaseData {
  productName: string;
  price: string; // Could be number in a real app
}

// main.ts - Core logic for form and buy button (simulates backend calls)
class ProductHandler {
  private apiBase: string = '/api'; // Hypothetical backend base URL

  // Typed function for buy now button
  buyProduct(productName: string, price: string): void {
    if (confirm(`Would you like to buy ${productName} for ${price}?`)) {
      const purchaseData: PurchaseData = { productName, price };
      
      // Simulate backend call (replace with real endpoint)
      fetch(`${this.apiBase}/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseData)
      })
      .then((response: Response) => {
        if (!response.ok) throw new Error('Purchase failed');
        return response.json();
      })
      .then((data: any) => {
        alert(`Purchase of ${productName} confirmed! Order ID: ${data.orderId || 'SIM-123'}. Redirecting to checkout...`);
        // In real app: window.location.href = '/checkout';
      })
      .catch((error: Error) => {
        console.error('Purchase error:', error);
        alert('Purchase failed. Please try again.');
      });
    }
  }

  // Typed function for form submission
  handleContactForm(event: Event): void {
    event.preventDefault();
    
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const formData: ContactFormData = {
      name: (form.querySelector('#name') as HTMLInputElement).value.trim(),
      email: (form.querySelector('#email') as HTMLInputElement).value.trim(),
      product: (form.querySelector('#product') as HTMLSelectElement).value,
      message: (form.querySelector('#message') as HTMLTextAreaElement).value.trim()
    };

    // Type-safe validation
    if (!this.validateFormData(formData)) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const submitBtn: HTMLButtonElement = form.querySelector('#submitBtn') as HTMLButtonElement;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate backend call (replace with real endpoint)
    fetch(`${this.apiBase}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then((response: Response) => {
      if (!response.ok) throw new Error('Submission failed');
      return response.json();
    })
    .then((data: any) => {
      alert(`Thank you, ${formData.name}! Message sent. Reference: ${data.reference || 'REF-456'}.`);
      form.reset();
    })
    .catch((error: Error) => {
      console.error('Form submission error:', error);
      alert('Submission failed. Please try again.');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  }

  private validateFormData(data: ContactFormData): boolean {
    return !!(
      data.name &&
      data.email &&
      data.product &&
      data.message &&
      this.isValidEmail(data.email)
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Global initialization (attach event listeners)
document.addEventListener('DOMContentLoaded', (): void => {
  const handler: ProductHandler = new ProductHandler();
  const form: HTMLFormElement | null = document.getElementById('contactForm') as HTMLFormElement;
  
  if (form) {
    form.addEventListener('submit', (event: Event) => handler.handleContactForm(event));
  }

  // Update onclick handlers in HTML to use the typed function (via global exposure)
  (window as any).buyProduct = (productName: string, price: string): void => {
    handler.buyProduct(productName, price);
  };

  // Smooth scrolling for navigation (existing vanilla JS enhancement)
  document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
    anchor.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const target: HTMLElement | null = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href') || '') as HTMLElement;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});



