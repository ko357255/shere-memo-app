'use client'; // クライアント

import React, { useEffect, useState } from 'react';
import { db } from '@/src/lib/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

export default function Home() {
  const [text, setText] = useState('');

  // Firestore のドキュメント参照
  // コレクションID: doc, ドキュメントID: shared
  const docRef = doc(db, 'docs', 'shared');

  // リアルタイム読み込み
  useEffect(() => {
    // リアルタイム監視
    // onSnapshot(): Firestoreのリアルタイムリスナー
    const unsub = onSnapshot(docRef, (snapshot) => {
      // docRef に変化があると実行する
      const data = snapshot.data();
      if (data?.text !== text) {
        setText(data?.text ?? '');
      }
    });

    // クリーンアップ
    // コンポーネントが削除されるときに監視を解除する
    return () => unsub();
  }, [docRef, text]);

  // テキストを書き換えた場合の処理
  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    // Firestore へ書き込み
    await updateDoc(docRef, {
      text: newText,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>リアルタイム共同編集メモ</h1>
      <textarea
        value={text}
        onChange={handleChange}
        rows={20}
        style={{
          width: '100%',
          fontSize: '16px',
          border: '1px solid #ddd',
          padding: '10px',
        }}
      />
    </div>
  );
}
