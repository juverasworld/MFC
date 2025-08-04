/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import type { Donation , Config } from "../../types";
// import { Donation, Config } from "../../types";
// import "./styles/DonationOverlay.scss";

interface DonationOverlayProps {
  isOpen: boolean;
  closeOverlays: () => void;
}

const config: Config = {
  pricePerCopyNGN: 20000,
  pricePerCopyUSD: 15,
  sessionPriceNGN: 75000,
  sessionPriceUSD: 50,
  amazonLink: "https://www.amazon.com/your-book-link",
  paystackPublicKey: "YOUR_PAYSTACK_PUBLIC_KEY",
};

const DonationOverlay: React.FC<DonationOverlayProps> = ({
  isOpen,
  closeOverlays,
}) => {
  const [donation, setDonation] = useState<Donation>({
    copies: 0,
    totalNGN: 0,
    totalUSD: 0,
  });

  const calculateDonationTotal = (copies: number) => {
    try {
      if (copies < 1) {
        setDonation({ copies: 0, totalNGN: 0, totalUSD: 0 });
        return;
      }
      setDonation({
        copies,
        totalNGN: copies * config.pricePerCopyNGN,
        totalUSD: copies * config.pricePerCopyUSD,
      });
    } catch (error) {
      console.error("Error in calculateDonationTotal:", error);
      alert("Error calculating donation total. Please try again.");
    }
  };

  const proceedToDonationForm = () => {
    if (donation.copies < 1) {
      alert("Please select at least 1 copy to donate.");
      return;
    }
    closeOverlays();
    // Navigate to donation form overlay (handled in App.tsx)
  };

  return (
    <div className={`overlay ${isOpen ? "active" : ""}`} id="donationOverlay">
      <div className="overlay-content">
        <span className="close-btn" onClick={closeOverlays}>
          ×
        </span>
        <h2 className="overlay-title">Select Donation Copies</h2>
        <div className="copy-option">
          <div className="copy-option-title">A. 5-20 Copies</div>
          <div className="copy-option-reward">
            Receive Certificate of Appreciation
          </div>
        </div>
        <div className="copy-option">
          <div className="copy-option-title">B. 20-100 Copies</div>
          <div className="copy-option-reward">
            A + Website Appreciation Mention
          </div>
        </div>
        <div className="copy-option">
          <div className="copy-option-title">C. 100+ Copies</div>
          <div className="copy-option-reward">
            A + B + Your Brand/Name Printed on the Book Cover
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="donationCopyCount">
            Number of Copies
          </label>
          <input
            type="number"
            id="donationCopyCount"
            className="form-input"
            placeholder="Enter number of copies"
            min="1"
            step="1"
            onChange={(e) =>
              calculateDonationTotal(parseInt(e.target.value) || 0)
            }
            required
          />
        </div>
        <div className="price-container">
          <div className="current-price">
            ₦{donation.totalNGN.toLocaleString("en-NG")} / $
            {donation.totalUSD.toLocaleString("en-US")}
          </div>
        </div>
        <button className="confirm-btn" onClick={proceedToDonationForm}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default DonationOverlay;
