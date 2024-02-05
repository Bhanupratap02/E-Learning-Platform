
## E-Learning Platform 
> This is E-Learning Platform built with  Next.js 13, React, Stripe, Mux, Prisma, Tailwind, Shadcn UI,MySQL
 This Learning Management System serves as a centralized hub for educational content, enabling easy access, interaction, and tracking of courses and materials.
First, run the development server:
<img width="1552" alt="Screenshot 2024-02-04 at 3 28 15 PM" src="https://github.com/Bhanupratap02/E-Learning-Platform/assets/100342013/c7ad4f73-d085-4ae1-b759-2096a2519484">
<img width="1552" alt="Screenshot 2024-02-04 at 3 34 05 PM" src="https://github.com/Bhanupratap02/E-Learning-Platform/assets/100342013/f0d0b03f-f304-46ba-a2b9-d07bcfb98485">
<img width="1552" alt="Screenshot 2024-02-04 at 3 33 43 PM" src="https://github.com/Bhanupratap02/E-Learning-Platform/assets/100342013/6f4c192d-e8da-4bec-9986-c57fe9a16507">

### Key Features:

+ Browse & Filter Courses
+ Purchase Courses using Stripe
+ Mark Chapters as Completed or Uncompleted
+ Progress Calculation of each Course
+ Student Dashboard
+ Teacher mode
+ Create new Courses
+ Create new Chapters
+ Easily reorder chapter position with drag n’ drop
+ Upload thumbnails, attachments and videos using UploadThing
+ Video processing using Mux
+ HLS Video player using Mux
+ Rich text editor for chapter description
+ Authentication using Clerk
+ ORM using Prisma
+ MySQL database 

### Prerequisites
Node version 18.x.x

### Install Dependencies
```bash
npm install
```
### Setup .env file
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

STRIPE_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_TEACHER_ID=
```
### Setup Prisma
```
npx prisma generate
npx prisma db push

```
### Run

```
npm run dev
```


