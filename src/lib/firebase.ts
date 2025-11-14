import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// WebアプリのFirebase設定
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // APIキー（公開鍵）
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, // ログインのためのドメイン
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // プロジェクト名
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // Storageの場所
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // FCM（通知）のID
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, // FirebaseアプリのID
  // measurementId: 'G-3FSRXRPJ93', // Firebase Analytics(分析)のID
};

// 初期化処理
// const app = initializeApp(firebaseConfig); // ホットリロードではバグる

// クライアントサイドの場合のDB取得 (IOS/Android)
// const analytics = getAnalytics(app);

// 初期化処理（重複防止)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// サーバーサイドの場合のDB取得
export const db = getFirestore(app);
