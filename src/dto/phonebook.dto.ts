export interface PhonebookListItem{
    name: string
    primary_number: string
    contact_id: number


}

export interface PhonebookListResponse{
    contacts: PhonebookListItem[]


}