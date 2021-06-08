import time

def reflex_agent(location, state):
    if state=="DIRTY":
        return 'CLEAN'
    if state =="CLEAN" and location =="B":
        return "DIRTY"
    elif location=='A':
        return 'RIGHT'
    elif location=='B':
        return 'LEFT'   

def test(states):
    while True:
        location = states[0]
        state = (states[2], states[1])[states[0]=='A']
        action = reflex_agent(location, state)
        print ("Location: "+location+" | Action: "+action)
        if action == "CLEAN":
            if location == 'A':
                states[1]="CLEAN"
            elif location == 'B':
                states[2]="CLEAN"
        elif action =="DIRTY":
            if location == 'B':
                states[0] = 'A';
                states[1] = 'DIRTY'
        elif action == "RIGHT":
            states[0]='B'
        elif action == "LEFT":
            states[0]='A' 
        time.sleep(3)

test(['A','DIRTY','DIRTY'])