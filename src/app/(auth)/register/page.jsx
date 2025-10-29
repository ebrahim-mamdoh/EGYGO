"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import styles from "./register.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const auth = useAuth?.() || null;
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const formik = useFormik({
    initialValues: {
      Name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      Name: Yup.string().required("مطلوب"),
      email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
      password: Yup.string().min(6, "على الأقل 6 أحرف").required("مطلوب"),
    }),

  onSubmit: async (values) => {
  console.log("📨 FORM SUBMITTED", values); // ✅ أضف هذا

  setSubmitting(true);
  setServerError(null);

  try {
    const registerRes = await axios.post("http://localhost:4000/api/auth/register", {
      name: `${values.Name} ${values.lastName}`,
      email: values.email,
      password: values.password,
    });

    console.log("REGISTER RESPONSE:", registerRes.data); // ✅ تأكيد نجاح الطلب

        // لو التسجيل نجح
if (registerRes.data?.success) {
  const userId = registerRes.data?.user?._id;

  if (!userId) {
    console.warn("⚠️ لم يتم إرجاع userId من السيرفر، سيتم تجاوز خطوة OTP مؤقتًا.");
  } else {
    // 2️⃣ إرسال OTP للمستخدم
    await axios.post("http://localhost:4000/api/auth/send-verify-otp", { userId });

    // 3️⃣ حفظ الـ userId محليًا لصفحة التحقق
    localStorage.setItem("pendingUserId", userId);
  }

  alert("✅ تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
  router.replace("/login");
} else {
  throw new Error(registerRes.data?.message || "فشل في إنشاء الحساب");
}

      } catch (err) {
        console.error("REGISTER ERROR:", err);
        setServerError(
          err.response?.data?.message ||
            err.message ||
            "حدث خطأ أثناء التسجيل"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.registerWrapper}>
      <div className="row align-items-center min-vh-100 g-3 g-md-4">
        {/* ✅ القسم الأيسر */}
        <div className="col-12 col-md-6 d-flex justify-content-center order-1 order-md-1 LeftCardWrapper">
          <div className={styles.leftCard}>
            <div className={styles.imageText}>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={140}
                height={100}
                className={styles.logoImage}
              />
              <h2>مرحبا بكم في لقطها</h2>
              <p>اطلب مني اللي تريده وخليني ألقطها عشانك</p>
            </div>
          </div>
        </div>

        {/* ✅ القسم الأيمن */}
        <div className="col-12 col-md-6 d-flex justify-content-center order-2 order-md-2">
          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
              <h2 className={`${styles.heading} text-center`}>
                قم بإنشاء حسابك المجاني الآن
              </h2>
              <p className={`${styles.hint} text-center`}>
                او قم بتسجيل حسابك إن كنت تمتلك واحداً
              </p>

              <div className="row">
                <div className="col-12 mb-3">
                  <input
                    name="Name"
                    placeholder="الاسم الأول"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${styles.input} ${
                      formik.touched.firstName && formik.errors.firstName ? styles.invalid : ""
                    }`}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className={styles.err}>{formik.errors.firstName}</div>
                  )}
                </div>

            
              </div>

              <div className="mb-3">
                <input
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
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

           

              {/* رسالة الخطأ العامة من السيرفر */}
              {serverError && (
                <div className={`${styles.err} text-center mb-3`}>{serverError}</div>
              )}

              <button type="submit" className={styles.primaryBtn} disabled={submitting}>
                {submitting ? "جاري الإنشاء..." : "إنشاء الحساب"}
              </button>

              <p className={`${styles.hint} text-center`} style={{ marginTop: 8 }}>
                لديك حساب بالفعل؟{" "}
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={() => router.push("/login")}
                >
                  سجل الآن
                </button>
              </p>

              <p className={`${styles.terms} text-center`}>
                بالضغط على إنشاء الحساب فأنت توافق تلقائياً على{" "}
                <span className={styles.highlight}>سياسة الخصوصية</span> و
                <span className={styles.highlight}>شروط الاستخدام</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
