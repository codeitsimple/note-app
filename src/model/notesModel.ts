export type Note =  {
    
    id: string,
    title: string,
    description: string,
    date: string
}; 


export type Folder = {
    id: string,
    name: string
};

export type User = {
    id: string, 
    displayName?: string
}