// // src/hooks/usePaystack.ts
// import { useCallback } from "react";
// import PaystackPop from "@paystack/inline-js";
// import type { Donation, Config } from "../types";

// export const usePaystack = (config: Config) => {
//   const initiatePaystackPayment = useCallback(
//     async (donation: Donation, currency: "NGN" | "USD") => {
//       return new Promise((resolve, reject) => {
//         const paystack = new PaystackPop();
//         paystack.newTransaction({
//           key: config.paystackPublicKey,
//           email: donation.email,
//           amount:
//             currency === "NGN"
//               ? donation.totalNGN * 100
//               : donation.totalUSD * 100, // Paystack expects amount in kobo/cents
//           currency,
//           reference: `ref_${Math.floor(
//             Math.random() * 1000000000
//           )}_${Date.now()}`,
//           onSuccess: (transaction: unknown) => {
//             resolve(transaction);
//           },
//           onCancel: () => {
//             reject(new Error("Payment was cancelled by the user."));
//           },
//           onError: (error) => {
//             reject(error);
//           },
//         });
//       });
//     },
//     [config.paystackPublicKey]
//   );

//   return { initiatePaystackPayment };
// };
import { useCallback } from "react";
import PaystackPop from "@paystack/inline-js";
import type { Config, Donation, PaystackTransaction } from "../types";

export const usePaystack = (config: Config) => {
  const initiatePaystackPayment = useCallback(
    async (
      donation: Donation,
      currency: "NGN" | "USD"
    ): Promise<PaystackTransaction> => {
      return new Promise((resolve, reject) => {
        const paystack = new PaystackPop();
        paystack.newTransaction({
          key: config.paystackPublicKey,
          email: donation.email,
          amount:
            currency === "NGN"
              ? donation.totalNGN * 100
              : donation.totalUSD * 100, // Paystack expects amount in kobo/cents
          currency,
          reference: `ref_${Math.floor(
            Math.random() * 1000000000
          )}_${Date.now()}`,
          onSuccess: (transaction: PaystackTransaction) => {
            resolve(transaction);
          },
          onCancel: () => {
            reject(new Error("Payment was cancelled by the user."));
          },
          onError: (error) => {
            reject(error);
          },
        });
      });
    },
    [config.paystackPublicKey]
  );

  return { initiatePaystackPayment };
};