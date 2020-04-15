export interface ICard {
    title: number;
    description: string;
    smallDescription?: string;
    type: 'danger' | 'warning' | 'info' | 'success'
}
