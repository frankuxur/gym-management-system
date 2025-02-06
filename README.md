
# Gym Management System

#### A Gym Management System built to simplify the management of membership and member data.

The app facilitates the convenient storage and accessibility of gym receipts online. The admin can manage memberships, track member status, register new members, update and delete accounts, send personalised messages, and publish holidays. Members can access their current membership status and receipt history, as well as an online supplement store and details of their prescribed diet regimen.

#### 🔗 Click the image below to watch a quick demo

[![Watch the video](https://i.vimeocdn.com/video/1962071931-deaad36775e988068233ee28090b0a5c03ce31514367cf83c9a008968243b3af-d?mw=800&mh=451&q=70)](https://vimeo.com/1039651743?share=copy#t=0)

<br>
<br>

## 🌐 Deployment

Hosted on Vercel, accessible as a Progressive Web App (PWA) on desktop and mobile.
- **Live**: [https://fitcon-gym.vercel.app](https://fitcon-gym.vercel.app)

<br>
<br>

## ✨ Key Features

- **User-Friendly Design**: Responsive layout for all devices

- **PWA Support**: App can be installed on mobile and desktop and used as a Progressive Web App

- **Firebase Integration**: App uses Firesbase for backend as a service

- **Dynamic UI**: React Router DOM for seamless navigation

<br>
<br>

## ⚛️ Tech Stack

- **Frontend**: React.js, React Router DOM, Redux Toolkit

- **Backend/Database**: Firebase Firestore

- **Styling**: CSS

- **Deployment**: Vercel

<br>
<br>

## 🚀 Installation

#### 1. Clone the repository:
   ```bash
   git clone https://github.com/frankuxur/gym-management-system.git
   ```

#### 2. Navigate to the project directory:
   ```bash
   cd gym-management-system
   ```

#### 3. Install dependencies:
   ```bash
   npm install
   ```

#### 4. Add Firebase Configuration:
   - Create a Firebase project on Firebase Console
   - Add Firebase configuration

#### 5. Start the development server:
   ```bash
   npm run dev
   ```

#### 6. Open the app:
   Navigate to http://localhost:(port number) to see the app in action

<br>
<br>

## ⚙️ Basic Workflow & Execution

#### 1. Admin Workflow:
   - Monitor all registered members and their membership status
   - Assign memberships (Core, Pro, Elite)
   - Register new members, update their details, or delete accounts
   - Publish holidays 
   - Send personalized notifications to members
   - Export membership receipts

#### 2. User Workflow:
   - View member information
   - View membership details
   - View receipts
   - View holidays
   - Receive notifications
   - Access to online supplement store and diet plans
   
<br>
<br>

## 🚧 Future Enhancements

#### 1. Supplement Store

The products in the store come from a JSON file. The store can be made fully functional by creating a collection for the store in Firestore, where the admin can create and store products in the store. A product's image can be stored in the Firebase Storage.

#### 2. Diets

The same applies to the diets section; the diets data also comes from a JSON file. The admin can have the facility to add, remove, or update diet information in the diets section.

#### 3. Personal Trainer

A feature to assign personal trainers to members throughout their membership period.