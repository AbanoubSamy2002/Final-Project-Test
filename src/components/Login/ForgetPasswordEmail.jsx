import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordEmail() {
const navigate = useNavigate(); 

const emailValidation = yup.object().shape({
email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

const formik = useFormik({
initialValues: { email: "" },
validationSchema: emailValidation,
onSubmit: async (values, { setSubmitting }) => { 
    try {
    const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email: values.email }
    );

    if (res.data.status === "Success") {
        toast.success("Verification code sent to your email");
        navigate("/forget-password/verify", { state: { email: values.email } });
    }
    } catch (error) {
    toast.error("Email not registered");
    } finally {
    setSubmitting(false);
    }
},
});

return (
<form
    onSubmit={formik.handleSubmit}
    className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
>
    <div className="mb-6">
    <label className="block text-gray-700 text-sm font-semibold mb-2">
        Email Address
    </label>
    <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        placeholder="Enter your email address"
    />
    {formik.errors.email && (
        <div className="text-red-500 text-sm mt-1">
        {formik.errors.email}
        </div>
    )}
    </div>

    <button
    type="submit"
    disabled={formik.isSubmitting}
    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
    >
    {formik.isSubmitting ? "Sending..." : "Send Verification Code"}
    </button>
</form>
);
}