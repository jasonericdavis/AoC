import {puzzleAnswer} from './puzzleAnswer'


// sample.txt =
//puzzle_input.txt =

export const solvePuzzle1 = ({input}) => {
    const puzzle = puzzleAnswer();
    const data = input.split('\n')
    const foods = []
    const possibleAllergens = {}
    const possibleNonAllergens = {}
    data.map(line => {
        const parts = line.split('(')
        const ingrediants = parts[0].trim().split(' ')
        const allergens = parts[1].trim().split(',').map(item => item = item.replace('contains','').replace(')', ''))
        foods.push({ingrediants, allergens})

        allergens.map(allergen => {
            if(!possibleAllergens[allergen]) possibleAllergens[allergen] = {
                count: 0,
                ingrediants: [],
                ingrediantCount: {}
            }
            possibleAllergens[allergen].count++
            
            ingrediants.map(ingrediant => {
                
                if(!possibleAllergens[allergen].ingrediants.includes(ingrediant)) {
    
                    possibleAllergens[allergen].ingrediants.push(ingrediant)
                    possibleAllergens[allergen].ingrediantCount[ingrediant] = 1
                    return
                }
                
                // const currentIngrediantCount = (possibleAllergens[allergen].ingrediantCount[ingrediant] || 0) + 1
                // possibleAllergens[allergen].ingrediantCount[ingrediant] = {
                //     ingrediant, 
                //     count: currentIngrediantCount
                // }
                possibleAllergens[allergen].ingrediantCount[ingrediant]++
            })
        })

        ingrediants.map(ingrediant => {
            if(!possibleNonAllergens[ingrediant]) possibleNonAllergens[ingrediant] = {
                count: 0
            }
            possibleNonAllergens[ingrediant].count++
        })
    })

    // foods.map(food => {
    //     Object.keys(possibleAllergens).map(allergen => {
    //         // if the current food does not include the allergen
    //         // cycle thru the list and zero out any ingrediants from the 
    //         // ingrediants for that allergen
    //         if(!food.allergens.includes(allergen)){
    //             food.ingrediants.map(foodIngrediant => {
    //                 if(possibleAllergens[allergen].ingrediantCount[foodIngrediant]){
    //                     possibleAllergens[allergen].ingrediantCount[foodIngrediant] = 0
    //                 }
    //             })

    //         }
    //     })
    // })



    console.log(foods)
    console.log(possibleAllergens)
    console.log(possibleNonAllergens)

    
    // let nonAllergent = []
    // Object.keys(possibleAllergens).map(allergen => {
    //     nonAllergent = [...nonAllergent, ...Object.keys(possibleAllergens[allergen].ingrediantCount).filter(x => {
    //         return x => possibleAllergens[allergen].ingrediantCount[x] < possibleAllergens[allergen].count
    //     })]
    // })
    // console.log(nonAllergent)


    return puzzle
}

export const solvePuzzle2 = ({input}) => {
    const puzzle = puzzleAnswer()
    return puzzle
}