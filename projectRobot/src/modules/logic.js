export const buildGraph = (edges) => {
  const graph = Object.create(null);
  const addEdge = (from, to) => {
    if (!graph[from]) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  };

  const edgesArray = edges.map(r => r.split('-'));
  edgesArray.forEach(([from, to]) => {
    addEdge(from, to);
    addEdge(to, from);
  });

  return graph;
};

export const runRobot = (state, robot, roadGraph, memory) => {
  for (let turn = 0; ; turn += 1) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    const action = robot(state, roadGraph, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
};

export const randomPick = (array) => {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
};

export const randomRobot = (state, roadGraph) => ({
  direction: randomPick(roadGraph[state.place]),
});
