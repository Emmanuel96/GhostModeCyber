import { Box, Card, Text, Heading, Button, Link, Input } from "theme-ui";
import React, { useState, useEffect } from "react";
import List from "./list";
import Popup from "./popup";



export default function PriceCard({
  data: {
    header,
    name,
    description,
    priceWithUnit,
    buttonText = "Start Free Trial",
    anotherOption,
    points,
    price_No,
    price_link,
  },
}) {
  const lineItems = [
    // { price: "price_1ABCD", quantity: 2 },
    {
      price: price_No,
      quantity: 1,
    },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [submittedValue, setSubmittedValue] = useState("");

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (value) => {
    setSubmittedValue(value);
    closePopup();
  };

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const storedEmails = JSON.parse(localStorage.getItem("workEmails"));
      if (storedEmails) {
        setSubmittedValue(submittedValue);
         const response = await fetch("/api/sucess_mail", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({"workEmails":storedEmails}),
         });

         if (response.ok) {
           localStorage.removeItem("workEmails");
         } else {
           return
         }
      }
    }
  }, []);
  return (
    <Card
      className={header ? "package__card active" : "package__card"}
      sx={styles.pricingBox}
    >
      {header && <Text sx={styles.header}>{header}</Text>}
      <Box>
        <Box className="package__header" sx={styles.pricingHeader}>
          <Heading className="package__name" variant="title">
            {name}
          </Heading>
          <Text as="p">{description}</Text>
        </Box>
        <List items={points} childStyle={styles.listItem} />
        <Text className="package__price" sx={styles.price}>
          {priceWithUnit}
          <span>/Monthly</span>
        </Text>
        <Box sx={styles.buttonGroup}>
          <Button variant="primary" aria-label={buttonText}>
            <Link
              sx={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={openPopup}
            >
              {buttonText}
            </Link>
          </Button>
          {showPopup && <Popup onClose={closePopup} onSubmit={handleSubmit} lineItems={lineItems} />}
        </Box>
      </Box>
    </Card>
  );
}
const saveEmailsToLocalStorage = (emails) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("workEmails", JSON.stringify(emails));
  }
};

const styles = {
  pricingBox: {
    borderRadius: 20,
    position: "relative",
    transition: "all 0.3s",
    p: ["35px 25px", null, null, "40px"],
    width: ["100%", "75%", "100%"],
    mb: "40px",
    mt: "40px",
    mx: [0, "auto", 0],
    "&:before": {
      position: "absolute",
      content: "''",
      width: "100%",
      top: 0,
      left: 0,
      height: "100%",
      border: "1px solid rgba(38, 78, 118, 0.1)",
      borderRadius: "inherit",
      transition: "all 0.3s",
      zIndex: -1,
    },
    "&:hover": {
      boxShadow: "0px 4px 25px rgba(38, 78, 118, 0.1) !important",
      "&:before": {
        opacity: 0,
      },
    },
  },
  header: {
    height: ["28px", null, null, "32px"],
    backgroundColor: "yellow",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: 1,
    lineHeight: 1.2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    position: "absolute",
    top: "-17px",
    letterSpacing: "-.14px",
    px: "12px",
  },
  pricingHeader: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: ["30px", null, null, null, "40px"],
    p: {
      fontSize: [1, 2],
      color: "text",
      lineHeight: "heading",
    },
    ".package__name": {
      marginBottom: [1, null, 2],
    },
  },
  price: {
    fontWeight: 500,
    fontSize: [4, null, 5, null, "30px"],
    lineHeight: 1,
    letterSpacing: "-0.55px",
    color: "text",
    marginBottom: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pt: [4, 6],
    "> span": {
      position: "relative",
      pl: "3px",
      display: "inline-block",
      fontSize: [1, 2],
      fontWeight: "normal",
    },
  },
  listItem: {
    fontFamily: "DM Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: [1, 2],
    lineHeight: [1.75, 1.6],
    mb: 3,
    alignItems: "flex-start",
    color: "text",
    "&.closed": {
      opacity: 0.55,
      button: {
        color: "#788FB5",
      },
    },
  },
  buttonGroup: {
    textAlign: "center",
    mt: ["30px", null, null, null, "35px"],
    ".free__trail": {
      color: "secondary",
      width: "100%",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: ["14px", 1],
      p: "20px 0 0",
    },
  },
};
