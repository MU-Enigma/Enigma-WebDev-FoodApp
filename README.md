# 🍕 Food Order React App

A modern food ordering application built with React and Express.js. This project demonstrates full-stack development with real-time data fetching, form handling, and order management.

## 📺 Target UI Demo

**Watch this video to see exactly what you need to build:**

**Option 1: MP4 (Recommended - Better GitHub compatibility):**  
[demo-video.mp4](./demo-video.mp4)

**Option 2: Original MOV file:**  
[Screen Recording 2025-09-30 at 14.19.44.mov](./Screen%20Recording%202025-09-30%20at%2014.19.44.mov)

> ⚠️ **Important**: Your final implementation should match the UI and functionality shown in this video exactly. Use this as your reference for:
> - Visual design and layout
> - User interactions and flow
> - Features and functionality
> - Overall user experience
>
> 💡 **Tip**: The MP4 version (9.6MB) is much smaller than the MOV (47MB) and should display better on GitHub.

## 🛠️ Prerequisites

Before starting this project, you should be comfortable with:

### React Concepts:
- **useState** - Managing component state
- **useEffect** - Side effects and lifecycle methods  
- **Context API** - Global state management
- **Forms & Inputs** - Controlled components and form validation
- **Component composition** - Building reusable UI components

### Additional Skills:
- Basic JavaScript (ES6+)
- HTML/CSS fundamentals
- HTTP requests and REST APIs

## 🏗️ Project Structure

```
01-starting-project/
├── backend/                 # Express.js API server
│   ├── app.js              # Main server file
│   ├── package.json        # Backend dependencies
│   └── data/               # JSON data files (auto-generated)
├── src/                    # React frontend
│   ├── App.jsx            # Main React component (starter)
│   ├── main.jsx           # React entry point
│   └── index.css          # Pre-built styles (provided)
├── public/                 # Static assets
│   └── logo.jpg           # App logo
└── package.json           # Frontend dependencies
```

## 🚀 Getting Started

### 1. Install Dependencies

**Frontend:**
```bash
npm install
# or
pnpm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Start the Development Servers

**Terminal 1 - Backend API:**
```bash
cd backend
npm start
```
Server runs on: `http://localhost:3000`

**Terminal 2 - React Frontend:**
```bash
npm run dev
```
App runs on: `http://localhost:5173`

## 🎯 Features to Implement

**Scope:** You do not have to rebuild the entire app. Implement any feature(s) from the video. If you can replicate the whole project, that's great — but partial feature implementations are welcome.

**🎥 WATCH THE VIDEO FIRST!** Your implementation should align with the UI/UX shown in the demo video above.

Based on the demo video, implement the following features:

### Core Features:
- [ ] **Meal Display** - Fetch and display available meals from API
- [ ] **Shopping Cart** - Add/remove items, quantity management
- [ ] **Order Form** - Customer information with validation
- [ ] **Order Submission** - POST order data to backend
- [ ] **Loading States** - Show loading indicators during API calls
- [ ] **Error Handling** - Display user-friendly error messages

### Advanced Features:
- [ ] **Cart Persistence** - Maintain cart state across page reloads
- [ ] **Order Confirmation** - Success message after order placement
- [ ] **Responsive Design** - Mobile-friendly interface
- [ ] **Form Validation** - Real-time input validation
- [ ] **Price Calculations** - Dynamic total calculation

## 🌐 API Endpoints

The backend provides these endpoints:

### GET `/meals`
Returns available meals with pricing and descriptions.

**Response:**
```json
[
  {
    "id": "m1",
    "name": "Mac & Cheese",
    "price": "8.99",
    "description": "Creamy cheddar cheese mixed with perfectly cooked macaroni...",
    "image": "images/mac-and-cheese.jpg"
  }
]
```

### POST `/orders`
Submit a new food order.

**Request Body:**
```json
{
  "order": {
    "items": [
      {
        "id": "m1",
        "name": "Mac & Cheese",
        "price": "8.99",
        "quantity": 2
      }
    ],
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "street": "123 Main St",
      "postal-code": "12345",
      "city": "Anytown"
    }
  }
}
```

## 🎨 Styling

CSS styles are **already provided** in `src/index.css`. Focus on:
- Using existing CSS classes
- Maintaining the provided design system
- Adding responsive touches if needed

## 🧭 Working with Git and avoiding conflicts

This repository may receive updates while you work. To minimize conflicts:

- Fork this repo and create a feature branch for your work.
- Regularly sync with upstream main:
  - git remote add upstream https://github.com/Aneeshie/Enigma-WebDev-FoodApp.git
  - git fetch upstream
  - git rebase upstream/main
- Resolve conflicts locally, run the app, and re-test.
- If you rebased, push with --force-with-lease to your forked branch.
- Keep PRs focused and small where possible.
- Check git status often before committing.

Once your PR is opened, the maintainer will review and merge or request changes.

## 📝 Implementation Tips

### Data Fetching:
```javascript
// Example: Fetching meals
useEffect(() => {
  async function fetchMeals() {
    const response = await fetch('http://localhost:3000/meals');
    const meals = await response.json();
    setMeals(meals);
  }
  fetchMeals();
}, []);
```

### Context Setup:
```javascript
// Example: Cart context
const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {}
});
```

### Form Handling:
```javascript
// Example: Order form
const [customer, setCustomer] = useState({
  name: '',
  email: '',
  street: '',
  'postal-code': '',
  city: ''
});
```

## 🤝 Contributing

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Implement** features from the demo video
4. **Commit** your changes: `git commit -m 'Add amazing feature'`
5. **Push** to the branch: `git push origin feature/amazing-feature`
6. **Open** a Pull Request

### What to Include in Your PR:
- ✅ Working implementation of demonstrated features
- ✅ Proper error handling and loading states
- ✅ Clean, readable code with comments
- ✅ Testing your implementation thoroughly
- ✅ Screenshots or GIF of your working app

## ⚡ Quick Start Checklist

- [ ] Clone the repository
- [ ] Install frontend and backend dependencies
- [ ] Start both servers (backend on :3000, frontend on :5173)
- [ ] Implement meal fetching and display
- [ ] Build the shopping cart functionality
- [ ] Create the order form
- [ ] Test the complete order flow
- [ ] Handle edge cases and errors

## 🔍 What You'll Learn

- Making HTTP requests in React
- Managing complex application state
- Form validation and submission
- Error handling and user feedback
- Component composition and reusability
- Context API for global state management

## 🎓 Assessment Criteria

Your implementation will be evaluated on:
- **Functionality** - Does it work as shown in the demo?
- **Code Quality** - Is it clean, readable, and well-structured?
- **Error Handling** - Are edge cases handled gracefully?
- **User Experience** - Is it intuitive and responsive?
- **React Patterns** - Proper use of hooks, context, and components

---

**Happy Coding! 🚀**

*Remember: The goal is to recreate the functionality shown in the demo video. Focus on core features first, then enhance with additional improvements.*