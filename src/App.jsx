

import React, { useState } from "react";
import Form from "@rjsf/core";
import Ajv from "ajv";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

// Create an instance of AJV validator
const ajv = new Ajv({ allErrors: true });

// Define the schema and UI schema
const schema = {
  "type": "object",
  "properties": {
    "businessDetails": {
      "type": "object",
      "title": "Business Details",
      "properties": {
        "businessName": { "type": "string", "title": "Business Name" },
        "gstin": {
          "type": "string",
          "title": "GSTIN",
          "pattern": "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[0-9]{1}$",
          "errorMessage": "Invalid GSTIN format"
        },
        "directors": {
          "type": "array",
          "title": "Directors",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string", "title": "Name" },
              "panNumber": {
                "type": "string",
                "title": "PAN Number",
                "pattern": "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
                "errorMessage": "Invalid PAN format"
              },
              "tags": { "type": "array", "items": { "type": "string" } }
            }
          }
        }
      },
      "required": ["businessName", "gstin", "directors"]
    },
    "loanDetails": {
      "type": "object",
      "title": "Loan Details",
      "properties": {
        "creditScore": { "type": "number", "title": "Credit Score" },
        "requiredLoanAmount": {
          "type": "number",
          "title": "Required Loan Amount",
          "minimum": 50000,
          "maximum": 500000
        }
      },
      "required": ["creditScore", "requiredLoanAmount"]
    },
    "guarantors": {
      "type": "array",
      "title": "Guarantors",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string", "title": "Name" },
          "panNumber": {
            "type": "string",
            "title": "PAN Number",
            "pattern": "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
            "errorMessage": "Invalid PAN format"
          },
          "relationship": {
            "type": "string",
            "title": "Relationship with Applicant",
            "enum": ["Father", "Mother", "Brother", "Sister", "Spouse", "Other"]
          },
          "relation": { "type": "string", "title": "Relation" }
        },
        "required": ["name", "panNumber", "relationship"]
      },
      "minItems": 2
    },
    "bankStatements": {
      "type": "array",
      "title": "Bank Statements",
      "items": { "type": "string", "format": "uri", "title": "File URL" }
    }
  },
  "required": ["businessDetails", "loanDetails"]
};

const uiSchema = {
  "loanDetails": {
    "creditScore": {
      "ui:widget": "range"
    },
    "requiredLoanAmount": {
      "ui:widget": "range"
    }
  }
};

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = ({ formData }) => {
    alert("Form submitted!");
    console.log(formData);
  };

  return (
    <div>
      <h2>Loan Application Form</h2>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onSubmit={handleSubmit}
        validator={ajv}
      >
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default LoanApplicationForm;
