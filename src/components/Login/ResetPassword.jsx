
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
const location = useLocation();
const navigate = useNavigate();
const { email, resetCode } = location.state || {};

const passwordValidation = yup.object().shape({
newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const formik = useFormik({
initialValues: { newPassword: "", confirmPassword: "" },
validationSchema: passwordValidation,
onSubmit: async (values, { setSubmitting }) => {
    try {
    const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
        email,
        newPassword: values.newPassword,
        resetCode,
        }
    );

    if (res.data.token) {
        toast.success("Password reset successfully!");
        navigate("/login");
    }
    } catch (error) {
    toast.error("Failed to reset password");
    } finally {
    setSubmitting(false);
    }
},
});

return (
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <div className="mb-6">
    <label className="block text-gray-700 text-sm font-semibold mb-2">
        New Password
    </label>
    <input
        type="password"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        placeholder="Enter new password"
    />
    {formik.errors.newPassword && (
        <div className="text-red-500 text-sm mt-1">
        {formik.errors.newPassword}
        </div>
    )}
    </div>

    <div className="mb-6">
    <label className="block text-gray-700 text-sm font-semibold mb-2">
        Confirm Password
    </label>
    <input
        type="password"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        placeholder="Confirm new password"
    />
    {formik.errors.confirmPassword && (
        <div className="text-red-500 text-sm mt-1">
        {formik.errors.confirmPassword}
        </div>
    )}
    </div>

    <button
    type="submit"
    disabled={formik.isSubmitting}
    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
    >
    {formik.isSubmitting ? "Updating..." : "Reset Password"}
    </button>
</form>
);
}