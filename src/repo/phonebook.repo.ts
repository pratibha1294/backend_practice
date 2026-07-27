import { RowDataPacket } from "mysql2/promise";
import pool from "../util/db";
import { PhonebookListItem } from "../dto/phonebook.dto";

export async function getAll(): Promise<PhonebookListItem[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM contacts");
    return rows as PhonebookListItem[];
}