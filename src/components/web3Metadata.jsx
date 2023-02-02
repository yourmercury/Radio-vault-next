import Input, { TextArea } from "./input";
import Text from "./texts";

export default function Web3Metadata({ form, setForm, errors, error }) {
  let keys = Object.keys(form);

  return (
    <div>
      <div className="bg-theme-light-grey p-5 mb-10">
        <Text cls={`text-[14px] ${error && "text-theme-red"} text-center`}>
          All fields are required for this stage
        </Text>
      </div>

      <div>
        {keys.map((name, index) => {
          let title = name.replaceAll("_", " ");
          if (name == "description") {
            return (
              <TextArea
                name={name}
                title={title}
                setForm={setForm}
                form={form}
                key={index}
                errors={errors}
              />
            );
          }
          return (
            <Input
              name={name}
              title={title}
              setForm={setForm}
              form={form}
              key={index}
              errors={errors}
            />
          );
        })}
      </div>
    </div>
  );
}
