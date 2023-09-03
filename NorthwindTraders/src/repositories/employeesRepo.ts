import { gte, eq } from "drizzle-orm";
import { employees } from "../db/schema/employees.js";
import { db } from "../db/db.js";
import { Employee } from "../db/schema/employees.js";
import { EmployeeRes, EmployeesRes } from "../controllers/types.js";

export class EmployeesRepo {
  private constructor() {}
  private static instance: EmployeesRepo;
  public static getInstance(): EmployeesRepo {
    if (!EmployeesRepo.instance) {
      EmployeesRepo.instance = new EmployeesRepo();
    }
    return EmployeesRepo.instance;
  }

  getEmployees = async (startId: number, count: number): Promise<EmployeesRes> => {
    const query = db.select().from(employees).where(gte(employees.id, startId)).limit(count);
    const employees_ = await query;
    return { employees: employees_, query: query.toSQL() };
  };

  getEmployee = async (id: number): Promise<EmployeeRes> => {
    const query = db.select().from(employees).where(eq(employees.id, id));
    const employee = (await query)[0];
    return { employee, query: query.toSQL() };
  };
}
