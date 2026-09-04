# Mutual Fund-Backed EMI E-Commerce Platform

A full-stack e-commerce application built for the **1Fi SDE1 Assignment**. Users can browse smartphones, select variants and mutual-fund-backed EMI plans, and submit orders.

## Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS
* **Backend:** Next.js API Route Handlers
* **Database:** MongoDB Atlas
* **ODM:** Mongoose
* **Deployment:** Vercel

## Features

* Dynamic product data from MongoDB
* 3+ products with multiple variants
* Product-specific URLs
* MRP, price and product images
* Multiple EMI plans
* EMI tenure, monthly amount, interest & cashback
* EMI plan selection
* Customer and mutual fund folio details
* Persistent order storage

## Database Schema

### Product

```text
Product
├── name
├── slug
├── tagline
├── image
└── variants[]
    ├── storage
    ├── price
    ├── mrp
    └── emiPlans[]
        ├── months
        ├── monthlyAmount
        ├── interest
        └── cashback
```

### Order

```text
Order
├── fullName
├── email
├── phone
├── mutualFundFolio
├── productName
├── storage
├── months
├── monthlyAmount
├── interest
└── cashback
```

## Setup

```bash
git clone <your-repository-url>
cd 1fi-assignment
npm install
```

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
```

Seed the database:

```bash
node seed.js
```

Run the application:

```bash
npm run dev
```

Open `http://localhost:3000`.

## API Endpoints

### Get All Products

```http
GET /api/products
```

### Get Product

```http
GET /api/products/[slug]
```

Example:

```http
GET /api/products/iphone-17-pro
```

### Create Order

```http
POST /api/orders
```

Example:

```json
{
  "fullName": "Ashutosh Gola",
  "email": "ashutosh@example.com",
  "phone": "9876543210",
  "mutualFundFolio": "MF-9823412",
  "productName": "iPhone 17 Pro",
  "storage": "256GB",
  "months": 48,
  "monthlyAmount": 3385,
  "interest": "10.5%",
  "cashback": 3000
}
```

Response:

```json
{
  "success": true,
  "orderId": "66da02e4e1a3b8d4c9e8a105"
}
```

### Health Check

```http
GET /api/health
```

```json
{
  "status": "ok",
  "database": "connected"
}
```

## Project Structure

```text
app/
├── api/
│   ├── products/
│   ├── orders/
│   └── health/
├── products/[slug]/
└── page.jsx

models/
├── Product.js
└── Order.js

lib/
└── mongodb.js

seed.js
README.md
```

## Links

* **GitHub:** https://github.com/Ashutoshgola/1fi-assignment

