export interface Employee {
  id: number;
  name: string;
  salary: number;
  department: "HR" | "PS";
  created_at: Date;
  updated_at: Date;
}
