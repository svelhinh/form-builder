import { Draggable } from "@hello-pangea/dnd";
import { Separator } from "@/app/_components/ui/separator";
import { FormField } from "../../_lib/fields.types";
import NumberFieldBuilder from "./builderFields/NumberFieldBuilder";
import SelectFieldBuilder from "./builderFields/SelectFieldBuilder";
import TextFieldBuilder from "./builderFields/TextFieldBuilder";

type Props = {
  field: FormField;
  index: number;
  isLast: boolean;
};

const DraggableTile = ({ field, index, isLast }: Props) => {
  return (
    <Draggable index={index} draggableId={field.id}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className={[
              "p-4",
              snapshot.isDragging ? "bg-card rounded-md shadow-sm" : "",
            ].join(" ")}
          >
            {field.type === "text" && <TextFieldBuilder fieldId={field.id} />}
            {field.type === "number" && (
              <NumberFieldBuilder fieldId={field.id} />
            )}
            {field.type === "select" && (
              <SelectFieldBuilder fieldId={field.id} options={field.options} />
            )}
          </div>
          {!isLast && !snapshot.isDragging && <Separator />}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTile;
