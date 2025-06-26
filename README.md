# SkinDiseaseClassificationApp
Detect skin diseases from camera images using an ML model.

An end-to-end mobile application to detect skin diseases from user-captured images using a Convolutional Neural Network (CNN) hosted on a cloud server. The app allows users to take or upload skin images, which are then sent to a FastAPI backend for classification. Predictions are returned in real-time and displayed seamlessly on the app interface.

🔍 Key Features
React Native Frontend: Built with Expo, enabling smooth cross-platform performance and native camera access.

Backend API with FastAPI: Efficient Python-based backend serving the trained CNN model for skin disease classification.

CNN Model Integration: A custom-trained model capable of classifying 10 types of skin diseases with notable accuracy.

Cloud-hosted Inference: Offloaded image processing to a server to reduce device-side load and improve performance.

Minimalist UI/UX: Designed for simplicity and accessibility with Figma-backed prototyping.

🛠️ Tech Stack
Frontend: React Native (Expo), JavaScript

Backend: FastAPI, Python, Uvicorn

Model: CNN (trained on 1000+ dermatological images)

Deployment: Render (or similar PaaS)

Design Tools: Figma

🚀 How It Works
1. User opens the app and uploads or captures an image.

2. Image is sent to the FastAPI server via a POST request.

3. The CNN model predicts the disease class.

4. The prediction is displayed to the user instantly.
