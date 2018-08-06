export class Frame {
  constructor(

    private id?:number,
    private created_at?:string,
    private updated_at?:string,
    private game_id?:number,
    private first_roll?:number,
    private second_roll?:number,
    private bonus?:number,
    private tracker?:number
  ) {

  }
}
