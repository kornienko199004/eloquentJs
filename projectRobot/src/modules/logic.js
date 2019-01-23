import { data, mailRoute } from './data';

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

const roadGraph = buildGraph(data);

export const routeRobot = (state, memory) => {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return {
    direction: memory[0],
    memory: memory.slice(1),
  };
};

export const runRobot = (state, robot, memory) => {
  for (let turn = 0; ; turn += 1) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
  }
};

export const randomPick = (array) => {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
};

export const randomRobot = state => ({
  direction: randomPick(roadGraph[state.place]),
});

export const findRoute = (graph, from, to) => {
  const work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i += 1) {
    const { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) {
        return route.concat(place);
      }
      if (!work.some(w => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
};

export const goalOrientedRobot = ({ place, parcels }, route) => {
  if (route.length === 0) {
    let parcel = parcels[0];
    if (parcel.place !== place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
};
