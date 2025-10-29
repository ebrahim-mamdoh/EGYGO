"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./login.module.css";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
      password: Yup.string().min(6, "على الأقل 6 أحرف").required("مطلوب"),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        // mock delay
        await new Promise((r) => setTimeout(r, 700));

        // mock token/user
        const token = "mocktoken-" + Math.random().toString(36).slice(2);
        const user = {
          name: values.email.split("@")[0] || "User",
          email: values.email,
          profileComplete: true, // ✅ login → المستخدم جاهز يروح على الشات
        };

        if (auth?.setAuth) {
          auth.setAuth({ token, user });
        } else {
          localStorage.setItem("laqtaha_token", token);
          localStorage.setItem("laqtaha_user", JSON.stringify(user));
        }

        router.replace("/chat");
      } catch (err) {
        console.error("login error", err);
        alert("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Mock social handlers
  const handleGoogleSignIn = () => {
    alert("Google sign-in (mock) — ربط الـ API لاحقاً");
  };
 
  return (
    <div className={styles.registerWrapper}>
      <div className="row align-items-center min-vh-100 g-3 g-md-4">

        
        {/* Right form */}
        <div className=" col-md-6 d-flex justify-content-center order-2 order-md-2">
          <div className={styles.formCard}>
            <h2 className={`${styles.heading} text-center`}>تسجيل الدخول</h2>
            <p className={`${styles.hint} text-center`}>من فضلك ادخل بيانات حسابك</p>

            <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
              <div className="mb-3">
                <input
                  name="email"
                  type="email"
                  placeholder="البريد"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.input} ${
                    formik.touched.email && formik.errors.email ? styles.invalid : ""
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className={styles.err}>{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <input
                  name="password"
                  type="password"
                  placeholder="كلمة المرور"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.input} ${
                    formik.touched.password && formik.errors.password ? styles.invalid : ""
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className={styles.err}>{formik.errors.password}</div>
                )}
              </div>

              <button type="submit" className={styles.primaryBtn} disabled={submitting}>
                {submitting ? "جاري الدخول..." : "دخول"}
              </button>

              <div className={styles.socialRow}>
                <button
                  type="button"
                  className={styles.socialBtn + " " + styles.google}
                  onClick={handleGoogleSignIn}
                >
                  <Image src="/images/google-logo.svg" alt="Google" width={18} height={18} />
                  <span>تسجيل عبر Google</span>
                </button>
              </div>

              <p className={`${styles.hint} text-center`} style={{ marginTop: 8 }}>
                ليس لديك حساب؟{" "}
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={() => router.push("/register")}
                >
                  سجل الآن
                </button>
              </p>  
              <p className={`${styles.terms} text-center`}>
                من خلال تسجيل الدخول فأنت توافق تلقائياً على
                <span className={styles.highlight}> سياسة الخصوصية </span> و
                <span className={styles.highlight}> شروط الاستخدام </span>
              </p>

            </form>
          </div>
        </div>
        {/* Left visual (الصورة) */}
        <div className=" col-md-6 d-flex justify-content-center order-1 order-md-1">
          <div className={styles.leftCard}>
            <div className={styles.imageText}>
              <h1>
                <img src="/images/logo.png" alt="Logo" width="24" height="24" />
              </h1>
              <h2>مرحبا بكم في لقطها</h2>
              <p>اطلب مني اللي تريده وخليني ألقطها عشانك</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
