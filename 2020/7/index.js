const fs = require('fs')

const createBagTree = (lines) => {
    // This feels like a tree type structure with a parent with branches
    const bags = {}
    lines.map(line => {
        // The word contains splits the sentence from the parent
        // bag and what kind of child bag the parent bag holds
        const rule = line.split('contain')
        const color = rule[0].split(' ').slice(0,2).join(' ').trim()
        

        // I know every rule has the word contain in it
        // if not i would need to check the length of the object
        const rulePredicate = rule[1]

        const childBags = []
        // Where it gets fishy is how the predicate is described
        rulePredicate.split(',').map( predicate => {
            
            if(predicate.endsWith('no other bags.')){
                console.log(`This bag contains no other bags`)
                return
            }

            // get the child bag without the quantity or the word bags
            const childBagColor = predicate.split(' ').slice(2,4).join(' ').trim()
            childBags.push(childBagColor)
        })        
        bags[color] = childBags
    })
    return bags
}

const createBagTree2 = (lines) => {
    // This feels like a tree type structure with a parent with branches
    const bags = {}
    lines.map(line => {
        // The word contains splits the sentence from the parent
        // bag and what kind of child bag the parent bag holds
        const rule = line.split('contain')
        const color = rule[0].split(' ').slice(0,2).join(' ').trim()
        

        // I know every rule has the word contain in it
        // if not i would need to check the length of the object
        const rulePredicate = rule[1]

        const childBags = []
        // Where it gets fishy is how the predicate is described
        rulePredicate.split(',').map( predicate => {
            
            if(predicate.endsWith('no other bags.')){
                return
            }

            // get the child bag without the quantity or the word bags
            const tokens = predicate.trim().split(' ')
            const childBagColor = tokens.slice(1,3).join(' ').trim()
            childBags[childBagColor] = Number(tokens[0].trim())
        })        
        bags[color] = childBags
    })
    return bags
}

const createBagList = (lines) => {
    // This feels like a tree type structure with a parent with branches
    const bags = []
    lines.map(line => {
        // The word contains splits the sentence from the parent
        // bag and what kind of child bag the parent bag holds
        const rule = line.split('contain')
        const parentBag = rule[0].split(' ').slice(0,2).join(' ').trim()
        if(!bags.includes(parentBag)) bags.push(parentBag)
        

        // I know every rule has the word contain in it
        // if not i would need to check the length of the object
        const rulePredicate = rule[1]

        const childBags = {}
        // Where it gets fishy is how the predicate is described
        rulePredicate.split(',').map( predicate => {
            
            if(predicate.endsWith('no other bags.')){
                console.log(`This bag contains no other bags`)
                return
            }

            // get the child bag without the quantity or the word bags
            const childBag = predicate.split(' ').slice(2,4).join(' ').trim()
            if(!bags.includes(childBag)) bags.push(childBag)
        })        
        //bags(parentBag)
    })
    return bags
}

const searchBagsForColor = (bags, searchColor, bagHolders) => {
    // This function uses recursion to search thru the tree until a 
    // childbag is not associated with a parent bag.
    Object.keys(bags).map(parentBag => {
        if(bags[parentBag].includes(searchColor)){
            if(!bagHolders.includes(parentBag)) bagHolders.push(parentBag)
            searchBagsForColor(bags, parentBag, bagHolders)
        }
    })
}
const searchBagsForColor2 = (bags, searchColor, bagHolders, numberOfBags) => {
    /*
        get the necessary bags of the color that is being searched for
        add the amount of bags necessary to to create the bag for the search color
    */
    Object.keys(bags[searchColor]).map(childBag => {
        if(!Object.keys(bagHolders).includes(childBag)) {
            bagHolders[childBag] = 0
        }
        const additionalBags = numberOfBags * bags[searchColor][childBag]
        bagHolders[childBag] = bagHolders[childBag] + additionalBags
        searchBagsForColor2(bags, childBag, bagHolders, additionalBags)
    })
}


try {
    const data = fs.readFileSync('puzzle_input.txt', 'utf-8')
    const lines = data.split('\n')
    const bags = createBagTree(lines)
    console.log(bags)

    //Now search thru the bags to see if it contains the color
    const searchColor = 'shiny gold'
    const quantity = 0

    const bagHolders = []
    searchBagsForColor(bags, searchColor, bagHolders)

    //console.log(bagHolders)
    //console.log(bagHolders.length) //248

    console.log("-- Puzzle 2")
    const bags2 = createBagTree2(lines)
    console.log(bags2)

    const bagHolders2 = {}
    searchBagsForColor2(bags2, searchColor, bagHolders2,1)
    console.log(bagHolders2)
    console.log(Object.keys(bagHolders2).reduce((accum, current) => {
        accum = accum + bagHolders2[current]
        return accum
    }, 0)) //57281

} catch(err) {
    console.log(err)
}