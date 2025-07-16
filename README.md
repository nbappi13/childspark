
# 👨‍👩‍👧 SmartParentsHC

SmartParentsHC (formerly ChildSpark) is a full-stack parenting support and learning platform built with modern web technologies. It offers expert-curated courses tailored for parents, children, and both together, providing valuable resources to help families grow and thrive. The platform includes a smart AI assistant powered by Groq and seamless Stripe payment integration to enhance user experience.

---

## 🚀 Features

- 🎓 **Course Platform**: Browse and purchase parenting courses
- 🔷 **TypeScript**: Fully typed with TypeScript for better developer experience and maintainability
- 🔐 **Authentication**: Google login + secure sessions using NextAuth
- 💳 **Stripe Integration**: Seamless test-mode payment system
- 🤖 **SmartAI Assistant**: Interactive AI chatbot powered by Groq's Llama models - can answer any question like a real AI assistant
- 📄 **User Dashboard**: View user's own purchases in profile, in dashboard home page show user's logged in email
- 🛠️ **Admin Panel**: View users, purchases, and access a protected admin panel with course update/delete features
- 📱 **Responsive UI**: Fully mobile-friendly layout
- ⚡ **Optimized Performance**: Server components + hybrid API routes

---

## 🛠 Tech Stack

| Layer         | Tech Used                                                                 |
|---------------|---------------------------------------------------------------------------|
| Frontend      | [Next.js 14 App Router](https://nextjs.org/docs) + React 18 + **TypeScript**               |
| Styling       | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), Lucide |
| Auth          | [NextAuth.js](https://next-auth.js.org/) with Google OAuth + MongoDB Adapter |
| Database      | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)                      |
| Payments      | [Stripe](https://stripe.com/) (Test Mode)                                 |
| State Mgmt    | [Zustand](https://github.com/pmndrs/zustand) for SmartAI global toggle    |
| AI Assistant  | [Groq](https://groq.com/) with [AI SDK](https://sdk.vercel.ai/) - Llama 3.1 8B Instant model for intelligent responses   |
| Admin Tools   | Role-based access to view users, monitor purchases, and manage (update/delete) courses.        |

---

## 🧪 Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/nbappi13/childspark.git
cd childspark
```

2. **Install dependencies:**


```shellscript
npm install
# or
yarn install
```

3. **Add `.env` file:**


```plaintext
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
GROQ_API_KEY=your_groq_api_key
```

4. **Run locally:**


```shellscript
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000`

---

## SmartAI Logic

- **Powered by Groq**: Uses Groq's lightning-fast Llama 3.1 8B Instant model
- **General-Purpose AI**: Can answer questions on any topic - technology, science, history, business, health, creativity, and more
- **Intelligent Responses**: Provides human-like, contextual answers using advanced language models
- **Fallback System**: Includes backup responses for high availability
- **Features**:

- 🚀 Lightning-fast responses (sub-second)
- 🧠 Real AI capabilities like ChatGPT
- 💬 Natural conversation flow
- 🔄 Auto-popup on scroll with toggle controls
- 📱 Mobile-optimized chat interface



- **Free Tier**: 30,000 requests/month with no credit card required


---

## Stripe Testing

Use Stripe's test cards for demo purchases:

- Card: `4242 4242 4242 4242`
- Exp: any future date
- CVC: any 3 digits


---

## Admin Access

By default, all users are role: user. You can manually update roles in the database (via MongoDB Atlas) to grant admin:

```json
{
  "email": "admin@example.com",
  "role": "admin"
}
```

**Admin Capabilities:**

- Manage users: view, update roles, and delete accounts
- Manage courses: create, update, and delete course content
- View and manage all purchase orders
- Access exclusive admin dashboard and tools with role-based protection


---

## Todo / Future Plan

- 🎤 Voice input for SmartAI
- 📧 Email confirmation for purchases
- 📱 PWA support
- 📂 Certificate download per course
- 🧠 Conversation memory for SmartAI
- 🔄 Multiple AI model support


---

## License

MIT — free to use, adapt, and improve.

---

## Credits

Built with ❤️ using:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Groq](https://groq.com/) - Lightning-fast AI inference
- [AI SDK](https://sdk.vercel.ai/) - AI integration framework
- [Stripe](https://stripe.com/)
- [MongoDB](https://mongodb.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)


