# 📊 Rate My IS Professor

**Rate My IS Professor** is an anonymous and respectful web application designed for students in the **Information Science Department at Addis Ababa University (AAU)** to rate their instructors.  
It helps future students make informed decisions by learning from past classroom experiences — while promoting feedback-driven improvement and accountability.

> 🔒 All reviews are anonymous.  
> 🧠 All feedback must be professional and constructive.  
> 🚫 No insults. No mockery. Just real, helpful insights.

---

## 🎯 Purpose

This platform was built by students, for students — not to criticize instructors, but to:

- 📘 Help incoming students better understand their courses and instructors
- 🗣️ Empower students to voice their academic experiences
- 🔄 Support feedback loops that improve the department’s teaching quality

---

## 🌟 Features

- ✅ Anonymous instructor ratings
- ✅ Categories:
  - Teaching Clarity
  - Engagement & Interaction
  - Supportiveness
  - Professionalism
  - Overall Experience
- ✅ Clean, mobile-first UI
- ✅ Admin moderation for review quality control
- ✅ Instructor-wise aggregated scores
- ✅ Quick & simple review flow

---

## 🛠️ Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | React + Tailwind CSS |
| Backend      | Node.js + Express   |
| Database     | PostgreSQL          |
| Deployment   | Vercel (Frontend), Render (Backend) |

---

## 📦 Project Structure

rate-my-is-professor/
├── backend/
│ ├── routes/ # Express route handlers
│ ├── controllers/ # Logic for each API endpoint
│ ├── models/ # PostgreSQL models using pg or ORM
│ └── server.js # App entry point
├── client/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.jsx
├── .env
├── .gitignore
├── README.md
└── package.json

yaml
Copy
Edit

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/rate-my-is-professor.git
cd rate-my-is-professor
2. Install Backend Dependencies
bash
Copy
Edit
cd backend
npm install
3. Configure Environment Variables
Create a .env file in /backend:

env
Copy
Edit
PORT=5000
DATABASE_URL=your_postgresql_connection_string
4. Run the Backend Server
bash
Copy
Edit
npm run dev
5. Setup Frontend (Optional Vite-based React)
bash
Copy
Edit
cd ../client
npm install
npm run dev
🔒 Rules & Guidelines
✅ Keep reviews respectful, constructive, and based on real experiences

⛔ No personal attacks, insults, or trolling

📩 All reviews go through a moderation layer

🚨 Disrespectful content will be flagged and removed

🤝 Contributing
We welcome contributors! To help improve this project:

Fork the repository

Create a new feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add feature')

Push to the branch (git push origin feature-name)

Open a Pull Request

📜 License
This project is licensed under the MIT License.
Free to use for educational, academic, or nonprofit purposes.

🙏 Acknowledgements
The Information Science students of Addis Ababa University

Open-source contributors and mentors

Inspired by the need for transparent, peer-driven learning improvement

💬 Let your experience shape the future — rate respectfully, inform wisely.

vbnet
Copy
Edit

Let me know if you'd like to add a [`.env.example` file](f), [deployment instructions to Vercel/Render](f), or [a badge section with GitHub shields](f)!








