import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  dob: z.string().min(1, "DOB is required"),
  gender: z.string().optional().or(z.literal("")),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  blood_group: z.string().optional().or(z.literal("")),
});

export default function PatientForm({
  title,
  subtitle,
  initialValues,
  onSubmit,
  onCancel,
  submitting,
  submitLabel = "Save",
}) {
  const defaultValues = useMemo(
    () => ({
      full_name: "",
      dob: "",
      gender: "",
      phone: "",
      email: "",
      blood_group: "",
      ...(initialValues || {}),
    }),
    [initialValues]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  return (
    <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
      <div className="hstack" style={{ alignItems: "flex-start" }}>
        <div>
          <h2 className="title" style={{ margin: 0 }}>{title}</h2>
          {subtitle && <div className="sub">{subtitle}</div>}
        </div>

        <span className="pill">Patient Form</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 16 }}>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1.2fr .8fr" }}>
          <div className="field" style={{ marginTop: 0 }}>
            <label>Full Name</label>
            <input className="input" {...register("full_name")} placeholder="e.g., Ravi Kumar" />
            {errors.full_name?.message && <div className="error">{errors.full_name.message}</div>}
          </div>

          <div className="field" style={{ marginTop: 0 }}>
            <label>Phone</label>
            <input className="input" {...register("phone")} placeholder="10-digit number" />
            {errors.phone?.message && <div className="error">{errors.phone.message}</div>}
          </div>
        </div>

        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr", marginTop: 12 }}>
          <div className="field" style={{ marginTop: 0 }}>
            <label>DOB</label>
            <input className="input" type="date" {...register("dob")} />
            {errors.dob?.message && <div className="error">{errors.dob.message}</div>}
          </div>

          <div className="field" style={{ marginTop: 0 }}>
            <label>Gender</label>
            <select className="input" {...register("gender")}>
              <option value="">--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="field" style={{ marginTop: 0 }}>
            <label>Blood Group</label>
            <input className="input" {...register("blood_group")} placeholder="e.g., O+" />
          </div>
        </div>

        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr", marginTop: 12 }}>
          <div className="field" style={{ marginTop: 0 }}>
            <label>Email</label>
            <input className="input" {...register("email")} placeholder="valid email address" />
            {errors.email?.message && <div className="error">{errors.email.message}</div>}
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            paddingTop: 14,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn primary" disabled={submitting}>
            {submitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}