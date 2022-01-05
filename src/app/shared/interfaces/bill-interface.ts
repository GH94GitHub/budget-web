export interface IBill {
  _id?: string,
  name: string,
  dueDate: Date,
  amount: number,
  repeats?: string,
  auto?: boolean
}
