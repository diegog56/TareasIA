before_states = []

def dirty(state):
    if state == 3: return 1
    elif state == 4: return 2
    elif state == 6: return 5
    elif state == 8: return 7
    else: return None

def clean(state):
    if state == 1: return 3
    elif state == 2: return 4
    elif state == 5: return 6
    elif state == 7: return 8
    else: return None

def move(state):
    if state == 1: return 5
    elif state == 2: return 6
    elif state == 3: return 7
    elif state == 4: return 8
    elif state == 5: return 1
    elif state == 6: return 2
    elif state == 7: return 3
    elif state == 8: return 4
    else: return None

def is_repeated(state):
    print(state in before_states)
    return state in before_states

def reset_states():
    global before_states
    before_states = []

def iterate(init_state):
    reset_states()
    test = current = init_state
    ok = True
    before_states.append(current)
    path = [str(current)]
    while ok:
        test = clean(current)
        ok = False
        if test and not is_repeated(test):
            ok = True
        else:
            test = move(current)
            if test and not is_repeated(test):
                ok = True
            else:
                test = dirty(current)
                if test and not is_repeated(test):
                    ok = True
        if ok:
            current = test
            before_states.append(current)
            path.append(str(current))
    print('%s.' % ' -> '.join(path))
	
iterate(1)