"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Field, FieldGroup, FieldSet } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { createForm } from "@/app/_lib/actions";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useFormDraftStore } from "../../_store/form-draft-store-provider";
import AddFieldButton from "./AddFieldButton";
import DraggableTile from "./DraggableTile";
import SaveButton from "./SaveButton";

const FormBuilder = () => {
  const { title, setTitle, addField, fields, resetFormDraft, patchFields } =
    useFormDraftStore((state) => state);

  const hasInvalidNumberMinMax = fields.some(
    (field) =>
      field.type === "number" &&
      typeof field.min === "number" &&
      typeof field.max === "number" &&
      !Number.isNaN(field.min) &&
      !Number.isNaN(field.max) &&
      field.max < field.min,
  );

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    const reorderedFields = [...fields];
    const [movedField] = reorderedFields.splice(source.index, 1);
    reorderedFields.splice(destination.index, 0, movedField);

    patchFields(reorderedFields);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="w-full">
        <form
          action={async (formData: FormData) => {
            await createForm(formData);
            resetFormDraft();
          }}
          onSubmit={(e) => {
            if (hasInvalidNumberMinMax) {
              e.preventDefault();
            }
          }}
        >
          <FieldSet>
            <h1 className="text-3xl">Form Builder</h1>
            <FieldGroup>
              <Field>
                <Input
                  type="text"
                  placeholder="Enter form title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>
              <input
                type="hidden"
                name="fields"
                value={JSON.stringify(fields)}
              />
              {fields.length > 0 && (
                <Card className="p-0">
                  <CardContent className="p-0">
                    <Droppable droppableId="fields">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {fields.map((field, index) => (
                            <DraggableTile
                              key={field.id}
                              field={field}
                              index={index}
                              isLast={index === fields.length - 1}
                            />
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              )}
              <Field orientation="horizontal" className="flex-wrap">
                <AddFieldButton onAddField={addField} type="text" />
                <AddFieldButton onAddField={addField} type="number" />
                <AddFieldButton onAddField={addField} type="select" />
              </Field>
              <Field>
                <SaveButton
                  disabled={fields.length === 0 || hasInvalidNumberMinMax}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </DragDropContext>
  );
};

export default FormBuilder;
