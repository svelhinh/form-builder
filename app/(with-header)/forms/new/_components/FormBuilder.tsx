"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Field, FieldGroup, FieldSet } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { createForm } from "@/app/_lib/actions";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { HiOutlinePlus } from "react-icons/hi2";
import { useFormDraftStore } from "../../_store/form-draft-store-provider";
import DraggableTile from "./DraggableTile";
import SaveButton from "./SaveButton";

const FormBuilder = () => {
  const { title, setTitle, addField, fields, resetFormDraft, patchFields } =
    useFormDraftStore((state) => state);

  const handleAddField = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: "text" | "number" | "select",
  ) => {
    e.preventDefault();
    addField(type);
  };

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
                <Button
                  onClick={(e) => handleAddField(e, "text")}
                  variant="outline"
                  className="w-1/3 border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700"
                >
                  <HiOutlinePlus />
                  Add Text Field
                </Button>
                <Button
                  onClick={(e) => handleAddField(e, "number")}
                  variant="outline"
                  className="w-1/3 border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700"
                >
                  <HiOutlinePlus />
                  Add Number Field
                </Button>
                <Button
                  onClick={(e) => handleAddField(e, "select")}
                  variant="outline"
                  className="w-1/3 border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700"
                >
                  <HiOutlinePlus />
                  Add Select Field
                </Button>
              </Field>
              <Field>
                <SaveButton disabled={fields.length === 0} />
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </DragDropContext>
  );
};

export default FormBuilder;
