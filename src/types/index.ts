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
  
  export interface Presale {
    type: string;
    copies: number;
    totalNGN: number;
  }
  
  export interface Session {
    name: string;
    email: string;
    location: string;
    amountNGN: number;
    amountUSD: number;
  }