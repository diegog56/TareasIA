// ESTADOS 
// -------------------------------------------------------------------------------------
//                                      [1] |                                      [2] |
// A - Sucio (aspiradora)                   | A - Sucio                                |
// B - Sucio                                | B - Sucio (aspiradora)                   |
// -------------------------------------------------------------------------------------
//                                      [3] |                                      [4] |
// A - Limpio (aspiradora)                  | A - Limpio                               |
// B - Sucio                                | B - Sucio (aspiradora)                   |
// -------------------------------------------------------------------------------------
//                                      [5] |                                      [6] |
// A - Sucio (aspiradora)                   | A - Sucio                                |
// B - Limpio                               | B - Limpio (aspiradora)                  |
// -------------------------------------------------------------------------------------
//                                      [7] |                                      [8] |
// A - Limpio (aspiradora)                  | A - Limpio                               |
// B - Limpio                               | B - Limpio (aspiradora)                  |
// -------------------------------------------------------------------------------------

before_states = []

function dirty(state){
    if (state == 3) return 1
    else if (state == 4) return 2
    else if (state == 6) return 5
    else if (state == 8) return 7
    else return null
}

function clean(state){
    if (state == 1) return 3
    else if (state == 2) return 4
    else if (state == 5) return 6
    else if (state == 7) return 8
    else return null
}

function move(state){
    if (state == 1) return 5
    else if (state == 2) return 6
    else if (state == 3) return 7
    else if (state == 4) return 8
    else if (state == 5) return 1
    else if (state == 6) return 2
    else if (state == 7) return 3
    else if (state == 8) return 4
    else return null
}

function is_repeated(state){
    console.log(this.before_states.includes(state))
    return this.before_states.includes(state)
}

function reset_states(){
    this.before_states = []
}

function iterate(init_state){
    reset_states()
    test = current = init_state
    ok = true
    before_states.push(current)
    path = [String(current)]
    while (ok){
        test = clean(current)
        ok = false
        if (test && (!is_repeated(test))) ok = true
        else {
            test = move(current)
            if(test && (!is_repeated(test))) ok = true
            else{
                test = dirty(current)
                if(test && (!is_repeated(test))) ok = true
            }
        }
        if(ok){
            document.getElementById("log").innerHTML+="<br>".concat(current).concat("->").concat(test);
            current = test
            before_states.push(current)
            path.push(String(current))
        }
        
    }
}

iterate(1)