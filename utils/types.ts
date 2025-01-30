export interface Template {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  category?: string;
  aiPrompt: string;
  form: Form[];
}

export interface Form {
  label: string;
  field: string;
  name: string;
  required: boolean;
}

export interface QueryResponse {
  queries: [];
  totalPages: number;
}

export interface QueryResponseForTable {
  _id: string;
  template: any;
  email: string;
  content: string;
  query: string;
  createdAt: string;
  updatedAt: string;
}

export interface Props {
  data: QueryResponseForTable[];
}
