import React, { useState } from "react";
import { Box, Card, Text, Heading, Button, Link, Input } from "theme-ui";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { checkout } from "../../api/checkout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const saveEmailsToLocalStorage = (emails) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("workEmails", JSON.stringify(emails));
  }
};

const Popup = ({ onClose, onSubmit, lineItems }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue | !lineItems) {
      return;
    }
    saveEmailsToLocalStorage(inputValue);
    const split_mail = inputValue.split(",").map((email) => email.trim());
    checkout(lineItems);
    onSubmit(inputValue);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        zIndex: "100",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 4,
          width: "50%",
          maxWidth: 600,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={inputValue}
            placeholder="Please enter your work emails to subscribe...."
            onChange={handleChange}
            mb={3}
          />
          <Elements stripe={stripePromise}>
            {/* Stripe payment components go here */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ flex: "1", marginRight: "8px" }}
              >
                Subscribe
              </Button>
              <Button
                variant="contained"
                onClick={onClose}
                sx={{ flex: "1", marginLeft: "8px" }}
              >
                Close
              </Button>
            </Box>
          </Elements>
        </form>
      </Box>
    </Box>
  );
};

export default Popup;
