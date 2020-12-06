// https://gist.github.com/Mellen/876c8061f83b8f0c1fd14b742dba4d4e
const fs = require('fs');

const createValidPassports = (accountString, validator) => {
    console.log(`Starting with ${accountString.length} possible accounts`)
    return accountString.reduce((accounts, current) => {
        const account = current.split('\n')
            // after splitting by a newline now we need  
            // grab each field in the line to create an object
            // that contains a keyvalue pair for each field and value
            .reduce((fields, current) => {
                const values = current.split(' ')
                fields.push(...values)
                return fields
            },[])
            .reduce((obj, keyval) =>  {
                const [key, val] = keyval.split(':')
                obj[key] = val
                return obj
            }, {})
        if(validator(account)) accounts.push(account)
        return accounts
    }, [])
}

const validator1 = (account) => {
    const keys = Object.keys(account)
        if(!account['byr']) return false
        if(!account['iyr']) return false
        if(!account['eyr']) return false
        if(!account['hgt']) return false
        if(!account['hcl']) return false
        if(!account['ecl']) return false
        if(!account['pid']) return false
    return true
}

const validator2 =  (account) => {
    if(!account['byr'] || parseInt(account['byr']) < 1920 || parseInt(account['byr']) > 2002) return false
    if(!account['iyr'] || parseInt(account['iyr']) < 2010 || parseInt(account['iyr']) > 2020) return false
    if(!account['eyr'] || Number(account['eyr']) < 2020 || Number(account['eyr']) > 2030) return false

    if(!account['hgt']) {
        return false
    } else {
        const heightUnit = account['hgt'].substring(account['hgt'].length - 2)
        if(heightUnit != 'cm' && heightUnit !='in') {
            return false
        }
        const height = Number(account['hgt'].substring(0, account['hgt'].length - 2))
        if((heightUnit === 'cm' && (height < 150 || height > 193))
        || (heightUnit === 'in' && (height < 59  || height > 76))) {
            return false
        }
    }
    
    if(!account['hcl']) {
        return false
    } else {
        const hairColor = account['hcl'].substring(1)
        if(!account['hcl'][0] == '#' 
            || (hairColor.match(/[a-f0-9]/g) || []).length != 6){
                return false
        }

    }

    if(!account['ecl'] || !['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(account['ecl'])) return false
    if(!account['pid'] || (account['pid'].match(/[0-9]/g) || []).length != 9 ) return false
    return true
}

try {
    // The seperate passports are separatd by 2 newline characters
    // the first newline is the end of the line 
    // the second newline is the blank line
    const accountsString = fs.readFileSync('puzzle_input2.txt', 'utf8').split('\n\n')

    console.log('--- Puzzle 1')
    const validPassports1 = createValidPassports(accountsString, validator1 )
    console.log(`${validPassports1.length} Valid Passports`)

    console.log('--- Puzzle 2')
    const validPassports2 = createValidPassports(accountsString, validator2)
    console.log(`${validPassports2.length} Valid Passports`)

} catch(err ) {
    console.log(err)
}