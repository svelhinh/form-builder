import FieldHeaderBuilder from "./FieldHeaderBuilder";
import FieldTitleBuilder from "./FieldTitleBuilder";

const TextFieldBuilder = ({ fieldId }: { fieldId: string }) => {
  return (
    <>
      <FieldHeaderBuilder fieldId={fieldId} title="Text Field" />
      <FieldTitleBuilder />
    </>
  );
};

export default TextFieldBuilder;
