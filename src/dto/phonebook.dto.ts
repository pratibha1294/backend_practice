export interface PhonebookListItem{
    name: string
    primary_number: string
    contact_id: number


}

export interface PhonebookListResponse{
    contacts: PhonebookListItem[]


}
export interface CreateContactRequest{
    name: string
    primary_number: string
   
}

export interface CreateContactResponse{
    name: string
    primary_number: string
    contact_id: number
}