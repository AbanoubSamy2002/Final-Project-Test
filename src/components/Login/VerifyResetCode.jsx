import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyResetCode() {
const location = useLocation();
const navigate = useNavigate();
const email = location.state?.email;

const codeValidation = yup.object().shape({
resetCode: yup.string().required("Verification code is required"),
});

const formik = useFormik({
initialValues: { resetCode: "" },
validationSchema: codeValidation,
onSubmit: async (values, { setSubmitting }) => {
    try {
    const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: values.resetCode }
    );

    if (res.data.status === "Success") {
        toast.success("Code verified successfully");
        navigate("/forget-password/reset", {
        state: { email, resetCode: values.resetCode },
        });
    }
    } catch (error) {
    toast.error("Invalid or expired verification code");
    } finally {
    setSubmitting(false);
    }
},
});

return (
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <div className="mb-6">
    <label className="block text-gray-700 text-sm font-semibold mb-2">
        Verification Code
    </label>
    <input
        type="text"
        name="resetCode"
        value={formik.values.resetCode}
        onChange={formik.handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        placeholder="Enter verification code"
    />
    {formik.errors.resetCode && (
        <div className="text-red-500 text-sm mt-1">
        {formik.errors.resetCode}
        </div>
    )}
    </div>

    <button
    type="submit"
    disabled={formik.isSubmitting}
    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
    >
    {formik.isSubmitting ? "Verifying..." : "Verify Code"}
    </button>
</form>
);
}