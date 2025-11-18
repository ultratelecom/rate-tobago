# 🏝️ Tobago Visitor Experience Survey

A beautiful, modern survey platform built for the Division of Tourism, Culture, Antiquities and Transportation to collect valuable feedback from visitors to Tobago - **The Greatest Little Island on the Planet!**

## ✨ Features

- **Beautiful UI/UX**: Modern, responsive design with Tobago-themed colors and imagery
- **Multi-step Form**: Easy-to-navigate 6-step survey process with progress tracking
- **Real-time Validation**: Client-side form validation using Zod
- **PostgreSQL Database**: Secure storage using Neon serverless PostgreSQL
- **Type-safe**: Built with TypeScript and Prisma ORM
- **Smooth Animations**: Delightful user experience with Framer Motion
- **Mobile Responsive**: Works seamlessly on all devices

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 📋 Survey Sections

1. **Demographics**: Group size, cruise vessel, country, gender, age
2. **Visit Details**: First visit, spending, port welcome satisfaction
3. **Attractions**: Tourist attractions visited with ratings
4. **Experience**: Customer service, overall experience, highlights
5. **Transportation**: Guided tours, transportation ratings, return visit likelihood
6. **Final Feedback**: Additional comments and promotional email opt-in

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon account recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ultratelecom/rate-tobago.git
cd rate-tobago
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="your_neon_database_url"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Database Schema

### Tables

- **survey_responses**: Main table storing all survey data
- **tourist_attractions**: Reference table for Tobago attractions
- **attraction_visits**: Junction table linking responses to attractions with ratings

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables:
   - `DATABASE_URL`
4. Deploy!

The application will automatically:
- Build the Next.js app
- Generate Prisma Client
- Deploy to production

## 📊 Viewing Survey Results

Survey responses are stored in the Neon database. You can:
1. Use Prisma Studio: `npx prisma studio`
2. Query directly via the Neon console
3. Use the API endpoint: `GET /api/survey` (returns all responses)

## 🎨 Customization

### Colors

Tobago brand colors are defined in `tailwind.config.ts`:
- `tobago-blue`: #0A4D68
- `tobago-teal`: #088395
- `tobago-sand`: #E8DCC4
- `tobago-coral`: #FF6B6B
- `tobago-green`: #2D5016
- `tobago-sky`: #87CEEB

### Attractions

Update the list of tourist attractions in `lib/attractions.ts`.

## 📄 License

© 2025 Division of Tourism, Culture, Antiquities and Transportation, Tobago House of Assembly. All rights reserved.

## 🤝 Contributing

This is a government project. For issues or suggestions, please contact the Division of Tourism, Culture, Antiquities and Transportation.

## 📞 Support

For technical support, please contact the development team.

---

**Built with ❤️ for Tobago - Beyond Ordinary**

