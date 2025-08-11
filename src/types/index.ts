// export interface Config {
//   pricePerCopyNGN: number;
//   pricePerCopyUSD: number;
//   sessionPriceNGN: number;
//   sessionPriceUSD: number;
//   amazonLink: string;
//   paystackPublicKey: string;
// }

// export interface Donation {
//   copies: number;
//   totalNGN: number;
//   totalUSD: number;
//   name?: string;
//   email?: string;
//   phone?: string;
//   organization?: string;
//   location?: string;
// }

// export interface Presale {
//   type: string;
//   copies: number;
//   totalNGN: number;
// }

// export interface Session {
//   name: string;
//   email: string;
//   location: string;
//   amountNGN: number;
//   amountUSD: number;
// }
// export interface DonationForm {
//   copies: number;
//   totalNGN: number;
//   totalUSD: number;
//   name: string;
//   email: string;
//   phone?: string;
//   organization?: string;
//   location?: string;
// }

// src/types/index.ts
export interface Config {
    pricePerCopyNGN: number;
    pricePerCopyUSD: number;
    sessionPriceNGN: number;
    sessionPriceUSD: number;
    amazonLink: string;
    paystackPublicKey: string;
  }
  
  export interface Donation {
    copies: number;
    totalNGN: number;
    totalUSD: number;
    name: string;
    email: string;
    phone?: string;
    organization?: string;
    location?: string;
  }
  
  // export interface Presale {
  //   type: string;
  //   copies: number;
  //   totalNGN: number;
  // }
  export interface PaystackTransaction {
    reference: string;
    status?: string; // Optional: include if Paystack returns status

    // Add other properties as needed (e.g., status, amount)
  }
  
  export interface LocalPayload {
    firstname: string;
    email: string;
    phone: string;
    city: string;
    no_of_copies: number;
    reference: string;
  }
  
  export interface InternationalPayload {
    firstname: string;
    email: string;
    phone: string;
    country: string;
  }
  
  export interface Session {
    name: string;
    email: string;
    location: string;
    amountNGN: number;
    amountUSD: number;
  }