"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import styles from './page.module.css';
import HomeClient from './HomeClient';

export default function Home() {
  const router = useRouter();
  const storyRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToStory = () => storyRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToFooter = () => footerRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
    <div dir="rtl" className={styles.maincontainer}>

      <HomeClient />
         </div>
    </>
  );
}
