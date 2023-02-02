export default function Input({
  form,
  name,
  setForm,
  errors,
  cls,
  req,
  title,
}) {
  return (
    <div className="flex flex-col w-[100%] mb-2">
      <label className="font-semibold text-[12px] capitalize">
        {title} {req && <span className="text-theme-red">*</span>}
      </label>
      <input
        type="text"
        name={name}
        className={`border rounded px-2 py-1 text-[13px] w-[100%] ${cls}`}
        value={form[name]}
        onChange={(e) => {
          let value = e.target.value;
          setForm({ ...form, [name]: value });
          if (value && req) {
            errors && (errors.current[name] = false);
          }
        }}
        onBlur={(e) => {
          let value = e.target.value;
          if (req) {
            if (!value) {
              errors && (errors.current[name] = true);
            }
          }
        }}
      />
    </div>
  );
}

export function TextArea({form, setForm, errors, req, name, title, cls}) {
  return (
    <div className="flex flex-col w-[100%] mb-2">
      <label className="font-semibold text-[12px] capitalize">
        {title} {req && <span className="text-theme-red">*</span>}
      </label>
      <textarea
        type="text"
        rows={"3"}
        name={name}
        className={`border rounded px-2 py-1 text-[13px] w-[100%] ${cls}`}
        value={form[name]}
        onChange={(e) => {
          let value = e.target.value;
          setForm({ ...form, [name]: value });
          if (value && req) {
            errors && (errors.current[name] = false);
          }
        }}
        onBlur={(e) => {
          let value = e.target.value;
          if (req) {
            if (!value) {
              errors && (errors.current[name] = true);
            }
          }
        }}
      ></textarea>
    </div>
  );
}
