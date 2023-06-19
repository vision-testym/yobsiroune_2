"use client";
import MainWrapper from "@/components/MainWrapper";
import WhiteCard from "@/components/WhiteCard";
import { useFormik } from "formik";
import * as Yup from "yup";
import { firestore } from "@/firebase/clientApp";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function PdfPage() {
  return (
    <MainWrapper>
      <WhiteCard>
        <TableComponent />
      </WhiteCard>
    </MainWrapper>
  );
}

const TableComponent = () => {
  const router = useRouter();
  const formsRef = collection(firestore, "forms");
  const formik = useFormik({
    initialValues: {
      beneficiaryType: "",
      name: "",
      placeOfBirth: "",
      sex: "",
      socialStatus: "",
      dateOfBirth: "",
      age: 0,
      idNumber: "",
      idType: "",
      idSource: "",
      job: "",
      nationality: "",
      idExpirationDate: "",
      workPlace: "",
      workPlaceLocation: "",
      familyMembersCount: 0,
      phoneNumber: "",
      email: "",
      otherPhoneNumber: "",
      relativeName: "",
      homeType: "",
      homeOwnership: "",
      insideBorder: "",
      city: "",
      neighborhood: "",
      diseaseType: "",
      specialNeeds: "",
      diseaseDescription: "",
      chronicDiseases: "",
      monthlyIncome: "",
      totalIncomeAfterRent: "",
      individualIncome: "",
      otherAids: "",
      aidName: "",
      aidType: "",
      bankName: "",
      accountNumber: "",
      ibanNumber: "",
    },

    validationSchema: Yup.object({
      beneficiaryType: Yup.string().required("نوع المستفيد مطلوب"),
      name: Yup.string().required("الاسم مطلوب"),
      placeOfBirth: Yup.string().required("مكان الميلاد مطلوب"),
      sex: Yup.string().required("الجنس مطلوب"),
      socialStatus: Yup.string().required("الحالة الاجتماعية مطلوبة"),
      dateOfBirth: Yup.date().required("تاريخ الميلاد مطلوب"),
      age: Yup.number().required("العمر مطلوب"),
      idNumber: Yup.string().required("رقم الهوية مطلوب"),
      idType: Yup.string().required("نوع الهوية مطلوب"),
      idSource: Yup.string().required("جهة اصدار الهوية مطلوبة"),
      job: Yup.string().required("الوظيفة مطلوبة"),
      nationality: Yup.string().required("الجنسية مطلوبة"),
      idExpirationDate: Yup.date().required("تاريخ انتهاء الهوية مطلوب"),
      workPlace: Yup.string().required("مكان العمل مطلوب"),
      workPlaceLocation: Yup.string().required("موقع العمل مطلوب"),
      familyMembersCount: Yup.number().required("عدد افراد الاسرة مطلوب"),
      phoneNumber: Yup.string()
        .required("رقم الهاتف مطلوب")
        .matches(/^[0-9]+$/, "رقم الهاتف يجب ان يكون ارقام فقط"),
      email: Yup.string().required("البريد الالكتروني مطلوب").email(),
      otherPhoneNumber: Yup.string().matches(
        /^[0-9]+$/,
        "رقم الهاتف يجب ان يكون ارقام فقط"
      ),
      relativeName: Yup.string(),
      homeType: Yup.string().required("نوع السكن مطلوب"),
      homeOwnership: Yup.string().required("ملكية السكن مطلوبة"),
      insideBorder: Yup.string().required("داخل الحدود مطلوب"),
      city: Yup.string().required("المدينة مطلوبة"),
      neighborhood: Yup.string().required("الحي مطلوب"),
      diseaseType: Yup.string().required("نوع المرض مطلوب"),
      specialNeeds: Yup.string(),
      diseaseDescription: Yup.string().required("وصف المرض مطلوب"),
      chronicDiseases: Yup.string(),
      monthlyIncome: Yup.number().required("الدخل الشهري مطلوب"),
      totalIncomeAfterRent: Yup.number().required(
        "مجموع الدخل بعد خصم الايجار مطلوب"
      ),
      individualIncome: Yup.number().required("دخل الفرد مطلوب"),
      otherAids: Yup.string(),
      aidName: Yup.string(),
      aidType: Yup.string(),
      bankName: Yup.string(),
      accountNumber: Yup.number(),
      ibanNumber: Yup.number(),
    }),

    onSubmit: async (values) => {
      try {
        // save the form data to firestore
        const docRef = await addDoc(formsRef, values);

        // redirect to the home page
        router.push("/");
      } catch (error) {
        console.error("Error");
      }
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <div className="flex items-center justify-evenly bg-white border border-black">
            <div className="w-24 h-full text-center p-2 font-semibold">
              البيانات اساسية
            </div>

            <div className="flex-1 grid grid-cols-4 lg:grid-cols-6 gap-2 px-2 py-1">
              <div
                className="flex items-center justify-center p-2 border border-black 
              bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base "
              >
                نوع المستفيد
              </div>
              <input
                type="text"
                id="beneficiaryType"
                name="beneficiaryType"
                value={formik.values.beneficiaryType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoFocus
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-5 " +
                  (formik.touched.beneficiaryType &&
                  formik.errors.beneficiaryType
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                الاسم
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base " +
                  (formik.touched.name && formik.errors.name
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                مكان الميلاد
              </div>
              <input
                type="text"
                id="placeOfBirth"
                name="placeOfBirth"
                value={formik.values.placeOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base " +
                  (formik.touched.placeOfBirth && formik.errors.placeOfBirth
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                الجنس
              </div>
              <input
                type="text"
                id="sex"
                name="sex"
                value={formik.values.sex}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.sex && formik.errors.sex
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                الحالة الاجتماعية
              </div>
              <input
                type="text"
                id="socialStatus"
                name="socialStatus"
                value={formik.values.socialStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.socialStatus && formik.errors.socialStatus
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                تاريخ الميلاد
              </div>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                العمر
              </div>
              <input
                type="number"
                id="age"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.age && formik.errors.age
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                رقم الهوية / الاقامة
              </div>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formik.values.idNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.idNumber && formik.errors.idNumber
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                نوع الهوية
              </div>
              <input
                type="text"
                id="idType"
                name="idType"
                value={formik.values.idType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.idType && formik.errors.idType
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                مصدرها
              </div>
              <input
                type="text"
                id="idSource"
                name="idSource"
                value={formik.values.idSource}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.idSource && formik.errors.idSource
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                المهنة
              </div>
              <input
                type="text"
                id="job"
                name="job"
                value={formik.values.job}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.job && formik.errors.job
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                الجنسية
              </div>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formik.values.nationality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.nationality && formik.errors.nationality
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                تاريخ انتهاء الهوية
              </div>
              <input
                type="date"
                id="idExpirationDate"
                name="idExpirationDate"
                value={formik.values.idExpirationDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.idExpirationDate &&
                  formik.errors.idExpirationDate
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                جهة العمل
              </div>
              <input
                type="text"
                id="workPlace"
                name="workPlace"
                value={formik.values.workPlace}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.workPlace && formik.errors.workPlace
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                مكان العمل
              </div>
              <input
                type="text"
                id="workPlaceLocation"
                name="workPlaceLocation"
                value={formik.values.workPlaceLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.workPlaceLocation &&
                  formik.errors.workPlaceLocation
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                عدد افراد الاسرة
              </div>
              <input
                type="number"
                id="familyMembersCount"
                name="familyMembersCount"
                value={formik.values.familyMembersCount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.familyMembersCount &&
                  formik.errors.familyMembersCount
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
            </div>
          </div>

          <div className="flex items-center justify-evenly bg-white border border-black">
            <div className="w-24 h-full text-center p-2 font-semibold">
              معلومات التواصل
            </div>

            <div className="flex-1 grid grid-cols-4 gap-2 px-2 py-1">
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                رقم جوال
              </div>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                الإيميل
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.email && formik.errors.email
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                رقم جوال آخر
              </div>
              <input
                type="text"
                id="otherPhoneNumber"
                name="otherPhoneNumber"
                value={formik.values.otherPhoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.otherPhoneNumber &&
                  formik.errors.otherPhoneNumber
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                اسمه وصلة القرابة
              </div>
              <input
                type="text"
                id="relativeName"
                name="relativeName"
                value={formik.values.relativeName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.relativeName && formik.errors.relativeName
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
            </div>
          </div>

          <div className="flex items-center justify-evenly bg-white border border-black">
            <div className="w-24 h-full text-center p-2 font-semibold">
              العنوان
            </div>

            <div className="flex-1 grid grid-cols-4 lg:grid-cols-6 gap-2 px-2 py-1">
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                نوع السكن
              </div>
              <input
                type="text"
                id="homeType"
                name="homeType"
                value={formik.values.homeType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.homeType && formik.errors.homeType
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                ملكية السكن
              </div>
              <input
                type="text"
                id="homeOwnership"
                name="homeOwnership"
                value={formik.values.homeOwnership}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.homeOwnership && formik.errors.homeOwnership
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                داخل الحد
              </div>
              <input
                type="text"
                id="insideBorder"
                name="insideBorder"
                value={formik.values.insideBorder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.insideBorder && formik.errors.insideBorder
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                المدينة
              </div>
              <input
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.city && formik.errors.city
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                الحي
              </div>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                value={formik.values.neighborhood}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-3" +
                  (formik.touched.neighborhood && formik.errors.neighborhood
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
            </div>
          </div>

          <div className="flex items-center justify-evenly bg-white border border-black">
            <div className="w-24 h-full text-center p-2 font-semibold">
              الحالة الصحية
            </div>

            <div className="flex-1 grid grid-cols-4 gap-2 px-2 py-1">
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                نوع المرض
              </div>
              <input
                type="text"
                id="diseaseType"
                name="diseaseType"
                value={formik.values.diseaseType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.diseaseType && formik.errors.diseaseType
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                من ذوي الاحتياجات الخاصة
              </div>
              <input
                type="text"
                id="specialNeeds"
                name="specialNeeds"
                value={formik.values.specialNeeds}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.specialNeeds && formik.errors.specialNeeds
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                وصف المرض
              </div>
              <input
                type="text"
                id="diseaseDescription"
                name="diseaseDescription"
                value={formik.values.diseaseDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.diseaseDescription &&
                  formik.errors.diseaseDescription
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                الامراض المزمنة
              </div>
              <input
                type="text"
                id="chronicDiseases"
                name="chronicDiseases"
                value={formik.values.chronicDiseases}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.chronicDiseases &&
                  formik.errors.chronicDiseases
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
            </div>
          </div>

          <div className="flex items-center justify-evenly bg-white border border-black">
            <div className="w-24 h-full text-center p-2 font-semibold">
              المعلومات المالية
            </div>

            <div className="flex-1 grid grid-cols-4 lg:grid-cols-6 gap-2 px-2 py-1">
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                الدخل الشهري
              </div>
              <input
                type="text"
                id="monthlyIncome"
                name="monthlyIncome"
                value={formik.values.monthlyIncome}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.monthlyIncome && formik.errors.monthlyIncome
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                مجموع الدخل بعد خصم الايجار
              </div>
              <input
                type="text"
                id="totalIncomeAfterRent"
                name="totalIncomeAfterRent"
                value={formik.values.totalIncomeAfterRent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full  px-3 text-sm border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.totalIncomeAfterRent &&
                  formik.errors.totalIncomeAfterRent
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                دخل الفرد
              </div>
              <input
                type="text"
                id="individualIncome"
                name="individualIncome"
                value={formik.values.individualIncome}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.individualIncome &&
                  formik.errors.individualIncome
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                مساعدات اخرى
              </div>
              <input
                type="text"
                id="otherAids"
                name="otherAids"
                value={formik.values.otherAids}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.otherAids && formik.errors.otherAids
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                اسم الجهة
              </div>
              <input
                type="text"
                id="aidName"
                name="aidName"
                value={formik.values.aidName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.aidName && formik.errors.aidName
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                نوعها
              </div>
              <input
                type="text"
                id="aidType"
                name="aidType"
                value={formik.values.aidType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-1 text-xs md:text-base" +
                  (formik.touched.aidType && formik.errors.aidType
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="text-center p-2 border border-black row-span-2 bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                معلومات الحساب البنكي
              </div>
              <div className="flex items-center justify-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold lg:col-span-1 text-xs md:text-base">
                اسم البنك
              </div>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formik.values.bankName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent" +
                  (formik.touched.bankName && formik.errors.bankName
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="flex items-center justify-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold lg:col-span-1 text-xs md:text-base">
                رقم الحساب
              </div>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formik.values.accountNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent" +
                  (formik.touched.accountNumber && formik.errors.accountNumber
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
              <div className="flex items-center justify-center p-2 border border-black bg-blue-900 bg-opacity-80 text-white font-semibold col-span-2 lg:col-span-1 text-xs md:text-base">
                رقم الآيبان
              </div>
              <input
                type="text"
                id="ibanNumber"
                name="ibanNumber"
                value={formik.values.ibanNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  "w-full h-full px-3 border focus:outline-none focus:ring-2 focus:border-transparent col-span-2 lg:col-span-4" +
                  (formik.touched.ibanNumber && formik.errors.ibanNumber
                    ? " border-red-500 border-2"
                    : " border-black")
                }
              />
              {/* ------------------ */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            type="submit"
            className={
              "w-32 h-10 text-white bg-blue-900 rounded-md" +
              " " +
              (formik.isSubmitting ? "opacity-50 cursor-not-allowed" : "")
            }
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};
