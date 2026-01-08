export type FormField =
  | {
      id: string;
      type: "text";
      title: string;
      isRequired: boolean;
    }
  | {
      id: string;
      type: "number";
      title: string;
      isRequired: boolean;
      min?: number;
      max?: number;
    }
  | {
      id: string;
      type: "select";
      title: string;
      isRequired: boolean;
      options: { id: string; label: string }[];
    };

export type FormFields = FormField[];
