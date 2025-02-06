function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function save_states(states, visited_states) {
    state = states.join()
    visited_states.set(state, "VISITED")
    return visited_states.size === 8
}

function dirty_again(states) {
    if (states[1] === "CLEAN") states[1] = Math.floor(Math.random() * 9) > 5 ? "DIRTY" : "CLEAN"
    if (states[2] === "CLEAN") states[2] = Math.floor(Math.random() * 9) > 5 ? "DIRTY" : "CLEAN"
    return states
}

function show_visited_States(visited_states){
    let string_value = ``
    let contador = 0
    for(var [key] of visited_states){
        contador++
        string_value += `<p>${contador}) ${key}</p>\n`
    }
    document.getElementById("states").innerHTML = string_value
}

function test(states, visited_states) {
    if (!save_states(states, visited_states)) {
        var location = states[0];
        var state = states[0] == "A" ? states[1] : states[2];
        var action_result = reflex_agent(location, state);
        document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
        show_visited_States(visited_states)
        console.log(visited_states)
        if (action_result == "CLEAN") {
            if (location == "A") states[1] = "CLEAN";
            else if (location == "B") states[2] = "CLEAN";
        }
        else if (action_result == "RIGHT") states[0] = "B";
        else if (action_result == "LEFT") states[0] = "A";
        states = dirty_again(states)
        setTimeout(function () { test(states, visited_states); }, 100);
    } else {
        show_visited_States(visited_states);
        setTimeout(() => {
            alert("Todos los estados han sido visitados");
        }, 100);
    }
}

var states = ["A", "DIRTY", "CLEAN"];
const visited_states = new Map()
test(states, visited_states);
