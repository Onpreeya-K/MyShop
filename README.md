# React Native Project
 
## Contents
 
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)

## Development Environment

- **Code Editor**: [Visual Studio Code](https://code.visualstudio.com/)
- **Node.js**: v18+
- **React**: React Native v0.79.2
- **TypeScript**: v5.8.3
- **Expo SDK**: 53 (ใช้ `expo-router`)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Onpreeya-K/MyShop.git
    ```

2. Navigate to the project directory:
    ```bash
    cd MyShop
    ```

3. Install the dependencies:
    ```bash
    yarn install
    ```

## Running the Project

To run the project locally in development mode, follow these steps:
### 1. Install Expo CLI (if not already installed)
Before starting the development server, ensure that **Expo CLI** is installed on your machine. If you haven't installed it yet, run the following command:

```bash
yarn global add expo-cli
```

### 2. Start the Development Server

To start the development server, run the following command in your terminal:

```bash
yarn start
```

This will launch the **Expo Dev Tools** in your default web browser. From there, you can manage devices, scan the QR code, or open the app in an emulator.

If you're targeting the **web platform**, Expo will start a local web server.

🌐 You can access your app in the browser by visiting:

```
http://localhost:8081
```

Make sure no other application is using this port. If it is, Expo may choose a different port and show it in the terminal output.

### 3. Run the App on Your Mobile Device

You can run the app directly on your mobile device using the **Expo Go** app.

### 📱 For Android:

1. Install the **Expo Go** app from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent).
2. Run the following command in your project directory to start the development server:

   ```bash
   yarn start
   ```

3. A QR code will appear in your terminal or browser (Expo Dev Tools).
4. Open the **Expo Go** app on your Android device.
5. Tap **Scan QR Code** and scan the QR code displayed.

### 🍎 For iOS:

1. Install the **Expo Go** app from the [App Store](https://apps.apple.com/app/expo-go/id982107779).
2. Run the development server with:

   ```bash
   yarn start
   ```

3. Use the built-in **Camera** app on your iPhone to scan the QR code.
4. Tap the notification prompt to open the app in **Expo Go**.


## Project Structure
```
└── 📁MyShop
    └── 📁app
        └── _layout.tsx
        └── 📁(tabs)
            └── _layout.tsx
            └── cart.tsx
            └── favorite.tsx
            └── index.tsx
        └── +html.tsx
        └── +not-found.tsx
    └── 📁assets
        └── 📁fonts
            └── SpaceMono-Regular.ttf
        └── 📁images
            └── shopping-cart.png
            └── star.png
    └── 📁components
        └── 📁__tests__
            └── StyledText-test.js
        └── 📁card
            └── index.tsx
            └── ProductCard.tsx
        └── CartComponent.tsx
        └── FavoriteComponent.tsx
        └── ProductDeviceComponent.tsx
        └── ProductDeviceDetailComponent.tsx
        └── 📁rating-star
            └── index.tsx
            └── RatingStarComponent.tsx
        └── StyledText.tsx
        └── 📁swipeaction
            └── index.tsx
            └── RightSwipeActions.tsx
        └── Themed.tsx
        └── useClientOnlyValue.ts
        └── useClientOnlyValue.web.ts
        └── useColorScheme.ts
        └── useColorScheme.web.ts
    └── 📁constants
        └── Colors.ts
    └── 📁contexts
        └── AlertContext.tsx
        └── ProductContext.tsx
    └── 📁hooks
        └── useProduct.ts
    └── 📁services
        └── apiClient.ts
        └── productService.ts
    └── 📁types
        └── ProductType.ts
    └── 📁utils
        └── utils.tsx
    └── .gitignore
    └── .prettierrc
    └── app.json
    └── expo-env.d.ts
    └── package.json
    └── README.md
    └── tsconfig.json
    └── yarn.lock
```

## Dependencies
The key dependencies for this project are:

- **Navigation**:
  - `@react-navigation/native`: ^7.1.6
  - `@react-navigation/stack`: ^7.3.1
- **Swipeable**:
  - `react-native-gesture-handler`: "~2.24.0",
- **UI Libraries**:
  - **Mobile**: React Native Paper (^5.14.1)
- **Styling**: StyleSheet (React Native)
- **Icons**: `@expo/vector-icons` (^14.1.0)

You can find the full list of dependencies in the [package.json](./package.json) file.