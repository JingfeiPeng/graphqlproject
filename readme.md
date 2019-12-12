When initializing server, mlabCredntials.js will be missing since it contains my mlab databse credentials and thus it's not included in this repo.


The recipe will be 

interface Recipe {
    name: String,
    author: Author,
    Ingredients: Ingredient[],
    instructions:Instruction[]
}

interface Author {
    name:string,
    recipes: Recipe[]
}

interface Ingredient{
    name:string,
    amount:number,
    unit: string
}

interface Instruction{
    name: string,
    time: number // in miniutes
}

Users will be able to perform CRUD operations on Recipes