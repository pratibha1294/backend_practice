import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import pool from "../util/db";
import { PhonebookListItem } from "../dto/phonebook.dto";

export async function getAll(): Promise<PhonebookListItem[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM contacts");
    return rows as PhonebookListItem[];
}
export async function createContact(name: string, primary_number: string): Promise<PhonebookListItem> 
{
    const [result] = await pool.query<ResultSetHeader>("INSERT INTO contacts (name, primary_number) VALUES (?, ?)", [name, primary_number]);
    return { name, primary_number, contact_id: result.insertId }    ;
}

export async function contactExists(primary_number: string): Promise<boolean> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM contacts WHERE primary_number = ?", [primary_number]);
    const count = rows[0].count as number;
    return count > 0;
}