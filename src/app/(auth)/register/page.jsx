"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./register.module.css";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const auth = useAuth?.() || null;
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("مطلوب"),
      lastName: Yup.string().required("مطلوب"),
      email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
      password: Yup.string().min(6, "على الأقل 6 أحرف").required("مطلوب"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة")
        .required("مطلوب"),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        await new Promise((r) => setTimeout(r, 700));

        const token = "mocktoken-" + Math.random().toString(36).slice(2);
        const user = {
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          profileComplete: false,
        };

        if (auth && typeof auth.setAuth === "function") {
          auth.setAuth({ token, user });
        } else {
          localStorage.setItem("laqtaha_token", token);
          localStorage.setItem("laqtaha_user", JSON.stringify(user));
        }

        router.replace("/onboarding");
      } catch (err) {
        console.error("register error", err);
        alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.registerWrapper}>
      <div className="row align-items-center min-vh-100 g-3 g-md-4">
        {/* Left visual */}
        <div className="col-12 col-md-6 d-flex justify-content-center order-1 order-md-2 LeftCardWrapper">
          <div className={styles.leftCard}>
            <div className={styles.imageText}>
              <h1>
                <img src="/images/logo.png" alt="Logo" width="100" height="100" />
                
              </h1>
                <h2>مرحبًا بك في EGYGO.</h2>
              <p>  دليلك المحلي لاكتشاف مصر من منظور أهلها</p>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="col-12 col-md-6 d-flex justify-content-center order-2 order-md-1">
          <form
            className={styles.form}
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <h2 className={`${styles.heading} text-center`}>
              قم بإنشاء حسابك المجاني الآن
            </h2>
            <p className={`${styles.hint} text-center`}>
              او قم بتسجيل حسابك إن كنت تمتلك واحداً
            </p>

            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <input
                  name="firstName"
                  placeholder="الاسم الأول"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.input} ${
                    formik.touched.firstName && formik.errors.firstName
                      ? styles.invalid
                      : ""
                  }`}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className={styles.err}>{formik.errors.firstName}</div>
                )}
              </div>

              <div className="col-12 col-md-6 mb-3">
                <input
                  name="lastName"
                  placeholder="اسم العائلة"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.input} ${
                    formik.touched.lastName && formik.errors.lastName
                      ? styles.invalid
                      : ""
                  }`}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className={styles.err}>{formik.errors.lastName}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <input
                name="email"
                type="email"
                placeholder="البريد"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${styles.input} ${
                  formik.touched.email && formik.errors.email
                    ? styles.invalid
                    : ""
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
                  formik.touched.password && formik.errors.password
                    ? styles.invalid
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.err}>{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                name="confirmPassword"
                type="password"
                placeholder="تأكيد كلمة المرور"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${styles.input} ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? styles.invalid
                    : ""
                }`}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className={styles.err}>
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={submitting}
            >
              {submitting ? "جاري الإنشاء..." : "إنشاء الحساب"}
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => router.push("/login")}
            >
              تسجيل الدخول
            </button>

            <p className={`${styles.terms} text-center`}>
              بالضغط على إنشاء الحساب فأنت توافق تلقائياً على 
               <span className={styles.highlight}> سياسة الخصوصية </span>
  و
  <span className={styles.highlight}> شروط الاستخدام </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
