

3. SESSION SYSTEM (Booking, Realtime)
Function Name	Route	Description
createSession	POST /api/sessions	User offers or requests a session
getAvailableSessions	GET /api/sessions/available	Get upcoming unbooked sessions
bookSession	POST /api/sessions/:id/book	Book and spend credits
joinSession	GET /api/sessions/:id/join	Returns WebRTC token / link
rateSession	POST /api/sessions/:id/feedback	Rating + feedback for session

👥 Session Schema (MongoDB or SQL)
Field	Type
id	UUID / ObjectId
hostId	string (userId)
learnerId	string (nullable)
topic	string
description	string
startTime	timestamp
duration	number (minutes)
status	pending / booked / completed
meetingLink	string (optional)

✅ 4. FEEDBACK & MATCHING
Feature	Description
Skill Matching API	Recommend teachers based on learner’s interest
Feedback System	User-to-user rating + comment
Reputation Score	Avg rating + number of sessions completed


Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzgwNmJjNWEwOGZiZmM0OTE3MTFjNSIsInZlcnNpb24iOjAsImlhdCI6MTc1MjY5ODI4MSwiZXhwIjoxNzUyNjk5MTgxfQ.H86GvqKFOI3Ve5CPqBRHSUYum3K_rQSX_KC3ixjvrXc

We will now implement each part, starting with:

Redux store setup

Routing

Basic layout (Header, Footer, Loader)

Authentication pages

Dashboard and session pages

API integration with backend

Responsive and animated UI using Framer Motion

We’ll now build:

Layout.tsx (Header + Footer + Outlet).

Each Page (HomePage, LoginPage, etc.)

Components (Navbar, SessionCard, etc.)

Redux setup (store, slices for user/session).

Responsive UI with pleasant, Gen Z-friendly design.

Would you like me to continue with the layout components now (Layout.tsx, Navbar, and Footer) or with the Redux setup first?

Let’s build this beautifully one step at a time.