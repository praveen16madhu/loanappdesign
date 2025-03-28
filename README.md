﻿# Loan App Design
# JSON Schema Design for Loan Application

This project is a structured form for applying for a loan. It uses **React JSON Schema Form** (RJSF) along with **AJV8 validator** to validate and display the form fields. The form collects details like business information, loan details, and conditional fields for credit score, guarantors, and bank statements.

## Features

- **Business Details**:
  - Business Name
  - GSTIN (with format validation)
  - Directors (Name, PAN, Tags)
  
- **Loan Details**:
  - Credit Score
  - Loan Amount (with slider)
  - Guarantor Details (if Credit Score < 700)
  - Bank Statement (multiple file upload)


